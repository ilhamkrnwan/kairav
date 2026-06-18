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

const prevService = computed(() => {
  if (!services.value || currentIndex.value < 0) return null
  const len = services.value.length
  return services.value[(currentIndex.value - 1 + len) % len]
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

      <section class="py-12 md:py-16">
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
        <div class="container mx-auto max-w-6xl navigation-container">
          <h2 class="leading-[0.88] tracking-tight mb-12 text-center">
            <span class="section-title-filled block">{{ t('More') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Services') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
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
                class="group relative block rounded-sm overflow-hidden bg-background/80 backdrop-blur-md border border-border/40 hover:border-amber-400/50 transition-all duration-300 h-full min-h-64 shadow-xl shadow-black/5"
              >
                <!-- Default content layer -->
                <div class="relative z-20 p-6 flex flex-col h-full group-hover:border-amber-400/10 transition-colors duration-300">
                  <div class="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-4">
                    <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
                    <span>{{ t('Previous Service') }}</span>
                  </div>

                  <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 rounded-sm border border-border/40 bg-background/50 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:from-amber-400/20 group-hover:to-orange-500/20">
                      <Icon :name="prevService.icon || 'lucide:layers'" class="w-5 h-5 text-amber-400" />
                    </div>
                    <span class="inline-flex items-center px-2 py-0.5 rounded-sm bg-background border border-border/30 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      {{ prevService.category }}
                    </span>
                  </div>

                  <h3 class="text-xl font-heading font-semibold mb-2 text-foreground leading-snug uppercase group-hover:text-amber-400 transition-colors">
                    {{ prevService.title }}
                  </h3>

                  <p class="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1 font-medium">
                    {{ prevService.description }}
                  </p>

                  <div class="flex items-center justify-between mt-auto pt-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    <span>{{ prevService.duration }}</span>
                    <span class="inline-flex items-center gap-2 text-amber-400 group-hover:-translate-x-1 transition-transform">
                      <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
                      {{ t('Selengkapnya') }}
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
                class="group relative block rounded-sm overflow-hidden bg-background/80 backdrop-blur-md border border-border/40 hover:border-amber-400/50 transition-all duration-300 h-full min-h-64 shadow-xl shadow-black/5"
              >
                <!-- Default content layer -->
                <div class="relative z-20 p-6 flex flex-col h-full group-hover:border-amber-400/10 transition-colors duration-300 items-end text-right">
                  <div class="flex items-center justify-end gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-4 w-full">
                    <span>{{ t('Next Service') }}</span>
                    <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
                  </div>

                  <div class="flex items-center justify-between mb-4 w-full">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-sm bg-background border border-border/30 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      {{ nextService.category }}
                    </span>
                    <div class="w-12 h-12 rounded-sm border border-border/40 bg-background/50 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:from-amber-400/20 group-hover:to-orange-500/20">
                      <Icon :name="nextService.icon || 'lucide:layers'" class="w-5 h-5 text-amber-400" />
                    </div>
                  </div>

                  <h3 class="text-xl font-heading font-semibold mb-2 text-foreground leading-snug uppercase w-full group-hover:text-amber-400 transition-colors">
                    {{ nextService.title }}
                  </h3>

                  <p class="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1 w-full text-right font-medium">
                    {{ nextService.description }}
                  </p>

                  <div class="flex items-center justify-between mt-auto pt-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground w-full">
                    <span class="inline-flex items-center gap-2 text-amber-400 group-hover:translate-x-1 transition-transform">
                      {{ t('Selengkapnya') }}
                      <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
                    </span>
                    <span>{{ nextService.duration }}</span>
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
  font-size: clamp(3rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}
</style>
