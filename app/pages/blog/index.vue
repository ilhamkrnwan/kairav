<script setup lang="ts">
  interface Blog {
    id: number;
    title: string;
    description: string;
    image: string;
    author: string;
    authorImage: string;
    date: string;
    tags: Array<{
      name: string;
      color: string;
    }>;
    blogLink: string;
    previewLink: string;
  }
  
  const blogs: Blog[] = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence: Trends and Challenges",
      description: "Explore the latest developments in AI technology, from machine learning breakthroughs to ethical considerations that shape our digital future.",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxhaXxlbnwwfDB8fHwxNzEyNzUzMTQ4fDA&ixlib=rb-4.0.3&q=80&w=1080",
      author: "Kairav",
      authorImage: "/profile-blck.png",
      date: "Jan 15, 2026",
      tags: [
        { name: "AI", color: "bg-green-600 hover:bg-green-700" },
        { name: "Technology", color: "bg-blue-500 hover:bg-blue-600" },
        { name: "Machine Learning", color: "bg-purple-600 hover:bg-purple-700" }
      ],
      blogLink: "/blog/second-blog",
      previewLink: "#"
    },
    {
      id: 2,
      title: "Building Modern Web Apps with Vue 3 and TypeScript",
      description: "A comprehensive guide to creating scalable and maintainable web applications using the latest Vue 3 features and TypeScript integration.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHx2dWUlMjBqc3xlbnwwfDB8fHwxNzEyNzUzMjAwfDA&ixlib=rb-4.0.3&q=80&w=1080",
      author: "Kairav",
      authorImage: "/profile-blck.png",
      date: "Dec 28, 2023",
      tags: [
        { name: "Vue.js", color: "bg-green-600 hover:bg-green-700" },
        { name: "TailwindCSS", color: "bg-blue-500 hover:bg-blue-600" },
        { name: "TypeScript", color: "bg-blue-800 hover:bg-blue-900" }
      ],
      blogLink: "/blog/first-blog",
      previewLink: "#"
    }
  ];
  </script>
  
  <template>
    <div class="px-4 py-16 mx-auto md:px-24 lg:px-32 lg:py-20   text-gray-800 dark:text-white">
      <div class="grid gap-10 lg:grid-cols-2">
        <div class="flex flex-col justify-center md:pr-8 xl:pr-0">
          <div class="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-accent-400">
            <div class="flex lg:justify-start items-center justify-center mb-4">
              <img src="/kairav.png" alt="Logo" class="h-10 mr-2" />
            </div>
          </div>
          <div class="mb-6">
            <TextGradient>
              Coding, <br class="hidden md:block" />
              Coffee,
              <span class="inline-block text-deep-purple-accent-400">& Creativity</span>
            </TextGradient>
            <p class="text-base text-gray-700 md:text-lg">
              "Through this blog, I want to invite you to take a closer look at my creative process, the projects I'm working on, and the things that excite me."
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
              src="/ilham05.jpg"
              alt=""
            />
            <img class="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40" src="/ilham02.jpg" alt="" />
          </div>
          <div class="px-3">
            <img class="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80" src="/profile-blck.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  
    <div class="mx-auto px-6 lg:px-32 pt-8 pb-16   text-gray-800 dark:text-white">
      <div class="mx-auto text-center mb-12">
        <TextGradient>Blogs that I've Written</TextGradient>
        <p class="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Dive into a selection of insightful articles and reflections I've penned, sharing my expertise and perspectives on various topics.
        </p>
      </div>
  
      <!-- Blog Cards -->
      <div class="space-y-16 lg:space-y-24">
        <article 
          v-for="(blog, index) in blogs" 
          :key="blog.id"
          class="max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center"
          :class="{ 'md:grid-flow-dense': index % 2 !== 0 }"
        >
          <a class="relative block group" :href="blog.blogLink" :class="{ 'md:col-start-2': index % 2 !== 0 }">
            <div 
              class="absolute inset-0 bg-gray-800 dark:bg-gray-600 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none" 
              aria-hidden="true"
            ></div>
            <figure class="relative h-0 pb-[56.25%] md:pb-[75%] lg:pb-[56.25%] overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out">
              <img 
                class="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out" 
                :src="blog.image" 
                width="540" 
                height="303" 
                :alt="blog.title"
              >
            </figure>
          </a>
          
          <div :class="{ 'md:col-start-1 md:row-start-1': index % 2 !== 0 }">
            <header>
              <div class="mb-3">
                <ul class="flex flex-wrap text-xs font-medium -m-1">
                  <li v-for="tag in blog.tags" :key="tag.name" class="m-1">
                    <a 
                      class="inline-flex text-center text-gray-100 py-1 px-3 rounded-full transition duration-150 ease-in-out" 
                      :class="tag.color"
                      href="#0"
                    >
                      {{ tag.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <h3 class="text-2xl lg:text-3xl font-bold leading-tight mb-2">
                <a 
                  class="hover:text-gray-600 dark:hover:text-gray-300 transition duration-150 ease-in-out" 
                  :href="blog.blogLink"
                >
                  {{ blog.title }}
                </a>
              </h3>
            </header>
            <p class="text-lg text-gray-600 dark:text-gray-400 grow mb-4">
              {{ blog.description }}
            </p>
  
            <footer class="flex items-center mt-4">
              <a href="#0">
                <img 
                  class="rounded-full shrink-0 mr-4" 
                  :src="blog.authorImage" 
                  width="40" 
                  height="40" 
                  :alt="blog.author"
                >
              </a>
              <div>
                <a class="font-medium text-gray-800 dark:text-gray-200" href="#0">{{ blog.author }}</a>
                <span class="text-gray-500 dark:text-gray-600"> - </span>
                <span class="text-gray-500 dark:text-gray-500">{{ blog.date }}</span>
              </div>
            </footer>
            
            <div class="flex justify-start mt-4 space-x-4">
              <StyleButton>
                <a :href="blog.blogLink">
                  More
                </a>
              </StyleButton>
              
            </div>
          </div>
        </article>
      </div>
    </div>
  
    <GetinTouch />
  </template>