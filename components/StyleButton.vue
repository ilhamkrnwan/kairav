<template>
  <button
    class="relative h-[50px] overflow-hidden border border-primary-dark bg-white dark:bg-black px-8 py-3 text-lg font-semibold rounded text-primary-dark shadow-2xl transition-all
           before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0
           before:bg-gradient-to-r before:from-red-500 before:to-yellow-500
           before:transition-all before:duration-500
           hover:shadow-primary-dark hover:before:left-0 hover:before:w-full group"
  >
    <span class="relative z-10 font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-800 group-hover:text-white">
      <slot />
    </span>
  </button>
</template>

<script setup>
// No sound, no refs, no lifecycle hooks.
// Pure button. Pure vibes.
</script>
