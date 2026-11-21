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
  primary: 'border-highlighted bg-inverted text-inverted hover:border-primary hover:bg-primary hover:text-inverted',
  ink: 'border-transparent bg-neutral-950 text-white hover:bg-neutral-800 hover:text-white',
  secondary: 'border-accented bg-transparent text-highlighted hover:border-primary hover:bg-muted hover:text-highlighted'
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
    :ui="{ base: ['group min-h-11 justify-between gap-4 rounded-none border px-3.5 py-2.5 text-sm font-semibold transition-colors', styles[variant]] }"
  >
    <span class="flex items-center gap-2.5">
      <slot name="leading" />
      <slot />
    </span>
    <span class="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
      <slot name="icon">
        <UIcon :name="icon" class="size-4" />
      </slot>
    </span>
  </UButton>
</template>
