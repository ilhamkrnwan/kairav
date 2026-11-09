<script setup lang="ts">

const { t, locale } = useI18n()

const { data: portofolios, status } = await useAsyncData(
  `portofolio-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .select('path', '_path', 'title', 'description', 'image', 'category', 'tags', 'date', 'status', 'services', 'client', 'industry')
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


// Initialize Scroll Reveal Animations
useScrollReveal()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 overflow-hidden">

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h1 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-8 animate-fade-in-up delay-100">
          <span class="section-title-filled block">{{ t('Innovative') }}</span>
          <span class="section-title-outline block">{{ t('Projects') }} & {{ t('Solutions') }}<span class="text-primary">.</span></span>
        </h1>

        <p class="text-base md:text-lg text-muted mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-normal">
          {{ t('Here are some of the projects I\'ve worked on, showcasing my skills and passion for creating') }}
          <UiTextGradient class="font-medium">
            {{ t('innovative solutions') }}
          </UiTextGradient>
          {{ t('that make a') }}
          <UiTextGradient class="font-medium">
            {{ t('real impact.') }}
          </UiTextGradient>
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <UiArrowButton to="#project-list" variant="primary" icon="lucide:arrow-down">
            {{ t('View Projects') }}
          </UiArrowButton>

          <UiArrowButton to="/" variant="secondary" icon="lucide:home">
            {{ t('Back to Home') }}
          </UiArrowButton>
        </div>
      </div>
    </section>

    <!-- Project list -->
    <section id="project-list" class="scroll-section will-change-[transform,opacity] section py-20">
      <div class="container max-w-7xl mx-auto px-6 lg:px-8">
        <div class="text-center mb-16 stagger-item">
          <h2 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-4">
            <span class="section-title-filled block">{{ t('Featured') }}</span>
            <span class="section-title-outline block">{{ t('Work') }}<span class="text-primary">.</span></span>
          </h2>
          <p class="text-muted text-lg max-w-2xl mx-auto font-normal">
            {{ t('A collection of my projects, showcasing my skills in creating innovative and effective solutions across different domains.') }}
          </p>
        </div>

        <!-- Filters -->
        <div class="mb-12 space-y-5 stagger-item">
          <UInput
            v-model="searchQuery"
            icon="lucide:search"
            size="xl"
            :placeholder="t('Search projects by name, description, or tags...')"
            class="w-full max-w-2xl mx-auto block"
            :ui="{ base: 'rounded-lg sm:rounded-xl bg-elevated' }"
          >
            <template v-if="searchQuery" #trailing>
              <UButton
                icon="lucide:x"
                color="neutral"
                variant="link"
                size="sm"
                :aria-label="t('Clear Filters')"
                @click="searchQuery = ''"
              />
            </template>
          </UInput>

          <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <UButton
              v-for="category in categories"
              :key="category"
              :label="category"
              size="sm"
              :color="selectedCategory === category ? 'primary' : 'neutral'"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              class="rounded-lg sm:rounded-lg transition-all duration-300 hover:scale-102 sm:hover:scale-105"
              @click="selectedCategory = category"
            />
          </div>
        </div>

        <!-- Featured project -->
        <div v-if="featuredPortfolio" class="mb-14 sm:mb-20 stagger-item">
          <ULink :to="getPortofolioLink(featuredPortfolio)" raw class="group block">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div class="lg:col-span-7 relative aspect-video overflow-hidden rounded-lg sm:rounded-lg border border-default bg-muted/20 group-hover:border-primary/50 transition-all duration-500">
                <NuxtImg
                  :src="featuredPortfolio.image || '/placeholder.avif'"
                  :alt="featuredPortfolio.title"
                  width="1280"
                  height="720"
                  format="avif"
                  loading="eager"
                  class="size-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div class="lg:col-span-5 flex flex-col justify-center">
                <div class="flex items-center gap-2 mb-3">
                  <span class="relative flex size-2">
                    <span class="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-75" />
                    <span class="relative inline-flex rounded-full size-2 bg-primary" />
                  </span>
                  <span class="text-xs sm:text-xs text-primary font-bold">
                    {{ t('Featured Project') }}
                  </span>
                </div>

                <p class="mb-3 text-sm font-semibold text-toned">{{ featuredPortfolio.category || 'Web App' }}</p>

                <div class="flex items-center gap-3 text-xs sm:text-xs text-muted mb-3 sm:mb-4 font-medium">
                  <span v-if="featuredPortfolio.client" class="text-highlighted/90 font-medium">{{ featuredPortfolio.client }}</span>
                  <span v-if="featuredPortfolio.client && featuredPortfolio.industry">•</span>
                  <span v-if="featuredPortfolio.industry">{{ featuredPortfolio.industry }}</span>
                </div>

                <h3 class="text-lg sm:text-2xl md:text-3xl font-heading text-highlighted leading-[1.15] mb-3 sm:mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                  {{ featuredPortfolio.title }}
                </h3>

                <p class="text-xs sm:text-sm md:text-base font-normal text-muted leading-relaxed mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                  {{ featuredPortfolio.description }}
                </p>

                <div v-if="featuredPortfolio.tags?.length" class="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                  <UBadge
                    v-for="tag in featuredPortfolio.tags.slice(0, 4)"
                    :key="tag"
                    :label="`#${tag}`"
                    color="neutral"
                    variant="outline"
                    class="text-xs sm:text-xs bg-elevated text-highlighted/80 font-medium"
                  />
                </div>

                <span class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary group-hover:text-primary/85 transition-colors">
                  {{ t('View Case Study') }}
                  <UIcon name="lucide:arrow-right" class="size-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </ULink>
        </div>

        <!-- Section label when featured is shown -->
        <div v-if="featuredPortfolio && regularPortfolios.length" class="mb-6 stagger-item">
          <div class="flex items-center justify-between">
            <h3 class="text-xs sm:text-sm text-muted flex items-center gap-2 font-medium">
              <UIcon name="lucide:layers" class="size-3.5 text-primary" />
              <span>{{ t('More Projects') }}</span>
            </h3>
            <span class="text-xs sm:text-xs text-muted">{{ regularPortfolios.length }} {{ t('projects') }}</span>
          </div>
        </div>

        <!-- Grid: skeleton -->
        <div v-if="status === 'pending'" class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <UiSkeletonPortfolioCard v-for="i in 6" :key="`portfolio-skeleton-${i}`" />
        </div>

        <!-- Grid: projects -->
        <TransitionGroup v-else-if="regularPortfolios.length" tag="ul" name="filter" class="space-y-2">
          <li v-for="project in regularPortfolios" :key="project.path" class="stagger-item">
            <ULink :to="getPortofolioLink(project)" raw class="group grid gap-4 py-6 sm:grid-cols-[14rem_1fr] sm:gap-8">
              <NuxtImg
                :src="project.image || '/placeholder.avif'"
                :alt="project.title"
                width="448"
                height="252"
                format="avif"
                loading="lazy"
                class="aspect-video w-full rounded-lg border border-default object-cover transition-transform duration-200 ease-out group-hover:-rotate-2 group-hover:scale-[1.03]"
              />
              <div class="flex flex-col">
                <h3 class="font-heading text-2xl leading-tight text-highlighted transition-colors group-hover:text-primary sm:text-3xl">
                  {{ project.title }}
                </h3>
                <p class="mt-2 line-clamp-2 text-sm leading-relaxed text-muted sm:line-clamp-3">{{ project.description }}</p>
                <p class="mt-auto pt-3 text-sm font-semibold text-toned">{{ [project.category, ...(project.tags?.slice(0, 3) ?? [])].filter(Boolean).join(' · ') }}</p>
              </div>
            </ULink>
          </li>
        </TransitionGroup>

        <!-- Empty state -->
        <div v-else class="text-center py-24 stagger-item">
          <UAvatar icon="lucide:search-x" size="3xl" :ui="{ root: 'bg-primary/10 ring ring-primary/20 mb-6', icon: 'text-primary' }" />
          <h3 class="text-2xl font-heading mb-2">{{ t('No Projects Found') }}</h3>
          <p class="text-muted text-sm mb-8 max-w-xs mx-auto">
            {{ t('Try adjusting your search or filter criteria') }}
          </p>
          <UButton
            icon="lucide:rotate-ccw"
            :label="t('Clear Filters')"
            size="lg"
            class="rounded-md shadow-lg shadow-primary/25"
            @click="clearFilters"
          />
        </div>
      </div>
    </section>

    <div class="scroll-section will-change-[transform,opacity] w-full">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }


</style>
