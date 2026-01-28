<script setup>
import { ref } from 'vue'

const colorMode = useColorMode()
const switchAudio = ref(null)
const isSplashing = ref(false)

const toggleDarkMode = () => {
  // Play sound
  playSwitchSound()
  
  // Open splash animation
  isSplashing.value = true

  // Wait for splash to fully expand
  setTimeout(() => {
    // Hold at full screen, then change theme (warna splash berubah)
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    
    // After theme changes, wait a bit then close splash
    setTimeout(() => {
      isSplashing.value = false
    }, 150) // Jeda setelah theme berubah
  }, 600) // Wait for open animation to complete
}

const playSwitchSound = () => {
  if (!switchAudio.value) return

  try {
    switchAudio.value.currentTime = 0
    switchAudio.value.play().catch(() => {})
  } catch (err) {
    console.warn('Audio play failed:', err)
  }
}

onMounted(() => {
  // Initialize audio
  switchAudio.value = new Audio('/sound-effect/swicth-theme-sound-effect.mp3')
  switchAudio.value.volume = 0.3
  switchAudio.value.preload = 'auto'
})
</script>

<template>
  <div class="theme-switcher-container">
    <!-- Splash Effect Background - Behind Button -->
    <div 
      class="splash-wrapper" 
      :class="{ 'splash-active': isSplashing }"
    ></div>

    <!-- Toggle Button - Circular like FullMenu -->
    <button 
      class="theme-toggle-btn"
      aria-label="Toggle dark mode"
      @click="toggleDarkMode"
    >
      <Icon
        name="streamline-emojis:smiling-face-with-sunglasses"
        class="block dark:hidden w-8 h-8"
      />
      <Icon
        name="streamline-emojis:full-moon"
        class="hidden dark:block w-8 h-8"
      />
    </button>
  </div>
</template>

<style scoped>
/* Container */
.theme-switcher-container {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 100;
}

/* Theme Toggle Button - Circular Style like FullMenu */
.theme-toggle-btn {
  position: relative;
  z-index: 10001;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: linear-gradient(-135deg, #e28408, #e9ff1f);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
}

/* Splash Effect Wrapper - Behind Button */
.splash-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9998;
  clip-path: circle(0px at 45px 45px);
  transition: clip-path 0.6s ease-in-out;
  background: linear-gradient(-135deg, #ffa011, #fff12e);
}

.splash-wrapper.splash-active {
  clip-path: circle(150% at 45px 45px);
}

/* Responsive */
@media (max-width: 640px) {
  .theme-switcher-container {
    top: 15px;
    left: 15px;
  }
  
  .theme-toggle-btn {
    height: 45px;
    width: 45px;
  }
  
  .splash-wrapper {
    clip-path: circle(0px at 37px 37px);
  }
  
  .splash-wrapper.splash-active {
    clip-path: circle(150% at 37px 37px);
  }
}

@media (min-width: 768px) {
  .splash-wrapper {
    clip-path: circle(0px at 45px 45px);
  }
  
  .splash-wrapper.splash-active {
    clip-path: circle(150% at 45px 45px);
  }
}

@media (min-width: 1024px) {
  .splash-wrapper {
    clip-path: circle(0px at 45px 45px);
  }
  
  .splash-wrapper.splash-active {
    clip-path: circle(150% at 45px 45px);
  }
}
</style>
