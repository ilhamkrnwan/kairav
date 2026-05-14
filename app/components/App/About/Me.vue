<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section class="section py-20 px-6 md:px-12 lg:px-20 overflow-hidden">
    <UiGlobalSpotlight
      container-selector=".about-me-container"
      card-selector=".animated-card"
      :glow-color="'251, 191, 36'"
      :spotlight-radius="400"
      :enabled="true"
    />
    <div class="max-w-6xl mx-auto about-me-container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Title area -->
        <div class="lg:col-span-4">
          <h2 class="leading-[0.88] tracking-tight mb-6">
            <span class="section-title-filled block">{{ t('About') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Me') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="w-12 h-1 bg-amber-400"></div>
        </div>
        
        <!-- Content area -->
        <div class="lg:col-span-8">
          <UiAnimatedCard
            :glow-color="'251, 191, 36'"
            :particle-count="8"
            :enable-particles="true"
            :enable-tilt="false"
            :enable-magnetism="false"
            :enable-border-glow="false"
            :click-effect="true"
          >
            <div class="p-8 md:p-12 rounded-sm bg-background/40 backdrop-blur-md border border-border/30 text-left shadow-lg relative group">
              <Icon name="lucide:quote" class="absolute top-6 right-6 w-12 h-12 text-border/20 group-hover:text-amber-400/10 transition-colors duration-500" />
              <p class="text-base md:text-lg text-muted-foreground leading-relaxed relative z-10 font-light">
                {{ t('I am an enthusiastic developer who thrives on') }}
                <span class="text-foreground font-medium">{{ t('transforming complex problems') }}</span>
                {{ t('into') }}
                <span class="text-foreground font-medium">{{ t('elegant digital solutions.') }}</span>
                <br/><br/>
                {{ t('With a passion for continuous learning and a strong foundation in modern web technologies, I focus on crafting') }}
                <span class="text-foreground font-medium">{{ t('scalable, accessible, and user-centric applications.') }}</span>
                <br/><br/>
                {{ t('Whether building responsive interfaces or resilient backends, my goal is to deliver products that have a') }}
                <span class="text-foreground font-medium">{{ t('meaningful impact.') }}</span>
              </p>
            </div>
          </UiAnimatedCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3.5rem, 8vw, 6rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}
</style>
