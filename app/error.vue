<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const { t } = useI18n()

const errorMessages: Record<number, { firstPart: string; secondPart: string; description: string; icon: string }> = {
  404: {
    firstPart: t('Page Not'),
    secondPart: t('Found'),
    description: t('Sorry, the page you\'re looking for doesn\'t exist.'),
    icon: "lucide:search-x"
  },
  500: {
    firstPart: t('Server'),
    secondPart: t('Error'),
    description: t('Something went wrong on our end. Please try again later.'),
    icon: "lucide:server-crash"
  },
  403: {
    firstPart: t('Access'),
    secondPart: t('Forbidden'),
    description: t('You don\'t have permission to access this resource.'),
    icon: "lucide:shield-alert"
  },
};

const errorInfo = computed(() => {
  const statusCode = props.error.statusCode || 500;
  return (
    errorMessages[statusCode] || {
      firstPart: t('Error'),
      secondPart: String(statusCode),
      description: props.error.message || t('An unexpected error occurred.'),
      icon: "lucide:alert-triangle"
    }
  );
});

const handleClearError = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden bg-neutral-light dark:bg-neutral-dark text-foreground">
    <!-- Splash Cursor Effect -->
    <ClientOnly>
      <LazyUiSplashCursor
        :hydrate-on-interaction="['mousemove', 'touchstart']"
        :SIM_RESOLUTION="128"
        :DYE_RESOLUTION="1440"
        :CAPTURE_RESOLUTION="512"
        :DENSITY_DISSIPATION="3.5"
        :VELOCITY_DISSIPATION="2"
        :PRESSURE="0.1"
        :PRESSURE_ITERATIONS="20"
        :CURL="3"
        :SPLAT_RADIUS="0.2"
        :SPLAT_FORCE="6000"
        :SHADING="true"
        :COLOR_UPDATE_SPEED="10"
        :BACK_COLOR="{ r: 0.5, g: 0, b: 0 }"
        :TRANSPARENT="true"
      />
    </ClientOnly>

    <!-- Theme Switcher - Left Side -->
    <LazyAppThemeSwitcher :hydrate-on-idle="800" />

    <!-- Language Switcher - Left Side -->
    <LazyAppLangSwitcher :hydrate-on-idle="1000" />

    <!-- Full Screen Menu - Right Side -->
    <LazyAppFullScreenMenu :hydrate-on-idle="800" />

    <!-- Fixed background pattern -->
    <div class="absolute inset-0 -z-10 overflow-hidden bg-neutral-light dark:bg-neutral-dark">
      <ClientOnly>
        <LazyUiAnimatedGridPattern
          :hydrate-on-idle="1500"
          :num-squares="30"
          :max-opacity="0.3"
          :duration="3"
          :repeat-delay="1"
          class="mask-[radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />
      </ClientOnly>
    </div>

    <!-- Ambient Glows -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div class="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <div class="text-center max-w-2xl w-full z-10 py-16">
      <!-- Error Illustration -->
      <div class="mb-8 relative flex flex-col items-center justify-center">
        <!-- Decorative blobs -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-linear-to-tr from-amber-400/10 to-orange-500/10 blur-3xl -z-10 animate-pulse"></div>
        
        <!-- Illustration Image (No card container, no code badge) -->
        <div class="relative max-w-xs md:max-w-md flex items-center justify-center">
          <img src="/error.avif" alt="Error Illustration" class="w-full h-auto object-cover" />
        </div>
      </div>

      <!-- Error Title (Hero Stretched Style) -->
      <h1 class="leading-[0.88] tracking-tight mb-6">
        <span class="section-title-filled block">{{ errorInfo.firstPart }}</span>
        <span class="section-title-outline text-foreground block">{{ errorInfo.secondPart }}<span class="text-amber-400 !important">.</span></span>
      </h1>

      <!-- Error Description -->
      <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
        {{ errorInfo.description }}
      </p>

      <!-- Decorative Line -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <div class="w-12 h-0.5 bg-linear-to-r from-transparent to-amber-400 rounded-full"></div>
        <Icon name="lucide:sparkles" class="w-4 h-4 text-amber-400" />
        <div class="w-12 h-0.5 bg-linear-to-l from-transparent to-amber-400 rounded-full"></div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5 cursor-pointer"
          @click="handleClearError"
        >
          <div class="absolute inset-0 z-0 overflow-hidden rounded-sm">
            <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
          </div>
          <span class="relative z-10 flex items-center gap-2">
            {{ t('Go to Home') }}
          </span>
        </button>

        <button
          class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5 cursor-pointer"
          @click="() => $router.back()"
        >
          <span class="relative z-10 flex items-center gap-2">
            {{ t('Go Back') }}
          </span>
        </button>
      </div>
    </div>

    <!-- Social Media Buttons -->
    <LazyAppButtonSosmed :hydrate-on-idle="1200" />
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
