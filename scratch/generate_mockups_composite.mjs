import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const WIDTH = 1536;
const HEIGHT = 1024;

// Helper to create rounded rectangle mask
async function getRoundedMask(w, h, radius) {
  const svg = `<svg width="${w}" height="${h}">
    <rect width="${w}" height="${h}" rx="${radius}" ry="${radius}" fill="#fff" />
  </svg>`;
  return sharp(Buffer.from(svg)).toBuffer();
}

// 1. RuangNU Gallery 2: 3 Mobile Phones Side-by-Side
async function makeRuangNuGaleri2() {
  const bgSvg = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e8f5e9" />
        <stop offset="100%" stop-color="#c8e6c9" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.12" />
      </filter>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
    
    <!-- 3 Cards -->
    <rect x="120" y="80" width="380" height="864" rx="32" fill="#ffffff" opacity="0.7" filter="url(#shadow)" />
    <rect x="578" y="80" width="380" height="864" rx="32" fill="#ffffff" opacity="0.7" filter="url(#shadow)" />
    <rect x="1036" y="80" width="380" height="864" rx="32" fill="#ffffff" opacity="0.7" filter="url(#shadow)" />
  </svg>`);

  // Phone frame SVG overlay
  function phoneFrameSvg(w, h) {
    return Buffer.from(`<svg width="${w}" height="${h}">
      <rect width="${w}" height="${h}" rx="40" fill="none" stroke="#1c1c1e" stroke-width="12" />
      <rect width="${w}" height="${h}" rx="40" fill="none" stroke="#e5e5ea" stroke-width="2" />
      <!-- Dynamic Island / Speaker -->
      <rect x="${w/2 - 45}" y="12" width="90" height="24" rx="12" fill="#000000" />
    </svg>`);
  }

  const phoneW = 340;
  const phoneH = 740;
  const screenW = 328;
  const screenH = 728;

  const src1 = await sharp('scratch/originals_png/ruangnu/1.png').resize(screenW, screenH, { fit: 'cover' }).composite([{
    input: await getRoundedMask(screenW, screenH, 32),
    blend: 'dest-in'
  }]).toBuffer();

  const src2 = await sharp('scratch/originals_png/ruangnu/preview.png').resize(screenW, screenH, { fit: 'cover' }).composite([{
    input: await getRoundedMask(screenW, screenH, 32),
    blend: 'dest-in'
  }]).toBuffer();

  const src3 = await sharp('scratch/originals_png/ruangnu/2.png').resize(screenW, screenH, { fit: 'cover' }).composite([{
    input: await getRoundedMask(screenW, screenH, 32),
    blend: 'dest-in'
  }]).toBuffer();

  const finalImg = await sharp(bgSvg).composite([
    { input: src1, left: 146, top: 142 },
    { input: phoneFrameSvg(phoneW, phoneH), left: 140, top: 136 },

    { input: src2, left: 604, top: 142 },
    { input: phoneFrameSvg(phoneW, phoneH), left: 598, top: 136 },

    { input: src3, left: 1062, top: 142 },
    { input: phoneFrameSvg(phoneW, phoneH), left: 1056, top: 136 },
  ]).avif({ quality: 85 }).toFile('public/portofolio/ruangnu/galeri_ruangnu_2.avif');

  console.log('Built galeri_ruangnu_2.avif');
}

// 2. RuangNU Gallery 3: Laptop Admin Dashboard on Cozy Wood Desk Scene
async function makeRuangNuGaleri3() {
  const laptopW = 1180;
  const laptopH = 760;
  const screenW = 1040;
  const screenH = 650;

  const bgSvg = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}">
    <defs>
      <linearGradient id="wood" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2c1e16" />
        <stop offset="50%" stop-color="#3d2a1e" />
        <stop offset="100%" stop-color="#1f140e" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="60" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#wood)" />
    <circle cx="768" cy="400" r="450" fill="#1b4332" opacity="0.35" filter="url(#glow)" />
  </svg>`);

  const laptopFrameSvg = Buffer.from(`<svg width="${laptopW}" height="${laptopH}">
    <defs>
      <filter id="laptopShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000" flood-opacity="0.6" />
      </filter>
    </defs>
    <!-- Laptop Lid -->
    <rect x="60" y="20" width="1060" height="670" rx="20" fill="#1e1e1e" filter="url(#laptopShadow)" />
    <rect x="60" y="20" width="1060" height="670" rx="20" fill="none" stroke="#444" stroke-width="2" />
    <circle cx="590" cy="35" r="4" fill="#000" />
    <!-- Laptop Base -->
    <path d="M 10 690 L 1170 690 C 1175 690 1180 695 1178 700 L 1160 740 C 1158 745 1150 750 1140 750 L 40 750 C 30 750 22 745 20 740 L 2 700 C 0 695 5 690 10 690 Z" fill="#2d2d2d" stroke="#555" stroke-width="1.5" />
    <rect x="530" y="692" width="120" height="12" rx="6" fill="#1a1a1a" />
  </svg>`);

  const screenImg = await sharp('scratch/originals_png/ruangnu/preview.png').resize(screenW, screenH, { fit: 'cover' }).toBuffer();

  await sharp(bgSvg).composite([
    { input: laptopFrameSvg, left: 178, top: 110 },
    { input: screenImg, left: 248, top: 155 },
  ]).avif({ quality: 85 }).toFile('public/portofolio/ruangnu/galeri_ruangnu_3.avif');

  console.log('Built galeri_ruangnu_3.avif');
}

// 3. Santap Thumbnail: Multi-Device POS Showcase on Dark Ambient Studio
async function makeSantapThumbnail() {
  const bgSvg = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}">
    <defs>
      <radialGradient id="amberGlow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#ea580c" stop-opacity="0.3" />
        <stop offset="50%" stop-color="#9a3412" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#0c0a09" stop-opacity="1" />
      </radialGradient>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="20" stdDeviation="25" flood-color="#000" flood-opacity="0.7" />
      </filter>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="#0c0a09" />
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#amberGlow)" />
  </svg>`);

  // Laptop in center (Customer ordering)
  const laptopW = 860;
  const laptopH = 550;
  const laptopScreenW = 760;
  const laptopScreenH = 475;

  const laptopFrame = Buffer.from(`<svg width="${laptopW}" height="${laptopH}">
    <rect x="40" y="10" width="780" height="495" rx="16" fill="#18181b" stroke="#3f3f46" stroke-width="2" />
    <circle cx="430" cy="22" r="3" fill="#000" />
    <path d="M 0 505 L 860 505 C 865 505 865 510 860 515 L 840 545 C 838 548 830 550 820 550 L 40 550 C 30 550 22 548 20 545 L 0 515 C -5 510 -5 505 0 505 Z" fill="#27272a" stroke="#52525b" stroke-width="1" />
  </svg>`);

  const laptopScreen = await sharp('scratch/originals_png/santap/1.png').resize(laptopScreenW, laptopScreenH, { fit: 'cover' }).toBuffer();

  // Smartphone on Left (Mobile POS Kasir)
  const phoneW = 240;
  const phoneH = 500;
  const phoneScreenW = 230;
  const phoneScreenH = 490;

  const phoneFrame = Buffer.from(`<svg width="${phoneW}" height="${phoneH}">
    <rect width="${phoneW}" height="${phoneH}" rx="36" fill="#18181b" stroke="#52525b" stroke-width="4" />
    <rect x="${phoneW/2 - 35}" y="8" width="70" height="18" rx="9" fill="#000" />
  </svg>`);

  const phoneScreen = await sharp('scratch/originals_png/santap/2.png').resize(phoneScreenW, phoneScreenH, { fit: 'cover' }).composite([{
    input: await getRoundedMask(phoneScreenW, phoneScreenH, 32),
    blend: 'dest-in'
  }]).toBuffer();

  // Tablet on Right (Kitchen Display)
  const tabletW = 420;
  const tabletH = 580;
  const tabletScreenW = 396;
  const tabletScreenH = 556;

  const tabletFrame = Buffer.from(`<svg width="${tabletW}" height="${tabletH}">
    <rect width="${tabletW}" height="${tabletH}" rx="24" fill="#18181b" stroke="#3f3f46" stroke-width="4" />
  </svg>`);

  const tabletScreen = await sharp('scratch/originals_png/santap/3.png').resize(tabletScreenW, tabletScreenH, { fit: 'cover' }).composite([{
    input: await getRoundedMask(tabletScreenW, tabletScreenH, 20),
    blend: 'dest-in'
  }]).toBuffer();

  await sharp(bgSvg).composite([
    // Smartphone Left
    { input: phoneScreen, left: 105, top: 310 },
    { input: phoneFrame, left: 100, top: 305 },

    // Laptop Center
    { input: laptopScreen, left: 390, top: 220 },
    { input: laptopFrame, left: 350, top: 210 },

    // Tablet Right
    { input: tabletScreen, left: 1042, top: 242 },
    { input: tabletFrame, left: 1030, top: 230 },
  ]).avif({ quality: 85 }).toFile('public/portofolio/santap/thumbnails-santap.avif');

  console.log('Built thumbnails-santap.avif');
}

// 4. Santap Gallery 1: Floating Laptop Customer QR Ordering
async function makeSantapGaleri1() {
  const bgSvg = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff7ed" />
        <stop offset="100%" stop-color="#ffedd5" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="30" stdDeviation="35" flood-color="#7c2d12" flood-opacity="0.15" />
      </filter>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
  </svg>`);

  const laptopW = 1200;
  const laptopH = 760;
  const screenW = 1060;
  const screenH = 660;

  const laptopFrame = Buffer.from(`<svg width="${laptopW}" height="${laptopH}">
    <defs>
      <filter id="lShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000" flood-opacity="0.25" />
      </filter>
    </defs>
    <rect x="70" y="20" width="1060" height="680" rx="20" fill="#18181b" filter="url(#lShadow)" />
    <rect x="70" y="20" width="1060" height="680" rx="20" fill="none" stroke="#52525b" stroke-width="2" />
    <circle cx="600" cy="35" r="4" fill="#000" />
    <path d="M 10 700 L 1190 700 C 1195 700 1200 705 1198 710 L 1180 750 C 1178 755 1170 760 1160 760 L 40 760 C 30 760 22 755 20 750 L 2 710 C 0 705 5 700 10 700 Z" fill="#27272a" stroke="#52525b" stroke-width="1.5" />
    <rect x="540" y="702" width="120" height="12" rx="6" fill="#09090b" />
  </svg>`);

  const screenImg = await sharp('scratch/originals_png/santap/preview.png').resize(screenW, screenH, { fit: 'cover' }).toBuffer();

  await sharp(bgSvg).composite([
    { input: laptopFrame, left: 168, top: 110 },
    { input: screenImg, left: 238, top: 155 },
  ]).avif({ quality: 85 }).toFile('public/portofolio/santap/galeri_santap_1.avif');

  console.log('Built galeri_santap_1.avif');
}

// 5. Santap Gallery 2: 3 Smartphone POS App Screens Side-by-Side
async function makeSantapGaleri2() {
  const bgSvg = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fffbeb" />
        <stop offset="100%" stop-color="#fef3c7" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#92400e" flood-opacity="0.12" />
      </filter>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
    
    <!-- 3 Cards -->
    <rect x="120" y="80" width="380" height="864" rx="32" fill="#ffffff" opacity="0.8" filter="url(#shadow)" />
    <rect x="578" y="80" width="380" height="864" rx="32" fill="#ffffff" opacity="0.8" filter="url(#shadow)" />
    <rect x="1036" y="80" width="380" height="864" rx="32" fill="#ffffff" opacity="0.8" filter="url(#shadow)" />
  </svg>`);

  function phoneFrameSvg(w, h) {
    return Buffer.from(`<svg width="${w}" height="${h}">
      <rect width="${w}" height="${h}" rx="40" fill="none" stroke="#1c1c1e" stroke-width="12" />
      <rect width="${w}" height="${h}" rx="40" fill="none" stroke="#e5e5ea" stroke-width="2" />
      <rect x="${w/2 - 45}" y="12" width="90" height="24" rx="12" fill="#000000" />
    </svg>`);
  }

  const phoneW = 340;
  const phoneH = 740;
  const screenW = 328;
  const screenH = 728;

  const src1 = await sharp('scratch/originals_png/santap/1.png').resize(screenW, screenH, { fit: 'cover' }).composite([{
    input: await getRoundedMask(screenW, screenH, 32),
    blend: 'dest-in'
  }]).toBuffer();

  const src2 = await sharp('scratch/originals_png/santap/2.png').resize(screenW, screenH, { fit: 'cover' }).composite([{
    input: await getRoundedMask(screenW, screenH, 32),
    blend: 'dest-in'
  }]).toBuffer();

  const src3 = await sharp('scratch/originals_png/santap/3.png').resize(screenW, screenH, { fit: 'cover' }).composite([{
    input: await getRoundedMask(screenW, screenH, 32),
    blend: 'dest-in'
  }]).toBuffer();

  await sharp(bgSvg).composite([
    { input: src1, left: 146, top: 142 },
    { input: phoneFrameSvg(phoneW, phoneH), left: 140, top: 136 },

    { input: src2, left: 604, top: 142 },
    { input: phoneFrameSvg(phoneW, phoneH), left: 598, top: 136 },

    { input: src3, left: 1062, top: 142 },
    { input: phoneFrameSvg(phoneW, phoneH), left: 1056, top: 136 },
  ]).avif({ quality: 85 }).toFile('public/portofolio/santap/galeri_santap_2.avif');

  console.log('Built galeri_santap_2.avif');
}

// 6. Santap Gallery 3: Admin Filament Dashboard Laptop in Restaurant Atmosphere
async function makeSantapGaleri3() {
  const bgSvg = Buffer.from(`<svg width="${WIDTH}" height="${HEIGHT}">
    <defs>
      <linearGradient id="rest" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1c1917" />
        <stop offset="50%" stop-color="#292524" />
        <stop offset="100%" stop-color="#0c0a09" />
      </linearGradient>
      <radialGradient id="warmGlow" cx="70%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#f97316" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#1c1917" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#rest)" />
    <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#warmGlow)" />
  </svg>`);

  const laptopW = 1180;
  const laptopH = 760;
  const screenW = 1040;
  const screenH = 650;

  const laptopFrameSvg = Buffer.from(`<svg width="${laptopW}" height="${laptopH}">
    <defs>
      <filter id="laptopShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000" flood-opacity="0.6" />
      </filter>
    </defs>
    <rect x="60" y="20" width="1060" height="670" rx="20" fill="#1e1e1e" filter="url(#laptopShadow)" />
    <rect x="60" y="20" width="1060" height="670" rx="20" fill="none" stroke="#444" stroke-width="2" />
    <circle cx="590" cy="35" r="4" fill="#000" />
    <path d="M 10 690 L 1170 690 C 1175 690 1180 695 1178 700 L 1160 740 C 1158 745 1150 750 1140 750 L 40 750 C 30 750 22 745 20 740 L 2 700 C 0 695 5 690 10 690 Z" fill="#2d2d2d" stroke="#555" stroke-width="1.5" />
    <rect x="530" y="692" width="120" height="12" rx="6" fill="#1a1a1a" />
  </svg>`);

  const screenImg = await sharp('scratch/originals_png/santap/4.png').resize(screenW, screenH, { fit: 'cover' }).toBuffer();

  await sharp(bgSvg).composite([
    { input: laptopFrameSvg, left: 178, top: 110 },
    { input: screenImg, left: 248, top: 155 },
  ]).avif({ quality: 85 }).toFile('public/portofolio/santap/galeri_santap_3.avif');

  console.log('Built galeri_santap_3.avif');
}

async function main() {
  await makeRuangNuGaleri2();
  await makeRuangNuGaleri3();
  await makeSantapThumbnail();
  await makeSantapGaleri1();
  await makeSantapGaleri2();
  await makeSantapGaleri3();
  console.log('ALL MOCKUP COMPOSITES CREATED SUCCESSFULLY!');
}

main().catch(console.error);
