<script setup lang="ts">

definePageMeta({
  key: route => route.fullPath
})

const { t, locale } = useI18n()
const route = useRoute()

const slug = computed(() => {
  const params = route.params.slug
  return Array.isArray(params) ? params.join('/') : params || ''
})

type WithPath = { path?: string, _path?: string }
const getServicePath = (item?: WithPath | null) => item?.path || item?._path || ''
const getServiceLink = (item: WithPath) => getServicePath(item).replace(/^\/services\/[^/]+/, '/services') || '#'
const getServiceImage = (item: { coverImage?: string, image?: string }) => item.coverImage || item.image || '/placeholder.avif'

const { data, status } = await useAsyncData(
  `service-${locale.value}-${slug.value}`,
  () =>
    queryCollection('services')
      .path(`/services/${locale.value}/${slug.value}`)
      .first(),
  { watch: [locale, slug] }
)

// Missing page = 404
if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('Service not found'),
    fatal: true
  })
}

// ponytail: 404 thrown above, the page key remounts per route so data stays set
const current = computed(() => data.value as NonNullable<typeof data.value>)

const { data: services } = await useAsyncData(
  `services-all-${locale.value}`,
  () =>
    queryCollection('services')
      .where('stem', 'LIKE', `services/${locale.value}/%`)
      .order('order', 'ASC')
      .all(),
  { watch: [locale] }
)

// Previous / next service, wrapping around the list
const siblings = computed(() => {
  const list = services.value || []
  const index = list.findIndex(item => getServicePath(item) === getServicePath(current.value))
  if (index < 0) return []

  return [
    { direction: 'prev', service: list[(index - 1 + list.length) % list.length] },
    { direction: 'next', service: list[(index + 1) % list.length] }
  ].flatMap(({ direction, service }) => service
    ? [{ direction, service }]
    : [])
})

useDynamicSeo({
  title: current.value.seo?.title || current.value.title,
  description: current.value.seo?.description || current.value.description || t('View service details'),
  image: current.value.coverImage || current.value.image
})

useServiceSchema({
  title: current.value.title,
  description: current.value.seo?.description || current.value.description,
  category: current.value.category,
  duration: current.value.duration,
  deliverables: current.value.deliverables,
  tags: current.value.tags,
  url: getServiceLink(current.value)
})

const breadcrumbItems = computed(() => [
  { label: t('Home'), icon: 'lucide:home', to: '/' },
  { label: t('Services'), to: '/services' },
  { label: t('Service Details') }
])

</script>

<template>
  <div class="min-h-screen">
    <UiSkeletonDetail v-if="status === 'pending'" type="service" />

    <template v-else-if="current">
      <!-- Hero -->
      <section class="site-frame detail-masthead">
        <div class="detail-masthead-copy min-w-0">
          <div class="flex flex-wrap items-center gap-3">
            <UBreadcrumb :items="breadcrumbItems" :ui="{ link: 'text-xs' }" />
            <UBadge
              v-if="current.category"
              color="primary"
              variant="subtle"
              class="gap-1.5 rounded-lg border border-default px-3 py-1 text-xs font-semibold"
            >
              {{ current.category }}
            </UBadge>
          </div>

          <h1 class="detail-title">{{ current.title }}</h1>

          <p v-if="current.description" class="detail-deck">{{ current.description }}</p>

          <UBadge
            v-if="current.duration"
            icon="lucide:calendar-clock"
            color="neutral"
            variant="outline"
            class="w-fit font-medium"
          >
            {{ current.duration }}
          </UBadge>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <UiArrowButton
              :href="`https://wa.me/6287761296676?text=${encodeURIComponent(t('serviceInquiry.whatsapp', { service: current.title || '' }))}`"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon="lucide:arrow-up-right"
            >
              <template #leading>
                <UIcon name="simple-icons:whatsapp" class="size-4" />
              </template>
              {{ t('Konsultasi via WhatsApp') }}
            </UiArrowButton>

            <UiArrowButton to="#service-content" variant="secondary" icon="lucide:arrow-down">
              {{ t('Lihat Rincian') }}
            </UiArrowButton>
          </div>
        </div>
        <figure v-if="current.coverImage || current.image" class="detail-cover">
          <NuxtImg :src="getServiceImage(current)" :alt="current.title" class="size-full object-cover" />
        </figure>
        <div v-else class="detail-mascot">
          <LazyUiMascot name="kairav" size="180" label="Kairav" hydrate-on-visible />
        </div>
      </section>

      <!-- Content -->
      <section id="service-content" class="site-frame detail-reading-layout">
        <article class="min-w-0">
          <UiReadingContent :document="current" />
        </article>

        <aside class="detail-reading-aside min-w-0 space-y-4">
          <UCard
            :ui="{
              root: 'rounded-lg border border-default/40 bg-elevated shadow-xl shadow-black/5 ring-0',
              body: 'p-5 sm:p-5'
            }"
          >
            <h2 class="mb-4 flex items-center gap-2 text-sm font-semibold text-highlighted">
              <UIcon name="lucide:check-circle" class="size-3.5 text-primary" />
              <span>{{ t('Deliverables') }}</span>
            </h2>
            <ul class="mb-5 space-y-2.5">
              <li
                v-for="deliverable in current.deliverables"
                :key="deliverable"
                class="flex items-start gap-2.5 text-xs leading-snug text-highlighted/90 sm:text-sm"
              >
                <UIcon name="lucide:check" class="mt-0.5 size-3.5 shrink-0 text-primary" />
                <span>{{ deliverable }}</span>
              </li>
            </ul>

            <div v-if="current.tags?.length" class="mb-5 flex flex-wrap gap-1.5">
              <UBadge
                v-for="tag in current.tags"
                :key="tag"
                color="neutral"
                variant="outline"
                class="rounded-lg border-default/40 bg-elevated text-xs text-muted transition-colors hover:border-primary/50 hover:text-highlighted sm:text-xs font-medium"
              >
                {{ tag }}
              </UBadge>
            </div>

            <div class="mb-5 space-y-3">
              <UiArrowButton to="/contact" variant="primary" icon="lucide:send" class="w-full">
                {{ t('Discuss This Service') }}
              </UiArrowButton>
              <UiArrowButton to="/services" variant="secondary" icon="lucide:arrow-left" class="w-full">
                {{ t('Back to Services') }}
              </UiArrowButton>
            </div>

            <USeparator class="mb-4" />
            <AppSocialShare :title="current.title" :label="t('Share Service')" />
          </UCard>
        </aside>
      </section>

      <!-- Previous / next navigation -->
      <section

        class="overflow-x-hidden border-t border-default/40 px-4 py-12"
      >
        <div class="navigation-container container mx-auto max-w-7xl">
          <h2 class="detail-related-heading">{{ t('More Services') }}</h2>

          <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <UiContentCard
              v-for="{ direction, service } in siblings"
              :key="direction"
              :to="getServiceLink(service)"
              :title="service.title"
              :description="service.description"
              :image="getServiceImage(service)"
            />
          </div>
        </div>
      </section>
    </template>
  </div>
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


</style>
