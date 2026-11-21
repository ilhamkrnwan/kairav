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

useDynamicSeo({
  titleKey: 'seo.blogs.title',
  descriptionKey: 'seo.blogs.description'
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}



</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <UiEditorialIntro :title="t('Blogs')">
      {{ t('Insights, tutorials, and my personal journey through') }}
      {{ t('technology, design,') }}
      {{ t('and') }}
      {{ t('software engineering.') }}
    </UiEditorialIntro>

    <!-- Blog list -->
    <section id="blog-list" class="site-frame editorial-section catalogue">
      <div>
        <h2 class="catalogue-heading">{{ t('Latest') + ' ' + t('Articles') }}</h2>

        <!-- Filters -->
        <div class="catalogue-filters">
          <UInput
            v-model="searchQuery"
            icon="lucide:search"
            size="xl"
            :placeholder="t('Search')"
            :aria-label="t('Search articles by title, description, or tags...')"
            class="w-full max-w-md"
            :ui="{ base: 'rounded-lg sm:rounded-xl bg-elevated' }"
          >
            <template v-if="searchQuery" #trailing>
              <UButton
                icon="lucide:x"
                color="neutral"
                variant="link"
                size="sm"
                class="size-11 justify-center"
                :aria-label="t('Clear Filters')"
                @click="searchQuery = ''"
              />
            </template>
          </UInput>

          <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :label="category"
              size="sm"
              :color="selectedCategory === category ? 'primary' : 'neutral'"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              :aria-pressed="selectedCategory === category"
              class="liquid-button min-h-11 min-w-11 justify-center rounded-lg sm:rounded-lg transition-all duration-300"
              @click="selectedCategory = category"
            />
          </div>
        </div>

        <!-- Featured article -->
        <div v-if="featuredBlog" class="catalogue-feature">
          <ULink :to="getBlogLink(featuredBlog.path)" raw class="group block">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div class="lg:col-span-7 relative aspect-video overflow-hidden border border-default bg-muted group-hover:border-primary/50 transition-all duration-500">
                <NuxtImg
                  :src="featuredBlog.coverImage || '/placeholder.avif'"
                  alt=""
                  width="1280"
                  height="720"
                  format="avif"
                  loading="eager"
                  class="size-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div class="lg:col-span-5 flex flex-col justify-center">
                <h3 class="text-lg sm:text-2xl md:text-3xl font-heading text-highlighted leading-[1.15] mb-3 sm:mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {{ featuredBlog.title }}
                </h3>

                <p class="text-xs sm:text-sm md:text-base font-normal text-muted leading-relaxed line-clamp-3">
                  {{ featuredBlog.description }}
                </p>

              </div>
            </div>
          </ULink>
        </div>

        <!-- Section label when featured is shown -->
        <div v-if="featuredBlog && regularBlogs.length" class="mb-6 ">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm text-muted flex items-center gap-2 font-medium">
              <UIcon name="lucide:layers" class="size-3.5 text-primary" />
              <span>{{ t('More Articles') }}</span>
            </h3>
            <span class="text-sm font-medium text-muted">{{ regularBlogs.length }} {{ t('articles') }}</span>
          </div>
        </div>

        <!-- Grid: skeleton -->
        <div v-if="status === 'pending'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <UiSkeletonContentCard v-for="i in 6" :key="i" />
        </div>

        <!-- Grid: articles -->
        <TransitionGroup v-else-if="regularBlogs.length" tag="div" name="filter" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <UiContentCard
            v-for="blog in regularBlogs"
            :key="blog.path"
            :to="getBlogLink(blog.path)"
            :title="blog.title"
            :description="blog.description"
            :image="blog.coverImage"
          />
        </TransitionGroup>

        <!-- Empty state -->
        <div v-else class="text-center py-24 ">
          <UAvatar icon="lucide:search-x" size="3xl" :ui="{ root: 'bg-primary/10 ring ring-primary/20 mb-6', icon: 'text-primary' }" />
          <h3 class="text-2xl font-heading mb-2">{{ t('No Articles Found') }}</h3>
          <p class="text-muted text-sm mb-8 max-w-xs mx-auto">
            {{ t('Try adjusting your search or filter criteria') }}
          </p>
          <UButton
            icon="lucide:rotate-ccw"
            :label="t('Clear Filters')"
            size="lg"
            class="liquid-button min-h-11 rounded-md "
            @click="clearFilters"
          />
        </div>
      </div>
    </section>

    <div class="w-full">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }


</style>
