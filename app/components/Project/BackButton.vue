<script setup>
const { t } = useI18n()
</script>

<template>
  <div class="text-center pb-20">
    <NuxtLink to="/portofolio">
      <UiButtonBorder>
        {{ t('Back to Home') }}
      </UiButtonBorder>
    </NuxtLink>
  </div>
</template>
