<script setup lang="ts">
import type { BlogCollectionItem } from '~/types'

const { t, locale } = useI18n()

const { data: blogs } = await useAsyncData(
  `recent-blogs-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('stem', 'LIKE', `blog/${locale.value}/%`)
      .order('date', 'DESC')
      .limit(3)
      .all(),
  { watch: [locale] }
)

const displayedBlogs = computed(() => blogs?.value || [])

const placeholderBlogCards = computed(() => {
  if (displayedBlogs.value.length >= 1 && displayedBlogs.value.length <= 2) return 1
  return 0
})

const workInProgressText = computed(() => {
  return locale.value === 'id'
    ? 'Sedang dikerjakan oleh penulis'
    : 'Currently being worked on by the author'
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale.value, { year: 'numeric', month: 'short', day: 'numeric' })
}

const getBlogLink = (path?: string) => {
  return path?.replace(/^\/blog\/[^/]+/, '/blogs') || '#'
}
</script>

<template>
  <section class="w-full py-20 px-4 md:px-8 lg:px-12 overflow-hidden">
    <UiGlobalSpotlight
      container-selector=".blogs-container"
      card-selector=".animated-card"
      :glow-color="'251, 191, 36'"
      :spotlight-radius="400"
      :enabled="true"
    />
    <div class="max-w-6xl mx-auto blogs-container">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-heading mb-4">
          {{ t('Latest') }} <span class="text-amber-400">{{ t('Articles') }}</span>
        </h2>
        <p class="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {{ t('My recent') }} 
          <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3">
            {{ t('thoughts, tutorials') }}
          </UiTextGradient> 
          {{ t('and updates from the') }} 
          <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3">
            {{ t('blog') }}
          </UiTextGradient>
        </p>
      </div>

      <!-- Blogs Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiAnimatedCard
          v-for="blog in displayedBlogs"
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
                loading="lazy"
                decoding="async"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-10"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              
              <!-- Author avatar badge on hover -->
              <div class="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm shadow-sm -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <Icon name="lucide:pen-tool" class="w-3 h-3 text-amber-500" />
                <span class="text-xs font-medium">{{ blog.author || 'Author' }}</span>
              </div>
            </div>

            <!-- Content Area -->
            <div class="relative z-20 p-6 flex flex-col flex-1">
              <!-- Meta: Category & Date -->
              <div class="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-3">
                <span class="inline-flex items-center px-2 py-0.5 rounded-sm bg-amber-400/10 text-amber-500 border border-amber-400/20">
                  {{ blog.category || 'Tech' }}
                </span>
                <span>{{ formatDate(blog.date) }}</span>
              </div>

              <!-- Title -->
              <h3 class="text-xl font-heading font-semibold mb-2 group-hover:text-amber-400 transition-colors duration-300 leading-snug">
                {{ blog.title }}
              </h3>

              <!-- Description -->
              <p class="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">
                {{ blog.description }}
              </p>

              <!-- Footer Read Time -->
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

      <!-- View All Button -->
      <div v-if="displayedBlogs.length > 0" class="text-center mt-12">
        <UiAnimatedButton href="/blogs" variant="outline">
          <template #default>{{ t('View All Articles') }}</template>
          <template #iconRight>
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </template>
        </UiAnimatedButton>
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="inline-flex items-center justify-center p-4 rounded-full bg-amber-400/10 border border-amber-400/20 mb-4">
          <Icon name="lucide:pen-square" class="w-8 h-8 text-amber-400" />
        </div>
        <p class="text-muted-foreground font-mono">{{ t('No articles published yet.') }}</p>
      </div>
    </div>
  </section>
</template>
