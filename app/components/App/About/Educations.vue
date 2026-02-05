<script setup>
const { t } = useI18n()

const educationItems = computed(() => [
  { 
    title: t('Nahdlatul Ulama University Yogyakarta (UNUYO)'), 
    date: '2023 - ' + t('Present') + ' | ' + t('Undergraduated'),
    description: t(
      "Currently pursuing a Bachelor's degree in Informatics, focusing on programming concepts, data structures, algorithms, and software development. Engaged in various projects and research activities."
    ),
    type: t('Formal')
  },
  { 
    title: t('Rumah Gemilang Indonesia Surabaya (RGI Surabaya)'), 
    date: '2020 - 2021 | ' + t('Graduated'),
    description: t(
      'Completed a Software Engineering training program specializing in Web Programming, covering HTML, CSS, JavaScript, and general web development. Participated in hands-on projects to build web applications.'
    ),
    type: t('Non-Formal')
  },
  { 
    title: t('Graphic Design Training - DINPERINAKER Blora'), 
    date: '2022 | ' + t('Graduated'),
    description: t(
      'Participated in a graphic design training program using CorelDRAW, learning design techniques, image manipulation, and the creation of visual materials. Completed various design projects and developed a strong portfolio.'
    ),
    type: t('Non-Formal')
  }
])
</script>

<template>
	<section class="  text-gray-800 dark:text-white">
		<div class="container max-w-5xl px-4 py-12 mx-auto">
			<div class="grid gap-4 mx-4 sm:grid-cols-12">
				<div class="col-span-12 sm:col-span-3">
					<div class="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-linear-to-br from-yellow-400 to-orange-500">
						<h3 class="text-3xl font-semibold">{{ t('Education &') }} <span class="text-amber-400">{{ t('Training') }}</span></h3>
						<span class="text-sm font-bold tracking-wider uppercase dark:text-gray-600">{{ t('Formal and Non Formal') }}</span>
					</div>
				</div>
				<div class="relative col-span-12 px-4 space-y-6 sm:col-span-9">
					<div class="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-300">
						<div class="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-gradient-to-br from-yellow-400 to-orange-500" v-for="item in educationItems" :key="item.title">
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
