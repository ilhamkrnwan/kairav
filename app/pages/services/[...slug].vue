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
    ? [{ direction, service, isPrev: direction === 'prev' }]
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
  { label: current.value?.title || t('Service Details') }
])

</script>

<template>
  <main class="min-h-screen">
    <UiSkeletonDetail v-if="status === 'pending'" type="service" />

    <template v-else-if="current">
      <!-- Hero -->
      <section class="relative overflow-hidden border-b border-default/40 bg-radial from-primary/4 via-transparent to-transparent px-6 pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-24 md:px-12 md:pb-20 lg:px-20 lg:pt-28 lg:pb-24">

        <div class="relative z-10 container mx-auto max-w-7xl">
          <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <!-- Left: hero content -->
            <div class="flex flex-col items-start space-y-6 text-left lg:col-span-7">
              <div class="flex flex-wrap items-center gap-3">
                <UBreadcrumb :items="breadcrumbItems" />
                <UBadge
                  color="primary"
                  variant="subtle"
                  class="gap-1.5 rounded-lg border border-default px-3 py-1 text-xs font-semibold"
                >
                  <template #leading>
                    <span class="size-1.5 animate-pulse rounded-full bg-primary" />
                  </template>
                  {{ current.category }}
                </UBadge>
              </div>

              <div class="space-y-4">
<h1 :key="$i18n.locale" class="font-heading text-3xl leading-[1.08] tracking-tight text-highlighted sm:text-4xl md:text-5xl lg:text-6xl">
                  {{ current.title }}<span class="text-primary">.</span>
                </h1>
              </div>

              <p class="max-w-2xl text-base font-normal leading-relaxed text-muted sm:text-lg md:text-xl">
                {{ current.description }}
              </p>

              <!-- Meta badges -->
              <div class="flex flex-wrap items-center gap-2 pt-1 sm:gap-3">
                <UBadge
                  v-if="current.duration"
                  icon="lucide:calendar-clock"
                  color="neutral"
                  variant="outline"
                  class="rounded-lg border-default/50 bg-elevated px-3 py-1.5 text-xs font-medium"
                  :ui="{ leadingIcon: 'text-primary' }"
                >
                  {{ current.duration }}
                </UBadge>
                <UBadge
                  v-if="current.featured"
                  icon="lucide:sparkles"
                  color="primary"
                  variant="outline"
                  class="rounded-lg border-primary/30 bg-elevated px-3 py-1.5 text-xs font-semibold"
                >
                  {{ t('Layanan Utama') }}
                </UBadge>
                <UBadge
                  icon="lucide:shield-check"
                  color="neutral"
                  variant="outline"
                  class="rounded-lg border-default/50 bg-elevated px-3 py-1.5 text-xs font-medium"
                  :ui="{ leadingIcon: 'text-primary' }"
                >
                  100% Custom Code
                </UBadge>
              </div>

              <div class="flex flex-wrap items-center gap-3 pt-2">
                <UiArrowButton
                  :href="`https://wa.me/6287761296676?text=${encodeURIComponent(`Halo Ilham, saya tertarik konsultasi layanan ${current.title}.`)}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  icon="lucide:arrow-up-right"
                >
                  <template #leading>
                    <UIcon name="simple-icons:whatsapp" class="size-4 text-neutral-950" />
                  </template>
                  {{ t('Konsultasi via WhatsApp') }}
                </UiArrowButton>

                <UiArrowButton to="#service-content" variant="secondary" icon="lucide:arrow-down">
                  {{ t('Lihat Rincian') }}
                </UiArrowButton>
              </div>
            </div>

            <!-- Right: 3D developer avatar with floating accents -->
            <div class="relative mt-8 flex items-center justify-center lg:col-span-5 lg:mt-0">
              <div class="group relative flex w-full max-w-md items-center justify-center">

                <NuxtImg
                  src="/developer-service-avatar.avif"
                  :alt="`${current.title} - Ilham Kurniawan`"
                  width="440"
                  height="420"
                  format="webp"
                  loading="eager"
                  class="avatar-floating relative z-10 max-h-96 w-64 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105 sm:max-h-105 sm:w-76 md:w-88 lg:w-96"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Cover image -->
      <section
        v-if="current.coverImage || current.image"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 100 } }"
        class="pt-8 pb-4 md:pt-12 md:pb-6"
      >
        <div class="container mx-auto max-w-5xl px-4">
          <div class="relative aspect-video overflow-hidden rounded-lg border border-default shadow-lg shadow-black/5">
            <NuxtImg :src="getServiceImage(current)" :alt="current.title" class="size-full object-cover" />
          </div>
        </div>
      </section>

      <!-- Content -->
      <section id="service-content" class="scroll-mt-20 py-12 md:py-16">
        <div class="container mx-auto px-4">
          <div class="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-12">
            <article class="lg:col-span-8">
              <div class="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-headings: prose-headings: prose-p:text-highlighted/80">
                <ContentRenderer :value="current" />
              </div>
            </article>

            <aside class="lg:col-span-4">
              <UCard
                class="lg:sticky lg:top-28"
                :ui="{
                  root: 'rounded-lg border border-default/40 bg-elevated shadow-xl shadow-black/5 ring-0',
                  body: 'p-5 sm:p-5'
                }"
              >
                <h2 class="mb-4 flex items-center gap-2 text-xs text-muted font-medium">
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
          </div>
        </div>
      </section>

      <!-- Previous / next navigation -->
      <section
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 500 } }"
        class="overflow-x-hidden border-t border-default/40 px-4 py-12"
      >
        <div class="navigation-container container mx-auto max-w-7xl">
          <h2 :key="$i18n.locale" class="mb-12 text-center leading-[0.88] tracking-tight">
            <span class="section-title-filled block">{{ t('More') }}</span>
            <span class="section-title-outline block">{{ t('Services') }}<span class="text-primary">.</span></span>
          </h2>

          <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div v-for="{ direction, service, isPrev } in siblings" :key="direction">
              <ULink :to="getServiceLink(service)" raw class="group flex h-full flex-col gap-3">
                <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted transition-colors duration-300 group-hover:border-primary/50">
                  <NuxtImg
                    :src="getServiceImage(service)"
                    :alt="service.title"
                    width="600"
                    height="337"
                    format="avif"
                    loading="lazy"
                    class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div class="flex flex-1 flex-col">
                  <div
                    class="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted"
                    :class="{ 'flex-row-reverse justify-end': !isPrev }"
                  >
                    <UIcon :name="isPrev ? 'lucide:arrow-left' : 'lucide:arrow-right'" class="size-3.5" />
                    <span class="truncate">{{ isPrev ? t('Previous Service') : t('Next Service') }}</span>
                  </div>
                  <h3 class="line-clamp-2 font-heading text-sm leading-snug text-highlighted transition-colors duration-300 group-hover:text-primary sm:text-lg">
                    {{ service.title }}
                  </h3>
                  <p class="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                    {{ service.description }}
                  </p>
                  <div class="mt-3 flex items-center justify-between gap-2 text-xs font-medium text-muted">
                    <UBadge :label="service.category" color="neutral" variant="outline" size="xs" class="max-w-full truncate font-medium" />
                    <span class="truncate">{{ service.duration }}</span>
                  </div>
                </div>
              </ULink>
            </div>
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


</style>
