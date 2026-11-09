<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'

definePageMeta({
  scrollToTop: true,
})

interface GalleryItem {
  id: string
  title: string
  description?: string
  image: string
  categoryLabel: string
  link: string
  linkText: string
  tags?: string[]
  date?: string
  author?: string
  client?: string
  duration?: string
}

const { t, locale } = useI18n()

useDynamicSeo({
  titleKey: 'seo.gallery.title',
  descriptionKey: 'seo.gallery.description',
})

// Schema.org ImageGallery structured data
useGalleryPageSchema()

const { data: servicesData } = await useAsyncData(
  `gallery-services-${locale.value}`,
  () =>
    queryCollection('services')
      .where('stem', 'LIKE', `services/${locale.value}/%`)
      .order('order', 'ASC')
      .all(),
  { watch: [locale] }
)

const { data: blogsData } = await useAsyncData(
  `gallery-blogs-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('stem', 'LIKE', `blog/${locale.value}/%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

const { data: portfolioData } = await useAsyncData(
  `gallery-portfolio-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .where('stem', 'LIKE', `portofolio/${locale.value}/%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

const lastSegment = (path?: string) => path?.split('/').pop() || ''

// Services, blogs and portfolio merged into one gallery list
const allGalleryItems = computed<GalleryItem[]>(() => [
  ...(servicesData.value ?? []).map((s) => {
    const slug = s.slug || lastSegment(s.stem)
    return {
      id: `service-${slug}`,
      title: s.title || '',
      description: s.description || '',
      image: s.coverImage || s.image || `/services/${slug}.avif`,
      categoryLabel: t('Services'),
      link: `/services/${slug}`,
      linkText: t('View Service Details'),
      tags: s.tags || [],
      duration: s.duration,
    }
  }),
  ...(blogsData.value ?? []).map((b) => {
    const slug = lastSegment(b.stem) || lastSegment(b._path)
    return {
      id: `blog-${slug}`,
      title: b.title || '',
      description: b.description || '',
      image: b.coverImage || `/blog/${slug}.avif`,
      categoryLabel: t('Articles'),
      link: `/blogs/${slug}`,
      linkText: t('Read Full Article'),
      tags: b.tags || [],
      author: b.author,
      date: b.date,
    }
  }),
  ...(portfolioData.value ?? []).map((p) => {
    const slug = lastSegment(p.stem) || lastSegment(p._path)
    return {
      id: `portfolio-${slug}`,
      title: p.title || '',
      description: p.description || '',
      image: p.image || `/portofolio/${slug}/preview.avif`,
      categoryLabel: t('Portfolio'),
      link: `/portofolio/${slug}`,
      linkText: t('View Case Study'),
      tags: p.tags || [],
      client: p.client,
    }
  }),
])

// Bento tiling on the 4-column layout without gaps (pattern repeats every 14 tiles):
//   block 1: big left (2x2), 2 small, tall right (1x2)    block 2: wide (2x1), 2 small
//   block 3: tall left (1x2), 2 small, big right (2x2)    block 4: 2 small, wide (2x1)
const bentoSizes = {
  big: 'md:col-span-2 md:row-span-2 min-h-[160px] md:min-h-[460px]',
  tall: 'md:col-span-1 md:row-span-2 min-h-[160px] md:min-h-[460px]',
  wide: 'md:col-span-2 md:row-span-1 min-h-[160px] md:min-h-[220px]',
  small: 'md:col-span-1 md:row-span-1 min-h-[160px] md:min-h-[220px]',
} as const
const bentoPattern = ['big', 'small', 'tall', 'small', 'wide', 'small', 'small', 'tall', 'small', 'big', 'small', 'small', 'small', 'wide'] as const
const getBentoSpanClass = (index: number) => bentoSizes[bentoPattern[index % bentoPattern.length]!]

// Lightbox state
const activeIndex = ref<number | null>(null)
const isModalOpen = computed(() => activeIndex.value !== null)
const activeItem = computed(() => (activeIndex.value === null ? undefined : allGalleryItems.value[activeIndex.value]))

const openModal = (item: GalleryItem) => {
  const index = allGalleryItems.value.findIndex(i => i.id === item.id)
  if (index !== -1) activeIndex.value = index
}

const closeModal = () => {
  activeIndex.value = null
}

const step = (delta: number) => {
  const length = allGalleryItems.value.length
  if (activeIndex.value === null || !length) return
  activeIndex.value = (activeIndex.value + delta + length) % length
}

// Escape and scroll lock are handled by UModal
onKeyStroke('ArrowRight', () => isModalOpen.value && step(1))
onKeyStroke('ArrowLeft', () => isModalOpen.value && step(-1))

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: 'numeric' })
}

const activeDetails = computed(() => {
  const item = activeItem.value
  if (!item) return []
  return [
    { label: t('Date Published'), value: formatDate(item.date) },
    { label: t('Client / Context'), value: item.client },
    { label: t('Timeline'), value: item.duration },
    { label: t('Author'), value: item.author },
  ].filter(row => row.value)
})

const navButtonClass = 'fixed z-50 justify-center rounded-md text-white ring ring-white/20 shadow-2xl shrink-0 aspect-square'

useScrollReveal()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 overflow-hidden">

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h1 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-8 animate-fade-in-up delay-100">
          <span class="section-title-filled block">{{ t('Visual') }}</span>
          <span class="section-title-outline block">& {{ t('Gallery') }}<span class="text-primary">.</span></span>
        </h1>

        <p class="text-base md:text-lg text-muted mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-normal">
          {{ t('Explore a curated collection of visual works, digital services, and project documentation across') }}
          <UiTextGradient class="font-medium">
            {{ t('architecture, design,') }}
          </UiTextGradient>
          {{ t('and') }}
          <UiTextGradient class="font-medium">
            {{ t('digital solutions.') }}
          </UiTextGradient>
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <UiArrowButton to="#gallery-grid" variant="primary" icon="lucide:arrow-down">
            {{ t('Explore Gallery') }}
          </UiArrowButton>

          <UiArrowButton to="/" variant="secondary" icon="lucide:home">
            {{ t('Back to Home') }}
          </UiArrowButton>
        </div>
      </div>
    </section>

    <!-- Bento gallery grid -->
    <section id="gallery-grid" class="scroll-section will-change-[transform,opacity] section py-20">
      <div class="container max-w-7xl mx-auto px-4 md:px-8">
        <div class="text-center mb-16 stagger-item">
          <h2 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-4">
            <span class="section-title-filled block">{{ t('Bento') }}</span>
            <span class="section-title-outline block">{{ t('Showcase') }}<span class="text-primary">.</span></span>
          </h2>
          <p class="text-muted text-lg max-w-2xl mx-auto font-normal">
            {{ t('Click any image to inspect details, read descriptions, and open the full project page.') }}
          </p>
        </div>

        <!-- All items load immediately (dense packing, no holes) -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row-dense gap-3 sm:gap-4 md:gap-5 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[240px]">
          <UButton
            v-for="(item, index) in allGalleryItems"
            :key="item.id"
            color="neutral"
            variant="ghost"
            :aria-label="item.title"
            class="group relative block p-0 rounded-lg sm:rounded-lg overflow-hidden bg-muted/20 border border-default hover:border-primary/60 shadow-md hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 stagger-item"
            :class="getBentoSpanClass(index)"
            @click="openModal(item)"
          >
            <NuxtImg
              :src="item.image"
              :alt="item.title"
              loading="lazy"
              class="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

          </UButton>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <UModal
      :open="isModalOpen"
      fullscreen
      :title="activeItem?.title"
      :description="activeItem?.description"
      :ui="{ overlay: 'bg-black/90', content: 'bg-transparent divide-y-0 overflow-y-auto' }"
      @update:open="open => !open && closeModal()"
    >
      <template #content>
        <div v-if="activeItem" class="flex min-h-full items-center justify-center p-3 sm:p-6" @click.self="closeModal">
          <UButton
            icon="lucide:x"
            color="neutral"
            variant="ghost"
            size="xl"
            title="Close (Esc)"
            aria-label="Close"
            class="top-4 right-4 size-11 bg-white/10 hover:bg-white/20 transition-all duration-200 hover:rotate-90"
            :class="navButtonClass"
            @click="closeModal"
          />
          <UButton
            icon="lucide:chevron-left"
            color="neutral"
            variant="ghost"
            size="xl"
            title="Previous (Left Arrow)"
            aria-label="Previous"
            class="left-3 sm:left-6 top-1/2 -translate-y-1/2 size-12 bg-black/60 hover:bg-primary hover:text-inverted transition-all duration-300 hover:scale-110"
            :class="navButtonClass"
            @click.stop="step(-1)"
          />
          <UButton
            icon="lucide:chevron-right"
            color="neutral"
            variant="ghost"
            size="xl"
            title="Next (Right Arrow)"
            aria-label="Next"
            class="right-3 sm:right-6 top-1/2 -translate-y-1/2 size-12 bg-black/60 hover:bg-primary hover:text-inverted transition-all duration-300 hover:scale-110"
            :class="navButtonClass"
            @click.stop="step(1)"
          />

          <div class="relative w-full max-w-5xl rounded-lg sm:rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl shadow-black/90 flex flex-col lg:flex-row max-h-[90vh]">
            <!-- Media -->
            <div class="lg:w-7/12 bg-black/80 flex items-center justify-center p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-neutral-800/80 relative min-h-[300px] sm:min-h-[420px]">
              <NuxtImg
                :src="activeItem.image"
                :alt="activeItem.title"
                class="max-h-[65vh] w-auto max-w-full object-contain rounded-lg sm:rounded-lg shadow-2xl"
              />
              <UBadge
                :label="`${(activeIndex ?? 0) + 1} / ${allGalleryItems.length}`"
                color="neutral"
                variant="outline"
                size="sm"
                class="absolute bottom-3 left-3 rounded-md bg-black/70 text-neutral-300"
              />
            </div>

            <!-- Details -->
            <div class="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-neutral-950 text-white">
              <div>
                <p class="mb-4 text-xs text-primary font-bold">
                  {{ activeItem.categoryLabel }}
                </p>

                <h2 class="text-xl sm:text-2xl font-heading text-white leading-snug mb-4">
                  {{ activeItem.title }}
                </h2>

                <p class="text-sm text-neutral-300 leading-relaxed font-normal mb-6">
                  {{ activeItem.description }}
                </p>

                <div v-if="activeDetails.length" class="space-y-3 pt-4 border-t border-neutral-800/80 mb-6 text-xs text-neutral-400">
                  <div v-for="row in activeDetails" :key="row.label" class="flex items-center justify-between">
                    <span>{{ row.label }}:</span>
                    <span class="text-neutral-200">{{ row.value }}</span>
                  </div>
                </div>

                <div v-if="activeItem.tags?.length" class="flex flex-wrap gap-1.5 mb-6">
                  <UBadge
                    v-for="tag in activeItem.tags"
                    :key="tag"
                    :label="`#${tag}`"
                    color="neutral"
                    variant="outline"
                    class="px-2.5 py-1 rounded-xl text-neutral-300 bg-neutral-900 font-medium"
                  />
                </div>
              </div>

              <div class="pt-6 border-t border-neutral-800/80">
                <UiArrowButton :to="activeItem.link" variant="primary" icon="lucide:arrow-right" class="w-full" @click="closeModal">
                  {{ activeItem.linkText }}
                </UiArrowButton>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UModal>

    <div class="scroll-section will-change-[transform,opacity] w-full">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }



/* Custom scrollbars for the lightbox sidebar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--color-neutral-700);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-amber-500);
}
</style>
