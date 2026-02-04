<template>
  <div>
    <!-- Splash Cursor Effect -->
    
    <UiSplashCursor
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
    <!-- Theme Switcher - Left Side -->
    <AppThemeSwitcher />
    
    <!-- Language Switcher - Left Side -->
    <AppLangSwitcher />
    
    <!-- Full Screen Menu - Right Side -->
    <AppFullScreenMenu />
    
    <UMain class="relative min-h-screen">
      <!-- Fixed background pattern dengan opacity lebih tinggi -->
      <div class="fixed inset-0 -z-10 overflow-hidden bg-neutral-light dark:bg-neutral-dark">
        <ClientOnly>


              <UiAnimatedGridPattern
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
    <AppButtonSosmed />
  </div>
</template>