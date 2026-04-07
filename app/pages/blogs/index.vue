<script setup lang="ts">
const { t, locale } = useI18n()

import type { BlogCollectionItem } from '~/types'

const { data: blogs } = await useAsyncData<BlogCollectionItem[]>(
  `blog-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('path', 'LIKE', `/blog/${locale.value}%`)
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

const placeholderBlogCards = computed(() => {
  if (filteredBlogs.value.length >= 1 && filteredBlogs.value.length <= 2) return 1
  return 0
})

const workInProgressText = computed(() => {
  return locale.value === 'id'
    ? 'Sedang dikerjakan oleh penulis'
    : 'Currently being worked on by the author'
})

useDynamicSeo({
  titleKey: 'seo.blogs.title',
  descriptionKey: 'seo.blogs.description',
  image: '/og-image.jpg'
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: 'numeric' })
}
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
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span class="text-xs font-mono text-amber-400/80">{{ t('Welcome to my blog') }}</span>
        </div>

        <!-- Main Heading -->
        <h1 class="text-4xl md:text-5xl lg:text-7xl font-heading mb-6 leading-tight animate-fade-in-up delay-100">
          {{ t('Thoughts') }}
          <span class="text-amber-400 inline-block hover:scale-105 transition-transform duration-300 cursor-default">
            &amp;
          </span>
          <br />
          <span class="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
            <span class="text-amber-400 hover:scale-105 inline-block transition-transform duration-300 cursor-default">{{ t('Articles') }}</span>
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
          {{ t('Insights, tutorials, and my personal journey through') }}
          <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3">
            {{ t('technology, design,') }}
          </UiTextGradient>
          {{ t('and') }}
          <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3">
            {{ t('software engineering.') }}
          </UiTextGradient>
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <UiAnimatedButton href="#blog-list" variant="primary">
            <template #default>{{ t('Read Articles') }}</template>
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

    <!-- BLOG LIST SECTION -->
    <section id="blog-list" class="section py-20 overflow-x-hidden">
      <UiGlobalSpotlight
        container-selector=".blogs-page-container"
        card-selector=".animated-card"
        :glow-color="'251, 191, 36'"
        :spotlight-radius="400"
        :enabled="true"
      />
      <div class="container max-w-6xl mx-auto px-6 lg:px-8 blogs-page-container">

        <!-- Filters -->
        <div class="mb-12 space-y-5">
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto">
            <div class="relative group/search">
              <div class="absolute inset-0 rounded-xl bg-amber-400/5 opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-300 -m-0.5 blur-sm" />
              <Icon name="lucide:search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within/search:text-amber-400 transition-colors duration-300 z-10" />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="t('Search articles...')"
                class="relative w-full pl-11 pr-10 py-3 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground text-sm z-10"
              />
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
              :class="selectedCategory === category ? 'bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/25 scale-105' : 'bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:border-amber-400/40 hover:text-foreground hover:scale-105'"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Blogs Grid -->
        <div v-if="filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UiAnimatedCard
            v-for="blog in filteredBlogs"
            :key="blog.path"
            :glow-color="'251, 191, 36'"
            :particle-count="8"
            :enable-particles="true"
            :enable-tilt="false"
            :enable-magnetism="false"
            :enable-border-glow="false"
            :click-effect="true"
          >
            <NuxtLink
              :to="getBlogLink(blog.path)"
              class="group relative flex flex-col rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full min-h-64"
            >
              <!-- Image Area -->
              <div class="relative h-48 overflow-hidden bg-gray-50 dark:bg-black/20 shrink-0">
                <img
                  :src="blog.coverImage || '/placeholder.webp'"
                  :alt="blog.title"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
                />
                <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                
                <div class="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm shadow-sm -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Icon name="lucide:pen-tool" class="w-3 h-3 text-amber-500" />
                  <span class="text-xs font-medium">{{ blog.author || 'Author' }}</span>
                </div>
              </div>

              <!-- Content Area -->
              <div class="relative z-20 p-6 flex flex-col flex-1">
                <div class="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-3">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-sm bg-amber-400/10 text-amber-500 border border-amber-400/20">
                    {{ blog.category || 'Tech' }}
                  </span>
                  <span>{{ formatDate(blog.date) }}</span>
                </div>

                <h3 class="text-xl font-heading font-semibold mb-2 group-hover:text-amber-400 transition-colors duration-300 leading-snug">
                  {{ blog.title }}
                </h3>

                <p class="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">
                  {{ blog.description }}
                </p>

                <div class="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div class="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="lucide:clock" class="w-3.5 h-3.5" />
                    <span>{{ blog.readTime || '5 min read' }}</span>
                  </div>
                  <div class="text-sm font-semibold text-amber-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1">
                    {{ t('Read More') }} <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  </div>
                </div>
              </div>
            </NuxtLink>
          </UiAnimatedCard>

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
          >
            <div class="h-full min-h-64 rounded-xl border border-dashed border-amber-400/40 bg-amber-400/5 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/15 border border-amber-400/30 mb-4">
                <Icon name="lucide:pen-square" class="w-6 h-6 text-amber-400" />
              </div>
              <p class="text-sm font-mono text-amber-300 leading-relaxed">
                {{ workInProgressText }}
              </p>
            </div>
          </UiAnimatedCard>
        </div>

        <div v-else class="text-center py-24">
          <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/20 mb-6">
            <Icon name="lucide:search-x" class="w-9 h-9 text-amber-400" />
          </div>
          <h3 class="text-2xl font-heading mb-2">{{ t('No Articles Found') }}</h3>
          <p class="text-muted-foreground text-sm mb-8 max-w-xs mx-auto">
            {{ t('Try adjusting your search or filter criteria') }}
          </p>
          <button @click="searchQuery = ''; selectedCategory = 'All'" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-400 text-gray-900 font-semibold text-sm hover:bg-amber-500 transition-colors duration-300 shadow-lg shadow-amber-400/25">
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
