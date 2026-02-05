/**
 * Dynamic OG Image API Route
 * Generates Open Graph images on-the-fly with custom text and styling
 */

export default defineEventHandler(async (event) => {
  // Get query parameters
  const query = getQuery(event)
  
  const title = (query.title as string) || 'Ilham Kurniawan'
  const subtitle = (query.subtitle as string) || 'Fullstack Developer & Creative Mind'
  const bgColor = (query.bgColor as string) || '#0f172a'
  const textColor = (query.textColor as string) || '#ffffff'
  const accentColor = (query.accentColor as string) || '#fbbf24'
  const width = parseInt(query.width as string) || 1200
  const height = parseInt(query.height as string) || 630
  const emoji = (query.emoji as string) || '💻'
  const fontSize = parseInt(query.fontSize as string) || 60
  const gradient = query.gradient === 'true'

  // Create SVG image
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          .title {
            font-family: 'Inter', sans-serif;
            font-size: ${fontSize}px;
            font-weight: 700;
            fill: ${textColor};
            text-anchor: middle;
            word-break: break-word;
            white-space: pre-wrap;
          }
          .subtitle {
            font-family: 'Inter', sans-serif;
            font-size: ${Math.floor(fontSize * 0.4)}px;
            font-weight: 400;
            fill: ${accentColor};
            text-anchor: middle;
            white-space: pre-wrap;
          }
          .emoji {
            font-size: ${Math.floor(fontSize * 1.2)}px;
            text-anchor: middle;
          }
        </style>
        ${
          gradient
            ? `
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${adjustColor(bgColor, -20)};stop-opacity:1" />
          </linearGradient>
        `
            : ''
        }
      </defs>
      
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="${gradient ? 'url(#bgGradient)' : bgColor}"/>
      
      <!-- Decorative elements -->
      <circle cx="100" cy="100" r="80" fill="${accentColor}" opacity="0.1"/>
      <circle cx="${width - 100}" cy="${height - 100}" r="100" fill="${accentColor}" opacity="0.1"/>
      <rect x="0" y="0" width="${width}" height="2" fill="${accentColor}" opacity="0.3"/>
      
      <!-- Content -->
      <text x="${width / 2}" y="${height / 2 - 80}" class="emoji">${emoji}</text>
      <text x="${width / 2}" y="${height / 2 + 40}" class="title">${escapeXml(title)}</text>
      <text x="${width / 2}" y="${height / 2 + 120}" class="subtitle">${escapeXml(subtitle)}</text>
      
      <!-- Bottom accent line -->
      <line x1="200" y1="${height - 60}" x2="${width - 200}" y2="${height - 60}" stroke="${accentColor}" stroke-width="3" opacity="0.6"/>
    </svg>
  `

  // Set response headers
  setHeader(event, 'Content-Type', 'image/svg+xml')
  setHeader(event, 'Cache-Control', 'public, max-age=86400') // Cache for 24 hours

  return svg
})

/**
 * Escape XML special characters
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .substring(0, 100) // Limit to 100 characters to prevent overflow
}

/**
 * Adjust color brightness
 */
function adjustColor(color: string, percent: number): string {
  // Simple color adjustment (works with hex colors)
  if (color.startsWith('#')) {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = Math.min(255, (num >> 16) + amt)
    const G = Math.min(255, ((num >> 8) & 0x00ff) + amt)
    const B = Math.min(255, (num & 0x0000ff) + amt)
    return '#' + (0x1000000 + (R < 255 ? R : 255) * 0x10000 + (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255)).toString(16).slice(1)
  }
  return color
}
