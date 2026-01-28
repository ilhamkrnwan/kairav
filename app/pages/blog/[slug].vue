
<template>
  <div class="  text-gray-800 dark:text-white">
    <ContentDoc v-slot="{ doc }">
      <!-- Header Section -->
      <div class="px-4 py-16 mx-auto md:px-24 lg:px-32 lg:py-20">
        <div class="max-w-4xl mx-auto text-center">
          <TextGradient class="text-4xl md:text-5xl lg:text-6xl">{{ doc.title }}</TextGradient>
          <p class="mt-4 text-base text-gray-700 dark:text-gray-300 md:text-lg">
            {{ doc.description }}
          </p>
          <!-- Meta Info -->
          <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-gray-600 dark:text-gray-400">
            <span v-if="doc.date"><strong>Date:</strong> {{ new Date(doc.date).toLocaleDateString() }}</span>
            <span v-if="doc.author"><strong>Author:</strong> {{ doc.author }}</span>
          </div>
        </div>
      </div>

      <!-- Cover Image -->
      <div v-if="doc.coverImage" class="max-w-5xl mx-auto px-6 lg:px-8 pb-8">
        <img :src="doc.coverImage" :alt="doc.title + ' cover image'" class="w-full h-auto rounded-lg shadow-lg object-cover" style="max-height: 500px;" />
      </div>

      <!-- Content Renderer for markdown body -->
      <div class="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <ContentRenderer :value="doc" />
        </div>
      </div>

      <!-- Back to Blog Link -->
      <div class="text-center pb-20">
        <NuxtLink to="/blog">
          <ButtonBorder>
              Back to All Blogs
          </ButtonBorder>
        </NuxtLink>
      </div>

    </ContentDoc>
  </div>
</template>

<script setup>
  const route = useRoute()

  // SEO Meta
  useHead({
    title: () => `${route.params.slug} - Blog`,
    meta: [
      { name: 'description', content: 'Blog post details.' }
    ]
  })

  // Handle 404
  const { data: page } = await useAsyncData(`blog-${route.params.slug}`, () => queryContent("blog", route.params.slug).findOne())
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })
  }
</script>

<style>
/* Using the same prose styles from project slug */
.prose h2 {
  font-size: 1.875rem; /* text-3xl */
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb; /* gray-200 */
}
.dark .prose h2 {
    border-bottom-color: #374151; /* gray-700 */
}
.prose h3 {
  font-size: 1.5rem; /* text-2xl */
}
.prose img {
  border-radius: 0.75rem; /* 12px */
}
</style>
