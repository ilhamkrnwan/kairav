<script setup lang="ts">
type SearchType = 'page' | 'service' | 'project' | 'article'
type SearchFilter = 'all' | SearchType
type Panel = 'menu' | 'search'

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
const isDark = computed(() => colorMode.value === 'dark')
const open = ref(false)
const panel = ref<Panel>('menu')
const panelDirection = ref(0)
const query = ref('')
const filter = ref<SearchFilter>('all')
const searchTrigger = useTemplateRef<HTMLButtonElement>('searchTrigger')
const menuTrigger = useTemplateRef<HTMLButtonElement>('menuTrigger')
const panelView = useTemplateRef<HTMLElement>('panelView')
const searchInput = useTemplateRef<{ inputRef?: HTMLInputElement }>('searchInput')
const menuSearchTrigger = useTemplateRef<HTMLButtonElement>('menuSearchTrigger')
let returnFocus: HTMLElement | null = null

useEditorialMotion(panelView, ({ root, gsap }) => {
  if (!open.value) return

  const direction = panelDirection.value
  gsap.fromTo(root, {
    x: direction * 20,
    y: direction ? 0 : 9,
    opacity: 0.6,
  }, {
    x: 0,
    y: 0,
    opacity: 1,
    duration: direction ? 0.29 : 0.38,
    ease: 'power4.out',
    clearProps: 'transform,opacity',
  })
})

const pages = computed<SearchItem[]>(() => [
  { type: 'page', title: t('Home'), to: '/', icon: 'lucide:house' },
  { type: 'page', title: t('Services'), to: '/services', icon: 'lucide:layers-3' },
  { type: 'page', title: t('Portofolio'), to: '/portofolio', icon: 'lucide:folder-open' },
  { type: 'page', title: t('Blogs'), to: '/blogs', icon: 'lucide:pen-line' },
  { type: 'page', title: t('Gallery'), to: '/gallery', icon: 'lucide:images' },
  { type: 'page', title: t('About'), to: '/about', icon: 'lucide:user-round' },
  { type: 'page', title: t('Contact'), to: '/contact', icon: 'lucide:message-circle' },
  { type: 'page', title: 'CV', to: '/cv', icon: 'lucide:file-user' }
])
const primaryRoutes = ['/portofolio', '/services', '/blogs', '/about', '/contact']
const primaryLinks = computed(() => primaryRoutes.flatMap((path) => {
  const page = pages.value.find(item => item.to === path)
  return page ? [page] : []
}))

const current = (to: string) => {
  const path = route.path.replace(/\/$/, '') || '/'
  if (path === to) return 'page'
  if (to !== '/' && path.startsWith(`${to}/`)) return 'location'
}

function focusPanel(event?: Event) {
  if (!open.value) return
  const target = panel.value === 'search' ? searchInput.value?.inputRef : menuSearchTrigger.value
  if (target) {
    event?.preventDefault()
    target.focus({ preventScroll: true })
  }
}

watch([open, panel, searchInput, menuSearchTrigger], () => focusPanel(), { flush: 'post' })

function showPanel(next: Panel, event?: MouseEvent) {
  if (!open.value) {
    const trigger = event?.currentTarget ?? document.activeElement
    if (trigger instanceof HTMLElement && trigger !== document.body && !trigger.closest('.navigation-panel')) {
      returnFocus = trigger
    }
    returnFocus ??= next === 'search' ? searchTrigger.value : menuTrigger.value
  }

  panelDirection.value = open.value && panel.value !== next ? (next === 'search' ? 1 : -1) : 0
  panel.value = next
  open.value = true
}

function restoreFocus(event: Event) {
  if (open.value) {
    event.preventDefault()
    focusPanel()
    return
  }
  if (returnFocus?.isConnected) {
    event.preventDefault()
    returnFocus.focus({ preventScroll: true })
  }
  returnFocus = null
}

function closePanel(event?: MouseEvent) {
  if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return
  open.value = false
}

watch(() => route.path, () => closePanel())

function toggleSearch() {
  if (open.value && panel.value === 'search') closePanel()
  else showPanel('search')
}

defineShortcuts({
  meta_k: { usingInput: true, handler: toggleSearch },
  ctrl_k: { usingInput: true, handler: toggleSearch }
})

const whatsapp = 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20ingin%20konsultasi%20proyek.'
const socials = [
  { name: 'Instagram', icon: 'lucide:instagram', to: 'https://www.instagram.com/ilhamkrnwan__' },
  { name: 'GitHub', icon: 'simple-icons:github', to: 'https://github.com/ilhamkrnwan' },
  { name: 'LinkedIn', icon: 'simple-icons:linkedin', to: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/' },
  { name: 'WhatsApp', icon: 'simple-icons:whatsapp', to: whatsapp }
]

const toRoute = (path: string) => path
  .replace(/^\/blog\/[^/]+/, '/blogs')
  .replace(/^\/(portofolio|services)\/[^/]+/, '/$1')

const { data: index, execute: loadIndex, status: indexStatus } = useAsyncData('site-search-index', async () => {
  const language = locale.value
  const [blogs, projects, services] = await Promise.all([
    queryCollection('blog').where('stem', 'LIKE', `blog/${language}/%`).order('date', 'DESC').select('title', 'description', 'path', 'coverImage', 'category', 'tags').all(),
    queryCollection('portofolio').where('stem', 'LIKE', `portofolio/${language}/%`).select('title', 'description', 'path', 'image', 'category', 'tags').all(),
    queryCollection('services').where('stem', 'LIKE', `services/${language}/%`).order('order', 'ASC').select('title', 'description', 'path', 'image', 'coverImage', 'category', 'tags', 'icon').all()
  ])

  return {
    language,
    items: [
      ...services.map((item): SearchItem => ({ type: 'service', title: item.title ?? '', description: item.description, image: item.coverImage || item.image, to: toRoute(item.path), meta: item.category, tags: item.tags, icon: item.icon })),
      ...projects.map((item): SearchItem => ({ type: 'project', title: item.title ?? '', description: item.description, image: item.image, to: toRoute(item.path), meta: item.category, tags: item.tags })),
      ...blogs.map((item): SearchItem => ({ type: 'article', title: item.title ?? '', description: item.description, image: item.coverImage, to: toRoute(item.path), meta: item.category, tags: item.tags }))
    ]
  }
}, { immediate: false, server: false })

watch([open, panel, locale], ([isOpen, visiblePanel, language]) => {
  if (isOpen && visiblePanel === 'search' && index.value?.language !== language) loadIndex()
})

const typeLabels = computed(() => ({
  page: t('Pages'),
  service: t('Services'),
  project: t('Projects'),
  article: t('Articles')
}))

const filters = computed<{ value: SearchFilter, label: string }[]>(() => [
  { value: 'all', label: t('All') },
  ...Object.entries(typeLabels.value).map(([value, label]) => ({ value: value as SearchType, label }))
])

const results = computed(() => {
  const items = index.value?.language === locale.value ? index.value.items : []
  const term = query.value.trim().toLocaleLowerCase(locale.value)

  return [...pages.value, ...items].filter((item) => {
    if (filter.value !== 'all' && item.type !== filter.value) return false
    const keywords = [item.title, item.description, item.meta, ...(item.tags ?? [])]
    return keywords.join(' ').toLocaleLowerCase(locale.value).includes(term)
  })
})
</script>

<template>
  <header class="site-header">
    <a href="#main-content" class="site-skip">{{ t('navigation.skipToContent') }}</a>
    <div class="site-masthead">
      <ULink to="/" raw class="site-wordmark">
        <NuxtImg src="/logo/kairav.avif" width="30" height="30" alt="" class="size-[30px] dark:hidden" />
        <NuxtImg src="/logo/kairav-dark.avif" width="30" height="30" alt="" class="hidden size-[30px] dark:block" />
        <span>Kairav</span>
      </ULink>

      <nav :aria-label="t('navigation.primary')" class="site-navigation">
        <ULink
          v-for="link in primaryLinks"
          :key="link.to"
          :to="link.to"
          :aria-current="current(link.to)"
          raw
        >
          {{ link.title }}
        </ULink>
      </nav>

      <div class="site-tools">
        <button ref="searchTrigger" type="button" class="site-utility" aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K" :aria-label="t('Search')" :aria-expanded="open && panel === 'search'" @click="showPanel('search', $event)">
          <UIcon name="lucide:search" class="size-4" />
          <span class="hidden sm:inline">{{ t('Search') }}</span>
        </button>

        <button ref="menuTrigger" type="button" class="site-utility site-menu-trigger" aria-haspopup="dialog" :aria-label="t('navigation.openMenu')" :aria-expanded="open && panel === 'menu'" @click="showPanel('menu', $event)">
          <UiMascotMark idle-blink class="size-7 shrink-0" />
          <span>{{ t('navigation.menu') }}</span>
        </button>

        <UModal
        v-model:open="open"
        :title="panel === 'menu' ? t('navigation.menu') : t('Search')"
        :description="panel === 'menu' ? t('navigation.menuDescription') : t('Search everything on this site')"
        :transition="false"
        :content="{ onOpenAutoFocus: focusPanel, onCloseAutoFocus: restoreFocus }"
        :ui="{
          overlay: 'navigation-panel-overlay bg-black/60',
          content: 'navigation-panel ring-0',
          header: 'min-h-18 border-default/70 px-5 py-3 sm:px-8 sm:py-4',
          title: 'font-heading text-xl leading-tight',
          description: 'sr-only',
          body: 'min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-5 py-5 sm:px-8 sm:py-7'
        }"
      >
        <template #close>
          <button type="button" class="menu-icon ms-auto" :aria-label="t('navigation.close')">
            <UIcon name="lucide:x" class="size-5" />
          </button>
        </template>

        <template #body>
          <div v-if="panel === 'menu'" ref="panelView" class="flex flex-col">
            <button ref="menuSearchTrigger" type="button" class="menu-search" @click="showPanel('search')">
              <UIcon name="lucide:search" class="size-5 text-primary" />
              <span class="flex-1 text-left">{{ t('Search everything on this site') }}</span>
              <span class="hidden gap-1 sm:flex" aria-hidden="true"><UKbd value="meta" /><UKbd value="K" /></span>
            </button>

            <nav :aria-label="t('navigation.menu')" class="menu-pages">
              <ULink
                v-for="item in pages"
                :key="item.to"
                :to="item.to"
                :aria-current="current(item.to)"
                raw
                class="menu-page"
                @click="closePanel"
              >
                <UIcon :name="item.icon!" class="size-[1.125rem] shrink-0" />
                <span>{{ item.title }}</span>
                <UIcon name="lucide:arrow-up-right" class="ml-auto size-3.5 shrink-0" />
              </ULink>
            </nav>

            <UiArrowButton
              :href="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              icon="lucide:arrow-up-right"
            >
              <template #leading><UIcon name="simple-icons:whatsapp" class="size-4" /></template>
              {{ t('cta.button_consult') }}
            </UiArrowButton>

            <div class="menu-settings">
              <div class="flex flex-wrap items-center gap-0.5">
                <ULink
                  v-for="social in socials"
                  :key="social.name"
                  :to="social.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  raw
                  :aria-label="social.name"
                  class="menu-icon"
                >
                  <UIcon :name="social.icon" class="size-[1.125rem]" />
                </ULink>
              </div>

              <div class="flex items-center gap-1">
                <button
                  type="button"
                  class="menu-icon font-semibold"
                  :aria-label="t(locale === 'id' ? 'navigation.switchToEnglish' : 'navigation.switchToIndonesian')"
                  @click="setLocale(locale === 'id' ? 'en' : 'id')"
                >
                  {{ locale.toUpperCase() }}
                </button>
                <button type="button" class="menu-icon" :aria-label="t(isDark ? 'navigation.light' : 'navigation.dark')" @click="colorMode.preference = isDark ? 'light' : 'dark'">
                  <UIcon name="lucide:sun" class="hidden size-5 dark:block" />
                  <UIcon name="lucide:moon" class="size-5 dark:hidden" />
                </button>
              </div>
            </div>
          </div>

          <div v-else ref="panelView" class="flex flex-col">
            <div class="flex shrink-0 items-center gap-3">
              <button type="button" class="menu-icon" :aria-label="t('navigation.backToMenu')" @click="showPanel('menu')">
                <UIcon name="lucide:arrow-left" class="size-5" />
              </button>
              <UInput
                ref="searchInput"
                v-model="query"
                :aria-label="t('Search')"
                :placeholder="t('Search everything on this site')"
                size="lg"
                icon="lucide:search"
                class="min-w-0 flex-1"
                :ui="{ base: 'min-h-11', trailing: 'p-0' }"
              >
                <template v-if="query" #trailing>
                  <button type="button" class="menu-icon" :aria-label="t('Clear')" @click="query = ''; searchInput?.inputRef?.focus()">
                    <UIcon name="lucide:x" class="size-4" />
                  </button>
                </template>
              </UInput>
            </div>

            <div class="search-filters" role="group" :aria-label="t('navigation.searchFilters')">
              <button v-for="item in filters" :key="item.value" type="button" :aria-pressed="filter === item.value" @click="filter = item.value">
                {{ item.label }}
              </button>
            </div>

            <p v-if="indexStatus === 'pending'" role="status" class="px-2 py-3 text-sm text-muted">{{ t('navigation.searchLoading') }}</p>
            <div v-else-if="indexStatus === 'error'" role="status" class="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-muted px-3 text-sm text-muted">
              {{ t('navigation.searchError') }}
              <button type="button" class="min-h-11 font-semibold text-primary" @click="loadIndex()">{{ t('navigation.retry') }}</button>
            </div>

            <ul v-if="results.length" class="search-results">
              <li v-for="item in results" :key="item.type + item.to">
                <ULink :to="item.to" raw class="search-result" @click="closePanel">
                  <span class="search-thumbnail" aria-hidden="true">
                    <NuxtImg v-if="item.image" :src="item.image" alt="" width="64" height="48" format="avif" loading="lazy" class="size-full object-cover" />
                    <UIcon v-else :name="item.icon || 'lucide:file-text'" class="size-[1.125rem]" />
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block text-sm font-semibold text-highlighted">{{ item.title }}</span>
                    <span v-if="item.description" class="mt-0.5 line-clamp-2 text-xs text-muted">{{ item.description }}</span>
                  </span>
                  <UIcon name="lucide:arrow-up-right" class="size-4 shrink-0 text-muted" />
                </ULink>
              </li>
            </ul>
            <p v-else-if="indexStatus === 'success'" role="status" class="py-8 text-center text-sm text-muted">{{ t('Nothing matches that yet') }}</p>
          </div>
        </template>
        </UModal>
      </div>
    </div>
  </header>
</template>
