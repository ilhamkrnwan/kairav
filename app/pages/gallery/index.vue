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
  category: string
  categoryKey: 'services' | 'blogs' | 'portfolio' | 'creative'
  categoryLabel: string
  icon: string
  link?: string
  linkText?: string
  type: 'service' | 'blog' | 'portfolio' | 'creative'
  tags?: string[]
  date?: string
  author?: string
  client?: string
  duration?: string
  isExternal?: boolean
}

const { t, locale } = useI18n()

// Dynamic SEO
useDynamicSeo({
  title: t('seo.gallery.title') || 'Galeri Visual & Dokumentasi Proyek — Ilham Kurniawan',
  description: t('seo.gallery.description') || 'Koleksi visual lengkap seluruh layanan digital, arsitektur sistem, artikel blog, dan portofolio proyek oleh Ilham Kurniawan.',
})

// Query content collections
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

// Static creative/photography items
const creativeItems = computed<GalleryItem[]>(() => [
  {
    id: 'creative-1',
    title: t('Portrait & Expression') || 'Portrait & Expression',
    description: t('Capturing emotions and authentic personality in natural lighting') || 'Menangkap emosi dan karakter alami melalui pencahayaan natural.',
    image: '/gallery/1.avif',
    category: t('Photography') || 'Fotografi',
    categoryKey: 'creative',
    categoryLabel: t('Photography') || 'Fotografi',
    icon: 'lucide:camera',
    link: 'https://www.instagram.com/ilhamkrnwan__',
    linkText: t('View on Instagram') || 'Kunjungi Instagram',
    type: 'creative',
    isExternal: true,
    tags: ['Street', 'Portrait', 'Lens']
  },
  {
    id: 'creative-2',
    title: t('Urban Exploration') || 'Urban Exploration',
    description: t('Discovering architectural rhythm and geometry in urban spaces') || 'Menemukan keindahan geometri arsitektur dan ritme ruang perkotaan.',
    image: '/gallery/2.avif',
    category: t('Photography') || 'Fotografi',
    categoryKey: 'creative',
    categoryLabel: t('Photography') || 'Fotografi',
    icon: 'lucide:building-2',
    link: 'https://www.instagram.com/ilhamkrnwan__',
    linkText: t('View on Instagram') || 'Kunjungi Instagram',
    type: 'creative',
    isExternal: true,
    tags: ['Architecture', 'Cityscape']
  },
  {
    id: 'creative-3',
    title: t('Nature & Serenity') || 'Nature & Serenity',
    description: t('Finding stillness and organic textures in natural landscapes') || 'Merekam ketenangan dan kehangatan lanskap alam.',
    image: '/gallery/3.avif',
    category: t('Photography') || 'Fotografi',
    categoryKey: 'creative',
    categoryLabel: t('Photography') || 'Fotografi',
    icon: 'lucide:trees',
    link: 'https://www.instagram.com/ilhamkrnwan__',
    linkText: t('View on Instagram') || 'Kunjungi Instagram',
    type: 'creative',
    isExternal: true,
    tags: ['Nature', 'Landscape']
  },
  {
    id: 'creative-4',
    title: t('Everyday Life Moments') || 'Everyday Life Moments',
    description: t('Candid visual stories from daily activities and spontaneous encounters') || 'Cerita visual spontan dari rutinitas dan interaksi sehari-hari.',
    image: '/gallery/4.avif',
    category: t('Photography') || 'Fotografi',
    categoryKey: 'creative',
    categoryLabel: t('Photography') || 'Fotografi',
    icon: 'lucide:aperture',
    link: 'https://www.instagram.com/ilhamkrnwan__',
    linkText: t('View on Instagram') || 'Kunjungi Instagram',
    type: 'creative',
    isExternal: true,
    tags: ['Candid', 'Life']
  },
  {
    id: 'creative-5',
    title: t('Creative Experimentation') || 'Creative Experimentation',
    description: t('Exploring angles, contrast, and monochrome visual narratives') || 'Eksplorasi sudut pandang, kontras, dan narasi monokrom.',
    image: '/gallery/5.avif',
    category: t('Photography') || 'Fotografi',
    categoryKey: 'creative',
    categoryLabel: t('Photography') || 'Fotografi',
    icon: 'lucide:palette',
    link: 'https://www.instagram.com/ilhamkrnwan__',
    linkText: t('View on Instagram') || 'Kunjungi Instagram',
    type: 'creative',
    isExternal: true,
    tags: ['Creative', 'Experiment']
  },
  {
    id: 'creative-6',
    title: t('Night & Ambience') || 'Night & Ambience',
    description: t('Atmospheric lighting and night reflections in the city') || 'Tata cahaya malam dan refleksi suasana temaram di sudut kota.',
    image: '/gallery/6.avif',
    category: t('Photography') || 'Fotografi',
    categoryKey: 'creative',
    categoryLabel: t('Photography') || 'Fotografi',
    icon: 'lucide:moon',
    link: 'https://www.instagram.com/ilhamkrnwan__',
    linkText: t('View on Instagram') || 'Kunjungi Instagram',
    type: 'creative',
    isExternal: true,
    tags: ['Night', 'Mood']
  }
])

// Aggregate all gallery items
const allGalleryItems = computed<GalleryItem[]>(() => {
  const list: GalleryItem[] = []

  // 1. Map Services Items
  if (servicesData.value) {
    for (const s of servicesData.value) {
      const slug = s.slug || s.stem?.split('/').pop() || ''
      list.push({
        id: `service-${slug}`,
        title: s.title || '',
        description: s.description || '',
        image: s.coverImage || s.image || `/services/${slug}.avif`,
        category: t('Services') || 'Layanan',
        categoryKey: 'services',
        categoryLabel: t('Services') || 'Layanan',
        icon: s.icon || 'lucide:layers',
        link: `/services/${slug}`,
        linkText: t('View Service Details') || 'Lihat Detail Layanan',
        type: 'service',
        tags: s.tags || [],
        duration: s.duration,
      })
    }
  }

  // 2. Map Blog Items
  if (blogsData.value) {
    for (const b of blogsData.value) {
      const slug = b.stem?.split('/').pop() || b._path?.split('/').pop() || ''
      list.push({
        id: `blog-${slug}`,
        title: b.title || '',
        description: b.description || '',
        image: b.coverImage || `/blog/${slug}.avif`,
        category: t('Articles') || 'Artikel Blog',
        categoryKey: 'blogs',
        categoryLabel: t('Articles') || 'Artikel Blog',
        icon: 'lucide:newspaper',
        link: `/blogs/${slug}`,
        linkText: t('Read Full Article') || 'Baca Artikel Lengkap',
        type: 'blog',
        tags: b.tags || [],
        author: b.author,
        date: b.date,
      })
    }
  }

  // 3. Map Portfolio Items
  if (portfolioData.value) {
    for (const p of portfolioData.value) {
      const slug = p.stem?.split('/').pop() || p._path?.split('/').pop() || ''
      list.push({
        id: `portfolio-${slug}`,
        title: p.title || '',
        description: p.description || '',
        image: p.image || `/portofolio/${slug}/preview.avif`,
        category: t('Portfolio') || 'Portofolio',
        categoryKey: 'portfolio',
        categoryLabel: t('Portfolio') || 'Portofolio',
        icon: 'lucide:briefcase',
        link: `/portofolio/${slug}`,
        linkText: t('View Case Study') || 'Lihat Studi Kasus',
        type: 'portfolio',
        tags: p.tags || [],
        client: p.client,
      })
    }
  }

  // 4. Append Creative Items
  list.push(...creativeItems.value)

  return list
})

// Dynamic Bento Grid Pattern Spans
const getBentoSpanClass = (index: number) => {
  const mod = index % 7
  switch (mod) {
    case 0:
      return 'md:col-span-2 md:row-span-2 min-h-[160px] md:min-h-[460px]'
    case 1:
      return 'md:col-span-1 md:row-span-1 min-h-[160px] md:min-h-[220px]'
    case 2:
      return 'md:col-span-1 md:row-span-2 min-h-[160px] md:min-h-[460px]'
    case 3:
      return 'md:col-span-2 md:row-span-1 min-h-[160px] md:min-h-[220px]'
    case 4:
      return 'md:col-span-1 md:row-span-1 min-h-[160px] md:min-h-[220px]'
    case 5:
      return 'md:col-span-1 md:row-span-1 min-h-[160px] md:min-h-[220px]'
    case 6:
      return 'md:col-span-2 md:row-span-1 min-h-[160px] md:min-h-[220px]'
    default:
      return 'md:col-span-1 md:row-span-1 min-h-[160px] md:min-h-[220px]'
  }
}

// Modal Lightbox State
const activeIndex = ref<number | null>(null)
const isModalOpen = computed(() => activeIndex.value !== null)
const activeItem = computed<GalleryItem | null>(() => {
  if (activeIndex.value === null) return null
  return allGalleryItems.value[activeIndex.value] || null
})

const openModal = (item: GalleryItem) => {
  const idx = allGalleryItems.value.findIndex(i => i.id === item.id)
  if (idx !== -1) {
    activeIndex.value = idx
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }
}

const closeModal = () => {
  activeIndex.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const nextItem = () => {
  if (activeIndex.value === null || allGalleryItems.value.length === 0) return
  activeIndex.value = (activeIndex.value + 1) % allGalleryItems.value.length
}

const prevItem = () => {
  if (activeIndex.value === null || allGalleryItems.value.length === 0) return
  const len = allGalleryItems.value.length
  activeIndex.value = (activeIndex.value - 1 + len) % len
}

// Keyboard shortcuts for Lightbox Modal
onKeyStroke('Escape', () => {
  if (isModalOpen.value) closeModal()
})
onKeyStroke('ArrowRight', () => {
  if (isModalOpen.value) nextItem()
})
onKeyStroke('ArrowLeft', () => {
  if (isModalOpen.value) prevItem()
})

// Formatting helper
const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  try {
    return new Date(dateString).toLocaleDateString(locale.value, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

useScrollReveal()
</script>

<template>
  <div class="min-h-screen">
    <!-- HERO SECTION -->
    <section 
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
      class="py-16 md:py-24 px-4 border-b border-border/40"
    >
      <div class="container mx-auto max-w-6xl text-center">
        <div class="mb-6">
          <span class="inline-flex items-center px-4 py-2 rounded-sm text-[10px] font-mono tracking-widest uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30">
            {{ t('Visual Archive & Showcase') || 'Arsip Visual & Showcase' }}
          </span>
        </div>

        <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight mb-8 leading-tight uppercase">
          {{ t('Visual') || 'Visual' }} & {{ t('Gallery') || 'Galeri' }}
        </h1>

        <p class="text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto font-medium">
          {{ t('Explore a curated collection of visual works, digital services, and project documentation across') || 'Jelajahi kurasi dokumentasi visual, layanan digital, dan portofolio proyek dalam balutan' }}
          <span class="text-amber-400">{{ t('architecture, design,') || 'arsitektur, desain,' }}</span>
          {{ t('and') || 'dan' }}
          <span class="text-amber-400">{{ t('creative photography.') || 'fotografi kreatif.' }}</span>
        </p>
      </div>
    </section>

    <!-- Bento Gallery Grid Section -->
    <section id="gallery-grid" class="scroll-section will-change-[transform,opacity] section py-20">
      <div class="container max-w-7xl mx-auto px-4 md:px-8">
        <!-- Section Title with stagger-item -->
        <div class="text-center mb-16 stagger-item">
          <h2 class="leading-[0.88] tracking-tight mb-4">
            <span class="section-title-filled block">{{ t('Bento') || 'Bento' }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Showcase') || 'Koleksi Karya' }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            {{ t('Click any image to inspect details, read descriptions, and open the full project page.') || 'Klik pada gambar untuk melihat pratinjau detail dan membuka halaman lengkap.' }}
          </p>
        </div>

        <!-- Pure Bento Grid - Loads All Items Immediately (2 Columns on Mobile) -->
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[240px]">
          <div
            v-for="(item, index) in allGalleryItems"
            :key="item.id"
            @click="openModal(item)"
            :class="[
              'group relative rounded-xl sm:rounded-2xl overflow-hidden bg-muted/20 border border-border/40 hover:border-amber-400/60 shadow-md hover:shadow-2xl hover:shadow-amber-400/20 transition-all duration-500 cursor-pointer stagger-item',
              getBentoSpanClass(index)
            ]"
          >
            <!-- Image Canvas (Pure Image Focus) -->
            <img
              :src="item.image"
              :alt="item.title"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            >

            <!-- Clean Vignette Overlay & Title Only on Hover -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3 sm:p-5">
              <div class="w-full flex items-center justify-between gap-2 sm:gap-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 class="text-xs sm:text-base md:text-lg font-heading font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
                  {{ item.title }}
                </h3>
                <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 shrink-0 shadow-lg">
                  <Icon name="lucide:maximize-2" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isModalOpen && activeItem"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto"
          @click.self="closeModal"
        >
          <!-- Close Button Top Right -->
          <button
            @click="closeModal"
            class="fixed top-4 right-4 z-50 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:rotate-90 shadow-xl shrink-0 aspect-square"
            title="Close (Esc)"
          >
            <Icon name="lucide:x" class="w-5 h-5" />
          </button>

          <!-- Prev Navigation Button -->
          <button
            @click.stop="prevItem"
            class="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-black/60 hover:bg-amber-400 hover:text-black text-white backdrop-blur-md border border-white/20 transition-all duration-300 shadow-2xl hover:scale-110 shrink-0 aspect-square"
            title="Previous (Left Arrow)"
          >
            <Icon name="lucide:chevron-left" class="w-6 h-6" />
          </button>

          <!-- Next Navigation Button -->
          <button
            @click.stop="nextItem"
            class="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-black/60 hover:bg-amber-400 hover:text-black text-white backdrop-blur-md border border-white/20 transition-all duration-300 shadow-2xl hover:scale-110 shrink-0 aspect-square"
            title="Next (Right Arrow)"
          >
            <Icon name="lucide:chevron-right" class="w-6 h-6" />
          </button>

          <!-- Modal Dialog Content Container -->
          <div
            class="relative w-full max-w-5xl my-auto rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl shadow-black/90 flex flex-col lg:flex-row transition-all duration-300 max-h-[90vh]"
          >
            <!-- Left: Media Viewer -->
            <div class="lg:w-7/12 bg-black/80 flex items-center justify-center p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-zinc-800/80 relative min-h-[300px] sm:min-h-[420px]">
              <img
                :src="activeItem.image"
                :alt="activeItem.title"
                class="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
              >
              <!-- Index Counter Badge -->
              <div class="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                {{ (activeIndex || 0) + 1 }} / {{ allGalleryItems.length }}
              </div>
            </div>

            <!-- Right: Details & Action Panel -->
            <div class="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-zinc-950 text-white">
              <div>
                <!-- Category Label -->
                <div class="mb-4">
                  <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    {{ activeItem.categoryLabel }}
                  </span>
                </div>

                <!-- Title -->
                <h2 class="text-xl sm:text-2xl font-heading font-bold text-white uppercase leading-snug mb-4">
                  {{ activeItem.title }}
                </h2>

                <!-- Description -->
                <p class="text-sm text-zinc-300 leading-relaxed font-light mb-6">
                  {{ activeItem.description }}
                </p>

                <!-- Metadata Attributes -->
                <div class="space-y-3 pt-4 border-t border-zinc-800/80 mb-6 text-xs font-mono text-zinc-400">
                  <div v-if="activeItem.date" class="flex items-center justify-between">
                    <span>{{ t('Date Published') || 'Tanggal' }}:</span>
                    <span class="text-zinc-200">{{ formatDate(activeItem.date) }}</span>
                  </div>
                  <div v-if="activeItem.client" class="flex items-center justify-between">
                    <span>{{ t('Client / Context') || 'Klien / Mitra' }}:</span>
                    <span class="text-zinc-200">{{ activeItem.client }}</span>
                  </div>
                  <div v-if="activeItem.duration" class="flex items-center justify-between">
                    <span>{{ t('Timeline') || 'Durasi Pengerjaan' }}:</span>
                    <span class="text-zinc-200">{{ activeItem.duration }}</span>
                  </div>
                  <div v-if="activeItem.author" class="flex items-center justify-between">
                    <span>{{ t('Author') || 'Penulis' }}:</span>
                    <span class="text-zinc-200">{{ activeItem.author }}</span>
                  </div>
                </div>

                <!-- Tags list -->
                <div v-if="activeItem.tags && activeItem.tags.length > 0" class="mb-6">
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tag in activeItem.tags"
                      :key="tag"
                      class="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase text-zinc-300"
                    >
                      #{{ tag }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Action Link CTA Button -->
              <div class="pt-6 border-t border-zinc-800/80">
                <NuxtLink
                  v-if="activeItem.link"
                  :to="activeItem.link"
                  :target="activeItem.isExternal ? '_blank' : '_self'"
                  :rel="activeItem.isExternal ? 'noopener noreferrer' : undefined"
                  @click="closeModal"
                  class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] text-center"
                >
                  <span>{{ activeItem.linkText || (t('View Details') || 'Buka Halaman Lengkap') }}</span>
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Bottom Get In Touch CTA -->
    <div class="scroll-section will-change-[transform,opacity] w-full">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

.section-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}

/* Custom scrollbars for modal sidebar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #3f3f46;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #f59e0b;
}
</style>
