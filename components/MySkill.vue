<template>
  <div class="bg-gray-100 sm:p-6 md:p-10 lg:p-16 xl:p-20 dark:bg-neutral-dark text-gray-800 dark:text-white flex justify-center">
    
    <div class="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 py-8 text-center mx-auto">

      <!-- LANGUAGE & FRAMEWORK -->
      <div class="flex flex-col items-center">
        <h2 class="text-gray-600 font-bold mb-4 text-lg md:text-xl">LANGUAGE & FRAMEWORK</h2>
        <div class="flex flex-wrap gap-2 justify-center">
          <ButtonBorder v-for="(item, index) in languagesFrameworks" :key="index">
            <span class="font-bold">{{ item }}</span>
          </ButtonBorder>
        </div>
      </div>

      <!-- TOOLS -->
      <div class="flex flex-col items-center">
        <h2 class="text-gray-600 font-bold mb-4 text-lg md:text-xl">TOOLS</h2>
        <div class="flex flex-wrap gap-2 justify-center">
          <ButtonBorder v-for="(item, index) in tools" :key="index">
            <span class="font-bold">{{ item }}</span>
          </ButtonBorder>
        </div>
      </div>

      <!-- SERVICES -->
      <div class="flex flex-col items-center md:col-span-2">
        <h2 class="text-gray-600 font-bold mb-4 text-lg md:text-xl">SERVICES</h2>
        <div class="flex flex-wrap gap-2 justify-center">
          <ButtonBorder v-for="(item, index) in services" :key="index">
            <span class="font-bold">{{ item }}</span>
          </ButtonBorder>
        </div>
      </div>

    </div>

  </div>
</template>


<script>
export default {
  name: 'MySkill',
  data() {
    return {
      languagesFrameworks: [
        'Vue.js',
        'Nuxt.js',
        'React.js',
        'Next.js',
        'Laravel',
        'Codeigniter',
      ],
      tools: [
        'Visual Studio Code',
        'Git & GitHub',
        'Figma',
        'Copilot'
      ],
      services: [
        'Website Development',
        'Mobile App Development',
        'Information System',
        'Chatbot Development',
        'Automation Feature'
      ]
    };
  }
};
</script>

<style scoped>
/* opsional */
</style>
