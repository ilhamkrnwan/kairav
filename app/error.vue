<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const errorMessages: Record<number, { title: string; description: string }> = {
  404: {
    title: "Page Not Found",
    description: "Sorry, the page you're looking for doesn't exist.",
  },
  500: {
    title: "Server Error",
    description: "Something went wrong on our end. Please try again later.",
  },
  403: {
    title: "Access Forbidden",
    description: "You don't have permission to access this resource.",
  },
};

const errorInfo = computed(() => {
  const statusCode = props.error.statusCode || 500;
  return (
    errorMessages[statusCode] || {
      title: `Error ${statusCode}`,
      description: props.error.message || "An unexpected error occurred.",
    }
  );
});
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4"
  >
    <div class="text-center max-w-md">
      <!-- Error Icon -->
      <div class="mb-8">
        <div
          class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-6"
        >
          <div class="text-5xl font-bold text-red-600 dark:text-red-400">
            {{ error.statusCode || "!" }}
          </div>
        </div>
      </div>

      <!-- Error Title -->
      <h1
        class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
      >
        {{ errorInfo.title }}
      </h1>

      <!-- Error Description -->
      <p class="text-lg text-slate-600 dark:text-slate-400 mb-8">
        {{ errorInfo.description }}
      </p>

      <!-- Decorative Line -->
      <div
        class="w-12 h-1 bg-linear-to-r from-red-500 to-red-600 rounded-full mx-auto mb-8"
      ></div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink
          to="/home"
          class="px-6 py-3 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Go to Home
        </NuxtLink>
        <button
          class="px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
          @click="() => $router.back()"
        >
          Go Back
        </button>
      </div>

      <!-- Additional Info -->
      <p class="text-sm text-slate-500 dark:text-slate-500 mt-8">
        If you think this is a mistake, please contact our support team.
      </p>
    </div>
  </div>
</template>
