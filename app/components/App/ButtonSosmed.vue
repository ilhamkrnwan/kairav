<script lang="ts" setup>
import { ref } from 'vue';
import { onClickOutside, useEventListener } from '@vueuse/core';

const isOpen = ref(false);
const sidebarRef = ref<HTMLElement | null>(null);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const closeSidebar = () => {
  if (isOpen.value) {
    isOpen.value = false;
  }
};

// Tutup saat klik di luar floating sidebar
onClickOutside(sidebarRef, () => {
  closeSidebar();
});

// Tutup otomatis saat pengguna melakukan scroll
if (import.meta.client) {
  useEventListener(window, 'scroll', () => {
    closeSidebar();
  }, { passive: true });
}

const sosmedItems = [
  {
    name: 'Instagram',
    icon: 'lucide:instagram',
    to: 'https://www.instagram.com/ilhamkrnwan__'
  },
  {
    name: 'GitHub',
    icon: 'simple-icons:github',
    to: 'https://github.com/ilhamkrnwan'
  },
  {
    name: 'LinkedIn',
    icon: 'simple-icons:linkedin',
    to: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/'
  },
  {
    name: 'WhatsApp',
    icon: 'simple-icons:whatsapp',
    to: 'https://wa.me/6287761296676?text=Hello%20friend%2C%20how%20can%20I%20help%20you%20today%3F%20😊'
  },
  {
    name: 'Email',
    icon: 'lucide:mail',
    to: 'mailto:ilhamkurniawanjateng@gmail.com'
  }
];
</script>

<template>
  <!-- Toggle Button - muncul dengan animasi slide dari kiri dan ada delay saat sidebar tertutup -->
  <transition name="slide-toggle-btn">
    <button
      v-if="!isOpen"
      class="fixed top-1/2 left-0 -translate-y-1/2 z-30
             w-8 h-16 bg-background/50 backdrop-blur-sm border-y border-r border-border/40
             hover:border-amber-400/50 hover:bg-background/80
             rounded-r-sm flex items-center justify-center
             transition-colors duration-300 md:hidden"
      aria-label="Show social media links"
      :aria-expanded="isOpen"
      aria-controls="social-media-sidebar"
      @click.stop="toggleSidebar"
    >
      <Icon 
        name="lucide:arrow-right-to-line" 
        class="w-5 h-5 text-foreground transition-transform duration-300 cursor-pointer"
        aria-hidden="true"
      />
    </button>
  </transition>

  <!-- Social Media Floating Bar -->
  <div
    id="social-media-sidebar"
    ref="sidebarRef"
    class="fixed top-1/2 transform -translate-y-1/2
           text-accent-light dark:text-accent-dark
           flex flex-col items-center space-y-4 p-2 z-20
           transition-all duration-300 ease-in-out
           md:left-0"
    :class="isOpen ? 'left-0' : '-left-full'"
  >
    <div
      v-for="(sosmedItem, index) in sosmedItems"
      :key="index"
      class="group relative flex items-center justify-center
             w-12 h-12 mb-2 cursor-pointer
             transition-transform duration-300
             hover:scale-125"
    >
      <a
        :href="sosmedItem.to"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="sosmedItem.name"
        :title="sosmedItem.name"
        class="w-10 h-10 flex items-center justify-center
               bg-background/50 backdrop-blur-sm
               hover:bg-background/80
               rounded-sm p-0 transition-all duration-300
               border border-border/40 hover:border-amber-400/50"  
      >
        <Icon :name="sosmedItem.icon" class="w-5 h-5 text-foreground" aria-hidden="true" />
      </a>

      <!-- Tooltip -->
      <span
        aria-hidden="true"
        class="absolute left-full top-1/2 transform -translate-y-1/2 z-20
               mx-3 px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase text-foreground
               bg-background/80 backdrop-blur-md rounded-sm shadow-xl border border-border/40
               transition-all duration-300 ease-in-out
               scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
      >
        {{ sosmedItem.name }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Animasi slide muncul dari kiri ke kanan dengan delay saat sidebar menutup */
.slide-toggle-btn-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  transition-delay: 0.25s;
}

.slide-toggle-btn-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
  transition-delay: 0s;
}

.slide-toggle-btn-enter-from,
.slide-toggle-btn-leave-to {
  transform: translate(-100%, -50%);
  opacity: 0;
}

.slide-toggle-btn-enter-to,
.slide-toggle-btn-leave-from {
  transform: translate(0, -50%);
  opacity: 1;
}
</style>

