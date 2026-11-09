<script setup lang="ts">
const { t, locale } = useI18n()

const email = 'ilhamkurniawanjateng@gmail.com'

const currentYear = new Date().getFullYear()

interface FooterLink { label: string, enLabel: string, to: string }

const menuLinks: FooterLink[] = [
  { label: 'Layanan', enLabel: 'Services', to: '/services' },
  { label: 'Portofolio', enLabel: 'Work', to: '/portofolio' },
  { label: 'Tentang', enLabel: 'About', to: '/about' },
  { label: 'Tulisan', enLabel: 'Words', to: '/blogs' },
  { label: 'Galeri', enLabel: 'Gallery', to: '/gallery' },
  { label: 'Kontak', enLabel: 'Contact', to: '/contact' }
]

const serviceLinks: FooterLink[] = [
  { label: 'Pengembangan Website', enLabel: 'Web Development', to: '/services' },
  { label: 'Pengembangan Aplikasi Mobile', enLabel: 'Mobile App Development', to: '/services' },
  { label: 'Solusi AI/ML & Otomasi', enLabel: 'AI/ML & Automation Solutions', to: '/services' },
  { label: 'Custom Dashboard & Sistem', enLabel: 'Custom Dashboard & System', to: '/services' },
  { label: 'Desain UI/UX & Interaktif', enLabel: 'UI/UX & Interactive Design', to: '/services' }
]

const linkColumns = [
  { key: 'footer.menu', class: 'lg:col-span-2', links: menuLinks },
  { key: 'footer.services', class: 'lg:col-span-3', links: serviceLinks }
]

const contactLinks = [
  { name: 'WhatsApp', icon: 'simple-icons:whatsapp', to: 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20ingin%20konsultasi%20proyek.' },
  { name: 'Email', icon: 'lucide:mail', to: `mailto:${email}` },
  { name: 'Instagram', icon: 'lucide:instagram', to: 'https://www.instagram.com/ilhamkrnwan__' },
  { name: 'LinkedIn', icon: 'simple-icons:linkedin', to: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/' },
  { name: 'GitHub', icon: 'simple-icons:github', to: 'https://github.com/ilhamkrnwan' }
]

const linkClass = 'p-0 font-normal text-highlighted/80 hover:text-primary dark:hover:text-primary'
const headingClass = 'text-sm font-semibold text-highlighted'
const localized = (item: FooterLink) => (locale.value === 'id' ? item.label : item.enLabel)
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <div class="relative">
    <AppHeader />

    <UMain class="relative min-h-screen flex flex-col justify-between">
      <!-- Fixed background pattern -->
      <div data-paper-bg class="fixed inset-0 -z-10 bg-default" />

      <!-- Content -->
      <div data-locale-swap class="flex-1 w-full pt-20">
        <slot />
      </div>

      <!-- Site Footer -->
      <footer
        id="site-footer"
        data-locale-swap
        class="relative w-full border-t-2 border-default bg-elevated text-highlighted overflow-hidden"
      >

        <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-8 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
            <!-- Brand & personal info -->
            <div class="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div class="space-y-4">
                <ULink to="/" raw class="group inline-flex items-center gap-3">
                  <NuxtImg
                    src="/logo/kairav.avif"
                    alt="KAIRAV Logo"
                    width="34"
                    height="34"
                    class="size-8 object-contain transition-transform duration-300 group-hover:scale-105 dark:hidden"
                  />
                  <NuxtImg
                    src="/logo/kairav-dark.avif"
                    alt="KAIRAV Logo"
                    width="34"
                    height="34"
                    class="size-8 object-contain transition-transform duration-300 group-hover:scale-105 hidden dark:block"
                  />
                  <div class="flex flex-col">
                    <span class="font-heading text-2xl text-highlighted leading-tight">
                      Ilham Kurniawan<span class="text-pink-deep">.</span>
                    </span>
                    <span class="text-sm text-muted">
                      KAIRAV — Fullstack Developer
                    </span>
                  </div>
                </ULink>

                <p class="text-sm text-muted leading-relaxed max-w-sm font-normal">
                  {{ t('footer.personal_bio') }}
                </p>
              </div>

              <div class="space-y-2 pt-2">
                <p class="text-sm text-highlighted/90 font-medium">
                  {{ t('footer.location_studio') }}
                </p>
                <p class="text-sm text-muted">
                  {{ t('footer.working_worldwide') }}
                </p>

                <!-- Live status -->
                <div class="inline-flex items-center gap-2 pt-1">
                  <span class="relative flex size-2">
                    <span class="animate-ping absolute inline-flex size-full rounded-full bg-primary opacity-75" />
                    <span class="relative inline-flex rounded-full size-2 bg-primary" />
                  </span>
                  <span class="text-xs text-muted">
                    {{ t('footer.status_available') }}
                  </span>
                </div>

                <!-- Social icons -->
                <div class="flex items-center gap-2 pt-3">
                  <UTooltip v-for="item in contactLinks" :key="item.name" :text="item.name">
                    <UButton
                      :to="item.to"
                      :icon="item.icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      color="neutral"
                      variant="outline"
                      :aria-label="item.name"
                      class="size-9 justify-center bg-default transition duration-200 hover:-translate-y-1 hover:rotate-6 hover:border-primary hover:text-primary"
                    />
                  </UTooltip>
                </div>
              </div>
            </div>

            <!-- Menu & Services columns -->
            <div v-for="col in linkColumns" :key="col.key" class="space-y-4" :class="col.class">
              <p :class="headingClass">
                {{ t(col.key) }}
              </p>
              <ul class="space-y-3 text-sm">
                <li v-for="item in col.links" :key="item.label">
                  <UButton
                    :to="item.to"
                    :label="localized(item)"
                    variant="link"
                    color="neutral"
                    :class="linkClass"
                  />
                </li>
              </ul>
            </div>

            <!-- Back to top -->
            <div class="lg:col-span-3 flex items-end justify-start lg:justify-end">
              <UButton
                icon="lucide:arrow-up"
                color="neutral"
                variant="outline"
                size="xl"
                :aria-label="t('footer.back_to_top')"
                :title="t('footer.back_to_top')"
                class="rounded-md size-13 justify-center bg-elevated hover:bg-elevated hover:border-primary hover:text-primary hover:scale-110 transition-all duration-300"
                @click="scrollToTop"
              />
            </div>
          </div>

          <USeparator class="opacity-60" />

          <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
            <div class="text-center sm:text-left">
              <span>&copy; {{ currentYear }} Ilham Kurniawan (KAIRAV).</span>
              <span class="ml-1 text-muted/80">
                {{ t('footer.all_rights_reserved') }}
              </span>
            </div>

            <div class="text-highlighted/80 font-semibold text-sm">
              {{ t('footer.designed_in_indonesia') }}
            </div>

            <div class="text-center sm:text-right text-muted/80 font-normal">
              {{ t('footer.impact_tagline') }}
            </div>
          </div>

          <!-- Watermark -->
          <div aria-hidden="true" class="w-full overflow-hidden select-none pointer-events-none pt-4 sm:pt-6 pb-2 text-center">
            <span class="font-heading tracking-tight leading-none block text-[clamp(2.5rem,11.5vw,7.5rem)] text-highlighted opacity-5 dark:opacity-[0.06]">
              KAIRAV
            </span>
          </div>
        </div>
      </footer>
    </UMain>
  </div>
</template>
