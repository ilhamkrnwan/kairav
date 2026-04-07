<script setup lang="ts">
const { t, locale } = useI18n()

import type { PortofolioCollectionItem } from '~/types'

const { data: portofolios } = await useAsyncData<PortofolioCollectionItem[]>(
  `portofolio-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .select('path', 'title', 'description', 'image', 'category', 'tags', 'date', 'status', 'services', 'client', 'industry')
      .where('path', 'LIKE', `/portofolio/${locale.value}%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

const getPortofolioLink = (path?: string) => {
  return path?.replace(`/portofolio/${locale.value}`, '/portofolio') || '#'
}

const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = computed(() => {
  const uniqueCategories = new Set<string>(['All'])
  portofolios.value?.forEach(item => {
    if (item.category) uniqueCategories.add(item.category)
  })
  return Array.from(uniqueCategories)
})

const filteredPortfolios = computed(() => {
  let filtered = portofolios.value || []
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.title?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }
  return filtered
})

useDynamicSeo({
  titleKey: 'seo.portfolio.title',
  descriptionKey: 'seo.portfolio.description',
  image: '/og-image.jpg'
})

const getTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    'Nuxt.js': 'bg-green-600 hover:bg-green-700',
    'Nuxt 4': 'bg-green-600 hover:bg-green-700',
    'React': 'bg-blue-500 hover:bg-blue-600',
    'Vue': 'bg-green-600 hover:bg-green-700',
    'Vue.js': 'bg-green-600 hover:bg-green-700',
    'Node.js': 'bg-green-700 hover:bg-green-800',
    'Tailwind CSS': 'bg-cyan-600 hover:bg-cyan-700',
    'TypeScript': 'bg-blue-700 hover:bg-blue-800',
    'PHP Native': 'bg-indigo-700 hover:bg-indigo-800',
    'MySQL': 'bg-orange-700 hover:bg-orange-800',
    'Supabase': 'bg-green-700 hover:bg-green-800',
    'Google Gemini AI': 'bg-purple-600 hover:bg-purple-700',
    'Capacitor': 'bg-blue-600 hover:bg-blue-700',
    'Static Site': 'bg-gray-600 hover:bg-gray-700',
    'Mobile-First': 'bg-pink-600 hover:bg-pink-700',
    'Content-Driven': 'bg-teal-600 hover:bg-teal-700',
    'i18n': 'bg-indigo-600 hover:bg-indigo-700',
    'CMS': 'bg-purple-700 hover:bg-purple-800',
    'Shadcn UI': 'bg-slate-700 hover:bg-slate-800',
    'Nuxt UI v4': 'bg-green-700 hover:bg-green-800',
    'Educational Platform': 'bg-amber-600 hover:bg-amber-700',
    'Islamic Platform': 'bg-emerald-700 hover:bg-emerald-800',
    'Community System': 'bg-purple-600 hover:bg-purple-700'
  }
  return colors[tag] || 'bg-gray-600 hover:bg-gray-700'
}

</script>

<template>
  <div class="min-h-screen">

    <!-- ═══════════════════════════════════════
         HERO SECTION
    ════════════════════════════════════════ -->
    <section class="relative w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 overflow-hidden">
      <!-- Background decorative blobs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span class="text-xs font-mono text-amber-400/80">{{ t('Welcome to my projects') }}</span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-heading mb-6 leading-tight animate-fade-in-up delay-100">
          {{ t('Innovative') }}
          <span class="text-amber-400 inline-block hover:scale-105 transition-transform duration-300 cursor-default">
            {{ t('Projects') }}
          </span>
          <br />
          <span class="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
            &amp; <span class="text-amber-400 hover:scale-105 inline-block transition-transform duration-300 cursor-default">{{ t('Solutions') }}</span>
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          {{ t('Here are some of the projects I\'ve worked on, showcasing my skills and passion for creating') }}
          <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3">
            {{ t('innovative solutions') }}
          </UiTextGradient>
          {{ t('that make a') }}
          <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3">
            {{ t('real impact.') }}
          </UiTextGradient>
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <UiAnimatedButton href="#project-list" variant="primary">
            <template #default>{{ t('View Projects') }}</template>
            <template #iconRight>
              <Icon name="lucide:arrow-down" class="w-4 h-4" />
            </template>
          </UiAnimatedButton>
          <UiAnimatedButton href="/" variant="outline">
            <template #default>{{ t('Back to Home') }}</template>
            <template #iconRight>
              <Icon name="lucide:home" class="w-4 h-4" />
            </template>
          </UiAnimatedButton>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span class="text-xs text-muted-foreground font-mono">{{ t('scroll') }}</span>
        <Icon name="lucide:chevrons-down" class="w-4 h-4 text-amber-400/60" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         PROJECT LIST SECTION
    ════════════════════════════════════════ -->
    <section id="project-list" class="section py-20">
      <div class="container max-w-6xl mx-auto px-6 lg:px-8">

        <!-- Section Title -->
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-heading mb-4">
            {{ t('Featured') }} <span class="text-amber-400">{{ t('Work') }}</span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            {{ t('A collection of my projects, showcasing my skills in creating innovative and effective solutions across different domains.') }}
          </p>
        </div>

        <!-- ── Filters ── -->
        <div class="mb-12 space-y-5">

          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative group/search">
              <div class="absolute inset-0 rounded-xl bg-amber-400/5 opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-300 -m-0.5 blur-sm" />
              <Icon
                name="lucide:search"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/search:text-amber-400 transition-colors duration-300 z-10"
              />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t('Search projects by name, description, or tags...')"
                class="relative w-full pl-11 pr-10 py-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground text-sm z-10"
              />
              <!-- Clear button -->
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="lucide:x" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Category Pills -->
          <div class="flex flex-wrap items-center justify-center gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
              :class="
                selectedCategory === category
                  ? 'bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/25 scale-105'
                  : 'bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:border-amber-400/40 hover:text-foreground hover:scale-105'
              "
            >
              {{ category }}
            </button>
          </div>

        </div>

        <!-- ── Project Cards Grid ── -->
        <div v-if="filteredPortfolios.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiAnimatedCard
            v-for="project in filteredPortfolios"
            :key="project.path"
            :glow-color="'251, 191, 36'"
            :particle-count="8"
            :enable-particles="true"
            :enable-tilt="false"
            :enable-magnetism="false"
            :enable-border-glow="false"
            :click-effect="true"
          >
            <NuxtLink
              :to="getPortofolioLink(project.path)"
              class="group relative block rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full min-h-64"
            >
              <!-- ── Image layer (visible on hover) ── -->
              <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <img
                  :src="project.image || '/placeholder.webp'"
                  :alt="project.title"
                  class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
                <!-- Arrow icon top-right -->
                <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 flex items-center justify-center translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                  <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-amber-300" />
                </div>
                <!-- Info bottom -->
                <div class="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                    {{ project.category }}
                  </span>
                  <h3 class="text-lg font-heading text-white font-semibold leading-snug">
                    {{ project.title }}
                  </h3>
                  <p class="text-xs text-white/60 mt-1 font-mono">{{ t('View Details') }} →</p>
                </div>
              </div>

              <!-- ── Default content layer (hidden on hover) ── -->
              <div class="relative z-20 p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                <!-- Icon + category -->
                <div class="flex items-start justify-between mb-4">
                  <div class="w-14 h-14 rounded-lg bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-300">
                    <Icon name="lucide:folder-open" class="w-7 h-7 text-amber-400" />
                  </div>
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                    {{ project.category }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-xl font-heading font-semibold mb-2 text-foreground leading-snug">
                  {{ project.title }}
                </h3>

                <!-- Description -->
                <p class="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                  {{ project.description }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-1.5 mt-auto">
                  <span
                    v-for="tag in project.tags?.slice(0, 3)"
                    :key="tag"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white transition-colors duration-300"
                    :class="getTagColor(tag)"
                  >
                    {{ tag }}
                  </span>
                  <span
                    v-if="project.tags && project.tags.length > 3"
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-muted-foreground bg-background/80 border border-border/50"
                  >
                    +{{ project.tags.length - 3 }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </UiAnimatedCard>
        </div>

        <!-- ── Empty State ── -->
        <div v-else class="text-center py-24">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
            <Icon name="lucide:search-x" class="w-9 h-9 text-amber-400" />
          </div>
          <h3 class="text-2xl font-heading mb-2">{{ t('No Projects Found') }}</h3>
          <p class="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
            {{ t('Try adjusting your search or filter criteria') }}
          </p>
          <button
            @click="searchQuery = ''; selectedCategory = 'All'"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 text-gray-900 font-semibold text-sm hover:bg-amber-500 transition-colors duration-300 shadow-lg shadow-amber-400/25"
          >
            <Icon name="lucide:rotate-ccw" class="w-4 h-4" />
            {{ t('Clear Filters') }}
          </button>
        </div>

      </div>
    </section>

    <GetinTouch />
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
</style>