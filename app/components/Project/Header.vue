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
      <h1 class="leading-[0.88] tracking-tight mb-8">
        <span class="section-title-filled block">{{ title }}</span>
      </h1>
      
      <!-- Description -->
      <p v-if="description" class="mt-4 text-base font-light text-muted-foreground md:text-lg">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.section-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}
</style>
