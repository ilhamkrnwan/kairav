<template>
  <!-- Toggle Button - hanya muncul di mobile -->
  <button
  class="fixed top-1/2 left-0 transform -translate-y-1/2 z-30
  w-8 h-16 bg-accent-light/20 dark:bg-accent-dark/20
  hover:bg-accent-light/30 dark:hover:bg-accent-dark/30
  rounded-r-lg flex items-center justify-center
  transition-all duration-300 md:hidden"
  :class="{ 'left-16': isOpen }"
  @click="toggleSidebar"
  >
    <Icon 
      :name="isOpen ? 'streamline-plump-color:arrow-right-circle-1-flat' : 'streamline-plump-color:arrow-right-circle-1-flat'" 
      class="w-8 h-8 text-accent-light dark:text-accent-dark transition-transform duration-300 cursor-pointer" 
      :class="isOpen ? 'rotate-180' : ''"
    />
  </button>

  <!-- Social Media Floating Bar -->
  <div
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
        class="w-10 h-10 flex items-center justify-center
               bg-amber-100/30 dark:bg-yellow-400/10
               hover:bg-amber-200/50 dark:hover:bg-yellow-400/20
               rounded-full p-0 transition-all duration-300
               ring-1 ring-amber-200/50 dark:ring-yellow-400/20"  
      >
        <Icon :name="sosmedItem.icon" class="w-6 h-6"/>
      </a>

      <!-- Tooltip -->
      <span
        class="absolute left-full top-1/2 transform -translate-y-1/2 z-20
               mx-3 px-4 py-2 text-sm font-bold text-white
               bg-gray-900 rounded-lg shadow-lg
               transition-transform duration-300 ease-in-out
               scale-0 group-hover:scale-100"
      >
        {{ sosmedItem.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

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