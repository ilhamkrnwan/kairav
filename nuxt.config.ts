// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

// Resolusi URL yang dinamis: prioritaskan domain kustom produksi,
// lalu VERCEL_URL (preview/branch), lalu fallback ke domain default.
const productionUrl = process.env.NUXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
  || (process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : null)
  || "https://ilhamkrnwan.my.id";

export default defineNuxtConfig({
  compatibilityDate: "2026-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        // Ganti '/favicon.png' dengan nama file gambar Anda di folder 'public'
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: productionUrl,
    },
  },

  // Diperlukan oleh @nuxt/site-config agar cocok dengan nilai baseUrl i18n
  site: {
    url: productionUrl,
  },

  // Nitro: lewati prerender rute optimasi gambar Vercel agar build tidak gagal
  nitro: {
    prerender: {
      ignore: [
        // Rute image optimization Vercel tidak dapat di-prerender
        /^\/_vercel\/image/,
      ],
    },
  },

  alias: {
    "@": "/",
    "@components": "./app/components",
    "@composables": "./composables",
    "@constants": "./constants",
    "@stores": "./stores",
    "@types": "./types",
    "@utils": "./utils",
    "@modules": "./modules",
    "@assets": "./app/assets",
    "@layouts": "./app/layouts",
    "@pages": "./app/pages",
    "@i18n": "./i18n",
  },
  // Konfigurasi i18n sebagai properti top-level agar site-config module
  // dapat membaca baseUrl dengan benar dan tidak terjadi konflik URL.
  i18n: {
    locales: [
      { code: "id", file: "id.json", iso: "id-ID", language: "id" },
      { code: "en", file: "en.json", iso: "en-US", language: "en" },
    ],
    langDir: "languages/",
    defaultLocale: "id",
    strategy: "no_prefix",
    // baseUrl dinamis: mengikuti `site.url` di atas secara otomatis
    baseUrl: productionUrl,
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxt/image",
    "nuxt-og-image",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/content",
    '@nuxtjs/google-fonts',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap',
  ],

  // Sitemap configuration
  sitemap: {
    xsl: false,
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  },
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'JetBrains Mono': [400, 500, 600], // untuk code snippets
    },
    display: 'swap',
    download: true, // self-host font agar tidak ada koneksi pihak ketiga
    preload: true,
    prefetch: true,
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '', // class will be 'dark' instead of 'dark-mode'
    storageKey: 'nuxt-color-mode', // localStorage key
  },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
