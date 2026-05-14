<script setup>
const { t } = useI18n()
</script>

<template>
  <section class="w-full flex flex-col items-center justify-center py-32 px-6 md:px-12 lg:px-20 text-gray-800 dark:text-white">
    <div class="max-w-4xl mx-auto text-center relative z-10">
      <div class="absolute -top-12 -left-12 opacity-10 pointer-events-none">
        <Icon name="lucide:message-circle" class="w-32 h-32 text-amber-400" />
      </div>
      
      <p class="text-sm font-mono tracking-widest uppercase text-muted-foreground mb-4">
        {{ t('Interested in collaborating?') }}
      </p>
      
      <a href="/cv" class="group relative inline-flex flex-col items-center justify-center">
        <h2 class="font-heading text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-foreground hover:text-amber-400 transition-colors duration-300 uppercase">
          {{ t('Get In Touch') }}
        </h2>
        <div class="w-full h-1 bg-amber-400 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </a>
      
      <footer class="mt-20 text-xs font-mono tracking-widest text-muted-foreground uppercase">
        {{ new Date().getFullYear() }} | Copyright (c) KAIRAV
      </footer>
    </div>
  </section>
</template>
