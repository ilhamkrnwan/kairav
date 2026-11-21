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


</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <UiEditorialIntro :title="t('Services')">
      {{ t('Ilham Kurniawan menyediakan layanan pengembangan') }}
      {{ t('website bisnis, dashboard, aplikasi web,') }}
      {{ t('REST API, dan integrasi sistem untuk') }}
      {{ t('bisnis, UMKM, startup,') }}
      {{ t('dan organisasi di Indonesia.') }}
      <template #actions>
        <UiArrowButton to="/contact" variant="secondary" icon="lucide:arrow-up-right">
          {{ t('Start a Project') }}
        </UiArrowButton>
      </template>
    </UiEditorialIntro>

    <!-- Services list -->
    <section id="services-list" class="site-frame editorial-section catalogue">
      <div>
        <h2 class="catalogue-heading">{{ t('Solusi Digital') + ' ' + t('Untuk Bisnis') }}</h2>

        <!-- Category filter -->
        <div class="catalogue-filters flex flex-wrap gap-2">
          <UButton
            v-for="category in categories"
            :key="category"
            size="sm"
            :color="selectedCategory === category ? 'primary' : 'neutral'"
            :variant="selectedCategory === category ? 'solid' : 'outline'"
              :aria-pressed="selectedCategory === category"
            class="liquid-button min-h-11 min-w-11 justify-center rounded-lg transition-all duration-300 sm:rounded-lg"
            @click="selectedCategory = category"
          >
            {{ category }}
          </UButton>
        </div>

        <!-- Featured service (borderless editorial style) -->
        <div v-if="featuredService" class="catalogue-feature">
          <ULink :to="getServiceLink(featuredService.path)" raw class="group block">
            <div class="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-12">
              <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted/20 transition-all duration-500 group-hover:border-primary/50 sm:rounded-lg lg:col-span-7">
                <NuxtImg
                  :src="getServiceImage(featuredService)"
                  alt=""
                  width="1280"
                  height="720"
                  format="avif"
                  loading="eager"
                  class="size-full scale-100 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div class="flex flex-col justify-center lg:col-span-5">
                <h3 class="mb-3 font-heading text-lg leading-[1.15] tracking-tight text-highlighted transition-colors duration-300 group-hover:text-primary sm:mb-4 sm:text-2xl md:text-3xl">
                  {{ featuredService.title }}
                </h3>

                <p class="line-clamp-3 text-xs font-normal leading-relaxed text-muted sm:text-sm md:text-base">
                  {{ featuredService.description }}
                </p>

              </div>
            </div>
          </ULink>
        </div>

        <!-- Section label when featured is shown -->
        <div v-if="featuredService && regularServices.length" class="mb-6">
          <div class="flex items-center justify-between">
            <h3 class="flex items-center gap-2 text-xs text-muted sm:text-sm font-medium">
              <UIcon name="lucide:layers" class="size-3.5 text-primary" />
              <span>{{ t('More Services') }}</span>
            </h3>
            <span class="text-xs text-muted sm:text-xs">{{ regularServices.length }} {{ t('services') }}</span>
          </div>
        </div>

        <!-- Services grid skeleton -->
        <div v-if="status === 'pending'" class="editorial-list" aria-hidden="true">
          <div v-for="i in 4" :key="i" class="grid gap-4 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <USkeleton class="aspect-3/2 w-full rounded-lg" />
            <div class="space-y-2">
              <USkeleton class="h-6 w-2/3" />
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-4/5" />
            </div>
          </div>
        </div>

        <div v-else-if="regularServices.length">
          <TransitionGroup tag="ul" name="filter" class="editorial-list">
            <li v-for="service in regularServices" :key="service.path">
              <ULink :to="getServiceLink(service.path)" raw class="group grid gap-4 py-6 sm:grid-cols-[11rem_1fr] sm:items-start sm:gap-6">
                <NuxtImg
                  :src="getServiceImage(service)"
                  alt=""
                  width="352"
                  height="234"
                  format="avif"
                  loading="lazy"
                  class="aspect-3/2 w-full rounded-lg border border-default object-cover transition-transform duration-200 ease-out "
                />
                <div>
                  <h3 class="font-heading text-2xl leading-tight text-highlighted transition-colors group-hover:text-primary">
                    {{ service.title }}
                  </h3>
                  <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{{ service.description }}</p>
                </div>
              </ULink>
            </li>
          </TransitionGroup>

          <!-- Custom service suggestion -->
          <UCard
            class="group mt-10"
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

    <div class="w-full ">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }


</style>
