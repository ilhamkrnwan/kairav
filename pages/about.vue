<template>
  <!-- <MenuTab /> -->

  <div class="min-h-screen   text-white dark:text-black flex flex-wrap justify-center items-center w-full ">
    <!-- Hero div -->
    <div class="  text-gray-800 mt-20 ">
    <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <!-- Gambar -->
      <div class="relative flex items-center justify-center p-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 order-1 lg:order-2">
    <!-- Div Absolute di Belakang Gambar -->
    <div class="absolute mx-auto inset-0 items-center justify-center p-6 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 animate-float"><img src="../public/blob-hero.svg" alt="" srcset="" class="max-w-md h-auto mx-auto object-contain object-center"></div>
    <!-- span Kiri Absolute -->
    <span class="absolute left-0 top-0  w-24 z-10 animate-float"><img src="../public/blob-left.svg" alt="" srcset="" class="max-w-md h-auto object-contain object-center"></span>
    <span class="absolute animate-float2 left-0 bottom-0  w-24 z-10"><img src="../public/blob-lb.svg" alt="" srcset="" class="max-w-md h-auto object-contain object-center"></span>
    <!-- span Kanan Absolute -->
    <span class="absolute animate-float2 right-0 bottom-0 w-24 z-10"><img src="../public/blob-right.svg" alt="" srcset="" class="max-w-sm h-auto object-contain object-center"><img src="../public/blob-lb2.svg" alt="" srcset="" class="max-w-sm h-auto object-contain object-center"></span>
    <span class="absolute animate-float2 right-0 top-0  w-24 z-10"><img src="../public/blob-rb.svg" alt="" srcset="" class="max-w-sm h-auto object-contain object-center"></span>
    <!-- image hero -->
    <img src="../public/ilham-hero.png" alt="" class="relative object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
</div>
        <!-- Teks -->
        <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left order-2 lg:order-1 z-10 text-neutral-dark dark:text-neutral-light">
          <h2 class="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Introduction</h2>
      <p class="text-lg mb-2">ILHAM KURNIAWAN</p>
      <p class="text-base text-gray-400">Frontend | Backend | Junior Fullstack | Speaker | AI Enthusiast | Undergraduated Student</p>
            <p class="mt-6 mb-8 text-lg sm:mb-12">Hello my name is Ilham Kurniawan
                <br class="hidden md:inline lg:hidden">Eager to learn new things and open to opportunities.
            </p>
            <div class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row space-y-2 sm:space-y-2 md:space-y-2 lg:space-y-0 lg:space-x-2">
   
      <StyleButton>
        <a href="#">
          Scrolling Down
        </a>
      </StyleButton>
</div>

        </div>
    </div>
</div>

  </div>
  <div class="min-h-screen   text-white dark:text-black flex flex-wrap justify-center items-center w-full ">
    <!-- Hero div -->
    <div class="  text-gray-800 mt-10 ">
    <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-14 lg:flex-row lg:justify-between">
        <!-- Teks -->
        <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left order-2 lg:order-1 z-10 text-neutral-dark dark:text-neutral-light">
          <h2 class="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 text-center">ABOUT ME</h2>
          <p class="mt-6 mb-8 text-lg sm:mb-12 text-center">Hello there! I'm 
              <HoverText>Ilham Kurniawan</HoverText>
              , a passionate coder and future Software Engineer from the vibrant city of Yogyakarta, Indonesia. Currently, I'm diving deep into the world of <HoverText>Computer Science</HoverText> and <HoverText>Information Technology</HoverText> at <HoverText>Universitas Nahdlatul Ulama Yogyakarta</HoverText>. I'm always eager to learn new things, eagerly absorbing everything tech.
              <br class="mb-2">
              <HoverText>Tech</HoverText> and <HoverText>Coding</HoverText> are more than just interests for me; they're my way of life. When I'm not immersed in code, you'll find me exploring the artistic realms of design, crafting exciting game experiences, or delving into the intriguing world of artificial intelligence.
              <br class="mb-2">
              In our ever-evolving digital age, I firmly believe that <HoverText>continuous learning</HoverText> is the key to staying ahead. So, <HoverText>let’s connect</HoverText> and journey together through this dynamic and thrilling tech landscape!
            </p>
    

        </div>
        <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left order-2 lg:order-1 z-10 text-neutral-dark dark:text-accent-dark">
          <div class="gallery grid grid-cols-3 gap-1.5 w-112 aspect-square">
          <img src="https://picsum.photos/id/815/400/400" alt="Two hands creating a heart and showing the sun" class="w-full h-full object-cover filter grayscale cursor-pointer transition-all duration-500 hover:filter-none">
          <img src="https://picsum.photos/id/872/400/400" alt="The mountain" class="w-full h-full object-cover filter grayscale cursor-pointer transition-all duration-500 hover:filter-none [grid-area:1/2/span_2/span_2] [clip-path:polygon(0_0,100%_0,100%_100%,calc(50%_+_1.5px)_100%,0_calc(50%_-_1.5px))]">
          <img src="https://picsum.photos/id/603/400/400" alt="A river" class="w-full h-full object-cover filter grayscale cursor-pointer transition-all duration-500 hover:filter-none [grid-area:2/1/span_2/span_2] [clip-path:polygon(0_0,calc(50%_-_1.5px)_0,100%_calc(50%_+_1.5px),100%_100%,0_100%)]">
          <img src="https://picsum.photos/id/823/400/400" alt="A woman with a camera" class="w-full h-full object-cover filter grayscale cursor-pointer transition-all duration-500 hover:filter-none">
        </div>

        </div>
    </div>
</div>

</div>
<MySkill />
<MyEducation/>
<MyWork/>
<MyQuotes />
<GetinTouch />
</template>