<script setup lang="ts">
// Satori renders inline styles only, so the iOS palette is spelled out in hex here
// (blue #007aff, label #000000, grouped background #f2f2f7).
interface Props {
  title?: string
  description?: string
  label?: string
  siteName?: string
  siteUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ilham Kurniawan',
  description: 'Digital solutions for modern web, systems and creative engineering.',
  label: '',
  siteName: 'KAIRAV',
  siteUrl: 'ilhamkrnwan.my.id',
})

const truncate = (value: string | undefined, max: number) => {
  const text = (value || '').trim()
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trim()}...`
}

const displayTitle = truncate(props.title, 55)
const displayDescription = truncate(props.description, 120)

// Last word(s) of the title carry the cobalt colour
const words = displayTitle.split(' ')
const highlightCount = words.length > 2 ? Math.min(2, Math.max(1, Math.floor(words.length / 3))) : 1
const titlePrefix = words.length > 1 ? words.slice(0, words.length - highlightCount).join(' ') : ''
const titleHighlight = words.slice(words.length > 1 ? words.length - highlightCount : 0).join(' ')
</script>

<template>
  <div style="position: relative; display: flex; width: 1200px; height: 630px; overflow: hidden; background-color: #f2f2f7; color: #000000; font-family: 'Inter', sans-serif;">
    <!-- blue blob, drawn as a plain box -->
    <div style="position: absolute; top: -140px; right: -120px; width: 560px; height: 560px; border-radius: 9999px; background-color: #007aff; display: flex;" />
    <div style="position: absolute; bottom: 70px; right: 130px; width: 120px; height: 120px; border-radius: 9999px; background-color: #ffffff; border: 2px solid #d8d8dc; display: flex;" />

    <div style="position: relative; display: flex; flex-direction: column; justify-content: center; width: 800px; padding: 72px 80px;">
      <div style="display: flex; flex-wrap: wrap; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 78px; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 28px;">
        <span v-if="titlePrefix" style="color: #000000; margin-right: 18px; display: flex;">{{ titlePrefix }}</span>
        <span style="color: #007aff; display: flex;">{{ titleHighlight }}</span>
      </div>

      <div style="font-size: 28px; font-weight: 500; color: #48484a; line-height: 1.4; max-width: 640px; display: flex;">
        {{ displayDescription }}
      </div>

      <div style="display: flex; align-items: center; margin-top: 44px;">
        <div style="display: flex; align-items: center; padding: 12px 26px; border-radius: 14px; background-color: #007aff; color: #ffffff; font-size: 26px; font-weight: 700;">
          {{ siteName }}
        </div>
        <div style="display: flex; margin-left: 22px; font-size: 24px; font-weight: 500; color: #6c6c70;">
          {{ siteUrl }}
        </div>
      </div>
    </div>
  </div>
</template>
