<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="section py-20 overflow-hidden">
    <UiGlobalSpotlight
      container-selector=".about-me-container"
      card-selector=".animated-card"
      :glow-color="'251, 191, 36'"
      :spotlight-radius="400"
      :enabled="true"
    />
    <div class="container mx-auto px-4 about-me-container">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-heading mb-8">
          {{ t('About') }} <span class="text-amber-400">{{ t('Me') }}</span>
        </h2>
        
        <UiAnimatedCard
          :glow-color="'251, 191, 36'"
          :particle-count="8"
          :enable-particles="true"
          :enable-tilt="false"
          :enable-magnetism="false"
          :enable-border-glow="false"
          :click-effect="true"
        >
          <div class="p-8 md:p-12 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 text-left md:text-center shadow-lg relative">
            <Icon name="lucide:quote" class="absolute top-6 left-6 w-12 h-12 text-amber-500/10" />
            <p class="text-base md:text-lg text-muted-foreground leading-relaxed relative z-10">
              {{ t('I am an enthusiastic developer who thrives on') }}
              <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3">
                {{ t('transforming complex problems') }}
              </UiTextGradient>
              {{ t('into') }}
              <UiTextGradient :colors="['#22D3EE', '#06B6D4', '#22D3EE']" :animation-speed="3">
                {{ t('elegant digital solutions.') }}
              </UiTextGradient>
              {{ t('With a passion for continuous learning and a strong foundation in modern web technologies, I focus on crafting') }}
              <UiTextGradient :colors="['#34D399', '#10B981', '#34D399']" :animation-speed="3">
                {{ t('scalable, accessible, and user-centric applications.') }}
              </UiTextGradient>
              {{ t('Whether building responsive interfaces or resilient backends, my goal is to deliver products that have a') }}
              <UiTextGradient :colors="['#A78BFA', '#8B5CF6', '#A78BFA']" :animation-speed="3">
                {{ t('meaningful impact.') }}
              </UiTextGradient>
            </p>
          </div>
        </UiAnimatedCard>
      </div>
    </div>
  </section>
</template>
