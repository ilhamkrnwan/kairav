# i18n Setup Documentation

## Overview

Proyek ini menggunakan `@nuxtjs/i18n` untuk internationalization (i18n) dengan dukungan bahasa Indonesia dan English.

## Konfigurasi

### Nuxt Config (`nuxt.config.ts`)

```typescript
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
      baseUrl: process.env.SITE_URL,
    },
  ],
];
```

## Struktur File

```
i18n/
└── languages/
    ├── en.json  # English translations
    └── id.json  # Indonesian translations
```

## Penggunaan

### 1. Di Component (Composition API)

```vue
<script setup>
const { t, locale } = useI18n();

// Mengubah bahasa
const changeLanguage = (lang) => {
  locale.value = lang; // 'en' atau 'id'
};
</script>

<template>
  <div>
    <!-- Menggunakan translation -->
    <h1>{{ t("nav.home") }}</h1>
    <p>{{ t("about") }}</p>

    <!-- Current locale -->
    <p>Current language: {{ locale }}</p>
  </div>
</template>
```

### 2. Di Template (Shorthand)

```vue
<template>
  <div>
    <!-- Menggunakan $t helper -->
    <h1>{{ $t("nav.home") }}</h1>
    <button>{{ $t("nav.project") }}</button>
  </div>
</template>
```

### 3. Nested Translations

```json
{
  "nav": {
    "home": "Home",
    "about": "About"
  }
}
```

Akses dengan: `t('nav.home')` atau `$t('nav.home')`

## Komponen yang Sudah Terintegrasi

### LangSwitcher Component

- Menggunakan `useI18n()` composable
- Otomatis tersimpan di localStorage oleh Nuxt i18n
- Dropdown dengan flag icons

```vue
<script setup>
const { locale } = useI18n();

const selectLanguage = (lang) => {
  locale.value = lang.code; // Otomatis tersimpan
};
</script>
```

## Menambah Translation Baru

### 1. Edit `i18n/languages/en.json`

```json
{
  "newKey": "New Translation",
  "nested": {
    "key": "Nested Value"
  }
}
```

### 2. Edit `i18n/languages/id.json`

```json
{
  "newKey": "Terjemahan Baru",
  "nested": {
    "key": "Nilai Nested"
  }
}
```

### 3. Gunakan di Component

```vue
<template>
  <p>{{ $t("newKey") }}</p>
  <p>{{ $t("nested.key") }}</p>
</template>
```

## Best Practices

1. **Konsisten dengan Key Names**: Gunakan camelCase atau snake_case
2. **Nested Structure**: Kelompokkan translations berdasarkan fitur/section
3. **Fallback**: Selalu sediakan fallback untuk missing translations
4. **SEO**: Gunakan `seo: true` untuk automatic meta tags

## Fitur Lanjutan (Belum Diimplementasi)

### Route-based Localization

Jika ingin URL dengan prefix bahasa (`/en/about`, `/id/tentang`):

```typescript
// nuxt.config.ts
{
  strategy: "prefix_except_default", // atau "prefix"
}
```

### Dynamic Route Names

```vue
<NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
<NuxtLink :to="switchLocalePath('id')">Indonesia</NuxtLink>
```

### Pluralization

```json
{
  "car": "no cars | one car | {count} cars"
}
```

Usage: `$t('car', { count: 5 })` → "5 cars"

## Troubleshooting

### Translation tidak muncul

1. Cek apakah key ada di kedua file (en.json & id.json)
2. Restart dev server setelah menambah translations
3. Clear browser cache

### Bahasa tidak tersimpan

- Nuxt i18n otomatis menyimpan di localStorage dengan key `i18n_redirected`
- Cek browser localStorage untuk memastikan

## Resources

- [Nuxt i18n Documentation](https://i18n.nuxtjs.org/)
- [Vue i18n Documentation](https://vue-i18n.intlify.dev/)
