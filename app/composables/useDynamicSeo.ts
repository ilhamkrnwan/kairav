/**
 * Dynamic SEO Composable for Nuxt 4
 * 
 * This composable provides a unified, dynamic way to manage SEO meta tags
 * across all pages with i18n support.
 * 
 * Features:
 * - Dynamic title and description with i18n support
 * - Open Graph tags for social media sharing
 * - Twitter Card support
 * - Canonical URL handling
 * - Multilingual support
 * - Image optimization for social sharing
 * 
 * @example
 * // Basic usage
 * useDynamicSeo({
 *   title: 'My Page Title',
 *   description: 'Page description'
 * })
 * 
 * // With i18n key
 * useDynamicSeo({
 *   titleKey: 'seo.home.title',
 *   descriptionKey: 'seo.home.description'
 * })
 * 
 * // With fallback image when dynamic OG is disabled
 * useDynamicSeo({
 *   title: 'Project Name',
 *   description: 'Project description',
 *   image: '/og-image.jpg',
 *   disableDynamicOg: true
 * })
 */

interface SeoOptions {
  /** Page title - will be suffixed with site name */
  title?: string
  /** i18n key for title translation */
  titleKey?: string
  /** Page description for meta tags */
  description?: string
  /** i18n key for description translation */
  descriptionKey?: string
  /** Fallback image URL when disableDynamicOg is true */
  image?: string
  /** Label shown in the dynamic OG image */
  label?: string
  /** Page type for Open Graph (default: 'website') */
  type?: 'website' | 'article' | 'profile'
  /** Article publish date (for type='article') */
  publishedTime?: string
  /** Article modified date (for type='article') */
  modifiedTime?: string
  /** Article tags (for type='article') */
  tags?: string[]
  /** Twitter card type (default: 'summary_large_image') */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  /** Custom canonical URL (auto-generated if not provided) */
  canonical?: string
  /** Disable auto-suffix for title (default: true) */
  noSuffix?: boolean
  /** Disable generated nuxt-og-image output */
  disableDynamicOg?: boolean
}

export const useDynamicSeo = (options: SeoOptions = {}) => {
  const { t, locale } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()
  
  // Get base site URL from runtime config
  const siteUrl = config.public.siteUrl || 'https://ilhamkrnwan.my.id'
  const siteName = 'Ilham Kurniawan | Kairav'
  
  // Resolve title
  const getTitle = () => {
    let title = ''
    
    if (options.titleKey) {
      title = t(options.titleKey)
    } else if (options.title) {
      title = options.title
    } else {
      title = t('seo.default.title')
    }
    
    // Add site name suffix only when explicitly enabled with noSuffix: false
    if (options.noSuffix === false && !title.includes(siteName)) {
      return `${title} - ${siteName}`
    }
    
    return title
  }
  
  // Resolve description
  const getDescription = () => {
    if (options.descriptionKey) {
      return t(options.descriptionKey)
    } else if (options.description) {
      return options.description
    } else {
      return t('seo.default.description')
    }
  }
  
  // Resolve canonical URL
  const getCanonical = () => {
    if (options.canonical) {
      return options.canonical
    }
    
    // Generate canonical URL from current route
    const path = route.path
    return `${siteUrl}${path}`
  }
  
  // Resolve fallback image URL for non-dynamic usage
  const getImage = () => {
    if (options.image) {
      // If image is relative, make it absolute
      if (options.image.startsWith('/')) {
        return `${siteUrl}${options.image}`
      }
      return options.image
    }
    
    // Default OG image (use .jpg for maximum social media compatibility)
    return `${siteUrl}/og-image.jpg`
  }

  const getOgLabel = () => {
    if (options.label) return options.label
    if (route.path.startsWith('/services')) return 'Services'
    if (route.path.startsWith('/portofolio')) return options.type === 'article' ? 'Project' : 'Portfolio'
    if (route.path.startsWith('/blogs')) return options.type === 'article' ? 'Article' : 'Blog'
    if (route.path.startsWith('/contact')) return 'Contact'
    if (route.path.startsWith('/about')) return 'Profile'
    if (route.path.startsWith('/cv')) return 'Curriculum Vitae'
    if (route.path.startsWith('/gallery')) return 'Gallery'
    return 'Digital Solution'
  }

  if (!options.disableDynamicOg) {
    defineOgImage({
      component: 'DefaultOgImage',
      extension: 'png',
      width: 1200,
      height: 630,
      alt: getTitle(),
      props: {
        title: getTitle(),
        description: getDescription(),
        label: getOgLabel(),
        siteName: 'KAIRAV',
        siteUrl: 'ilhamkrnwan.my.id',
      },
    })
  }
  
  // Set SEO meta tags
  useSeoMeta({
    // Basic meta tags
    title: getTitle,
    description: getDescription,
    
    // Open Graph tags
    ogTitle: getTitle,
    ogDescription: getDescription,
    ogType: options.type || 'website',
    ogUrl: getCanonical,
    ...(options.disableDynamicOg
      ? {
          ogImage: getImage,
          ogImageAlt: getTitle,
        }
      : {}),
    ogLocale: locale.value === 'id' ? 'id_ID' : 'en_US',
    ogSiteName: siteName,
    
    // Article specific tags
    ...(options.type === 'article' && {
      articlePublishedTime: options.publishedTime,
      articleModifiedTime: options.modifiedTime,
      articleTag: options.tags,
    }),
    
    // Twitter Card tags
    twitterCard: options.twitterCard || 'summary_large_image',
    twitterTitle: getTitle,
    twitterDescription: getDescription,
    ...(options.disableDynamicOg
      ? {
          twitterImage: getImage,
          twitterImageAlt: getTitle,
        }
      : {}),
    
    // Additional meta tags
    robots: 'index, follow',
    author: 'Ilham Kurniawan',
    creator: 'Ilham Kurniawan',
    publisher: siteName,
  })
  
  // Set canonical link
  useHead({
    link: [
      {
        rel: 'canonical',
        href: getCanonical(),
      },
    ],
    htmlAttrs: {
      lang: locale.value,
    },
  })
  
  // Return computed values for potential use in template
  return {
    title: computed(getTitle),
    description: computed(getDescription),
    canonical: computed(getCanonical),
    image: computed(getImage),
  }
}
