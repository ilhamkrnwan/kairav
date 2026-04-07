<script setup lang="ts">
import type { BlogCollectionItem } from '~/types'

const { t, locale } = useI18n()

const route = useRoute()

const slug = computed(() => {
  const params = route.params.slug
  if (Array.isArray(params)) {
    return params.join('/')
  }
  return params || ''
})

const normalizeBlogPath = (item?: BlogCollectionItem | null) => {
  return item?.path || item?._path || ''
}

const getBlogLink = (item: BlogCollectionItem) => {
  const rawPath = normalizeBlogPath(item)
  return rawPath?.replace(/^\/blog\/[^/]+/, '/blogs') || '#'
}

const { data: current, error } = await useAsyncData(
  `blog-${locale.value}-${slug.value}`,
  () =>
    queryCollection('blog')
      .path(`/blog/${locale.value}/${slug.value}`)
      .first(),
  { watch: [locale] }
)

const { data: blogs } = await useAsyncData<BlogCollectionItem[]>(
  `blog-all-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('stem', 'LIKE', `blog/${locale.value}/%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

const currentIndex = computed(() => {
  if (!blogs.value || !current.value) return -1
  return blogs.value.findIndex(p => normalizeBlogPath(p) === normalizeBlogPath(current.value))
})

const prevBlog = computed(() => {
  if (!blogs.value || currentIndex.value <= 0) return null
  return blogs.value[currentIndex.value - 1]
})

const nextBlog = computed(() => {
  if (!blogs.value || currentIndex.value < 0 || currentIndex.value >= blogs.value.length - 1) return null
  return blogs.value[currentIndex.value + 1]
})

if (error.value || !current.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('Article not found'),
    fatal: true
  })
}

useDynamicSeo({
  title: current.value?.title,
  description: current.value?.description || t('View article details'),
  image: current.value?.coverImage,
  type: 'article',
  publishedTime: current.value?.date,
  tags: current.value?.tags
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale.value, { year: 'numeric', month: 'long', day: 'numeric' })
}
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
          <div class="mb-4">
            <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-amber-400/10 text-amber-400 border border-amber-400/30">
              {{ current.category }}
            </span>
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            {{ current.title }}
          </h1>

          <p class="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {{ current.description }}
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div v-if="current.author" class="flex items-center gap-2">
              <Icon name="lucide:user" class="w-4 h-4" />
              <span>{{ current.author }}</span>
            </div>
            <div v-if="current.date" class="flex items-center gap-2">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <span>{{ formatDate(current.date) }}</span>
            </div>
            <div v-if="current.readTime" class="flex items-center gap-2">
              <Icon name="lucide:clock" class="w-4 h-4" />
              <span>{{ current.readTime }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Cover Image -->
      <section 
        v-if="current.coverImage"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 100 } }"
        class="py-8 md:py-12"
      >
        <div class="container mx-auto px-4 max-w-6xl">
          <div class="relative aspect-video rounded-2xl overflow-hidden border border-border/50">
            <img 
              :src="current.coverImage" 
              :alt="current.title"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="py-8 md:py-12 overflow-x-hidden">
        <div class="container mx-auto px-4">
          <div class="mx-auto max-w-4xl">
            <div 
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 200 } }"
              class="prose prose-lg dark:prose-invert max-w-none"
            >
              <ContentRenderer :value="current" />
            </div>

            <!-- Tags -->
            <div v-if="current.tags && current.tags.length > 0" class="mt-12 pt-8 border-t border-border/50">
              <h3 class="text-sm text-muted-foreground mb-4">{{ t('Tags:') }}</h3>
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
            
            <!-- Back to Blogs -->
            <div class="mt-12">
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
                    to="/blogs"
                    class="block p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-amber-400/50 transition-all group text-center"
                  >
                    <span class="text-sm font-medium">{{ t('Back to Articles') }}</span>
                  </NuxtLink>
                </UiAnimatedCard>
            </div>
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
          <h2 class="text-2xl font-heading font-bold mb-8 text-center">{{ t('Next to Read') }}</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Previous Blog -->
            <UiAnimatedCard
              v-if="prevBlog"
              :glow-color="'251, 191, 36'"
              :particle-count="8"
              :enable-particles="true"
              :enable-tilt="false"
              :enable-magnetism="false"
              :enable-border-glow="false"
              :click-effect="true"
            >
              <NuxtLink
                :to="getBlogLink(prevBlog)"
                class="group relative block rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full min-h-64"
              >
                <!-- Image layer (visible on hover) -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img
                    :src="prevBlog.coverImage || '/placeholder.webp'"
                    :alt="prevBlog.title"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <!-- Gradient overlay -->
                  <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
                  <div class="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                    <Icon name="lucide:arrow-left" class="w-4 h-4" />
                    {{ t('Previous Article') }}
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                      {{ prevBlog.category }}
                    </span>
                    <h3 class="text-lg font-heading text-white font-semibold leading-snug">
                      {{ prevBlog.title }}
                    </h3>
                  </div>
                </div>

                <!-- Default content layer (hidden on hover) -->
                <div class="relative z-20 p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                  <div class="flex items-center gap-2 text-sm text-muted-foreground font-mono mb-4">
                    <Icon name="lucide:arrow-left" class="w-4 h-4" />
                    <span>{{ t('Previous Article') }}</span>
                  </div>

                  <div class="flex items-start justify-between mb-4">
                    <div class="w-14 h-14 rounded-lg bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center transition-all duration-300">
                      <Icon name="lucide:pen-tool" class="w-7 h-7 text-amber-400" />
                    </div>
                  </div>

                  <h3 class="text-xl font-heading font-semibold mb-2 text-foreground leading-snug">
                    {{ prevBlog.title }}
                  </h3>

                  <p class="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                    {{ prevBlog.description }}
                  </p>

                  <div class="flex flex-wrap gap-1.5 mt-auto">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      {{ prevBlog.category }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </UiAnimatedCard>

            <!-- Next Blog -->
            <UiAnimatedCard
              v-if="nextBlog"
              :glow-color="'251, 191, 36'"
              :particle-count="8"
              :enable-particles="true"
              :enable-tilt="false"
              :enable-magnetism="false"
              :enable-border-glow="false"
              :click-effect="true"
            >
              <NuxtLink
                :to="getBlogLink(nextBlog)"
                class="group relative block rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full min-h-64"
              >
                <!-- Image layer (visible on hover) -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <img
                    :src="nextBlog.coverImage || '/placeholder.webp'"
                    :alt="nextBlog.title"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <!-- Gradient overlay -->
                  <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
                  <div class="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                    {{ t('Next Article') }}
                    <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  </div>
                  <div class="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-right">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-2">
                      {{ nextBlog.category }}
                    </span>
                    <h3 class="text-lg font-heading text-white font-semibold leading-snug">
                      {{ nextBlog.title }}
                    </h3>
                  </div>
                </div>

                <!-- Default content layer (hidden on hover) -->
                <div class="relative z-20 p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300 items-end text-right">
                  <div class="flex items-center justify-end gap-2 text-sm text-muted-foreground font-mono mb-4 w-full">
                    <span>{{ t('Next Article') }}</span>
                    <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  </div>

                  <div class="flex items-center justify-end mb-4 w-full">
                    <div class="w-14 h-14 rounded-lg bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center transition-all duration-300">
                      <Icon name="lucide:pen-tool" class="w-7 h-7 text-amber-400" />
                    </div>
                  </div>

                  <h3 class="text-xl font-heading font-semibold mb-2 text-foreground leading-snug w-full">
                    {{ nextBlog.title }}
                  </h3>

                  <p class="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1 w-full text-right">
                    {{ nextBlog.description }}
                  </p>

                  <div class="flex flex-wrap justify-end gap-1.5 mt-auto w-full">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/30">
                      {{ nextBlog.category }}
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
