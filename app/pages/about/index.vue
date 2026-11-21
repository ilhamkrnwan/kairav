<script setup lang="ts">
const { t, locale } = useI18n()

useDynamicSeo({
  titleKey: 'seo.about.title',
  descriptionKey: 'seo.about.description'
})
useProfilePageSchema()

/* ── Recent blogs ── */
const { data: recentBlogs, status: recentBlogsStatus } = await useAsyncData(
  `recent-blogs-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('stem', 'LIKE', `blog/${locale.value}/%`)
      .order('date', 'DESC')
      .limit(3)
      .all(),
  { watch: [locale] }
)

const recentBlogsList = computed(() => recentBlogs?.value || [])

const toBlogLink = (path?: string) => {
  return path?.replace(/^\/blog\/[^/]+/, '/blogs') || '#'
}

// Shared sticker look for UCard: ink outline, generous radius
const glassCard = 'rounded-lg ring-0 border border-default bg-elevated shadow-sm'

/* ── Hero data ── */
const roles = computed(() => [t('Fullstack Developer'), t('IT Student'), t('Yogyakarta / Blora, ID')])

const careerBadges = computed(() => [
  { label: t('Fullstack Developer'), sub: t('2023 - Present') },
  { label: t('IT Student'), sub: t('UNUYO · Informatics') },
  { label: t('Freelance Developer'), sub: t('Remote & Contract') }
])

/* ── Education + Work timelines ── */
const timelines = computed(() => [
  {
    key: 'education',
    title: t('Education'),
    accent: `& ${t('Training')}`,
    subtitle: t('Formal and Non Formal'),
    icon: 'lucide:graduation-cap',
    items: [
      {
        logo: '/logo/unu-jogja.avif',
        title: t('Nahdlatul Ulama University Yogyakarta (UNUYO)'),
        date: `2023 - ${t('Present')} | ${t('Undergraduated')}`,
        description: t("Currently pursuing a Bachelor's degree in Informatics, focusing on programming concepts, data structures, algorithms, and software development. Engaged in various projects and research activities."),
        type: t('Formal')
      },
      {
        logo: '/logo/dinperinaker.avif',
        title: t('Graphic Design Training - DINPERINAKER Blora'),
        date: `2022 | ${t('Graduated')}`,
        description: t('Participated in a graphic design training program using CorelDRAW, learning design techniques, image manipulation, and the creation of visual materials. Completed various design projects and developed a strong portfolio.'),
        type: t('Non-Formal')
      },
      {
        logo: '/logo/rgi.avif',
        title: t('Rumah Gemilang Indonesia Surabaya (RGI Surabaya)'),
        date: `2020 - 2021 | ${t('Graduated')}`,
        description: t('Completed a Software Engineering training program specializing in Web Programming, covering HTML, CSS, JavaScript, and general web development. Participated in hands-on projects to build web applications.'),
        type: t('Non-Formal')
      },
      {
        logo: '/logo/smaransa.avif',
        title: t('SMAN 1 Randublatung (Smaransa)'),
        date: `2017 - 2020 | ${t('Graduated')}`,
        description: t('Mathematics and Natural Sciences (MIPA). Actively participated in student organizations and extracurricular activities.'),
        type: t('Formal')
      }
    ]
  },
  {
    key: 'work',
    title: t('Work'),
    accent: `& ${t('Experience')}`,
    subtitle: t('Professional Journey'),
    icon: 'lucide:briefcase',
    items: [
      {
        logo: '/logo/kairav.avif',
        type: t('Open for Work'),
        title: t('Fullstack Developer'),
        date: t('2023 - Present'),
        description: t('Experienced full-stack developer with a strong foundation in programming concepts, data structures, and algorithms. Currently working as a freelance developer, successfully delivering various projects for clients. Open to both full-time positions and project-based collaborations.')
      },
      {
        logo: '/logo/sekeco.avif',
        type: t('Part of'),
        title: t('Frontend Developer at Sekeco'),
        date: t('January 2025 - Present'),
        description: t('Gained hands-on experience with Nuxt.js and its ecosystem, Composition API, and server-side rendering (SSR). Worked with Nuxt modules and plugins to enhance application functionality. Collaborated with the development team to implement responsive designs and ensure cross-browser compatibility.')
      },
      {
        logo: '/logo/indotech.avif',
        type: t('Professional Experience'),
        title: t('IT Staff at Indotech'),
        date: t('May 2026 - Present'),
        description: t('Developed and maintained WordPress websites with a focus on responsive layouts, theme customization, content structure, and performance-minded implementation. Worked with reusable components, page templates, and client-facing website requirements to deliver polished digital experiences.')
      },
      {
        logo: '/logo/jurutani.avif',
        type: t('Freelance'),
        title: t('Fullstack Web & Android Developer at Jurutani'),
        date: t('2025 - Present'),
        description: t('Developed and maintained web and Android applications for clients using modern technologies. Built responsive and user-friendly interfaces with Vue.js and Nuxt.js for web applications. Created Android applications using Kotlin, ensuring optimal performance and user experience. Collaborated with clients to gather requirements and deliver tailored solutions.')
      },
      {
        logo: '/logo/medskillindonesia.avif',
        type: t('Freelance'),
        title: t('Fullstack Developer at PRAXIS by Medskill Indonesia'),
        date: t('August 2026 - Present'),
        description: t('Developed and engineered the OSCE (Objective Structured Clinical Examination) assessment and management system for Medskill Indonesia (PRAXIS), delivering high-performance, secure, and intuitive web solutions for clinical examinations and healthcare training.')
      },
      {
        logo: '/logo/baznas.avif',
        type: t('Volunteer'),
        title: t('Ramadhan Volunteer at Baznas Yogyakarta'),
        date: t('2024'),
        description: t('Participated as a volunteer during the holy month of Ramadhan at Baznas Yogyakarta. Assisted in organizing and managing various Ramadhan activities and events, demonstrating teamwork, dedication, and community service.')
      },
      {
        logo: '/logo/alazhar.avif',
        type: t('Volunteer'),
        title: t('Ramadhan Volunteer at LAZ Al-Azhar Surabaya'),
        date: t('2021'),
        description: t('Participated as a volunteer during the holy month of Ramadhan at LAZ Al-Azhar Surabaya. Assisted in organizing and managing various Ramadhan activities and events, demonstrating teamwork, dedication, and community service.')
      }
    ]
  }
])

const PREVIEW_COUNT = 3
const expanded = reactive<Record<string, boolean>>({})

const visibleItems = (tl: (typeof timelines.value)[number]) =>
  (expanded[tl.key] ? tl.items : tl.items.slice(0, PREVIEW_COUNT)).map(item => ({ ...item, icon: tl.icon }))

// Expand / collapse: the list grows (or shrinks) to its new height while the extra entries pop in (or out).
const timelineEls: Record<string, { $el: HTMLElement } | null> = {}
// The last visible entry has no bottom spacing, so remember the real collapsed height instead of measuring it.
const collapsedHeights: Record<string, number> = {}
const toggleTimeline = async (key: string) => {
  const root = timelineEls[key]?.$el
  if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    expanded[key] = !expanded[key]
    return
  }
  const { gsap } = await import('gsap')
  const startHeight = root.offsetHeight
  const release = () => gsap.set(root, { clearProps: 'height,overflow' })

  if (!expanded[key]) {
    collapsedHeights[key] = startHeight
    expanded[key] = true
    await nextTick()
    const fullHeight = root.scrollHeight
    gsap.set(root, { overflow: 'hidden' })
    gsap.fromTo(root, { height: startHeight }, { height: fullHeight, duration: 0.9, ease: 'expo.out', onComplete: release })
    gsap.fromTo(Array.from(root.children).slice(PREVIEW_COUNT), { opacity: 0, y: 36, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)', stagger: 0.12, clearProps: 'opacity,transform' })
    return
  }

  const items = Array.from(root.children)
  const collapsedHeight = collapsedHeights[key] ?? items[PREVIEW_COUNT - 1]!.getBoundingClientRect().bottom - root.getBoundingClientRect().top
  gsap.set(root, { height: startHeight, overflow: 'hidden' })
  gsap.to(items.slice(PREVIEW_COUNT), { opacity: 0, y: -12, duration: 0.3, ease: 'power2.in', stagger: { each: 0.06, from: 'end' } })
  await gsap.to(root, { height: collapsedHeight, duration: 0.7, ease: 'expo.inOut' })
  expanded[key] = false
  await nextTick()
  release()
}

/* ── FAQ ── */
const faqs = computed(() => [
  {
    label: t('Are you available for freelance projects?'),
    content: t("Yes! I'm actively open to freelance collaborations — whether it's a full web app, landing page, or API integration. Feel free to reach out via the contact section below and we can discuss your needs.")
  },
  {
    label: t('What is your preferred tech stack?'),
    content: t('skills.faq')
  },
  {
    label: t('Are you open to full-time employment?'),
    content: t("Absolutely. I'm open to full-time positions as a Fullstack or Frontend Developer. I value collaborative teams, clear communication, and meaningful products. Let's connect and see if we're a good fit!")
  },
  {
    label: t('How long does it typically take to build a project?'),
    content: t('faq.timeline')
  },
  {
    label: t('What industries have you worked in?'),
    content: t("I've worked in healthtech & medical education (PRAXIS by Medskill Indonesia), agritech (Jurutani), general software services (Sekeco), and delivered freelance projects across e-commerce, company profiles, dashboards, and educational platforms.")
  },
  {
    label: t('How can I contact you?'),
    content: t("You can reach me through the 'Get in Touch' section at the bottom of this page, or connect with me on LinkedIn and GitHub. I usually respond within 1–2 business days.")
  }
].map((faq, i) => ({ ...faq, value: String(i), num: String(i + 1).padStart(2, '0') })))
</script>

<template>
  <div class="min-h-screen">
    <section class="site-frame about-masthead" aria-labelledby="about-title">
      <h1 id="about-title" class="editorial-title">{{ t('About') }}</h1>
      <div class="editorial-split">
        <figure class="about-portrait">
          <NuxtImg src="/ilham-hero-2.avif" alt="Ilham Kurniawan" width="640" height="640" sizes="100vw md:45vw" class="size-full object-cover" />
        </figure>
        <div>
          <p class="editorial-label">{{ t('intro.greeting') }}</p>
          <p class="my-4 max-w-[45ch] text-lg text-muted">{{ t('intro.description') }}</p>
          <p class="mb-6 text-sm text-muted">{{ roles.join(' · ') }}</p>
          <ul class="editorial-list">
            <li v-for="badge in careerBadges" :key="badge.label" class="flex flex-wrap items-baseline justify-between gap-2 py-3">
              <span class="font-semibold text-highlighted">{{ badge.label }}</span>
              <span class="text-sm text-muted">{{ badge.sub }}</span>
            </li>
          </ul>
          <div class="mt-6 flex flex-wrap gap-3">
            <UiArrowButton to="/cv">{{ t('Download CV') }}</UiArrowButton>
            <UiArrowButton to="/portofolio" variant="secondary">{{ t('View works') }}</UiArrowButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ ABOUT ME ═══ -->
    <section class="site-frame editorial-section">
      <div class="about-me-container mx-auto max-w-7xl">
        <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div class="relative z-0 lg:col-span-4">
            <h2 class="mb-6 leading-[0.88] tracking-tight">
              <span class="section-title-filled block">{{ t('About') }}</span>
              <span class="block text-highlighted">
                <span class="section-title-outline">{{ t('Me') }}</span><span class="text-primary">.</span>
              </span>
            </h2>
          </div>

          <div class="relative z-10 lg:col-span-8">
            <div
            >
              <UCard :ui="{ root: `${glassCard} group relative`, body: 'p-8 sm:p-8 md:p-12' }">
                <UIcon name="lucide:quote" class="absolute top-6 right-6 size-12 text-dimmed/20 transition-colors duration-500 group-hover:text-primary/10" />
                <div class="relative z-10 space-y-6 text-left text-base leading-relaxed font-normal text-muted md:text-lg">
                  <p>
                    {{ t('I am an enthusiastic developer who thrives on') }}
                    <span class="font-medium text-highlighted">{{ t('transforming complex problems') }}</span>
                    {{ t('into') }}
                    <span class="font-medium text-highlighted">{{ t('elegant digital solutions.') }}</span>
                  </p>
                  <p>
                    {{ t('With a passion for continuous learning and a strong foundation in modern web technologies, I focus on crafting') }}
                    <span class="font-medium text-highlighted">{{ t('scalable, accessible, and user-centric applications.') }}</span>
                  </p>
                  <p>
                    {{ t('Whether building responsive interfaces or resilient backends, my goal is to deliver products that have a') }}
                    <span class="font-medium text-highlighted">{{ t('meaningful impact.') }}</span>
                  </p>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppAboutSkills />

    <!-- ═══ EDUCATION + WORK ═══ -->
    <section
      v-for="tl in timelines"
      :key="tl.key"
      class="site-frame editorial-section"
    >
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div class="z-0 h-fit lg:sticky lg:top-32 lg:col-span-4">
            <h2 class="mb-6 leading-[0.88] tracking-tight">
              <span class="section-title-filled block">{{ tl.title }}</span>
              <span class="block text-highlighted">
                <span class="section-title-outline">{{ tl.accent }}</span><span class="text-primary">.</span>
              </span>
            </h2>
            <p class="text-sm text-muted font-medium">{{ tl.subtitle }}</p>
          </div>

          <div class="relative z-10 lg:col-span-8">
            <UTimeline
              :ref="(el: any) => (timelineEls[tl.key] = el)"
              :items="visibleItems(tl)"
              :ui="{
                indicator: 'bg-primary text-inverted',
                separator: 'bg-primary/30',
                wrapper: 'mt-0 pb-8'
              }"
            >
              <template #wrapper="{ item }">
                <UCard :ui="{ root: `${glassCard} transition-colors hover:bg-elevated`, body: 'p-6 sm:p-6' }">
                  <div class="mb-4 flex items-center gap-4">
                    <UAvatar
                      :src="item.logo"
                      :alt="item.title"
                      size="3xl"
                      :ui="{ root: 'rounded-lg border border-default/30 bg-elevated p-2', image: 'object-contain' }"
                    />
                    <div class="min-w-0 flex-1">
                      <h3 class="font-heading text-lg leading-snug text-highlighted md:text-xl">{{ item.title }}</h3>
                    </div>
                  </div>
                  <p class="text-sm leading-relaxed font-normal text-muted md:text-base">{{ item.description }}</p>
                </UCard>
              </template>
            </UTimeline>

            <div v-if="tl.items.length > PREVIEW_COUNT" class="mt-2 flex justify-center">
              <UButton
                color="neutral"
                variant="outline"
                class="liquid-button min-h-11 rounded-xl ring-default/40 bg-elevated px-5 text-xs hover:ring-primary/40 font-medium"
                @click="toggleTimeline(tl.key)"
              >
                <UIcon name="lucide:chevron-down" class="size-4 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" :class="expanded[tl.key] ? 'rotate-180' : ''" />
                <Transition name="swap" mode="out-in">
                  <span :key="String(expanded[tl.key])">{{ expanded[tl.key] ? t('Show Less') : t('Show More') }}</span>
                </Transition>
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="site-frame editorial-section">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <!-- Section Header (sticky, kiri) -->
            <div class="lg:col-span-4 lg:sticky lg:top-32 h-fit z-0">
              <h2 :aria-label="t('articles.title')" class="leading-[0.88] tracking-tight mb-6">
                <span class="section-title-filled block">{{ t('articles.titleFirst') }}</span>
                <span class="section-title-outline block">{{ t('articles.titleSecond') }}<span class="text-primary">.</span></span>
              </h2>
              <div class="w-12 h-1 bg-primary mb-6"></div>
              <p class="text-sm text-muted leading-relaxed">
                {{ t('My recent') }}
                <UiTextGradient>
                  {{ t('thoughts, tutorials') }}
                </UiTextGradient>
                {{ t('and updates from the') }}
                <UiTextGradient>
                  {{ t('blog') }}
                </UiTextGradient>
              </p>
            </div>

            <!-- Blogs Grid (kanan) -->
            <div class="lg:col-span-8 relative z-10">
              <div v-if="recentBlogsStatus === 'pending'" class="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <UiSkeletonContentCard v-for="i in 3" :key="i" />
              </div>
              <div v-else class="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <UiContentCard
                  v-for="blog in recentBlogsList"
                  :key="blog.path"
                  :to="toBlogLink(blog.path)"
                  :title="blog.title"
                  :description="blog.description"
                  :image="blog.coverImage"
                />

                <!-- Explore More Articles Card -->
                <div
                >
                  <NuxtLink
                    to="/blogs"
                    class="flex h-full min-h-40 flex-col rounded-lg border border-default bg-primary p-5 text-inverted transition duration-300 ease-out hover:-translate-y-0.5"
                  >
                    <div>
                      <h3 class="font-heading text-xl leading-tight sm:text-2xl">
                        {{ t('View All Articles') }}
                      </h3>
                      <p class="mt-2 line-clamp-3 text-sm leading-relaxed">
                        {{ t('Baca tulisan, opini, panduan teknis, dan refleksi mindset lainnya di halaman artikel lengkap.') }}
                      </p>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    <!-- ═══ FAQ ═══ -->
    <section class="site-frame editorial-section">
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div class="z-0 h-fit lg:sticky lg:top-32 lg:col-span-4">
            <h2 class="mb-6 leading-[0.88] tracking-tight">
              <span class="section-title-filled block">{{ t('FAQ') }}</span>
              <span class="block text-highlighted">
                <span class="section-title-outline">{{ t('Questions') }}</span><span class="text-primary">.</span>
              </span>
            </h2>
            <p class="text-sm text-muted font-medium">{{ t('Things people usually ask about working with me') }}</p>

            <div class="mt-8 hidden lg:block">
              <UiArrowButton to="#contact" variant="primary" icon="lucide:arrow-right">
                <template #leading>
                  <UIcon name="lucide:message-circle" class="size-4 text-current" />
                </template>
                {{ t('Get In Touch') }}
              </UiArrowButton>
            </div>
          </div>

          <div class="relative z-10 lg:col-span-8">
            <UAccordion
              :items="faqs"
              type="single"
              collapsible
              :ui="{
                root: 'space-y-4',
                content: 'data-[state=open]:animate-[faq-open_420ms_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[faq-close_260ms_cubic-bezier(0.4,0,1,1)]',
                item: 'overflow-hidden rounded-lg border border-default/30 bg-elevated transition-all duration-300 last:border-b hover:border-default/60 hover:bg-elevated data-[state=open]:border-primary/50 data-[state=open]:shadow-lg',
                trigger: 'items-center gap-4 p-6',
                label: 'text-sm font-semibold tracking-wide text-highlighted/80 transition-colors duration-300 group-data-[state=open]:text-highlighted md:text-base',
                trailingIcon: 'size-4 text-muted duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[state=open]:text-primary',
                body: 'mr-6 mb-6 ml-10 border-l border-primary/30 pb-0 pl-4 font-normal leading-relaxed text-muted starting:translate-y-2 starting:opacity-0'
              }"
            >
              <template #leading="{ item }">
                <span class="flex size-8 shrink-0 items-center justify-center rounded-lg border border-default bg-elevated text-xs font-bold text-muted transition-all duration-300 group-hover:border-primary/30 group-data-[state=open]:border-primary/50 group-data-[state=open]:bg-primary/20 group-data-[state=open]:text-primary">
                  {{ item.num }}
                </span>
              </template>
            </UAccordion>

            <div class="mt-8 flex justify-center lg:hidden">
              <UiArrowButton to="#contact" variant="primary" icon="lucide:arrow-right">
                <template #leading>
                  <UIcon name="lucide:message-circle" class="size-4 text-current" />
                </template>
                {{ t('Get In Touch') }}
              </UiArrowButton>
            </div>
          </div>
        </div>
      </div>
    </section>

    <AppAboutQuotes />
    <GetinTouch />
  </div>
</template>
