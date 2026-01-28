<template>
  <div class="min-h-screen   text-neutral-dark dark:text-neutral-light flex flex-wrap justify-center items-center w-full pt-20 md:pt-36 lg:pt-40 pb-18">
    <div class="grid gap-10 lg:grid-cols-2 max-w-screen-lg mx-auto">
      <!-- Bagian Gambar -->
      <div class="order-1 lg:order-2 flex items-center justify-center -mx-4 lg:pl-8">
        <div class="flex flex-col items-end px-3">
          <img
            class="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56 transition-transform transform hover:scale-125 duration-300 filter grayscale hover:grayscale-0 ease-in"
            src="/ilham04.jpg"
            alt=""
          />
          <img
            class="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40 transition-transform transform hover:scale-125 duration-300 filter grayscale hover:grayscale-0 ease-in"
            src="/ilham05.jpg"
            alt=""
          />
        </div>
        <div class="px-3">
          <img
            class="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80 transition-transform transform hover:scale-125 duration-300 filter grayscale hover:grayscale-0 ease-in"
            src="/ilham02.jpg"
            alt=""
          />
        </div>
      </div>
      <!-- Bagian Teks -->
      <div class="order-2 lg:order-1 flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
        <div class="flex lg:justify-start items-center justify-center mb-4">
          <img src="/kairav.png" alt="Logo" class="h-10 mr-2" />
          <h1 class="text-sm uppercase tracking-wider">kairav</h1>
        </div>
        <div class="max-w-xl mb-6 sm:px-4 sm:mb-10 md:px-0 md:mb-12 lg:mb-16 px-4">
          <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 dark:text-neutral-light sm:text-4xl sm:leading-none">
            Explore My Journey Through Lens
          </h2>
          <p class="text-base text-gray-700 dark:text-neutral-light md:text-lg">
            "Welcome to my photo gallery! Here, you'll find a collection of moments captured through my lens, showcasing my adventures, projects, and everyday life. Each photo tells a unique story and reflects my passion for photography. For more photos and updates, feel free to visit my Instagram page by clicking the link below."
          </p>
        </div>
        <div class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row space-y-2 sm:space-y-2 md:space-y-2 lg:space-y-0 lg:space-x-2 px-4 pb-20">
          <StyleButton>
            <a href="https://www.instagram.com/ilhamkrnwan__" target="_blank" rel="noopener noreferrer">
              Visit Instagram
            </a>
          </StyleButton>
          
        </div>
      </div>
    </div>
  </div>
</template>
