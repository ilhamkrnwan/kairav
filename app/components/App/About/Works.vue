<template>
	<section class="text-gray-800 dark:text-white">
		<div class="container max-w-5xl px-4 py-12 mx-auto">
			<div class="grid gap-4 mx-4 sm:grid-cols-12">
				<div class="col-span-12 sm:col-span-3">
					<div class="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-linear-to-br from-yellow-400 to-orange-500">
						<h3 class="text-3xl font-semibold">Work & <span class="text-amber-400">Experience</span></h3>
						<span class="text-sm font-bold tracking-wider uppercase dark:text-gray-600">Professional Journey</span>
					</div>
				</div>
				<div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
					<div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-300">
						<div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:-left-8.75 sm:before:z-1 before:bg-linear-to-br from-yellow-400 to-orange-500" v-for="item in workItems" :key="item.title">
							<div class="flex items-center justify-between space-x-4 dark:text-gray-600">
								<span class="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full border-border/50 bg-background/50 backdrop-blur-sm dark:border-gray-700 dark:bg-zinc-800/50 hover:border-amber-400/30 transition-colors duration-300">
									<span class="relative flex h-2 w-2">
										<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
										<span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
									</span>
									<span class="font-medium text-gray-600 dark:text-gray-200">{{ item.type }}</span>
								</span>
							</div>
							<h3 class="text-xl font-semibold tracking-wide">{{ item.title }}</h3>
							<time class="text-xs tracking-wide uppercase dark:text-gray-600">{{ item.date }}</time>
							<p class="mt-3">{{ item.description }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
  export default {
    data() {
      return {
        workItems: [
        { 
          type: 'Open for Work',
          title: 'Fullstack Developer', 
          date: '2021 - Present', 
          description: 'Experienced full-stack developer with a strong foundation in programming concepts, data structures, and algorithms. Currently working as a freelance developer, successfully delivering various projects for clients. Open to both full-time positions and project-based collaborations.'
        }
        ]
      };
    }
  };
  </script>
  