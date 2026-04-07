<script setup lang="ts">
interface Props {
  colors?: string[]
  animationSpeed?: number
  showBorder?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => ['#27FF64', '#27FF64', '#A0FFBC'],
  animationSpeed: 3,
  showBorder: false,
  className: ''
})

const gradientStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right, ${props.colors.join(', ')})`,
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: props.animationSpeed > 0 ? `gradient-shift ${props.animationSpeed}s ease infinite` : 'none'
}))
</script>

<template>
  <span
    :class="[
      'inline-block',
      props.showBorder ? 'border border-current rounded-md px-2 py-1' : '',
      props.className
    ]"
    :style="gradientStyle"
  >
    <slot />
  </span>
</template>

<style scoped>
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
