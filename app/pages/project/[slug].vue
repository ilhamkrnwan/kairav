<script setup>
  const route = useRoute()

  // SEO Meta
  useHead({
    title: () => `${route.params.slug} - Project Details`,
    meta: [
      { name: 'description', content: 'Project details and case study.' }
    ]
  })

  // Handle 404
  const { data: page } = await useAsyncData(`project-${route.params.slug}`, () => queryContent("project", route.params.slug).findOne())
  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' })
  }
</script>

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
          <!-- Key Info -->
          <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-gray-600 dark:text-gray-400">
            <span v-if="doc.year"><strong>Year:</strong> {{ doc.year }}</span>
            <span v-if="doc.role"><strong>Role:</strong> {{ doc.role }}</span>
            <span v-if="doc.duration"><strong>Duration:</strong> {{ doc.duration }}</span>
          </div>
          <!-- Technologies -->
          <div class="flex flex-wrap justify-center gap-2 mt-4 max-w-3xl mx-auto">
            <span
              v-for="tech in doc.technologies"
              :key="tech"
              class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- Carousel Section -->
      <div v-if="doc.carousel_images && doc.carousel_images.length" class="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
        <UiCarousel :images="doc.carousel_images" />
      </div>

      <!-- Content Renderer for markdown body -->
      <div class="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <!-- The markdown content, including the carousel, will be rendered here -->
          <ContentRenderer :value="doc" />
        </div>
      </div>

       <!-- Action Buttons -->
      <div v-if="doc.demo_url || doc.github_url" class="max-w-4xl mx-auto px-6 lg:px-8 pb-16 text-center">
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              v-if="doc.demo_url"
              :href="doc.demo_url"
              target="_blank">
              <StyleButton
              >
                Live Demo
              </StyleButton>
            </NuxtLink>
        </div>
      </div>

      <!-- Back to Projects Link -->
      <div class="text-center pb-20">
        <NuxtLink to="/project">
          <ButtonBorder>
              Back to All Projects
          </ButtonBorder>
        </NuxtLink>
      </div>

    </ContentDoc>
  </div>
</template>

<style>
/* Better Prose Styles */
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
.prose .slider-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.prose .slider-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}
.prose .slider-container img {
  border: 1px solid #e5e7eb; /* gray-200 */
}
.dark .prose .slider-container img {
  border-color: #4b5563; /* gray-600 */
}
</style>
