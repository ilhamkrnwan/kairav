// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2026-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        // Ganti '/favicon.png' dengan nama file gambar Anda di folder 'public'
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.BASE_URL || "https://ilhamkrnwan.vercel.app",
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
  modules: [
   [
      "@nuxtjs/i18n",
      {
        locales: [
          { code: "id", file: "id.json", iso: "id-ID", language: "id" },
          { code: "en", file: "en.json", iso: "en-US", language: "en" },
        ],
        seo: true,
        lazy: true,
        langDir: "languages/",
        defaultLocale: "id",
        strategy: "no_prefix",
        baseUrl: process.env.BASE_URL || "https://ilhamkrnwan.vercel.app",
      },
    ],
    "@nuxt/image",
    "nuxt-og-image",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/content",
    '@nuxtjs/google-fonts',
    '@vueuse/motion/nuxt',
  ],
  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'JetBrains Mono': [400, 500, 600], // untuk code snippets
    },
    display: 'swap',
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
