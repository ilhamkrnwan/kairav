<script setup lang="ts">
const { t, locale } = useI18n()

useDynamicSeo({
  titleKey: 'seo.home.title',
  descriptionKey: 'seo.home.description'
})

// JSON-LD Structured Data for homepage
usePersonSchema()
useWebSiteSchema()

const showAlternativePortrait = ref(false)
const home = useTemplateRef<HTMLElement>('home')
const hero = useTemplateRef<HTMLElement>('hero')
const work = useTemplateRef<HTMLElement>('work')
const whatsapp = 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20punya%20ide%20proyek%20digital%20dan%20ingin%20konsultasi.'

// === Recent Projects ===
const { data: projects, status: projectsStatus } = await useAsyncData(
  `recent-projects-${locale.value}`,
  () =>
    queryCollection('portofolio')
      .where('stem', 'LIKE', `portofolio/${locale.value}/%`)
      .all(),
  { watch: [locale] }
)

const featuredSlugs = ['jurutani', 'santap', 'kairav-studio']
const featuredProjects = computed(() => featuredSlugs.flatMap((slug) => {
  const project = projects.value?.find(item => item.stem?.endsWith(`/${slug}`))
  return project ? [{ slug, project }] : []
}))

const selectedSlug = ref(featuredSlugs[0])
const activeWork = computed(() => featuredProjects.value.find(({ slug }) => slug === selectedSlug.value) ?? featuredProjects.value[0])
const activeSlug = computed(() => activeWork.value?.slug ?? '')
const activeIndex = computed(() => featuredProjects.value.findIndex(({ slug }) => slug === activeSlug.value))
const previewDirection = ref(1)
const projectRoute = (project: NonNullable<typeof activeWork.value>['project']) =>
  project._path || project.path.replace(/^\/portofolio\/[^/]+/, '/portofolio')

function selectProject(index: number, direction = Math.sign(index - activeIndex.value)) {
  const selected = featuredProjects.value[index]
  if (!selected || selected.slug === activeSlug.value) return
  previewDirection.value = direction || 1
  selectedSlug.value = selected.slug
}

function stepProject(direction: number) {
  const count = featuredProjects.value.length
  if (count < 2) return
  selectProject((activeIndex.value + direction + count) % count, direction)
}

// Decorative backdrop for the statement band; hidden from assistive tech.
const statementWords = Array.from({ length: 5 }, () => [
  'Build', 'Design', 'Ship', 'Refine', 'Systems', 'Interface', 'Detail', 'Scale',
]).flat()

const drag = useWorkDrag(stepProject)
useHomeMotion(hero, work, { activeSlug, previewDirection, showAlternativePortrait })
useHomeSectionMotion(home)

/* ── Services (features) ── */
const features = computed(() => [
  {
    title: t('Website Bisnis & Company Profile'),
    description: t('Bangun website bisnis yang profesional, cepat, mudah dipahami, dan siap digunakan untuk memperkenalkan brand, layanan, produk, maupun portofolio secara lebih kredibel.'),
    route: '/services/business-website',
    image: '/services/business-website.avif',
  },
  {
    title: t('Toko Online & Katalog Produk'),
    description: t('Buat toko online, katalog produk, atau landing page penjualan yang rapi, mudah dikelola, dan membantu calon customer memahami produk sebelum membeli atau konsultasi.'),
    route: '/services/online-store-catalog',
    image: '/services/online-store-catalog.avif',
  },
  {
    title: t('Sistem Dashboard & Admin Panel'),
    description: t('Bangun dashboard internal untuk mengelola data, transaksi, laporan, user, konten, produk, pesanan, atau proses operasional bisnis secara lebih terstruktur dan scalable.'),
    route: '/services/dashboard-system',
    image: '/services/dashboard-system.avif',
  }
])

</script>

<template>
  <div ref="home" class="home-page">
    <section ref="hero" class="site-frame home-hero" aria-labelledby="home-title">
      <div class="home-meta editorial-label">
        <span>{{ t('footer.location_studio') }}</span>
        <span class="home-meta-status"><i aria-hidden="true" />{{ t('footer.status_available') }}</span>
        <span aria-hidden="true">&copy; {{ new Date().getFullYear() }}</span>
      </div>

      <h1 id="home-title" class="home-name" aria-label="Ilham Kurniawan">
        <span class="home-name-mask"><span data-name-word><span data-name-ink>Ilham</span></span></span>
        <span class="home-name-mask"><span data-name-word><span data-name-ink>Kurniawan</span></span></span>
      </h1>

      <div class="home-intro">
        <div class="home-intro-copy">
          <p class="editorial-label">{{ t('Fullstack Developer') }}</p>
          <p class="home-description">{{ t('intro.description') }}</p>
          <div class="home-actions">
            <UiArrowButton :href="whatsapp" target="_blank" rel="noopener noreferrer" icon="lucide:arrow-up-right">
              {{ t('cta.button_consult') }}
            </UiArrowButton>
            <UiArrowButton to="#selected-work" variant="secondary" icon="lucide:arrow-down">
              {{ t('View works') }}
            </UiArrowButton>
          </div>
        </div>

        <figure class="home-portrait">
          <div class="home-portrait-depth" data-portrait-depth>
            <NuxtImg
              v-for="(portrait, index) in ['/ilham-hero.avif', '/ilham-hero-2.avif']"
              :key="portrait"
              :src="portrait"
              :alt="showAlternativePortrait === (index === 1) ? 'Ilham Kurniawan' : ''"
              :aria-hidden="showAlternativePortrait !== (index === 1)"
              width="640"
              height="640"
              sizes="100vw sm:55vw lg:420px"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              :loading="index === 1 ? 'lazy' : undefined"
              class="home-portrait-image"
              :class="{ 'is-selected': showAlternativePortrait === (index === 1) }"
            />
            <span class="home-portrait-shutter" data-portrait-shutter aria-hidden="true" />
          </div>
          <span aria-hidden="true" class="cover-art" data-cover-art />
          <button
            type="button"
            class="home-portrait-toggle"
            :aria-pressed="showAlternativePortrait"
            :aria-label="t('navigation.alternatePortrait')"
            :title="t('navigation.alternatePortrait')"
            @click="showAlternativePortrait = !showAlternativePortrait"
          >
            <UIcon name="lucide:images" class="size-5" />
          </button>
        </figure>

        <div class="home-mascot">
          <LazyUiMascot name="kairav" size="100%" label="Kairav" hydrate-on-visible>
            <template #fallback>
              <UiMascotMark class="home-mascot-fallback" />
            </template>
            <template #caption>
              <span class="home-mascot-caption editorial-label">
                <span>Kairav</span>
                <UIcon name="lucide:message-circle" class="size-4" aria-hidden="true" />
              </span>
            </template>
          </LazyUiMascot>
          <span aria-hidden="true" class="cover-art" data-cover-art />
        </div>
      </div>
    </section>

    <section class="home-statement inverse-band" aria-labelledby="home-statement-title">
      <div class="statement-stage">
        <div class="statement-field" aria-hidden="true">
          <span v-for="(word, index) in statementWords" :key="index">{{ word }}</span>
        </div>
        <h2 id="home-statement-title" class="statement-title">
          <span>{{ t('statement.first') }}</span>
          <span>{{ t('statement.second') }}</span>
          <span>{{ t('statement.third') }}</span>
        </h2>
      </div>
    </section>

    <div class="statement-run" aria-hidden="true" />

    <div class="home-cover">
    <section id="selected-work" class="site-frame editorial-section" aria-labelledby="selected-work-title">
      <div class="editorial-section-heading">
        <div>
          <h2 id="selected-work-title" class="editorial-title">{{ t('featured.title') }}</h2>
          <p class="mt-3 max-w-[54ch] text-muted">{{ t('featured.description') }}</p>
        </div>
        <UiArrowButton to="/portofolio" variant="secondary" icon="lucide:arrow-up-right">
          {{ t('View All Projects') }}
        </UiArrowButton>
      </div>

      <div v-if="projectsStatus === 'pending'" class="work-loading">
        <UiSkeletonContentCard v-for="i in 3" :key="i" />
      </div>
      <p v-else-if="projectsStatus === 'error' || !activeWork" role="status" class="text-sm text-muted">
        {{ t('featured.unavailable') }}
      </p>
      <div v-else ref="work" class="work-browser">
        <div>
          <ul class="work-index" :aria-label="t('featured.title')">
            <li v-for="({ slug, project }, index) in featuredProjects" :key="slug">
              <button
                type="button"
                class="work-index-item"
                :aria-pressed="slug === activeSlug"
                aria-controls="selected-work-preview"
                @click="selectProject(index)"
              >
                <span class="work-index-title">{{ project.title }}</span>
                <UIcon name="lucide:chevron-right" class="work-index-marker size-5" aria-hidden="true" />
              </button>
            </li>
          </ul>
          <p class="work-index-description text-muted"><span class="block" data-work-copy>{{ activeWork.project.description }}</span></p>
        </div>
        <div id="selected-work-preview" class="work-preview">
          <div data-work-stage>
            <div
              class="work-preview-frame"
              :class="{ 'is-draggable': featuredProjects.length > 1, 'is-reversed': previewDirection < 0 }"
              data-work-preview
              aria-hidden="true"
              @pointerdown="featuredProjects.length > 1 && drag.begin($event)"
              @pointermove="drag.move"
              @pointerup="drag.end"
              @pointerleave="drag.leave"
              @pointercancel="drag.cancel"
              @lostpointercapture.self="drag.cancel"
            >
              <div class="work-preview-depth" data-work-depth>
                <div class="work-preview-drag">
                  <div class="work-preview-art" data-work-art>
                    <NuxtImg
                      v-for="{ slug, project } in featuredProjects"
                      :key="slug"
                      :src="project.image || '/placeholder.avif'"
                      alt=""
                      width="1120"
                      height="700"
                      sizes="100vw md:64vw xl:900px"
                      loading="lazy"
                      decoding="async"
                      class="work-preview-image"
                      :class="{ 'is-selected': slug === activeSlug }"
                      draggable="false"
                    />
                  </div>
                </div>
              </div>
              <div class="work-preview-shutters">
                <span v-for="strip in 3" :key="strip" data-work-shutter />
              </div>
            </div>
            <div class="work-preview-caption">
              <ULink :to="projectRoute(activeWork.project)" raw class="work-preview-link">
                <span>{{ t('View Case Study') }}<span class="sr-only"> – {{ activeWork.project.title }}</span></span>
                <UIcon name="lucide:arrow-up-right" class="size-5 shrink-0" aria-hidden="true" />
              </ULink>
              <div v-if="featuredProjects.length > 1" class="work-preview-controls">
                <button type="button" :aria-label="t('featured.previous')" @click="stepProject(-1)">
                  <UIcon name="lucide:arrow-left" class="size-4" aria-hidden="true" />
                </button>
                <span class="work-preview-count" aria-hidden="true">{{ activeIndex + 1 }} / {{ featuredProjects.length }}</span>
                <button type="button" :aria-label="t('featured.next')" @click="stepProject(1)">
                  <UIcon name="lucide:arrow-right" class="size-4" aria-hidden="true" />
                </button>
                <span class="sr-only" aria-live="polite">{{ activeWork.project.title }}</span>
              </div>
            </div>
            <p v-if="featuredProjects.length > 1" class="work-preview-hint text-muted">
              <UIcon name="lucide:move-horizontal" class="size-4 shrink-0" aria-hidden="true" />
              {{ t('featured.drag') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="inverse-band" data-inverse-band>
    <section id="features" class="site-frame editorial-section editorial-split" aria-labelledby="home-services-title">
      <div>
        <h2 id="home-services-title" class="editorial-title">{{ t('Solusi Digital') }} {{ t('Untuk Bisnis') }}</h2>
        <p class="mt-4 max-w-[40ch] text-muted">
          {{ t('Saya membantu bisnis, UMKM, startup, dan organisasi membangun') }}
          {{ t('website, dashboard, sistem custom,') }}
          {{ t('dan integrasi digital yang') }}
          {{ t('cepat, rapi, scalable,') }}
          {{ t('dan memberikan dampak nyata.') }}
        </p>
        <UiArrowButton to="/services" variant="secondary" class="mt-5">
          {{ t('Explore All Services') }}
        </UiArrowButton>
      </div>
      <ul class="editorial-list">
        <li v-for="feature in features" :key="feature.route">
          <ULink :to="feature.route" raw class="home-service-link group">
            <NuxtImg :src="feature.image" alt="" width="192" height="120" loading="lazy" class="aspect-3/2 w-full bg-muted object-cover" />
            <div>
              <h3 class="text-lg font-semibold leading-snug group-hover:text-primary sm:text-xl">{{ feature.title }}</h3>
              <p class="mt-1.5 line-clamp-2 text-sm text-muted">{{ feature.description }}</p>
            </div>
            <UIcon name="lucide:arrow-up-right" class="size-5" aria-hidden="true" />
          </ULink>
        </li>
      </ul>
    </section>
    </div>

    <AppAboutSkills />
    <GetinTouch />
    </div>
  </div>
</template>
