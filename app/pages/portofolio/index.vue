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
    {
      watch: [locale],
    }
  )

  const getPortofolioLink = (path?: string) => {
    return path?.replace(`/portofolio/${locale.value}`, '/portofolio') || '#'
  }

  // State management
  const searchQuery = ref('')
  const selectedCategory = ref('All')

  // Extract unique categories from portfolio data
  const categories = computed(() => {
    const uniqueCategories = new Set<string>(['All'])
    portofolios.value?.forEach(item => {
      if (item.category) {
        uniqueCategories.add(item.category)
      }
    })
    return Array.from(uniqueCategories)
  })

  // Filtered portfolios based on search and category
  const filteredPortfolios = computed(() => {
    let filtered = portofolios.value || []

    // Filter by category
    if (selectedCategory.value !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory.value)
    }

    // Filter by search query
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

  // Navigation
  const router = useRouter()
  const goBack = () => {
    router.back()
  }

  // CTA handlers
  const handleContactClick = () => {
    navigateTo('/#contact')
  }

  const handleLearnMoreClick = () => {
    navigateTo('/home#about')
  }

  useSeoMeta({
    title: () => t('Portofolio - NataKarsa'),
    description: () => t('Lihat hasil karya dan proyek yang telah kami kerjakan'),
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
    <!-- Hero Section -->
    <section class="w-full flex items-center justify-center min-h-screen text-gray-800 dark:text-white px-4 md:px-8 lg:px-12">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Icon with ALL decorative blobs -->
        <div class="relative inline-block mb-8 group mt-8">
          <!-- Main background glow -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] rounded-full bg-linear-to-tr from-amber-400/20 to-orange-500/20 blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
          
          <!-- Rotating ring -->
          <div class="absolute inset-0 rounded-full border border-amber-400/20 scale-[1.3] animate-spin-slow -z-10 border-dashed"></div>

          <!-- Blob Hero (Behind) -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] -z-10 opacity-60 animate-float">
              <img src="/blob-hero.svg" alt="" class="w-full h-full object-contain" />
          </div>

          <!-- Icon Container -->
          <div class="relative w-32 h-32 md:w-40 md:h-40 mx-auto z-10">
            <div class="w-full h-full rounded-full bg-linear-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center border-4 border-amber-400/30 shadow-2xl shadow-amber-400/20 transition-transform duration-500 group-hover:scale-105">
              <Icon name="lucide:rocket" class="w-12 h-12 md:w-16 md:h-16 text-amber-400" />
            </div>
            
            <!-- Blob Left Top -->
            <div class="absolute -top-8 -left-8 w-14 h-14 animate-float z-20 delay-100">
              <img src="/blob-left.svg" alt="" class="w-full h-full object-contain drop-shadow-md" />
            </div>

            <!-- Blob Right Top -->
            <div class="absolute -top-10 -right-6 w-12 h-12 animate-float2 z-0 delay-300">
               <img src="/blob-rb.svg" alt="" class="w-full h-full object-contain opacity-80" />
            </div>

            <!-- Blob Left Bottom -->
            <div class="absolute -bottom-4 -left-10 w-16 h-16 animate-float2 z-20 delay-500">
               <img src="/blob-lb.svg" alt="" class="w-full h-full object-contain drop-shadow-md" />
            </div>

            <!-- Blob Right Bottom -->
            <div class="absolute -bottom-6 -right-8 w-14 h-14 animate-float z-20 delay-700">
              <div class="relative w-full h-full">
                  <img src="/blob-right.svg" alt="" class="w-full h-full object-contain drop-shadow-md absolute inset-0" />
                  <img src="/blob-lb2.svg" alt="" class="w-full h-full object-contain drop-shadow-md absolute inset-0" />
              </div>
            </div>

          </div>
        </div>

        <!-- Greeting Text -->
        <p class="text-sm md:text-base text-muted-foreground mb-4 font-mono animate-fade-in-up">
          {{ t('Welcome to my projects') }}
        </p>

        <!-- Main Heading -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 leading-tight animate-fade-in-up delay-100">
          Innovative <span class="text-amber-400 inline-block hover:scale-105 transition-transform cursor-default">Projects</span> <br class="hidden md:block" />& <span class="text-amber-400 inline-block hover:scale-105 transition-transform cursor-default">Solutions</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up delay-200">
          Here are some of the projects I've worked on, showcasing my skills and passion for creating innovative solutions that make a real impact.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
          <UiAnimatedButton href="#project-list" variant="primary">
            <template #default>{{ t('View Details') }}</template>
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
    </section>

    <!-- Project List Section -->
    <section id="project-list" class="section py-20 text-gray-800 dark:text-white">
      <div class="container max-w-6xl mx-auto px-6 lg:px-8">
        <!-- Section Title -->
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-heading mb-4">
            Featured <span class="text-amber-400">Work</span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of my projects, showcasing my skills in creating innovative and effective solutions across different domains.
          </p>
        </div>

        <!-- Filters Section -->
        <div class="mb-12 space-y-6">
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t('Search projects by name, description, or tags...')"
                class="w-full pl-12 pr-4 py-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <!-- Category Filter -->
          <div class="flex flex-wrap items-center justify-center gap-3">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              :class="
                selectedCategory === category
                  ? 'bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/30'
                  : 'bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:border-amber-400/30 hover:text-foreground'
              "
            >
              {{ category }}
            </button>
          </div>

          <!-- Results Count -->
          <div class="text-center">
            <p class="text-sm text-muted-foreground">
              {{ t('Showing') }} <span class="font-semibold text-amber-400">{{ filteredPortfolios.length }}</span> 
              {{ t('of') }} <span class="font-semibold">{{ portofolios?.length || 0 }}</span> {{ t('projects') }}
            </p>
          </div>
        </div>

        <!-- Project Cards -->
        <div v-if="filteredPortfolios.length > 0" class="space-y-16">
          <article 
            v-for="(project, index) in filteredPortfolios" 
            :key="project.path"
            class="group max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center p-6 md:p-8 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/50 hover:bg-background/50 hover:border-amber-400/30 transition-all duration-500"
            :class="{ 'md:grid-flow-dense': index % 2 !== 0 }"
          >
            <!-- Image -->
            <NuxtLink :to="getPortofolioLink(project.path)" class="relative block overflow-hidden rounded-xl" :class="{ 'md:col-start-2': index % 2 !== 0 }">
              <div class="absolute inset-0 bg-linear-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-500 z-10"></div>
              <figure class="relative aspect-video overflow-hidden">
                <img 
                  class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out" 
                  :src="project.image || '/placeholder.png'" 
                  :alt="project.title"
                >
              </figure>
            </NuxtLink>
            
            <!-- Content -->
            <div :class="{ 'md:col-start-1 md:row-start-1': index % 2 !== 0 }">
              <header class="mb-4">
                <!-- Category Badge -->
                <div class="mb-3">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                    {{ project.category }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-2xl lg:text-3xl font-heading font-bold leading-tight mb-3 group-hover:text-amber-400 transition-colors duration-300">
                  <NuxtLink :to="getPortofolioLink(project.path)">
                    {{ project.title }}
                  </NuxtLink>
                </h3>

                <!-- Tags -->
                <div v-if="project.tags && project.tags.length > 0" class="mb-4">
                  <ul class="flex flex-wrap gap-2">
                    <li v-for="tag in project.tags.slice(0, 4)" :key="tag">
                      <span 
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white transition duration-300" 
                        :class="getTagColor(tag)"
                      >
                        {{ tag }}
                      </span>
                    </li>
                    <li v-if="project.tags.length > 4">
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-muted-foreground">
                        +{{ project.tags.length - 4 }}
                      </span>
                    </li>
                  </ul>
                </div>
              </header>

              <!-- Description -->
              <p class="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                {{ project.description }}
              </p>
    
              <!-- Footer -->
              <footer class="flex items-center justify-between flex-wrap gap-4">
                <div class="flex items-center gap-4">
                  <!-- View Project Link -->
                  <NuxtLink 
                    :to="getPortofolioLink(project.path)"
                    class="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-500 transition-colors duration-300 group/link"
                  >
                    {{ t('View Details') }}
                    <Icon name="lucide:arrow-right" class="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                  </NuxtLink>
                </div>
              </footer>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-400/10 mb-6">
            <Icon name="lucide:search-x" class="w-10 h-10 text-amber-400" />
          </div>
          <h3 class="text-2xl font-heading mb-2">{{ t('No Projects Found') }}</h3>
          <p class="text-muted-foreground mb-6">
            {{ t('Try adjusting your search or filter criteria') }}
          </p>
          <button
            @click="searchQuery = ''; selectedCategory = 'All'"
            class="px-6 py-2 rounded-full bg-amber-400 text-gray-900 font-semibold hover:bg-amber-500 transition-colors duration-300"
          >
            {{ t('Clear Filters') }}
          </button>
        </div>
      </div>
    </section>
    
    <!-- Get In Touch -->
    <GetinTouch />
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(-5deg); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg) scale(1.3); }
  to { transform: rotate(360deg) scale(1.3); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float2 {
  animation: float2 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.delay-100 { animation-delay: 0.1s; }
.delay-300 { animation-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; }
.delay-700 { animation-delay: 0.7s; }
</style>
