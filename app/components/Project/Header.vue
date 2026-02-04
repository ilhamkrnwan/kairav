<script setup lang="ts">
const { t } = useI18n()

interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="px-4 py-16 mx-auto md:px-24 lg:px-32 lg:py-20">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Breadcrumb -->
      <ProjectBreadcrumb />
      
      <!-- Title -->
      <UiTextGradient class="text-4xl md:text-5xl lg:text-6xl">
        {{ title }}
      </UiTextGradient>
      
      <!-- Description -->
      <p v-if="description" class="mt-4 text-base text-gray-700 dark:text-gray-300 md:text-lg">
        {{ description }}
      </p>
    </div>
  </div>
</template>
