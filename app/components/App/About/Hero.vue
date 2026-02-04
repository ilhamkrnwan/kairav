<script setup lang="ts">
import { Icon } from "#components";

const { t } = useI18n()
</script>

<template>
  <section class="w-full flex items-center justify-center min-h-screen text-gray-800 dark:text-white px-4 md:px-8 lg:px-12">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Avatar with ALL decorative blobs -->
      <div class="relative inline-block mb-8 group mt-8">
        <!-- Main background glow -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] rounded-full bg-linear-to-tr from-amber-400/20 to-orange-500/20 blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700"></div>
        
        <!-- Rotating ring -->
        <div class="absolute inset-0 rounded-full border border-amber-400/20 scale-[1.3] animate-spin-slow -z-10 border-dashed"></div>

        <!-- Blob Hero (Behind) -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] -z-10 opacity-60 animate-float">
            <img src="/blob-hero.svg" alt="" class="w-full h-full object-contain" />
        </div>

        <!-- Avatar Image Container -->
        <div class="relative w-32 h-32 md:w-40 md:h-40 mx-auto z-10">
          <img 
            src="/ilham-hero.png" 
            alt="Ilham Kurniawan" 
            class="w-full h-full rounded-full object-cover border-4 border-amber-400/30 shadow-2xl shadow-amber-400/20 transition-transform duration-500 group-hover:scale-105"
          />
          
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
        {{ t('Hello my name is Ilham Kurniawan') }}
      </p>

      <!-- Main Heading -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading mb-6 leading-tight animate-fade-in-up delay-100">
        {{ t('Eager to learn') }} <span class="text-amber-400 inline-block hover:scale-105 transition-transform cursor-default">{{ t('new things') }}</span> {{ t('and open to') }} <span class="text-amber-400 inline-block hover:scale-105 transition-transform cursor-default">{{ t('opportunities.') }}</span>
      </h1>

      <!-- Subtitle/Role -->
      <p class="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up delay-200">
        {{ t('Junior Fullstack Developer | AI Enthusiast | Undergraduated Student | Web3 Enthusiast') }}
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
        <!-- Primary Button -->
        <UiAnimatedButton href="#contact" variant="primary">
          <template #default>{{ t('Get in touch') }}</template>
          <template #iconRight>
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </template>
        </UiAnimatedButton>

        <!-- Secondary Button -->
        <UiAnimatedButton href="#works" variant="outline">
          <template #default>{{ t('View works') }}</template>
          <template #iconRight>
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </template>
        </UiAnimatedButton>
      </div>
    </div>
  </section>
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
  from { transform: rotate(0deg) scale(1.25); }
  to { transform: rotate(360deg) scale(1.25); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float2 {
  animation: float2 5s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

.animate-fade-in-up {
  opacity: 0;
  transform: translateY(1rem);
  animation: fade-in-up 0.8s ease-out forwards;
}

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-700 { animation-delay: 700ms; }
</style>
