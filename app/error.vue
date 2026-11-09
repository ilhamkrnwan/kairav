<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { t } = useI18n()
const router = useRouter()

const errorMessages: Record<number, { firstPart: string, secondPart: string, description: string }> = {
  404: {
    firstPart: t('Page Not'),
    secondPart: t('Found'),
    description: t('Sorry, the page you\'re looking for doesn\'t exist.')
  },
  500: {
    firstPart: t('Server'),
    secondPart: t('Error'),
    description: t('Something went wrong on our end. Please try again later.')
  },
  403: {
    firstPart: t('Access'),
    secondPart: t('Forbidden'),
    description: t('You don\'t have permission to access this resource.')
  }
}

const errorInfo = computed(() => {
  const statusCode = props.error.statusCode || 500
  return (
    errorMessages[statusCode] || {
      firstPart: t('Error'),
      secondPart: String(statusCode),
      description: props.error.message || t('An unexpected error occurred.')
    }
  )
})

const handleClearError = () => clearError({ redirect: '/' })

</script>

<template>
  <UApp>
    <div class="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden bg-default text-highlighted">
      <AppHeader />

      <!-- Fixed background pattern -->
      <div class="absolute inset-0 -z-10 bg-default" />

      <div class="text-center max-w-2xl w-full z-10 py-16">
        <!-- Error Illustration -->
        <div class="mb-8 relative flex flex-col items-center justify-center">
          <!-- Decorative blobs -->
        
          <div class="relative max-w-xs md:max-w-md flex items-center justify-center">
            <NuxtImg src="/error.avif" alt="Error Illustration" class="w-full h-auto object-cover" />
          </div>
        </div>

        <!-- Error Title (Hero Stretched Style) -->
        <h1 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-6">
          <span class="section-title-filled">{{ errorInfo.firstPart }}</span>
          <span class="section-title-outline">{{ errorInfo.secondPart }}<span class="text-primary">.</span></span>
        </h1>

        <!-- Error Description -->
        <p class="text-lg md:text-xl text-muted mb-8 max-w-lg mx-auto leading-relaxed">
          {{ errorInfo.description }}
        </p>

        <!-- Decorative Line -->
        <div class="flex items-center justify-center gap-2 mb-8">
          <div class="w-12 h-0.5 bg-linear-to-r from-transparent to-primary rounded-full"></div>
          <UIcon name="lucide:sparkles" class="size-4 text-primary" />
          <div class="w-12 h-0.5 bg-linear-to-l from-transparent to-primary rounded-full"></div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UiArrowButton
            variant="primary"
            icon="lucide:home"
            @click="handleClearError"
          >
            {{ t('Go to Home') }}
          </UiArrowButton>

          <UiArrowButton
            variant="secondary"
            icon="lucide:arrow-left"
            @click="router.back()"
          >
            {{ t('Go Back') }}
          </UiArrowButton>
        </div>
      </div>
    </div>
  </UApp>
</template>
