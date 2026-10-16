<script setup>
const { t } = useI18n()
</script>

<template>
  <section id="contact" class="w-full pt-16 pb-12 px-4 sm:px-6 lg:px-12 scroll-mt-20">
    <div class="max-w-7xl mx-auto">
      <div
        class="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 via-[#131313] to-neutral-950 text-white shadow-2xl border border-amber-400/25 p-6 sm:p-10 lg:p-12 transition-all duration-300"
      >
        <!-- Background Organic Wave SVG with Amber/Gold Accent -->
        <div aria-hidden="true" class="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
          <svg class="w-full h-full object-cover" viewBox="0 0 1000 500" fill="none" preserveAspectRatio="none">
            <path
              d="M0,250 C300,100 500,400 1000,150 L1000,500 L0,500 Z"
              fill="url(#wave-gradient)"
            />
            <path
              d="M0,350 C350,200 650,450 1000,280 L1000,500 L0,500 Z"
              fill="rgba(245, 158, 11, 0.08)"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.2" />
                <stop offset="100%" stop-color="#FBBF24" stop-opacity="0.04" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <!-- 3D Developer Avatar (Left Side, 4 cols) -->
          <div class="lg:col-span-4 flex items-end justify-center lg:justify-start -mb-6 lg:-mb-12 pt-2">
            <div class="relative group">
              <!-- Soft ambient backdrop glow in Amber -->
              <div
                class="absolute inset-0 rounded-full bg-amber-400/15 blur-2xl transform scale-90 group-hover:scale-110 transition-transform duration-500"
              />
              <NuxtImg
                src="/developer-cta-avatar.avif"
                alt="Ilham Kurniawan 3D Developer Avatar"
                width="420"
                height="380"
                format="webp"
                loading="lazy"
                class="relative z-10 w-60 sm:w-72 lg:w-80 max-h-72 sm:max-h-80 object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.45)] transform group-hover:scale-[1.03] transition-transform duration-500"
              />
            </div>
          </div>

          <!-- Content (Right Side, 8 cols) -->
          <div class="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6">
            <h2 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              {{ t('cta.title') }}
            </h2>

            <p class="text-sm sm:text-base lg:text-lg text-neutral-300/85 max-w-2xl font-light leading-relaxed">
              {{ t('cta.description') }}
            </p>

            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <UiArrowButton
                href="https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20punya%20ide%20proyek%20digital%20dan%20ingin%20konsultasi."
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                icon="lucide:arrow-up-right"
              >
                <template #leading>
                  <Icon name="simple-icons:whatsapp" class="w-4 h-4 text-neutral-950" />
                </template>
                {{ t('cta.button_consult') }}
              </UiArrowButton>

              <UiArrowButton
                to="/contact"
                variant="secondary"
                icon="lucide:arrow-right"
              >
                <template #leading>
                  <Icon name="lucide:mail" class="w-4 h-4 text-foreground" />
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
