<script setup>
import { computed } from 'vue'

const { locale } = useI18n()

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

const items = computed(() => {
  return [languages.map(lang => ({
    label: lang.label,
    icon: lang.icon,
    click: () => selectLanguage(lang)
  }))]
})

const selectLanguage = (lang) => {
  if (locale.value !== lang.code) {
    locale.value = lang.code
  }
}
</script>

<template>
  <div class="lang-switcher-container">
    <UDropdownMenu :items="items" :popper="{ placement: 'bottom-start' }">
      <button class="lang-toggle-btn" aria-label="Change language">
        <Icon name="heroicons:language-20-solid" class="w-5 h-5" />
        <span class="lang-text">{{ currentLanguage.label }}</span>
        <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4" />
      </button>
    </UDropdownMenu>
  </div>
</template>

<style scoped>
/* Language Switcher Container */
.lang-switcher-container {
  position: fixed;
  top: 20px;
  left: 220px;
  z-index: 100;
}

/* Language Toggle Button - Subtle Pill Style */
.lang-toggle-btn {
  position: relative;
  z-index: 100;
  height: 50px;
  padding: 0 1rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: none;
}

:global(.dark) .lang-toggle-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.lang-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
}

:global(.dark) .lang-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.08);
}

.lang-text {
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);
  white-space: nowrap;
}

:global(.dark) .lang-text {
  color: rgba(255, 255, 255, 0.7);
}

/* Icon colors */
.lang-toggle-btn :deep(svg) {
  color: rgba(0, 0, 0, 0.5);
}

:global(.dark) .lang-toggle-btn :deep(svg) {
  color: rgba(255, 255, 255, 0.5);
}

/* Responsive */
@media (max-width: 640px) {
  .lang-switcher-container {
    top: 15px;
    left: 135px;
  }
  
  .lang-toggle-btn {
    height: 45px;
    padding: 0 0.875rem;
  }
  
  .lang-text {
    font-size: 0.8125rem;
  }
}

@media (min-width: 768px) {
  .lang-switcher-container {
    left: 220px;
  }
}

@media (min-width: 1024px) {
  .lang-switcher-container {
    left: 220px;
  }
}
</style>
