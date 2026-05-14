<script setup>
import { computed } from 'vue'

const { locale, setLocale } = useI18n()

const languages = [
  {
    code: 'en',
    label: 'English',
    icon: 'twemoji:flag-united-kingdom'//england
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
  background: 'bg-background/80 backdrop-blur-md',
  ring: 'ring-1 ring-border/40',
  padding: 'p-1',
  item: {
    base: 'gap-3 my-0.5 font-mono tracking-widest uppercase',
    rounded: 'rounded-sm',
    active: 'bg-foreground/5 dark:bg-foreground/10',
    size: 'text-[10px] font-medium',
    icon: {
      base: 'flex-shrink-0 w-4 h-4',
      active: 'text-amber-500'
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

.dark .lang-toggle-btn {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.4);
}

.lang-toggle-btn:hover {
  border-color: rgba(251, 191, 36, 0.5);
  background: rgba(251, 191, 36, 0.1);
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
