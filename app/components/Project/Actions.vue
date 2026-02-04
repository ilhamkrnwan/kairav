<script setup lang="ts">
const { t } = useI18n()

interface Props {
  demoUrl?: string
  githubUrl?: string
}

defineProps<Props>()
</script>

<template>
  <div v-if="demoUrl || githubUrl" class="max-w-4xl mx-auto px-6 lg:px-8 pb-16 text-center">
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <NuxtLink 
        v-if="demoUrl"
        :href="demoUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <UiStyleButton>
          {{ t('Live Preview') }}
        </UiStyleButton>
      </NuxtLink>
      
      <NuxtLink 
        v-if="githubUrl"
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        <UiStyleButton>
          <Icon name="lucide:github" class="w-4 h-4 mr-2" />
          GitHub
        </UiStyleButton>
      </NuxtLink>
    </div>
  </div>
</template>
