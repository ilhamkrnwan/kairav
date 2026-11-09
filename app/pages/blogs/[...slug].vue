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

// Prev / next navigation cards share a single template
const navCards = computed(() => [
  { dir: 'prev', blog: prevBlog.value, badge: t('Previous Article'), label: t('Previous Article'), icon: 'lucide:arrow-left' },
  { dir: 'next', blog: nextBlog.value, badge: t('Next Article'), label: t('Next Article'), icon: 'lucide:arrow-right' }
].filter(card => card.blog))

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
  { label: current.value?.title || t('Article Details') }
])

const heroMeta = computed(() => [
  { icon: 'lucide:user', label: current.value?.author, iconClass: 'text-primary' },
  { icon: 'lucide:calendar', label: formatDate(current.value?.date), iconClass: 'text-primary' },
  { icon: 'lucide:clock', label: current.value?.readTime, iconClass: 'text-primary', highlight: true },
  { icon: 'lucide:sparkles', label: 'Tech Insights', iconClass: 'text-primary' }
].filter(item => item.label))

const cardUi = { root: 'rounded-lg bg-elevated ring-default/40 shadow-xl shadow-black/5', body: 'p-5' }
</script>

<template>
  <main class="min-h-screen">
    <UiSkeletonDetail v-if="status === 'pending'" type="blog" />
    <template v-else-if="current">
      <!-- Hero -->
      <section class="relative pt-32 sm:pt-36 md:pt-24 lg:pt-28 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-6 md:px-12 lg:px-20 border-b border-default/40 overflow-hidden bg-radial from-primary/[0.04] via-transparent to-transparent">

        <div class="container mx-auto max-w-7xl relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div class="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <div class="flex flex-wrap items-center gap-3">
                <UBreadcrumb :items="breadcrumbItems" :ui="{ link: 'text-xs' }" />
                <UBadge color="primary" variant="subtle" size="md" class="font-semibold text-xs">
                  <template #leading>
                    <span class="size-1.5 rounded-full bg-primary animate-pulse" />
                  </template>
                  {{ current.category || 'Tech Article' }}
                </UBadge>
              </div>

              <div class="space-y-4">
<h1 :key="$i18n.locale" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight leading-[1.08] text-highlighted">
                  {{ current.title }}<span class="text-primary">.</span>
                </h1>
              </div>

              <p class="text-base sm:text-lg md:text-xl text-muted font-normal leading-relaxed max-w-2xl">
                {{ current.description }}
              </p>

              <!-- Meta: author, date, read time -->
              <div class="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
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

            <!-- 3D avatar with floating accents -->
            <div class="lg:col-span-5 flex items-center justify-center relative mt-8 lg:mt-0">
              <div class="relative w-full max-w-md flex items-center justify-center group">

                <NuxtImg
                  src="/developer-blog-avatar.avif"
                  :alt="`${current.title} - Ilham Kurniawan`"
                  width="440"
                  height="420"
                  format="webp"
                  loading="eager"
                  class="relative z-10 w-64 sm:w-76 md:w-88 lg:w-96 max-h-96 sm:max-h-[420px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] avatar-floating transition-transform duration-500 group-hover:scale-105"
                />

              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Cover image -->
      <section
        v-if="current.coverImage"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 100 } }"
        class="pt-8 pb-4 md:pt-12 md:pb-6"
      >
        <div class="container mx-auto px-4 max-w-5xl">
          <div class="relative aspect-video rounded-lg overflow-hidden border border-default shadow-lg shadow-black/5">
            <NuxtImg
              :src="current.coverImage"
              :alt="current.title"
              width="1280"
              height="720"
              format="avif"
              loading="eager"
              class="size-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- Content -->
      <section id="blog-content" class="py-8 md:py-12 scroll-mt-20 overflow-x-hidden">
        <div class="container mx-auto px-4">
          <div class="mx-auto max-w-7xl content-container">
            <div class="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div
                v-motion
                :initial="{ opacity: 0, y: 30 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 200 } }"
                class="lg:col-span-8"
              >
                <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-headings: prose-headings: prose-p:text-highlighted/80">
                  <ContentRenderer :value="current" />
                </div>

                <div v-if="current.tags?.length" class="mt-12">
                  <USeparator class="mb-8" />
                  <h3 class="text-xs text-muted mb-4 font-medium">{{ t('Tags:') }}</h3>
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
              </div>

              <aside class="lg:col-span-4">
                <div class="sticky top-28">
                  <div
                    v-motion
                    :initial="{ opacity: 0, y: 30 }"
                    :enter="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 300 } }"
                    class="space-y-4"
                  >
                    <!-- Author & share -->
                    <div>
                      <UCard :ui="cardUi">
                        <h3 class="text-xs text-muted mb-4 font-medium">{{ t('Written by') }}</h3>
                        <div class="flex items-center gap-3 mb-6">
                          <UAvatar icon="lucide:user" size="lg" :ui="{ root: 'bg-primary/10 ring ring-primary/20', icon: 'text-primary' }" />
                          <div class="text-left">
                            <p class="text-sm font-semibold text-highlighted">{{ t('Ilham Kurniawan') }}</p>
                            <p class="text-xs text-muted font-medium">{{ t('Software Developer') }}</p>
                          </div>
                        </div>
                        <AppSocialShare :title="current.title" :label="t('Share Article')" />
                      </UCard>
                    </div>

                    <!-- Related articles -->
                    <div v-if="relatedBlogs.length">
                      <UCard :ui="{ ...cardUi, body: 'p-6' }">
                        <h3 class="text-xs text-muted mb-4 text-left font-medium">{{ t('Related Articles') }}</h3>
                        <div class="space-y-4">
                          <template v-for="blog in relatedBlogs" :key="blog.path">
                            <ULink :to="getBlogLink(blog)" raw class="group/related block text-left">
                              <span class="inline-flex items-center text-xs text-primary/80 mb-1 group-hover/related:text-primary font-medium">
                                {{ blog.category || 'Tech' }}
                              </span>
                              <h4 class="text-xs font-semibold leading-snug line-clamp-2 text-highlighted group-hover/related:text-primary transition-colors">
                                {{ blog.title }}
                              </h4>
                              <p class="text-xs text-muted mt-1 font-medium">
                                {{ formatDate(blog.date) }}
                              </p>
                            </ULink>
                          </template>
                        </div>
                      </UCard>
                    </div>

                    <UiArrowButton to="/blogs" variant="secondary" icon="lucide:arrow-left" class="w-full">
                      {{ t('Back to Articles') }}
                    </UiArrowButton>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <!-- Previous / next -->
      <section
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 500 } }"
        class="py-12 px-4 border-t border-default/40 overflow-x-hidden"
      >
        <div class="container mx-auto max-w-7xl navigation-container">
          <h2 :key="$i18n.locale" class="leading-[0.88] tracking-tight mb-12 text-center">
            <span class="section-title-filled block">{{ t('Next') }}</span>
            <span class="section-title-outline block">{{ t('To Read') }}<span class="text-primary">.</span></span>
          </h2>
          <div class="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div v-for="card in navCards" :key="card.dir">
              <ULink
                v-if="card.blog"
                :to="getBlogLink(card.blog)"
                raw
                class="group flex h-full flex-col gap-3"
              >
                <div class="relative aspect-video overflow-hidden rounded-lg border border-default bg-muted transition-colors duration-300 group-hover:border-primary/50">
                  <NuxtImg
                    :src="card.blog.coverImage || '/placeholder.avif'"
                    :alt="card.blog.title"
                    width="600"
                    height="337"
                    format="avif"
                    loading="lazy"
                    class="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                <div class="flex flex-1 flex-col">
                  <div
                    class="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted"
                    :class="card.dir === 'next' && 'flex-row-reverse justify-end'"
                  >
                    <UIcon :name="card.icon" class="size-3.5" />
                    <span class="truncate">{{ card.label }}</span>
                  </div>
                  <h3 class="line-clamp-2 font-heading text-sm leading-snug text-highlighted transition-colors duration-300 group-hover:text-primary sm:text-lg">
                    {{ card.blog.title }}
                  </h3>
                  <p class="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-muted sm:text-sm">
                    {{ card.blog.description }}
                  </p>
                  <UBadge :label="card.blog.category" color="neutral" variant="outline" size="xs" class="mt-3 w-fit font-medium" />
                </div>
              </ULink>
            </div>
          </div>
        </div>
      </section>
    </template>
  </main>
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
