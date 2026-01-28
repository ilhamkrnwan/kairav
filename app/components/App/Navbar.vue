<template>
  <nav class="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
    <div
      :class="[
        'navbar-container',
        'flex justify-between items-center',
        'px-6 py-3 rounded-full',
        'backdrop-blur-md transition-all duration-300',
        {
          'bg-white/80 dark:bg-black/80 shadow-lg': isScrolled,
          'bg-white/50 dark:bg-black/50 shadow-md': !isScrolled
        }
      ]"
    >
      <!-- Logo Section -->
      <div class="flex items-center">
        <NuxtLink to="/" class="text-xl font-semibold text-slate-800 dark:text-white hover:opacity-80 transition-opacity">
          KAIRAV
        </NuxtLink>
      </div>

      <!-- Right Section: Lang Switcher + Theme Switcher + Menu -->
      <div class="flex items-center gap-3">
        <!-- Lang Switcher -->
        <AppLangSwitcher />
        
        <!-- Divider -->
        <div class="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>

        <!-- Theme Switcher -->
        <AppThemeSwitcher />

        <!-- Menu Toggle -->
        <AppFullScreenMenu />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar-container {
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.navbar-container:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

@media (max-width: 640px) {
  nav {
    width: 90%;
  }
  
  .navbar-container {
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }
  
  .flex.items-center.gap-3 {
    gap: 0.5rem;
  }
}
</style>