<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  url?: string
  label?: string
}

const props = defineProps<Props>()
const { t } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()

const siteUrl = config.public.siteUrl || 'https://ilhamkrnwan.my.id'

const fullUrl = computed(() => {
  if (props.url) return props.url
  if (import.meta.client && typeof window !== 'undefined') {
    return window.location.href
  }
  return `${siteUrl}${route.path}`
})

const shareTitle = computed(() => props.title || 'Ilham Kurniawan | Kairav')
const encodedUrl = computed(() => encodeURIComponent(fullUrl.value))
const encodedTitle = computed(() => encodeURIComponent(shareTitle.value))

const copySuccess = ref(false)

const copyUrl = async () => {
  try {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText(fullUrl.value)
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    }
  } catch (e) {
    console.error('Failed to copy URL:', e)
  }
}
</script>

<template>
  <div class="w-full">
    <p v-if="label !== ''" class="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mb-3 text-left">
      {{ label || t('Share') }}
    </p>

    <div class="grid grid-cols-4 gap-2">
      <!-- X / Twitter -->
      <NuxtLink
        :to="`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center p-2.5 rounded-sm border border-border/40 bg-background/50 hover:border-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 transition-all"
        aria-label="Share on X"
      >
        <Icon name="simple-icons:x" class="w-4 h-4" />
      </NuxtLink>

      <!-- LinkedIn -->
      <NuxtLink
        :to="`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center p-2.5 rounded-sm border border-border/40 bg-background/50 hover:border-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 transition-all"
        aria-label="Share on LinkedIn"
      >
        <Icon name="simple-icons:linkedin" class="w-4 h-4" />
      </NuxtLink>

      <!-- WhatsApp -->
      <NuxtLink
        :to="`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center justify-center p-2.5 rounded-sm border border-border/40 bg-background/50 hover:border-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 transition-all"
        aria-label="Share on WhatsApp"
      >
        <Icon name="simple-icons:whatsapp" class="w-4 h-4" />
      </NuxtLink>

      <!-- Copy Link Button -->
      <button
        type="button"
        class="flex items-center justify-center p-2.5 rounded-sm border border-border/40 bg-background/50 hover:border-amber-400/50 hover:text-amber-400 hover:bg-amber-400/5 transition-all relative cursor-pointer"
        aria-label="Copy Link"
        @click="copyUrl"
      >
        <Icon :name="copySuccess ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4 text-amber-400" />
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform opacity-0 scale-95 -translate-y-1"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform opacity-100 scale-100 translate-y-0"
          leave-to-class="transform opacity-0 scale-95 -translate-y-1"
        >
          <span
            v-if="copySuccess"
            class="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[9px] font-mono tracking-wider px-2 py-0.5 rounded-sm whitespace-nowrap uppercase font-bold shadow-lg shadow-amber-400/20 z-30"
          >
            {{ t('Link Copied!') }}
          </span>
        </Transition>
      </button>
    </div>
  </div>
</template>
