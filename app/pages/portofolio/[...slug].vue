<script setup lang="ts">
import type { PortofolioCollectionItem } from '~/types'

const { t, locale } = useI18n()

const route = useRoute()

// Get slug from route params
const slug = computed(() => {
  const params = route.params.slug
  if (Array.isArray(params)) {
    return params.join('/')
  }
  return params || ''
})

// Helper function for consistent link generation
const getPortofolioLink = (path?: string) => {
  return path?.replace(`/portofolio/${locale.value}`, '/portofolio') || '#'
}

// Fetch current portfolio item
const { data: current, error } = await useAsyncData(
  `portofolio-${locale.value}-${slug.value}`,
  () =>
    queryCollection('portofolio')
      .path(`/portofolio/${locale.value}/${slug.value}`)
      .first(),
  {
    watch: [locale],
  }
)

// Fetch all portfolio items for navigation
const { data: portofolios } = await useAsyncData<PortofolioCollectionItem[]>(
  `portofolio-all-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .select('path', 'title', 'description', 'image', 'category', 'tags', 'date', 'status', 'services', 'client', 'industry')
      .where('path', 'LIKE', `/portofolio/${locale.value}%`)
      .order('date', 'DESC')
      .all(),
  {
    watch: [locale],
  }
)

// Find prev and next projects
const currentIndex = computed(() => {
  if (!portofolios.value || !current.value) return -1
  return portofolios.value.findIndex(p => p.path === current.value?.path)
})

const prevProject = computed(() => {
  if (!portofolios.value || currentIndex.value <= 0) return null
  return portofolios.value[currentIndex.value - 1]
})

const nextProject = computed(() => {
  if (!portofolios.value || currentIndex.value < 0 || currentIndex.value >= portofolios.value.length - 1) return null
  return portofolios.value[currentIndex.value + 1]
})

// Handle 404
if (error.value || !current.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('Portfolio not found'),
    fatal: true
  })
}

// Extract all images from markdown content for carousel
const projectImages = computed(() => {
  if (!current.value) return []
  
  // Get the slug from the current project path
  // Get the slug from the current project path
  // Most portfolio projects have 3 mockup images numbered 1.webp, 2.webp, 3.webp
  // Extract the project folder name from the image path
  const imagePath = current.value.image?.replace(/\/[^/]+\.webp$/, '') || ''
  
  if (!imagePath) return []
  
  // Generate array of mockup image paths
  return [
    `${imagePath}/1.webp`,
    `${imagePath}/2.webp`,
    `${imagePath}/3.webp`
  ]
})

// Dynamic SEO with project data
useDynamicSeo({
  title: current.value?.title,
  description: current.value?.description || t('View project details and portfolio'),
  image: current.value?.image,
  type: 'article',
  publishedTime: current.value?.date,
  tags: current.value?.tags
})

</script>

<template>
  <main class="min-h-screen">
    <template v-if="current">
      <!-- Hero Header Section -->
      <section 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut' } }"
        class="py-16 md:py-24 px-4 border-b border-border/50"
      >
        <div class="container mx-auto max-w-4xl text-center">
          <!-- Category Badge -->
          <div class="mb-4">
            <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-400/10 text-amber-400 border border-amber-400/30">
              {{ current.category }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {{ current.title }}
          </h1>

          <!-- Description -->
          <p class="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {{ current.description }}
          </p>

          <!-- Meta Info -->
          <div class="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div v-if="current.client" class="flex items-center gap-2">
              <Icon name="lucide:briefcase" class="w-4 h-4" />
              <span>{{ current.client }}</span>
            </div>
            <div v-if="current.date" class="flex items-center gap-2">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <span>{{ new Date(current.date).toLocaleDateString(locale, { year: 'numeric', month: 'long' }) }}</span>
            </div>
            <div v-if="current.status" class="flex items-center gap-2">
              <Icon name="lucide:activity" class="w-4 h-4" />
              <span>{{ current.status }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Cover Image -->
      <section 
        v-if="current.image"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 100 } }"
        class="py-8 md:py-12"
      >
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="relative aspect-video rounded-2xl overflow-hidden border border-border/50">
            <img 
              :src="current.image" 
              :alt="current.title"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
      </section>

      <!-- Content Section with Grid Layout -->
      <section class="py-8 md:py-12 overflow-x-hidden">
        <UiGlobalSpotlight
          container-selector=".content-container"
          card-selector=".animated-card"
          :glow-color="'251, 191, 36'"
          :spotlight-radius="400"
          :enabled="true"
        />
        <div class="container mx-auto px-4">
          <div class="mx-auto max-w-6xl content-container">
            <div class="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <!-- Main Content -->
              <div 
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 200 } }"
                class="lg:col-span-8"
              >
                <!-- Content Renderer -->
                <div class="prose prose-lg dark:prose-invert max-w-none [&_img]:hidden">
                  <ContentRenderer :value="current" />
                </div>
              </div>

              <!-- Sidebar -->
              <aside 
                v-motion
                :initial="{ opacity: 0, x: 30 }"
                :visible="{ opacity: 1, x: 0, transition: { duration: 600, ease: 'easeOut', delay: 300 } }"
                class="lg:col-span-4"
              >
                <div class="sticky top-24 space-y-6">
                  <!-- Project Info Card -->
                  <UiAnimatedCard
                    :glow-color="'251, 191, 36'"
                    :particle-count="8"
                    :enable-particles="true"
                    :enable-tilt="false"
                    :enable-magnetism="false"
                    :enable-border-glow="false"
                    :click-effect="true"
                  >
                    <div class="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
                      <h3 class="text-lg font-heading font-bold mb-4">{{ t('Project Info') }}</h3>
                    
                    <div class="space-y-4">
                      <!-- Client -->
                      <div v-if="current.client">
                        <p class="text-sm text-muted-foreground mb-1">{{ t('Client') }}</p>
                        <p class="font-medium">{{ current.client }}</p>
                      </div>

                      <!-- Status -->
                      <div v-if="current.status">
                        <p class="text-sm text-muted-foreground mb-1">{{ t('Status') }}</p>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-400/10 text-amber-400 border border-amber-400/30">
                          {{ current.status }}
                        </span>
                      </div>

                      <!-- Industry -->
                      <div v-if="current.industry">
                        <p class="text-sm text-muted-foreground mb-1">{{ t('Industry') }}</p>
                        <p class="font-medium">{{ current.industry }}</p>
                      </div>

                      <!-- Date -->
                      <div v-if="current.date">
                        <p class="text-sm text-muted-foreground mb-1">{{ t('Date') }}</p>
                        <p class="font-medium">{{ new Date(current.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
                      </div>

                      <!-- Services -->
                      <div v-if="current.services && current.services.length > 0">
                        <p class="text-sm text-muted-foreground mb-2">{{ t('Services') }}</p>
                        <div class="flex flex-wrap gap-2">
                          <span 
                            v-for="service in current.services" 
                            :key="service"
                            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background border border-border/50"
                          >
                            {{ service }}
                          </span>
                        </div>
                      </div>

                      <!-- Tags -->
                      <div v-if="current.tags && current.tags.length > 0">
                        <p class="text-sm text-muted-foreground mb-2">{{ t('Technologies') }}</p>
                        <div class="flex flex-wrap gap-2">
                          <span 
                            v-for="tag in current.tags" 
                            :key="tag"
                            class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-linear-to-r from-amber-500 to-orange-500"
                          >
                            {{ tag }}
                          </span>
                        </div>
                      </div>
                    </div>
                    </div>
                  </UiAnimatedCard>

                  <!-- Back to Projects -->
                  <UiAnimatedCard
                    :glow-color="'251, 191, 36'"
                    :particle-count="8"
                    :enable-particles="true"
                    :enable-tilt="false"
                    :enable-magnetism="false"
                    :enable-border-glow="false"
                    :click-effect="true"
                  >
                    <NuxtLink
                      to="/portofolio"
                      class="block p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-amber-400/50 transition-all group text-center"
                    >
                      <span class="text-sm font-medium">{{ t('Back to Projects') }}</span>
                    </NuxtLink>
                  </UiAnimatedCard>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <!-- Project Images Carousel -->
      <section 
        v-if="projectImages.length > 0"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 450 } }"
        class="py-8 md:py-12 overflow-x-hidden"
      >
        <div class="container mx-auto px-4 max-w-6xl">
          <h2 class="text-2xl md:text-3xl font-heading font-bold mb-8 text-center">
            {{ t('Project Gallery') }}
          </h2>
          <div class="relative rounded-2xl overflow-hidden w-full">
            <UiCarousel :images="projectImages" />
          </div>
        </div>
      </section>

      <!-- Navigation Section -->
      <section 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 500 } }"
        class="py-12 px-4 border-t border-border/50 overflow-x-hidden"
      >
        <UiGlobalSpotlight
          container-selector=".navigation-container"
          card-selector=".animated-card"
          :glow-color="'251, 191, 36'"
          :spotlight-radius="400"
          :enabled="true"
        />
        <div class="container mx-auto max-w-6xl navigation-container">
          <h2 class="text-2xl font-heading font-bold mb-8 text-center">{{ t('More Projects') }}</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Previous Project -->
            <UiAnimatedCard
              v-if="prevProject"
              :glow-color="'251, 191, 36'"
              :particle-count="8"
              :enable-particles="true"
              :enable-tilt="false"
              :enable-magnetism="false"
              :enable-border-glow="false"
              :click-effect="true"
            >
              <NuxtLink 
                :to="getPortofolioLink(prevProject.path)"
                class="group relative block rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full min-h-64"
              >
                <!-- ── Image layer (visible on hover) ── -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img
                    :src="prevProject.image || '/placeholder.webp'"
                    :alt="prevProject.title"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <!-- Gradient overlay -->
                  <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
                  <!-- Direction indicator top -->
                  <div class="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                    <Icon name="lucide:arrow-left" class="w-4 h-4" />
                    {{ t('Previous') }}
                  </div>
                  <!-- Info bottom -->
                  <div class="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                      {{ prevProject.category }}
                    </span>
                    <h3 class="text-lg font-heading text-white font-semibold leading-snug">
                      {{ prevProject.title }}
                    </h3>
                  </div>
                </div>

                <!-- ── Default content layer (hidden on hover) ── -->
                <div class="relative z-20 p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                  <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-4">
                    <Icon name="lucide:arrow-left" class="w-4 h-4" />
                    <span>{{ t('Previous Project') }}</span>
                  </div>

                  <div class="flex items-start justify-between mb-4">
                    <div class="w-14 h-14 rounded-lg bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center transition-all duration-300">
                      <Icon name="lucide:folder-open" class="w-7 h-7 text-amber-400" />
                    </div>
                  </div>

                  <h3 class="text-xl font-heading font-semibold mb-2 text-foreground leading-snug">
                    {{ prevProject.title }}
                  </h3>

                  <p class="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                    {{ prevProject.description }}
                  </p>

                  <div class="flex flex-wrap gap-1.5 mt-auto">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      {{ prevProject.category }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </UiAnimatedCard>

            <!-- Next Project -->
            <UiAnimatedCard
              v-if="nextProject"
              :glow-color="'251, 191, 36'"
              :particle-count="8"
              :enable-particles="true"
              :enable-tilt="false"
              :enable-magnetism="false"
              :enable-border-glow="false"
              :click-effect="true"
            >
              <NuxtLink 
                :to="getPortofolioLink(nextProject.path)"
                class="group relative block rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full min-h-64"
              >
                <!-- ── Image layer (visible on hover) ── -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img
                    :src="nextProject.image || '/placeholder.webp'"
                    :alt="nextProject.title"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <!-- Gradient overlay -->
                  <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
                  <!-- Direction indicator top-right -->
                  <div class="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                    {{ t('Next') }}
                    <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  </div>
                  <!-- Info bottom -->
                  <div class="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-right">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                      {{ nextProject.category }}
                    </span>
                    <h3 class="text-lg font-heading text-white font-semibold leading-snug">
                      {{ nextProject.title }}
                    </h3>
                  </div>
                </div>

                <!-- ── Default content layer (hidden on hover) ── -->
                <div class="relative z-20 p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300 items-end text-right">
                  <div class="flex items-center justify-end gap-2 text-sm text-muted-foreground font-mono mb-4 w-full">
                    <span>{{ t('Next Project') }}</span>
                    <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  </div>

                  <div class="flex items-center justify-end mb-4 w-full">
                    <div class="w-14 h-14 rounded-lg bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center transition-all duration-300">
                      <Icon name="lucide:folder-open" class="w-7 h-7 text-amber-400" />
                    </div>
                  </div>

                  <h3 class="text-xl font-heading font-semibold mb-2 text-foreground leading-snug w-full">
                    {{ nextProject.title }}
                  </h3>

                  <p class="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1 w-full text-right">
                    {{ nextProject.description }}
                  </p>

                  <div class="flex flex-wrap justify-end gap-1.5 mt-auto w-full">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      {{ nextProject.category }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </UiAnimatedCard>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>
