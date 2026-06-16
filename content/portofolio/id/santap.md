---
title: Santap
description: Platform POS dan QR ordering modern untuk restoran, kafe, dan UMKM kuliner dengan sistem kasir, kitchen, open bill, pembayaran QRIS, dan customer ordering berbasis web
image: /portofolio/santap/preview.avif
category: Web & Mobile App
services:
  - Full-Stack Development
  - Mobile App Development
  - REST API Development
  - Payment Gateway Integration
  - System Architecture
client: PT Sarwa Kalyana Cara
date: 2026-01-01
status: In Development
industry: Food & Beverage Technology
tags:
  - Laravel
  - Nuxt.js
  - Flutter
  - PostgreSQL
  - Filament
  - QRIS
  - Supabase
  - Mobile-First
_path: /portofolio/santap
url: https://santap.app
---

# Santap — Platform POS dan QR Ordering untuk Bisnis Kuliner

Santap adalah platform digital untuk membantu restoran, kafe, dan UMKM kuliner mengelola proses pemesanan, pembayaran, kasir, dapur, dan operasional outlet dalam satu ekosistem. Sistem ini menggabungkan customer web ordering, aplikasi mobile kasir dan kitchen, dashboard admin, serta backend API yang dirancang untuk kebutuhan operasional kuliner modern.

![Interface Santap](/portofolio/santap/preview.avif)

## Masalah

Banyak bisnis kuliner masih mengandalkan proses manual untuk mencatat pesanan, mengelola meja, memproses pembayaran, dan meneruskan order ke dapur. Alur manual ini rentan terhadap kesalahan pencatatan, antrean panjang, miskomunikasi antara kasir dan kitchen, serta kesulitan memantau status pesanan secara real-time.

Selain itu, beberapa solusi POS yang tersedia sering kali terlalu kompleks, mahal, atau tidak cukup fleksibel untuk kebutuhan restoran kecil dan menengah. Bisnis kuliner membutuhkan sistem yang mudah digunakan, mobile-friendly, mendukung QR ordering, dan tetap kuat untuk operasional harian.

## Solusi

Santap dibangun sebagai platform POS dan QR ordering yang menghubungkan pelanggan, kasir, kitchen, dan admin dalam satu sistem:

* **Customer QR Ordering** — Pelanggan dapat scan QR meja, melihat menu, memilih varian/add-on, menambahkan catatan, dan membuat pesanan langsung dari browser
* **Cashier Mobile App** — Aplikasi kasir untuk membuat order, mengelola pembayaran, membuat sesi open bill, dan memantau pesanan aktif
* **Kitchen Workflow** — Tampilan kitchen untuk menerima dan memproses pesanan secara lebih terstruktur
* **Open Bill System** — Dukungan pesanan berbasis sesi untuk pelanggan yang ingin menambah order berkali-kali sebelum pembayaran akhir
* **QRIS Payment Integration** — Integrasi pembayaran QRIS dengan status pembayaran, pembatalan, timeout, dan pengecekan otomatis
* **Admin Dashboard** — Panel admin berbasis Filament untuk mengelola organisasi, outlet, meja, menu, produk, dan konfigurasi operasional
* **Multi-Organization Architecture** — Sistem dirancang agar dapat digunakan oleh banyak restoran atau outlet dengan data yang terpisah
* **Mobile-First Experience** — Antarmuka web pelanggan dan aplikasi mobile dibuat responsif untuk penggunaan cepat di lapangan

## Peran Ilham

Sebagai **Fullstack Web & Mobile Developer**, Ilham bertanggung jawab atas:

* Pengembangan customer web ordering menggunakan Nuxt.js
* Pengembangan backend REST API menggunakan Laravel
* Perancangan alur pemesanan QR meja, order detail, cart, payment, dan open bill
* Integrasi pembayaran QRIS termasuk create payment, check status, cancel payment, dan timeout
* Pengembangan struktur data multi-organisasi, order, order item, dining table, dan open bill session
* Pengembangan dashboard admin menggunakan Filament
* Pengembangan dan penyesuaian aplikasi mobile Flutter untuk kasir dan kitchen
* Penyusunan dokumentasi API menggunakan Scramble
* Optimasi UI/UX untuk alur customer, kasir, dan admin agar lebih cepat digunakan secara operasional

## Tech Stack

| Layer             | Teknologi                                  |
| ----------------- | ------------------------------------------ |
| Frontend Customer | Nuxt.js, Vue, Nuxt UI, Tailwind CSS, Pinia |
| Mobile App        | Flutter                                    |
| Backend API       | Laravel, Sanctum, Scramble                 |
| Admin Dashboard   | Filament                                   |
| Database          | PostgreSQL                                 |
| Payment           | QRIS Integration                           |
| Realtime / Sync   | Polling, Reverb-ready Architecture         |
| Deployment        | VPS, Vercel                                |
| Storage & Media   | Spatie Media Library                       |

## Dampak dan Hasil

* Membantu bisnis kuliner mengurangi proses manual dalam pemesanan, pembayaran, dan komunikasi order
* Mempercepat alur pelanggan dari scan QR hingga pesanan masuk ke sistem
* Memudahkan kasir dalam membuat pesanan, memantau order aktif, dan mengelola pembayaran
* Mendukung skenario restoran dengan meja, takeaway, dine-in, serta open bill
* Menyediakan fondasi sistem POS yang scalable untuk banyak outlet dan organisasi
* Meningkatkan akurasi pencatatan pesanan melalui struktur order, item, varian, add-on, status pembayaran, dan status bill yang lebih jelas

![Santap Mockup 1](/portofolio/santap/1.avif)
![Santap Mockup 2](/portofolio/santap/2.avif)
![Santap Mockup 3](/portofolio/santap/3.avif)
![Santap Mockup 4](/portofolio/santap/4.avif)
