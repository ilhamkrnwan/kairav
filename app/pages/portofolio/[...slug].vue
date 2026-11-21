<script setup lang="ts">

definePageMeta({
  key: route => route.fullPath,
})

const { t, locale } = useI18n()
const route = useRoute()

const slug = computed(() => {
  const params = route.params.slug
  return Array.isArray(params) ? params.join('/') : params || ''
})

const getPortofolioLink = (item?: { path?: string, _path?: string } | null) =>
  item?._path || item?.path?.replace(`/portofolio/${locale.value}`, '/portofolio') || '#'

const { data: current, error, status } = await useAsyncData(
  `portofolio-${locale.value}-${slug.value}`,
  () => queryCollection('portofolio').path(`/portofolio/${locale.value}/${slug.value}`).first(),
  { watch: [locale, slug] }
)

const { data: portofolios } = await useAsyncData(
  `portofolio-all-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .select('path', '_path', 'title', 'description', 'image', 'category', 'tags', 'date', 'status', 'services', 'client', 'industry')
      .where('stem', 'LIKE', `portofolio/${locale.value}/%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

if (status.value !== 'pending' && (error.value || !current.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: t('Portfolio not found'),
    fatal: true
  })
}

const currentIndex = computed(() => {
  if (!portofolios.value || !current.value) return -1
  return portofolios.value.findIndex(p => p.path === current.value?.path)
})

const prevProject = computed(() => (currentIndex.value > 0 ? portofolios.value?.[currentIndex.value - 1] : undefined))
const nextProject = computed(() => (currentIndex.value >= 0 ? portofolios.value?.[currentIndex.value + 1] : undefined))

const navCards = computed(() => [
  { dir: 'prev', project: prevProject.value },
  { dir: 'next', project: nextProject.value }
].flatMap(({ dir, project }) => project ? [{ dir, project }] : []))

// An empty list hides the gallery. Older entries use numbered mockups by default.
const projectImages = computed<string[]>(() => {
  if (!current.value) return []
  if (current.value.gallery) return current.value.gallery
  const folder = current.value.image?.replace(/\/[^/]+\.(?:avif|webp|png|jpe?g)$/, '')
  return folder ? [1, 2, 3].map(n => `${folder}/${n}.avif`) : []
})

const imagePreviewOpen = ref(false)
const previewImage = ref<{ src: string, alt: string }>()
const imageZoomed = ref(false)
const imageFailed = ref(false)
const previewViewport = useTemplateRef<HTMLElement>('previewViewport')
let previewTrigger: HTMLButtonElement | null = null

function openImagePreview(src: string, alt: string, event: MouseEvent) {
  previewTrigger = event.currentTarget as HTMLButtonElement
  previewImage.value = { src, alt }
  imageZoomed.value = false
  imageFailed.value = false
  imagePreviewOpen.value = true
}

async function toggleImageZoom() {
  imageZoomed.value = !imageZoomed.value
  await nextTick()

  const viewport = previewViewport.value
  if (!viewport) return
  viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2
  viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2
}

function restoreImageFocus(event: Event) {
  event.preventDefault()
  previewTrigger?.focus({ preventScroll: true })
  previewTrigger = null
}

// Month-only project dates have no exact publication date.
const projectDate = current.value?.date
const exactProjectDate = projectDate?.length === 10 ? projectDate : undefined

useDynamicSeo({
  title: current.value?.title,
  description: current.value?.description || t('View project details and portfolio'),
  image: current.value?.image,
  type: 'article',
  publishedTime: exactProjectDate,
  tags: current.value?.tags
})

// JSON-LD Structured Data for portfolio project
useCreativeWorkSchema({
  title: current.value?.title,
  description: current.value?.description,
  image: current.value?.image,
  datePublished: exactProjectDate,
  category: current.value?.category,
  tags: current.value?.tags,
  client: current.value?.client,
  contributionRole: current.value?.contributionRole,
  url: `https://ilhamkrnwan.my.id${route.path}`,
})

const formatDate = (date: string | undefined, day?: 'numeric') =>
  date ? new Date(date).toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'long',
    day: date.length === 10 ? day : undefined,
    timeZone: 'UTC'
  }) : ''

const breadcrumbItems = computed(() => [
  { label: t('Home'), icon: 'lucide:home', to: '/' },
  { label: t('Portfolio'), to: '/portofolio' },
  { label: t('Project Details') }
])

const heroMeta = computed(() => [
  { icon: 'lucide:briefcase', label: current.value?.client, iconClass: 'text-primary' },
  { icon: 'lucide:calendar', label: formatDate(current.value?.date), iconClass: 'text-primary' },
  { icon: 'lucide:activity', label: current.value?.status, iconClass: 'text-primary', highlight: true },
  { icon: 'lucide:layers', label: current.value?.industry, iconClass: 'text-primary' }
].filter(item => item.label))

// Sidebar "Project Info" rows
const infoRows = computed(() => {
  const c = current.value
  return [
    { label: t('Client'), values: c?.client ? [c.client] : [], kind: 'text' },
    { label: t('Role'), values: c?.contributionRole ? [c.contributionRole] : [], kind: 'text' },
    { label: t('Status'), values: c?.status ? [c.status] : [], kind: 'status' },
    { label: t('Industry'), values: c?.industry ? [c.industry] : [], kind: 'text' },
    { label: t('Date'), values: c?.date ? [formatDate(c.date, 'numeric')] : [], kind: 'text' },
    { label: t('Services'), values: c?.services ?? [], kind: 'tag' }
  ].filter(row => row.values.length)
})

</script>

<template>
  <div class="min-h-screen">
    <UiSkeletonDetail v-if="status === 'pending'" type="portfolio" />
    <template v-else-if="current">
      <!-- Hero -->
      <UiDetailHero :image="current.image" :panoramic="current.panoramicHero">
        <div class="detail-masthead-copy min-w-0">
          <div class="flex flex-wrap items-center gap-3">
            <UBreadcrumb :items="breadcrumbItems" :ui="{ link: 'text-xs' }" />
            <UBadge v-if="current.category" color="primary" variant="subtle" size="md" class="font-semibold text-xs">
              {{ current.category }}
            </UBadge>
          </div>

          <h1 class="detail-title">{{ current.title }}</h1>

          <p v-if="current.description" class="detail-deck">{{ current.description }}</p>

          <!-- Meta: client, date, status, industry -->
          <div v-if="heroMeta.length" class="flex flex-wrap items-center gap-2 pt-1 sm:gap-3">
            <UBadge
              v-for="item in heroMeta"
              :key="item.icon"
              :icon="item.icon"
              :label="item.label"
              color="neutral"
              variant="outline"
              size="md"
              :ui="{ leadingIcon: item.iconClass }"
              class="text-xs bg-elevated font-medium"
              :class="item.highlight && 'ring-primary/30 text-primary font-semibold'"
            />
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <UiArrowButton
              v-if="current.url"
              :href="current.url"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon="lucide:external-link"
            >
              {{ t('Visit Website') }}
            </UiArrowButton>

            <UiArrowButton
              to="#project-content"
              :variant="current.url ? 'secondary' : 'primary'"
              icon="lucide:arrow-down"
            >
              {{ t('Lihat Rincian') }}
            </UiArrowButton>

            <UiArrowButton
              v-if="!current.url"
              to="/portofolio"
              variant="secondary"
              icon="lucide:arrow-left"
            >
              {{ t('Back to Projects') }}
            </UiArrowButton>
          </div>
        </div>
        <template v-if="current.image" #action>
          <button
            type="button"
            :aria-label="t('projectImage.openCover', { title: current.title })"
            aria-haspopup="dialog"
            class="detail-hero-zoom"
            @click="openImagePreview(current.image, current.title ?? '', $event)"
          >
            <UIcon name="lucide:zoom-in" class="size-4" aria-hidden="true" />
          </button>
        </template>
        <template #fallback>
          <div class="detail-mascot">
            <LazyUiMascot name="kairav" size="180" label="Kairav" hydrate-on-visible />
          </div>
        </template>
      </UiDetailHero>

      <!-- Content -->
      <section id="project-content" class="site-frame detail-reading-layout">
        <article class="min-w-0">
          <UiReadingContent :document="current" :repeated-images="[current.image, ...projectImages]" />
        </article>

        <aside class="detail-reading-aside min-w-0 space-y-4">
          <!-- Project info -->
          <div>
            <UCard :ui="{ root: 'rounded-lg bg-elevated ring-default/40 shadow-xl shadow-black/5', body: 'p-5' }">
              <h2 class="mb-4 text-sm font-semibold text-highlighted">{{ t('Project Info') }}</h2>

              <div class="space-y-4">
                <div v-for="row in infoRows" :key="row.label">
                  <p class="text-xs text-muted mb-2 font-medium">{{ row.label }}</p>
                  <p v-if="row.kind === 'text'" class="font-medium text-sm">{{ row.values[0] }}</p>
                  <div v-else class="flex flex-wrap gap-2">
                    <UBadge
                      v-for="value in row.values"
                      :key="value"
                      :label="value"
                      :color="row.kind === 'status' ? 'primary' : 'neutral'"
                      :variant="row.kind === 'status' ? 'subtle' : 'outline'"
                      class="px-3 py-1.5 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <USeparator class="mb-6" />
                  <AppSocialShare :title="current.title" :label="t('Share Project')" />
                </div>
              </div>
            </UCard>
          </div>

          <div class="space-y-3">
            <UiArrowButton
              v-if="current.url"
              :href="current.url"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon="lucide:external-link"
              class="w-full"
            >
              {{ t('Visit Website') }}
            </UiArrowButton>

            <UiArrowButton to="/portofolio" variant="secondary" icon="lucide:arrow-left" class="w-full">
              {{ t('Back to Projects') }}
            </UiArrowButton>
          </div>
        </aside>
      </section>

      <!-- Project gallery -->
      <section
        v-if="projectImages.length"

        class="py-8 md:py-12 overflow-x-hidden"
      >
        <div class="container mx-auto px-4 max-w-7xl">
          <h2 class="text-2xl md:text-3xl font-heading mb-8 text-center tracking-tight">
            {{ t('Project Gallery') }}
          </h2>
          <UCarousel
            v-slot="{ item, index }"
            :items="projectImages"
            loop
            arrows
            dots
            :prev="{ color: 'neutral', variant: 'ghost', class: 'bg-black/40 text-white hover:bg-black/60' }"
            :next="{ color: 'neutral', variant: 'ghost', class: 'bg-black/40 text-white hover:bg-black/60' }"
            :ui="{
              root: 'w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg border border-default/40',
              container: 'ms-0',
              item: 'ps-0',
              prev: 'start-2 sm:start-4',
              next: 'end-2 sm:end-4',
              dots: 'bottom-4',
              dot: 'bg-white/50 data-[state=active]:bg-white'
            }"
          >
            <button
              type="button"
              :aria-label="t('projectImage.openGallery', { index: index + 1, total: projectImages.length })"
              aria-haspopup="dialog"
              class="relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
              @click="openImagePreview(item, t('projectImage.galleryAlt', { title: current.title, index: index + 1 }), $event)"
            >
              <NuxtImg :src="item" alt="" loading="lazy" class="w-full h-auto max-h-[500px] object-contain" />
              <span aria-hidden="true" class="pointer-events-none absolute end-3 top-3 grid size-9 place-items-center bg-black/75 text-white">
                <UIcon name="lucide:zoom-in" class="size-4" />
              </span>
            </button>
          </UCarousel>
        </div>
      </section>

      <UModal
        v-model:open="imagePreviewOpen"
        fullscreen
        :transition="false"
        :title="current.title || t('Project Gallery')"
        :content="{ onCloseAutoFocus: restoreImageFocus }"
        :ui="{
          header: 'min-h-0 gap-2 px-3 py-2 sm:px-6',
          wrapper: 'min-w-0 flex-1',
          title: 'truncate',
          body: 'flex min-h-0 overflow-hidden p-0 sm:p-0'
        }"
      >
        <template #actions>
          <UButton
            v-if="!imageFailed"
            :icon="imageZoomed ? 'lucide:zoom-out' : 'lucide:zoom-in'"
            :label="t(imageZoomed ? 'projectImage.fit' : 'projectImage.zoom')"
            color="neutral"
            variant="outline"
            class="min-h-11 shrink-0"
            @click="toggleImageZoom"
          />
        </template>
        <template #close>
          <UButton
            icon="lucide:x"
            color="neutral"
            variant="ghost"
            :aria-label="t('navigation.close')"
            class="size-11 shrink-0 justify-center"
          />
        </template>
        <template #body>
          <div
            v-if="previewImage && !imageFailed"
            ref="previewViewport"
            class="flex flex-1 overflow-auto overscroll-contain bg-muted [container-type:size]"
            role="region"
            :aria-label="t('projectImage.viewer')"
            :tabindex="imageZoomed ? 0 : undefined"
          >
            <button
              type="button"
              :aria-label="t(imageZoomed ? 'projectImage.fit' : 'projectImage.zoom')"
              class="m-auto block max-w-none shrink-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
              :class="imageZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'"
              @click="toggleImageZoom"
            >
              <NuxtImg
                :src="previewImage.src"
                :alt="previewImage.alt"
                class="block h-auto w-auto max-h-[100cqh] max-w-[100cqw]"
                :class="{ '[zoom:2]': imageZoomed }"
                draggable="false"
                @error="imageFailed = true"
              />
            </button>
          </div>
          <p v-else class="m-auto p-4 text-muted" role="status">{{ t('projectImage.error') }}</p>
        </template>
      </UModal>

      <!-- Previous / next -->
      <section

        class="py-12 px-4 border-t border-default/40 overflow-x-hidden"
      >
        <div class="container mx-auto max-w-7xl navigation-container">
          <h2 class="detail-related-heading">{{ t('More Projects') }}</h2>
          <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <UiContentCard
              v-for="card in navCards"
              :key="card.dir"
              :to="getPortofolioLink(card.project)"
              :title="card.project.title"
              :description="card.project.description"
              :image="card.project.image"
            />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
@keyframes avatarFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.avatar-floating {
  animation: avatarFloat 5s ease-in-out infinite;
}


</style>
