<script setup lang="ts">
import type { ServiceCollectionItem } from '~/types'

definePageMeta({
  key: route => route.fullPath,
})

const { t, locale } = useI18n()
const route = useRoute()

const slug = computed(() => {
  const params = route.params.slug
  if (Array.isArray(params)) return params.join('/')
  return params || ''
})

const normalizeServicePath = (item?: ServiceCollectionItem | null) => item?.path || item?._path || ''
const getServiceLink = (item: ServiceCollectionItem) => normalizeServicePath(item).replace(/^\/services\/[^/]+/, '/services') || '#'

const { data: current, error, status } = await useAsyncData(
  `service-${locale.value}-${slug.value}`,
  () =>
    queryCollection('services')
      .path(`/services/${locale.value}/${slug.value}`)
      .first(),
  { watch: [locale, slug] }
)

const { data: services } = await useAsyncData<ServiceCollectionItem[]>(
  `services-all-${locale.value}`,
  () =>
    queryCollection('services')
      .where('stem', 'LIKE', `services/${locale.value}/%`)
      .order('order', 'ASC')
      .all(),
  { watch: [locale] }
)

const currentIndex = computed(() => {
  if (!services.value || !current.value) return -1
  return services.value.findIndex(item => normalizeServicePath(item) === normalizeServicePath(current.value))
})

const prevService = computed(() => {
  if (!services.value || currentIndex.value < 0) return null
  const len = services.value.length
  return services.value[(currentIndex.value - 1 + len) % len]
})

const nextService = computed(() => {
  if (!services.value || currentIndex.value < 0) return null
  return services.value[(currentIndex.value + 1) % services.value.length]
})

if (status.value !== 'pending' && (error.value || !current.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: t('Service not found'),
    fatal: true
  })
}

useDynamicSeo({
  title: current.value?.seo?.title || current.value?.title,
  description: current.value?.seo?.description || current.value?.description || t('View service details'),
  image: current.value?.coverImage || current.value?.image
})

useServiceSchema({
  title: current.value?.title,
  description: current.value?.seo?.description || current.value?.description,
  category: current.value?.category,
  duration: current.value?.duration,
  deliverables: current.value?.deliverables,
  tags: current.value?.tags,
  url: current.value ? getServiceLink(current.value as ServiceCollectionItem) : undefined,
})

const breadcrumbItems = computed(() => [
  { label: t('Services'), to: '/services' },
  { label: current.value?.title || t('Service Details') }
])
</script>

<template>
  <main class="min-h-screen">
    <template v-if="status === 'pending'">
      <UiSkeletonDetail type="service" />
    </template>
    <template v-else-if="current">
      <section class="py-10 sm:py-16 md:py-24 px-4 border-b border-border/40">
        <div class="container mx-auto max-w-6xl text-center">
          <div class="mb-4 sm:mb-6">
            <span class="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm text-[9px] sm:text-[10px] font-mono tracking-widest uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30">
              {{ current.category }}
            </span>
          </div>

          <div class="mx-auto mb-6 sm:mb-8 w-12 h-12 sm:w-16 sm:h-16 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center">
            <Icon :name="current.icon || 'lucide:layers'" class="w-5 h-5 sm:w-7 sm:h-7 text-amber-400" />
          </div>

          <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight mb-4 sm:mb-6 md:mb-8 leading-snug sm:leading-tight uppercase">
            {{ current.title }}
          </h1>

          <p class="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-5xl mx-auto font-medium leading-relaxed">
            {{ current.description }}
          </p>

          <div class="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
            <div v-if="current.duration" class="flex items-center gap-1.5 sm:gap-2 bg-background/50 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-border/40">
              <Icon name="lucide:calendar-clock" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              <span>{{ current.duration }}</span>
            </div>
            <div v-if="current.featured" class="flex items-center gap-1.5 sm:gap-2 bg-background/50 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm border border-border/40">
              <Icon name="lucide:sparkles" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              <span>{{ t('Featured Service') }}</span>
            </div>
          </div>

          <!-- Breadcrumbs at the bottom of hero above section border -->
          <div class="mt-6 sm:mt-8 flex justify-center">
            <UiBreadcrumb :items="breadcrumbItems" />
          </div>
        </div>
      </section>

      <!-- Cover Image Section -->
      <section 
        v-if="current.coverImage || current.image"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 100 } }"
        class="pt-8 pb-4 md:pt-12 md:pb-6"
      >
        <div class="container mx-auto px-4 max-w-5xl">
          <div class="relative aspect-video rounded-sm overflow-hidden border border-border/40 shadow-xl shadow-black/5">
            <img 
              :src="current.coverImage || current.image" 
              :alt="current.title"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
      </section>

      <section class="py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            <article class="lg:col-span-8">
              <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-black prose-headings:uppercase prose-p:text-foreground/80">
                <ContentRenderer :value="current" />
              </div>
            </article>

            <aside class="lg:col-span-4">
              <div class="lg:sticky lg:top-28 rounded-sm border border-border/40 bg-background/60 backdrop-blur-md p-5 shadow-xl shadow-black/5">
                <h2 class="text-xs font-mono tracking-widest uppercase text-muted-foreground mb-4 flex items-center gap-2">
                  <Icon name="lucide:check-circle" class="w-3.5 h-3.5 text-amber-400" />
                  <span>{{ t('Deliverables') }}</span>
                </h2>
                <ul class="space-y-2.5 mb-5">
                  <li
                    v-for="deliverable in current.deliverables"
                    :key="deliverable"
                    class="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/90 leading-snug"
                  >
                    <Icon name="lucide:check" class="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span>{{ deliverable }}</span>
                  </li>
                </ul>

                <div v-if="current.tags && current.tags.length > 0" class="flex flex-wrap gap-1.5 mb-5">
                  <span
                    v-for="tag in current.tags"
                    :key="tag"
                    class="inline-flex items-center px-2 py-0.5 rounded-sm text-[9px] sm:text-[10px] font-mono tracking-widest uppercase bg-background/80 border border-border/40 text-muted-foreground hover:border-amber-400/50 hover:text-foreground transition-colors"
                  >
                    {{ tag }}
                  </span>
                </div>

                <NuxtLink
                  to="/contact"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-amber-400 px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-widest text-black transition-all hover:bg-amber-500 shadow-md shadow-amber-400/20 mb-5"
                >
                  {{ t('Discuss This Service') }}
                  <Icon name="lucide:send" class="w-3.5 h-3.5" />
                </NuxtLink>

                <!-- Share Service -->
                <div class="pt-4 border-t border-border/40">
                  <AppSocialShare :title="current.title" :label="t('Share Service')" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <!-- Navigation Section -->
      <section 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 500 } }"
        class="py-12 px-4 border-t border-border/40 overflow-x-hidden"
      >
        <UiGlobalSpotlight
          container-selector=".navigation-container"
          card-selector=".animated-card"
          :glow-color="'251, 191, 36'"
          :spotlight-radius="400"
          :enabled="true"
        />
        <div class="container mx-auto max-w-7xl navigation-container">
          <h2 class="leading-[0.88] tracking-tight mb-12 text-center">
            <span class="section-title-filled block">{{ t('More') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Services') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <!-- Previous Service -->
            <UiAnimatedCard
              v-if="prevService"
              :glow-color="'251, 191, 36'"
              :particle-count="8"
              :enable-particles="true"
              :enable-tilt="false"
              :enable-magnetism="false"
              :enable-border-glow="false"
              :click-effect="true"
            >
              <NuxtLink 
                :to="getServiceLink(prevService)"
                class="group relative block rounded-sm overflow-hidden bg-background/80 backdrop-blur-md border border-border/40 hover:border-amber-400/50 transition-all duration-300 h-full min-h-[160px] sm:min-h-64 shadow-xl shadow-black/5"
              >
                <!-- ── Image layer (visible on hover) ── -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <NuxtImg
                    :src="prevService.coverImage || prevService.image || '/placeholder.avif'"
                    :alt="prevService.title"
                    width="600"
                    height="337"
                    format="avif"
                    loading="lazy"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <!-- Gradient overlay -->
                  <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
                  <!-- Direction indicator top-left -->
                  <div class="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-sm bg-background/80 backdrop-blur-md border border-border/40 text-foreground font-mono text-[8px] sm:text-[10px] uppercase tracking-wider translate-x-1 -translate-y-1 sm:translate-x-2 sm:-translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                    <Icon name="lucide:arrow-left" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                    {{ t('Previous') }}
                  </div>
                  <!-- Info bottom -->
                  <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span class="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[8px] sm:text-[10px] font-mono tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-1 sm:mb-2">
                      {{ prevService.category }}
                    </span>
                    <h3 class="text-xs sm:text-base md:text-lg font-heading text-white font-semibold leading-snug uppercase line-clamp-2">
                      {{ prevService.title }}
                    </h3>
                  </div>
                </div>

                <!-- ── Default content layer (hidden on hover) ── -->
                <div class="relative z-20 p-3 sm:p-5 md:p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                  <div class="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-2 sm:mb-4">
                    <Icon name="lucide:arrow-left" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span class="truncate">{{ t('Previous Service') }}</span>
                  </div>

                  <div class="flex items-start justify-between gap-1 mb-2 sm:mb-4">
                    <div class="w-8 h-8 sm:w-12 sm:h-12 rounded-sm border border-border/40 bg-background/50 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:from-amber-400/20 group-hover:to-orange-500/20 shrink-0">
                      <Icon :name="prevService.icon || 'lucide:layers'" class="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    </div>
                    <span class="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-sm bg-background border border-border/30 text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate max-w-[75px] sm:max-w-none">
                      {{ prevService.category }}
                    </span>
                  </div>

                  <h3 class="text-xs sm:text-base md:text-xl font-heading font-semibold mb-2 sm:mb-2 text-foreground leading-snug uppercase group-hover:text-amber-400 transition-colors line-clamp-2">
                    {{ prevService.title }}
                  </h3>

                  <!-- Description (visible on both mobile and desktop) -->
                  <p class="text-[11px] sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1 font-medium">
                    {{ prevService.description }}
                  </p>

                  <div class="flex items-center justify-between mt-auto pt-2 sm:pt-4 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <span class="truncate">{{ prevService.duration }}</span>
                    <span class="inline-flex items-center gap-1 sm:gap-2 text-amber-400 group-hover:-translate-x-1 transition-transform shrink-0">
                      <Icon name="lucide:arrow-left" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span class="hidden sm:inline">{{ t('Selengkapnya') }}</span>
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </UiAnimatedCard>

            <!-- Next Service -->
            <UiAnimatedCard
              v-if="nextService"
              :glow-color="'251, 191, 36'"
              :particle-count="8"
              :enable-particles="true"
              :enable-tilt="false"
              :enable-magnetism="false"
              :enable-border-glow="false"
              :click-effect="true"
            >
              <NuxtLink 
                :to="getServiceLink(nextService)"
                class="group relative block rounded-sm overflow-hidden bg-background/80 backdrop-blur-md border border-border/40 hover:border-amber-400/50 transition-all duration-300 h-full min-h-[160px] sm:min-h-64 shadow-xl shadow-black/5"
              >
                <!-- ── Image layer (visible on hover) ── -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <NuxtImg
                    :src="nextService.coverImage || nextService.image || '/placeholder.avif'"
                    :alt="nextService.title"
                    width="600"
                    height="337"
                    format="avif"
                    loading="lazy"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <!-- Gradient overlay -->
                  <div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/10" />
                  <!-- Direction indicator top-right -->
                  <div class="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-sm bg-background/80 backdrop-blur-md border border-border/40 text-foreground font-mono text-[8px] sm:text-[10px] uppercase tracking-wider -translate-x-1 -translate-y-1 sm:-translate-x-2 sm:-translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
                    {{ t('Next') }}
                    <Icon name="lucide:arrow-right" class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                  </div>
                  <!-- Info bottom -->
                  <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-right">
                    <span class="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[8px] sm:text-[10px] font-mono tracking-wider uppercase bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-1 sm:mb-2">
                      {{ nextService.category }}
                    </span>
                    <h3 class="text-xs sm:text-base md:text-lg font-heading text-white font-semibold leading-snug uppercase line-clamp-2">
                      {{ nextService.title }}
                    </h3>
                  </div>
                </div>

                <!-- ── Default content layer (hidden on hover) ── -->
                <div class="relative z-20 p-3 sm:p-5 md:p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                  <div class="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-mono tracking-wider uppercase text-muted-foreground mb-2 sm:mb-4">
                    <span class="truncate">{{ t('Next Service') }}</span>
                    <Icon name="lucide:arrow-right" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>

                  <div class="flex items-start justify-between gap-1 mb-2 sm:mb-4">
                    <div class="w-8 h-8 sm:w-12 sm:h-12 rounded-sm border border-border/40 bg-background/50 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:from-amber-400/20 group-hover:to-orange-500/20 shrink-0">
                      <Icon :name="nextService.icon || 'lucide:layers'" class="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                    </div>
                    <span class="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-sm bg-background border border-border/30 text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate max-w-[75px] sm:max-w-none">
                      {{ nextService.category }}
                    </span>
                  </div>

                  <h3 class="text-xs sm:text-base md:text-xl font-heading font-semibold mb-2 sm:mb-2 text-foreground leading-snug uppercase group-hover:text-amber-400 transition-colors line-clamp-2">
                    {{ nextService.title }}
                  </h3>

                  <!-- Description (visible on both mobile and desktop) -->
                  <p class="text-[11px] sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1 font-medium">
                    {{ nextService.description }}
                  </p>

                  <div class="flex items-center justify-between mt-auto pt-2 sm:pt-4 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <span class="truncate">{{ nextService.duration }}</span>
                    <span class="inline-flex items-center gap-1 sm:gap-2 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0">
                      <span class="hidden sm:inline">{{ t('Selengkapnya') }}</span>
                      <Icon name="lucide:arrow-right" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
