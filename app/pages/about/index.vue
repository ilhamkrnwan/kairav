<script setup lang="ts">
// Dynamic SEO
useDynamicSeo({
  titleKey: 'seo.about.title',
  descriptionKey: 'seo.about.description',
  image: '/og-image.jpg'
})

// JSON-LD Structured Data for profile page
useProfilePageSchema()
</script>

<template>
    <div class="min-h-screen flex flex-wrap justify-center items-center w-full ">
      <AppAboutHero />
      <AppAboutMe />
      <AppAboutEducations />
      <AppAboutWorks/>
      <AppRecentBlogs />
      <AppAboutFaq />
      <AppAboutQuotes />
      <GetinTouch />
    </div>
</template>