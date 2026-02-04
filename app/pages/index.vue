<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen text-gray-800 dark:text-white flex flex-wrap justify-center items-center w-full">
    <!-- Hero Section -->
    <div class="mt-20">
      <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        
        <!-- Hero Image Section -->
        <div class="relative flex items-center justify-center p-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 order-1 lg:order-2">
          
          <!-- Background Blob -->
          <div class="absolute mx-auto inset-0 items-center justify-center p-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 animate-float">
            <img src="/blob-hero.svg" alt="Background decoration" class="max-w-md h-auto mx-auto object-contain object-center" />
          </div>
          
          <!-- Decorative Blobs - Left -->
          <span class="absolute left-0 top-0 w-24 z-10 animate-float">
            <img src="/blob-left.svg" alt="Decoration" class="max-w-md h-auto object-contain object-center" />
          </span>
          <span class="absolute animate-float2 left-0 bottom-0 w-24 z-10">
            <img src="/blob-lb.svg" alt="Decoration" class="max-w-md h-auto object-contain object-center" />
          </span>
          
          <!-- Decorative Blobs - Right -->
          <span class="absolute animate-float2 right-0 bottom-0 w-24 z-10">
            <img src="/blob-right.svg" alt="Decoration" class="max-w-sm h-auto object-contain object-center" />
            <img src="/blob-lb2.svg" alt="Decoration" class="max-w-sm h-auto object-contain object-center" />
          </span>
          <span class="absolute animate-float2 right-0 top-0 w-24 z-10">
            <img src="/blob-rb.svg" alt="Decoration" class="max-w-sm h-auto object-contain object-center" />
          </span>
          
          <!-- Main Hero Image -->
          <img src="/ilham-hero.png" alt="Ilham Kurniawan" class="relative object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
        </div>

        <!-- Text Content Section -->
        <div class="flex flex-col justify-center lg:p-6 p-0 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left order-2 lg:order-1 z-10 text-neutral-dark dark:text-accent-dark">
          
          <!-- Logo -->
          <div class="flex lg:justify-start items-center justify-center mb-4">
            <img src="/kairav.png" alt="Kairav Logo" class="h-10 mr-2" />
            <h1 class="text-sm uppercase tracking-wider text-muted-foreground">kairav</h1>
          </div>
          
          <!-- Greeting -->
          <p class="text-sm md:text-base text-muted-foreground mb-4 font-mono">
            {{ t('Hello my name is Ilham Kurniawan') }}
          </p>

          <!-- Main Heading -->
          <h1 class="lg:text-4xl text-2xl font-heading mb-6 leading-tight">
            {{ t('Eager to learn') }}
            <span class="text-amber-400 inline-block hover:scale-105 transition-transform cursor-default">
              {{ t('new things') }}
            </span>
            {{ t('and open to') }}
            <span class="text-amber-400 inline-block hover:scale-105 transition-transform cursor-default">
              {{ t('opportunities') }}
            </span>
          </h1>

          <!-- Description -->
          <p class="lg:text-lg text-base text-muted-foreground mb-8">
            {{ t('Junior Fullstack Developer | AI Enthusiast | Undergraduated Student | Web3 Enthusiast') }}
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row space-y-4 sm:space-y-4 md:space-y-4 lg:space-y-0 lg:space-x-4">
            <UiAnimatedButton href="/cv" variant="primary">
              <template #default>{{ t('Download CV') }}</template>
              <template #iconRight>
                <Icon name="lucide:download" class="w-4 h-4" />
              </template>
            </UiAnimatedButton>
            
            <UiAnimatedButton href="/about" variant="outline">
              <template #default>{{ t('See More') }}</template>
              <template #iconRight>
                <Icon name="lucide:arrow-right" class="w-4 h-4" />
              </template>
            </UiAnimatedButton>
          </div>

        </div>

        <!-- Copyright Footer -->
        <div class="absolute top-20 left-4 md:left-20 xl:left-20 lg:left-20 text-sm text-muted-foreground font-mono">
          {{ t('2026 | Copyright © KAIRAV') }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Float Animations */
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
</style>