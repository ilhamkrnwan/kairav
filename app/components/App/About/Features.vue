<script setup lang="ts">
import { Icon } from "#components";

const { t } = useI18n()

const features = computed(() => [
  {
    icon: "lucide:database",
    title: t('Backend & API Architecture'),
    description: t('Not just storing data. Designing a secure, scalable backend foundation ready to support business growth.'),
  },
  {
    icon: "lucide:layout-template",
    title: t('Web Application Development'),
    description: t('Translating complex system logic into modern web applications that are responsive, fast, and easy to maintain.'),
  },
  {
    icon: "lucide:tablet-smartphone",
    title: t('Mobile App Experiences'),
    description: t('Bringing digital solutions right to the user\'s fingertips with smooth and seamless performance.'),
  },
  {
    icon: "lucide:palette",
    title: t('Functional UI/UX Design'),
    description: t('Design driven by data and user psychology. Not just aesthetic, but focused on conversion ease and functionality.'),
  },
])
</script>

<template>
  <section id="features" class="section w-full py-6 px-2">
    <UiGlobalSpotlight
      container-selector=".features-container"
      card-selector=".animated-card"
      :glow-color="'251, 191, 36'"
      :spotlight-radius="400"
      :enabled="true"
    />
    <div class="container mx-auto">
      <div class="max-w-6xl mx-auto features-container">

        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-heading mb-4">
            {{ t('End-to-End') }} <span class="text-amber-600 dark:text-amber-400">{{ t('Development Capabilities') }}</span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {{ t('Building a digital ecosystem from the') }}
            <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3">
              {{ t('deepest data structure') }}
            </UiTextGradient>
            {{ t('to the') }}
            <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3">
              {{ t('foremost user interaction.') }}
            </UiTextGradient>
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UiAnimatedCard
            v-for="(feature, index) in features"
            :key="index"
            :glow-color="'251, 191, 36'"
            :particle-count="8"
            :enable-particles="true"
            :enable-tilt="false"
            :enable-magnetism="false"
            :enable-border-glow="false"
            :click-effect="true"
          >
            <div
              class="group relative p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 transition-all duration-300 h-full"
            >
              <!-- Icon -->
              <div
                class="w-16 h-16 mb-4 rounded-lg bg-linear-to-br from-amber-400/10 to-orange-500/10 flex items-center justify-center group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-300"
              >
                <Icon
                  :name="feature.icon"
                  class="w-8 h-8 text-amber-400"
                />
              </div>

              <!-- Title -->
              <h3 class="text-xl font-semibold mb-2 text-foreground">
                {{ feature.title }}
              </h3>

              <!-- Description -->
              <p class="text-sm text-muted-foreground mb-4 leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </UiAnimatedCard>
        </div>

        <!-- Additional Note -->
        <div class="mt-16 text-center">
          <span class="inline-flex items-center px-4 py-2 space-x-2 text-sm border rounded-full border-border/50 bg-background/50 backdrop-blur-sm dark:border-gray-700 dark:bg-zinc-800/50 transition-colors duration-300">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span class="font-medium text-gray-600 dark:text-gray-200">
              {{ t('Delivering excellence across all aspects of software development') }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Additional hover effects can be added here if needed */
</style>
