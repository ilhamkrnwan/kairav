/**
 * JSON-LD Structured Data Composable
 *
 * Provides reusable functions to inject Schema.org JSON-LD
 * into <head> for SEO and Generative Engine Optimization (GEO).
 *
 * Supports: Person, WebSite, ProfilePage, CreativeWork, BlogPosting
 */

interface PersonSchemaOptions {
  siteUrl?: string
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

/**
 * Shared person data used across schemas
 */
const getPersonData = (siteUrl: string) => ({
  '@type': 'Person',
  'name': 'Ilham Kurniawan',
  'alternateName': 'ilhamkrnwan',
  'url': siteUrl,
  'image': `${siteUrl}/ilham-hero.avif`,
  'jobTitle': 'Fullstack Developer',
  'description': 'Fullstack Developer dari Indonesia, spesialisasi dalam Nuxt.js, Vue.js, Laravel, Flutter, dan UI/UX Design. Membangun web application, mobile app, dan solusi digital yang scalable.',
  'knowsAbout': [
    'Fullstack Web Development',
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
    'Docker',
    'Git',
  ],
  'sameAs': [
    'https://github.com/ilhamkrnwan',
    'https://linkedin.com/in/ilhamkrnwan',
  ],
  'worksFor': [
    {
      '@type': 'Organization',
      'name': 'Sekeco',
      'description': 'Software Services Company',
    },
    {
      '@type': 'Organization',
      'name': 'Indotech',
      'description': 'WordPress Development Experience',
    },
    {
      '@type': 'Organization',
      'name': 'Jurutani',
      'description': 'Platform Pertanian Digital',
    },
  ],
  'alumniOf': {
    '@type': 'EducationalOrganization',
    'name': 'Universitas Nahdlatul Ulama Yogyakarta (UNUYO)',
  },
  'nationality': {
    '@type': 'Country',
    'name': 'Indonesia',
  },
})

/**
 * Inject Person schema — identity of Ilham Kurniawan
 */
export const usePersonSchema = (options: PersonSchemaOptions = {}) => {
  const config = useRuntimeConfig()
  const siteUrl = options.siteUrl || config.public.siteUrl || DEFAULT_SITE_URL

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
 * Inject WebSite schema — site-level metadata
 */
export const useWebSiteSchema = (options: PersonSchemaOptions = {}) => {
  const config = useRuntimeConfig()
  const siteUrl = options.siteUrl || config.public.siteUrl || DEFAULT_SITE_URL

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Ilham Kurniawan — Fullstack Developer Portfolio',
    'alternateName': 'KAIRAV',
    'url': siteUrl,
    'description':
      'Portfolio website Ilham Kurniawan, Fullstack Developer dari Indonesia. Menampilkan proyek web application, mobile app, dan solusi digital menggunakan Nuxt.js, Vue.js, Laravel, Flutter.',
    'author': getPersonData(siteUrl),
    'inLanguage': ['id-ID', 'en-US'],
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${siteUrl}/portofolio?q={search_term_string}`,
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
 * Inject ProfilePage schema — for about page
 */
export const useProfilePageSchema = (options: PersonSchemaOptions = {}) => {
  const config = useRuntimeConfig()
  const siteUrl = options.siteUrl || config.public.siteUrl || DEFAULT_SITE_URL

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    'name': 'Tentang Ilham Kurniawan — Fullstack Developer',
    'url': `${siteUrl}/about`,
    'description':
      'Profil lengkap Ilham Kurniawan: pendidikan di UNUYO, pengalaman sebagai Fullstack Developer di Sekeco dan Jurutani, keahlian Nuxt.js/Vue.js/Laravel/Flutter, dan ketersediaan untuk kolaborasi.',
    'mainEntity': getPersonData(siteUrl),
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
 * Inject CreativeWork / SoftwareApplication schema — for portfolio items
 */
export const useCreativeWorkSchema = (project: CreativeWorkOptions = {}) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || DEFAULT_SITE_URL

  if (!project.title) return

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': project.title,
    'description': project.description || '',
    'url': project.url || siteUrl,
    'image': project.image
      ? project.image.startsWith('/')
        ? `${siteUrl}${project.image}`
        : project.image
      : undefined,
    'datePublished': project.datePublished,
    'applicationCategory': project.category || 'WebApplication',
    'author': {
      '@type': 'Person',
      'name': 'Ilham Kurniawan',
      'url': siteUrl,
    },
    'creator': {
      '@type': 'Person',
      'name': 'Ilham Kurniawan',
      'url': siteUrl,
    },
    ...(project.tags && project.tags.length > 0
      ? { keywords: project.tags.join(', ') }
      : {}),
    ...(project.client
      ? {
          sourceOrganization: {
            '@type': 'Organization',
            'name': project.client,
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
 * Inject BlogPosting schema — for blog articles
 */
export const useBlogPostingSchema = (article: BlogPostingOptions = {}) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || DEFAULT_SITE_URL

  if (!article.title) return

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': article.title,
    'description': article.description || '',
    'url': article.url || siteUrl,
    'image': article.coverImage
      ? article.coverImage.startsWith('/')
        ? `${siteUrl}${article.coverImage}`
        : article.coverImage
      : undefined,
    'datePublished': article.datePublished,
    'author': {
      '@type': 'Person',
      'name': article.author || 'Ilham Kurniawan',
      'url': siteUrl,
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Ilham Kurniawan',
      'url': siteUrl,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteUrl}/kairav.avif`,
      },
    },
    ...(article.category
      ? { articleSection: article.category }
      : {}),
    ...(article.tags && article.tags.length > 0
      ? { keywords: article.tags.join(', ') }
      : {}),
    'inLanguage': 'id-ID',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': article.url || siteUrl,
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
