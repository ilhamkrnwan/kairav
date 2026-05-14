<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-6">
    <NuxtLink to="/" class="hover:text-amber-400 transition-colors">
      {{ t('Home') }}
    </NuxtLink>
    <Icon name="lucide:chevron-right" class="w-3 h-3" />
    <NuxtLink to="/portofolio" class="hover:text-amber-400 transition-colors">
      {{ t('Project') }}
    </NuxtLink>
    <Icon name="lucide:chevron-right" class="w-3 h-3" />
    <span class="text-foreground">{{ t('View Details') }}</span>
  </div>
</template>
