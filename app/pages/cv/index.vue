<script setup lang="ts">
const { t } = useI18n()

useDynamicSeo({
  titleKey: 'seo.cv.title',
  descriptionKey: 'seo.cv.description'
})
useScrollReveal()

const cvDownloadUrl = 'https://drive.google.com/uc?id=1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO&export=download'
const cvPreviewUrl = 'https://drive.google.com/file/d/1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO/preview'
</script>

<template>
  <div class="min-h-screen">

    <!-- ═══════════════════════════════════════
         HERO SECTION
    ════════════════════════════════════════ -->
    <section class="relative w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 overflow-hidden">
      <!-- Background decorative blobs -->

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <!-- Badge -->
        <!-- Main Heading -->
        <h1 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-8 animate-fade-in-up delay-100">
          <span class="section-title-filled block">{{ t('Curriculum') }}</span>
          <span class="block text-highlighted">
            <span class="section-title-outline">{{ t('Vitae') }}</span><span class="text-primary">.</span>
          </span>
        </h1>

        <!-- Subtitle -->
        <p class="text-base md:text-lg text-muted mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-normal">
          {{ t('A snapshot of my') }}
          <UiTextGradient class="font-medium">
            {{ t('skills, experience,') }}
          </UiTextGradient>
          {{ t('and') }}
          <UiTextGradient class="font-medium">
            {{ t('projects') }}
          </UiTextGradient>
          {{ t('that define my journey as a developer.') }}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up delay-300">
          <UiArrowButton
            :href="cvDownloadUrl"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            icon="lucide:download"
          >
            {{ t('Download CV') }}
          </UiArrowButton>

          <UiArrowButton
            to="/"
            variant="secondary"
            icon="lucide:home"
          >
            {{ t('Back to Home') }}
          </UiArrowButton>
        </div>
      </div>

      <!-- Scroll indicator -->
    </section>

    <!-- ═══════════════════════════════════════
         CV VIEWER SECTION
    ════════════════════════════════════════ -->
    <section id="cv-viewer" class="scroll-section will-change-[transform,opacity] py-20">
      <div class="container max-w-7xl mx-auto px-6 lg:px-8">

        <!-- Section label -->
        <USeparator
          :label="t('Preview')"
          class="stagger-item mb-10"
          :ui="{ border: 'border-accented/40', label: 'px-4 text-sm font-medium text-muted' }"
        />

        <!-- CV Embed Container -->
        <div class="relative group/cv rounded-xl overflow-hidden border border-default bg-elevated shadow-2xl stagger-item">
          <!-- Glow effect -->
          <div class="absolute -inset-0.5 bg-linear-to-br from-primary/20 via-transparent to-primary/10 rounded-xl opacity-0 group-hover/cv:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />

          <!-- Corner brackets -->
          <div class="absolute top-0 left-0 size-5 border-t-2 border-l-2 border-primary/60 z-10" />
          <div class="absolute top-0 right-0 size-5 border-t-2 border-r-2 border-primary/60 z-10" />
          <div class="absolute bottom-0 left-0 size-5 border-b-2 border-l-2 border-primary/60 z-10" />
          <div class="absolute bottom-0 right-0 size-5 border-b-2 border-r-2 border-primary/60 z-10" />

          <!-- Header bar -->
          <div class="relative z-10 flex items-center justify-between px-5 py-3 border-b border-default/40 bg-elevated">
            <div class="flex items-center gap-2">
              <span class="size-2.5 rounded-full bg-red-400/70" />
              <span class="size-2.5 rounded-full bg-primary/70" />
              <span class="size-2.5 rounded-full bg-primary/70" />
            </div>
            <span class="text-xs text-muted font-medium">
              cv_ilham_kurniawan.pdf
            </span>
            <UButton
              :href="cvDownloadUrl"
              icon="lucide:download"
              variant="link"
              color="primary"
              size="xs"
              class="p-0 text-xs font-medium"
            >
              {{ t('Download') }}
            </UButton>
          </div>

          <!-- iFrame -->
          <iframe
            :src="cvPreviewUrl"
            class="relative z-10 h-[80vh] w-full border-none"
            loading="lazy"
          />
        </div>

        <!-- Bottom CTA row -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 stagger-item">
          <UiArrowButton
            :href="cvDownloadUrl"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            icon="lucide:download"
          >
            {{ t('Download CV') }}
          </UiArrowButton>
          <UiArrowButton
            to="/about"
            variant="secondary"
            icon="lucide:user"
          >
            {{ t('See More About Me') }}
          </UiArrowButton>
        </div>

      </div>
    </section>

    <div class="scroll-section will-change-[transform,opacity] w-full">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }


</style>
