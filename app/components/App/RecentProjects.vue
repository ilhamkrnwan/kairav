<script setup lang="ts">
const { t, locale } = useI18n()

const { data: projects } = await useAsyncData(
  `recent-projects-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .where('stem', 'LIKE', `portofolio/${locale.value}/%`)
      .order('date', 'DESC')
      .limit(3)
      .all(),
  { watch: [locale] }
)

const displayedProjects = computed(() => projects?.value || [])

const getTagColor = (tag: string) => {
  const colors: Record<string, string> = {
    'Nuxt.js': 'bg-green-600 hover:bg-green-700',
    'Nuxt 4': 'bg-green-600 hover:bg-green-700',
    'React': 'bg-blue-500 hover:bg-blue-600',
    'Vue': 'bg-green-600 hover:bg-green-700',
    'Vue.js': 'bg-green-600 hover:bg-green-700',
    'Node.js': 'bg-green-700 hover:bg-green-800',
    'Tailwind CSS': 'bg-cyan-600 hover:bg-cyan-700',
    'TypeScript': 'bg-blue-700 hover:bg-blue-800',
    'PHP Native': 'bg-indigo-700 hover:bg-indigo-800',
    'MySQL': 'bg-orange-700 hover:bg-orange-800',
    'Supabase': 'bg-green-700 hover:bg-green-800',
    'Google Gemini AI': 'bg-purple-600 hover:bg-purple-700',
    'Capacitor': 'bg-blue-600 hover:bg-blue-700',
    'Static Site': 'bg-gray-600 hover:bg-gray-700',
    'Mobile-First': 'bg-pink-600 hover:bg-pink-700',
    'Content-Driven': 'bg-teal-600 hover:bg-teal-700',
    'i18n': 'bg-indigo-600 hover:bg-indigo-700',
    'CMS': 'bg-purple-700 hover:bg-purple-800',
    'Shadcn UI': 'bg-slate-700 hover:bg-slate-800',
    'Nuxt UI v4': 'bg-green-700 hover:bg-green-800',
    'Educational Platform': 'bg-amber-600 hover:bg-amber-700',
    'Islamic Platform': 'bg-emerald-700 hover:bg-emerald-800',
    'Community System': 'bg-purple-600 hover:bg-purple-700'
  }

  return colors[tag] || 'bg-gray-600 hover:bg-gray-700'
}
</script>

<template>
  <section class="section py-20 px-6 md:px-12 lg:px-20 overflow-hidden text-gray-800 dark:text-white">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Section Header -->
        <div class="lg:col-span-4 lg:sticky lg:top-32 h-fit scroll-section will-change-[transform,opacity]">
          <h2 class="leading-[0.88] tracking-tight mb-6">
            <span class="section-title-filled block">{{ t('Recent') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Projects') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="w-12 h-1 bg-amber-400 mb-6"></div>
          <p class="text-sm font-mono tracking-wider text-muted-foreground leading-relaxed">
            {{ t('A collection of digital executions where') }}
            <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3">
              {{ t('technical logic') }}
            </UiTextGradient>
            {{ t('meets') }}
            <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3">
              {{ t('seamless user experience.') }}
            </UiTextGradient>
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="lg:col-span-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <UiAnimatedCard
              v-for="project in displayedProjects"
              :key="project._path"
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
                :to="project._path"
                class="group relative block min-h-[320px] rounded-sm overflow-hidden bg-background/40 backdrop-blur-md border border-border/30 hover:bg-background/60 transition-all duration-300 h-full shadow-lg"
              >
                <!-- Image (revealed on hover) -->
                <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <img
                    :src="project.image"
                    :alt="project.title"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
                  />
                  <!-- Amber gradient overlay on top of image -->
                  <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                  <!-- Title on image hover state -->
                  <div class="absolute bottom-0 left-0 right-0 p-5">
                    <h3 class="text-lg font-heading text-white font-semibold tracking-wide">
                      {{ project.title }}
                    </h3>
                  </div>
                </div>

                <!-- Default Content (hidden on hover) -->
                <div class="relative z-20 p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
                  <!-- Icon -->
                  <div
                    class="w-14 h-14 mb-6 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center transition-all duration-300"
                  >
                    <Icon name="lucide:folder-open" class="w-6 h-6 text-amber-400" />
                  </div>

                  <!-- Title -->
                  <h3 class="text-xl font-heading font-semibold mb-3 text-foreground tracking-wide">
                    {{ project.title }}
                  </h3>

                  <!-- Description -->
                  <p class="text-sm font-light text-muted-foreground mb-6 leading-relaxed line-clamp-3 flex-1">
                    {{ project.description }}
                  </p>

                  <!-- Tags / Stack -->
                  <div class="flex flex-wrap gap-2 mt-auto">
                    <span
                      v-for="tag in project.tags?.slice(0, 3)"
                      :key="tag"
                      class="px-2 py-1 text-[10px] rounded-sm text-white font-mono uppercase tracking-widest transition-colors duration-300"
                      :class="getTagColor(tag)"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </NuxtLink>
            </UiAnimatedCard>

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
                to="/portofolio"
                class="group relative flex h-full min-h-[320px] flex-col rounded-sm border border-amber-400/30 bg-amber-400/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-amber-400/50 hover:bg-amber-400/10"
              >
                <div
                  class="w-14 h-14 mb-6 rounded-sm bg-linear-to-br from-amber-400/15 to-orange-500/15 border border-amber-400/25 flex items-center justify-center transition-all duration-300 group-hover:from-amber-400/25 group-hover:to-orange-500/25"
                >
                  <Icon name="lucide:folder-search" class="w-6 h-6 text-amber-400" />
                </div>

                <h3 class="text-xl font-heading font-semibold mb-3 text-foreground tracking-wide">
                  {{ t('View All Projects') }}
                </h3>

                <p class="text-sm font-light text-muted-foreground leading-relaxed">
                  {{ t('Lihat kumpulan project lain yang pernah saya kerjakan, mulai dari website bisnis, sistem dashboard, aplikasi web, hingga platform digital.') }}
                </p>

                <div class="mt-auto pt-6">
                  <span class="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-300">
                    {{ t('Explore Projects') }}
                    <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
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
