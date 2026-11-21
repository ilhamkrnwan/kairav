<script setup lang="ts">

const { t, locale } = useI18n()

const { data: portofolios, status } = await useAsyncData(
  `portofolio-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .select('path', '_path', 'title', 'description', 'image', 'category', 'tags', 'date')
      .where('stem', 'LIKE', `portofolio/${locale.value}/%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

const getPortofolioLink = (item: { path?: string, _path?: string }) =>
  item._path || item.path?.replace(`/portofolio/${locale.value}`, '/portofolio') || '#'

const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = computed(() => [
  'All',
  ...new Set((portofolios.value ?? []).map(item => item.category).filter((c): c is string => !!c))
])

const filteredPortfolios = computed(() => {
  let filtered = portofolios.value || []
  if (selectedCategory.value !== 'All') {
    filtered = filtered.filter(item => item.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.title?.toLowerCase().includes(query)
      || item.description?.toLowerCase().includes(query)
      || item.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }
  return filtered
})

// Featured project: only when not searching and on the "All" category
const featuredPortfolio = computed(() =>
  selectedCategory.value === 'All' && !searchQuery.value ? filteredPortfolios.value[0] : undefined
)

const regularPortfolios = computed(() =>
  featuredPortfolio.value ? filteredPortfolios.value.slice(1) : filteredPortfolios.value
)

useDynamicSeo({
  titleKey: 'seo.portfolio.title',
  descriptionKey: 'seo.portfolio.description'
})


const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
}



const featuredMedia = useTemplateRef<HTMLElement>('featuredMedia')
useArtworkMotion(featuredMedia)
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <UiEditorialIntro :title="t('Portofolio')">
      {{ t('Here are some of the projects I\'ve worked on, showcasing my skills and passion for creating') }}
      {{ t('innovative solutions') }}
      {{ t('that make a') }}
      {{ t('real impact.') }}
    </UiEditorialIntro>

    <!-- Project list -->
    <section id="project-list" class="site-frame editorial-section catalogue">
      <div>
        <h2 class="catalogue-heading">{{ t('Featured') + ' ' + t('Work') }}</h2>

        <!-- Filters -->
        <div class="catalogue-filters">
          <UInput
            v-model="searchQuery"
            icon="lucide:search"
            size="xl"
            :placeholder="t('Search')"
            :aria-label="t('Search projects by name, description, or tags...')"
            class="w-full max-w-md"
            :ui="{ base: 'rounded-lg sm:rounded-xl bg-elevated' }"
          >
            <template v-if="searchQuery" #trailing>
              <UButton
                icon="lucide:x"
                color="neutral"
                variant="link"
                size="sm"
                class="size-11 justify-center"
                :aria-label="t('Clear Filters')"
                @click="searchQuery = ''"
              />
            </template>
          </UInput>

          <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :label="category"
              size="sm"
              :color="selectedCategory === category ? 'primary' : 'neutral'"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              :aria-pressed="selectedCategory === category"
              class="liquid-button min-h-11 min-w-11 justify-center rounded-lg sm:rounded-lg transition-all duration-300"
              @click="selectedCategory = category"
            />
          </div>
        </div>

        <!-- Featured project -->
        <div v-if="featuredPortfolio" ref="featuredMedia" class="catalogue-feature">
          <ULink :to="getPortofolioLink(featuredPortfolio)" raw class="group block">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div class="lg:col-span-7 relative aspect-video overflow-hidden border border-default bg-muted group-hover:border-primary/50 transition-all duration-500">
                <NuxtImg
                  data-artwork
                  :src="featuredPortfolio.image || '/placeholder.avif'"
                  alt=""
                  width="1280"
                  height="720"
                  format="avif"
                  loading="eager"
                  class="size-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div class="lg:col-span-5 flex flex-col justify-center">
                <h3 class="text-lg sm:text-2xl md:text-3xl font-heading text-highlighted leading-[1.15] mb-3 sm:mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {{ featuredPortfolio.title }}
                </h3>

                <p class="text-xs sm:text-sm md:text-base font-normal text-muted leading-relaxed line-clamp-3">
                  {{ featuredPortfolio.description }}
                </p>

              </div>
            </div>
          </ULink>
        </div>

        <!-- Section label when featured is shown -->
        <div v-if="featuredPortfolio && regularPortfolios.length" class="mb-6 ">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm text-muted flex items-center gap-2 font-medium">
              <UIcon name="lucide:layers" class="size-3.5 text-primary" />
              <span>{{ t('More Projects') }}</span>
            </h3>
            <span class="text-xs sm:text-xs text-muted">{{ regularPortfolios.length }} {{ t('projects') }}</span>
          </div>
        </div>

        <!-- Grid: skeleton -->
        <div v-if="status === 'pending'" class="editorial-list" aria-hidden="true">
          <div v-for="i in 6" :key="i" class="grid gap-4 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
            <USkeleton class="aspect-video w-full rounded-lg" />
            <div class="space-y-2">
              <USkeleton class="h-6 w-2/3" />
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-4/5" />
            </div>
          </div>
        </div>

        <!-- Grid: projects -->
        <TransitionGroup v-else-if="regularPortfolios.length" tag="ul" name="filter" class="editorial-list">
          <li v-for="project in regularPortfolios" :key="project.path">
            <ULink :to="getPortofolioLink(project)" raw class="group grid gap-4 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <NuxtImg
                :src="project.image || '/placeholder.avif'"
                alt=""
                width="448"
                height="252"
                format="avif"
                loading="lazy"
                class="aspect-video w-full rounded-lg border border-default object-cover transition-transform duration-200 ease-out "
              />
              <div class="flex flex-col">
                <h3 class="font-heading text-2xl leading-tight text-highlighted transition-colors group-hover:text-primary sm:text-3xl">
                  {{ project.title }}
                </h3>
                <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted sm:line-clamp-3">{{ project.description }}</p>
              </div>
            </ULink>
          </li>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-else class="text-center py-24 ">
          <UAvatar icon="lucide:search-x" size="3xl" :ui="{ root: 'bg-primary/10 ring ring-primary/20 mb-6', icon: 'text-primary' }" />
          <h3 class="text-2xl font-heading mb-2">{{ t('No Projects Found') }}</h3>
          <p class="text-muted text-sm mb-8 max-w-xs mx-auto">
            {{ t('Try adjusting your search or filter criteria') }}
          </p>
          <UButton
            icon="lucide:rotate-ccw"
            :label="t('Clear Filters')"
            size="lg"
            class="liquid-button min-h-11 rounded-md "
            @click="clearFilters"
          />
        </div>
      </div>
    </section>

    <div class="w-full">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }


</style>
