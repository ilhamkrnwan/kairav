<template>
  <div class="relative">
    <div class="hidden sm:block absolute left-0 top-3 bottom-3">
      <div class="h-full w-0.5 rounded-full bg-zinc-300/80 dark:bg-zinc-200/85"></div>
    </div>
    <div class="space-y-10 sm:space-y-12">
      <slot />
    </div>
  </div>
</template>
