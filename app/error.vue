<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const { t } = useI18n()

const errorMessages: Record<number, { title: string; description: string; icon: string }> = {
  404: {
    title: "Page Not Found",
    description: "Sorry, the page you're looking for doesn't exist.",
    icon: "lucide:search-x"
  },
  500: {
    title: "Server Error",
    description: "Something went wrong on our end. Please try again later.",
    icon: "lucide:server-crash"
  },
  403: {
    title: "Access Forbidden",
    description: "You don't have permission to access this resource.",
    icon: "lucide:shield-alert"
  },
};

const errorInfo = computed(() => {
  const statusCode = props.error.statusCode || 500;
  return (
    errorMessages[statusCode] || {
      title: `Error ${statusCode}`,
      description: props.error.message || "An unexpected error occurred.",
      icon: "lucide:alert-triangle"
    }
  );
});
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <div class="text-center max-w-2xl w-full">
      <!-- Error Icon with Animation -->
      <div class="mb-8 relative">
        <!-- Decorative blobs -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] rounded-full bg-linear-to-tr from-amber-400/10 to-orange-500/10 blur-3xl -z-10 animate-pulse"></div>
        
          
          <!-- Status Code Badge -->
          <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg">
            <span class="text-sm font-mono font-bold text-amber-400">
              {{ error.statusCode || "ERROR" }}
            </span>
          </div>
      </div>

      <!-- Error Title -->
      <h1 class="text-4xl md:text-6xl font-heading mb-4 text-foreground">
        {{ errorInfo.title }}
      </h1>

      <!-- Error Description -->
      <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
        {{ errorInfo.description }}
      </p>

      <!-- Decorative Line -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400 rounded-full"></div>
        <Icon name="lucide:sparkles" class="w-4 h-4 text-amber-400" />
        <div class="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400 rounded-full"></div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <UiAnimatedButton href="/" variant="primary">
          <template #iconLeft>
            <Icon name="lucide:home" class="w-4 h-4" />
          </template>
          <template #default>{{ t('Go to Home') }}</template>
        </UiAnimatedButton>

        <UiAnimatedButton @click="() => $router.back()" variant="outline">
          <template #iconLeft>
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
          </template>
          <template #default>{{ t('Go Back') }}</template>
        </UiAnimatedButton>
      </div>

      <!-- Error Details Card (Optional) -->
      <UiAnimatedCard
        v-if="error.message"
        :glow-color="'251, 191, 36'"
        :particle-count="6"
        :enable-particles="false"
        :enable-tilt="false"
        :enable-magnetism="false"
        :enable-border-glow="true"
        :click-effect="false"
        class="max-w-md mx-auto"
      >
      </UiAnimatedCard>

      <!-- Additional Info -->
      <div class="mt-8">
        <span class="inline-flex items-center px-4 py-2 space-x-2 text-sm border rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-amber-400/30 transition-colors duration-300">
          <Icon name="lucide:help-circle" class="w-4 h-4 text-amber-400" />
          <span class="text-muted-foreground">
            {{ t('If you think this is a mistake, please contact support') }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
