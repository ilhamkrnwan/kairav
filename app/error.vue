<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const { t } = useI18n()

const errorMessages: Record<number, { title: string; description: string; icon: string }> = {
  404: {
    title: t('Page Not Found'),
    description: t('Sorry, the page you\'re looking for doesn\'t exist.'),
    icon: "lucide:search-x"
  },
  500: {
    title: t('Server Error'),
    description: t('Something went wrong on our end. Please try again later.'),
    icon: "lucide:server-crash"
  },
  403: {
    title: t('Access Forbidden'),
    description: t('You don\'t have permission to access this resource.'),
    icon: "lucide:shield-alert"
  },
};

const errorInfo = computed(() => {
  const statusCode = props.error.statusCode || 500;
  return (
    errorMessages[statusCode] || {
      title: `${t('Error')} ${statusCode}`,
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
      <!-- Error Icon with Animation -->
      <div class="mb-8 relative flex flex-col items-center justify-center">
        <!-- Decorative blobs -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-linear-to-tr from-amber-400/10 to-orange-500/10 blur-3xl -z-10 animate-pulse"></div>
        
        <!-- Large animated icon -->
        <div class="relative w-24 h-24 flex items-center justify-center rounded-sm border border-border/40 bg-background/50 backdrop-blur-md shadow-lg shadow-black/5">
          <Icon :name="errorInfo.icon" class="w-12 h-12 text-amber-400" />
          
          <!-- Status Code Badge -->
          <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg">
            <span class="text-sm font-mono font-bold text-amber-400">
              {{ error.statusCode || t('ERROR') }}
            </span>
          </div>
        </div>
      </div>

      <!-- Error Title -->
      <h1 class="text-4xl md:text-6xl font-heading mb-4 text-foreground font-bold tracking-tight">
        {{ errorInfo.title }}
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
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <button
          @click="handleClearError"
          class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 bg-amber-400 text-black border border-amber-400 hover:bg-amber-500 hover:border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5 cursor-pointer"
        >
          <div class="absolute inset-0 z-0 overflow-hidden rounded-sm">
            <div class="absolute top-0 -left-full h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-700 group-hover:left-[200%]"></div>
          </div>
          <span class="relative z-10 flex items-center gap-2">
            {{ t('Go to Home') }}
          </span>
        </button>

        <button
          @click="() => $router.back()"
          class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5 cursor-pointer"
        >
          <span class="relative z-10 flex items-center gap-2">
            {{ t('Go Back') }}
          </span>
        </button>
      </div>

      <!-- Error Details Card (Optional) -->
      <div v-if="error.message" class="max-w-xl mx-auto mb-8 px-4">
        <UiAnimatedCard
          :glow-color="'251, 191, 36'"
          :particle-count="6"
          :enable-particles="false"
          :enable-tilt="false"
          :enable-magnetism="false"
          :enable-border-glow="true"
          :click-effect="false"
          class="w-full text-left"
        >
          <div class="p-6 rounded-sm border border-border/40 bg-background/50 backdrop-blur-md font-mono text-xs">
            <div class="flex items-center justify-between mb-3 border-b border-border/30 pb-2">
              <span class="font-bold text-amber-400 uppercase tracking-wider">{{ t('Error Details') }}</span>
              <span class="text-[10px] text-muted-foreground bg-background px-2 py-0.5 rounded border border-border/30">{{ error.statusCode }}</span>
            </div>
            <p class="text-foreground font-semibold mb-2 font-mono">{{ error.message }}</p>
            <pre v-if="error.stack" class="overflow-x-auto max-h-40 text-muted-foreground/80 whitespace-pre-wrap select-all font-mono leading-relaxed bg-black/30 p-3 rounded-sm border border-border/20 mt-2">{{ error.stack }}</pre>
          </div>
        </UiAnimatedCard>
      </div>

      <!-- Additional Info -->
      <div>
        <span class="inline-flex items-center px-4 py-2 space-x-2 text-sm border rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-amber-400/30 transition-colors duration-300">
          <Icon name="lucide:help-circle" class="w-4 h-4 text-amber-400" />
          <span class="text-muted-foreground">
            {{ t('If you think this is a mistake, please contact support') }}
          </span>
        </span>
      </div>
    </div>

    <!-- Social Media Buttons -->
    <LazyAppButtonSosmed :hydrate-on-idle="1200" />
  </div>
</template>

