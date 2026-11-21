# Aturan Image Hero (Latar Belakang Halaman Detail)

Berlaku untuk hero di halaman detail: blog (`coverImage`), layanan (`coverImage` atau `image`), dan portofolio (`image`). Gambar menjadi latar penuh lebar di belakang judul, jadi harus bersih supaya teks tetap terbaca dan tampilannya tenang.

Aturan ini menggantikan gaya claymorphism di `image.md` untuk hero. `image.md` tetap berlaku untuk thumbnail kartu lama.

---

## 1. Ukuran dan format

| Hal | Aturan |
|---|---|
| Rasio master | **21:9** (contoh 2560 x 1100 px). Minimal 1920 x 825 px. |
| Format sumber | PNG atau JPG, sRGB. Situs mengonversinya ke AVIF/WebP otomatis. |
| Bobot | Usahakan di bawah 400 KB setelah konversi AVIF. |
| Lokasi | `public/blog/`, `public/services/`, `public/portofolio/`, lalu isi path-nya di frontmatter. |
| Nama file | huruf kecil, tanda hubung, sama dengan slug (contoh `business-website.png`). |

Gambar yang sama juga dipakai sebagai thumbnail kartu (rasio sekitar 3:2, dipotong dari tengah). Jadi subjek utama harus berada di area **35% sampai 90% dari lebar** supaya tetap terlihat di kartu.

## 2. Komposisi (paling penting)

- **Subjek di kanan.** Teks hero ada di kiri, ditutup scrim warna halaman dari kiri ke kanan.
- **Sisi kiri 45% harus tenang:** latar polos, gradasi lembut, atau blur. Tanpa detail penting, tanpa garis tegas, tanpa objek kecil.
- **Satu titik fokus.** Satu objek atau satu adegan, bukan kolase.
- **Jauhkan dari tepi atas dan bawah.** Gambar bergeser parallax sekitar 4% dan bagian bawah memudar ke warna halaman. Simpan subjek di 70% area tengah vertikal; 25% paling bawah harus minim detail.
- **Ruang napas:** subjek tidak lebih dari sekitar 55% tinggi gambar.
- Di layar HP, scrim menjadi vertikal dan gambar dipotong dari tengah-kanan, jadi subjek tidak boleh terlalu menempel ke tepi kanan.

## 3. Bersih (hal yang dilarang)

- Jaga area di luar layar perangkat bebas dari teks, huruf, angka, logo, watermark, dan tanda tangan.
- Untuk portofolio dengan preview web publik, isi layar perangkat dengan screenshot hero asli dari tautan proyek. Pertahankan logo, teks, dan warna UI asli di dalam layar.
- Untuk gambar lain yang memakai mockup layar, isi layar dengan blok warna atau garis abstrak.
- Tidak ada bingkai, border, sudut membulat sebagai kartu, atau kotak di dalam gambar.
- Tidak ada grain, noise, vignette gelap di tepi, glow berlebihan, lens flare, atau efek HDR.
- Tidak ada artefak AI: jari atau tangan janggal, objek meleleh, huruf palsu, bayangan tidak konsisten.
- Tidak ada orang yang menatap kamera dengan ekspresi dibuat-buat; kalau ada orang, tampak dari samping atau belakang dan sederhana.
- Tidak ada stok-foto klise: jabat tangan, lampu bohlam, roket, otak digital, gembok neon.

## 4. Warna dan cahaya

Scrim memakai warna halaman, jadi gambar harus cocok di tema terang maupun gelap.

- Gunakan palet netral untuk latar studio dan perangkat. Pilih abu, putih tulang, atau hitam arang dengan maksimal satu aksen biru kobalt (`#a9bdff` untuk gelap, `#234394` untuk terang). Terapkan warna asli pada screenshot di dalam layar.
- **Kontras sedang.** Hindari area putih murni atau hitam murni yang luas, terutama di sisi kiri.
- **Cahaya lembut dan merata,** satu arah. Bayangan halus.
- Kalau perlu dua versi, buat satu versi netral yang aman di dua tema, bukan dua file.

## 5. Isi per jenis halaman

| Jenis | Isi gambar yang cocok |
|---|---|
| Layanan | Satu objek atau adegan abstrak yang mewakili layanan (perangkat, struktur, aliran data) dalam bentuk geometris sederhana. |
| Portofolio | Satu perangkat di kanan dengan screenshot hero asli dari preview publik sebagai isi layar. Gunakan `panoramicHero: true` di frontmatter Indonesia dan Inggris untuk gambar 21:9 dengan komposisi ini. |
| Blog | Foto atau ilustrasi editorial bernuansa sesuai topik, satu subjek, latar sederhana. |

## 6. Template prompt (Gemini / Nano Banana)

```text
Buat gambar hero lebar rasio 21:9 (2560x1100) yang bersih untuk halaman web.

Subjek: [satu subjek, contoh: laptop tipis dengan layar menampilkan blok warna abstrak].
Komposisi: subjek di sisi kanan (kira-kira 55% lebar), sisi kiri 45% berupa latar polos
lembut dengan gradasi halus, tanpa detail. Subjek berada di tengah vertikal dan tidak
menyentuh tepi atas atau bawah. Bagian bawah gambar minim detail.
Gaya: minimalis, fotorealistik atau render 3D matte, cahaya studio lembut dan merata,
bayangan halus.
Warna: netral (abu, putih tulang, arang) dengan satu aksen biru kobalt.

Wajib: tanpa teks, tanpa huruf, tanpa angka, tanpa logo, tanpa watermark, tanpa bingkai,
tanpa grain atau noise, tanpa vignette, tanpa glow berlebihan, tanpa tangan atau jari.
```

Untuk portofolio, siapkan mockup perangkat sesuai komposisi di atas. Pasang screenshot hero asli dari preview publik di dalam layar agar detail UI tetap akurat.

## 7. Cek sebelum dipakai

1. Pasang di frontmatter, lalu buka halaman detail di **1280x800** dan **390x844**.
2. Judul dan deskripsi terbaca jelas tanpa menebak di kedua tema (terang dan gelap).
3. Subjek tidak tertutup teks di desktop, dan tidak terpotong di HP.
4. Thumbnail kartu di halaman daftar masih menampilkan subjek.
5. Perbesar gambar dan cek tepi layar, detail UI, serta area studio. Cocokkan isi layar dengan preview proyek dan bersihkan artefak di luar layar.
