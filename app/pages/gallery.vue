<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="w-full flex items-center justify-center min-h-screen text-gray-800 dark:text-white px-4 md:px-8 lg:px-12">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Icon with ALL decorative blobs -->
        <div class="relative inline-block mb-8 group mt-8">
          <!-- Main background glow -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] rounded-full bg-linear-to-tr from-amber-400/20 to-orange-500/20 blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
          
          <!-- Rotating ring -->
          <div class="absolute inset-0 rounded-full border border-amber-400/20 scale-[1.3] animate-spin-slow -z-10 border-dashed"></div>

          <!-- Blob Hero (Behind) -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] -z-10 opacity-60 animate-float">
              <img src="/blob-hero.svg" alt="" class="w-full h-full object-contain" />
          </div>

          <!-- Icon Container -->
          <div class="relative w-32 h-32 md:w-40 md:h-40 mx-auto z-10">
            <div class="w-full h-full rounded-full bg-linear-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center border-4 border-amber-400/30 shadow-2xl shadow-amber-400/20 transition-transform duration-500 group-hover:scale-105">
              <Icon name="lucide:camera" class="w-12 h-12 md:w-16 md:h-16 text-amber-400" />
            </div>
            
            <!-- Blob Left Top -->
            <div class="absolute -top-8 -left-8 w-14 h-14 animate-float z-20 delay-100">
              <img src="/blob-left.svg" alt="" class="w-full h-full object-contain drop-shadow-md" />
            </div>

            <!-- Blob Right Top -->
            <div class="absolute -top-10 -right-6 w-12 h-12 animate-float2 z-0 delay-300">
               <img src="/blob-rb.svg" alt="" class="w-full h-full object-contain opacity-80" />
            </div>

            <!-- Blob Left Bottom -->
            <div class="absolute -bottom-4 -left-10 w-16 h-16 animate-float2 z-20 delay-500">
               <img src="/blob-lb.svg" alt="" class="w-full h-full object-contain drop-shadow-md" />
            </div>

            <!-- Blob Right Bottom -->
            <div class="absolute -bottom-6 -right-8 w-14 h-14 animate-float z-20 delay-700">
              <div class="relative w-full h-full">
                  <img src="/blob-right.svg" alt="" class="w-full h-full object-contain drop-shadow-md absolute inset-0" />
                  <img src="/blob-lb2.svg" alt="" class="w-full h-full object-contain drop-shadow-md absolute inset-0" />
              </div>
            </div>

          </div>
        </div>

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

        <!-- Gallery Grid - Masonry Layout -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <!-- Photo 1 - Large -->
          <div class="col-span-2 md:col-span-2 row-span-2 group relative overflow-hidden rounded-2xl border border-border/50 hover:border-amber-400/30 transition-all duration-500">
            <img
              src="/ilham02.jpg"
              alt="Gallery Photo 1"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
            />
            <div class="absolute inset-0 bg-linear-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
          </div>

          <!-- Photo 2 -->
          <div class="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-amber-400/30 transition-all duration-500 aspect-square">
            <img
              src="/ilham04.jpg"
              alt="Gallery Photo 2"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
            />
            <div class="absolute inset-0 bg-linear-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
          </div>

          <!-- Photo 3 -->
          <div class="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-amber-400/30 transition-all duration-500 aspect-square">
            <img
              src="/ilham05.jpg"
              alt="Gallery Photo 3"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
            />
            <div class="absolute inset-0 bg-linear-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
          </div>

          <!-- Photo 4 -->
          <div class="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-amber-400/30 transition-all duration-500 aspect-square">
            <img
              src="/ilham02.jpg"
              alt="Gallery Photo 4"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
            />
            <div class="absolute inset-0 bg-linear-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
          </div>

          <!-- Photo 5 - Wide -->
          <div class="col-span-2 group relative overflow-hidden rounded-2xl border border-border/50 hover:border-amber-400/30 transition-all duration-500 aspect-video">
            <img
              src="/profile-blck.png"
              alt="Gallery Photo 5"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
            />
            <div class="absolute inset-0 bg-linear-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
          </div>

          <!-- Photo 6 -->
          <div class="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-amber-400/30 transition-all duration-500 aspect-square">
            <img
              src="/ilham04.jpg"
              alt="Gallery Photo 6"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
            />
            <div class="absolute inset-0 bg-linear-to-br from-amber-400/0 to-orange-500/0 group-hover:from-amber-400/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
          </div>
        </div>

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

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(10px) rotate(-5deg); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg) scale(1.3); }
  to { transform: rotate(360deg) scale(1.3); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float2 {
  animation: float2 6s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.delay-100 { animation-delay: 0.1s; }
.delay-300 { animation-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; }
.delay-700 { animation-delay: 0.7s; }
</style>
