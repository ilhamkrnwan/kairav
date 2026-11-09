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

// Prev / next navigation cards share a single template
const navCards = computed(() => [
  { dir: 'prev', project: prevProject.value, badge: t('Previous'), label: t('Previous Project'), icon: 'lucide:arrow-left' },
  { dir: 'next', project: nextProject.value, badge: t('Next'), label: t('Next Project'), icon: 'lucide:arrow-right' }
].filter(card => card.project))

// Gallery: explicit list, otherwise the 3 numbered mockups next to the cover image
const projectImages = computed<string[]>(() => {
  if (!current.value) return []
  if (current.value.gallery?.length) return current.value.gallery
  const folder = current.value.image?.replace(/\/[^/]+\.(?:avif|webp|png|jpe?g)$/, '')
  return folder ? [1, 2, 3].map(n => `${folder}/${n}.avif`) : []
})

useDynamicSeo({
  title: current.value?.title,
  description: current.value?.description || t('View project details and portfolio'),
  image: current.value?.image,
  type: 'article',
  publishedTime: current.value?.date,
  tags: current.value?.tags
})

// JSON-LD Structured Data for portfolio project
useCreativeWorkSchema({
  title: current.value?.title,
  description: current.value?.description,
  image: current.value?.image,
  datePublished: current.value?.date,
  category: current.value?.category,
  tags: current.value?.tags,
  client: current.value?.client,
  url: `https://ilhamkrnwan.my.id${route.path}`,
})

const formatDate = (date: string | undefined, day?: 'numeric') =>
  date ? new Date(date).toLocaleDateString(locale.value, { year: 'numeric', month: 'long', day }) : ''

const breadcrumbItems = computed(() => [
  { label: t('Home'), icon: 'lucide:home', to: '/' },
  { label: t('Portfolio'), to: '/portofolio' },
  { label: current.value?.title || t('Project Details') }
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
    { label: t('Status'), values: c?.status ? [c.status] : [], kind: 'status' },
    { label: t('Industry'), values: c?.industry ? [c.industry] : [], kind: 'text' },
    { label: t('Date'), values: c?.date ? [formatDate(c.date, 'numeric')] : [], kind: 'text' },
    { label: t('Services'), values: c?.services ?? [], kind: 'tag' },
    { label: t('Technologies'), values: c?.tags ?? [], kind: 'tag' }
  ].filter(row => row.values.length)
})

</script>

<template>
  <main class="min-h-screen">
    <UiSkeletonDetail v-if="status === 'pending'" type="portfolio" />
    <template v-else-if="current">
      <!-- Hero -->
      <section class="relative pt-32 sm:pt-36 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-6 md:px-12 lg:px-20 border-b border-default/40 overflow-hidden bg-radial from-primary/[0.04] via-transparent to-transparent">

        <div class="container mx-auto max-w-7xl relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div class="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <div class="flex flex-wrap items-center gap-3">
                <UBreadcrumb :items="breadcrumbItems" :ui="{ link: 'text-xs' }" />
                <UBadge color="primary" variant="subtle" size="md" class="font-semibold text-xs">
                  <template #leading>
                    <span class="size-1.5 rounded-full bg-primary animate-pulse" />
                  </template>
                  {{ current.category || 'Portfolio' }}
                </UBadge>
              </div>

              <div class="space-y-4">
<h1 :key="$i18n.locale" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight leading-[1.08] text-highlighted">
                  {{ current.title }}<span class="text-primary">.</span>
                </h1>
              </div>

              <p class="text-base sm:text-lg md:text-xl text-muted font-normal leading-relaxed max-w-2xl">
                {{ current.description }}
              </p>

              <!-- Meta: client, date, status, industry -->
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
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
                  {{ t('Kunjungi Website') }}
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
                  {{ t('Kembali ke Portofolio') }}
                </UiArrowButton>
              </div>
            </div>

            <!-- 3D avatar with floating accents -->
            <div class="lg:col-span-5 flex items-center justify-center relative mt-8 lg:mt-0">
              <div class="relative w-full max-w-md flex items-center justify-center group">

                <NuxtImg
                  src="/developer-portfolio-avatar.avif"
                  :alt="`${current.title} - Ilham Kurniawan`"
                  width="440"
                  height="420"
                  format="webp"
                  loading="eager"
                  class="relative z-10 w-64 sm:w-76 md:w-88 lg:w-96 max-h-96 sm:max-h-[420px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] avatar-floating transition-transform duration-500 group-hover:scale-105"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Cover image -->
      <section
        v-if="current.image"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 100 } }"
        class="pt-8 pb-4 md:pt-12 md:pb-6"
      >
        <div class="container mx-auto px-4 max-w-5xl">
          <div class="relative aspect-video rounded-lg overflow-hidden border border-default shadow-lg shadow-black/5">
            <NuxtImg :src="current.image" :alt="current.title" class="size-full object-cover" />
          </div>
        </div>
      </section>

      <!-- Content -->
      <section id="project-content" class="py-8 md:py-12 scroll-mt-20 overflow-x-hidden">
        <div class="container mx-auto px-4">
          <div class="mx-auto max-w-7xl content-container">
            <div class="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 200 } }"
                class="lg:col-span-8"
              >
                <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings: prose-headings: prose-p:text-highlighted/80 [&_img]:hidden">
                  <ContentRenderer :value="current" />
                </div>
              </div>

              <aside class="lg:col-span-4">
                <div class="sticky top-28">
                  <div
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 300 } }"
                    class="space-y-4"
                  >
                    <!-- Project info -->
                    <div>
                      <UCard :ui="{ root: 'rounded-lg bg-elevated ring-default/40 shadow-xl shadow-black/5', body: 'p-5' }">
                        <h3 class="text-xs text-muted mb-4 font-medium">{{ t('Project Info') }}</h3>

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
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <!-- Project gallery -->
      <section
        v-if="projectImages.length"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 450 } }"
        class="py-8 md:py-12 overflow-x-hidden"
      >
        <div class="container mx-auto px-4 max-w-7xl">
          <h2 :key="$i18n.locale" class="text-2xl md:text-3xl font-heading mb-8 text-center tracking-tight">
            {{ t('Project Gallery') }}
          </h2>
          <UCarousel
            v-slot="{ item }"
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
            <NuxtImg :src="item" :alt="t('Project Gallery')" loading="lazy" class="w-full h-auto max-h-[500px] object-contain" />
          </UCarousel>
        </div>
      </section>

      <!-- Previous / next -->
      <section
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 500 } }"
        class="py-12 px-4 border-t border-default/40 overflow-x-hidden"
      >
        <div class="container mx-auto max-w-7xl navigation-container">
          <h2 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-12 text-center">
            <span class="section-title-filled block">{{ t('More') }}</span>
            <span class="section-title-outline block">{{ t('Projects') }}<span class="text-primary">.</span></span>
          </h2>
          <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div v-for="card in navCards" :key="card.dir">
              <ULink
                v-if="card.project"
                :to="getPortofolioLink(card.project)"
                raw
                class="group flex h-full flex-col gap-3"
              >
                <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted transition-colors duration-300 group-hover:border-primary/50">
                  <NuxtImg
                    :src="card.project.image || '/placeholder.avif'"
                    :alt="card.project.title"
                    class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div class="flex flex-1 flex-col">
                  <div
                    class="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted"
                    :class="card.dir === 'next' && 'flex-row-reverse justify-end'"
                  >
                    <UIcon :name="card.icon" class="size-3.5" />
                    <span class="truncate">{{ card.label }}</span>
                  </div>
                  <h3 class="line-clamp-2 font-heading text-sm leading-snug text-highlighted transition-colors duration-300 group-hover:text-primary sm:text-lg">
                    {{ card.project.title }}
                  </h3>
                  <p class="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                    {{ card.project.description }}
                  </p>
                  <UBadge :label="card.project.category" color="neutral" variant="outline" size="xs" class="mt-3 w-fit font-medium" />
                </div>
              </ULink>
            </div>
          </div>
        </div>
      </section>
    </template>
  </main>
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
