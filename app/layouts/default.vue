<script setup lang="ts">
const { t, locale } = useI18n()

const email = 'ilhamkurniawanjateng@gmail.com'

const currentYear = new Date().getFullYear()

interface FooterLink { label: string, enLabel: string, to: string }

const menuLinks: FooterLink[] = [
  { label: 'Layanan', enLabel: 'Services', to: '/services' },
  { label: 'Portofolio', enLabel: 'Work', to: '/portofolio' },
  { label: 'Tentang', enLabel: 'About', to: '/about' },
  { label: 'Tulisan', enLabel: 'Writing', to: '/blogs' },
  { label: 'Galeri', enLabel: 'Gallery', to: '/gallery' },
  { label: 'Kontak', enLabel: 'Contact', to: '/contact' },
  { label: 'CV', enLabel: 'CV', to: '/cv' }
]

const serviceLinks: FooterLink[] = [
  { label: 'Pengembangan Website', enLabel: 'Web Development', to: '/services/business-website' },
  { label: 'Pengembangan Aplikasi Mobile', enLabel: 'Mobile App Development', to: '/services/android-app-development' },
  { label: 'Solusi AI/ML & Otomasi', enLabel: 'AI/ML & Automation Solutions', to: '/services/api-ai-automation' },
  { label: 'Custom Dashboard & Sistem', enLabel: 'Custom Dashboard & System', to: '/services/dashboard-system' },
  { label: 'Desain UI/UX & Interaktif', enLabel: 'UI/UX & Interactive Design', to: '/services' }
]

const contactLinks = [
  { name: 'WhatsApp', to: 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20ingin%20konsultasi%20proyek.' },
  { name: 'Email', to: `mailto:${email}` },
  { name: 'Instagram', to: 'https://www.instagram.com/ilhamkrnwan__' },
  { name: 'LinkedIn', to: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/' },
  { name: 'GitHub', to: 'https://github.com/ilhamkrnwan' }
]

const localized = (item: FooterLink) => (locale.value === 'id' ? item.label : item.enLabel)
const scrollToTop = () => window.scrollTo({
  top: 0,
  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
})
</script>

<template>
  <div class="site-shell">
    <AppHeader />

    <UMain id="main-content" tabindex="-1">
      <slot />
    </UMain>

    <footer id="site-footer" class="site-footer">
      <div class="site-frame">
        <div class="footer-columns">
          <div class="footer-intro">
            <p class="editorial-label text-muted">{{ t('footer.direct_contact') }}</p>
            <a :href="`mailto:${email}`" class="footer-email">{{ email }}</a>
            <p class="mt-3 text-sm text-muted">{{ t('footer.location_studio') }}</p>
            <p class="mt-1 text-sm text-muted">{{ t('footer.status_available') }}</p>
          </div>

          <nav :aria-label="t('footer.menu')">
            <p class="editorial-label text-muted">{{ t('footer.menu') }}</p>
            <ul class="footer-links">
              <li v-for="item in menuLinks" :key="item.to">
                <ULink :to="item.to" raw>{{ localized(item) }}</ULink>
              </li>
            </ul>
          </nav>

          <nav :aria-label="t('footer.services')">
            <p class="editorial-label text-muted">{{ t('footer.services') }}</p>
            <ul class="footer-links">
              <li v-for="item in serviceLinks" :key="item.label">
                <ULink :to="item.to" raw>{{ localized(item) }}</ULink>
              </li>
            </ul>
          </nav>

          <nav :aria-label="t('footer.social')">
            <p class="editorial-label text-muted">{{ t('footer.social') }}</p>
            <ul class="footer-links">
              <li v-for="item in contactLinks" :key="item.name">
                <ULink :to="item.to" target="_blank" rel="noopener noreferrer" raw>
                  {{ item.name }}
                  <UIcon name="lucide:arrow-up-right" class="size-3" aria-hidden="true" />
                </ULink>
              </li>
            </ul>
          </nav>
        </div>

        <div class="footer-signoff">
          <span class="footer-wordmark" aria-hidden="true">Kairav</span>
          <button type="button" class="site-utility" @click="scrollToTop">
            {{ t('footer.back_to_top') }}
            <UIcon name="lucide:arrow-up" class="size-4" aria-hidden="true" />
          </button>
        </div>

        <p class="footer-copyright">&copy; {{ currentYear }} Ilham Kurniawan. {{ t('footer.all_rights_reserved') }}</p>
      </div>
    </footer>
  </div>
</template>
