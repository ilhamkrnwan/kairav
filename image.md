# Panduan & Prompt Pembuatan Ilustrasi Layanan Kairav (Nano Banana / Gemini)

Dokumen ini berisi standardisasi gaya visual dan kumpulan prompt siap pakai untuk menghasilkan ilustrasi 3D seluruh layanan Kairav dengan gaya yang 100% konsisten mengacu pada referensi utama: `public/services/dashboard-custom.png`.

---

## 🎨 DNA & Standardisasi Visual

Setiap ilustrasi harus mempertahankan elemen konsistensi berikut:

- **Gaya Desain:** 3D Claymorphism / SaaS Hero Illustration modern & elegan.
- **Latar Belakang:** Studio putih/abu-abu terang minimalis, bayangan lembut (_soft ambient shadows_), dan pola titik dekoratif halus.
- **Komposisi Inti:**
  - **Pusat (Layar Desktop):** Jendela UI perangkat lunak modern dengan bilah navigasi kiri gelap (_dark navy_ `#0F172A`) dan kanvas konten putih bersih.
  - **Kanan (Layar Smartphone):** Mockup ponsel cerdas modern yang menampilkan aplikasi seluler / notifikasi pesan interaktif terkait.
  - **Karakter 3D:** Karakter ramah di meja kerja laptop (sebelah kiri) dan spesialis memegang tablet digital (sebelah kanan).
  - **Elemen 3D Mengambang:** Server rak, lencana metrik, ikon 3D spesifik fitur, dan tanaman hias pot minimalis.
- **Palet Warna:** Putih bersih, Oranye Amber (`#F59E0B`), Dark Navy Slate (`#0F172A`), Hijau Mint/WhatsApp (`#10B981` / `#25D366`), dan Biru Teknologi (`#3B82F6`).
- **Rasio Gambar:** `3:2` atau `16:9` (Landscape).

---

## 🚀 Cara Generate di Gemini (Nano Banana)

1. Buka **[gemini.google.com](https://gemini.google.com)**.
2. Klik tombol **Upload Image (+)** dan unggah file referensi utama: `public/services/dashboard-custom.png`.
3. Salin salah satu prompt di bawah sesuai layanan yang ingin dibuat.
4. Simpan gambar hasil generate ke direktori `public/services/` sesuai nama file yang tertera.

---

## 📋 Daftar Prompt Layanan

### 1. Website Bisnis & Company Profile

- **File Target:** `public/services/business-website.png`
- **Slug Markdown:** `content/services/id/business-website.md`

```text
Gunakan gambar yang saya lampirkan sebagai referensi gaya visual (style reference) 1:1.

Tolong generate ilustrasi 3D untuk layanan "Website Bisnis & Company Profile" dengan mempertahankan:
- Gaya 3D claymorphism, pencahayaan studio putih bersih, rasio landscape (3:2), dan palet warna (oranye amber #F59E0B, dark navy #0F172A, dan putih).
- Karakter 3D (developer di meja laptop sebelah kiri dan business specialist memegang tablet di sebelah kanan).

Ubah konten UI dan elemen menjadi:
1. Layar Desktop Utama (Tengah): Menampilkan website company profile profesional modern dengan hero banner ("Elevate Your Brand Credibility"), grid kartu layanan/produk, bagian testimoni klien, dan statistik profil bisnis.
2. Layar Smartphone (Kanan): Menampilkan tampilan mobile-friendly website profil dengan tombol cepat "Hubungi via WhatsApp" dan formulir konsultasi.
3. Floating Elements: 3D ikon gedung kantor modern, lencana "100% Responsive", lencana "SEO Ready", dan tanaman hias minimalis di sudut bawah.
```

---

### 2. Landing Page High Conversion & Iklan

- **File Target:** `public/services/landing-page-ads.png`
- **Slug Markdown:** `content/services/id/landing-page-ads.md`

```text
Gunakan gambar yang saya lampirkan sebagai referensi gaya visual (style reference) 1:1.

Tolong generate ilustrasi 3D untuk layanan "Landing Page High Conversion & Iklan Digital" dengan mempertahankan:
- Gaya 3D claymorphism, pencahayaan studio putih bersih, rasio landscape (3:2), dan palet warna (oranye amber #F59E0B, dark navy #0F172A, hijau WhatsApp #25D366).
- Karakter 3D (developer di meja laptop sebelah kiri dan marketing strategist memegang tablet di sebelah kanan).

Ubah konten UI dan elemen menjadi:
1. Layar Desktop Utama (Tengah): Menampilkan sales funnel landing page dengan judul penawaran promosi yang persuasif, grafik konversi iklan "3.8x ROI Growth", metrik performa Meta/Google Ads ("CTR 4.8%"), dan alur prospek masuk.
2. Layar Smartphone (Kanan): Menampilkan landing page versi mobile super cepat dengan tombol CTA hijau mencolok "Pesan Sekarang via WhatsApp".
3. Floating Elements: Ikon 3D target bullseye dengan panah, lencana piksel iklan (Meta/Google Pixel), grafik lonjakan konversi, dan tanaman hias minimalis.
```

---

### 3. Pengembangan Custom Web Application

- **File Target:** `public/services/web-app-development.png`
- **Slug Markdown:** `content/services/id/web-app-development.md`

```text
Gunakan gambar yang saya lampirkan sebagai referensi gaya visual (style reference) 1:1.

Tolong generate ilustrasi 3D untuk layanan "Pengembangan Custom Web Application" dengan mempertahankan:
- Gaya 3D claymorphism, pencahayaan studio putih bersih, rasio landscape (3:2), dan palet warna (oranye amber #F59E0B, dark navy #0F172A, tech blue #3B82F6).
- Karakter 3D (software engineer di meja laptop sebelah kiri dan product manager memegang tablet di sebelah kanan).

Ubah konten UI dan elemen menjadi:
1. Layar Desktop Utama (Tengah): Menampilkan portal aplikasi web kustom (Enterprise Client Portal / SaaS) dengan manajemen multi-role pengguna, tabel data interaktif (CRUD), filter pencarian data kompleks, dan panel workflow otomatis.
2. Layar Smartphone (Kanan): Menampilkan antarmuka mobile portal klien dengan notifikasi persetujuan tugas (Approval Status) dan ringkasan progres proyek.
3. Floating Elements: 3D ikon kurung kurawal kode { }, silinder database cloud, lencana Vue/Nuxt modern, dan tanaman hias di lantai.
```

---

### 4. Pengembangan Aplikasi Mobile Android

- **File Target:** `public/services/android-app-development.png`
- **Slug Markdown:** `content/services/id/android-app-development.md`

```text
Gunakan gambar yang saya lampirkan sebagai referensi gaya visual (style reference) 1:1.

Tolong generate ilustrasi 3D untuk layanan "Pengembangan Aplikasi Mobile Android" dengan mempertahankan:
- Gaya 3D claymorphism, pencahayaan studio putih bersih, rasio landscape (3:2), dan palet warna (oranye amber #F59E0B, dark navy #0F172A, android green #10B981).
- Karakter 3D (mobile app developer di meja kerja sebelah kiri dan pengguna smartphone di sebelah kanan).

Ubah konten UI dan elemen menjadi:
1. Layar Desktop Utama (Tengah): Menampilkan konsol manajemen aplikasi mobile dan status sinkronisasi backend (Flutter / Android Studio console) dengan visual status rilis APK, monitoring pengguna aktif, dan API latency.
2. Layar Smartphone (Kanan): Menjadi sorotan utama yang menampilkan antarmuka aplikasi Android modern (Mobile Suite UI dengan kartu transaksi, push alert, dan navigasi bawah yang mulus).
3. Floating Elements: 3D ikon robot Android / Google Play Store badge, ikon sinkronisasi cloud real-time, dan tanaman hias minimalis.
```

---

### 5. Sistem Dashboard & Visualisasi Analitik

- **File Target:** `public/services/dashboard-system.png`
- **Slug Markdown:** `content/services/id/dashboard-system.md`

```text
Gunakan gambar yang saya lampirkan sebagai referensi gaya visual (style reference) 1:1.

Tolong generate ilustrasi 3D untuk layanan "Sistem Dashboard & Visualisasi Analitik" dengan mempertahankan:
- Gaya 3D claymorphism, pencahayaan studio putih bersih, rasio landscape (3:2), dan palet warna (oranye amber #F59E0B, dark navy #0F172A, hijau #10B981, biru #3B82F6).
- Karakter 3D (data analyst di meja laptop sebelah kiri dan eksekutif memegang tablet di sebelah kanan).

Ubah konten UI dan elemen menjadi:
1. Layar Desktop Utama (Tengah): Menampilkan Executive Analytics Dashboard lengkap dengan grafik multi-garis pertumbuhan omzet, diagram lingkaran distribusi penjualan, kartu metrik KPI bisnis ($128,450 Revenue, 1,420 Active Clients), dan tabel ringkasan transaksi real-time.
2. Layar Smartphone (Kanan): Menampilkan ringkasan kartu analitik harian untuk eksekutif yang dapat dipantau dari ponsel secara instan.
3. Floating Elements: 3D grafik batang naik, ikon diagram pie mengambang, lencana keamanan data, dan tanaman hias minimalis.
```

---

### 6. Sistem Informasi Kustom (Referensi Utama)

- **File Target:** `public/services/dashboard-custom.png` (Telah tersedia sebagai basis desain)
- **Slug Markdown:** `content/services/id/custom-information-system.md`

---

### 7. Toko Online & Katalog Produk WhatsApp

- **File Target:** `public/services/online-store-catalog.png`
- **Slug Markdown:** `content/services/id/online-store-catalog.md`

```text
Gunakan gambar yang saya lampirkan sebagai referensi gaya visual (style reference) 1:1.

Tolong generate ilustrasi 3D untuk layanan "Toko Online & Katalog Produk WhatsApp" dengan mempertahankan:
- Gaya 3D claymorphism, pencahayaan studio putih bersih, rasio landscape (3:2), dan palet warna (oranye amber #F59E0B, dark navy #0F172A, hijau WhatsApp #25D366).
- Karakter 3D (pemilik toko online di meja laptop sebelah kiri dan pembeli wanita memegang tablet/ponsel di sebelah kanan).

Ubah konten UI dan elemen menjadi:
1. Layar Desktop Utama (Tengah): Menampilkan etalase toko online interaktif dengan kartu katalog produk, tag diskon, filter kategori produk, dan panel manajemen stok barang.
2. Layar Smartphone (Kanan): Menampilkan halaman produk di smartphone dengan tombol "Beli Sekarang via WhatsApp" dan pratinjau format draf pesan pemesanan otomatis ke WA penjual.
3. Floating Elements: 3D shopping cart / tas belanja mengambang, kotak paket e-commerce, lencana "Order WA Otomatis", dan tanaman hias di lantai.
```

---

### 8. Integrasi API & Otomatisasi AI

- **File Target:** `public/services/api-ai-automation.png`
- **Slug Markdown:** `content/services/id/api-ai-automation.md`

```text
Gunakan gambar yang saya lampirkan sebagai referensi gaya visual (style reference) 1:1.

Tolong generate ilustrasi 3D untuk layanan "Integrasi API & Otomatisasi AI" dengan mempertahankan:
- Gaya 3D claymorphism, pencahayaan studio putih bersih, rasio landscape (3:2), dan palet warna (oranye amber #F59E0B, dark navy #0F172A, mint green #10B981).
- Karakter 3D (developer di meja laptop sebelah kiri dan spesialis memegang tablet di sebelah kanan).

Ubah konten UI dan elemen menjadi:
1. Layar Desktop Utama (Tengah): Menampilkan workflow builder otomatisasi AI & API berbasis node (Node Webhook Trigger terhubung garis oranye menyala ke Node AI Core LLM Prompting, lalu mengarah ke Webhook WhatsApp & Database Sync Supabase), metrik latency 128ms, dan log eksekusi JSON real-time.
2. Layar Smartphone (Kanan): Menampilkan antarmuka chat asisten AI & notifikasi WhatsApp otomatis verifikasi pesanan/invoice.
3. Floating Elements: Cloud server stack dengan logo API shield, floating badge JSON '{ "status": 200, "ai_active": true }', dan ikon 3D AI glowing agent orb.
```

---

### 9. Optimasi SEO & Generative Engine Optimization (GEO)

- **File Target:** `public/services/seo-geo-optimization.png`
- **Slug Markdown:** `content/services/id/seo-geo-optimization.md`

```text
Gunakan gambar yang saya lampirkan sebagai referensi gaya visual (style reference) 1:1.

Tolong generate ilustrasi 3D untuk layanan "Optimasi SEO & Generative Engine Optimization (GEO)" dengan mempertahankan:
- Gaya 3D claymorphism, pencahayaan studio putih bersih, rasio landscape (3:2), dan palet warna (oranye amber #F59E0B, dark navy #0F172A, hijau Google #10B981, ungu AI #8B5CF6).
- Karakter 3D (SEO specialist di meja laptop sebelah kiri dan konsultan digital memegang tablet di sebelah kanan).

Ubah konten UI dan elemen menjadi:
1. Layar Desktop Utama (Tengah): Menampilkan Technical SEO & AI Search Audit Board dengan lingkaran nilai PageSpeed 99%, kurva kenaikan grafik Google Organic Clicks, kartu validasi JSON-LD Schema (Valid), dan panel peringkat kutipan AI Search (Perplexity / ChatGPT #1 Answer).
2. Layar Smartphone (Kanan): Menampilkan pratinjau hasil pencarian Google di seluler dengan rich snippet rating bintang 5 dan sitelink yang rapi.
3. Floating Elements: 3D kaca pembesar dengan tanda centang hijau bersinar, lencana Google Indexing, ikon sinyal AI GEO citation, dan tanaman hias minimalis.
```

---

## ⚡ Langkah Pasca-Generate (Konversi Otomatis)

Setelah Anda menaruh file `.png` hasil generate ke folder `public/services/`, jalankan script konversi otomatis untuk menghasilkan versi web `.avif` dan `.jpg` yang super ringan:

```bash
node scripts/assets-avif.mjs
```
