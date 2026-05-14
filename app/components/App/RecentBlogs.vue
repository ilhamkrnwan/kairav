<script setup lang="ts">
const { t, locale } = useI18n()

const { data: blogs } = await useAsyncData(
  `recent-blogs-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('stem', 'LIKE', `blog/${locale.value}/%`)
      .order('date', 'DESC')
      .limit(4)
      .all(),
  { watch: [locale] }
)

const displayedBlogs = computed(() => blogs?.value || [])

const placeholderBlogCards = computed(() => {
  if (displayedBlogs.value.length >= 1 && displayedBlogs.value.length <= 3) return 1
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
  <section class="section py-20 px-6 md:px-12 lg:px-20 overflow-hidden text-gray-800 dark:text-white">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

        <!-- Section Header (sticky, kiri) -->
        <div class="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <h2 class="leading-[0.88] tracking-tight mb-6">
            <span class="section-title-filled block">{{ t('Latest') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Articles') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="w-12 h-1 bg-amber-400 mb-6"></div>
          <p class="text-sm font-mono tracking-wider text-muted-foreground leading-relaxed">
            {{ t('My recent') }}
            <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3">
              {{ t('thoughts, tutorials') }}
            </UiTextGradient>
            {{ t('and updates from the') }}
            <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3">
              {{ t('blog') }}
            </UiTextGradient>
          </p>
          <div class="mt-8 hidden lg:block">
            <UiAnimatedButton v-if="displayedBlogs.length > 0" href="/blogs" variant="outline">
              <template #default>{{ t('View All Articles') }}</template>
              <template #iconRight>
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </template>
            </UiAnimatedButton>
          </div>
        </div>

        <!-- Blogs Grid (kanan) -->
        <div class="lg:col-span-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                class="group relative block rounded-sm overflow-hidden bg-background/40 backdrop-blur-md border border-border/30 hover:bg-background/60 transition-all duration-300 h-full shadow-lg"
              >
                <!-- Image (revealed on hover) -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <img
                    :src="blog.coverImage || '/placeholder.webp'"
                    :alt="blog.title"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                  <!-- Title on image hover state -->
                  <div class="absolute bottom-0 left-0 right-0 p-5">
                    <h3 class="text-lg font-heading text-white font-semibold tracking-wide">
                      {{ blog.title }}
                    </h3>
                  </div>
                </div>

                <!-- Default Content (hidden on hover) -->
                <div class="relative z-20 p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                  <!-- Icon -->
                  <div class="w-14 h-14 mb-6 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center transition-all duration-300">
                    <Icon name="lucide:newspaper" class="w-6 h-6 text-amber-400" />
                  </div>

                  <!-- Meta: Category & Date -->
                  <div class="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-3">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-sm bg-amber-400/10 text-amber-500 border border-amber-400/20">
                      {{ blog.category || 'Tech' }}
                    </span>
                    <span>{{ formatDate(blog.date) }}</span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-xl font-heading font-semibold mb-3 text-foreground tracking-wide">
                    {{ blog.title }}
                  </h3>

                  <!-- Description -->
                  <p class="text-sm font-light text-muted-foreground mb-6 leading-relaxed line-clamp-3 flex-1">
                    {{ blog.description }}
                  </p>

                  <!-- Footer: Read Time -->
                  <div class="flex items-center gap-1.5 mt-auto text-xs text-muted-foreground">
                    <Icon name="lucide:clock" class="w-3.5 h-3.5" />
                    <span>{{ blog.readTime || '5 min read' }}</span>
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
            >
              <div class="h-full min-h-[280px] rounded-sm border border-dashed border-amber-400/30 bg-amber-400/5 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center shadow-lg">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-amber-400/10 border border-amber-400/20 mb-4">
                  <Icon name="lucide:pen-square" class="w-5 h-5 text-amber-400" />
                </div>
                <p class="text-sm font-mono tracking-widest uppercase text-amber-500/70 leading-relaxed">
                  {{ workInProgressText }}
                </p>
              </div>
            </UiAnimatedCard>
          </div>

          <!-- Mobile Button -->
          <div class="mt-8 lg:hidden block text-center">
            <UiAnimatedButton v-if="displayedBlogs.length > 0" href="/blogs" variant="outline">
              <template #default>{{ t('View All Articles') }}</template>
              <template #iconRight>
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </template>
            </UiAnimatedButton>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}
</style>