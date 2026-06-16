<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  label?: string
  siteName?: string
  siteUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ilham Kurniawan',
  description: 'Digital solution for websites, dashboards, custom systems, and integrations.',
  label: 'Digital Solution',
  siteName: 'KAIRAV',
  siteUrl: 'ilhamkrnwan.my.id',
})

const truncate = (value: string | undefined, max: number) => {
  const text = (value || '').trim()
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trim()}...`
}

const displayTitle = truncate(props.title, 68)
const displayDescription = truncate(props.description, 118)
</script>

<template>
  <div style="position: relative; display: flex; width: 1200px; height: 630px; overflow: hidden; background: #05080d; color: #f8fafc; font-family: Inter, Arial, sans-serif;">
    <img
      src="/og/og-bg-kairav.png"
      alt=""
      style="position: absolute; inset: 0; width: 1200px; height: 630px; object-fit: cover;"
    >

    <div style="position: absolute; inset: 0; width: 1200px; height: 630px; background: linear-gradient(90deg, rgba(3, 7, 18, 0.9) 0%, rgba(3, 7, 18, 0.72) 45%, rgba(3, 7, 18, 0.34) 78%, rgba(3, 7, 18, 0.2) 100%);" />
    <div style="position: absolute; inset: 0; width: 1200px; height: 630px; background: linear-gradient(180deg, rgba(3, 7, 18, 0.18) 0%, rgba(3, 7, 18, 0) 45%, rgba(3, 7, 18, 0.44) 100%);" />

    <div style="position: relative; display: flex; width: 100%; height: 100%;">
      <div style="position: absolute; left: 72px; top: 58px; display: flex; align-items: center; gap: 14px; height: 48px;">
          <div style="display: flex; width: 46px; height: 46px; align-items: center; justify-content: center; border: 1px solid rgba(251, 146, 60, 0.44); background: rgba(251, 146, 60, 0.1); color: #fb923c; font-size: 28px; font-weight: 900; line-height: 1;">
            K
          </div>
          <div style="display: flex; color: rgba(248, 250, 252, 0.86); font-size: 19px; font-weight: 800; letter-spacing: 0.18em;">
            {{ siteName }}
          </div>
      </div>

      <div style="position: absolute; left: 72px; top: 142px; display: flex; flex-direction: column; width: 760px;">
        <div style="display: flex; align-items: center; gap: 11px; width: 360px; margin-bottom: 30px; border: 1px solid rgba(251, 146, 60, 0.34); background: rgba(8, 13, 22, 0.58); padding: 12px 16px; color: #fdba74; font-size: 19px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase;">
          <div style="display: flex; width: 8px; height: 8px; background: #fb923c;" />
          <div style="display: flex;">
            {{ label }}
          </div>
        </div>

        <div style="display: flex; width: 760px; color: #ffffff; font-size: 68px; font-weight: 900; line-height: 1; letter-spacing: 0; overflow-wrap: break-word;">
          {{ displayTitle }}
        </div>

        <div style="display: flex; width: 690px; margin-top: 26px; color: rgba(226, 232, 240, 0.82); font-size: 24px; font-weight: 500; line-height: 1.28; overflow-wrap: break-word;">
          {{ displayDescription }}
        </div>
      </div>

      <div style="position: absolute; left: 72px; bottom: 46px; display: flex; align-items: center; gap: 26px; color: rgba(203, 213, 225, 0.68); font-size: 19px; font-weight: 700; letter-spacing: 0.06em;">
        <div style="display: flex;">
          {{ siteUrl }}
        </div>
        <div style="display: flex; width: 220px; height: 2px; background: linear-gradient(90deg, rgba(251, 146, 60, 0.85), rgba(56, 189, 248, 0.36), rgba(56, 189, 248, 0));" />
      </div>
    </div>
  </div>
</template>
