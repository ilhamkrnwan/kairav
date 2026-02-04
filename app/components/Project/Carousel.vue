<script setup lang="ts">
interface Props {
  images: string[]
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
    <UiCarousel :images="images" />
  </div>
</template>
