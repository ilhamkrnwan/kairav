<template>
  <nav
    :class="[
      'bg-transparent fixed w-full transition-all duration-300',
      {
        'bg-opacity-90 bg-white dark:bg-black shadow-md': isScrolled,
        'bg-opacity-50': !isScrolled
      }
    ]"
  >
    <div class="container mx-auto p-4 flex justify-between items-center">
      <!-- Logo Section -->
      <div class="flex items-center">
        <p class="text-xl font-semibold text-slate-800 dark:text-primary-dark px-4">
          KAIRAV
          <span>
            <DarkModeToggle />
          </span>
        </p>
      </div>

      <!-- Menu Toggle Section -->
      <div class="flex items-center">
        <FullScreenMenu />
      </div>
    </div>
  </nav>
</template>

<script>
import FullScreenMenu from '~/components/FullScreenMenu.vue'

export default {
  components: {
    FullScreenMenu
  },
  data() {
    return {
      isScrolled: false
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
nav {
  top: 0;
  z-index: 50;
}

/* Hover hint */
.flex.items-center:hover {
  cursor: pointer;
}
</style>
