<script setup lang="ts">
  interface Project {
    id: string
    title: string
    description: string
    year: string
    date: string
    image: string
    link: string
    previewLink: string
    tags: string[]
    author: string
    authorImage: string
  }
  
  const projects: Project[] = [
    {
      id: 'qinarian',
      title: 'Qinarian - Technology Community & Digital Innovation',
      description: 'Official website of Qinarian, a technology community focused on building digital solutions, open-source collaboration, and innovation in web, AI, and cybersecurity.',
      year: '2024',
      date: 'Dec 25, 2024',
      image: '/project/qinarian/1.png',
      link: '/project/qinarian',
      previewLink: 'https://qinaryan.vercel.app/home',
      tags: ['Nuxt Js', 'Community', 'Open Source', 'Technology'],
      author: 'Kairav',
      authorImage: '/profile-blck.png'
    },
    {
      id: 'jurutani',
      title: 'Jurutani - Digital Agriculture Platform',
      description: 'A comprehensive digital platform for agriculture management with IoT integration, helping farmers monitor and optimize their crop production in real-time.',
      year: '2024',
      date: 'Jan 15, 2024',
      image: '/project/jurutani/1.png',
      link: '/project/jurutani',
      previewLink: 'https://jurutani.com',
      tags: ['Nuxt Js', 'Supabase', 'Agriculture'],
      author: 'Kairav',
      authorImage: '/profile-blck.png'
    },
    {
      id: 'ruangnu',
      title: 'RuangNu - Co-working Space Management',
      description: 'An efficient management system for co-working spaces that streamlines booking, resource allocation, and community engagement.',
      year: '2024',
      date: 'Mar 22, 2024',
      image: '/project/ruangnu/3.png',
      link: '/project/ruangnu',
      previewLink: 'https://ruangnu.vercel.app',
      tags: ['PHP', 'Booking', 'Management'],
      author: 'Kairav',
      authorImage: '/profile-blck.png'
    },
    {
      id: 'agrinuclear',
      title: 'AgriNuclear - Nuclear Agriculture Research',
      description: 'Research platform for nuclear agriculture applications, exploring innovative techniques for crop improvement and sustainable farming practices.',
      year: '2024',
      date: 'May 10, 2024',
      image: '/project/agrinuklir/2.png',
      link: '/project/agrinuclear',
      previewLink: 'https://agrinuklir.netlify.app/',
      tags: ['React', 'Data Science', 'Research'],
      author: 'Kairav',
      authorImage: '/profile-blck.png'
    }
  ]

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      'Vue.js': 'bg-green-600 hover:bg-green-700',
      'React': 'bg-blue-500 hover:bg-blue-600',
      'Node.js': 'bg-green-700 hover:bg-green-800',
      'IoT': 'bg-purple-600 hover:bg-purple-700',
      'Python': 'bg-yellow-600 hover:bg-yellow-700',
      'Agriculture': 'bg-emerald-600 hover:bg-emerald-700',
      'Management': 'bg-indigo-600 hover:bg-indigo-700',
      'Data Science': 'bg-pink-600 hover:bg-pink-700',
      'Research': 'bg-cyan-600 hover:bg-cyan-700'
    }
    return colors[tag] || 'bg-gray-600 hover:bg-gray-700'
  }
</script>

<template>
  <div class="px-4 py-16 mx-auto md:px-24 lg:px-32 lg:py-20   text-gray-800 dark:text-white">
    <div class="grid gap-10 lg:grid-cols-2">
      <div class="flex flex-col justify-center md:pr-8 xl:pr-0">
        <div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
          <div class="flex lg:justify-start items-center justify-center mb-4">
            <img src="../../public/kairav.png" alt="Logo" class="h-10 mr-2" />
          </div>
        </div>
        <div class="mb-6">
          <TextGradient>
            My Projects<br class="hidden md:block" />
            <span class="inline-block text-deep-purple-accent-400">Showcase</span>
          </TextGradient>
          <p class="text-base text-gray-700 dark:text-gray-400 md:text-lg">
            "Here are some of the projects I've worked on, showcasing my skills and passion for creating innovative solutions."
          </p>
        </div>
        <div>
          <a href="/" aria-label="" class="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
            Learn more
            <svg class="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="flex items-center justify-center -mx-4 lg:pl-8">
        <div class="flex flex-col items-end px-3">
          <img
            class="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
            src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400"
            alt=""
          />
          <img class="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40" src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400" alt="" />
        </div>
        <div class="px-3">
          <img class="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80" src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto px-6 lg:px-32 pt-8 pb-16   text-gray-800 dark:text-white">
    <div class="mx-auto text-center mb-12">
      <TextGradient>My Work</TextGradient>
      <p class="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
        A collection of my projects, showcasing my skills in creating innovative and effective solutions.
      </p>
    </div>

    <!-- Project Cards -->
    <div class="space-y-16">
      <article 
        v-for="(project, index) in projects" 
        :key="project.id"
        class="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center"
        :class="{ 'md:grid-flow-dense': index % 2 !== 0 }"
      >
        <a class="relative block group" :href="project.link" :class="{ 'md:col-start-2': index % 2 !== 0 }">
          <div 
            class="absolute inset-0 bg-gray-800 dark:bg-gray-600 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" 
            aria-hidden="true"
          ></div>
          <figure class="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
            <img 
              class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" 
              :src="project.image" 
              :alt="project.title"
              width="540" 
              height="303"
            >
          </figure>
        </a>
        <div :class="{ 'md:col-start-1 md:row-start-1': index % 2 !== 0 }">
          <header>
            <div class="mb-3">
              <ul class="flex flex-wrap text-xs font-medium -m-1">
                <li v-for="tag in project.tags" :key="tag" class="m-1">
                  <a 
                    class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full transition duration-150 ease-in-out" 
                    :class="getTagColor(tag)"
                    href="#0"
                  >
                    {{ tag }}
                  </a>
                </li>
              </ul>
            </div>
            <h3 class="text-2xl lg:text-3xl font-bold leading-tight mb-2">
              <a 
                class="hover:text-gray-600 dark:hover:text-gray-100 transition duration-150 ease-in-out" 
                :href="project.link"
              >
                {{ project.title }}
              </a>
            </h3>
          </header>
          <p class="text-lg text-gray-600 dark:text-gray-400 flex-grow">
            {{ project.description }}
          </p>

          <footer class="flex items-center mt-4">
            <a :href="`/author/${project.author.toLowerCase()}`">
              <img 
                class="rounded-full flex-shrink-0 mr-4" 
                :src="project.authorImage" 
                width="40" 
                height="40" 
                :alt="project.author"
              >
            </a>
            <div>
              <a class="font-medium dark:text-gray-200" :href="`/author/${project.author.toLowerCase()}`">
                {{ project.author }}
              </a>
              <span class="text-gray-500 dark:text-gray-600"> - </span>
              <span class="text-gray-500">{{ project.date }}</span>
            </div>
          </footer>
          <div class="flex justify-start mt-4 space-x-4"> 
            <StyleButton>
              <a :href="project.link">
                More
              </a>
            </StyleButton>
            <StyleButton>
              <a :href="project.previewLink" target="_blank">
                Preview
              </a>
            </StyleButton>
          </div> 
        </div>
      </article>
    </div>
  </div>

  <GetinTouch />
</template>