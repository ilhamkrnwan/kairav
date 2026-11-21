<script setup lang="ts">
const { t } = useI18n()

useDynamicSeo({
  titleKey: 'seo.cv.title',
  descriptionKey: 'seo.cv.description'
})

const cvDownloadUrl = 'https://drive.google.com/uc?id=1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO&export=download'
const cvPreviewUrl = 'https://drive.google.com/file/d/1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO/preview'
</script>

<template>
  <div class="min-h-screen">

    <!-- ═══════════════════════════════════════
         HERO SECTION
    ════════════════════════════════════════ -->
    <UiEditorialIntro title="Curriculum vitae">
      {{ t('A snapshot of my') }}
      {{ t('skills, experience,') }}
      {{ t('and') }}
      {{ t('projects') }}
      {{ t('that define my journey as a developer.') }}
      <template #actions>
        <UiArrowButton
          :href="cvDownloadUrl"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          icon="lucide:download"
        >
          {{ t('Download CV') }}
        </UiArrowButton>
      </template>
    </UiEditorialIntro>

    <!-- ═══════════════════════════════════════
         CV VIEWER SECTION
    ════════════════════════════════════════ -->
    <section id="cv-viewer" class="site-frame editorial-section catalogue">
      <div>

        <!-- Section label -->
        <USeparator
          :label="t('Preview')"
          class="mb-10"
          :ui="{ border: 'border-accented/40', label: 'px-4 text-sm font-medium text-muted' }"
        />

        <div class="overflow-hidden border border-default bg-elevated">
          <!-- Header bar -->
          <div class="relative z-10 flex items-center justify-between px-5 py-3 border-b border-default/40 bg-elevated">
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
            :title="t('Preview') + ' CV'"
            class="relative z-10 h-[80vh] w-full border-none"
            loading="lazy"
          />
        </div>

        <!-- Bottom CTA row -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 ">
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

    <div class="w-full">
      <GetinTouch />
    </div>
  </div>
</template>

<style scoped>
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }


</style>
