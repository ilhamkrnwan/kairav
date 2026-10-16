<script setup lang="ts">
import { ref } from 'vue'

const { t } = useI18n()

// Email Copy Action
const emailCopied = ref(false)
const copyEmail = async () => {
  const email = 'ilhamkurniawanjateng@gmail.com'
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(email)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = email
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    emailCopied.value = true
    setTimeout(() => {
      emailCopied.value = false
    }, 2500)
  } catch {
    emailCopied.value = false
  }
}

// Scroll to Top
const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

const currentYear = new Date().getFullYear()

// Menu Navigation (Ref: Kerubim & Dhurva Tech)
const menuLinks = [
  { label: 'Layanan', enLabel: 'Services', path: '/services' },
  { label: 'Portofolio', enLabel: 'Work', path: '/portofolio' },
  { label: 'Tentang', enLabel: 'About', path: '/about' },
  { label: 'Tulisan', enLabel: 'Words', path: '/blogs' },
  { label: 'Galeri', enLabel: 'Gallery', path: '/gallery' },
  { label: 'Kontak', enLabel: 'Contact', path: '/contact' }
]

// Service Capabilities (Ref: Dhurva Tech)
const serviceLinks = [
  { label: 'Pengembangan Website', enLabel: 'Web Development', path: '/services' },
  { label: 'Pengembangan Aplikasi Mobile', enLabel: 'Mobile App Development', path: '/services' },
  { label: 'Solusi AI/ML & Otomasi', enLabel: 'AI/ML & Automation Solutions', path: '/services' },
  { label: 'Custom Dashboard & Sistem', enLabel: 'Custom Dashboard & System', path: '/services' },
  { label: 'Desain UI/UX & Interaktif', enLabel: 'UI/UX & Interactive Design', path: '/services' }
]

// Social & Contact (Ref: Dhurva Tech & Kerubim)
const contactLinks = [
  {
    name: 'WhatsApp',
    detail: '+62 877-6129-6676',
    url: 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20ingin%20konsultasi%20proyek.'
  },
  {
    name: 'Email',
    detail: 'ilhamkurniawanjateng@gmail.com',
    url: 'mailto:ilhamkurniawanjateng@gmail.com',
    isEmail: true
  },
  {
    name: 'Instagram',
    detail: '@ilhamkrnwan__',
    url: 'https://www.instagram.com/ilhamkrnwan__'
  },
  {
    name: 'LinkedIn',
    detail: 'Ilham Kurniawan',
    url: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/'
  },
  {
    name: 'GitHub',
    detail: 'ilhamkrnwan',
    url: 'https://github.com/ilhamkrnwan'
  }
]
</script>

<template>
  <footer
    id="site-footer"
    role="contentinfo"
    class="relative w-full border-t border-border/40 bg-background/80 dark:bg-[#080604]/90 backdrop-blur-xl text-foreground overflow-hidden transition-colors duration-300"
  >
    <!-- Top Ambient Glowing Line Accent -->
    <div
      aria-hidden="true"
      class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-400/40 dark:via-amber-400/30 to-transparent pointer-events-none"
    />

    <div class="max-w-7xl mx-auto px-6 sm:px-10 md:pl-20 lg:px-12 pt-16 pb-8 relative z-10">
      <!-- ─── TOP SECTION: Columns & Circular Back-To-Top (Ref: Dhurva Tech + Kerubim) ─── -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
        <!-- Col 1: Brand & Personal Info (4 cols) -->
        <div class="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <!-- Brand Logo (Personal Identity) -->
            <NuxtLink to="/" class="group inline-flex items-center gap-3 text-decoration-none">
              <img
                src="/logo/kairav.avif"
                alt="KAIRAV Logo"
                width="34"
                height="34"
                class="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105 dark:hidden"
              />
              <img
                src="/logo/kairav-dark.avif"
                alt="KAIRAV Logo"
                width="34"
                height="34"
                class="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105 hidden dark:block"
              />
              <div class="flex flex-col">
                <span class="font-heading font-black text-2xl tracking-wider text-foreground leading-tight">
                  KAIRAV<span class="text-amber-500">.</span>
                </span>
                <span class="text-[11px] font-mono text-muted-foreground tracking-wide">
                  Ilham Kurniawan — Fullstack Developer
                </span>
              </div>
            </NuxtLink>

            <!-- Personal Bio Tagline -->
            <p class="text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
              {{ t('footer.personal_bio') }}
            </p>
          </div>

          <!-- Base Location & Status -->
          <div class="space-y-2 pt-2">
            <span class="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold block">
              {{ t('footer.developer_label') }}
            </span>
            <p class="text-sm text-foreground/90 font-medium">
              {{ t('footer.location_studio') }}
            </p>
            <p class="text-xs text-muted-foreground font-mono">
              {{ t('footer.working_worldwide') }}
            </p>

            <!-- Live Status indicator -->
            <div class="inline-flex items-center gap-2 pt-1">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span class="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                {{ t('footer.status_available') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Col 2: MENU (2 cols) (Ref: Kerubim & Dhurva) -->
        <div class="lg:col-span-2 space-y-4">
          <p class="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            {{ t('footer.menu') }}
          </p>
          <ul class="space-y-3 text-sm">
            <li v-for="item in menuLinks" :key="item.path">
              <NuxtLink
                :to="item.path"
                class="text-foreground/80 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 inline-block font-light"
              >
                {{ $i18n.locale === 'id' ? item.label : item.enLabel }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 3: LAYANAN (3 cols) (Ref: Dhurva Tech) -->
        <div class="lg:col-span-3 space-y-4">
          <p class="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            {{ t('footer.services') }}
          </p>
          <ul class="space-y-3 text-sm">
            <li v-for="item in serviceLinks" :key="item.label">
              <NuxtLink
                :to="item.path"
                class="text-foreground/80 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 inline-block font-light"
              >
                {{ $i18n.locale === 'id' ? item.label : item.enLabel }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Col 4: KONTAK / SOCIAL & Circular Back To Top (3 cols) (Ref: Dhurva & Kerubim) -->
        <div class="lg:col-span-3 flex flex-col justify-between">
          <div class="space-y-4">
            <p class="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              {{ t('footer.contact') }}
            </p>
            <ul class="space-y-3 text-sm">
              <li v-for="item in contactLinks" :key="item.name">
                <a
                  v-if="!item.isEmail"
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-foreground/80 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 inline-flex items-center gap-1.5 font-light"
                >
                  <span>{{ item.name }}</span>
                </a>
                
                <!-- Email with direct click / copy tool -->
                <button
                  v-else
                  type="button"
                  class="text-left text-foreground/80 hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 inline-flex items-center gap-1.5 font-light cursor-pointer"
                  :title="t('footer.copy_email')"
                  @click="copyEmail"
                >
                  <span>{{ item.name }}</span>
                  <span
                    v-if="emailCopied"
                    class="text-[10px] font-mono text-emerald-500 font-medium px-1.5 py-0.5 rounded bg-emerald-500/10"
                  >
                    {{ t('footer.email_copied') }}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          <!-- Circular Floating Back to Top Button (Exact match from Kerubim reference Image 2) -->
          <div class="pt-8 flex justify-start lg:justify-end">
            <button
              type="button"
              class="w-13 h-13 rounded-full border border-border/70 hover:border-amber-500 bg-background/60 hover:bg-background/90 text-foreground flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm group cursor-pointer"
              :aria-label="t('footer.back_to_top')"
              :title="t('footer.back_to_top')"
              @click="scrollToTop"
            >
              <Icon
                name="lucide:arrow-up"
                class="w-5 h-5 text-foreground group-hover:text-amber-500 transition-all duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- ─── SUB-FOOTER / METADATA DIVIDER (Ref: Kerubim & Dhurva Tech) ─── -->
      <div class="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
        <!-- Copyright (Personal) -->
        <div class="text-center sm:text-left">
          <span>&copy; {{ currentYear }} Ilham Kurniawan (KAIRAV).</span>
          <span class="ml-1 text-muted-foreground/80">
            {{ t('footer.all_rights_reserved') }}
          </span>
        </div>

        <!-- Designed in Indonesia (Ref: Kerubim SM Image 2) -->
        <div class="tracking-widest uppercase text-foreground/70 font-semibold text-[11px]">
          {{ t('footer.designed_in_indonesia') }}
        </div>

        <!-- Impact Tagline (Ref: Dhurva Tech Image 1) -->
        <div class="text-center sm:text-right text-muted-foreground/80 font-normal">
          {{ t('footer.impact_tagline') }}
        </div>
      </div>

      <!-- ─── WATERMARK TYPOGRAPHY (Responsive & Subtle) ─── -->
      <div class="w-full overflow-hidden select-none pointer-events-none pt-4 sm:pt-6 pb-2 text-center flex items-center justify-center">
        <span
          class="font-heading font-black tracking-tight uppercase leading-none block text-[clamp(2.5rem,11.5vw,7.5rem)] text-foreground opacity-5 dark:opacity-[0.06] select-none pointer-events-none transition-opacity"
        >
          KAIRAV
        </span>
      </div>
    </div>
  </footer>
</template>
