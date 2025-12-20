<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center
           bg-white dark:bg-neutral-dark
           text-neutral-dark dark:text-neutral-light"
  >
    <!-- Header -->
    <div class="mt-20 mb-6 text-center">
      <TextGradient>CURRICULUM VITAE</TextGradient>
      <p class="text-sm text-gray-400 mt-2">
        Ilham Kurniawan · Software Developer
      </p>
    </div>

    <!-- CV Container -->
    <div
      class="w-full max-w-5xl h-[80vh]
             bg-gray-100 dark:bg-neutral-800
             rounded-xl shadow-lg overflow-hidden"
    >
      <iframe
        src="https://drive.google.com/file/d/1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO/preview"
        class="w-full h-full border-none"
        loading="lazy"
      />
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col sm:flex-row gap-3 mt-6">
      <StyleButton>
        <a
          href="https://drive.google.com/uc?id=1YMNL-ukjebg7xxOh1YV11SSJd8jCK1AO&export=download"
          target="_blank"
        >
          Download CV
        </a>
      </StyleButton>

      <StyleButton>
        <NuxtLink to="/">
          Back to Home
        </NuxtLink>
      </StyleButton>
    </div>

    <!-- Footer -->
    <div class="mt-10 text-sm text-gray-400">
      © 2024 KAIRAV Portfolio
    </div>
  </div>
</template>

<script setup>
// no logic needed
</script>
