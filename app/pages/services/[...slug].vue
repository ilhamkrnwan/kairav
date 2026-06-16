<script setup lang="ts">
import type { ServiceCollectionItem } from '~/types'

const { t, locale } = useI18n()
const route = useRoute()

const slug = computed(() => {
  const params = route.params.slug
  if (Array.isArray(params)) return params.join('/')
  return params || ''
})

const normalizeServicePath = (item?: ServiceCollectionItem | null) => item?.path || item?._path || ''
const getServiceLink = (item: ServiceCollectionItem) => normalizeServicePath(item).replace(/^\/services\/[^/]+/, '/services') || '#'

const { data: current, error } = await useAsyncData(
  `service-${locale.value}-${slug.value}`,
  () =>
    queryCollection('services')
      .path(`/services/${locale.value}/${slug.value}`)
      .first(),
  { watch: [locale] }
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

const nextService = computed(() => {
  if (!services.value || currentIndex.value < 0) return null
  return services.value[(currentIndex.value + 1) % services.value.length]
})

if (error.value || !current.value) {
  throw createError({
    statusCode: 404,
    statusMessage: t('Service not found'),
    fatal: true
  })
}

useDynamicSeo({
  title: current.value?.seo?.title || current.value?.title,
  description: current.value?.seo?.description || current.value?.description || t('View service details')
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
</script>

<template>
  <main class="min-h-screen">
    <template v-if="current">
      <section class="py-16 md:py-24 px-4 border-b border-border/40">
        <div class="container mx-auto max-w-4xl text-center">
          <div class="mb-6">
            <span class="inline-flex items-center px-4 py-2 rounded-sm text-[10px] font-mono tracking-widest uppercase bg-amber-400/10 text-amber-400 border border-amber-400/30">
              {{ current.category }}
            </span>
          </div>

          <div class="mx-auto mb-8 w-16 h-16 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center">
            <Icon :name="current.icon || 'lucide:layers'" class="w-7 h-7 text-amber-400" />
          </div>

          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight mb-8 leading-tight uppercase">
            {{ current.title }}
          </h1>

          <p class="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            {{ current.description }}
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-4 text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
            <div v-if="current.duration" class="flex items-center gap-2 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-border/40">
              <Icon name="lucide:calendar-clock" class="w-3.5 h-3.5 text-amber-400" />
              <span>{{ current.duration }}</span>
            </div>
            <div v-if="current.featured" class="flex items-center gap-2 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-border/40">
              <Icon name="lucide:sparkles" class="w-3.5 h-3.5 text-amber-400" />
              <span>{{ t('Featured Service') }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 md:py-16 overflow-x-hidden">
        <div class="container mx-auto px-4">
          <div class="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            <article class="lg:col-span-8">
              <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-black prose-headings:uppercase prose-p:text-foreground/80">
                <ContentRenderer :value="current" />
              </div>
            </article>

            <aside class="lg:col-span-4">
              <div class="lg:sticky lg:top-28 rounded-sm border border-border/40 bg-background/50 backdrop-blur-sm p-6">
                <h2 class="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-5">
                  {{ t('Deliverables') }}
                </h2>
                <ul class="space-y-3 mb-8">
                  <li
                    v-for="deliverable in current.deliverables"
                    :key="deliverable"
                    class="flex items-start gap-3 text-sm text-foreground/80"
                  >
                    <Icon name="lucide:check" class="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>{{ deliverable }}</span>
                  </li>
                </ul>

                <div class="flex flex-wrap gap-2 mb-8">
                  <span
                    v-for="tag in current.tags"
                    :key="tag"
                    class="inline-flex items-center px-2 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase bg-background/70 border border-border/40 text-foreground"
                  >
                    {{ tag }}
                  </span>
                </div>

                <NuxtLink
                  to="/contact"
                  class="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-amber-400 px-5 py-3 text-xs font-mono font-bold uppercase tracking-widest text-black transition-colors hover:bg-amber-500"
                >
                  {{ t('Discuss This Service') }}
                  <Icon name="lucide:send" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section class="py-12 px-4 border-t border-border/40">
        <div class="container mx-auto max-w-4xl">
          <div class="grid sm:grid-cols-2 gap-4">
            <NuxtLink
              to="/services"
              class="rounded-sm border border-border/40 bg-background/50 p-5 text-center text-[10px] font-mono uppercase tracking-widest text-foreground transition-colors hover:border-amber-400/50 hover:text-amber-400"
            >
              {{ t('Back to Services') }}
            </NuxtLink>
            <NuxtLink
              v-if="nextService && normalizeServicePath(nextService) !== normalizeServicePath(current)"
              :to="getServiceLink(nextService)"
              class="rounded-sm border border-border/40 bg-background/50 p-5 text-center text-[10px] font-mono uppercase tracking-widest text-foreground transition-colors hover:border-amber-400/50 hover:text-amber-400"
            >
              {{ t('Next Service') }}: {{ nextService.title }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>
