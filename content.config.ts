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
      })
    })
  }
})

