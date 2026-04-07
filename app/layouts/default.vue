<script setup lang="ts">
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div>
    <!-- Splash Cursor Effect -->
    <ClientOnly>
      <LazyUiSplashCursor
        v-if="isHomePage"
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

    <UMain class="relative min-h-screen">
      <!-- Fixed background pattern dengan opacity lebih tinggi -->
      <div class="fixed inset-0 -z-10 overflow-hidden bg-neutral-light dark:bg-neutral-dark">
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

      <!-- Content -->
      <slot />
    </UMain>

    <LazyAppButtonSosmed :hydrate-on-idle="1200" />
  </div>
</template>
