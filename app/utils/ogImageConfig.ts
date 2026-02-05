/**
 * OG Image Configuration and Utilities
 * 
 * Centralized configuration for OG image generation across the site
 */

interface OgImageConfig {
  emoji: string
  accentColor: string
  subtitle?: string
}

/**
 * OG Image configurations for different page types
 */
export const OG_IMAGE_CONFIG: Record<string, OgImageConfig> = {
  home: {
    emoji: '💻',
    accentColor: '#fbbf24',
    subtitle: 'Fullstack Developer & Creative Mind',
  },
  about: {
    emoji: '👨‍💻',
    accentColor: '#60a5fa',
    subtitle: 'Getting to know the developer behind the code',
  },
  portfolio: {
    emoji: '🎨',
    accentColor: '#ec4899',
    subtitle: 'Portfolio Project',
  },
  gallery: {
    emoji: '📸',
    accentColor: '#60a5fa',
    subtitle: 'Visual stories & moments captured',
  },
  cv: {
    emoji: '📄',
    accentColor: '#10b981',
    subtitle: 'Download my professional CV',
  },
  article: {
    emoji: '📝',
    accentColor: '#8b5cf6',
    subtitle: 'Technical Article',
  },
}

/**
 * Get OG image configuration by page type
 */
export const getOgImageConfig = (pageType: keyof typeof OG_IMAGE_CONFIG): OgImageConfig => {
  return OG_IMAGE_CONFIG[pageType] || OG_IMAGE_CONFIG['home'] as OgImageConfig
}

/**
 * Build OG image URL with parameters
 */
export const buildOgImageUrl = (
  baseUrl: string,
  options: {
    title: string
    subtitle?: string
    emoji?: string
    accentColor?: string
  }
): string => {
  const params = new URLSearchParams({
    title: encodeURIComponent(options.title),
    subtitle: encodeURIComponent(options.subtitle || ''),
    emoji: options.emoji || '💻',
    accentColor: options.accentColor || '#fbbf24',
  })

  return `${baseUrl}/api/og-image?${params.toString()}`
}

/**
 * Format text for OG image (truncate if needed)
 */
export const formatOgImageText = (text: string, maxLength: number = 60): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}
