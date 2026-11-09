<script setup lang="ts">
withDefaults(defineProps<{
  to?: string
  href?: string
  target?: '_blank' | '_self'
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ink'
  icon?: string
}>(), {
  variant: 'primary',
  icon: 'lucide:arrow-right'
})

const styles = {
  primary: {
    base: 'bg-lemon text-ink border border-ink hover:bg-lemon-300 hover:text-ink dark:hover:text-ink',
    pill: 'bg-ink text-lemon'
  },
  ink: {
    base: 'bg-ink text-white border border-ink hover:bg-cobalt-700 hover:border-cobalt-700 hover:text-white dark:hover:text-white',
    pill: 'bg-lemon text-ink'
  },
  secondary: {
    base: 'bg-elevated text-highlighted border border-default hover:bg-muted hover:text-highlighted dark:hover:text-highlighted',
    pill: 'bg-primary text-inverted'
  }
}
</script>

<template>
  <UButton
    :to="to ?? href"
    :target="target"
    :rel="rel"
    :type="type"
    color="neutral"
    variant="link"
    :ui="{ base: ['group justify-between gap-4 pl-6 pr-2 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]', styles[variant].base] }"
  >
    <span class="flex items-center gap-2.5">
      <slot name="leading" />
      <slot />
    </span>
    <span
      class="size-9 sm:size-10 rounded-md flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
      :class="styles[variant].pill"
    >
      <slot name="icon">
        <UIcon :name="icon" class="size-4" />
      </slot>
    </span>
  </UButton>
</template>
