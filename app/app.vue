<script setup lang="ts">
const curtain = useTemplateRef<HTMLElement>('curtain')
usePageMotion(curtain)
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator :height="2" :throttle="160" color="var(--ui-primary)" />

    <NuxtLayout>
      <NuxtPage :page-key="route => route.path" :transition="false" />
    </NuxtLayout>

    <div ref="curtain" class="route-curtain" aria-hidden="true">
      <span class="route-shutter" />
      <span class="route-shutter">
        <UiMascotMark class="size-14 sm:size-18" />
      </span>
      <span class="route-shutter" />
    </div>
  </UApp>
</template>
