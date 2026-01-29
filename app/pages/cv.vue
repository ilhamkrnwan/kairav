<template>
  <section
    class="min-h-screen w-full flex flex-col items-center justify-center
           text-neutral-dark dark:text-neutral-light px-4 py-20"
  >
    <!-- Header -->
    <!-- <div class="mt-20 mb-6 text-center">
      <TextGradient>CURRICULUM VITAE</TextGradient>
      <p class="text-sm text-gray-400 mt-2">
        Ilham Kurniawan · Software Developer
      </p>
    </div> -->
     <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-heading mb-4">
            CURRICULUM <span class="text-amber-400">VITAE</span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ilham Kurniawan · Software Developer
          </p>
        </div>

    <!-- CV Container -->
    <div
      class="w-full max-w-5xl min-h-screen h-[80vh]
             rounded-xl shadow-lg overflow-hidden"
    >
      <iframe
        src="https://drive.google.com/file/d/1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO/preview"
        class="w-full h-full border-none"
        loading="lazy"
      />
    </div>


     <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-300 mt-6">
        <!-- Primary Button -->
        <UiAnimatedButton href="https://drive.google.com/uc?id=1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO&export=download" variant="primary">
          <template #default>Download CV</template>
          <template #iconRight>
            <Icon name="lucide:download" class="w-4 h-4" />
          </template>
        </UiAnimatedButton>

        <!-- Secondary Button -->
        <UiAnimatedButton href="/" variant="outline">
          <template #default>Back to Home</template>
          <template #iconRight>
            <Icon name="lucide:home" class="w-4 h-4" />
          </template>
        </UiAnimatedButton>
      </div>

    <!-- Footer -->
    <div class="mt-10 text-sm text-gray-400">
      © 2026 KAIRAV Portfolio
    </div>
  </section>
</template>

<script setup>
// no logic needed
</script>
