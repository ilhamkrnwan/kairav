<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
    <NuxtLink to="/" class="hover:text-amber-400 transition-colors">
      {{ t('Home') }}
    </NuxtLink>
    <Icon name="lucide:chevron-right" class="w-4 h-4" />
    <NuxtLink to="/portofolio" class="hover:text-amber-400 transition-colors">
      {{ t('Project') }}
    </NuxtLink>
    <Icon name="lucide:chevron-right" class="w-4 h-4" />
    <span class="text-foreground">{{ t('View Details') }}</span>
  </div>
</template>
