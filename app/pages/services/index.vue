<script setup lang="ts">
import type { ServiceCollectionItem } from '~/types'

const { t, locale } = useI18n()

const { data: services } = await useAsyncData<ServiceCollectionItem[]>(
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
        <Icon name="lucide:chevrons-down" class="w-4 h-4 text-amber-400/60" />
      </div>
    </section>

    <section id="services-list" class="section py-20">
      <div class="container max-w-6xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-heading mb-4">
            {{ t('Solusi Digital untuk Website, Sistem, dan Integrasi Bisnis') }}
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
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

        <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            v-for="category in categories"
            :key="category"
            class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
            :class="selectedCategory === category
              ? 'bg-amber-400 text-gray-900 shadow-lg shadow-amber-400/25 scale-105'
              : 'bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:border-amber-400/40 hover:text-foreground hover:scale-105'"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <div v-if="filteredServices.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          >
            <NuxtLink
              :to="getServiceLink(service.path)"
              class="group block h-full rounded-sm border border-border/40 bg-background/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-amber-400/50 hover:bg-background/80"
            >
              <div class="flex items-start justify-between gap-4 mb-8">
                <div class="w-14 h-14 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center transition-all duration-300 group-hover:from-amber-400/20 group-hover:to-orange-500/20">
                  <Icon :name="service.icon || 'lucide:layers'" class="w-6 h-6 text-amber-400" />
                </div>
                <span class="inline-flex items-center px-2 py-0.5 rounded-sm bg-background border border-border/30 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {{ service.category }}
                </span>
              </div>

              <h3 class="text-2xl font-heading font-semibold mb-3 text-foreground leading-snug">
                {{ service.title }}
              </h3>
              <p class="text-sm font-light text-muted-foreground leading-relaxed mb-8">
                {{ service.description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-8">
                <span
                  v-for="tag in service.tags?.slice(0, 4)"
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase bg-background/50 border border-border/40 text-foreground"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="flex items-center justify-between mt-auto text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span>{{ service.duration }}</span>
                <span class="inline-flex items-center gap-2 text-amber-400 group-hover:translate-x-1 transition-transform">
                  {{ t('Selengkapnya') }}
                  <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
                </span>
              </div>
            </NuxtLink>
          </UiAnimatedCard>
        </div>
      </div>
    </section>

    <GetinTouch />
  </main>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

.section-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}
</style>
