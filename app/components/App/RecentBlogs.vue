<script setup lang="ts">
const { t, locale } = useI18n()

const { data: blogs, status } = await useAsyncData(
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
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

        <!-- Section Header (sticky, kiri) -->
        <div class="lg:col-span-4 lg:sticky lg:top-32 h-fit scroll-section will-change-[transform,opacity] z-0">
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
        </div>

        <!-- Blogs Grid (kanan) -->
        <div class="lg:col-span-8 relative z-10">
          <div v-if="status === 'pending'" class="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <UiSkeletonBlogCard v-for="i in 3" :key="`recent-blog-skeleton-${i}`" />
          </div>
          <div v-else class="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <UiAnimatedCard
              v-for="blog in displayedBlogs"
              :key="blog.path"
              class="scroll-section will-change-[transform,opacity]"
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
                class="group relative block rounded-sm overflow-hidden bg-background/40 backdrop-blur-md border border-border/30 hover:bg-background/60 transition-all duration-300 h-full min-h-[160px] sm:min-h-[300px] shadow-lg"
              >
                <!-- Image (revealed on hover) -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <NuxtImg
                    :src="blog.coverImage || '/placeholder.avif'"
                    :alt="blog.title"
                    width="600"
                    height="337"
                    format="avif"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                  <!-- Title on image hover state -->
                  <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
                    <h3 class="text-xs sm:text-base md:text-lg font-heading text-white font-semibold tracking-wide line-clamp-2">
                      {{ blog.title }}
                    </h3>
                  </div>
                </div>

                <!-- Default Content (hidden on hover) -->
                <div class="relative z-20 p-3 sm:p-5 md:p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                  <!-- Icon -->
                  <div class="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 sm:mb-4 md:mb-6 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center transition-all duration-300 shrink-0">
                    <Icon name="lucide:newspaper" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />
                  </div>

                  <!-- Meta: Category & Date -->
                  <div class="flex items-center justify-between gap-1 text-[8px] sm:text-xs font-mono text-muted-foreground mb-1.5 sm:mb-3">
                    <span class="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-amber-400/10 text-amber-500 border border-amber-400/20 truncate max-w-[75px] sm:max-w-none">
                      {{ blog.category || 'Tech' }}
                    </span>
                    <span class="truncate">{{ formatDate(blog.date) }}</span>
                  </div>

                  <!-- Title -->
                  <h3 class="text-xs sm:text-base md:text-xl font-heading font-semibold mb-2 sm:mb-3 text-foreground tracking-wide line-clamp-2">
                    {{ blog.title }}
                  </h3>

                  <!-- Description (visible on both mobile and desktop) -->
                  <p class="text-[11px] sm:text-sm font-light text-muted-foreground mb-3 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1">
                    {{ blog.description }}
                  </p>

                  <!-- Footer: Read Time -->
                  <div class="flex items-center gap-1 sm:gap-1.5 mt-auto text-[8px] sm:text-xs text-muted-foreground">
                    <Icon name="lucide:clock" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>{{ blog.readTime || '5 min' }}</span>
                  </div>
                </div>
              </NuxtLink>
            </UiAnimatedCard>

            <!-- Explore More Articles Card -->
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
                class="group relative flex h-full min-h-[160px] sm:min-h-[300px] md:min-h-[320px] flex-col rounded-sm border border-amber-400/30 bg-amber-400/5 p-3 sm:p-5 md:p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-amber-400/10"
              >
                <div
                  class="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 sm:mb-4 md:mb-6 rounded-sm bg-linear-to-br from-amber-400/15 to-orange-500/15 border border-amber-400/25 flex items-center justify-center transition-all duration-300 group-hover:from-amber-400/25 group-hover:to-orange-500/25 shrink-0"
                >
                  <Icon name="lucide:book-open" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />
                </div>

                <h3 class="text-xs sm:text-base md:text-xl font-heading font-semibold mb-1 sm:mb-2 md:mb-3 text-foreground tracking-wide line-clamp-2">
                  {{ t('View All Articles') }}
                </h3>

                <p class="text-[11px] sm:text-sm font-light text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {{ t('Baca tulisan, opini, panduan teknis, dan refleksi mindset lainnya di halaman artikel lengkap.') }}
                </p>

                <div class="mt-auto pt-2 sm:pt-4 md:pt-6">
                  <span class="inline-flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-300">
                    {{ t('Explore Articles') }}
                    <Icon name="lucide:arrow-right" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </NuxtLink>
            </UiAnimatedCard>
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