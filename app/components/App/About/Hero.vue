<script setup lang="ts">
const { t } = useI18n()

const careerBadges = computed(() => [
  {
    icon: 'lucide:code-2',
    label: t('Fullstack Developer'),
    sub: t('2021 - Present'),
    color: '#FBBF24',
    delay: '0ms'
  },
  {
    icon: 'lucide:graduation-cap',
    label: t('IT Student'),
    sub: 'UNUYO · 2023',
    color: '#22D3EE',
    delay: '60ms'
  },
  {
    icon: 'lucide:building-2',
    label: t('Intern at Sekeco'),
    sub: 'Jan 2025 →',
    color: '#A78BFA',
    delay: '120ms'
  },
  {
    icon: 'lucide:leaf',
    label: t('Freelance Dev'),
    sub: 'Jurutani · 2025',
    color: '#34D399',
    delay: '180ms'
  },
])

const stats = computed(() => [
  { value: '3+', label: t('Years Coding') },
  { value: '50+', label: t('Projects Built') },
  { value: '2', label: t('Companies') },
])
</script>

<template>
  <section class="hero-section relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-20">

    <!-- Subtle Grid Background -->
    <div class="grid-bg absolute inset-0 pointer-events-none" />

    <!-- Top ambient glow -->
    <div class="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
    <div class="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-cyan-400/4 rounded-full blur-3xl pointer-events-none" />

    <div class="max-w-6xl mx-auto w-full py-28 lg:py-32 relative z-10">

      <!-- ── Row 1: Status bar ── -->
      <div class="flex flex-wrap items-center gap-4 mb-10 entry-1">
        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border/40 bg-background/50 backdrop-blur-md text-xs font-mono text-muted-foreground uppercase tracking-widest shadow-lg shadow-black/5">
          <span class="relative flex h-1.5 w-1.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          {{ t('Hello my name is Ilham Kurniawan') }}
        </span>
        <span class="text-xs font-mono text-muted-foreground/40 uppercase tracking-widest hidden sm:block">— Est. 2021</span>
      </div>

      <!-- ── Row 2: Giant Typography ── -->
      <div class="mb-8 entry-2">
        <h1 class="leading-[0.88] tracking-tight">
          <span class="hero-title-filled block">
            {{ t('Career') }}
          </span>
          <span class="hero-title-outline text-foreground block">
            {{ t('Journey') }}<span class="hero-dot">.</span>
          </span>
        </h1>
      </div>

      <!-- ── Row 3: Roles inline ── -->
      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mb-14 entry-3">
        <span class="text-sm md:text-base font-light text-muted-foreground tracking-wide">{{ t('Fullstack Developer') }}</span>
        <span class="text-border/40 text-sm">·</span>
        <span class="text-sm md:text-base font-light text-muted-foreground tracking-wide">{{ t('IT Student') }}</span>
        <span class="text-border/40 text-sm">·</span>
        <span class="text-sm md:text-base font-light text-muted-foreground tracking-wide">{{ t('Web3 & AI Enthusiast') }}</span>
      </div>

      <!-- ── Row 4: Main Grid ── -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end relative z-10">

        <!-- Left: Career Badge Grid 2×2 -->
        <div class="grid grid-cols-2 gap-3 entry-4">
          <UiAnimatedCard
            v-for="badge in careerBadges"
            :key="badge.label"
            :glow-color="'251, 191, 36'"
            :particle-count="3"
            :enable-particles="false"
            :enable-tilt="false"
            :enable-magnetism="false"
            :enable-border-glow="false"
            :click-effect="false"
            class="badge-card-container"
            :style="`animation-delay: ${badge.delay}; --accent: ${badge.color}`"
          >
            <div class="group relative p-4 rounded-sm bg-background/40 backdrop-blur-md border border-border/30 shadow-lg h-full overflow-hidden transition-all duration-300 hover:bg-background/60">
              <!-- Accent top line -->
              <div class="absolute top-0 left-0 right-0 h-px rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300" :style="`background: linear-gradient(to right, ${badge.color}, transparent);`" />

              <div class="flex items-start gap-3 relative z-10">
                <div class="mt-0.5 flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center bg-background border border-border/40 group-hover:border-amber-400/40 transition-colors duration-300">
                  <Icon :name="badge.icon" class="w-4 h-4" :style="`color: ${badge.color}`" />
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-foreground leading-tight">{{ badge.label }}</p>
                  <p class="text-[10px] font-mono text-muted-foreground mt-0.5 opacity-70">{{ badge.sub }}</p>
                </div>
              </div>
            </div>
          </UiAnimatedCard>
        </div>

        <!-- Right: Stats + CTA -->
        <div class="entry-5">

          <!-- Stats row -->
          <UiAnimatedCard
            :glow-color="'251, 191, 36'"
            :particle-count="0"
            :enable-particles="false"
            :enable-tilt="false"
            :enable-magnetism="false"
            :enable-border-glow="false"
            :click-effect="false"
            class="mb-10"
          >
            <div class="grid grid-cols-3 gap-0 rounded-sm overflow-hidden bg-background/40 backdrop-blur-md border border-border/30 shadow-lg relative group">
              <div
                v-for="(stat, i) in stats"
                :key="stat.label"
                class="relative flex flex-col items-center justify-center py-5 px-3 z-10 transition-colors duration-300 hover:bg-white/5"
                :class="i < stats.length - 1 ? 'border-r border-border/20' : ''"
              >
                <p class="font-heading font-black leading-none mb-1 text-foreground text-2xl lg:text-3xl relative z-10">{{ stat.value }}</p>
                <span class="text-[10px] font-mono text-muted-foreground uppercase tracking-widest opacity-70 text-center relative z-10">{{ stat.label }}</span>
              </div>
            </div>
          </UiAnimatedCard>

          <!-- Tagline -->
          <p class="text-sm text-muted-foreground leading-relaxed mb-8 font-light">
            {{ t('Agnostic in tools, precise in execution.') }}
            <br />
            {{ t('Designed for users,') }}
            <span class="text-foreground font-medium">{{ t('built for impact.') }}</span>
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              to="/cv"
              class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5"
            >
              <div class="absolute inset-0 z-0 overflow-hidden rounded-sm">
                <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
              </div>
              <span class="relative z-10 flex items-center gap-2">
                {{ t('Download CV') }}
              </span>
              <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </span>
            </NuxtLink>
            <NuxtLink
              to="/portofolio"
              class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
            >
              <span class="relative z-10 flex items-center gap-2">
                {{ t('View works') }}
              </span>
              <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ── Bottom: Scroll indicator ── -->
      <div class="hidden md:flex items-center gap-3 mt-16 entry-6">
        <div class="scroll-line" />
        <span class="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em]">{{ t('scroll') }}</span>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Grid Background ── */
.grid-bg {
  background-image:
    linear-gradient(to right, hsl(var(--border) / 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, hsl(var(--border) / 0.07) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
}

/* ── Giant Typography ── */
.hero-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(4.5rem, 13vw, 10rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.hero-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(4.5rem, 13vw, 10rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}

.hero-dot {
  color: #FBBF24 !important;
  -webkit-text-fill-color: #FBBF24 !important;
  -webkit-text-stroke: 0 !important;
  opacity: 1 !important;
}

/* ── Scroll Indicator ── */
.scroll-line {
  width: 40px;
  height: 1px;
  background: linear-gradient(to right, hsl(var(--foreground) / 0.2), transparent);
}

/* ── Entry Animations ── */
.entry-1 { animation: entry 0.6s ease-out 0ms both; }
.entry-2 { animation: entry 0.6s ease-out 80ms both; }
.entry-3 { animation: entry 0.6s ease-out 160ms both; }
.entry-4 { animation: entry 0.6s ease-out 240ms both; }
.entry-5 { animation: entry 0.6s ease-out 320ms both; }
.entry-6 { animation: entry 0.6s ease-out 500ms both; }

@keyframes entry {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

</style>