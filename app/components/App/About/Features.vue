<script setup lang="ts">
import { Icon } from "#components";

const { t } = useI18n()

const features = computed(() => [
  {
    icon: 'lucide:building-2',
    title: t('Website Bisnis & Company Profile'),
    description: t('Bangun website bisnis yang profesional, cepat, mudah dipahami, dan siap digunakan untuk memperkenalkan brand, layanan, produk, maupun portofolio secara lebih kredibel.'),
    route: '/services/business-website',
    image: '/services/business-website.avif',
    outputs: [t('Company profile'), t('Landing page'), t('SEO basic')],
  },
  {
    icon: 'lucide:shopping-bag',
    title: t('Toko Online & Katalog Produk'),
    description: t('Buat toko online, katalog produk, atau landing page penjualan yang rapi, mudah dikelola, dan membantu calon customer memahami produk sebelum membeli atau konsultasi.'),
    route: '/services/online-store-catalog',
    image: '/services/online-store-catalog.avif',
    outputs: [t('Katalog produk'), t('CTA WhatsApp/order'), t('SEO produk')],
  },
  {
    icon: 'lucide:panel-top',
    title: t('Sistem Dashboard & Admin Panel'),
    description: t('Bangun dashboard internal untuk mengelola data, transaksi, laporan, user, konten, produk, pesanan, atau proses operasional bisnis secara lebih terstruktur dan scalable.'),
    route: '/services/dashboard-system',
    image: '/services/dashboard-system.avif',
    outputs: [t('Dashboard admin'), t('Role dan permission'), t('Reporting')],
  },
  
])

const displayedFeatures = computed(() => features.value.slice(0, 6))
</script>

<template>
  <section id="features" class="section py-20 px-6 md:px-12 lg:px-20 overflow-hidden text-gray-800 dark:text-white">
    <UiGlobalSpotlight
      container-selector=".features-container"
      card-selector=".animated-card"
      :glow-color="'251, 191, 36'"
      :spotlight-radius="400"
      :enabled="true"
    />
    <div class="max-w-7xl mx-auto features-container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Title Area -->
        <div class="lg:col-span-4 lg:sticky lg:top-32 h-fit scroll-section will-change-[transform,opacity] z-0">
          <h2 class="leading-[0.88] tracking-tight mb-6">
            <span class="section-title-filled block">{{ t('Solusi Digital') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Untuk Bisnis') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="w-12 h-1 bg-amber-400 mb-6"></div>
          <p class="text-sm font-mono tracking-wider text-muted-foreground leading-relaxed">
            {{ t('Saya membantu bisnis, UMKM, startup, dan organisasi membangun') }}
            <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3">
              {{ t('website, dashboard, sistem custom,') }}
            </UiTextGradient>
            {{ t('dan integrasi digital yang') }}
            <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3">
              {{ t('cepat, rapi, scalable,') }}
            </UiTextGradient>
            {{ t('dan memberikan dampak nyata.') }}
          </p>
        </div>

        <!-- Features Grid -->
        <div class="lg:col-span-8 grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 relative z-10">
          <template v-for="feature in displayedFeatures" :key="feature.title">
            <UiAnimatedCard
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
                :to="feature.route"
                class="group relative flex min-h-[160px] sm:min-h-[300px] md:min-h-[330px] flex-col rounded-sm overflow-hidden bg-background/40 backdrop-blur-md border border-border/30 hover:border-amber-400/50 hover:bg-background/60 transition-all duration-300 h-full shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <!-- ── Image layer (visible on hover) ── -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <NuxtImg
                    :src="feature.image || '/placeholder.avif'"
                    :alt="feature.title"
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
                    <h3 class="text-xs sm:text-base md:text-lg font-heading text-white font-semibold leading-snug line-clamp-2">
                      {{ feature.title }}
                    </h3>
                    <p class="text-[10px] sm:text-xs text-white/60 mt-0.5 sm:mt-1 font-mono">{{ t('Selengkapnya') }} →</p>
                  </div>
                </div>

                <!-- ── Default content layer (hidden on hover) ── -->
                <div class="relative z-20 p-3 sm:p-5 md:p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                  <Icon
                    name="lucide:arrow-up-right"
                    class="absolute right-3 top-3 sm:right-5 sm:top-5 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-400"
                  />

                  <!-- Icon -->
                  <div
                    class="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 sm:mb-4 md:mb-6 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-300 shrink-0"
                  >
                    <Icon
                      :name="feature.icon"
                      class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400"
                    />
                  </div>

                  <!-- Title -->
                  <h3 class="text-xs sm:text-base md:text-xl font-heading font-semibold mb-1.5 sm:mb-3 text-foreground tracking-wide line-clamp-2">
                    {{ feature.title }}
                  </h3>

                  <!-- Description (visible on both mobile and desktop) -->
                  <p class="text-[11px] sm:text-sm font-light text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {{ feature.description }}
                  </p>

                  <div class="mt-auto flex flex-wrap gap-1 sm:gap-2 pt-2 sm:pt-4 md:pt-5">
                    <span
                      v-for="output in feature.outputs"
                      :key="output"
                      class="inline-flex items-center rounded-sm border border-border/40 bg-background/50 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground"
                    >
                      {{ output }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </UiAnimatedCard>
          </template>

            <UiAnimatedCard
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
                to="/services"
                class="group relative flex min-h-[160px] sm:min-h-[300px] md:min-h-[330px] h-full flex-col rounded-sm border border-amber-400/30 bg-amber-400/5 p-3 sm:p-5 md:p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-amber-400/10"
              >
                <div
                  class="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 sm:mb-4 md:mb-6 rounded-sm bg-linear-to-br from-amber-400/15 to-orange-500/15 border border-amber-400/25 flex items-center justify-center transition-all duration-300 group-hover:from-amber-400/25 group-hover:to-orange-500/25 shrink-0"
                >
                  <Icon name="lucide:grid-2x2-plus" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" />
                </div>

                <h3 class="text-xs sm:text-base md:text-xl font-heading font-semibold mb-1 sm:mb-2 md:mb-3 text-foreground tracking-wide line-clamp-2">
                  {{ t('Explore All Services') }}
                </h3>

                <p class="text-[11px] sm:text-sm font-light text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {{ t('Temukan solusi lain untuk website bisnis, dashboard, sistem custom, integrasi API, AI, dan kebutuhan digital lainnya.') }}
                </p>

                <div class="mt-auto pt-2 sm:pt-4 md:pt-6">
                  <span class="inline-flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-300">
                    {{ t('View Services') }}
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
