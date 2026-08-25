<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  label?: string
  siteName?: string
  siteUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'ILHAM KURNIAWAN',
  description: 'Digital Solutions for Modern Web, System Architecture & Creative Engineering.',
  label: 'DIGITAL ARCHITECT',
  siteName: 'KAIRAV',
  siteUrl: 'ilhamkrnwan.my.id',
})

const truncate = (value: string | undefined, max: number) => {
  const text = (value || '').trim()
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trim()}...`
}

const displayTitle = truncate(props.title, 55).toUpperCase()
const displayDescription = truncate(props.description, 110)

// Split title to highlight the last word(s) in amber (#fbbf24)
const words = displayTitle.split(' ')
let titlePrefix = ''
let titleHighlight = ''

if (words.length > 2) {
  const highlightCount = Math.min(2, Math.max(1, Math.floor(words.length / 3)))
  titlePrefix = words.slice(0, words.length - highlightCount).join(' ')
  titleHighlight = words.slice(words.length - highlightCount).join(' ')
} else if (words.length === 2) {
  titlePrefix = words[0]
  titleHighlight = words[1]
} else {
  titlePrefix = words[0] || 'ILHAM'
  titleHighlight = 'KURNIAWAN'
}
</script>

<template>
  <div style="position: relative; display: flex; width: 1200px; height: 630px; overflow: hidden; background-color: #05080f; color: #f8fafc; font-family: Inter, sans-serif;">
    <!-- Background Grid Pattern SVG -->
    <svg
      style="position: absolute; inset: 0; width: 1200px; height: 630px; opacity: 0.35;"
      xmlns="http://www.w3.org/2000/svg"
      width="1200"
      height="630"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="1" />
        </pattern>
        <radialGradient id="amberGlow" cx="20%" cy="35%" r="60%">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.18" />
          <stop offset="50%" stop-color="#d97706" stop-opacity="0.06" />
          <stop offset="100%" stop-color="#05080f" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="cyanGlow" cx="80%" cy="45%" r="50%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.12" />
          <stop offset="60%" stop-color="#0284c7" stop-opacity="0.03" />
          <stop offset="100%" stop-color="#05080f" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grid)" />
      <rect width="1200" height="630" fill="url(#amberGlow)" />
      <rect width="1200" height="630" fill="url(#cyanGlow)" />
    </svg>

    <!-- Corner Brackets -->
    <!-- Top-Left Bracket -->
    <div style="position: absolute; top: 40px; left: 40px; width: 28px; height: 28px; border-top: 3px solid #f59e0b; border-left: 3px solid #f59e0b; display: flex;" />
    <!-- Bottom-Right Bracket -->
    <div style="position: absolute; bottom: 40px; right: 40px; width: 28px; height: 28px; border-bottom: 3px solid #f59e0b; border-right: 3px solid #f59e0b; display: flex;" />

    <!-- Main Content Left Column -->
    <div style="position: absolute; left: 80px; top: 75px; width: 680px; display: flex; flex-direction: column;">
      
      <!-- Category / Label Pill -->
      <div style="display: flex; align-items: center; gap: 8px; align-self: flex-start; padding: 6px 16px; border-radius: 4px; border: 1px solid rgba(245, 158, 11, 0.4); background: rgba(245, 158, 11, 0.08); margin-bottom: 28px;">
        <div style="width: 7px; height: 7px; border-radius: 50%; background: #f59e0b; display: flex;" />
        <div style="font-size: 13px; font-weight: 800; color: #fbbf24; letter-spacing: 0.16em; font-family: monospace; text-transform: uppercase; display: flex;">
          {{ label }}
        </div>
      </div>

      <!-- Main Title (with amber highlighted words) -->
      <div style="font-size: 50px; font-weight: 900; line-height: 1.12; letter-spacing: -0.02em; display: flex; flex-wrap: wrap; margin-bottom: 24px;">
        <span style="color: #ffffff; margin-right: 14px;">{{ titlePrefix }}</span>
        <span style="color: #fbbf24;">{{ titleHighlight }}</span>
      </div>

      <!-- Accent Divider Line -->
      <div style="width: 54px; height: 3px; background: #f59e0b; border-radius: 2px; margin-bottom: 20px; display: flex;" />

      <!-- Subtitle Description -->
      <div style="font-size: 20px; font-weight: 400; color: rgba(203, 213, 225, 0.85); line-height: 1.45; max-width: 640px; display: flex;">
        {{ displayDescription }}
      </div>
    </div>

    <!-- Right Side Geometric Futuristic Visual -->
    <div style="position: absolute; right: 50px; top: 90px; width: 440px; height: 440px; display: flex; align-items: center; justify-content: center;">
      <svg width="440" height="440" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#06b6d4" />
            <stop offset="50%" stop-color="#0d9488" />
            <stop offset="100%" stop-color="#f59e0b" />
          </linearGradient>
          <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#06b6d4" stop-opacity="0.2" />
          </linearGradient>
        </defs>

        <!-- Outer Orbit Rings -->
        <circle cx="220" cy="220" r="185" fill="none" stroke="#1e293b" stroke-width="1.5" stroke-dasharray="6 6" />
        <circle cx="220" cy="220" r="145" fill="none" stroke="#334155" stroke-width="1.2" />
        <circle cx="220" cy="220" r="95" fill="none" stroke="rgba(245, 158, 11, 0.25)" stroke-width="1.5" stroke-dasharray="4 4" />

        <!-- Diagonal Connecting Lines -->
        <line x1="90" y1="350" x2="350" y2="90" stroke="url(#lineGrad1)" stroke-width="1.8" />
        <line x1="220" y1="220" x2="385" y2="300" stroke="#06b6d4" stroke-width="1.5" stroke-opacity="0.7" />

        <!-- Central Hexagon -->
        <polygon
          points="220,110 315,165 315,275 220,330 125,275 125,165"
          fill="none"
          stroke="#f59e0b"
          stroke-width="2.5"
        />

        <!-- Inner Glowing Orb -->
        <circle cx="220" cy="220" r="42" fill="url(#orbGrad)" />
        <circle cx="220" cy="220" r="15" fill="#ffffff" />

        <!-- Orbiting Satellite Nodes -->
        <circle cx="90" cy="350" r="6" fill="#f59e0b" />
        <circle cx="350" cy="90" r="6" fill="#fbbf24" />
        <circle cx="385" cy="300" r="7" fill="#06b6d4" />
        <rect x="360" y="160" width="10" height="10" transform="rotate(45 365 165)" fill="none" stroke="#38bdf8" stroke-width="1.5" />
        <rect x="75" y="215" width="8" height="8" transform="rotate(45 79 219)" fill="none" stroke="#f59e0b" stroke-width="1.5" />
      </svg>
    </div>

    <!-- Bottom Footer Bar -->
    <div style="position: absolute; left: 80px; right: 80px; bottom: 50px; display: flex; align-items: center; justify-content: space-between;">
      <!-- Left: Logo & Identity -->
      <div style="display: flex; align-items: center; gap: 14px;">
        <div style="width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid #f59e0b; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 17px; color: #fbbf24;">
          K
        </div>
        <div style="display: flex; flex-direction: column;">
          <div style="font-size: 14px; font-weight: 800; color: #ffffff; letter-spacing: 0.1em; font-family: monospace; display: flex;">
            ILHAM KURNIAWAN · KAIRAV
          </div>
          <div style="font-size: 11px; font-weight: 600; color: rgba(148, 163, 184, 0.7); letter-spacing: 0.12em; font-family: monospace; text-transform: uppercase; display: flex;">
            FULLSTACK DEVELOPER & DIGITAL ARCHITECT
          </div>
        </div>
      </div>

      <!-- Right: Edition / Domain -->
      <div style="font-size: 13px; font-weight: 700; color: rgba(148, 163, 184, 0.65); letter-spacing: 0.18em; font-family: monospace; text-transform: uppercase; display: flex;">
        2026 EDITION
      </div>
    </div>
  </div>
</template>
