/**
 * Dynamic OG Image Generator Composable
 * 
 * Generates optimized Open Graph images for social media sharing
 * using nuxt-og-image with dynamic content
 */

interface OgImageOptions {
  /** Main title text */
  title?: string
  /** Subtitle text */
  subtitle?: string
  /** Background color (hex or rgb) */
  bgColor?: string
  /** Text color (hex or rgb) */
  textColor?: string
  /** Accent color for highlights */
  accentColor?: string
  /** Width of the image */
  width?: number
  /** Height of the image */
  height?: number
  /** Custom emoji/icon */
  emoji?: string
  /** Font size for title */
  fontSize?: number
  /** Image for background */
  backgroundImage?: string
  /** Enable gradient background */
  gradient?: boolean
}

export const useOgImage = (options: OgImageOptions = {}) => {
  const {
    title = 'Ilham Kurniawan',
    subtitle = 'Fullstack Developer & Creative Mind',
    bgColor = '#0f172a',
    textColor = '#ffffff',
    accentColor = '#fbbf24',
    width = 1200,
    height = 630,
    emoji = '💻',
    fontSize = 60,
    gradient = true,
  } = options

  // Generate OG image using @nuxtjs/og-image
  const generateOgImage = () => {
    const searchParams = new URLSearchParams({
      title: title || 'Ilham Kurniawan',
      subtitle: subtitle || 'Fullstack Developer',
      bgColor,
      textColor,
      accentColor,
      width: width.toString(),
      height: height.toString(),
      emoji,
      fontSize: fontSize.toString(),
      gradient: gradient.toString(),
    })

    // Replace spaces and special characters for URL safety
    const encodedTitle = encodeURIComponent(title)
    const encodedSubtitle = encodeURIComponent(subtitle)

    return `/og-image.png?title=${encodedTitle}&subtitle=${encodedSubtitle}&${searchParams.toString()}`
  }

  return {
    generateOgImage,
    imageUrl: generateOgImage(),
  }
}

/**
 * Helper function to generate OG image for portfolio items
 */
export const usePortfolioOgImage = (
  projectTitle: string,
  category: string,
  projectImage?: string
) => {
  return useOgImage({
    title: projectTitle,
    subtitle: category,
    emoji: '🎨',
    bgColor: '#1a1f35',
    gradient: true,
  })
}

/**
 * Helper function to generate OG image for articles/blog posts
 */
export const useArticleOgImage = (
  articleTitle: string,
  author: string = 'Ilham Kurniawan'
) => {
  return useOgImage({
    title: articleTitle,
    subtitle: `by ${author}`,
    emoji: '📝',
    bgColor: '#1e3a5f',
    gradient: true,
  })
}
