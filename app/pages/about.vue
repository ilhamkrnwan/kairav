<script setup lang="ts">
// Dynamic SEO
useDynamicSeo({
  titleKey: 'seo.about.title',
  descriptionKey: 'seo.about.description',
  image: '/og-image.jpg'
})
</script>

<template>
    <div class="min-h-screen flex flex-wrap justify-center items-center w-full ">
      <AppAboutHero />
      <AppAboutFeatures />
      <AppAboutSkills />
      <AppAboutEducations/>
      <AppAboutWorks/>
      <AppAboutQuotes />
      <GetinTouch />
    </div>
</template>