<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()

useDynamicSeo({
  titleKey: 'seo.home.title',
  descriptionKey: 'seo.home.description'
})

// JSON-LD Structured Data for homepage
usePersonSchema()
useWebSiteSchema()


// === Image Reveal Logic ===
const heroImageRef = ref(null)
const isHovered = ref(false)
const mousePos = reactive({ x: 0, y: 0 })
const smoothMousePos = reactive({ x: 0, y: 0 })
let animationFrame = null

const updateSmoothPosition = () => {
  smoothMousePos.x += (mousePos.x - smoothMousePos.x) * 0.15
  smoothMousePos.y += (mousePos.y - smoothMousePos.y) * 0.15
  animationFrame = requestAnimationFrame(updateSmoothPosition)
}

onMounted(() => {
  animationFrame = requestAnimationFrame(updateSmoothPosition)
})

onUnmounted(() => {
  if (animationFrame) cancelAnimationFrame(animationFrame)
})

const handleMouseMove = (event) => {
  if (!heroImageRef.value) return
  const rect = heroImageRef.value.getBoundingClientRect()
  mousePos.x = event.clientX - rect.left
  mousePos.y = event.clientY - rect.top
}

const maskStyle = computed(() => {
  const radius = isHovered.value ? 150 : 0
  return {
    opacity: isHovered.value ? 1 : 0,
    maskImage: `radial-gradient(${radius}px circle at ${smoothMousePos.x}px ${smoothMousePos.y}px, black 0%, transparent 100%)`,
    WebkitMaskImage: `radial-gradient(${radius}px circle at ${smoothMousePos.x}px ${smoothMousePos.y}px, black 0%, transparent 100%)`
  }
})
</script>

<template>
  <div class="min-h-screen text-gray-800 dark:text-white w-full overflow-hidden">
    <!-- Hero Section -->
    <section class="section w-full py-6 px-2 lg:pt-20">
      <div class="container mx-auto">
        <div class="max-w-6xl mx-auto flex flex-col justify-center p-6 lg:flex-row lg:justify-between lg:items-center">
        <!-- Hero Image Section -->
        <div class="relative flex items-center justify-center p-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 order-1 lg:order-2">
          <!-- Background Blob -->
          <div
            aria-hidden="true"
            class="absolute mx-auto inset-0 items-center justify-center p-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 animate-float pointer-events-none"
          >
            <div class="hero-blob hero-blob-main max-w-md h-full mx-auto object-contain object-center" />
          </div>

          <!-- Decorative Blobs - Left -->
          <span aria-hidden="true" class="absolute left-0 top-0 w-24 z-10 animate-float pointer-events-none">
            <span class="hero-blob hero-blob-left block w-full aspect-square" />
          </span>
          <span aria-hidden="true" class="absolute animate-float2 left-0 bottom-0 w-24 z-10 pointer-events-none">
            <span class="hero-blob hero-blob-lb block w-full aspect-square" />
          </span>

          <!-- Decorative Blobs - Right -->
          <span aria-hidden="true" class="absolute animate-float2 right-0 bottom-0 w-24 z-10 pointer-events-none">
            <span class="hero-blob hero-blob-right block w-full aspect-square" />
            <span class="hero-blob hero-blob-lb2 block w-full aspect-square" />
          </span>
          <span aria-hidden="true" class="absolute animate-float2 right-0 top-0 w-24 z-10 pointer-events-none">
            <span class="hero-blob hero-blob-rb block w-full aspect-square" />
          </span>

          <!-- Main Hero Image & Interactive Frame -->
          <div
            ref="heroImageRef"
            class="relative z-10 hero-img-wrap aspect-4/5 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 shrink-0 cursor-crosshair group"
            @mousemove="handleMouseMove"
            @mouseenter="isHovered = true"
            @mouseleave="isHovered = false"
          >
            <!-- Hero Orb Background -->
            <div class="hero-orb"></div>

            <!-- Layer 1: Default Image (ilham-hero.avif) -->
            <div class="hero-img-inner absolute inset-0 rounded-lg overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
              <NuxtImg
                src="/ilham-hero.avif"
                alt="Ilham Kurniawan"
                width="640"
                height="640"
                sizes="288px sm:320px lg:384px xl:448px 2xl:512px"
                format="webp"
                preload
                loading="eager"
                fetchpriority="high"
                decoding="async"
                class="w-full h-full object-cover object-top filter sepia-[0.15] contrast-105 brightness-95 dark:brightness-90"
              />
              <div class="absolute inset-0 hero-overlay pointer-events-none"></div>
            </div>

            <!-- Layer 2: Reveal Image (ilham-hero-2.avif) -->
            <div
              class="hero-img-inner absolute inset-0 rounded-lg overflow-hidden transition-all duration-300 ease-out pointer-events-none z-10 border border-amber-500/30 group-hover:scale-[1.02]"
              :style="maskStyle"
            >
              <NuxtImg
                src="/ilham-hero-2.avif"
                alt="Ilham Kurniawan Reveal"
                width="640"
                height="640"
                sizes="288px sm:320px lg:384px xl:448px 2xl:512px"
                format="webp"
                preload
                loading="eager"
                fetchpriority="high"
                class="w-full h-full object-cover object-top"
              />
            </div>

            <!-- Corner brackets -->
            <div class="cbr tl border-amber-500/80 dark:border-amber-400"></div>
            <div class="cbr tr border-amber-500/80 dark:border-amber-400"></div>
            <div class="cbr bl border-amber-500/80 dark:border-amber-400"></div>
            <div class="cbr br border-amber-500/80 dark:border-amber-400"></div>

            <!-- Floating stat chips -->
            <div class="hero-chip c1 bg-white/95 dark:bg-[#141009]/95 border-amber-500/30 backdrop-blur-md shadow-lg hidden md:block">
              <div class="chip-num text-amber-600 dark:text-amber-400 font-mono">50+</div>
              <div class="chip-lbl text-gray-600 dark:text-gray-400 font-medium">Projects Done</div>
            </div>
            <div class="hero-chip c2 bg-white/95 dark:bg-[#141009]/95 border-amber-500/30 backdrop-blur-md shadow-lg hidden md:block">
              <div class="chip-num text-amber-600 dark:text-amber-400 font-mono">3+</div>
              <div class="chip-lbl text-gray-600 dark:text-gray-400 font-medium">Years Exp.</div>
            </div>
          </div>
        </div>

        <!-- Text Content Section -->
        <div class="flex flex-col justify-center lg:p-6 p-0 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left order-2 lg:order-1 z-10 text-neutral-dark dark:text-accent-dark">
          <!-- Greeting -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
            <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border/40 bg-background/60 backdrop-blur-sm text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <span class="relative flex h-1.5 w-1.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
              </span>
              {{ t('Hello my name is Ilham Kurniawan') }}
            </span>
          </div>

          <!-- Main Heading -->
          <h1 class="leading-[0.88] tracking-tight mb-4">
            <span class="section-title-filled block">{{ t('Fullstack') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Developer') }}<span class="text-amber-400 !important">.</span></span>
          </h1>

          <!-- Sub Roles -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 mb-6">
            <span class="text-sm font-light text-muted-foreground tracking-wide">{{ t('IT Student') }}</span>
            <span class="text-border/40 text-sm">·</span>
            <span class="text-sm font-light text-muted-foreground tracking-wide">{{ t('Web3 & AI Enthusiast') }}</span>
          </div>

          <!-- Description -->
          <p class="lg:text-lg text-base text-muted-foreground mb-8 font-light">
            {{ t('Bridging the gap between') }}
            <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3" class="font-medium">
              {{ t('complex ideas') }}
            </UiTextGradient>
            {{ t('and') }}
            <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3" class="font-medium">
              {{ t('seamless digital experiences.') }}
            </UiTextGradient>
            <br/><br/>
            {{ t('Agnostic in tools, precise in execution.') }}
            {{ t('Designed for users,') }}
            <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3" class="font-medium">
              {{ t('built for impact.') }}
            </UiTextGradient>
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row space-y-4 sm:space-y-4 md:space-y-4 lg:space-y-0 lg:space-x-4">
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
                <Icon name="lucide:download" class="w-4 h-4" />
              </span>
            </NuxtLink>

            <NuxtLink
              to="/about"
              class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
            >
              <span class="relative z-10 flex items-center gap-2">
                {{ t('See More') }}
              </span>
              <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- Copyright Footer -->
        <div class="absolute top-20 left-4 md:left-20 xl:left-20 lg:left-20 text-sm text-muted-foreground font-mono">
          {{ new Date().getFullYear() }} | Copyright (c) KAIRAV
        </div>
        </div>
      </div>
    </section>

    <LazyAppAboutFeatures hydrate-on-visible />
    <LazyAppAboutSkills hydrate-on-visible />
    <LazyAppRecentProjects hydrate-on-visible />
    <LazyAppAboutQuotes hydrate-on-visible />
    <LazyGetinTouch hydrate-on-visible />

    <!-- SEO: Explicit intro for search engines and AI crawlers (visually hidden but present in DOM) -->
    <section class="sr-only" aria-label="About Ilham Kurniawan">
      <p>
        <strong>Ilham Kurniawan</strong> adalah seorang <strong>Fullstack Developer</strong> berbasis di <strong>Indonesia</strong>,
        spesialisasi dalam <strong>Nuxt.js</strong>, <strong>Vue.js</strong>, <strong>Laravel</strong>, <strong>Flutter</strong>, dan <strong>UI/UX Design</strong>.
        Dengan <strong>3+ tahun pengalaman</strong> dan <strong>50+ proyek</strong> yang berhasil diselesaikan, Ilham membangun
        <strong>web application</strong>, <strong>mobile app</strong>, <strong>dashboard admin</strong>, dan <strong>sistem digital</strong>
        yang scalable untuk klien di berbagai industri termasuk agritech, edukasi, komunitas, dan e-commerce.
        Saat ini menempuh S1 Informatika di Universitas Nahdlatul Ulama Yogyakarta (UNUYO) sambil aktif bekerja sebagai
        developer di Sekeco dan Jurutani. Terbuka untuk kolaborasi freelance dan posisi full-time.
      </p>
    </section>
  </div>
</template>

<style scoped>
.hero-blob {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.hero-blob-main {
  background-image: url('/blob-hero.svg');
}

.hero-blob-left {
  background-image: url('/blob-left.svg');
}

.hero-blob-lb {
  background-image: url('/blob-lb.svg');
}

.hero-blob-right {
  background-image: url('/blob-right.svg');
}

.hero-blob-lb2 {
  background-image: url('/blob-lb2.svg');
  margin-top: -100%;
}

.hero-blob-rb {
  background-image: url('/blob-rb.svg');
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float2 {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float2 {
  animation: float2 5s ease-in-out infinite;
}

/* === Hero Frame & Masking Styles === */
.hero-overlay {
  background: linear-gradient(to bottom, transparent 45%, rgba(7,5,3,0.65) 100%);
}

.cbr {
  position: absolute; width: 22px; height: 22px;
  border-style: solid; z-index: 20;
}
.cbr.tl { top: -7px; left: -7px; border-width: 2px 0 0 2px; }
.cbr.tr { top: -7px; right: -7px; border-width: 2px 2px 0 0; }
.cbr.bl { bottom: -7px; left: -7px; border-width: 0 0 2px 2px; }
.cbr.br { bottom: -7px; right: -7px; border-width: 0 2px 2px 0; }

.hero-chip {
  position: absolute;
  border-width: 1px;
  border-style: solid;
  border-radius: 6px;
  padding: 14px 18px;
  z-index: 20;
}
.hero-chip.c1 { bottom: 32px; left: -36px; }
.hero-chip.c2 { top: 48px; right: -36px; }
.chip-num {
  font-size: 26px; font-weight: 800; line-height: 1;
}
.chip-lbl { font-size: 11px; margin-top: 4px; }

.hero-orb {
  position: absolute; width: 280px; height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  pointer-events: none;
  animation: orb-pulse 4s ease-in-out infinite;
  z-index: 0;
}

@keyframes orb-pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  50%       { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

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
