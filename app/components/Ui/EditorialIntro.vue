<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <section class="site-frame editorial-intro">
    <h1 class="editorial-title">{{ title }}</h1>
    <div class="editorial-intro-copy">
      <p class="max-w-[54ch] text-muted"><slot /></p>
      <div v-if="$slots.actions" class="mt-5 flex flex-wrap gap-2.5">
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>
