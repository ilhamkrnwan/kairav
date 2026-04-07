<script setup lang="ts">
const { t, locale } = useI18n()

const { data: projects } = await useAsyncData(
  `recent-projects-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .where('path', 'LIKE', `/portofolio/${locale.value}%`)
      .order('date', 'DESC')
      .limit(3)
      .all(),
  { watch: [locale] }
)

const displayedProjects = computed(() => projects?.value || [])

const placeholderProjectCards = computed(() => {
  if (displayedProjects.value.length >= 1 && displayedProjects.value.length <= 2) return 1
  return 0
})

const workInProgressText = computed(() => {
  return locale.value === 'id'
    ? 'Sedang dikerjakan oleh penulis'
    : 'Currently being worked on by the author'
})

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
  <section class="w-full py-20 px-4 md:px-8 lg:px-12">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-heading">
          {{ t('Recent') }} <span class="text-amber-400">{{ t('Projects') }}</span>
        </h2>
        <p class="mt-4 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {{ t('A collection of digital executions where') }}
          <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3">
            {{ t('technical logic') }}
          </UiTextGradient>
          {{ t('meets') }}
          <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3">
            {{ t('seamless user experience.') }}
          </UiTextGradient>
          <br class="hidden md:block" />
          {{ t('Showcasing my adaptability to various tech stacks to design an') }}
          <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3">
            {{ t('efficient and high-quality final product.') }}
          </UiTextGradient>
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiAnimatedCard
          v-for="project in displayedProjects"
          :key="project._path"
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
            class="group relative block rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full"
          >
            <!-- Image (revealed on hover) -->
            <div class="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
              />
              <!-- Amber gradient overlay on top of image -->
              <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
              <!-- Title on image hover state -->
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <h3 class="text-lg font-heading text-white font-semibold">
                  {{ project.title }}
                </h3>
              </div>
            </div>

            <!-- Default Content (hidden on hover) -->
            <div class="relative z-20 p-6 flex flex-col h-full group-hover:opacity-0 group-hover:pointer-events-none transition-opacity duration-300">
              <!-- Icon -->
              <div
                class="w-16 h-16 mb-4 rounded-lg bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center transition-all duration-300"
              >
                <Icon name="lucide:folder-open" class="w-8 h-8 text-amber-400" />
              </div>

              <!-- Title -->
              <h3 class="text-xl font-heading font-semibold mb-2 text-foreground">
                {{ project.title }}
              </h3>

              <!-- Description -->
              <p class="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                {{ project.description }}
              </p>

              <!-- Tags / Stack -->
              <div class="flex flex-wrap gap-2 mt-auto">
                <span
                  v-for="tag in project.tags?.slice(0, 4)"
                  :key="tag"
                  class="px-2 py-1 text-xs rounded-full text-white font-mono transition-colors duration-300"
                  :class="getTagColor(tag)"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </UiAnimatedCard>

        <UiAnimatedCard
          v-for="index in placeholderProjectCards"
          :key="`project-placeholder-${index}`"
          :glow-color="'251, 191, 36'"
          :particle-count="5"
          :enable-particles="false"
          :enable-tilt="false"
          :enable-magnetism="false"
          :enable-border-glow="false"
          :click-effect="false"
        >
          <div class="h-full min-h-64 rounded-xl border border-dashed border-amber-400/40 bg-amber-400/5 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/15 border border-amber-400/30 mb-4">
              <Icon name="lucide:pen-square" class="w-6 h-6 text-amber-400" />
            </div>
            <p class="text-sm font-mono text-amber-300 leading-relaxed">
              {{ workInProgressText }}
            </p>
          </div>
        </UiAnimatedCard>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <UiAnimatedButton href="/portofolio" variant="outline">
          <template #default>{{ t('View All Projects') }}</template>
          <template #iconRight>
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </template>
        </UiAnimatedButton>
      </div>
    </div>
  </section>
</template>