<script setup>
const { t } = useI18n()

const allEducationItems = computed(() => [
  {
    logo: '/logo/unu-jogja.avif',
    title: t('Nahdlatul Ulama University Yogyakarta (UNUYO)'),
    date: '2023 - ' + t('Present') + ' | ' + t('Undergraduated'),
    description: t(
      "Currently pursuing a Bachelor's degree in Informatics, focusing on programming concepts, data structures, algorithms, and software development. Engaged in various projects and research activities."
    ),
    type: t('Formal')
  },
  {
    logo: '/logo/dinperinaker.avif',
    title: t('Graphic Design Training - DINPERINAKER Blora'),
    date: '2022 | ' + t('Graduated'),
    description: t(
      'Participated in a graphic design training program using CorelDRAW, learning design techniques, image manipulation, and the creation of visual materials. Completed various design projects and developed a strong portfolio.'
    ),
    type: t('Non-Formal')
  },
  {
    logo: '/logo/rgi.avif',
    title: t('Rumah Gemilang Indonesia Surabaya (RGI Surabaya)'),
    date: '2020 - 2021 | ' + t('Graduated'),
    description: t(
      'Completed a Software Engineering training program specializing in Web Programming, covering HTML, CSS, JavaScript, and general web development. Participated in hands-on projects to build web applications.'
    ),
    type: t('Non-Formal')
  },
  {
    logo: '/logo/smaransa.avif',
    title: t('SMAN 1 Randublatung (Smaransa)'),
    date: '2017 - 2020 | ' + t('Graduated'),
    description: t(
      'Mathematics and Natural Sciences (MIPA). Actively participated in student organizations and extracurricular activities.'
    ),
    type: t('Formal')
  }
])

const showAll = ref(false)
const displayedItems = computed(() =>
  showAll.value ? allEducationItems.value : allEducationItems.value.slice(0, 3)
)
const hasMore = computed(() => allEducationItems.value.length > 3)
</script>

<template>
  <section class="section py-20 px-6 md:px-12 lg:px-20 overflow-hidden text-gray-800 dark:text-white">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Title Area -->
        <div class="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <h2 class="leading-[0.88] tracking-tight mb-6">
            <span class="section-title-filled block">{{ t('Education') }}</span>
            <span class="section-title-outline text-foreground block">& {{ t('Training') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="w-12 h-1 bg-amber-400 mb-6"></div>
          <p class="text-sm font-mono tracking-wider uppercase text-muted-foreground">{{ t('Formal and Non Formal') }}</p>
        </div>
        
        <!-- Timeline Area -->
        <div class="lg:col-span-8 relative">
          <AppUiTimelineRail>
            <div
              v-for="item in displayedItems"
              :key="item.title"
              class="relative flex flex-col sm:pl-12"
            >
              <AppUiTimelineNode />
              <div class="flex items-center justify-between space-x-4 text-muted-foreground mb-3">
                <span class="inline-flex items-center px-3 py-1 my-1 space-x-2 text-xs font-mono tracking-widest uppercase border border-border/30 bg-background/40 backdrop-blur-sm">
                  <span class="relative flex h-1.5 w-1.5">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
                  </span>
                  <span class="font-medium text-foreground">{{ item.type }}</span>
                </span>
              </div>
              <div class="rounded-sm border border-border/30 bg-background/40 p-6 backdrop-blur-md shadow-lg transition-colors hover:bg-background/60 mb-8">
                <!-- Logo + Title Row -->
                <div class="flex items-center gap-4 mb-4">
                  <div class="flex-shrink-0 w-12 h-12 rounded-sm border border-border/30 bg-background/80 flex items-center justify-center p-2">
                    <img
                      :src="item.logo"
                      :alt="item.title"
                      class="w-full h-full object-contain"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg md:text-xl font-heading font-semibold text-foreground leading-snug">{{ item.title }}</h3>
                    <time class="text-[10px] font-mono tracking-widest uppercase text-muted-foreground">{{ item.date }}</time>
                  </div>
                </div>
                <p class="text-sm md:text-base font-light leading-relaxed text-muted-foreground">{{ item.description }}</p>
              </div>
            </div>
          </AppUiTimelineRail>

          <!-- Expand Toggle -->
          <div v-if="hasMore" class="flex justify-center mt-2">
            <button
              class="inline-flex items-center gap-2 px-5 py-2 rounded-sm border border-border/40 bg-background/50 backdrop-blur-sm text-xs font-mono uppercase tracking-widest text-muted-foreground hover:border-amber-400/40 hover:text-foreground transition-all duration-300"
              @click="showAll = !showAll"
            >
              <Icon
                :name="showAll ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                class="w-4 h-4"
              />
              {{ showAll ? t('Show Less') : t('Show More') }}
            </button>
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
