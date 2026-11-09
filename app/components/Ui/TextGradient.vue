<script setup lang="ts">
// Inline emphasis in the sticker voice: a lemon highlighter stroke behind the words,
// swept in left to right when it scrolls into view (see useScrollReveal).
// colors / animationSpeed are accepted for call-site compatibility and ignored.
defineProps<{
  colors?: string[]
  animationSpeed?: number
}>()
</script>

<template>
  <span data-highlight class="highlighter font-bold text-highlighted">
    <slot />
  </span>
</template>
