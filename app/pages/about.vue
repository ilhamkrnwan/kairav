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
      <AppAboutEducations class="px-2"/>
      <AppAboutWorks class="px-2"/>
      <AppAboutQuotes />
      <GetinTouch />
    </div>
</template>