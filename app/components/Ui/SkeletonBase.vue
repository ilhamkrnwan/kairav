<script setup lang="ts">
interface Props {
  class?: string
}

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'relative overflow-hidden rounded-md bg-muted/60 dark:bg-zinc-800/60 animate-pulse',
      $props.class
    ]"
  >
    <div
      class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/10 dark:via-white/5 to-transparent pointer-events-none"
    />
  </div>
</template>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
