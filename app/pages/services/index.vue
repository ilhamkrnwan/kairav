<script setup lang="ts">

const { t, locale } = useI18n()

const { data: services, status } = await useAsyncData(
  `services-${locale.value}`,
  () =>
    queryCollection('services')
      .where('stem', 'LIKE', `services/${locale.value}/%`)
      .order('order', 'ASC')
      .all(),
  { watch: [locale] }
)

const getServiceLink = (path?: string) => path?.replace(/^\/services\/[^/]+/, '/services') || '#'
const getServiceImage = (service: { coverImage?: string, image?: string }) => service.coverImage || service.image || '/placeholder.avif'


const selectedCategory = ref('All')

const categories = computed(() => {
  const uniqueCategories = new Set<string>(['All'])
  services.value?.forEach((item) => {
    if (item.category) uniqueCategories.add(item.category)
  })
  return Array.from(uniqueCategories)
})

const filteredServices = computed(() =>
  selectedCategory.value === 'All'
    ? services.value || []
    : (services.value || []).filter(item => item.category === selectedCategory.value)
)

const featuredService = computed(() =>
  selectedCategory.value === 'All' ? filteredServices.value[0] : undefined
)

const regularServices = computed(() =>
  featuredService.value ? filteredServices.value.slice(1) : filteredServices.value
)

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
    url: getServiceLink(service.path)
  }))
})

// Initialize Scroll Reveal Animations
useScrollReveal()
</script>

<template>
  <main class="min-h-screen">
    <!-- Hero -->
    <section class="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 md:px-8 lg:px-12">
      <div class="relative z-10 mx-auto max-w-4xl text-center">
        <h1 :key="$i18n.locale" class="animate-fade-in-up delay-100 mb-8 leading-[0.88] tracking-tight">
          <span class="section-title-filled block">{{ t('Services') }}</span>
          <span class="section-title-outline block">{{ t('Built For Impact') }}<span class="text-primary">.</span></span>
        </h1>

        <p class="animate-fade-in-up delay-200 mx-auto mb-12 max-w-2xl text-base font-normal leading-relaxed text-muted md:text-lg">
          {{ t('Ilham Kurniawan menyediakan layanan pengembangan') }}
          <UiTextGradient class="font-medium">
            {{ t('website bisnis, dashboard, aplikasi web,') }}
          </UiTextGradient>
          {{ t('REST API, dan integrasi sistem untuk') }}
          <UiTextGradient class="font-medium">
            {{ t('bisnis, UMKM, startup,') }}
          </UiTextGradient>
          {{ t('dan organisasi di Indonesia.') }}
        </p>

        <div class="animate-fade-in-up delay-300 mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <UiArrowButton to="#services-list" variant="primary" icon="lucide:arrow-down">
            {{ t('Explore Services') }}
          </UiArrowButton>
          <UiArrowButton to="/contact" variant="secondary" icon="lucide:arrow-right">
            {{ t('Start a Project') }}
          </UiArrowButton>
        </div>
      </div>
    </section>

    <!-- Services list -->
    <section id="services-list" class="scroll-section section py-20 will-change-[transform,opacity]">
      <div class="container mx-auto max-w-7xl px-6 lg:px-8">
        <div class="stagger-item mb-16 text-center">
          <h2 :key="$i18n.locale" class="mb-4 leading-[0.88] tracking-tight">
            <span class="section-title-filled block">{{ t('Solusi Digital') }}</span>
            <span class="section-title-outline block">{{ t('Untuk Bisnis') }}<span class="text-primary">.</span></span>
          </h2>
          <p class="mx-auto max-w-2xl text-lg font-normal leading-relaxed text-muted">
            {{ t('Saya membantu bisnis, UMKM, startup, dan organisasi membangun') }}
            <UiTextGradient class="font-medium">
              {{ t('website, dashboard, sistem custom,') }}
            </UiTextGradient>
            {{ t('dan integrasi digital yang') }}
            <UiTextGradient class="font-medium">
              {{ t('cepat, rapi, scalable,') }}
            </UiTextGradient>
            {{ t('dan siap digunakan.') }}
          </p>
        </div>

        <!-- Category filter -->
        <div class="stagger-item mb-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <UButton
            v-for="category in categories"
            :key="category"
            size="sm"
            :color="selectedCategory === category ? 'primary' : 'neutral'"
            :variant="selectedCategory === category ? 'solid' : 'outline'"
            class="rounded-lg transition-all duration-300 sm:rounded-lg"
            :class="selectedCategory === category ? 'scale-102 shadow-md shadow-primary/25 sm:scale-105 sm:shadow-lg' : 'bg-elevated hover:scale-102 sm:hover:scale-105'"
            @click="selectedCategory = category"
          >
            {{ category }}
          </UButton>
        </div>

        <!-- Featured service (borderless editorial style) -->
        <div v-if="featuredService" class="stagger-item mb-14 sm:mb-20">
          <ULink :to="getServiceLink(featuredService.path)" raw class="group block">
            <div class="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
              <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted/20 transition-all duration-500 group-hover:border-primary/50 sm:rounded-lg lg:col-span-7">
                <NuxtImg
                  :src="getServiceImage(featuredService)"
                  :alt="featuredService.title"
                  width="1280"
                  height="720"
                  format="avif"
                  loading="eager"
                  class="size-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div class="flex flex-col justify-center lg:col-span-5">
                <div class="mb-3 flex items-center gap-2">
                  <span class="relative flex size-2">
                    <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                    <span class="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  <span class="text-xs font-bold text-primary sm:text-xs">
                    {{ t('Featured Service') }}
                  </span>
                </div>

                <p class="mb-3 text-sm font-semibold text-toned">{{ featuredService.category }}</p>

                <div v-if="featuredService.duration" class="mb-3 flex items-center gap-1 text-xs text-muted sm:mb-4 sm:text-xs font-medium">
                  <UIcon name="lucide:clock" class="size-3 text-primary" />
                  {{ featuredService.duration }}
                </div>

                <h3 class="mb-3 font-heading text-lg leading-[1.15] tracking-tight text-highlighted transition-colors duration-300 group-hover:text-primary sm:mb-4 sm:text-2xl md:text-3xl">
                  {{ featuredService.title }}
                </h3>

                <p class="mb-4 line-clamp-3 text-xs font-normal leading-relaxed text-muted sm:mb-6 sm:line-clamp-4 sm:text-sm md:text-base">
                  {{ featuredService.description }}
                </p>

                <div v-if="featuredService.deliverables?.length" class="mb-6 flex flex-wrap gap-1.5 sm:gap-2">
                  <UBadge
                    v-for="item in featuredService.deliverables.slice(0, 4)"
                    :key="item"
                    color="neutral"
                    variant="outline"
                    class="rounded-lg border-default/40 bg-elevated text-xs sm:text-xs font-medium"
                  >
                    {{ item }}
                  </UBadge>
                </div>

                <span class="inline-flex items-center gap-2 text-xs font-bold text-primary transition-colors group-hover:text-primary/85 sm:text-sm">
                  {{ t('View Service Details') }}
                  <UIcon name="lucide:arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </div>
          </ULink>
        </div>

        <!-- Section label when featured is shown -->
        <div v-if="featuredService && regularServices.length" class="stagger-item mb-6">
          <div class="flex items-center justify-between">
            <h3 class="flex items-center gap-2 text-xs text-muted sm:text-sm font-medium">
              <UIcon name="lucide:layers" class="size-3.5 text-primary" />
              <span>{{ t('More Services') }}</span>
            </h3>
            <span class="text-xs text-muted sm:text-xs">{{ regularServices.length }} {{ t('services') }}</span>
          </div>
        </div>

        <!-- Services grid skeleton -->
        <div v-if="status === 'pending'" class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div
            v-for="i in 4"
            :key="`service-skeleton-${i}`"
            class="flex h-full min-h-40 flex-col justify-between rounded-lg border border-default bg-elevated p-3 sm:min-h-64 sm:p-5 md:p-6"
          >
            <div>
              <div class="mb-2 flex items-start justify-between gap-1 sm:mb-4 md:mb-8">
                <USkeleton class="size-8 rounded-lg sm:size-12 md:size-14" />
                <USkeleton class="h-4 w-14 rounded-lg sm:h-5 sm:w-20 md:w-24" />
              </div>
              <div class="mb-2 space-y-1.5 sm:mb-3 sm:space-y-2">
                <USkeleton class="h-5 w-3/4 rounded-lg sm:h-6 md:h-7" />
                <USkeleton class="h-5 w-1/2 rounded-lg sm:h-6 md:h-7" />
              </div>
              <div class="mb-3 space-y-1.5 sm:mb-6 sm:space-y-2 md:mb-8">
                <USkeleton class="h-3 w-full rounded-lg sm:h-3.5" />
                <USkeleton class="h-3 w-11/12 rounded-lg sm:h-3.5" />
              </div>
              <div class="mb-2 flex flex-wrap gap-1 sm:mb-6 sm:gap-2 md:mb-8">
                <USkeleton class="h-3.5 w-10 rounded-lg sm:h-5 sm:w-16" />
                <USkeleton class="h-3.5 w-12 rounded-lg sm:h-5 sm:w-20" />
              </div>
            </div>
            <div class="flex items-center justify-between border-t border-default/20 pt-2 sm:pt-4">
              <USkeleton class="h-3 w-12 rounded-lg sm:h-3.5 sm:w-20" />
              <USkeleton class="h-3 w-14 rounded-lg sm:h-3.5 sm:w-28" />
            </div>
          </div>
        </div>

        <div v-else-if="regularServices.length">
          <TransitionGroup tag="ul" name="filter" class="space-y-2">
            <li v-for="service in regularServices" :key="service.path" class="stagger-item">
              <ULink :to="getServiceLink(service.path)" raw class="group grid gap-4 py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-start sm:gap-6">
                <NuxtImg
                  :src="getServiceImage(service)"
                  :alt="service.title"
                  width="352"
                  height="234"
                  format="avif"
                  loading="lazy"
                  class="aspect-3/2 w-full rounded-lg border border-default object-cover transition-transform duration-200 ease-out group-hover:-rotate-2 group-hover:scale-[1.03]"
                />
                <div>
                  <h3 class="font-heading text-2xl leading-tight text-highlighted transition-colors group-hover:text-primary">
                    {{ service.title }}
                  </h3>
                  <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{{ service.description }}</p>
                  <p class="mt-3 text-sm font-semibold text-toned">{{ [service.category, ...(service.tags?.slice(0, 3) ?? [])].filter(Boolean).join(' · ') }}</p>
                </div>
                <p class="inline-flex items-center gap-1 text-sm font-medium text-primary sm:pt-1">
                  {{ service.duration }}
                  <UIcon name="lucide:arrow-right" class="size-4 transition-transform group-hover:translate-x-1" />
                </p>
              </ULink>
            </li>
          </TransitionGroup>

          <!-- Custom service suggestion -->
          <UCard
            class="stagger-item group mt-10"
            :ui="{
              root: 'relative overflow-hidden rounded-lg border border-dashed border-default/60 bg-elevated ring-0 hover:border-primary/60 hover:bg-primary/2',
              body: 'flex flex-col items-center justify-center gap-4 p-8 text-center sm:p-8'
            }"
          >

            <div class="flex size-12 items-center justify-center rounded-lg border border-default bg-primary/10 shadow-inner transition-all duration-300 group-hover:from-primary/20 group-hover:to-primary/20">
              <UIcon name="lucide:sparkles" class="size-5 text-primary" />
            </div>
            <div class="relative z-10 max-w-xl">
              <h3 class="mb-2 font-heading text-xl text-highlighted md:text-2xl">
                {{ t('Ingin service custom tertentu yang belum ada di daftar?') }}
              </h3>
              <p class="mb-6 text-sm font-normal leading-relaxed text-muted">
                {{ t('Jangan ragu untuk mendiskusikan kebutuhan unik bisnis Anda. Saya siap membantu merancang solusi kustom.') }}
              </p>
              <UiArrowButton to="/contact" variant="primary" icon="lucide:arrow-right">
                <template #leading>
                  <UIcon name="lucide:message-square" class="size-4" />
                </template>
                {{ t('Bisa kontak saya aja langsung') }}
              </UiArrowButton>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <div class="scroll-section w-full will-change-[transform,opacity]">
      <GetinTouch />
    </div>
  </main>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }


</style>
