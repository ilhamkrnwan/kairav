<script setup lang="ts">
defineProps<{
  to: string
  title?: string
  description?: string
  image?: string
}>()
</script>

<template>
  <ULink :to="to" raw class="group flex h-full flex-col gap-3">
    <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted transition-colors duration-300 group-hover:border-primary/50">
      <NuxtImg
        :src="image || '/placeholder.avif'"
        alt=""
        width="600"
        height="337"
        format="avif"
        loading="lazy"
        decoding="async"
        class="size-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-105"
      />
    </div>
    <div>
      <h3 class="wrap-break-word font-heading text-sm leading-snug text-highlighted transition-colors duration-300 group-hover:text-primary sm:text-lg">
        {{ title }}
      </h3>
      <p v-if="description" class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">
        {{ description }}
      </p>
    </div>
  </ULink>
</template>
