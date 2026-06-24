<script setup>
const { t } = useI18n()

// Dynamic SEO
useDynamicSeo({
  titleKey: 'seo.gallery.title',
  descriptionKey: 'seo.gallery.description'
})

// Gallery items configuration
const galleryItems = computed(() => [
  {
    title: t('Portrait Photography'),
    description: t('Capturing emotions and personality in every frame'),
    image: '/gallery/1.avif',
    icon: 'lucide:user',
    badge: t('Featured'),
    class: 'md:col-span-2 md:row-span-2',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Urban Exploration'),
    description: t('Discovering beauty in city landscapes'),
    image: '/gallery/2.avif',
    icon: 'lucide:building-2',
    badge: t('Recent'),
    class: 'aspect-square',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Nature Vibes'),
    description: t('Finding peace in natural scenery'),
    image: '/gallery/3.avif',
    icon: 'lucide:trees',
    class: 'aspect-square',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Street Photography'),
    description: t('Life moments in everyday scenes'),
    image: '/gallery/4.avif',
    icon: 'lucide:camera',
    class: 'aspect-square',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Professional Shoots'),
    description: t('Commercial and editorial photography'),
    image: '/gallery/5.avif',
    icon: 'lucide:briefcase',
    badge: t('Portfolio'),
    class: 'md:col-span-2 aspect-video',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Creative Experiments'),
    description: t('Pushing boundaries with new techniques'),
    image: '/gallery/6.avif',
    icon: 'lucide:palette',
    class: 'aspect-square',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  }
])

// Initialize Scroll Reveal Animations
useScrollReveal()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="w-full flex items-center justify-center min-h-screen text-gray-800 dark:text-white px-4 md:px-8 lg:px-12">
      <div class="max-w-4xl mx-auto text-center">

        <!-- Greeting Text -->
        <p class="text-sm md:text-base text-muted-foreground mb-4 font-mono animate-fade-in-up">
          {{ t('Welcome to my gallery') }}
        </p>

        <!-- Main Heading -->
        <h1 class="leading-[0.88] tracking-tight mb-8 animate-fade-in-up delay-100">
          <span class="section-title-filled block">{{ t('Explore My Journey') }}</span>
          <span class="section-title-outline text-foreground block">{{ t('Through') }} {{ t('Lens') }}<span class="text-amber-400 !important">.</span></span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up delay-200 leading-relaxed font-light">
          {{ t('Welcome to my photo gallery! Here, you\'ll find a collection of moments captured through my lens, showcasing my') }}
          <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3" class="font-medium">
            {{ t('adventures, projects,') }}
          </UiTextGradient>
          {{ t('and') }}
          <UiTextGradient :colors="['#A78BFA', '#8B5CF6', '#A78BFA']" :animation-speed="3" class="font-medium">
            {{ t('everyday life.') }}
          </UiTextGradient>
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
          <NuxtLink
            to="#gallery-grid"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5"
          >
            <div class="absolute inset-0 z-0 overflow-hidden rounded-sm">
              <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
            </div>
            <span class="relative z-10 flex items-center gap-2">
              {{ t('View Gallery') }}
            </span>
            <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
              <Icon name="lucide:arrow-down" class="w-4 h-4" />
            </span>
          </NuxtLink>

          <NuxtLink
            to="https://www.instagram.com/ilhamkrnwan__"
            target="_blank"
            rel="noopener noreferrer"
            class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
          >
            <span class="mr-2 transition-transform duration-300 group-hover:-translate-x-1 relative z-10">
              <Icon name="lucide:instagram" class="w-4 h-4" />
            </span>
            <span class="relative z-10 flex items-center gap-2">
              {{ t('Visit Instagram') }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Gallery Grid Section -->
    <section id="gallery-grid" class="scroll-section will-change-[transform,opacity] section py-20 text-gray-800 dark:text-white">
      <div class="container max-w-6xl mx-auto px-6 lg:px-8">
        <!-- Section Title -->
        <div class="text-center mb-16 stagger-item">
          <h2 class="leading-[0.88] tracking-tight mb-4">
            <span class="section-title-filled block">{{ t('Photo') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Collection') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            {{ t('Each photo tells a unique story and reflects my passion for photography and creative expression.') }}
          </p>
        </div>

        <!-- Magic Bento Gallery -->
        <UiMagicBento
          :items="galleryItems"
          :text-auto-hide="true"
          :enable-stars="true"
          :enable-spotlight="true"
          :enable-border-glow="true"
          :enable-tilt="false"
          :enable-magnetism="false"
          :click-effect="true"
          :spotlight-radius="300"
          :particle-count="12"
          glow-color="251, 191, 36"
          class="stagger-item"
        />

        <!-- Instagram CTA -->
        <div class="text-center mt-16 stagger-item">
          <span class="inline-flex items-center px-4 py-2 space-x-2 text-sm border rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-amber-400/30 transition-colors duration-300 mb-6">
            <Icon name="lucide:sparkles" class="w-4 h-4 text-amber-400" />
            <span class="font-medium text-foreground">
              {{ t('For more photos and updates, visit my Instagram') }}
            </span>
          </span>
        </div>
      </div>
    </section>
    
    <!-- Get In Touch -->
    <div class="scroll-section will-change-[transform,opacity] w-full">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
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
