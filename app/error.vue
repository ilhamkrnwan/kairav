<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const router = useRouter()

const errorInfo = computed(() => {
  const statusCode = props.error.statusCode || 500
  if (statusCode === 404) {
    return { title: t('Page Not Found'), description: t('Sorry, the page you\'re looking for doesn\'t exist.') }
  }
  if (statusCode === 403) {
    return { title: t('Access Forbidden'), description: t('You don\'t have permission to access this resource.') }
  }
  if (statusCode === 500) {
    return { title: t('Server Error'), description: t('Something went wrong on our end. Please try again later.') }
  }
  return { title: `${t('Error')} ${statusCode}`, description: t('An unexpected error occurred.') }
})

const handleClearError = () => clearError({ redirect: '/' })

</script>

<template>
  <UApp>
    <div class="site-shell min-h-screen bg-default text-highlighted">
      <AppHeader />

      <main id="main-content" tabindex="-1" class="site-frame detail-masthead">
        <div class="detail-masthead-copy">
          <h1 class="editorial-title">{{ errorInfo.title }}</h1>
          <p class="max-w-lg text-lg text-muted">{{ errorInfo.description }}</p>
          <div class="flex flex-wrap gap-3">
            <UiArrowButton icon="lucide:home" @click="handleClearError">
              {{ t('Go to Home') }}
            </UiArrowButton>
            <UiArrowButton variant="secondary" icon="lucide:arrow-left" @click="router.back()">
              {{ t('Go Back') }}
            </UiArrowButton>
          </div>
        </div>
        <div class="detail-mascot">
          <LazyUiMascot name="kairav" :size="220" label="Kairav" hydrate-on-visible />
        </div>
      </main>
    </div>
  </UApp>
</template>
