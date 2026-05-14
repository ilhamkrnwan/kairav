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
  <section id="features" class="section py-20 px-6 md:px-12 lg:px-20 overflow-hidden text-gray-800 dark:text-white">
    <UiGlobalSpotlight
      container-selector=".features-container"
      card-selector=".animated-card"
      :glow-color="'251, 191, 36'"
      :spotlight-radius="400"
      :enabled="true"
    />
    <div class="max-w-6xl mx-auto features-container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Title Area -->
        <div class="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <h2 class="leading-[0.88] tracking-tight mb-6">
            <span class="section-title-filled block">{{ t('End-to-End') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Capabilities') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="w-12 h-1 bg-amber-400 mb-6"></div>
          <p class="text-sm font-mono tracking-wider text-muted-foreground leading-relaxed">
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
        <div class="lg:col-span-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                class="group relative p-6 rounded-sm bg-background/40 backdrop-blur-md border border-border/30 hover:bg-background/60 transition-all duration-300 h-full shadow-lg"
              >
                <!-- Icon -->
                <div
                  class="w-14 h-14 mb-6 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center group-hover:from-amber-400/20 group-hover:to-orange-500/20 transition-all duration-300"
                >
                  <Icon
                    :name="feature.icon"
                    class="w-6 h-6 text-amber-400"
                  />
                </div>

                <!-- Title -->
                <h3 class="text-xl font-heading font-semibold mb-3 text-foreground tracking-wide">
                  {{ feature.title }}
                </h3>

                <!-- Description -->
                <p class="text-sm font-light text-muted-foreground leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </UiAnimatedCard>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}
</style>
