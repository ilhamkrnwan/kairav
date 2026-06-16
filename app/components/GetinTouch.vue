<script setup>
const { t } = useI18n()
</script>

<template>
  <section class="w-full flex flex-col items-center justify-center py-32 px-6 md:px-12 lg:px-20 text-gray-800 dark:text-white">
    <div class="max-w-4xl mx-auto text-center relative z-10 w-full">
      <div class="absolute -top-12 -left-12 opacity-10 pointer-events-none">
        <Icon name="lucide:message-circle" class="w-32 h-32 text-amber-400" />
      </div>
      
      <NuxtLink
        to="/contact"
        class="group relative mx-auto flex min-h-[260px] w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-sm border border-border/40 bg-background/45 px-6 py-12 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/60 hover:bg-amber-400/5 hover:shadow-[0_24px_80px_rgba(251,191,36,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:px-12"
      >
        <div class="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div class="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-amber-400/80 to-transparent" />
          <div class="absolute inset-x-8 bottom-0 h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent" />
        </div>

        <span class="relative mb-5 inline-flex items-center gap-2 rounded-sm border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-amber-500 dark:text-amber-300">
          <Icon name="lucide:sparkles" class="h-3.5 w-3.5" />
          {{ t('Interested in collaborating?') }}
        </span>

        <h2 class="relative font-heading text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-foreground transition-colors duration-300 uppercase group-hover:text-amber-400">
          {{ t('Get In Touch') }}
        </h2>

        <div class="relative mt-8 inline-flex items-center justify-center gap-2 rounded-sm bg-amber-400 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[0_0_18px_rgba(251,191,36,0.35)] transition-all duration-300 group-hover:bg-amber-300 group-hover:shadow-[0_0_28px_rgba(251,191,36,0.5)]">
          <span>{{ t('Start a Project') }}</span>
          <Icon name="lucide:arrow-right" class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </NuxtLink>
      
      <footer class="mt-16 text-xs font-mono tracking-widest text-muted-foreground uppercase">
        {{ new Date().getFullYear() }} | Copyright (c) KAIRAV
      </footer>
    </div>
  </section>
</template>
