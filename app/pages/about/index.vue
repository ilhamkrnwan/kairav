<script setup lang="ts">
// Dynamic SEO
useDynamicSeo({
  titleKey: 'seo.about.title',
  descriptionKey: 'seo.about.description'
})

// JSON-LD Structured Data for profile page
useProfilePageSchema()

// Initialize Scroll Reveal Animations
useScrollReveal()
</script>

<template>
    <div class="min-h-screen flex flex-wrap justify-center items-center w-full">
      <div class="scroll-section will-change-[transform,opacity] w-full">
        <AppAboutHero />
      </div>
      <div class="scroll-section will-change-[transform,opacity] w-full">
        <AppAboutMe />
      </div>
      <div class="scroll-section will-change-[transform,opacity] w-full">
        <AppAboutEducations />
      </div>
      <div class="scroll-section will-change-[transform,opacity] w-full">
        <AppAboutWorks/>
      </div>
      <div class="scroll-section will-change-[transform,opacity] w-full">
        <AppRecentBlogs />
      </div>
      <div class="scroll-section will-change-[transform,opacity] w-full">
        <AppAboutFaq />
      </div>
      <div class="scroll-section will-change-[transform,opacity] w-full">
        <AppAboutQuotes />
      </div>
      <div class="scroll-section will-change-[transform,opacity] w-full">
        <GetinTouch />
      </div>
    </div>
</template>
