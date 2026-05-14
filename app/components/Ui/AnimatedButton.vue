<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs transition-all duration-300"
    :class="[
      variant === 'primary' 
        ? 'bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5' 
        : 'bg-background/50 backdrop-blur-sm text-foreground border border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5'
    ]"
  >
    <!-- Shine Effect Container - Primary Only -->
    <div v-if="variant === 'primary'" class="absolute inset-0 z-0 overflow-hidden rounded-sm">
      <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
    </div>
    
    <!-- Icon Left -->
    <span 
      v-if="$slots.iconLeft" 
      class="mr-2 transition-transform duration-300 group-hover:-translate-x-1 relative z-10"
    >
      <slot name="iconLeft" />
    </span>

    <!-- Text Content -->
    <span class="relative z-10 flex items-center gap-2 font-bold">
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
