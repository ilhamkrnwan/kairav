/**
 * JSON-LD Structured Data Composable
 *
 * Provides reusable Schema.org JSON-LD helpers for SEO and
 * Generative Engine Optimization (GEO).
 *
 * Supports: Person, WebSite, ProfilePage, Service, OfferCatalog,
 * CreativeWork, BlogPosting.
 */

interface PersonSchemaOptions {
  siteUrl?: string
}

interface ServiceSchemaOptions {
  title?: string
  description?: string
  category?: string
  duration?: string
  deliverables?: string[]
  tags?: string[]
  url?: string
}

interface ServiceCatalogSchemaOptions {
  services?: ServiceSchemaOptions[]
  url?: string
}

interface CreativeWorkOptions {
  title?: string
  description?: string
  image?: string
  datePublished?: string
  category?: string
  tags?: string[]
  client?: string
  url?: string
}

interface BlogPostingOptions {
  title?: string
  description?: string
  coverImage?: string
  datePublished?: string
  author?: string
  category?: string
  tags?: string[]
  url?: string
}

const DEFAULT_SITE_URL = 'https://ilhamkrnwan.my.id'

const resolveSiteUrl = (optionSiteUrl?: string) => {
  const config = useRuntimeConfig()
  return optionSiteUrl || config.public.siteUrl || DEFAULT_SITE_URL
}

const toAbsoluteUrl = (url: string | undefined, siteUrl: string) => {
  if (!url) return undefined
  return url.startsWith('/') ? `${siteUrl}${url}` : url
}

/**
 * Shared person data used across schemas.
 */
const getPersonData = (siteUrl: string) => ({
  '@type': 'Person',
  name: 'Ilham Kurniawan',
  alternateName: 'ilhamkrnwan',
  url: siteUrl,
  image: `${siteUrl}/ilham-hero.avif`,
  jobTitle: 'Fullstack Developer',
  description:
    'Fullstack Developer dari Indonesia yang membangun website bisnis, toko online, dashboard admin, sistem informasi custom, integrasi API/AI, aplikasi web, aplikasi Android custom, serta optimasi SEO/GEO.',
  knowsAbout: [
    'Fullstack Web Development',
    'Business Website',
    'Company Profile Website',
    'Online Store',
    'Product Catalog',
    'Admin Dashboard',
    'Custom Information System',
    'API Integration',
    'AI Automation',
    'Custom Android App Development',
    'Mobile App Development',
    'SEO',
    'Generative Engine Optimization',
    'WordPress',
    'Vue.js',
    'Nuxt.js',
    'Laravel',
    'Flutter',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Tailwind CSS',
    'UI/UX Design',
    'REST API',
    'Supabase',
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'Cloudinary',
    'OpenAI',
    'Google Gemini',
    'Claude',
    'Qwen',
    'DeepSeek',
    'Docker',
    'Git',
  ],
  sameAs: [
    'https://github.com/ilhamkrnwan',
    'https://linkedin.com/in/ilhamkrnwan',
  ],
  worksFor: [
    {
      '@type': 'Organization',
      name: 'Sekeco',
      description: 'Software Services Company',
    },
    {
      '@type': 'Organization',
      name: 'Indotech',
      description: 'WordPress Development Experience',
    },
    {
      '@type': 'Organization',
      name: 'Jurutani',
      description: 'Platform Pertanian Digital',
    },
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Universitas Nahdlatul Ulama Yogyakarta (UNUYO)',
  },
  nationality: {
    '@type': 'Country',
    name: 'Indonesia',
  },
})

/**
 * Inject Person schema - identity of Ilham Kurniawan.
 */
export const usePersonSchema = (options: PersonSchemaOptions = {}) => {
  const siteUrl = resolveSiteUrl(options.siteUrl)

  const schema = {
    '@context': 'https://schema.org',
    ...getPersonData(siteUrl),
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
        tagPosition: 'head',
      },
    ],
  })
}

/**
 * Inject WebSite schema - site-level metadata.
 */
export const useWebSiteSchema = (options: PersonSchemaOptions = {}) => {
  const siteUrl = resolveSiteUrl(options.siteUrl)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ilham Kurniawan / KAIRAV - Portfolio and Digital Services',
    alternateName: ['KAIRAV', 'ilhamkrnwan'],
    url: siteUrl,
    description:
      'Portfolio dan layanan digital Ilham Kurniawan untuk website bisnis, toko online, dashboard admin, sistem informasi custom, integrasi API/AI, aplikasi web, aplikasi Android custom, dan optimasi SEO/GEO.',
    author: getPersonData(siteUrl),
    inLanguage: ['id-ID', 'en-US'],
    about: [
      'Website development',
      'Business website',
      'Online store',
      'Admin dashboard',
      'Custom information system',
      'API integration',
      'AI automation',
      'Android app development',
      'Mobile app development',
      'SEO',
      'Generative Engine Optimization',
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/portofolio?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
        tagPosition: 'head',
      },
    ],
  })
}

/**
 * Inject ProfilePage schema - for about page.
 */
export const useProfilePageSchema = (options: PersonSchemaOptions = {}) => {
  const siteUrl = resolveSiteUrl(options.siteUrl)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Tentang Ilham Kurniawan - Fullstack Developer',
    url: `${siteUrl}/about`,
    description:
      'Profil Ilham Kurniawan: Fullstack Developer Indonesia dengan pengalaman di Sekeco, Indotech, Jurutani, dan proyek freelance untuk website, dashboard, sistem custom, API/AI, serta SEO/GEO.',
    mainEntity: getPersonData(siteUrl),
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
        tagPosition: 'head',
      },
    ],
  })
}

/**
 * Inject OfferCatalog schema - for the services listing page.
 */
export const useServiceCatalogSchema = (options: ServiceCatalogSchemaOptions = {}) => {
  const siteUrl = resolveSiteUrl()
  const servicesUrl = toAbsoluteUrl(options.url || '/services', siteUrl)
  const services = options.services || []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Layanan Digital Ilham Kurniawan',
    url: servicesUrl,
    description:
      'Katalog layanan digital untuk website bisnis, toko online, dashboard admin, sistem informasi custom, integrasi API/AI, aplikasi web, aplikasi Android custom, dan optimasi SEO/GEO.',
    itemListElement: services.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        serviceType: service.category,
        url: toAbsoluteUrl(service.url, siteUrl),
        provider: getPersonData(siteUrl),
        areaServed: {
          '@type': 'Country',
          name: 'Indonesia',
        },
        ...(service.tags?.length ? { keywords: service.tags.join(', ') } : {}),
      },
    })),
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
        tagPosition: 'head',
      },
    ],
  })
}

/**
 * Inject Service schema - for service detail pages.
 */
export const useServiceSchema = (service: ServiceSchemaOptions = {}) => {
  if (!service.title) return

  const route = useRoute()
  const siteUrl = resolveSiteUrl()
  const serviceUrl = toAbsoluteUrl(service.url || route.path, siteUrl)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description || '',
    serviceType: service.category || 'Digital Service',
    url: serviceUrl,
    provider: getPersonData(siteUrl),
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Business, MSME, Startup, Organization',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      category: service.category || 'Digital Service',
      url: serviceUrl,
    },
    ...(service.duration ? { timeRequired: service.duration } : {}),
    ...(service.deliverables?.length ? { serviceOutput: service.deliverables } : {}),
    ...(service.tags?.length ? { keywords: service.tags.join(', ') } : {}),
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
        tagPosition: 'head',
      },
    ],
  })
}

/**
 * Inject CreativeWork / SoftwareApplication schema - for portfolio items.
 */
export const useCreativeWorkSchema = (project: CreativeWorkOptions = {}) => {
  const siteUrl = resolveSiteUrl()

  if (!project.title) return

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description || '',
    url: project.url || siteUrl,
    image: toAbsoluteUrl(project.image, siteUrl),
    datePublished: project.datePublished,
    applicationCategory: project.category || 'WebApplication',
    author: {
      '@type': 'Person',
      name: 'Ilham Kurniawan',
      url: siteUrl,
    },
    creator: {
      '@type': 'Person',
      name: 'Ilham Kurniawan',
      url: siteUrl,
    },
    ...(project.tags && project.tags.length > 0
      ? { keywords: project.tags.join(', ') }
      : {}),
    ...(project.client
      ? {
          sourceOrganization: {
            '@type': 'Organization',
            name: project.client,
          },
        }
      : {}),
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
        tagPosition: 'head',
      },
    ],
  })
}

/**
 * Inject BlogPosting schema - for blog articles.
 */
export const useBlogPostingSchema = (article: BlogPostingOptions = {}) => {
  const siteUrl = resolveSiteUrl()

  if (!article.title) return

  const articleUrl = toAbsoluteUrl(article.url, siteUrl) || siteUrl

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description || '',
    url: articleUrl,
    image: toAbsoluteUrl(article.coverImage, siteUrl),
    datePublished: article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author || 'Ilham Kurniawan',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Ilham Kurniawan',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/kairav.avif`,
      },
    },
    ...(article.category
      ? { articleSection: article.category }
      : {}),
    ...(article.tags && article.tags.length > 0
      ? { keywords: article.tags.join(', ') }
      : {}),
    inLanguage: 'id-ID',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  }

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
        tagPosition: 'head',
      },
    ],
  })
}
