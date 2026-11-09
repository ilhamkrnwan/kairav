<script setup lang="ts">
type SearchType = 'page' | 'service' | 'project' | 'article'

interface SearchItem {
  type: SearchType
  title: string
  description?: string
  image?: string
  to: string
  meta?: string
  tags?: string[]
  icon?: string
}

const { t, locale, setLocale } = useI18n()
const route = useRoute()
const colorMode = useColorMode()

/* ── Navigation ── */
const navLinks = computed(() => [
  { label: t('Services'), to: '/services' },
  { label: t('Portofolio'), to: '/portofolio' },
  { label: t('Blogs'), to: '/blogs' },
  { label: t('Gallery'), to: '/gallery' },
  { label: t('About'), to: '/about' }
])
const isCurrent = (to: string) => to === '/' ? route.path === '/' : isActive(to)
const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)

/* ── Language: a plain two-way switch, no dropdown ── */
// Page text fades down, the language swaps, new text rises back in (see [data-locale-swap] in the layout)
const toggleLocale = async () => {
  const next = locale.value === 'id' ? 'en' : 'id'
  const targets = Array.from(document.querySelectorAll('[data-locale-swap]'))
  if (!targets.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    await setLocale(next)
    return
  }
  const { gsap } = await import('gsap')
  await gsap.to(targets, { opacity: 0, y: 12, duration: 0.2, ease: 'power2.in' })
  await setLocale(next)
  await nextTick()
  gsap.fromTo(targets, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.12, clearProps: 'opacity,transform' })
}

/* ── Theme: lemon splash grows from the button, theme flips under it ── */
const isSplashing = ref(false)
// Transition stays off while the origin is moved to the button, so the circle never slides in from the corner
const splashAnimated = ref(false)
const splashOrigin = reactive({ x: 0, y: 0 })
let switchAudio: HTMLAudioElement | undefined

const toggleTheme = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  splashOrigin.x = rect.left + rect.width / 2
  splashOrigin.y = rect.top + rect.height / 2

  if (switchAudio) {
    switchAudio.currentTime = 0
    switchAudio.play().catch(() => {})
  }

  splashAnimated.value = false
  nextTick(() => requestAnimationFrame(() => {
    splashAnimated.value = true
    isSplashing.value = true
  }))
  setTimeout(() => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    setTimeout(() => {
      isSplashing.value = false
      setTimeout(() => (splashAnimated.value = false), 700)
    }, 150)
  }, 600)
}

onMounted(() => {
  switchAudio = new Audio('/sound-effect/swicth-theme-sound-effect.mp3')
  switchAudio.volume = 0.3
  switchAudio.preload = 'auto'
})

/* ── Menu ── */
const menuOpen = ref(false)

const menuTiles = computed(() => [
  { label: t('Home'), to: '/', icon: 'lucide:house', class: 'col-span-2 bg-lemon text-ink' },
  { label: t('Services'), to: '/services', icon: 'lucide:layers', class: 'col-span-2 bg-pink-sticker text-ink' },
  { label: t('Portofolio'), to: '/portofolio', icon: 'lucide:folder-open', class: 'col-span-2 sm:col-span-1 bg-primary text-inverted' },
  { label: t('Blogs'), to: '/blogs', icon: 'lucide:pen-line', class: 'col-span-2 sm:col-span-1 bg-elevated text-highlighted' },
  { label: t('Gallery'), to: '/gallery', icon: 'lucide:images', class: 'col-span-2 bg-elevated text-highlighted' },
  { label: t('About'), to: '/about', icon: 'lucide:smile', class: 'col-span-2 bg-elevated text-highlighted' },
  { label: t('Contact'), to: '/contact', icon: 'lucide:message-circle', class: 'col-span-2 bg-lemon text-ink' }
])

const socials = [
  { name: 'Instagram', icon: 'lucide:instagram', to: 'https://www.instagram.com/ilhamkrnwan__' },
  { name: 'GitHub', icon: 'simple-icons:github', to: 'https://github.com/ilhamkrnwan' },
  { name: 'LinkedIn', icon: 'simple-icons:linkedin', to: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/' },
  { name: 'WhatsApp', icon: 'simple-icons:whatsapp', to: 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20ingin%20konsultasi%20proyek.' }
]

/* ── Search: every page and piece of content as a bento grid ── */
const searchOpen = ref(false)
const query = ref('')
const filter = ref<'all' | SearchType>('all')

const pageItems = computed<SearchItem[]>(() => [
  { type: 'page', title: t('Home'), to: '/', icon: 'lucide:house' },
  { type: 'page', title: t('Services'), to: '/services', icon: 'lucide:layers' },
  { type: 'page', title: t('Portofolio'), to: '/portofolio', icon: 'lucide:folder-open' },
  { type: 'page', title: t('Blogs'), to: '/blogs', icon: 'lucide:pen-line' },
  { type: 'page', title: t('Gallery'), to: '/gallery', icon: 'lucide:images' },
  { type: 'page', title: t('About'), to: '/about', icon: 'lucide:smile' },
  { type: 'page', title: t('Contact'), to: '/contact', icon: 'lucide:message-circle' },
  { type: 'page', title: 'CV', to: '/cv', icon: 'lucide:file-user' }
])

const toRoute = (path: string) => path
  .replace(/^\/blog\/[^/]+/, '/blogs')
  .replace(/^\/(portofolio|services)\/[^/]+/, '/$1')

const { data: contentItems, execute: loadIndex, status: indexStatus } = useAsyncData('site-search-index', async () => {
  const l = locale.value
  const [blogs, projects, services] = await Promise.all([
    queryCollection('blog').where('stem', 'LIKE', `blog/${l}/%`).order('date', 'DESC').select('title', 'description', 'path', 'coverImage', 'category', 'tags').all(),
    queryCollection('portofolio').where('stem', 'LIKE', `portofolio/${l}/%`).select('title', 'description', 'path', 'image', 'category', 'tags').all(),
    queryCollection('services').where('stem', 'LIKE', `services/${l}/%`).order('order', 'ASC').select('title', 'description', 'path', 'image', 'coverImage', 'category', 'tags', 'icon').all()
  ])

  return [
    ...services.map((s): SearchItem => ({ type: 'service', title: s.title ?? '', description: s.description, image: s.coverImage || s.image, to: toRoute(s.path), meta: s.category, tags: s.tags, icon: s.icon })),
    ...projects.map((p): SearchItem => ({ type: 'project', title: p.title ?? '', description: p.description, image: p.image, to: toRoute(p.path), meta: p.category, tags: p.tags })),
    ...blogs.map((b): SearchItem => ({ type: 'article', title: b.title ?? '', description: b.description, image: b.coverImage, to: toRoute(b.path), meta: b.category, tags: b.tags }))
  ]
}, { immediate: false, server: false, lazy: true })

let loadedLocale = ''
watch(searchOpen, (open) => {
  if (!open) return
  if (loadedLocale !== locale.value) {
    loadedLocale = locale.value
    loadIndex()
  }
})

defineShortcuts({
  meta_k: { usingInput: true, handler: () => { searchOpen.value = !searchOpen.value } },
  ctrl_k: { usingInput: true, handler: () => { searchOpen.value = !searchOpen.value } }
})

const filters = computed(() => [
  { value: 'all' as const, label: t('All') },
  { value: 'page' as const, label: t('Pages') },
  { value: 'service' as const, label: t('Services') },
  { value: 'project' as const, label: t('Projects') },
  { value: 'article' as const, label: t('Articles') }
])

const matchesQuery = (item: SearchItem) => {
  const q = query.value.trim().toLowerCase()
  return !q || [item.title, item.description, item.meta, ...(item.tags ?? [])].join(' ').toLowerCase().includes(q)
}
const allItems = computed(() => [...pageItems.value, ...(contentItems.value ?? [])])
const results = computed(() => allItems.value.filter(item => (filter.value === 'all' || item.type === filter.value) && matchesQuery(item)))
const countOf = (value: 'all' | SearchType) => allItems.value.filter(item => (value === 'all' || item.type === value) && matchesQuery(item)).length

const typeLabel = computed<Record<SearchType, string>>(() => ({
  page: t('Pages'),
  service: t('Services'),
  project: t('Projects'),
  article: t('Articles')
}))

const pageTones = ['bg-lemon text-ink', 'bg-pink-sticker text-ink', 'bg-primary text-inverted', 'bg-elevated text-highlighted']
const toneFor = (type: SearchType, index: number) => ({
  page: pageTones[index % pageTones.length],
  service: 'bg-lemon text-ink',
  project: 'bg-primary text-inverted',
  article: 'bg-pink-sticker text-ink'
})[type]

// Repeating bento rhythm: one hero tile, a wide tile, a tall tile, then small ones
const bentoSpans = [
  'sm:col-span-2 sm:row-span-2',
  '',
  '',
  'sm:col-span-2',
  '',
  'sm:row-span-2',
  '',
  '',
  'sm:col-span-2',
  ''
]
const spanFor = (index: number) => bentoSpans[index % bentoSpans.length]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-5 sm:pt-3">
    <!-- Theme splash -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-9998 bg-lemon duration-600 ease-in-out"
      :class="splashAnimated ? 'transition-[clip-path]' : 'transition-none'"
      :style="{ clipPath: `circle(${isSplashing ? '150%' : '0px'} at ${splashOrigin.x}px ${splashOrigin.y}px)` }"
    />

    <div class="mx-auto flex max-w-7xl items-center gap-1 rounded-lg border border-default bg-elevated py-1 pr-1 pl-3 shadow-sm sm:gap-1.5 sm:pl-4 dark:shadow-none">
      <ULink to="/" raw class="mr-auto font-heading text-base whitespace-nowrap text-highlighted transition-colors hover:text-primary sm:text-lg lg:mr-0">
        Ilham Kurniawan<span class="text-pink-deep">.</span>
      </ULink>

      <nav class="hidden flex-1 items-center justify-center gap-1 lg:flex" aria-label="Main">
        <UButton
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          color="neutral"
          variant="ghost"
          size="sm"
          :class="isActive(link.to) ? 'bg-lemon text-ink hover:bg-lemon hover:text-ink dark:hover:text-ink' : ''"
          :label="link.label"
        />
      </nav>

      <div class="flex items-center gap-1 sm:gap-1.5">
        <UButton
          color="neutral"
          variant="outline"
          icon="lucide:search"
          :aria-label="t('Search')"
          class="size-8 justify-center md:w-auto md:px-4"
          @click="searchOpen = true"
        >
          <span class="hidden md:inline">{{ t('Search') }}</span>
          <UKbd class="hidden md:inline-flex" value="meta" /><UKbd class="hidden md:inline-flex" value="K" />
        </UButton>

        <!-- Language: tap to flip, the active half lights up -->
        <UButton
          color="neutral"
          variant="outline"
          :aria-label="locale === 'id' ? 'Switch language to English' : 'Ganti bahasa ke Indonesia'"
          class="h-8 p-0.5"
          @click="toggleLocale"
        >
          <span class="relative flex h-full">
            <!-- Lemon thumb slides under the active code, with a springy overshoot -->
            <span
              aria-hidden="true"
              class="absolute inset-y-0 left-0 w-7 rounded bg-lemon transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              :class="locale === 'en' ? 'translate-x-7' : 'translate-x-0'"
            />
            <span
              v-for="code in ['id', 'en']"
              :key="code"
              class="relative flex h-full w-7 items-center justify-center text-xs font-bold uppercase transition-colors duration-300"
              :class="locale === code ? 'text-ink' : 'text-muted'"
            >
              {{ code }}
            </span>
          </span>
        </UButton>

        <UButton
          color="neutral"
          variant="outline"
          aria-label="Toggle dark mode"
          class="size-8 justify-center"
          @click="toggleTheme"
        >
          <UIcon name="lucide:sun" class="block size-5 dark:hidden" />
          <UIcon name="lucide:moon" class="hidden size-5 dark:block" />
        </UButton>

        <UButton
          color="neutral"
          variant="solid"
          icon="lucide:menu"
          aria-label="Open navigation menu"
          class="size-8 justify-center bg-lemon text-ink hover:bg-lemon-300 hover:text-ink dark:hover:text-ink"
          @click="menuOpen = true"
        />
      </div>
    </div>

    <!-- Menu: fullscreen, links on the left, contact on the right -->
    <UModal
      v-model:open="menuOpen"
      fullscreen
      title="Menu"
      description="Browse the site pages"
      :ui="{
        content: 'bg-default',
        header: 'min-h-14 px-4 sm:px-6',
        title: 'font-heading text-xl font-normal',
        description: 'sr-only',
        body: 'flex-1 overflow-y-auto p-0 sm:p-0'
      }"
    >
      <template #body>
        <div class="grid min-h-full lg:grid-cols-[1fr_24rem]">
          <nav class="flex flex-col p-4 sm:p-6" aria-label="Menu">
            <ULink
              v-for="(tile, index) in menuTiles"
              :key="tile.to"
              :to="tile.to"
              raw
              class="group flex items-center gap-4 py-3 transition-colors hover:text-primary sm:py-4 starting:translate-x-4 starting:opacity-0"
              :class="isCurrent(tile.to) ? 'text-primary' : 'text-highlighted'"
              :style="{ transitionDelay: `${index * 30}ms` }"
              @click="menuOpen = false"
            >
              <span class="w-6 text-sm font-semibold text-muted tabular-nums">{{ String(index + 1).padStart(2, '0') }}</span>
              <span class="font-heading text-3xl leading-none sm:text-5xl">{{ tile.label }}</span>
              <UIcon :name="tile.icon" class="ml-auto size-6 text-muted transition group-hover:scale-110 group-hover:text-primary sm:size-8" />
            </ULink>
          </nav>

          <aside class="flex flex-col gap-4 border-t border-default bg-muted p-4 sm:p-6 lg:border-t-0 lg:border-l">
            <UiArrowButton
              href="https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20punya%20ide%20proyek%20digital%20dan%20ingin%20konsultasi."
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              icon="lucide:arrow-up-right"
              class="justify-between"
            >
              <template #leading>
                <UIcon name="simple-icons:whatsapp" class="size-4" />
              </template>
              {{ t('cta.button_consult') }}
            </UiArrowButton>

            <div class="mt-auto flex flex-wrap gap-1.5">
              <UButton
                v-for="social in socials"
                :key="social.name"
                :to="social.to"
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
                variant="outline"
                :icon="social.icon"
                :label="social.name"
                size="sm"
              />
            </div>
          </aside>
        </div>
      </template>
    </UModal>

    <!-- Search: fullscreen, filters on the left, bento results on the right -->
    <UModal
      v-model:open="searchOpen"
      fullscreen
      :title="t('Search')"
      :description="t('Search everything on this site')"
      :ui="{
        content: 'bg-default',
        header: 'min-h-14 px-4 sm:px-6',
        title: 'font-heading text-xl font-normal',
        description: 'sr-only',
        body: 'flex-1 overflow-hidden p-0 sm:p-0'
      }"
    >
      <template #body>
        <div class="grid h-full grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[17rem_1fr] lg:grid-rows-1">
          <aside class="space-y-3 border-b border-default bg-muted p-4 lg:border-r lg:border-b-0">
            <UInput
              v-model="query"
              autofocus
              size="lg"
              icon="lucide:search"
              :placeholder="t('Search everything on this site')"
              class="w-full"
            >
              <template v-if="query" #trailing>
                <UButton color="neutral" variant="link" size="sm" icon="lucide:x" :aria-label="t('Clear')" @click="query = ''" />
              </template>
            </UInput>

            <div class="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
              <UButton
                v-for="f in filters"
                :key="f.value"
                size="sm"
                color="neutral"
                variant="ghost"
                class="lg:w-full lg:justify-between"
                :class="filter === f.value ? 'bg-lemon text-ink hover:bg-lemon' : ''"
                @click="filter = f.value"
              >
                {{ f.label }}
                <span class="text-xs opacity-70 tabular-nums">{{ countOf(f.value) }}</span>
              </UButton>
            </div>

            <p class="hidden items-center gap-1 text-xs text-muted lg:flex">
              <UKbd value="meta" /><UKbd value="K" />
            </p>
          </aside>

          <section class="min-h-0 overflow-y-auto p-3 sm:p-4">
            <div v-if="indexStatus === 'pending'" class="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
              <USkeleton v-for="i in 10" :key="i" class="h-24 rounded-md" />
            </div>

            <div v-else-if="results.length" class="grid auto-rows-[8.5rem] grid-flow-dense grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
              <ULink
                v-for="(item, index) in results"
                :key="`${item.type}-${item.to}`"
                :to="item.to"
                raw
                class="group relative flex flex-col transition duration-200 ease-out"
                :class="[spanFor(index), item.image ? 'gap-1.5 text-highlighted' : `justify-end overflow-hidden rounded-md border border-default p-2.5 hover:-translate-y-0.5 ${toneFor(item.type, index)}`]"
                @click="searchOpen = false"
              >
                <div v-if="item.image" class="relative min-h-0 flex-1 overflow-hidden rounded-md border border-default bg-muted">
                  <NuxtImg
                    :src="item.image"
                    :alt="item.title"
                    width="480"
                    height="320"
                    format="avif"
                    loading="lazy"
                    class="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <UIcon v-else-if="item.icon" :name="item.icon" class="absolute top-2 right-2 size-6 opacity-30" :class="index % 10 === 0 ? 'sm:size-14' : ''" />

                <div class="relative" :class="item.image ? 'shrink-0' : ''">
                  <UBadge
                    size="sm"
                    color="neutral"
                    variant="solid"
                    class="mb-1 bg-lemon px-1.5 py-0 text-[10px] text-ink"
                    :label="typeLabel[item.type]"
                  />
                  <p class="line-clamp-1 font-heading text-sm leading-tight sm:text-base" :class="item.image ? '' : 'line-clamp-2'">{{ item.title }}</p>
                  <p v-if="item.description && index % 10 === 0" class="mt-0.5 line-clamp-2 hidden text-xs opacity-80 sm:block">{{ item.description }}</p>
                </div>
              </ULink>
            </div>

            <p v-else class="py-12 text-center text-muted">{{ t('Nothing matches that yet') }}</p>
          </section>
        </div>
      </template>
    </UModal>
  </header>
</template>
