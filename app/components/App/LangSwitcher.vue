<script setup>
import { computed } from 'vue'

const { locale, setLocale } = useI18n()

const languages = [
  {
    code: 'en',
    label: 'English',
    icon: 'twemoji:flag-united-states'
  },
  {
    code: 'id',
    label: 'Bahasa Indonesia',
    icon: 'twemoji:flag-indonesia'
  }
]

const currentLanguage = computed(() => {
  return languages.find(l => l.code === locale.value) || languages[0]
})

const selectLanguage = async (lang) => {
  if (locale.value !== lang.code) {
    try {
      await setLocale(lang.code)
      // Simpan preferensi bahasa ke localStorage
      if (process.client) {
        localStorage.setItem('user-locale', lang.code)
      }
    } catch (error) {
      console.error('Failed to change language:', error)
    }
  }
}

const items = computed(() => {
  return [languages.map(lang => ({
    label: lang.label,
    icon: lang.icon,
    onSelect: () => selectLanguage(lang),
    class: locale.value === lang.code ? 'text-amber-600 dark:text-yellow-400 bg-amber-50 dark:bg-yellow-400/10' : ''
  }))]
})

// Custom Styling for Dropdown
const dropdownUi = {
  width: 'min-w-[180px]',
  background: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl',
  ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
  padding: 'p-1.5',
  item: {
    base: 'gap-3 my-0.5',
    rounded: 'rounded-lg',
    active: 'bg-gray-100 dark:bg-gray-800',
    size: 'text-sm font-medium',
    icon: {
      base: 'flex-shrink-0 w-5 h-5',
      active: 'text-amber-500 dark:text-yellow-400'
    }
  }
}
</script>

<template>
  <div class="lang-switcher-container">
    <UDropdownMenu 
      :items="items" 
      :ui="dropdownUi" 
      :popper="{ placement: 'bottom-start', offsetDistance: 8 }"
    >
      <button class="lang-toggle-btn" aria-label="Change language">
        <Icon :name="currentLanguage.icon" class="w-6 h-6" />
      </button>
    </UDropdownMenu>
  </div>
</template>

<style scoped>
/* Language Switcher Container */
.lang-switcher-container {
  position: fixed;
  top: 20px;
  left: 90px;
  z-index: 100;
}

/* Language Toggle Button - Blob Style */
.lang-toggle-btn {
  position: relative;
  z-index: 10001;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  background: transparent;
}

.lang-toggle-btn::before {
  content: '';
  position: absolute;
  inset: -25%;
  width: 150%;
  height: 150%;
  background-image: url('/blob-lb2.svg');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  transition: all 0.3s ease;
}

.lang-toggle-btn:hover {
  transform: scale(1.1);
}

.lang-toggle-btn:hover::before {
  transform: rotate(-5deg);
}

/* Icon Styles */
.lang-toggle-btn :deep(svg) {
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));
}

/* Responsive */
@media (max-width: 640px) {
  .lang-switcher-container {
    top: 15px;
    left: 75px;
  }
  
  .lang-toggle-btn {
    height: 45px;
    width: 45px;
  }
}
</style>
