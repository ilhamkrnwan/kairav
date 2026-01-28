<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-3 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
    :class="[
      variant === 'primary' 
        ? 'bg-linear-to-b from-amber-300 to-amber-500 text-amber-950 shadow-lg shadow-amber-500/25 border border-amber-400/50 hover:shadow-amber-500/50 hover:from-amber-400 hover:to-amber-500' 
        : 'bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50 hover:border-amber-400/50 hover:text-amber-600 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-zinc-800 dark:hover:text-amber-400'
    ]"
  >
    <!-- Shine Effect Container - Primary Only -->
    <div v-if="variant === 'primary'" class="absolute inset-0 z-0 overflow-hidden rounded-xl">
      <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
    </div>
    
    <!-- Background Gradient for Outline Hover -->
    <div
      v-if="variant === 'outline'"
      class="absolute inset-0 -z-10 bg-linear-to-r from-amber-500/10 to-orange-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    ></div>

    <!-- Icon Left -->
    <span 
      v-if="$slots.iconLeft" 
      class="mr-2 transition-transform duration-300 group-hover:-translate-x-1 relative z-10"
    >
      <slot name="iconLeft" />
    </span>

    <!-- Text Content -->
    <span class="relative z-10 flex items-center gap-2 font-bold tracking-wide">
      <slot />
    </span>

    <!-- Icon Right -->
    <span 
      v-if="$slots.iconRight" 
      class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
    >
      <slot name="iconRight" />
    </span>
  </component>
</template>

<script setup lang="ts">
interface Props {
  href?: string;
  variant?: 'primary' | 'outline';
}

withDefaults(defineProps<Props>(), {
  href: undefined,
  variant: 'primary',
});
</script>

<style scoped>
@keyframes shine {
  100% {
    left: 125%;
  }
}

.animate-shine {
  animation: shine 1s;
}
</style>
