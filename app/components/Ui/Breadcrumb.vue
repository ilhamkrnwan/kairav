<script setup lang="ts">
const { t } = useI18n()

export interface BreadcrumbItem {
  label: string
  to?: string
  icon?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="inline-flex items-center px-4 py-2 rounded-sm bg-background/50 backdrop-blur-md border border-border/40 shadow-sm">
    <ol class="flex items-center flex-wrap gap-1.5 sm:gap-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
      <!-- Home item -->
      <li class="inline-flex items-center">
        <NuxtLink 
          to="/" 
          class="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          :aria-label="t('Home')"
        >
          <Icon name="lucide:home" class="w-3.5 h-3.5 text-amber-400/90" />
          <span class="hidden sm:inline">{{ t('Home') }}</span>
        </NuxtLink>
      </li>

      <!-- Dynamic Items -->
      <template v-for="(item, index) in items" :key="index">
        <li class="flex items-center text-border">
          <Icon name="lucide:chevron-right" class="w-3 h-3" />
        </li>
        <li class="inline-flex items-center">
          <NuxtLink 
            v-if="item.to && index < items.length - 1" 
            :to="item.to" 
            class="hover:text-amber-400 transition-colors"
          >
            {{ item.label }}
          </NuxtLink>
          <span 
            v-else 
            class="text-amber-400 font-semibold line-clamp-1 max-w-[180px] sm:max-w-[300px] md:max-w-[450px]"
            :title="item.label"
          >
            {{ item.label }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
