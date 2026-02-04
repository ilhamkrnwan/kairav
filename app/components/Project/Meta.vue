<script setup lang="ts">
const { t } = useI18n()

interface Props {
  year?: string
  role?: string
  duration?: string
  technologies?: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 md:px-24 lg:px-32">
    <!-- Key Info -->
    <div v-if="year || role || duration" class="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-gray-600 dark:text-gray-400">
      <span v-if="year"><strong>{{ t('Year') }}:</strong> {{ year }}</span>
      <span v-if="role"><strong>{{ t('Role') }}:</strong> {{ role }}</span>
      <span v-if="duration"><strong>{{ t('Duration') }}:</strong> {{ duration }}</span>
    </div>
    
    <!-- Technologies -->
    <div v-if="technologies && technologies.length" class="flex flex-wrap justify-center gap-2 mt-4 max-w-3xl mx-auto">
      <span
        v-for="tech in technologies"
        :key="tech"
        class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium"
      >
        {{ tech }}
      </span>
    </div>
  </div>
</template>
