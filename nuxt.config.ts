// Polyfill new ECMAScript Set methods for older Node environments (< 22.0.0) used by PostCSS
if (typeof Set !== 'undefined') {
  if (!Set.prototype.difference) {
    Set.prototype.difference = function (other: any) {
      const result = new Set(this)
      for (const elem of other) {
        result.delete(elem)
      }
      return result
    }
  }
  if (!Set.prototype.intersection) {
    Set.prototype.intersection = function (other: any) {
      const result = new Set()
      for (const elem of other) {
        if (this.has(elem)) result.add(elem)
      }
      return result
    }
  }
  if (!Set.prototype.union) {
    Set.prototype.union = function (other: any) {
      const result = new Set(this)
      for (const elem of other) {
        result.add(elem)
      }
      return result
    }
  }
}

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
      meta: [
        { name: 'google-site-verification', content: '0JJPBbnbnJ4BRvS9nEsGzOe3OEWbdGvgrLkOAnTSBK8' }
      ],
      link: [
        // Ganti '/favicon.png' dengan nama file gambar Anda di folder 'public'
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
      ]
    }
  },

  routeRules: {
    '/blog': { redirect: { to: '/blogs', statusCode: 301 } },
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
    "@nuxt/fonts",
    "nuxt-og-image",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/content",
    '@nuxtjs/google-fonts',
    '@vueuse/motion/nuxt',
    '@nuxtjs/sitemap',
  ],

  image: {
    provider: process.env.VERCEL ? 'vercel' : 'ipx',
    format: ['avif', 'webp'],
  },

  icon: {
    serverBundle: {
      collections: ['lucide', 'simple-icons', 'logos', 'skill-icons'],
    },
    clientBundle: {
      scan: true,
    },
  },

  fonts: {
    families: [
      { name: 'Inter', weights: [400, 500, 600, 700, 800, 900], global: true },
      { name: 'Segoe UI', provider: 'none' },
      { name: 'Helvetica Neue', provider: 'none' },
      { name: 'Arial', provider: 'none' },
    ],
  },

  ogImage: {
    zeroRuntime: true,
    security: {
      renderTimeout: 30000,
    },
  },

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
      Caveat: [400, 600, 700], // untuk hand-drawn doodle annotations
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
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
});
