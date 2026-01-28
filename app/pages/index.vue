<template>

  <div class="min-h-screen  text-neutral-dark dark:text-neutral-light flex flex-wrap justify-center items-center w-full ">
    <!-- Hero div -->
   
    <div class=" text-gray-800 mt-20 ">
    <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <!-- Gambar -->
      <div class="relative flex items-center justify-center p-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 order-1 lg:order-2">
    <!-- Div Absolute di Belakang Gambar -->
    <div class="absolute mx-auto inset-0 items-center justify-center p-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 animate-float"><img src="/blob-hero.svg" alt="" srcset="" class="max-w-md h-auto mx-auto object-contain object-center"></div>
    <!-- span Kiri Absolute -->
    <span class="absolute left-0 top-0  w-24 z-10 animate-float"><img src="/blob-left.svg" alt="" srcset="" class="max-w-md h-auto object-contain object-center"></span>
    <span class="absolute animate-float2 left-0 bottom-0  w-24 z-10"><img src="/blob-lb.svg" alt="" srcset="" class="max-w-md h-auto object-contain object-center"></span>
    <!-- span Kanan Absolute -->
    <span class="absolute animate-float2 right-0 bottom-0 w-24 z-10"><img src="/blob-right.svg" alt="" srcset="" class="max-w-sm h-auto object-contain object-center"><img src="/blob-lb2.svg" alt="" srcset="" class="max-w-sm h-auto object-contain object-center"></span>
    <span class="absolute animate-float2 right-0 top-0  w-24 z-10"><img src="/blob-rb.svg" alt="" srcset="" class="max-w-sm h-auto object-contain object-center"></span>
    <!-- image hero -->
    <img src="/ilham-hero.png" alt="" class="relative object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
  </div>
        <!-- Teks -->
        <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left order-2 lg:order-1 z-10 text-neutral-dark dark:text-accent-dark">
           <!-- logo -->
           <div class="flex lg:justify-start items-center justify-center mb-4 ">
            <img src="/kairav.png" alt="Logo" class="h-10 mr-2" />
            <h1 class="text-sm uppercase tracking-wider">kairav</h1>
          </div>
          <TextGradient>KAIRAV PORTFOLIO</TextGradient>
          <p class="text-lg mb-2 font-mono text-muted-foreground">ILHAM KURNIAWAN</p>
          <p class="text-base text-muted-foreground">Frontend | Backend | Junior Fullstack | Speaker | AI Enthusiast | Undergraduated Student</p>
            <p class="mt-6 mb-8 text-lg sm:mb-12 text-muted-foreground">A  Fullstack developer focused on Web Development, with interests in UX/UI Design, Mobile, and AI Development.
                <br class="hidden md:inline lg:hidden">Eager to learn new things and open to opportunities.
            </p>
            <div class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row space-y-4 sm:space-y-4 md:space-y-4 lg:space-y-0 lg:space-x-4">
   
      <UiAnimatedButton href="/cv" variant="primary">
        <template #default>Download CV</template>
        <template #iconRight>
            <Icon name="lucide:download" class="w-4 h-4" />
        </template>
      </UiAnimatedButton>
      <UiAnimatedButton href="/contact" variant="outline">
        <template #default>Contact Me</template>
        <template #iconRight>
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </template>
      </UiAnimatedButton>
</div>

        </div>
        <div class="absolute top-20 left-4 md:left-20 xl:left-20 lg:left-20 text-sm text-gray-400">2026 | Copyright © KAIRAV</div>
    </div>
    </div>

  </div>
</template>
