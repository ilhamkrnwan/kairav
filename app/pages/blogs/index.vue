<script setup lang="ts">

const { t, locale } = useI18n()

const { data: blogs, status } = await useAsyncData(
  `blog-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('stem', 'LIKE', `blog/${locale.value}/%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

const getBlogLink = (path?: string) => path?.replace(/^\/blog\/[^/]+/, '/blogs') || '#'

const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = computed(() => [
  'All',
  ...new Set((blogs.value ?? []).map(item => item.category).filter((c): c is string => !!c))
])

const filteredBlogs = computed(() => {
  let filtered = blogs.value || []
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.title?.toLowerCase().includes(query)
      || item.description?.toLowerCase().includes(query)
      || item.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }
  return filtered
})

// Featured article: only when not searching and on the "All" category
const featuredBlog = computed(() =>
  selectedCategory.value === 'All' && !searchQuery.value ? filteredBlogs.value[0] : undefined
)

const regularBlogs = computed(() => (featuredBlog.value ? filteredBlogs.value.slice(1) : filteredBlogs.value))

const placeholderBlogCards = computed(() => (regularBlogs.value.length >= 1 && regularBlogs.value.length <= 2 ? 1 : 0))

const workInProgressText = computed(() =>
  locale.value === 'id' ? 'Sedang dikerjakan oleh penulis' : 'Currently being worked on by the author'
)

useDynamicSeo({
  titleKey: 'seo.blogs.title',
  descriptionKey: 'seo.blogs.description'
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: 'numeric' })
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}


// Initialize Scroll Reveal Animations
useScrollReveal()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 overflow-hidden">

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h1 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-8 animate-fade-in-up delay-100">
          <span class="section-title-filled block">{{ t('Thoughts') }}</span>
          <span class="section-title-outline block">& {{ t('Articles') }}<span class="text-primary">.</span></span>
        </h1>

        <p class="text-base md:text-lg text-muted mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-normal">
          {{ t('Insights, tutorials, and my personal journey through') }}
          <UiTextGradient class="font-medium">
            {{ t('technology, design,') }}
          </UiTextGradient>
          {{ t('and') }}
          <UiTextGradient class="font-medium">
            {{ t('software engineering.') }}
          </UiTextGradient>
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <UiArrowButton to="#blog-list" variant="primary" icon="lucide:arrow-down">
            {{ t('Read Articles') }}
          </UiArrowButton>

          <UiArrowButton to="/" variant="secondary" icon="lucide:home">
            {{ t('Back to Home') }}
          </UiArrowButton>
        </div>
      </div>
    </section>

    <!-- Blog list -->
    <section id="blog-list" class="scroll-section will-change-[transform,opacity] section py-20">
      <div class="container max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 stagger-item">
          <h2 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-4">
            <span class="section-title-filled block">{{ t('Latest') }}</span>
            <span class="section-title-outline block">{{ t('Articles') }}<span class="text-primary">.</span></span>
          </h2>
          <p class="text-muted text-lg max-w-2xl mx-auto font-normal">
            {{ t('A collection of my writings, sharing insights and experiences across technology, design, and software engineering.') }}
          </p>
        </div>

        <!-- Filters -->
        <div class="mb-12 space-y-5 stagger-item">
          <UInput
            v-model="searchQuery"
            icon="lucide:search"
            size="xl"
            :placeholder="t('Search articles by title, description, or tags...')"
            class="w-full max-w-2xl mx-auto block"
            :ui="{ base: 'rounded-lg sm:rounded-xl bg-elevated' }"
          >
            <template v-if="searchQuery" #trailing>
              <UButton
                icon="lucide:x"
                color="neutral"
                variant="link"
                size="sm"
                :aria-label="t('Clear Filters')"
                @click="searchQuery = ''"
              />
            </template>
          </UInput>

          <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :label="category"
              size="sm"
              :color="selectedCategory === category ? 'primary' : 'neutral'"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              class="rounded-lg sm:rounded-lg transition-all duration-300 hover:scale-102 sm:hover:scale-105"
              @click="selectedCategory = category"
            />
          </div>
        </div>

        <!-- Featured article -->
        <div v-if="featuredBlog" class="mb-14 sm:mb-20 stagger-item">
          <ULink :to="getBlogLink(featuredBlog.path)" raw class="group block">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div class="lg:col-span-7 relative aspect-video overflow-hidden rounded-lg sm:rounded-lg border border-default bg-muted/20 group-hover:border-primary/50 transition-all duration-500">
                <NuxtImg
                  :src="featuredBlog.coverImage || '/placeholder.avif'"
                  :alt="featuredBlog.title"
                  width="1280"
                  height="720"
                  format="avif"
                  loading="eager"
                  class="size-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div class="lg:col-span-5 flex flex-col justify-center">
                <div class="flex items-center gap-2 mb-3">
                  <span class="relative flex size-2">
                    <span class="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-75" />
                    <span class="relative inline-flex rounded-full size-2 bg-primary" />
                  </span>
                  <span class="text-xs sm:text-xs text-primary font-bold">
                    {{ t('Featured Article') }}
                  </span>
                </div>

                <p class="mb-3 text-sm font-semibold text-toned">{{ featuredBlog.category || 'Tech' }}</p>

                <div class="flex items-center gap-3 text-xs sm:text-xs text-muted mb-3 sm:mb-4 font-medium">
                  <span class="text-highlighted/90 font-medium">{{ formatDate(featuredBlog.date) }}</span>
                  <span>•</span>
                  <span class="flex items-center gap-1">
                    <UIcon name="lucide:clock" class="size-3 text-primary" />
                    {{ featuredBlog.readTime || '5 min' }}
                  </span>
                </div>

                <h3 class="text-lg sm:text-2xl md:text-3xl font-heading text-highlighted leading-[1.15] mb-3 sm:mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {{ featuredBlog.title }}
                </h3>

                <p class="text-xs sm:text-sm md:text-base font-normal text-muted leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                  {{ featuredBlog.description }}
                </p>

                <div v-if="featuredBlog.tags?.length" class="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                  <UBadge
                    v-for="tag in featuredBlog.tags.slice(0, 3)"
                    :key="tag"
                    :label="`#${tag}`"
                    color="neutral"
                    variant="outline"
                    class="text-xs sm:text-xs bg-elevated text-highlighted/80 font-medium"
                  />
                </div>

                <span class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary group-hover:text-primary/85 transition-colors">
                  {{ t('Read Full Essay') }}
                  <UIcon name="lucide:arrow-right" class="size-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </ULink>
        </div>

        <!-- Section label when featured is shown -->
        <div v-if="featuredBlog && regularBlogs.length" class="mb-6 stagger-item">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm text-muted flex items-center gap-2 font-medium">
              <UIcon name="lucide:layers" class="size-3.5 text-primary" />
              <span>{{ t('More Articles') }}</span>
            </h3>
            <span class="text-sm font-medium text-muted">{{ regularBlogs.length }} {{ t('articles') }}</span>
          </div>
        </div>

        <!-- Grid: skeleton -->
        <div v-if="status === 'pending'" class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <UiSkeletonBlogCard v-for="i in 6" :key="`blog-skeleton-${i}`" />
        </div>

        <!-- Grid: articles -->
        <TransitionGroup v-else-if="regularBlogs.length" tag="div" name="filter" class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <div
            v-for="blog in regularBlogs"
            :key="blog.path"
            class="stagger-item"
          >
            <ULink :to="getBlogLink(blog.path)" raw class="group flex h-full flex-col gap-3">
              <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted transition-colors duration-300 group-hover:border-primary/50">
                <NuxtImg
                  :src="blog.coverImage || '/placeholder.avif'"
                  :alt="blog.title"
                  width="600"
                  height="337"
                  format="avif"
                  loading="lazy"
                  decoding="async"
                  class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <div class="flex flex-1 flex-col">
                <UBadge
                  :label="blog.category || 'Tech'"
                  color="neutral"
                  variant="outline"
                  size="xs"
                  class="mb-2 w-fit max-w-full font-medium"
                />
                <h3 class="line-clamp-2 font-heading text-sm leading-snug text-highlighted transition-colors duration-300 group-hover:text-primary sm:text-lg">
                  {{ blog.title }}
                </h3>
                <p class="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                  {{ blog.description }}
                </p>
                <div class="mt-3 flex items-center justify-between text-xs font-medium text-muted">
                  <div class="flex items-center gap-1.5">
                    <UIcon name="lucide:clock" class="size-3.5" />
                    <span>{{ blog.readTime || '5 min' }}</span>
                  </div>
                  <span>{{ formatDate(blog.date) }}</span>
                </div>
              </div>
            </ULink>
          </div>

          <!-- Placeholder card -->
          <div
            v-for="index in placeholderBlogCards"
            :key="`blog-placeholder-${index}`"
            class="stagger-item"
          >
            <div class="h-full min-h-[160px] sm:min-h-64 rounded-lg sm:rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 sm:p-5 md:p-6 flex flex-col items-center justify-center text-center">
              <UAvatar icon="lucide:pen-square" size="lg" :ui="{ root: 'bg-primary/15 ring ring-primary/30 mb-2 sm:mb-4', icon: 'text-primary' }" />
              <p class="text-xs sm:text-sm text-primary/85 leading-relaxed">
                {{ workInProgressText }}
              </p>
            </div>
          </div>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-else class="text-center py-24 stagger-item">
          <UAvatar icon="lucide:search-x" size="3xl" :ui="{ root: 'bg-primary/10 ring ring-primary/20 mb-6', icon: 'text-primary' }" />
          <h3 class="text-2xl font-heading mb-2">{{ t('No Articles Found') }}</h3>
          <p class="text-muted text-sm mb-8 max-w-xs mx-auto">
            {{ t('Try adjusting your search or filter criteria') }}
          </p>
          <UButton
            icon="lucide:rotate-ccw"
            :label="t('Clear Filters')"
            size="lg"
            class="rounded-md shadow-lg shadow-primary/25"
            @click="clearFilters"
          />
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


</style>
