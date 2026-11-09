<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="contact" class="w-full pt-16 pb-12 px-4 sm:px-6 lg:px-12 scroll-mt-20">
    <div class="max-w-7xl mx-auto">
      <div
        class="relative w-full rounded-lg overflow-hidden bg-lemon text-ink border border-ink p-6 sm:p-10 lg:p-12"
      >
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <!-- 3D Developer Avatar (Left Side, 4 cols) -->
          <div class="lg:col-span-4 flex items-end justify-center lg:justify-start -mb-6 lg:-mb-12 pt-2">
            <div class="relative group">
              <NuxtImg
                src="/developer-cta-avatar.avif"
                alt="Ilham Kurniawan 3D Developer Avatar"
                width="420"
                height="380"
                format="webp"
                loading="lazy"
                class="relative z-10 w-60 sm:w-72 lg:w-80 max-h-72 sm:max-h-80 object-contain group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          </div>

          <!-- Content (Right Side, 8 cols) -->
          <div class="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
            <h2 :key="$i18n.locale" class="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight text-ink">
              {{ t('cta.title') }}
            </h2>

            <p class="text-sm sm:text-base lg:text-lg text-ink/80 max-w-2xl leading-relaxed">
              {{ t('cta.description') }}
            </p>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <UiArrowButton
                href="https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20punya%20ide%20proyek%20digital%20dan%20ingin%20konsultasi."
                target="_blank"
                rel="noopener noreferrer"
                variant="ink"
                icon="lucide:arrow-up-right"
              >
                <template #leading>
                  <UIcon name="simple-icons:whatsapp" class="size-4" />
                </template>
                {{ t('cta.button_consult') }}
              </UiArrowButton>

              <UiArrowButton
                to="/contact"
                variant="secondary"
                icon="lucide:arrow-right"
              >
                <template #leading>
                  <UIcon name="lucide:mail" class="size-4" />
                </template>
                {{ t('cta.button_contact') }}
              </UiArrowButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
