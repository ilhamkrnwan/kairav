<template>
	<section class="  text-gray-800 dark:text-white">
		<div class="container max-w-5xl px-4 py-12 mx-auto">
			<div class="grid gap-4 mx-4 sm:grid-cols-12">
				<div class="col-span-12 sm:col-span-3">
					<div class="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-gradient-to-br from-yellow-400 to-orange-500">
						<h3 class="text-3xl font-semibold">Education</h3>
						<span class="text-sm font-bold tracking-wider uppercase dark:text-gray-600">Formal and Non Formal</span>
					</div>
				</div>
				<div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
					<div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-300">
						<div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-gradient-to-br from-yellow-400 to-orange-500" v-for="item in educationItems" :key="item.title">
							<div class="flex items-center justify-between space-x-4 dark:text-gray-600">
								<a rel="noopener noreferrer" href="#" class="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group dark:border-gray-300">
									<span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-pulse"></span>
									<span class="">{{ item.type }}</span>
								</a>
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
        educationItems: [
          { 
			title: 'Nahdlatul Ulama University Yogyakarta (UNUYO)', 
            date: '2023 - Present | Undergraduated', 
            description: 'Currently pursuing a Bachelor\'s degree in Informatics, focusing on programming concepts, data structures, algorithms, and software development.',
            type: 'Formal'
          },
          { 
			title: 'SMA N 1 Randublatung (SMARANSA)', 
            date: '2017 - 2020 | Graduated', 
            description: 'Completed secondary education with a focus on science (MIPA), including mathematics, physics, chemistry, and biology.',
            type: 'Formal'
          },
          { 
			title: 'Rumah Gemilang Indonesia Surabaya (RGI Surabaya)', 
            date: '2020 - 2021 | Graduated', 
            description: 'Completed a Software Engineering training program specializing in Web Programming, covering HTML, CSS, JavaScript, and general web development.',
            type: 'Non-Formal'
          },
          { 
			title: 'Graphic Design Training - DINPERINAKER Blora', 
            date: '2022 | Graduated', 
            description: 'Participated in a graphic design training program using CorelDRAW, learning design techniques, image manipulation, and the creation of visual materials.',
            type: 'Non-Formal'
          }
        ]
      };
    }
  };
  </script>
  <style>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 10px rgba(255, 165, 0, 0.5), 0 0 20px rgba(255, 165, 0, 0.5);
  }
  50% {
    opacity: 0.5;
    box-shadow: 0 0 20px rgba(255, 165, 0, 1), 0 0 30px rgba(255, 165, 0, 1);
  }
}

.shadow-pulse {
  animation: pulse 2s infinite;
}

</style>