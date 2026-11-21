<script setup lang="ts">
// Detail-page hero. With an image it becomes a full-bleed background (copy sits on a scrim);
// without one the copy sits beside the `fallback` slot (the mascot).
defineProps<{ image?: string, panoramic?: boolean }>()
const slots = useSlots()
</script>

<template>
  <section class="detail-hero" :class="{ 'has-image': image, 'is-panoramic': image && panoramic }">
    <template v-if="image">
      <NuxtImg
        :src="image"
        alt=""
        format="avif"
        fetchpriority="high"
        sizes="sm:900px lg:100vw xl:100vw 2xl:100vw"
        class="detail-hero-image"
      />
      <div class="detail-hero-scrim" aria-hidden="true" />
    </template>

    <div class="site-frame detail-masthead">
      <slot />
      <slot v-if="!image" name="fallback" />
    </div>

    <div v-if="image && slots.action" class="detail-hero-action">
      <slot name="action" />
    </div>
  </section>
</template>
