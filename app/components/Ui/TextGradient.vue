<script setup lang="ts">
// Inline emphasis uses the shared cobalt marker.
// colors / animationSpeed are accepted for call-site compatibility and ignored.
defineProps<{
  colors?: string[]
  animationSpeed?: number
}>()
</script>

<template>
  <span class="font-semibold text-highlighted">
    <slot />
  </span>
</template>
