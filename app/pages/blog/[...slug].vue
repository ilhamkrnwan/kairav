<script setup lang="ts">
const route = useRoute()

const slug = computed(() => {
  const params = route.params.slug
  if (Array.isArray(params)) {
    return params.join('/')
  }
  return params || ''
})

await navigateTo(slug.value ? `/blogs/${slug.value}` : '/blogs', {
  redirectCode: 301,
  replace: true,
})
</script>

<template>
  <div />
</template>
