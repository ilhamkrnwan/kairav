<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

definePageMeta({
  key: route => route.fullPath,
  scrollToTop: true,
})

const { t, locale } = useI18n()
const route = useRoute()
const requestUrl = useRequestURL()
const { copy, copied } = useClipboard({ copiedDuring: 2000 })

const slug = computed(() => {
  const params = route.params.slug
  return Array.isArray(params) ? params.join('/') : params || ''
})

const blogPath = (item?: { path?: string, _path?: string } | null) => item?.path || item?._path || ''
const getBlogLink = (item: { path?: string, _path?: string }) => blogPath(item).replace(/^\/blog\/[^/]+/, '/blogs') || '#'

const { data: current, error, status } = await useAsyncData(
  `blog-${locale.value}-${slug.value}`,
  () => queryCollection('blog').path(`/blog/${locale.value}/${slug.value}`).first(),
  { watch: [locale, slug] }
)

const { data: blogs } = await useAsyncData(
  `blog-all-${locale.value}`,
  () =>
    queryCollection('blog')
      .where('stem', 'LIKE', `blog/${locale.value}/%`)
      .order('date', 'DESC')
      .all(),
  { watch: [locale] }
)

if (status.value !== 'pending' && (error.value || !current.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: t('Article not found'),
    fatal: true
  })
}

const currentIndex = computed(() => {
  if (!blogs.value || !current.value) return -1
  return blogs.value.findIndex(p => blogPath(p) === blogPath(current.value))
})

const prevBlog = computed(() => (currentIndex.value > 0 ? blogs.value?.[currentIndex.value - 1] : undefined))
const nextBlog = computed(() => (currentIndex.value >= 0 ? blogs.value?.[currentIndex.value + 1] : undefined))

const navCards = computed(() => [
  { dir: 'prev', blog: prevBlog.value },
  { dir: 'next', blog: nextBlog.value }
].flatMap(({ dir, blog }) => blog ? [{ dir, blog }] : []))

const relatedBlogs = computed(() => {
  if (!blogs.value || !current.value) return []
  const others = blogs.value.filter(blog => blogPath(blog) !== blogPath(current.value))
  const sameCategory = others.filter(blog => blog.category === current.value?.category)
  const rest = others.filter(blog => !sameCategory.includes(blog))
  return [...sameCategory, ...rest].slice(0, 3)
})

useDynamicSeo({
  title: current.value?.title,
  description: current.value?.description || t('View article details'),
  image: current.value?.coverImage,
  type: 'article',
  publishedTime: current.value?.date,
  tags: current.value?.tags
})

// JSON-LD Structured Data for blog article
useBlogPostingSchema({
  title: current.value?.title,
  description: current.value?.description,
  coverImage: current.value?.coverImage,
  datePublished: current.value?.date,
  author: current.value?.author,
  category: current.value?.category,
  tags: current.value?.tags,
  url: `https://ilhamkrnwan.my.id${route.path}`,
})

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale.value, { year: 'numeric', month: 'long', day: 'numeric' })
}

const breadcrumbItems = computed(() => [
  { label: t('Home'), icon: 'lucide:home', to: '/' },
  { label: t('Articles'), to: '/blogs' },
  { label: t('Article Details') }
])

const heroMeta = computed(() => [
  { icon: 'lucide:user', label: current.value?.author, iconClass: 'text-primary' },
  { icon: 'lucide:calendar', label: formatDate(current.value?.date), iconClass: 'text-primary' },
  { icon: 'lucide:clock', label: current.value?.readTime, iconClass: 'text-primary', highlight: true }
].filter(item => item.label))

const cardUi = { root: 'rounded-lg bg-elevated ring-default/40 shadow-xl shadow-black/5', body: 'p-5' }
</script>

<template>
  <div class="min-h-screen">
    <UiSkeletonDetail v-if="status === 'pending'" type="blog" />
    <template v-else-if="current">
      <!-- Hero -->
      <UiDetailHero :image="current.coverImage">
        <div class="detail-masthead-copy min-w-0">
          <div class="flex flex-wrap items-center gap-3">
            <UBreadcrumb :items="breadcrumbItems" :ui="{ link: 'text-xs' }" />
            <UBadge v-if="current.category" color="primary" variant="subtle" size="md" class="font-semibold text-xs">
              {{ current.category }}
            </UBadge>
          </div>

          <h1 class="detail-title">{{ current.title }}</h1>

          <p v-if="current.description" class="detail-deck">{{ current.description }}</p>

          <!-- Meta: author, date, read time -->
          <div v-if="heroMeta.length" class="flex flex-wrap items-center gap-2 pt-1 sm:gap-3">
            <UBadge
              v-for="item in heroMeta"
              :key="item.icon"
              :icon="item.icon"
              :label="item.label"
              color="neutral"
              variant="outline"
              size="md"
              :ui="{ leadingIcon: item.iconClass }"
              class="text-xs bg-elevated font-medium"
              :class="item.highlight && 'ring-primary/30 text-primary font-semibold'"
            />
          </div>

          <div class="flex flex-wrap items-center gap-3 pt-2">
            <UiArrowButton to="#blog-content" variant="primary" icon="lucide:arrow-down">
              {{ t('Baca Artikel') }}
            </UiArrowButton>

            <UiArrowButton
              variant="secondary"
              :icon="copied ? 'lucide:check' : 'lucide:copy'"
              @click="copy(requestUrl.href)"
            >
              {{ copied ? t('Tersalin!') : t('Salin Tautan') }}
            </UiArrowButton>
          </div>
        </div>
        <template #fallback>
          <div class="detail-mascot">
            <LazyUiMascot name="kairav" size="180" label="Kairav" hydrate-on-visible />
          </div>
        </template>
      </UiDetailHero>

      <!-- Content -->
      <section id="blog-content" class="site-frame detail-reading-layout">
        <article class="min-w-0">
          <UiReadingContent :document="current" />

          <div v-if="current.tags?.length" class="mt-12">
            <USeparator class="mb-8" />
            <h2 class="text-xs text-muted mb-4 font-medium">{{ t('Tags:') }}</h2>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="tag in current.tags"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="outline"
                class="px-3 py-1.5 text-xs bg-elevated hover:ring-primary/50 transition-colors font-medium"
              />
            </div>
          </div>
        </article>

        <aside class="detail-reading-aside min-w-0 space-y-4">
          <!-- Author & share -->
          <div>
            <UCard :ui="cardUi">
              <div v-if="current.author" class="mb-5">
                <h2 class="text-sm font-semibold text-highlighted">{{ t('Written by') }}</h2>
                <p class="mt-1 text-sm text-muted">{{ current.author }}</p>
              </div>
              <AppSocialShare :title="current.title" :label="t('Share Article')" />
            </UCard>
          </div>

          <!-- Related articles -->
          <div v-if="relatedBlogs.length">
            <UCard :ui="{ ...cardUi, body: 'p-6' }">
              <h2 class="mb-4 text-sm font-semibold text-highlighted">{{ t('Related Articles') }}</h2>
              <div class="space-y-4">
                <template v-for="blog in relatedBlogs" :key="blog.path">
                  <ULink :to="getBlogLink(blog)" raw class="group/related block text-left">
                    <h3 class="text-sm font-semibold leading-snug text-highlighted group-hover/related:text-primary transition-colors">
                      {{ blog.title }}
                    </h3>
                    <p v-if="blog.description" class="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                      {{ blog.description }}
                    </p>
                  </ULink>
                </template>
              </div>
            </UCard>
          </div>

          <UiArrowButton to="/blogs" variant="secondary" icon="lucide:arrow-left" class="w-full">
            {{ t('Back to Articles') }}
          </UiArrowButton>
        </aside>
      </section>

      <!-- Previous / next -->
      <section

        class="py-12 px-4 border-t border-default/40 overflow-x-hidden"
      >
        <div class="container mx-auto max-w-7xl navigation-container">
          <h2 class="detail-related-heading">{{ t('More Articles') }}</h2>
          <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <UiContentCard
              v-for="card in navCards"
              :key="card.dir"
              :to="getBlogLink(card.blog)"
              :title="card.blog.title"
              :description="card.blog.description"
              :image="card.blog.coverImage"
            />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
@keyframes avatarFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.avatar-floating {
  animation: avatarFloat 5s ease-in-out infinite;
}


</style>
