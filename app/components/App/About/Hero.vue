<script setup lang="ts">
import { ref, computed } from 'vue'

const { t } = useI18n()

// === Image Logic ===
const activeMode = ref<'normal' | 'aot' | 'jojo'>('normal')
const prevMode = ref<'normal' | 'aot' | 'jojo'>('normal')
const isScanning = ref(false)
const scanKey = ref(0)

const changeMode = (mode: 'normal' | 'aot' | 'jojo') => {
  if (isScanning.value || activeMode.value === mode) return
  
  prevMode.value = activeMode.value
  activeMode.value = mode
  isScanning.value = true
  scanKey.value++
  
  setTimeout(() => {
    isScanning.value = false
    prevMode.value = mode
  }, 3000)
}

const getImageSrc = (mode: string) => {
  if (mode === 'aot') return '/ilham-hero2.webp'
  if (mode === 'jojo') return '/ilham-hero-2.webp'
  return '/ilham-hero.webp'
}

const prevImageSrc = computed(() => getImageSrc(prevMode.value))
const currentImageSrc = computed(() => getImageSrc(activeMode.value))

const activeLogoSrc = computed(() => {
  if (activeMode.value === 'aot') return '/aot2.webp'
  if (activeMode.value === 'jojo') return '/jojo.png'
  return null
})
</script>

<template>
  <section class="relative w-full flex items-center justify-center min-h-screen text-gray-800 dark:text-white px-4 md:px-8 lg:px-12 overflow-hidden">
    
    <!-- Dynamic Section Background Logo -->
    <transition name="fade">
      <div 
        v-if="activeLogoSrc"
        :key="activeLogoSrc"
        class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-10 dark:opacity-15 mix-blend-multiply dark:mix-blend-screen"
      >
        <img :src="activeLogoSrc" alt="Background Logo" class="w-full h-full object-contain scale-[1.2] md:scale-100 blur-[2px]" />
      </div>
    </transition>

    <div class="max-w-4xl mx-auto text-center relative z-10">
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
        <div class="relative w-32 h-32 md:w-40 md:h-40 mx-auto z-10 group mb-6">
          
          <!-- Layer 1: Previous Image -->
          <div class="hero-img-inner absolute inset-0 rounded-lg overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
            <NuxtImg
              :src="prevImageSrc"
              alt="Ilham Kurniawan"
              width="160"
              height="160"
              sizes="128px md:160px"
              format="webp"
              :class="[
                'w-full h-full object-cover object-top transition-all duration-700',
                prevMode === 'normal' ? 'filter sepia-[0.15] contrast-105 brightness-95 dark:brightness-90' : ''
              ]"
            />
            <div class="absolute inset-0 hero-overlay pointer-events-none"></div>
          </div>

          <!-- Layer 2: New Image (Wiping Down) -->
          <div 
            :key="`wipe-${scanKey}`"
            class="hero-img-inner absolute inset-0 rounded-lg overflow-hidden shadow-xl z-10 transition-transform duration-500 group-hover:scale-[1.02]"
            :class="{ 'animate-wipe': isScanning }"
            :style="!isScanning ? 'clip-path: inset(0 0 0 0);' : ''"
          >
            <NuxtImg
              :src="currentImageSrc"
              alt="Ilham Kurniawan Reveal"
              width="160"
              height="160"
              sizes="128px md:160px"
              format="webp"
              :class="[
                'w-full h-full object-cover object-top transition-all duration-700',
                activeMode === 'normal' ? 'filter sepia-[0.15] contrast-105 brightness-95 dark:brightness-90' : ''
              ]"
            />
            <div class="absolute inset-0 hero-overlay pointer-events-none"></div>
          </div>
            
          <!-- Scanning Effect Overlay (Scanline) -->
          <div 
            v-if="isScanning"
            :key="`scan-${scanKey}`"
            class="absolute inset-0 z-20 pointer-events-none rounded-lg overflow-hidden"
          >
             <div class="scanline absolute left-0 w-full h-[3px] bg-amber-400 shadow-[0_0_15px_4px_rgba(251,191,36,1)]"></div>
          </div>

          <!-- Corner brackets -->
          <div class="cbr tl border-amber-500/80 dark:border-amber-400"></div>
          <div class="cbr tr border-amber-500/80 dark:border-amber-400"></div>
          <div class="cbr bl border-amber-500/80 dark:border-amber-400"></div>
          <div class="cbr br border-amber-500/80 dark:border-amber-400"></div>

          <!-- Blob Left Top -->
          <div class="absolute -top-8 -left-8 w-14 h-14 animate-float z-20 delay-100 pointer-events-none">
            <img src="/blob-left.svg" alt="" class="w-full h-full object-contain drop-shadow-md" />
          </div>

          <!-- Blob Right Top -->
          <div class="absolute -top-10 -right-6 w-12 h-12 animate-float2 z-0 delay-300 pointer-events-none">
             <img src="/blob-rb.svg" alt="" class="w-full h-full object-contain opacity-80" />
          </div>

          <!-- Blob Left Bottom -->
          <div class="absolute -bottom-4 -left-10 w-16 h-16 animate-float2 z-20 delay-500 pointer-events-none">
             <img src="/blob-lb.svg" alt="" class="w-full h-full object-contain drop-shadow-md" />
          </div>

          <!-- Blob Right Bottom -->
          <div class="absolute -bottom-6 -right-8 w-14 h-14 animate-float z-20 delay-700 pointer-events-none">
            <div class="relative w-full h-full">
                <img src="/blob-right.svg" alt="" class="w-full h-full object-contain drop-shadow-md absolute inset-0" />
                <img src="/blob-lb2.svg" alt="" class="w-full h-full object-contain drop-shadow-md absolute inset-0" />
            </div>
          </div>
        </div>

        <!-- Mode Selection Buttons -->
        <div class="flex items-center justify-center gap-3 mt-8 z-20 relative">
          <button 
            @click="changeMode('normal')"
            :disabled="isScanning"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border',
              activeMode === 'normal' 
                ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400' 
                : 'bg-transparent border-border/50 text-muted-foreground hover:bg-background/50',
              isScanning ? 'opacity-50 cursor-not-allowed' : ''
            ]"
          >
            Normal
          </button>
          
          <button 
            @click="changeMode('aot')"
            :disabled="isScanning"
            :class="[
              'px-3 py-1.5 rounded-md transition-all duration-300 border overflow-hidden flex items-center justify-center',
              activeMode === 'aot' 
                ? 'bg-amber-500/20 border-amber-500' 
                : 'bg-transparent border-border/50 hover:bg-background/50 bg-white/5 dark:bg-white/10',
              isScanning ? 'opacity-50 cursor-not-allowed' : ''
            ]"
            style="width: 80px; height: 38px;"
            title="Attack on Titan"
          >
            <img src="/aot.png" alt="AOT" class="h-full w-full object-contain mix-blend-multiply dark:invert" />
          </button>

          <button 
            @click="changeMode('jojo')"
            :disabled="isScanning"
            :class="[
              'px-3 py-1.5 rounded-md transition-all duration-300 border overflow-hidden flex items-center justify-center',
              activeMode === 'jojo' 
                ? 'bg-amber-500/20 border-amber-500' 
                : 'bg-transparent border-border/50 hover:bg-background/50 bg-white/5 dark:bg-white/10',
              isScanning ? 'opacity-50 cursor-not-allowed' : ''
            ]"
            style="width: 80px; height: 38px;"
            title="JoJo's Bizarre Adventure"
          >
            <img src="/jojo.png" alt="JoJo" class="h-full w-full object-contain" />
          </button>
        </div>
      </div>

      <!-- Greeting Text -->
      <p class="text-sm md:text-base text-muted-foreground mb-4 font-mono animate-fade-in-up">
        {{ t('Hello my name is Ilham Kurniawan') }}
      </p>

       <!-- Main Heading -->
          <h1 class="lg:text-4xl text-2xl font-heading mb-6 leading-tight">
            {{ t('Fullstack Developer') }} | {{ t('IT Student') }} | {{ t('Web3 & AI Enthusiast') }}
          </h1>

          <!-- Description -->
          <p class="lg:text-lg text-base text-muted-foreground mb-8">
            {{ t('Bridging the gap between') }}
            <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3">
              {{ t('complex ideas') }}
            </UiTextGradient>
            {{ t('and') }}
            <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3">
              {{ t('seamless digital experiences.') }}
            </UiTextGradient>
            {{ t('Agnostic in tools, precise in execution.') }}
            {{ t('Designed for users,') }}
            <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3">
              {{ t('built for impact.') }}
            </UiTextGradient>
          </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300">
        <!-- Primary Button -->
        <UiAnimatedButton href="/cv" variant="primary">
          <template #default>{{ t('Download CV') }}</template>
          <template #iconRight>
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </template>
        </UiAnimatedButton>

        <!-- Secondary Button -->
        <UiAnimatedButton href="/portofolio" variant="outline">
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

/* === Hero Frame & Masking Styles === */
.hero-overlay {
  background: linear-gradient(to bottom, transparent 45%, rgba(7,5,3,0.65) 100%);
}

.cbr {
  position: absolute; width: 14px; height: 14px;
  border-style: solid; z-index: 20;
}
.cbr.tl { top: -5px; left: -5px; border-width: 2px 0 0 2px; }
.cbr.tr { top: -5px; right: -5px; border-width: 2px 2px 0 0; }
.cbr.bl { bottom: -5px; left: -5px; border-width: 0 0 2px 2px; }
.cbr.br { bottom: -5px; right: -5px; border-width: 0 2px 2px 0; }

.scanline {
  animation: scanDown 3s linear forwards;
}

@keyframes scanDown {
  0% { top: 0%; opacity: 1; }
  95% { opacity: 1; }
  100% { top: calc(100% - 3px); opacity: 0; }
}

.animate-wipe {
  animation: wipeDown 3s linear forwards;
}

@keyframes wipeDown {
  0% { clip-path: inset(0 0 100% 0); -webkit-clip-path: inset(0 0 100% 0); }
  100% { clip-path: inset(0 0 0 0); -webkit-clip-path: inset(0 0 0 0); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
