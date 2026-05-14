<template>
  <button
    class="relative h-[50px] overflow-hidden border border-border/40 bg-background/50 backdrop-blur-sm px-8 py-3 text-xs font-mono tracking-widest uppercase rounded-sm text-foreground transition-all duration-500
           before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0
           before:bg-amber-400
           before:transition-all before:duration-500
           hover:before:w-full group hover:border-amber-400"
  >
    <span class="relative z-10 font-bold transition-colors duration-500 group-hover:text-black">
      <slot />
    </span>
  </button>
</template>

<script setup>
// Minimalist Editorial Style Button
</script>
