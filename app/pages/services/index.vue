<script setup lang="ts">
import type { ServiceCollectionItem } from '~/types'

const { t, locale } = useI18n()

const { data: services, status } = await useAsyncData<ServiceCollectionItem[]>(
  `services-${locale.value}`,
  () =>
    queryCollection('services')
      .where('stem', 'LIKE', `services/${locale.value}/%`)
      .order('order', 'ASC')
      .all(),
  { watch: [locale] }
)

const getServiceLink = (path?: string) => {
  return path?.replace(/^\/services\/[^/]+/, '/services') || '#'
}

const selectedCategory = ref('All')

const categories = computed(() => {
  const uniqueCategories = new Set<string>(['All'])
  services.value?.forEach(item => {
    if (item.category) uniqueCategories.add(item.category)
  })
  return Array.from(uniqueCategories)
})

const filteredServices = computed(() => {
  if (selectedCategory.value === 'All') return services.value || []
  return (services.value || []).filter(item => item.category === selectedCategory.value)
})

useDynamicSeo({
  titleKey: 'seo.services.title',
  descriptionKey: 'seo.services.description'
})

useServiceCatalogSchema({
  services: (services.value || []).map(service => ({
    title: service.title,
    description: service.description,
    category: service.category,
    duration: service.duration,
    deliverables: service.deliverables,
    tags: service.tags,
    url: getServiceLink(service.path),
  })),
})
// Initialize Scroll Reveal Animations
useScrollReveal()
</script>

<template>
  <main class="min-h-screen">
    <section class="relative w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 overflow-hidden">
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border/40 bg-background/60 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">{{ t('Digital services') }}</span>
        </div>

        <h1 class="leading-[0.88] tracking-tight mb-8 animate-fade-in-up delay-100">
          <span class="section-title-filled block">{{ t('Services') }}</span>
          <span class="section-title-outline text-foreground block">{{ t('Built For Impact') }}<span class="text-amber-400 !important">.</span></span>
        </h1>

        <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light">
          {{ t('Ilham Kurniawan menyediakan layanan pengembangan') }}
          <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3" class="font-medium">
            {{ t('website bisnis, dashboard, aplikasi web,') }}
          </UiTextGradient>
          {{ t('REST API, dan integrasi sistem untuk') }}
          <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3" class="font-medium">
            {{ t('bisnis, UMKM, startup,') }}
          </UiTextGradient>
          {{ t('dan organisasi di Indonesia.') }}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <NuxtLink
            to="#services-list"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5"
          >
            <span class="relative z-10 flex items-center gap-2">{{ t('Explore Services') }}</span>
            <Icon name="lucide:arrow-down" class="w-4 h-4 ml-2 relative z-10" />
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
          >
            <span class="relative z-10 flex items-center gap-2">{{ t('Start a Project') }}</span>
            <Icon name="lucide:send" class="w-4 h-4 ml-2 relative z-10" />
          </NuxtLink>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span class="text-xs text-muted-foreground font-mono">{{ t('scroll') }}</span>
        <Icon name="chevrons-down" class="w-4 h-4 text-amber-400/60" />
      </div>
    </section>

    <section id="services-list" class="scroll-section will-change-[transform,opacity] section py-20">
      <div class="container max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 stagger-item">
          <h2 class="leading-[0.88] tracking-tight mb-4">
            <span class="section-title-filled block">{{ t('Solusi Digital') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Untuk Bisnis') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-light">
            {{ t('Saya membantu bisnis, UMKM, startup, dan organisasi membangun') }}
            <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3" class="font-medium">
              {{ t('website, dashboard, sistem custom,') }}
            </UiTextGradient>
            {{ t('dan integrasi digital yang') }}
            <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3" class="font-medium">
              {{ t('cepat, rapi, scalable,') }}
            </UiTextGradient>
            {{ t('dan siap digunakan.') }}
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-12 stagger-item">
          <button
            v-for="category in categories"
            :key="category"
            class="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-sm sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
            :class="selectedCategory === category
              ? 'bg-amber-400 text-gray-900 shadow-md sm:shadow-lg shadow-amber-400/25 scale-102 sm:scale-105'
              : 'bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:border-amber-400/40 hover:text-foreground hover:scale-102 sm:hover:scale-105'"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <!-- Services Grid Skeleton -->
        <div v-if="status === 'pending'" class="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <UiSkeletonServiceCard v-for="i in 4" :key="`service-skeleton-${i}`" />
        </div>

        <div v-else-if="filteredServices.length > 0" class="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <UiAnimatedCard
            v-for="service in filteredServices"
            :key="service.path"
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
              :to="getServiceLink(service.path)"
              class="group relative block rounded-sm sm:rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/40 hover:border-amber-400/50 hover:bg-background/80 transition-all duration-300 h-full min-h-[160px] sm:min-h-64 shadow-lg"
            >
              <!-- ── Image layer (visible on hover) ── -->
              <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <NuxtImg
                  :src="service.coverImage || service.image || '/placeholder.avif'"
                  :alt="service.title"
                  width="600"
                  height="337"
                  format="avif"
                  loading="lazy"
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
                    {{ service.category }}
                  </span>
                  <h3 class="text-xs sm:text-base md:text-lg font-heading text-white font-semibold leading-snug line-clamp-2">
                    {{ service.title }}
                  </h3>
                  <p class="text-[10px] sm:text-xs text-white/60 mt-0.5 sm:mt-1 font-mono">{{ t('Selengkapnya') }} →</p>
                </div>
              </div>

              <!-- ── Default content layer (hidden on hover) ── -->
              <div class="relative z-20 p-3 sm:p-5 md:p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                <div>
                  <div class="flex items-start justify-between gap-1 mb-2 sm:mb-4 md:mb-6">
                    <div class="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center transition-all duration-300 group-hover:from-amber-400/20 group-hover:to-orange-500/20 shrink-0">
                      <Icon :name="service.icon || 'lucide:layers'" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />
                    </div>
                    <span class="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-sm bg-background border border-border/30 text-[8px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate max-w-[90px] sm:max-w-none">
                      {{ service.category }}
                    </span>
                  </div>

                  <h3 class="text-xs sm:text-lg md:text-xl font-heading font-semibold mb-1.5 sm:mb-3 text-foreground leading-snug line-clamp-2">
                    {{ service.title }}
                  </h3>
                  <p class="text-[11px] sm:text-sm font-light text-muted-foreground leading-relaxed mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                    {{ service.description }}
                  </p>

                  <div class="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                    <span
                      v-for="tag in service.tags?.slice(0, 3)"
                      :key="tag"
                      class="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm text-[8px] sm:text-[10px] font-mono tracking-wider uppercase bg-background/50 border border-border/40 text-foreground"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center justify-between mt-auto pt-2 border-t border-border/10 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  <span class="truncate">{{ service.duration }}</span>
                  <span class="inline-flex items-center gap-1 sm:gap-2 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0">
                    <span class="hidden sm:inline">{{ t('Selengkapnya') }}</span>
                    <Icon name="lucide:arrow-right" class="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </span>
                </div>
              </div>
            </NuxtLink>
          </UiAnimatedCard>

          <!-- Custom service suggestion -->
          <div class="col-span-2 md:col-span-2 mt-4 sm:mt-6 stagger-item">
            <div class="relative overflow-hidden rounded-sm border border-dashed border-border/60 hover:border-amber-400/60 bg-background/30 hover:bg-amber-400/[0.02] backdrop-blur-sm p-8 text-center flex flex-col items-center justify-center gap-4 group transition-all duration-500 hover:-translate-y-1">
              <!-- Glow gradient background -->
              <div class="absolute -inset-px bg-linear-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-750 pointer-events-none" />

              <div class="w-12 h-12 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-300 shadow-inner">
                <Icon name="lucide:sparkles" class="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              <div class="max-w-xl relative z-10">
                <h3 class="text-lg md:text-xl font-heading font-semibold mb-2 text-foreground tracking-wide uppercase">
                  {{ t('Ingin service custom tertentu yang belum ada di daftar?') }}
                </h3>
                <p class="text-sm font-light text-muted-foreground leading-relaxed mb-6">
                  {{ t('Jangan ragu untuk mendiskusikan kebutuhan unik bisnis Anda. Saya siap membantu merancang solusi kustom.') }}
                </p>
                <NuxtLink
                  to="/contact"
                  class="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-sm px-6 py-2.5 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_10px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]"
                >
                  <span class="relative z-10 flex items-center gap-2">
                    {{ t('Bisa kontak saya aja langsung') }}
                    <Icon name="lucide:message-square" class="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="scroll-section will-change-[transform,opacity] w-full">
      <GetinTouch />
    </div>
  </main>
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
