<script setup>
const { t } = useI18n()

// Dynamic SEO
useDynamicSeo({
  titleKey: 'seo.cv.title',
  descriptionKey: 'seo.cv.description'
})
</script>

<template>
  <div class="min-h-screen">

    <!-- ═══════════════════════════════════════
         HERO SECTION
    ════════════════════════════════════════ -->
    <section class="relative w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 overflow-hidden">
      <!-- Background decorative blobs -->
      <div class="absolute top-1/4 -left-32 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border/40 bg-background/60 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">{{ t('Ilham Kurniawan') }} · {{ t('Software Developer') }}</span>
        </div>

        <!-- Main Heading -->
        <h1 class="leading-[0.88] tracking-tight mb-8 animate-fade-in-up delay-100">
          <span class="section-title-filled block">{{ t('Curriculum') }}</span>
          <span class="section-title-outline text-foreground block">{{ t('Vitae') }}<span class="text-amber-400 !important">.</span></span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light">
          {{ t('A snapshot of my') }}
          <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3" class="font-medium">
            {{ t('skills, experience,') }}
          </UiTextGradient>
          {{ t('and') }}
          <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3" class="font-medium">
            {{ t('projects') }}
          </UiTextGradient>
          {{ t('that define my journey as a developer.') }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <NuxtLink
            to="https://drive.google.com/uc?id=1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO&export=download"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5"
          >
            <div class="absolute inset-0 z-0 overflow-hidden rounded-sm">
              <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
            </div>
            <span class="relative z-10 flex items-center gap-2">
              {{ t('Download CV') }}
            </span>
            <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
              <Icon name="lucide:download" class="w-4 h-4" />
            </span>
          </NuxtLink>
          <NuxtLink
            to="/"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
          >
            <span class="relative z-10 flex items-center gap-2">
              {{ t('Back to Home') }}
            </span>
            <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
              <Icon name="lucide:home" class="w-4 h-4" />
            </span>
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span class="text-xs text-muted-foreground font-mono">{{ t('scroll') }}</span>
        <Icon name="lucide:chevrons-down" class="w-4 h-4 text-amber-400/60" />
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         CV VIEWER SECTION
    ════════════════════════════════════════ -->
    <section id="cv-viewer" class="section py-20">
      <div class="container max-w-5xl mx-auto px-6 lg:px-8">

        <!-- Section label -->
        <div class="flex items-center gap-4 mb-10">
          <div class="h-px flex-1 bg-border/40" />
          <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest px-4">
            {{ t('Preview') }}
          </span>
          <div class="h-px flex-1 bg-border/40" />
        </div>

        <!-- CV Embed Container -->
        <div class="relative group/cv rounded-xl overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm shadow-2xl">
          <!-- Glow effect -->
          <div class="absolute -inset-0.5 bg-linear-to-br from-amber-400/20 via-transparent to-orange-500/10 rounded-xl opacity-0 group-hover/cv:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />

          <!-- Corner brackets -->
          <div class="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-amber-400/60 z-10" />
          <div class="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-amber-400/60 z-10" />
          <div class="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-amber-400/60 z-10" />
          <div class="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-amber-400/60 z-10" />

          <!-- Header bar -->
          <div class="relative z-10 flex items-center justify-between px-5 py-3 border-b border-border/40 bg-background/70 backdrop-blur-sm">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
              <span class="w-2.5 h-2.5 rounded-full bg-green-400/70" />
            </div>
            <span class="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              cv_ilham_kurniawan.pdf
            </span>
            <a
              href="https://drive.google.com/uc?id=1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO&export=download"
              class="inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-400 uppercase tracking-widest hover:text-amber-300 transition-colors duration-200"
            >
              <Icon name="lucide:download" class="w-3 h-3" />
              {{ t('Download') }}
            </a>
          </div>

          <!-- iFrame -->
          <iframe
            src="https://drive.google.com/file/d/1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO/preview"
            class="relative z-10 w-full h-[80vh] border-none"
            loading="lazy"
          />
        </div>

        <!-- Bottom CTA row -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 animate-fade-in-up">
          <NuxtLink
            to="https://drive.google.com/uc?id=1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO&export=download"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5"
          >
            <div class="absolute inset-0 z-0 overflow-hidden rounded-sm">
              <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
            </div>
            <span class="relative z-10 flex items-center gap-2">
              {{ t('Download CV') }}
            </span>
            <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
              <Icon name="lucide:download" class="w-4 h-4" />
            </span>
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
          >
            <span class="relative z-10 flex items-center gap-2">
              {{ t('See More About Me') }}
            </span>
            <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
              <Icon name="lucide:user" class="w-4 h-4" />
            </span>
          </NuxtLink>
        </div>

      </div>
    </section>

    <GetinTouch />
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }

.section-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}
</style>
