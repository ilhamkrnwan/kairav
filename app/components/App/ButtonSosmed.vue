<script lang="ts" setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const mobileToggleLabel = computed(() =>
  isOpen.value ? 'Hide social media links' : 'Show social media links'
);

const sosmedItems = [
  {
    name: 'Instagram',
    icon: 'streamline-ultimate-color:instagram-logo',
    to: 'https://www.instagram.com/ilhamkrnwan__'
  },
  {
    name: 'GitHub',
    icon: 'streamline-ultimate-color:github-logo-1',
    to: 'https://github.com/IlhamKurniawanBlora'
  },
  {
    name: 'LinkedIn',
    icon: 'streamline-ultimate-color:linkedin-logo',
    to: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/'
  },
  {
    name: 'WhatsApp',
    icon: 'streamline-color:whatsapp',
    to: 'https://wa.me/6287761296676?text=Hello%20friend%2C%20how%20can%20I%20help%20you%20today%3F%20😊'
  },
  {
    name: 'Email',
    icon: 'streamline-stickies-color:mail-duo',
    to: 'mailto:ilhamkurniawanjateng@gmail.com'
  }
];
</script>

<template>
  <!-- Toggle Button - hanya muncul di mobile -->
  <button
  class="fixed top-1/2 left-0 transform -translate-y-1/2 z-30
  w-8 h-16 bg-background/50 backdrop-blur-sm border-y border-r border-border/40
  hover:border-amber-400/50 hover:bg-background/80
  rounded-r-sm flex items-center justify-center
  transition-all duration-300 md:hidden"
  :class="{ 'left-16': isOpen }"
  :aria-label="mobileToggleLabel"
  :aria-expanded="isOpen"
  aria-controls="social-media-sidebar"
  @click="toggleSidebar"
  >
    <Icon 
      :name="isOpen ? 'lucide:arrow-left-to-line' : 'lucide:arrow-right-to-line'" 
      class="w-8 h-8 text-accent-light dark:text-accent-dark transition-transform duration-300 cursor-pointer"
      aria-hidden="true"
    />
  </button>

  <!-- Social Media Floating Bar -->
  <div
    id="social-media-sidebar"
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
               hover:bg-background/80 hover:text-amber-400
               rounded-sm p-0 transition-all duration-300
               border border-border/40 hover:border-amber-400/50"  
      >
        <Icon :name="sosmedItem.icon" class="w-6 h-6" aria-hidden="true" />
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

