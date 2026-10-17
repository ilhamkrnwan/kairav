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
      <!-- ─── Dynamic 2-Column Hero Section ─── -->
      <section class="relative pt-32 sm:pt-36 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-6 md:pl-28 md:pr-12 lg:px-20 border-b border-border/40 overflow-hidden bg-radial from-amber-400/[0.04] via-transparent to-transparent">
        <!-- Ambient Background Glows -->
        <div aria-hidden="true" class="absolute top-1/4 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden="true" class="absolute -bottom-20 left-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div class="container mx-auto max-w-7xl relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <!-- Left Column: Rich Hero Content (7 Cols) -->
            <div class="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              
              <!-- Top Breadcrumb & Category Meta Bar -->
              <div class="flex flex-wrap items-center gap-3">
                <UiBreadcrumb :items="breadcrumbItems" class="!justify-start text-xs" />
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase bg-amber-400/10 text-amber-500 dark:text-amber-400 border border-amber-400/30 font-semibold">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  {{ current.category }}
                </span>
              </div>

              <!-- Main Heading with Service Icon Badge -->
              <div class="space-y-4">
                <div class="inline-flex items-center gap-3">
                  <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-sm bg-linear-to-br from-amber-400/15 to-orange-500/15 border border-amber-400/30 flex items-center justify-center shrink-0">
                    <Icon :name="current.icon || 'lucide:layers'" class="w-6 h-6 text-amber-400" />
                  </div>
                  <span class="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
                    {{ t('Layanan Terpercaya') }}
                  </span>
                </div>

                <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-foreground uppercase">
                  {{ current.title }}<span class="text-amber-400">.</span>
                </h1>
              </div>

              <!-- Description -->
              <p class="text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                {{ current.description }}
              </p>

              <!-- Meta Badges: Timeline, Featured, Tags -->
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] font-mono tracking-widest uppercase text-muted-foreground pt-1">
                <div v-if="current.duration" class="flex items-center gap-1.5 bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-sm border border-border/50 text-foreground/80">
                  <Icon name="lucide:calendar-clock" class="w-3.5 h-3.5 text-amber-400" />
                  <span>{{ current.duration }}</span>
                </div>
                <div v-if="current.featured" class="flex items-center gap-1.5 bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-sm border border-amber-400/30 text-amber-400 font-semibold">
                  <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-amber-400" />
                  <span>{{ t('Layanan Utama') }}</span>
                </div>
                <div class="flex items-center gap-1.5 bg-background/60 backdrop-blur-md px-3 py-1.5 rounded-sm border border-border/50 text-foreground/80">
                  <Icon name="lucide:shield-check" class="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Custom Code</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap items-center gap-3 pt-2">
                <UiArrowButton
                  :href="`https://wa.me/6287761296676?text=${encodeURIComponent(`Halo Ilham, saya tertarik konsultasi layanan ${current.title}.`)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  icon="lucide:arrow-up-right"
                >
                  <template #leading>
                    <Icon name="simple-icons:whatsapp" class="w-4 h-4 text-neutral-950" />
                  </template>
                  {{ t('Konsultasi via WhatsApp') }}
                </UiArrowButton>

                <UiArrowButton
                  to="#service-content"
                  variant="secondary"
                  icon="lucide:arrow-down"
                >
                  {{ t('Lihat Rincian') }}
                </UiArrowButton>
              </div>

            </div>

            <!-- Right Column: 3D Developer Avatar with Interactive Floating Accents (5 Cols) -->
            <div class="lg:col-span-5 flex items-center justify-center relative mt-8 lg:mt-0">
              <div class="relative w-full max-w-md flex items-center justify-center group">
                <!-- Multi-layer Ambient Halo Backdrops -->
                <div class="absolute inset-0 rounded-full bg-linear-to-tr from-amber-500/20 via-orange-500/15 to-transparent blur-3xl transform scale-90 group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute -inset-4 rounded-full bg-amber-400/10 blur-2xl animate-pulse" />

                <!-- The 3D Developer Avatar Image with Floating Animation -->
                <NuxtImg
                  src="/developer-service-avatar.avif"
                  :alt="`${current.title} - Ilham Kurniawan`"
                  width="440"
                  height="420"
                  format="webp"
                  loading="eager"
                  class="relative z-10 w-64 sm:w-76 md:w-88 lg:w-96 max-h-96 sm:max-h-[420px] object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] avatar-floating transition-transform duration-500 group-hover:scale-105"
                />

                <!-- Top Floating Glass Badge -->
                <div class="absolute top-4 right-2 sm:right-6 z-20 px-3 py-1.5 rounded-lg border border-amber-400/40 bg-background/80 dark:bg-black/80 backdrop-blur-md shadow-xl flex items-center gap-2 transform -rotate-2 hover:rotate-0 transition-transform">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span class="text-[11px] font-mono font-medium text-foreground">
                    Ready to Build
                  </span>
                </div>

                <!-- Bottom Floating Glass Badge -->
                <div class="absolute bottom-4 left-2 sm:left-4 z-20 px-3.5 py-2 rounded-lg border border-border/60 bg-background/80 dark:bg-black/80 backdrop-blur-md shadow-xl flex items-center gap-2.5 transform rotate-1 hover:rotate-0 transition-transform">
                  <div class="w-6 h-6 rounded-md bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                    <Icon name="lucide:code-2" class="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div class="flex flex-col">
                    <span class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Kualitas Kode</span>
                    <span class="text-xs font-heading font-bold text-foreground">Modern & Responsif</span>
                  </div>
                </div>

              </div>
            </div>

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

      <section id="service-content" class="py-12 md:py-16 scroll-mt-20">
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

                <div class="space-y-3 mb-5">
                  <UiArrowButton
                    to="/contact"
                    variant="primary"
                    icon="lucide:send"
                    class="w-full"
                  >
                    {{ t('Discuss This Service') }}
                  </UiArrowButton>

                  <UiArrowButton
                    to="/services"
                    variant="secondary"
                    icon="lucide:arrow-left"
                    class="w-full"
                  >
                    {{ t('Back to Services') }}
                  </UiArrowButton>
                </div>

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
@keyframes avatarFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}

.avatar-floating {
  animation: avatarFloat 5s ease-in-out infinite;
}

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
