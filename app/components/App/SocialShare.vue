<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  title?: string
  description?: string
  url?: string
  label?: string
}>()

const { t } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const { copy, copied } = useClipboard({ copiedDuring: 2000 })

const siteUrl = config.public.siteUrl || 'https://ilhamkrnwan.my.id'
const fullUrl = computed(() => props.url || `${siteUrl}${route.path}`)
const encodedUrl = computed(() => encodeURIComponent(fullUrl.value))
const encodedTitle = computed(() => encodeURIComponent(props.title || 'Ilham Kurniawan | Kairav'))

const shareLinks = computed(() => [
  { label: 'Share on X', icon: 'simple-icons:x', to: `https://twitter.com/intent/tweet?url=${encodedUrl.value}&text=${encodedTitle.value}` },
  { label: 'Share on LinkedIn', icon: 'simple-icons:linkedin', to: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl.value}` },
  { label: 'Share on WhatsApp', icon: 'simple-icons:whatsapp', to: `https://api.whatsapp.com/send?text=${encodedTitle.value}%20${encodedUrl.value}` }
])

const buttonClass = 'justify-center p-2.5 rounded-lg bg-elevated hover:bg-primary/5 hover:text-primary hover:ring-primary/50'
</script>

<template>
  <div class="w-full">
    <p v-if="label !== ''" class="text-xs text-muted mb-3 text-left font-medium">
      {{ label || t('Share') }}
    </p>

    <div class="grid grid-cols-4 gap-2">
      <UButton
        v-for="link in shareLinks"
        :key="link.label"
        :to="link.to"
        target="_blank"
        rel="noopener noreferrer"
        :icon="link.icon"
        :aria-label="link.label"
        color="neutral"
        variant="outline"
        :class="buttonClass"
      />

      <UTooltip :open="copied" :text="t('Link Copied!')" :content="{ side: 'top' }">
        <UButton
          :icon="copied ? 'lucide:check' : 'lucide:copy'"
          aria-label="Copy Link"
          color="neutral"
          variant="outline"
          :class="[buttonClass, 'w-full text-primary']"
          @click="copy(fullUrl)"
        />
      </UTooltip>
    </div>
  </div>
</template>
