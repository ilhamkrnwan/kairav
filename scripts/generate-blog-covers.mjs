import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const covers = [
  {
    filename: 'kapan-bisnis-memerlukan-sistem-informasi-website',
    tag: 'BUSINESS & TECH',
    title: 'KAPAN BISNIS MEMERLUKAN',
    subtitle: 'SISTEM INFORMASI & WEBSITE',
    desc: 'Strategic Inflection Points · Workflow Automation · Digital Scaling',
    theme: {
      bg1: '#07090e',
      bg2: '#0f172a',
      accent1: '#f59e0b',
      accent2: '#06b6d4',
      accent3: '#fbbf24',
      pattern: 'circuits'
    }
  },
  {
    filename: 'mahasiswa-di-tengah-badai-bingung',
    tag: 'LIFE & REFLECTION',
    title: 'MAHASISWA DI TENGAH',
    subtitle: 'BADAI BINGUNG & TAKDIR',
    desc: 'Academic Uncertainty · Finding Direction · Building Inner Resilience',
    theme: {
      bg1: '#060814',
      bg2: '#1e1b4b',
      accent1: '#3b82f6',
      accent2: '#a855f7',
      accent3: '#38bdf8',
      pattern: 'storm-compass'
    }
  },
  {
    filename: 'berhenti-membandingkan-proses-hidup',
    tag: 'PERSONAL GROWTH',
    title: 'BERHENTI MEMBANDINGKAN',
    subtitle: 'PROSES HIDUP DENGAN ORANG LAIN',
    desc: 'Own Timeline · Escaping Comparison Trap · Incremental Growth',
    theme: {
      bg1: '#050c0a',
      bg2: '#064e3b',
      accent1: '#10b981',
      accent2: '#fbbf24',
      accent3: '#34d399',
      pattern: 'orbit-rings'
    }
  },
  {
    filename: 'jangan-mudah-menghakimi-beban-tak-terlihat',
    tag: 'EMPATHY & WISDOM',
    title: 'JANGAN MUDAH MENGHAKIMI',
    subtitle: 'BEBAN TAK TERLIHAT SETIAP INSAN',
    desc: 'The Iceberg of Struggle · Radical Empathy · Restraint in Judgment',
    theme: {
      bg1: '#0d0714',
      bg2: '#4c1d95',
      accent1: '#f43f5e',
      accent2: '#8b5cf6',
      accent3: '#fbbf24',
      pattern: 'iceberg-prism'
    }
  },
  {
    filename: 'membangun-relasi-tanpa-kehilangan-integritas',
    tag: 'LEADERSHIP & VALUES',
    title: 'MEMBANGUN RELASI TANPA',
    subtitle: 'KEHILANGAN INTEGRITAS DIRI',
    desc: 'Expanding Networks · Healthy Boundaries · Grounded Authenticity',
    theme: {
      bg1: '#080d1a',
      bg2: '#1e293b',
      accent1: '#fbbf24',
      accent2: '#10b981',
      accent3: '#60a5fa',
      pattern: 'pillar-network'
    }
  },
  {
    filename: 'kesurupan-gimmick-seni-tradisi',
    tag: 'CULTURE & HERITAGE',
    title: 'MENJAGA KESAKRALAN SENI',
    subtitle: 'DARI DISTORSI & GIMMICK TRADISI',
    desc: 'Preserving Nusantara Heritage · Aesthetic Dignity · Barongan & Jaranan',
    theme: {
      bg1: '#140606',
      bg2: '#450a0a',
      accent1: '#e11d48',
      accent2: '#f59e0b',
      accent3: '#fbbf24',
      pattern: 'barongan-flame'
    }
  },
  {
    filename: 'menerima-kekurangan-menempa-kemampuan',
    tag: 'STOIC MASTERY',
    title: 'MENERIMA KEKURANGAN',
    subtitle: 'MENEMPA KEMAMPUAN DIRI',
    desc: 'Dichotomy of Control · Scrapper Advantage · Continuous Forging',
    theme: {
      bg1: '#090d12',
      bg2: '#1c1917',
      accent1: '#f59e0b',
      accent2: '#ea580c',
      accent3: '#e2e8f0',
      pattern: 'forge-anvil'
    }
  },
  {
    filename: 'seni-merelakan-kehilangan-dan-bersyukur',
    tag: 'MINDFULNESS & GRATITUDE',
    title: 'SENI MERELAKAN &',
    subtitle: 'BERSYUKUR ATAS KEHADIRANNYA',
    desc: 'Graceful Departures · Gratitude in Presence · Meeting in Best Versions',
    theme: {
      bg1: '#0a060e',
      bg2: '#3b0764',
      accent1: '#f43f5e',
      accent2: '#fbbf24',
      accent3: '#fbcfe8',
      pattern: 'orbit-rings'
    }
  },
  {
    filename: 'risk-is-better-than-regret',
    tag: 'COURAGE & ACTION',
    title: 'RISK IS BETTER THAN REGRET',
    subtitle: 'KEBERANIAN MENGAMBIL RISIKO',
    desc: 'Overcoming Comfort Zones · Cost of Inaction · Daring to Step Up',
    theme: {
      bg1: '#0f0505',
      bg2: '#450a0a',
      accent1: '#ef4444',
      accent2: '#f59e0b',
      accent3: '#fef08a',
      pattern: 'forge-anvil'
    }
  },
  {
    filename: 'if-its-meant-for-you',
    tag: 'IKHTIAR & KEDAMAIAN',
    title: "IF IT'S MEANT FOR YOU",
    subtitle: 'IT WILL FIND ITS WAY TO YOU',
    desc: 'Ikhtiar Maksimal · Berserah dengan Tenang · Kedamaian Takdir',
    theme: {
      bg1: '#090805',
      bg2: '#281a06',
      accent1: '#f59e0b',
      accent2: '#fbbf24',
      accent3: '#fef08a',
      pattern: 'orbit-rings'
    }
  },
  {
    filename: 'memperbaiki-cacat-logika',
    tag: 'CRITICAL THINKING',
    title: 'MEMBONGKAR CACAT LOGIKA',
    subtitle: 'DALAM MEMANDANG HIDUP',
    desc: 'Cognitive Biases · Sunk Cost Fallacy · Rational Clarity & Peace',
    theme: {
      bg1: '#060b13',
      bg2: '#1e1b4b',
      accent1: '#6366f1',
      accent2: '#8b5cf6',
      accent3: '#a5b4fc',
      pattern: 'circuits'
    }
  },
  {
    filename: 'beauty-privilege-dan-integritas',
    tag: 'CHARACTER & ETHICS',
    title: 'BEAUTY PRIVILEGE ITU NYATA',
    subtitle: 'TAPI INTEGRITAS MEMBUATNYA ABADI',
    desc: 'Halo Effect · Surface Allure vs Character · Non-Depreciating Asset',
    theme: {
      bg1: '#0b0904',
      bg2: '#291e07',
      accent1: '#d97706',
      accent2: '#eab308',
      accent3: '#fef08a',
      pattern: 'pillar-network'
    }
  },
  {
    filename: 'seni-menyayangi-diri-sendiri',
    tag: 'SELF LOVE & PEACE',
    title: 'SENI MENYAYANGI DIRI',
    subtitle: 'MENJADI RUMAH TERBAIK BAGI JIWA',
    desc: 'Healthy Boundaries · Forgiving the Past · Radical Self-Compassion',
    theme: {
      bg1: '#0d0510',
      bg2: '#310d3e',
      accent1: '#ec4899',
      accent2: '#a855f7',
      accent3: '#f472b6',
      pattern: 'orbit-rings'
    }
  }
];

function escapeXml(unsafe) {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function generateSVG(cover) {
  const title = escapeXml(cover.title);
  const subtitle = escapeXml(cover.subtitle);
  const desc = escapeXml(cover.desc);
  const tag = escapeXml(cover.tag);
  const theme = cover.theme;
  return `
  <svg width="1376" height="768" viewBox="0 0 1376 768" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bg1}" />
        <stop offset="60%" stop-color="${theme.bg2}" />
        <stop offset="100%" stop-color="${theme.bg1}" />
      </linearGradient>

      <!-- Glow 1 -->
      <radialGradient id="glow1" cx="20%" cy="30%" r="60%">
        <stop offset="0%" stop-color="${theme.accent1}" stop-opacity="0.25" />
        <stop offset="60%" stop-color="${theme.accent1}" stop-opacity="0.03" />
        <stop offset="100%" stop-color="${theme.accent1}" stop-opacity="0" />
      </radialGradient>

      <!-- Glow 2 -->
      <radialGradient id="glow2" cx="80%" cy="70%" r="50%">
        <stop offset="0%" stop-color="${theme.accent2}" stop-opacity="0.22" />
        <stop offset="50%" stop-color="${theme.accent2}" stop-opacity="0.04" />
        <stop offset="100%" stop-color="${theme.accent2}" stop-opacity="0" />
      </radialGradient>

      <!-- Text Gradient -->
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="60%" stop-color="#f8fafc" />
        <stop offset="100%" stop-color="${theme.accent3}" />
      </linearGradient>

      <!-- Gold Accent Gradient -->
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.accent1}" />
        <stop offset="100%" stop-color="${theme.accent2}" />
      </linearGradient>

      <!-- Grid Pattern -->
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1" />
      </pattern>
    </defs>

    <!-- Background Base -->
    <rect width="1376" height="768" fill="url(#bgGrad)" />
    <rect width="1376" height="768" fill="url(#grid)" />
    <rect width="1376" height="768" fill="url(#glow1)" />
    <rect width="1376" height="768" fill="url(#glow2)" />

    <!-- Abstract Geometric Art on Right Side -->
    <g transform="translate(850, 160)" opacity="0.85">
      <!-- Outer Orbit Circle -->
      <circle cx="220" cy="220" r="240" fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.5" stroke-dasharray="6 8" />
      <circle cx="220" cy="220" r="180" fill="none" stroke="${theme.accent1}" stroke-opacity="0.2" stroke-width="2" />
      <circle cx="220" cy="220" r="120" fill="none" stroke="${theme.accent2}" stroke-opacity="0.3" stroke-width="1.5" stroke-dasharray="4 4" />

      <!-- Glowing Core Hexagon / Star -->
      <polygon points="220,130 298,175 298,265 220,310 142,265 142,175" fill="rgba(255,255,255,0.03)" stroke="${theme.accent3}" stroke-width="2" />
      <circle cx="220" cy="220" r="40" fill="url(#accentGrad)" opacity="0.8" />
      <circle cx="220" cy="220" r="15" fill="#ffffff" />

      <!-- Connecting Node Lines -->
      <line x1="220" y1="130" x2="350" y2="70" stroke="${theme.accent1}" stroke-width="1.5" stroke-opacity="0.6" />
      <circle cx="350" cy="70" r="6" fill="${theme.accent3}" />
      
      <line x1="298" y1="265" x2="400" y2="340" stroke="${theme.accent2}" stroke-width="1.5" stroke-opacity="0.6" />
      <circle cx="400" cy="340" r="8" fill="${theme.accent2}" />

      <line x1="142" y1="265" x2="40" y2="350" stroke="${theme.accent1}" stroke-width="1.5" stroke-opacity="0.5" />
      <circle cx="40" cy="350" r="5" fill="${theme.accent1}" />

      <!-- Ambient Floating Squares -->
      <rect x="50" y="80" width="24" height="24" rx="4" fill="none" stroke="${theme.accent3}" stroke-opacity="0.4" transform="rotate(45 62 92)" />
      <rect x="360" y="210" width="18" height="18" rx="3" fill="none" stroke="${theme.accent2}" stroke-opacity="0.5" transform="rotate(20 369 219)" />
    </g>

    <!-- Top Left Badge -->
    <g transform="translate(100, 140)">
      <!-- Badge Box -->
      <rect x="0" y="0" width="260" height="38" rx="4" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
      <!-- Pulsing Dot -->
      <circle cx="20" cy="19" r="4" fill="${theme.accent1}" />
      <text x="36" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="3" fill="${theme.accent3}" text-transform="uppercase">
        ${tag}
      </text>
    </g>

    <!-- Main Headings -->
    <g transform="translate(100, 260)">
      <!-- Title Line 1 -->
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" letter-spacing="-1" fill="#ffffff">
        ${title}
      </text>
      
      <!-- Subtitle Line 2 (Highlighted Gradient) -->
      <text x="0" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="52" font-weight="900" letter-spacing="-1" fill="url(#textGrad)">
        ${subtitle}
      </text>

      <!-- Decorative Divider Bar -->
      <rect x="0" y="115" width="80" height="4" rx="2" fill="${theme.accent1}" />

      <!-- Description Line -->
      <text x="0" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="400" fill="#94a3b8" letter-spacing="0.5">
        ${desc}
      </text>
    </g>

    <!-- Bottom Left Metadata Bar -->
    <g transform="translate(100, 640)">
      <circle cx="16" cy="16" r="16" fill="rgba(251, 191, 36, 0.2)" stroke="${theme.accent3}" stroke-width="1.5" />
      <text x="16" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle">K</text>
      
      <text x="46" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#e2e8f0" letter-spacing="1">
        ILHAM KURNIAWAN · KAIRAV
      </text>
      <text x="46" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748b" letter-spacing="2">
        FULLSTACK DEVELOPER &amp; DIGITAL ESSAYS
      </text>
    </g>

    <!-- Bottom Right Watermark Accent -->
    <g transform="translate(1180, 645)" opacity="0.6">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748b" letter-spacing="3">
        2026 EDITION
      </text>
    </g>

    <!-- Frame Border Accents -->
    <rect x="24" y="24" width="1328" height="720" rx="8" fill="none" stroke="rgba(255, 255, 255, 0.07)" stroke-width="1" />
    <!-- Top-Left Corner Accent -->
    <path d="M 24 50 L 24 24 L 50 24" fill="none" stroke="${theme.accent1}" stroke-width="2.5" />
    <!-- Bottom-Right Corner Accent -->
    <path d="M 1352 718 L 1352 744 L 1326 744" fill="none" stroke="${theme.accent1}" stroke-width="2.5" />
  </svg>
  `;
}

async function main() {
  const outputDir = path.resolve('public/blog');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const cover of covers) {
    const svgString = generateSVG(cover);
    const avifPath = path.join(outputDir, `${cover.filename}.avif`);
    const jpgPath = path.join(outputDir, `${cover.filename}.jpg`);

    const svgBuffer = Buffer.from(svgString);

    await sharp(svgBuffer)
      .avif({ quality: 85 })
      .toFile(avifPath);

    await sharp(svgBuffer)
      .jpeg({ quality: 90 })
      .toFile(jpgPath);

    console.log(`Generated: ${cover.filename}.avif & .jpg`);
  }
  console.log('All 7 blog cover images generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
