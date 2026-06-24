<script setup lang="ts">
const { t } = useI18n()

const contactMethods = [
  {
    label: 'WhatsApp',
    value: '+62 877-6129-6676',
    href: 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20ingin%20diskusi%20project.',
    icon: 'lucide:message-circle',
  },
  {
    label: 'Email',
    value: 'ilhamkurniawanjateng@gmail.com',
    href: 'mailto:ilhamkurniawanjateng@gmail.com',
    icon: 'lucide:mail',
  },
  {
    label: 'LinkedIn',
    value: 'ilham-kurniawan',
    href: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/',
    icon: 'lucide:linkedin',
  },
  {
    label: 'GitHub',
    value: 'ilhamkrnwan',
    href: 'https://github.com/ilhamkrnwan',
    icon: 'lucide:github',
  },
]

const projectScopes = computed(() => [
  t('Website Bisnis & Branding Online'),
  t('Custom Dashboard & Sistem Internal'),
  t('Fullstack Web Application'),
  t('Third-Party & AI Integration'),
])

const locations = computed(() => [
  {
    city: t('Kedungtuban, Blora'),
    region: t('Jawa Tengah'),
    description: t('Base kerja untuk kolaborasi remote, konsultasi project, dan koordinasi digital dengan client dari berbagai kota.'),
    mapLabel: t('Peta area Kedungtuban, Blora'),
    mapSrc: 'https://www.google.com/maps?q=Kedungtuban%2C%20Blora%2C%20Jawa%20Tengah&output=embed',
  },
  {
    city: t('Sleman'),
    region: t('Yogyakarta'),
    description: t('Area kerja fleksibel untuk meeting online, diskusi product, dan kolaborasi hybrid bila dibutuhkan.'),
    mapLabel: t('Peta area Sleman, Yogyakarta'),
    mapSrc: 'https://www.google.com/maps?q=Kabupaten%20Sleman%2C%20Daerah%20Istimewa%20Yogyakarta&output=embed',
  },
])

useDynamicSeo({
  titleKey: 'seo.contact.title',
  descriptionKey: 'seo.contact.description'
})

// Initialize Scroll Reveal Animations
useScrollReveal()
</script>

<template>
  <main class="min-h-screen">
    <section class="scroll-section will-change-[transform,opacity] relative w-full min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-28 overflow-hidden">
      <div class="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-5 stagger-item">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-border/40 bg-background/60 backdrop-blur-sm mb-8">
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
            </span>
            <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">{{ t('Project inquiry') }}</span>
          </div>

          <h1 class="leading-[0.88] tracking-tight mb-8">
            <span class="section-title-filled block">{{ t('Contact') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Start Here') }}<span class="text-amber-400 !important">.</span></span>
          </h1>

          <p class="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed font-light mb-10">
            {{ t('Tell me what you are building, what is currently blocking the product, and what outcome you want to reach. I will help map the next practical step.') }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="scope in projectScopes"
              :key="scope"
              class="inline-flex items-center px-3 py-1.5 rounded-sm border border-border/40 bg-background/50 text-[10px] font-mono uppercase tracking-widest text-foreground"
            >
              {{ scope }}
            </span>
          </div>
        </div>

        <div class="lg:col-span-7 stagger-item">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              v-for="method in contactMethods"
              :key="method.label"
              :href="method.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group rounded-sm border border-border/40 bg-background/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-amber-400/50 hover:bg-background/80"
            >
              <div class="flex items-start justify-between gap-4 mb-8">
                <div class="w-12 h-12 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center">
                  <Icon :name="method.icon" class="w-5 h-5 text-amber-400" />
                </div>
                <Icon name="lucide:arrow-up-right" class="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-400" />
              </div>
              <p class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {{ method.label }}
              </p>
              <p class="text-base font-heading font-semibold text-foreground break-words">
                {{ method.value }}
              </p>
            </a>
          </div>

          <div class="mt-6 rounded-sm border border-border/40 bg-background/50 backdrop-blur-sm p-6">
            <p class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
              {{ t('Best message format') }}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <p class="font-heading text-foreground mb-2">{{ t('Context') }}</p>
                <p>{{ t('Briefly explain the product, audience, and current stage.') }}</p>
              </div>
              <div>
                <p class="font-heading text-foreground mb-2">{{ t('Need') }}</p>
                <p>{{ t('Mention the service area, deadline, and existing materials.') }}</p>
              </div>
              <div>
                <p class="font-heading text-foreground mb-2">{{ t('Outcome') }}</p>
                <p>{{ t('Share the result you want users or the business to feel.') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="scroll-section will-change-[transform,opacity] px-6 md:px-12 lg:px-20 pb-28">
      <div class="max-w-6xl mx-auto">
        <div class="mb-10 max-w-3xl stagger-item">
          <p class="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
            {{ t('Location & Availability') }}
          </p>
          <h2 class="text-3xl md:text-5xl font-heading font-black uppercase tracking-tight mb-5">
            {{ t('Fleksibel untuk remote, hybrid, dan kolaborasi project.') }}
          </h2>
          <p class="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
            {{ t('Lokasi saya berada di Kedungtuban, Blora dan Sleman, Yogyakarta. Untuk project, konsultasi, dan kolaborasi, saya tetap fleksibel melayani client secara remote melalui meeting online, WhatsApp, dan workflow digital.') }}
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-item">
          <div
            v-for="location in locations"
            :key="location.city"
            class="rounded-sm border border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden"
          >
            <div class="p-6">
              <div class="flex items-start justify-between gap-4 mb-5">
                <div class="w-12 h-12 rounded-sm bg-linear-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 flex items-center justify-center">
                  <Icon name="lucide:map-pin" class="w-5 h-5 text-amber-400" />
                </div>
                <span class="inline-flex items-center px-2 py-1 rounded-sm border border-border/40 bg-background/70 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {{ t('Area umum') }}
                </span>
              </div>
              <h3 class="text-2xl font-heading font-semibold text-foreground mb-1">
                {{ location.city }}
              </h3>
              <p class="text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
                {{ location.region }}
              </p>
              <p class="text-sm text-muted-foreground leading-relaxed">
                {{ location.description }}
              </p>
            </div>
            <div class="border-t border-border/40 bg-background/40 p-3">
              <div class="aspect-video overflow-hidden rounded-sm border border-border/40">
                <iframe
                  :src="location.mapSrc"
                  :title="location.mapLabel"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  class="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 rounded-sm border border-amber-400/30 bg-amber-400/10 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5 stagger-item">
          <div>
            <p class="text-sm font-mono uppercase tracking-widest text-amber-400 mb-2">
              {{ t('Online meeting ready') }}
            </p>
            <p class="text-sm md:text-base text-foreground/80 leading-relaxed">
              {{ t('Meeting bisa dilakukan online untuk discovery, review progress, dan handover project tanpa perlu bertemu langsung.') }}
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20ingin%20konsultasi%20project."
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 rounded-sm bg-amber-400 px-5 py-3 text-xs font-mono font-bold uppercase tracking-widest text-black transition-colors hover:bg-amber-500"
            >
              {{ t('Konsultasi via WhatsApp') }}
              <Icon name="lucide:message-circle" class="w-4 h-4" />
            </a>
            <a
              href="mailto:ilhamkurniawanjateng@gmail.com"
              class="inline-flex items-center justify-center gap-2 rounded-sm border border-border/40 bg-background/70 px-5 py-3 text-xs font-mono font-bold uppercase tracking-widest text-foreground transition-colors hover:border-amber-400/50 hover:text-amber-400"
            >
              {{ t('Kirim Email') }}
              <Icon name="lucide:mail" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
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
