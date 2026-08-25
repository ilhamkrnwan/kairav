<script setup lang="ts">
import type { BlogCollectionItem } from '~/types'

const { t, locale } = useI18n()

const { data: blogs, status } = await useAsyncData<BlogCollectionItem[]>(
  `blog-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('stem', 'LIKE', `blog/${locale.value}/%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

const getBlogLink = (path?: string) => {
  return path?.replace(/^\/blog\/[^/]+/, '/blogs') || '#'
}

const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = computed(() => {
  const uniqueCategories = new Set<string>(['All'])
  blogs.value?.forEach(item => {
    if (item.category) uniqueCategories.add(item.category)
  })
  return Array.from(uniqueCategories)
})

const filteredBlogs = computed(() => {
  let filtered = blogs.value || []
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

const featuredBlog = computed(() => {
  // Tampilkan artikel sorotan jika tidak sedang mencari dan berada di kategori All
  if (selectedCategory.value === 'All' && !searchQuery.value && filteredBlogs.value.length > 0) {
    return filteredBlogs.value[0]
  }
  return null
})

const regularBlogs = computed(() => {
  if (featuredBlog.value) {
    return filteredBlogs.value.slice(1)
  }
  return filteredBlogs.value
})

const placeholderBlogCards = computed(() => {
  if (regularBlogs.value.length >= 1 && regularBlogs.value.length <= 2) return 1
  return 0
})

const workInProgressText = computed(() => {
  return locale.value === 'id'
    ? 'Sedang dikerjakan oleh penulis'
    : 'Currently being worked on by the author'
})

useDynamicSeo({
  titleKey: 'seo.blogs.title',
  descriptionKey: 'seo.blogs.description'
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: 'numeric' })
}
// Initialize Scroll Reveal Animations
useScrollReveal()
</script>

<template>
  <div class="min-h-screen">

    <!-- HERO SECTION -->
    <section class="relative w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 overflow-hidden">
      <!-- Background decorative blobs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border/40 bg-background/60 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">{{ t('Welcome to my blog') }}</span>
        </div>

        <!-- Main Heading -->
        <h1 class="leading-[0.88] tracking-tight mb-8 animate-fade-in-up delay-100">
          <span class="section-title-filled block">{{ t('Thoughts') }}</span>
          <span class="section-title-outline text-foreground block">& {{ t('Articles') }}<span class="text-amber-400 !important">.</span></span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light">
          {{ t('Insights, tutorials, and my personal journey through') }}
          <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3" class="font-medium">
            {{ t('technology, design,') }}
          </UiTextGradient>
          {{ t('and') }}
          <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3" class="font-medium">
            {{ t('software engineering.') }}
          </UiTextGradient>
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <NuxtLink
            to="#blog-list"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5"
          >
            <div class="absolute inset-0 z-0 overflow-hidden rounded-sm">
              <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
            </div>
            <span class="relative z-10 flex items-center gap-2">
              {{ t('Read Articles') }}
            </span>
            <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
              <Icon name="lucide:arrow-down" class="w-4 h-4" />
            </span>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
          >
            <span class="relative z-10 flex items-center gap-2">
              {{ t('Back to Home') }}
            </span>
            <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
              <Icon name="lucide:home" class="w-4 h-4" />
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span class="text-xs text-muted-foreground font-mono">{{ t('scroll') }}</span>
        <Icon name="lucide:chevrons-down" class="w-4 h-4 text-amber-400/60" />
      </div>
    </section>

    <!-- BLOG LIST SECTION -->
    <section id="blog-list" class="scroll-section will-change-[transform,opacity] section py-20">
      <div class="container max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Section Title -->
        <div class="text-center mb-16 stagger-item">
          <h2 class="leading-[0.88] tracking-tight mb-4">
            <span class="section-title-filled block">{{ t('Latest') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Articles') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            {{ t('A collection of my writings, sharing insights and experiences across technology, design, and software engineering.') }}
          </p>
        </div>

        <!-- Filters -->
        <div class="mb-12 space-y-5 stagger-item">
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative group/search">
              <div class="absolute inset-0 rounded-sm sm:rounded-xl bg-amber-400/5 opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-300 -m-0.5 blur-sm" />
              <Icon
                name="lucide:search"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/search:text-amber-400 transition-colors duration-300 z-10"
              />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t('Search articles by title, description, or tags...')"
                class="relative w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-sm sm:rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm z-10"
              />
              <button
                v-if="searchQuery"
                class="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-muted-foreground hover:text-foreground transition-colors duration-200"
                @click="searchQuery = ''"
              >
                <Icon name="lucide:x" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Category Pills -->
          <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <button
              v-for="category in categories"
              :key="category"
              class="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-sm sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer"
              :class="selectedCategory === category
                ? 'bg-amber-400 text-gray-900 shadow-md sm:shadow-lg shadow-amber-400/25 scale-102 sm:scale-105 font-bold'
                : 'bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:border-amber-400/40 hover:text-foreground hover:scale-102 sm:hover:scale-105'"
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Featured / Highlight Article (Most Recent - Borderless Editorial Style) -->
        <div v-if="featuredBlog" class="mb-14 sm:mb-20 stagger-item">
          <NuxtLink
            :to="getBlogLink(featuredBlog.path)"
            class="group block"
          >
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              <!-- Cover Image Area (Left) -->
              <div class="lg:col-span-7 relative aspect-[16/9] overflow-hidden rounded-sm sm:rounded-2xl border border-border/30 bg-muted/20 shadow-2xl shadow-black/10 group-hover:border-amber-400/50 transition-all duration-500">
                <NuxtImg
                  :src="featuredBlog.coverImage || '/placeholder.avif'"
                  :alt="featuredBlog.title"
                  width="1280"
                  height="720"
                  format="avif"
                  loading="eager"
                  class="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                <!-- Category Badge on Image -->
                <div class="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-background/85 backdrop-blur-md border border-amber-400/40 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold shadow-lg">
                    <Icon name="lucide:sparkles" class="w-3 h-3" />
                    {{ featuredBlog.category || 'Tech' }}
                  </span>
                </div>
              </div>

              <!-- Content / Editorial Info (Right - Borderless) -->
              <div class="lg:col-span-5 flex flex-col justify-center">
                <!-- Highlight Indicator -->
                <div class="flex items-center gap-2 mb-3">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                  </span>
                  <span class="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    {{ t('Featured Article') }}
                  </span>
                </div>

                <!-- Meta Info: Date + Read Time -->
                <div class="flex items-center gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 sm:mb-4">
                  <span class="text-foreground/90 font-medium">{{ formatDate(featuredBlog.date) }}</span>
                  <span>•</span>
                  <span class="flex items-center gap-1 text-muted-foreground">
                    <Icon name="lucide:clock" class="w-3 h-3 text-amber-400" />
                    {{ featuredBlog.readTime || '5 min' }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-lg sm:text-2xl md:text-3xl font-heading font-black text-foreground leading-[1.15] mb-3 sm:mb-4 tracking-tight group-hover:text-amber-400 transition-colors duration-300">
                  {{ featuredBlog.title }}
                </h3>

                <!-- Description -->
                <p class="text-xs sm:text-sm md:text-base font-light text-muted-foreground leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                  {{ featuredBlog.description }}
                </p>

                <!-- Tags -->
                <div v-if="featuredBlog.tags && featuredBlog.tags.length > 0" class="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                  <span
                    v-for="tag in featuredBlog.tags.slice(0, 3)"
                    :key="tag"
                    class="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm text-[9px] sm:text-[10px] font-mono uppercase tracking-wider bg-background/60 border border-border/40 text-foreground/80"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <!-- CTA Action Link -->
                <div class="flex items-center gap-3">
                  <span class="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-amber-400 group-hover:text-amber-300 transition-colors">
                    {{ t('Read Full Essay') }}
                    <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Section Label when featured is shown -->
        <div v-if="featuredBlog && regularBlogs.length > 0" class="flex items-center justify-between mb-6 stagger-item border-t border-border/20 pt-8">
          <h3 class="text-xs sm:text-sm font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Icon name="lucide:layers" class="w-3.5 h-3.5 text-amber-400" />
            <span>{{ t('More Articles') }}</span>
          </h3>
          <span class="text-[10px] sm:text-xs font-mono text-muted-foreground">{{ regularBlogs.length }} {{ t('articles') }}</span>
        </div>

        <!-- Blogs Grid Skeleton -->
        <div v-if="status === 'pending'" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <UiSkeletonBlogCard v-for="i in 6" :key="`blog-skeleton-${i}`" />
        </div>

        <!-- Blogs Grid -->
        <div v-else-if="regularBlogs.length > 0" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <UiAnimatedCard
            v-for="blog in regularBlogs"
            :key="blog.path"
            :glow-color="'251, 191, 36'"
            :particle-count="8"
            :enable-particles="true"
            :enable-tilt="false"
            :enable-magnetism="false"
            :enable-border-glow="false"
            :click-effect="true"
            class="stagger-item"
          >
            <NuxtLink
              :to="getBlogLink(blog.path)"
              class="group relative block rounded-sm sm:rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full min-h-[160px] sm:min-h-64"
            >
              <!-- Image layer (visible on hover) -->
              <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <NuxtImg
                  :src="blog.coverImage || '/placeholder.avif'"
                  :alt="blog.title"
                  width="600"
                  height="337"
                  format="avif"
                  loading="lazy"
                  decoding="async"
                  class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                />
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
                <!-- Arrow icon top-right -->
                <div class="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 flex items-center justify-center translate-x-1 -translate-y-1 sm:translate-x-2 sm:-translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                  <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                </div>
                <!-- Info bottom -->
                <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span class="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-mono font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-1 sm:mb-2 max-w-[120px] sm:max-w-none truncate">
                    {{ blog.category || 'Tech' }}
                  </span>
                  <h3 class="text-xs sm:text-base md:text-lg font-heading text-white font-semibold leading-snug line-clamp-2">
                    {{ blog.title }}
                  </h3>
                  <p class="text-[10px] sm:text-xs text-white/60 mt-0.5 sm:mt-1 font-mono">{{ t('Read More') }} →</p>
                </div>
              </div>

              <!-- Default content layer (hidden on hover) -->
              <div class="relative z-20 p-3 sm:p-5 md:p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                <!-- Icon + category -->
                <div class="flex items-start justify-between gap-1 mb-2 sm:mb-4">
                  <div class="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-300 shrink-0">
                    <Icon name="lucide:newspaper" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />
                  </div>
                  <span class="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-sm bg-background border border-border/30 text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate max-w-[75px] sm:max-w-none">
                    {{ blog.category || 'Tech' }}
                  </span>
                </div>

                <!-- Title -->
                <h3 class="text-xs sm:text-base md:text-xl font-heading font-semibold mb-1.5 sm:mb-3 text-foreground leading-snug tracking-wide group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                  {{ blog.title }}
                </h3>

                <!-- Description (visible on both mobile and desktop) -->
                <p class="text-[11px] sm:text-sm font-light text-muted-foreground mb-3 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1">
                  {{ blog.description }}
                </p>

                <!-- Footer: Date + Read time -->
                <div class="flex items-center justify-between mt-auto pt-1 sm:pt-0">
                  <div class="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <Icon name="lucide:clock" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{{ blog.readTime || '5 min' }}</span>
                  </div>
                  <span class="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {{ formatDate(blog.date) }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </UiAnimatedCard>

          <!-- Placeholder Card -->
          <UiAnimatedCard
            v-for="index in placeholderBlogCards"
            :key="`blog-placeholder-${index}`"
            :glow-color="'251, 191, 36'"
            :particle-count="5"
            :enable-particles="false"
            :enable-tilt="false"
            :enable-magnetism="false"
            :enable-border-glow="false"
            :click-effect="false"
            class="stagger-item"
          >
            <div class="h-full min-h-[160px] sm:min-h-64 rounded-sm sm:rounded-xl border border-dashed border-amber-400/40 bg-amber-400/5 backdrop-blur-sm p-3 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center">
              <div class="inline-flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-amber-400/15 border border-amber-400/30 mb-2 sm:mb-4">
                <Icon name="lucide:pen-square" class="w-4 h-4 sm:w-6 sm:h-6 text-amber-400" />
              </div>
              <p class="text-xs sm:text-sm font-mono text-amber-300 leading-relaxed">
                {{ workInProgressText }}
              </p>
            </div>
          </UiAnimatedCard>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-24 stagger-item">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
            <Icon name="lucide:search-x" class="w-9 h-9 text-amber-400" />
          </div>
          <h3 class="text-2xl font-heading mb-2">{{ t('No Articles Found') }}</h3>
          <p class="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
            {{ t('Try adjusting your search or filter criteria') }}
          </p>
          <button
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 text-gray-900 font-semibold text-sm hover:bg-amber-500 transition-colors duration-300 shadow-lg shadow-amber-400/25"
            @click="searchQuery = ''; selectedCategory = 'All'"
          >
            <Icon name="lucide:rotate-ccw" class="w-4 h-4" />
            {{ t('Clear Filters') }}
          </button>
        </div>

      </div>
    </section>

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
  font-size: clamp(2rem, 6vw, 4.5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(2rem, 6vw, 4.5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px currentColor;
  opacity: 0.85;
}
</style>
