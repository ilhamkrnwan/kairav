<script setup>
import { ref, computed } from 'vue'

const { t } = useI18n()
const isOpen = ref(false)
const hoveredMenu = ref('')

const menuItems = computed(() => [
  { name: t('Home'), route: '/' },
  { name: t('Services'), route: '/services' },
  { name: t('Portofolio'), route: '/portofolio' },
  { name: t('Blogs'), route: '/blogs' },
  { name: t('Gallery'), route: '/gallery' },
  { name: t('About'), route: '/about' },
])

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
  setTimeout(() => {
    hoveredMenu.value = ''
  }, 300)
}
</script>

<template>
  <div>
    <!-- Toggle Button -->
    <button
      class="menu-btn"
      :aria-label="isOpen ? 'Close navigation menu' : 'Open navigation menu'"
      :aria-expanded="isOpen"
      aria-controls="site-fullscreen-menu"
      @click="toggleMenu"
    >
      <Icon
        v-if="!isOpen"
        name="streamline-ultimate-color:navigation-menu-1"
        class="w-6 h-6"
        aria-hidden="true"
      />
      <Icon
        v-else
        name="streamline-stickies-color:cancel-2-duo"
        class="w-8 h-8"
        aria-hidden="true"
      />
    </button>

    <!-- Expanding Circle Background with Border -->
    <div class="menu-bg-circle" :class="{ open: isOpen }" />

    <!-- Menu Wrapper -->
    <div id="site-fullscreen-menu" class="wrapper" :class="{ open: isOpen }">
      
      <!-- Giant Background Outline Text -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <transition name="fade-text">
          <span 
            v-if="hoveredMenu"
            :key="hoveredMenu" 
            class="giant-bg-text"
          >
            {{ hoveredMenu }}
          </span>
        </transition>
      </div>

      <!-- Menu List -->
      <ul class="menu-list relative z-10">
        <li 
          v-for="(menuItem, index) in menuItems" 
          :key="index"
          @mouseenter="hoveredMenu = menuItem.name"
          @mouseleave="hoveredMenu = ''"
        >
          <NuxtLink :to="menuItem.route" class="menu-link-wrapper" @click="closeMenu">
            <UiStyleButton class="style-button">
              {{ menuItem.name }}
            </UiStyleButton>
          </NuxtLink>
        </li>
      </ul>
      
    </div>
  </div>
</template>

<style>
/* Menu button - Right Side - Minimal Style */
.menu-btn {
  position: fixed;
  z-index: 10001;
  right: 20px;
  top: 20px;
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 4px;
}

.dark .menu-btn {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.4);
}

.menu-btn:hover {
  border-color: rgba(251, 191, 36, 0.5);
  background: rgba(251, 191, 36, 0.1);
}

/* Expanding Circle Background */
.menu-bg-circle {
  position: fixed;
  z-index: 9997;
  right: 44px; /* Center of toggle button (20px right + 24px half-width) */
  top: 44px;   /* Center of toggle button (20px top + 24px half-height) */
  width: 250vmax;
  height: 250vmax;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 10px solid #FBBF24; /* Thick amber border for light mode */
  transition: transform 0.7s ease-in-out;
  transform-origin: center center;
  transform: translate(50%, -50%) scale(0);
  pointer-events: none;
}

.dark .menu-bg-circle {
  background: rgba(10, 10, 10, 0.95);
  border-color: rgba(255, 255, 255, 0.3); /* Thicker white border for dark mode */
}

.menu-bg-circle.open {
  transform: translate(50%, -50%) scale(1);
}

/* Wrapper animation - Full Screen Behind Button */
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.wrapper.open {
  opacity: 1;
  pointer-events: auto;
  transition: opacity 0.4s ease 0.2s; /* Delay fade in slightly so circle expands first */
}

/* Giant Background Text */
.giant-bg-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(6rem, 20vw, 15rem);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 3px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  letter-spacing: -0.05em;
  user-select: none;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.05));
}

.dark .giant-bg-text {
  -webkit-text-stroke: 3px rgba(255, 255, 255, 0.15);
  filter: drop-shadow(0 10px 20px rgba(255,255,255,0.05));
}

/* Text Transition */
.fade-text-enter-active,
.fade-text-leave-active {
  transition: opacity 0.4s ease;
}
.fade-text-enter-from,
.fade-text-leave-to {
  opacity: 0;
}

/* Menu list */
.wrapper ul {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: clamp(0.75rem, 2vw, 1.5rem);
  padding: 2rem clamp(1rem, 5vw, 2rem);
}

.menu-list {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}

/* Stagger animation */
.wrapper ul li {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: clamp(280px, 90%, 500px);
  margin: 0 auto;
}

.wrapper ul li .menu-link-wrapper {
  width: 100%;
  display: block;
  text-decoration: none;
}

.wrapper ul li .style-button {
  width: 100%;
}

.wrapper ul li .style-button :deep(button) {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: clamp(45px, 10vw, 60px);
  padding: clamp(0.75rem, 2vw, 1.5rem) clamp(1.5rem, 4vw, 3rem);
  font-size: inherit;
  border-color: rgba(251, 191, 36, 0.2);
}

.wrapper ul li .style-button :deep(span) {
  background-image: none !important;
  background-clip: border-box !important;
  -webkit-background-clip: border-box !important;
  -webkit-text-fill-color: var(--color-foreground) !important;
  color: var(--color-foreground) !important;
  opacity: 1 !important;
}

.wrapper ul li .style-button :deep(button:hover span) {
  -webkit-text-fill-color: black !important;
  color: black !important;
}

.dark .wrapper ul li .style-button :deep(span) {
  -webkit-text-fill-color: white !important;
  color: white !important;
}
.dark .wrapper ul li .style-button :deep(button:hover span) {
  -webkit-text-fill-color: black !important;
  color: black !important;
}

.wrapper.open ul li {
  opacity: 1;
  transform: translateY(0);
}

.wrapper.open ul li:nth-child(1) { transition-delay: 0.1s }
.wrapper.open ul li:nth-child(2) { transition-delay: 0.15s }
.wrapper.open ul li:nth-child(3) { transition-delay: 0.2s }
.wrapper.open ul li:nth-child(4) { transition-delay: 0.25s }
.wrapper.open ul li:nth-child(5) { transition-delay: 0.3s }
.wrapper.open ul li:nth-child(6) { transition-delay: 0.35s }
.wrapper.open ul li:nth-child(7) { transition-delay: 0.4s }

/* Responsive */
@media (max-width: 640px) {
  .menu-btn {
    right: clamp(10px, 3vw, 15px);
    top: clamp(10px, 3vw, 15px);
    height: clamp(40px, 10vw, 45px);
    width: clamp(40px, 10vw, 45px);
  }
  
  .menu-bg-circle {
    right: 32px;
    top: 32px;
  }
}
</style>
