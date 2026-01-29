<template>
  <div>
    <!-- Theme Switcher - Left Side -->
    <AppThemeSwitcher />
    
    <!-- Language Switcher - Left Side -->
    <AppLangSwitcher />
    
    <!-- Full Screen Menu - Right Side -->
    <AppFullScreenMenu />
    
    <UMain class="relative min-h-screen">
        <!-- Fixed background pattern dengan opacity lebih tinggi -->
        <div class="fixed inset-0 -z-10 overflow-hidden bg-neutral-light dark:bg-neutral-dark">
            <UiAnimatedGridPattern
              :num-squares="30"
              :max-opacity="0.3"
              :duration="3"
              :repeat-delay="1"
              class="mask-[radial-gradient(500px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            />
        </div>
        
        <!-- Content -->
        <slot />
    </UMain>
    <AppButtonSosmed />
  </div>
</template>