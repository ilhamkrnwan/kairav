<script setup lang="ts">
const { t, locale } = useI18n()

useDynamicSeo({
  titleKey: 'seo.home.title',
  descriptionKey: 'seo.home.description'
})

// JSON-LD Structured Data for homepage
usePersonSchema()
useWebSiteSchema()

// Initialize Scroll Reveal Animations
useScrollReveal()

// === Image Reveal Logic ===
const heroImageRef = ref<HTMLElement | null>(null)
const isHovered = ref(false)
const mousePos = reactive({ x: 0, y: 0 })
const smoothMousePos = reactive({ x: 0, y: 0 })
let animationFrame = 0

const updateSmoothPosition = () => {
  smoothMousePos.x += (mousePos.x - smoothMousePos.x) * 0.15
  smoothMousePos.y += (mousePos.y - smoothMousePos.y) * 0.15
  animationFrame = requestAnimationFrame(updateSmoothPosition)
}

onMounted(() => {
  animationFrame = requestAnimationFrame(updateSmoothPosition)
})

onUnmounted(() => cancelAnimationFrame(animationFrame))

const handleMouseMove = (event: MouseEvent) => {
  if (!heroImageRef.value) return
  const rect = heroImageRef.value.getBoundingClientRect()
  mousePos.x = event.clientX - rect.left
  mousePos.y = event.clientY - rect.top
}

const maskStyle = computed(() => {
  const radius = isHovered.value ? 150 : 0
  const mask = `radial-gradient(${radius}px circle at ${smoothMousePos.x}px ${smoothMousePos.y}px, black 0%, transparent 100%)`
  return {
    opacity: isHovered.value ? 1 : 0,
    maskImage: mask,
    WebkitMaskImage: mask
  }
})

// === Recent Projects ===
const { data: projects, status: projectsStatus } = await useAsyncData(
  `recent-projects-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .where('stem', 'LIKE', `portofolio/${locale.value}/%`)
      .order('date', 'DESC')
      .limit(3)
      .all(),
  { watch: [locale] }
)




/* ── Services (features) ── */
const features = computed(() => [
  {
    icon: 'lucide:building-2',
    title: t('Website Bisnis & Company Profile'),
    description: t('Bangun website bisnis yang profesional, cepat, mudah dipahami, dan siap digunakan untuk memperkenalkan brand, layanan, produk, maupun portofolio secara lebih kredibel.'),
    route: '/services/business-website',
    image: '/services/business-website.avif',
    outputs: [t('Company profile'), t('Landing page'), t('SEO basic')]
  },
  {
    icon: 'lucide:shopping-bag',
    title: t('Toko Online & Katalog Produk'),
    description: t('Buat toko online, katalog produk, atau landing page penjualan yang rapi, mudah dikelola, dan membantu calon customer memahami produk sebelum membeli atau konsultasi.'),
    route: '/services/online-store-catalog',
    image: '/services/online-store-catalog.avif',
    outputs: [t('Katalog produk'), t('CTA WhatsApp/order'), t('SEO produk')]
  },
  {
    icon: 'lucide:panel-top',
    title: t('Sistem Dashboard & Admin Panel'),
    description: t('Bangun dashboard internal untuk mengelola data, transaksi, laporan, user, konten, produk, pesanan, atau proses operasional bisnis secara lebih terstruktur dan scalable.'),
    route: '/services/dashboard-system',
    image: '/services/dashboard-system.avif',
    outputs: [t('Dashboard admin'), t('Role dan permission'), t('Reporting')]
  }
])

</script>

<template>
  <div class="min-h-screen text-default w-full overflow-hidden">
    <!-- Hero Section -->
    <section class="scroll-section will-change-[transform,opacity] section w-full py-6 px-2 lg:pt-20">
      <div class="container mx-auto">
        <div class="max-w-7xl mx-auto flex flex-col justify-center p-6 lg:flex-row lg:justify-between lg:items-center">
          <!-- Hero Image Section -->
          <div class="relative mt-4 flex items-center justify-center p-6 h-72 lg:mt-0 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 order-1 lg:order-2">
            <!-- Main Hero Image & Interactive Frame -->
            <div
              ref="heroImageRef"
              class="relative z-10 rotate-2 aspect-4/5 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 shrink-0 cursor-crosshair group stagger-item will-change-[transform,opacity]"
              @mousemove="handleMouseMove"
              @mouseenter="isHovered = true"
              @mouseleave="isHovered = false"
            >
              <!-- Lemon blob, a pink sticker and a doodle star around the portrait -->
              <div aria-hidden="true" data-float class="absolute -inset-3 -rotate-6 rounded-[58%_42%_55%_45%/48%_55%_45%_52%] border border-default bg-lemon sm:-inset-5" />
              <div aria-hidden="true" data-float class="absolute -bottom-3 -right-3 z-30 size-12 rounded-full border border-default bg-pink-sticker sm:-top-5 sm:bottom-auto sm:-right-8 sm:size-20" />
              <svg aria-hidden="true" data-float class="absolute -bottom-5 -left-6 z-30 size-12 text-primary sm:-bottom-7 sm:-left-10 sm:size-16" viewBox="0 0 24 24" fill="currentColor" stroke="var(--ui-border)" stroke-width="1.5" stroke-linejoin="round">
                <path d="M12 2l2.6 6.6L21 9.3l-5 4.4 1.6 6.8L12 17l-5.6 3.5L8 13.7 3 9.3l6.4-.7z" />
              </svg>

              <!-- Layer 1: Default Image (ilham-hero.avif) -->
              <div class="absolute inset-0 overflow-hidden rounded-lg border border-default bg-ink transition-transform duration-500 group-hover:scale-[1.01]">
                <NuxtImg
                  src="/ilham-hero.avif"
                  alt="Ilham Kurniawan"
                  width="640"
                  height="640"
                  sizes="288px sm:320px lg:384px xl:448px 2xl:512px"
                  format="webp"
                  preload
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  class="size-full object-cover object-top sepia-[0.15] contrast-105 brightness-95 dark:brightness-90"
                />
              </div>

              <!-- Layer 2: Reveal Image (ilham-hero-2.avif) -->
              <div
                class="absolute inset-0 overflow-hidden rounded-lg transition-all duration-300 ease-out pointer-events-none z-10 group-hover:scale-[1.01]"
                :style="maskStyle"
              >
                <NuxtImg
                  src="/ilham-hero-2.avif"
                  alt="" aria-hidden="true"
                  width="640"
                  height="640"
                  sizes="288px sm:320px lg:384px xl:448px 2xl:512px"
                  format="webp"
                  loading="lazy"
                  class="size-full object-cover object-top"
                />
              </div>

              <!-- Hand-Drawn Doodle Annotation Labels with Curved Dashed Arrows -->
              <div class="absolute -top-10 -left-12 lg:-left-20 z-30 hidden sm:flex items-center gap-1 pointer-events-none select-none">
                <span class="font-handwriting text-primary text-lg lg:text-xl font-bold tracking-wide -rotate-6 drop-shadow-xs whitespace-nowrap">
                  {{ t('Hover to reveal') }}
                </span>
                <svg class="w-12 h-9 text-primary overflow-visible" viewBox="0 0 50 40" fill="none">
                  <path d="M 6 8 Q 28 6 36 28" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="4 4" />
                  <path d="M 26 24 L 37 30 L 38 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </svg>
              </div>

              </div>
          </div>

          <!-- Text Content Section -->
          <div class="flex flex-col justify-center lg:p-6 p-0 text-center rounded-lg lg:max-w-lg xl:max-w-xl lg:text-left order-2 lg:order-1 z-10">
            <!-- Greeting -->
            <p class="mt-6 mb-3 -rotate-1 lg:mt-0 font-handwriting text-2xl font-bold text-primary stagger-item will-change-[transform,opacity]">
              {{ t('Hello my name is Ilham Kurniawan') }}
            </p>

            <!-- Main Heading -->
            <h1 :key="$i18n.locale" class="leading-[0.95] tracking-tight mb-8">
              <span class="section-title-filled">{{ t('Fullstack') }}</span>
              <span class="section-title-outline">{{ t('Developer') }}<span class="text-highlighted">.</span></span>
            </h1>

            <!-- Sub Roles -->
            <div class="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 mb-6 stagger-item will-change-[transform,opacity]">
              <span class="text-sm font-normal text-muted tracking-wide">{{ t('IT Student') }}</span>
              <span class="text-dimmed/40 text-sm">·</span>
              <span class="text-sm font-normal text-muted tracking-wide">{{ t('Web3 & AI Enthusiast') }}</span>
            </div>

            <!-- Description -->
            <p class="lg:text-lg text-base text-muted mb-8 font-normal stagger-item will-change-[transform,opacity]">
              {{ t('Bridging the gap between') }}
              <UiTextGradient>
                {{ t('complex ideas') }}
              </UiTextGradient>
              {{ t('and') }}
              <UiTextGradient>
                {{ t('seamless digital experiences.') }}
              </UiTextGradient>
              <br/><br/>
              {{ t('Agnostic in tools, precise in execution.') }}
              {{ t('Designed for users,') }}
              <UiTextGradient>
                {{ t('built for impact.') }}
              </UiTextGradient>
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 stagger-item will-change-[transform,opacity]">
              <div data-magnetic class="flex flex-col">
                <UiArrowButton
                  href="https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20punya%20ide%20proyek%20digital%20dan%20ingin%20konsultasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  icon="lucide:arrow-up-right"
                >
                  <template #leading>
                    <UIcon name="simple-icons:whatsapp" class="size-4" />
                  </template>
                  {{ t('cta.button_consult') }}
                </UiArrowButton>
              </div>

              <div data-magnetic class="flex flex-col">
                <UiArrowButton to="/cv" variant="secondary" icon="lucide:download">
                  {{ t('Download CV') }}
                </UiArrowButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lazy loaded sections with GSAP trigger classes directly on their wrappers -->
    <div class="will-change-[transform,opacity]">
    <section id="features" class="overflow-hidden px-6 py-20 md:px-12 lg:px-20">
        <div class="features-container mx-auto max-w-7xl">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <!-- Title Area -->
            <div class="scroll-section z-0 h-fit will-change-[transform,opacity] lg:sticky lg:top-32 lg:col-span-4">
              <h2 :key="$i18n.locale" class="mb-6 leading-[0.88] tracking-tight">
                <span class="section-title-filled block">{{ t('Solusi Digital') }}</span>
                <span class="block text-highlighted">
                  <span class="section-title-outline">{{ t('Untuk Bisnis') }}</span><span class="text-primary">.</span>
                </span>
              </h2>
              <div class="mb-6 h-1 w-12 bg-primary" />
              <p class="text-sm leading-relaxed text-muted">
                {{ t('Saya membantu bisnis, UMKM, startup, dan organisasi membangun') }}
                <UiTextGradient>
                  {{ t('website, dashboard, sistem custom,') }}
                </UiTextGradient>
                {{ t('dan integrasi digital yang') }}
                <UiTextGradient>
                  {{ t('cepat, rapi, scalable,') }}
                </UiTextGradient>
                {{ t('dan memberikan dampak nyata.') }}
              </p>
            </div>

            <!-- Services: bento -->
            <div class="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-6 lg:col-span-8">
              <ULink
                v-for="(feature, index) in features"
                :key="feature.title"
                :to="feature.route"
                raw
                class="scroll-section group flex flex-col gap-3"
                :class="index === 0 ? 'sm:col-span-3 sm:row-span-2' : 'sm:col-span-3'"
              >
                <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted" :class="index === 0 ? 'sm:aspect-auto sm:min-h-0 sm:flex-1' : ''">
                  <NuxtImg
                    :src="feature.image"
                    :alt="feature.title"
                    width="720"
                    height="480"
                    format="avif"
                    loading="lazy"
                    data-parallax class="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover transition-[scale] duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 class="font-heading leading-tight text-highlighted" :class="index === 0 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'">
                    {{ feature.title }}
                  </h3>
                  <p v-if="index === 0" class="mt-1.5 line-clamp-3 max-w-lg text-sm text-muted">{{ feature.description }}</p>
                  <p class="mt-2 text-sm font-semibold text-primary">{{ feature.outputs.join(' · ') }}</p>
                </div>
              </ULink>

              <ULink
                to="/services"
                raw
                class="group flex items-center justify-between gap-4 rounded-lg border border-default bg-lemon p-5 font-heading text-2xl text-ink transition duration-300 ease-out hover:-translate-y-0.5 sm:col-span-6 sm:p-5"
              >
                {{ t('Explore All Services') }}
                <UIcon name="lucide:arrow-right" class="size-7 transition-transform group-hover:translate-x-1" />
              </ULink>
            </div>
          </div>
        </div>
    </section>
    </div>
    <div class="scroll-section will-change-[transform,opacity]">
      <LazyAppAboutSkills hydrate-on-visible />
    </div>

    <!-- Recent Projects -->
    <section class="section overflow-hidden px-6 py-20 will-change-[transform,opacity] md:px-12 lg:px-20">
      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12">
        <div class="scroll-section z-0 h-fit will-change-[transform,opacity] lg:sticky lg:top-32 lg:col-span-4">
          <h2 :key="$i18n.locale" class="mb-6 leading-[0.88] tracking-tight">
            <span class="section-title-filled block">{{ t('Recent') }}</span>
            <span class="section-title-outline block">{{ t('Projects') }}<span class="text-primary">.</span></span>
          </h2>
          <div class="mb-6 h-1 w-12 bg-primary" />
          <p class="text-sm leading-relaxed text-muted">
            {{ t('A collection of digital executions where') }}
            <UiTextGradient>
              {{ t('technical logic') }}
            </UiTextGradient>
            {{ t('meets') }}
            <UiTextGradient>
              {{ t('seamless user experience.') }}
            </UiTextGradient>
          </p>
        </div>

        <div class="relative z-10 lg:col-span-8">

          <div v-if="projectsStatus === 'pending'" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <UiSkeletonPortfolioCard v-for="i in 3" :key="`recent-project-skeleton-${i}`" />
          </div>

          <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-6">
            <ULink
              v-for="(project, index) in projects"
              :key="project.path"
              :to="project._path || project.path"
              raw
              class="scroll-section group flex flex-col gap-3"
              :class="index < 2 ? 'sm:col-span-3' : 'sm:col-span-4'"
            >
              <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted">
                <NuxtImg
                  :src="project.image"
                  :alt="project.title"
                  width="640"
                  height="400"
                  format="avif"
                  loading="lazy"
                  data-parallax class="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover transition-[scale] duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <h3 class="font-heading text-xl leading-tight text-highlighted sm:text-2xl">{{ project.title }}</h3>
                <p class="mt-1.5 line-clamp-2 max-w-md text-sm text-muted">{{ project.description }}</p>
                <p class="mt-2 text-sm font-semibold text-primary">{{ project.tags?.slice(0, 3).join(' · ') }}</p>
              </div>
            </ULink>

            <ULink
              to="/portofolio"
              raw
              class="group flex min-h-32 flex-col justify-between rounded-lg border border-default bg-primary p-5 text-inverted transition duration-300 ease-out hover:-translate-y-0.5 sm:col-span-2 sm:p-5"
            >
              <UIcon name="lucide:arrow-up-right" class="size-9 self-end transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span class="font-heading text-2xl leading-tight">{{ t('View All Projects') }}</span>
            </ULink>
          </div>
        </div>
      </div>
    </section>
    <div class="scroll-section will-change-[transform,opacity]">
      <LazyAppAboutQuotes hydrate-on-visible />
    </div>
    <div class="scroll-section will-change-[transform,opacity]">
      <LazyGetinTouch hydrate-on-visible />
    </div>

    <!-- SEO: Explicit intro for search engines and AI crawlers (visually hidden but present in DOM) -->
    <section class="sr-only" aria-label="About Ilham Kurniawan">
      <p>
        <strong>Ilham Kurniawan</strong> adalah seorang <strong>Fullstack Developer</strong> berbasis di <strong>Indonesia</strong>,
        spesialisasi dalam <strong>Nuxt.js</strong>, <strong>Vue.js</strong>, <strong>Laravel</strong>, <strong>Flutter</strong>, dan <strong>UI/UX Design</strong>.
        Dengan <strong>3+ tahun pengalaman</strong> dan <strong>50+ proyek</strong> yang berhasil diselesaikan, Ilham membangun
        <strong>web application</strong>, <strong>mobile app</strong>, <strong>dashboard admin</strong>, dan <strong>sistem digital</strong>
        yang scalable untuk klien di berbagai industri termasuk agritech, edukasi, komunitas, dan e-commerce.
        Saat ini menempuh S1 Informatika di Universitas Nahdlatul Ulama Yogyakarta (UNUYO) sambil aktif bekerja sebagai
        developer di Sekeco dan Jurutani. Terbuka untuk kolaborasi freelance dan posisi full-time.
      </p>
    </section>
  </div>
</template>

