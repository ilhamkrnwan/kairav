<script setup lang="ts">
const { t } = useI18n()

const skillGroups = [
  { label: 'skills.frontend', items: ['Vue.js', 'Nuxt.js', 'Tailwind CSS'] },
  { label: 'skills.backend', items: ['Laravel', 'PostgreSQL', 'Supabase'] },
  { label: 'skills.mobile', items: ['Flutter', 'Capacitor'] },
  { label: 'skills.supporting', items: ['WordPress', 'Git'] }
]
</script>

<template>
  <section id="skills" class="site-frame editorial-section editorial-split">
      <div>
        <h2 class="editorial-title skills-title mb-4">{{ t('skills.title') }}</h2>
        <p class="max-w-sm text-sm leading-relaxed text-muted">{{ t('skills.description') }}</p>
      </div>
      <dl class="divide-y divide-default border-y border-default">
        <div v-for="group in skillGroups" :key="group.label" class="grid gap-3 py-5 sm:grid-cols-3 sm:gap-6 sm:py-6">
          <dt class="text-sm font-semibold text-highlighted">{{ t(group.label) }}</dt>
          <dd class="sm:col-span-2">
            <ul class="flex flex-wrap gap-x-5 gap-y-2" :aria-label="t(group.label)">
              <li v-for="item in group.items" :key="item" class="text-sm text-muted">{{ item }}</li>
            </ul>
          </dd>
        </div>
      </dl>
  </section>
</template>
