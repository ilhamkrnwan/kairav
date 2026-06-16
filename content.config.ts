import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md'
    }),
    portofolio: defineCollection({
      type: 'page',
      source: 'portofolio/**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        category: z.string().optional(),
        services: z.array(z.string()).optional(),
        client: z.string().optional(),
        date: z.string().optional(),
        status: z.string().optional(),
        industry: z.string().optional(),
        tags: z.array(z.string()).optional(),
        _path: z.string().optional(),
        url: z.string().optional(),
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        coverImage: z.string().optional(),
        author: z.string().optional(),
        date: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        readTime: z.string().optional(),
        _path: z.string().optional(),
      })
    }),
    services: defineCollection({
      type: 'page',
      source: 'services/**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        slug: z.string().optional(),
        icon: z.string().optional(),
        category: z.string().optional(),
        order: z.number().optional(),
        duration: z.string().optional(),
        deliverables: z.array(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().optional(),
        seo: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
        }).optional(),
        _path: z.string().optional(),
      })
    })
  }
})

