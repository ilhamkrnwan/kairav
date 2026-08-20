<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    format="avif"
    loading="lazy"
    decoding="async"
    class="rounded-sm border border-border/40 my-6 max-w-full h-auto shadow-md"
  />
</template>
