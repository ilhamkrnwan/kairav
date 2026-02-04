<script setup>
const { t } = useI18n()

// Dynamic SEO
useDynamicSeo({
  titleKey: 'seo.gallery.title',
  descriptionKey: 'seo.gallery.description',
  image: '/og-image.jpg'
})

// Gallery items configuration
const galleryItems = computed(() => [
  {
    title: t('Portrait Photography'),
    description: t('Capturing emotions and personality in every frame'),
    image: '/ilham02.jpg',
    icon: 'lucide:user',
    badge: t('Featured'),
    class: 'md:col-span-2 md:row-span-2',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Urban Exploration'),
    description: t('Discovering beauty in city landscapes'),
    image: '/ilham04.jpg',
    icon: 'lucide:building-2',
    badge: t('Recent'),
    class: 'aspect-square',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Nature Vibes'),
    description: t('Finding peace in natural scenery'),
    image: '/ilham05.jpg',
    icon: 'lucide:trees',
    class: 'aspect-square',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Street Photography'),
    description: t('Life moments in everyday scenes'),
    image: '/ilham02.jpg',
    icon: 'lucide:camera',
    class: 'aspect-square',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Professional Shoots'),
    description: t('Commercial and editorial photography'),
    image: '/profile-blck.png',
    icon: 'lucide:briefcase',
    badge: t('Portfolio'),
    class: 'md:col-span-2 aspect-video',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  },
  {
    title: t('Creative Experiments'),
    description: t('Pushing boundaries with new techniques'),
    image: '/ilham04.jpg',
    icon: 'lucide:palette',
    class: 'aspect-square',
    imageClass: 'filter grayscale group-hover:grayscale-0'
  }
])
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
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 leading-tight animate-fade-in-up delay-100">
          {{ t('Explore My Journey') }} <br class="hidden md:block" />{{ t('Through') }} <span class="text-amber-400 inline-block hover:scale-105 transition-transform cursor-default">{{ t('Lens') }}</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up delay-200">
          {{ t('Welcome to my photo gallery! Here, you\'ll find a collection of moments captured through my lens, showcasing my adventures, projects, and everyday life.') }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
          <UiAnimatedButton href="#gallery-grid" variant="primary">
            <template #default>{{ t('View Gallery') }}</template>
            <template #iconRight>
              <Icon name="lucide:arrow-down" class="w-4 h-4" />
            </template>
          </UiAnimatedButton>

          <UiAnimatedButton href="https://www.instagram.com/ilhamkrnwan__" variant="outline" target="_blank">
            <template #iconLeft>
              <Icon name="lucide:instagram" class="w-4 h-4" />
            </template>
            <template #default>{{ t('Visit Instagram') }}</template>
          </UiAnimatedButton>
        </div>
      </div>
    </section>

    <!-- Gallery Grid Section -->
    <section id="gallery-grid" class="section py-20 text-gray-800 dark:text-white">
      <div class="container max-w-6xl mx-auto px-6 lg:px-8">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-heading mb-4">
            {{ t('Photo') }} <span class="text-amber-400">{{ t('Collection') }}</span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            {{ t('Each photo tells a unique story and reflects my passion for photography and creative expression.') }}
          </p>
        </div>

        <!-- Magic Bento Gallery -->
        <UiMagicBento
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
        />

        <!-- Instagram CTA -->
        <div class="text-center mt-16">
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
    <GetinTouch />
  </div>
</template>

