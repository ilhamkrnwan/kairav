<script setup lang="ts">
interface Props {
  to?: string
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'glass'
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  icon: 'lucide:arrow-right'
})
</script>

<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    :class="[
      'group inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer select-none text-decoration-none',
      props.variant === 'primary'
        ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-[0_4px_20px_rgba(251,191,36,0.35)] hover:shadow-[0_6px_28px_rgba(251,191,36,0.5)]'
        : props.variant === 'glass'
        ? 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 backdrop-blur-md'
        : 'bg-background/80 hover:bg-background text-foreground border border-border/60 hover:border-amber-400/50 backdrop-blur-sm shadow-sm'
    ]"
  >
    <span class="flex items-center gap-2.5 tracking-normal font-semibold">
      <slot name="leading" />
      <slot />
    </span>
    <span
      :class="[
        'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5',
        props.variant === 'primary'
          ? 'bg-neutral-950 text-white shadow-sm'
          : props.variant === 'glass'
          ? 'bg-white/15 text-white'
          : 'bg-neutral-900 dark:bg-neutral-800 text-white'
      ]"
    >
      <slot name="icon">
        <Icon :name="props.icon" class="w-4 h-4 text-white" />
      </slot>
    </span>
  </NuxtLink>

  <a
    v-else-if="props.href"
    :href="props.href"
    :target="props.target"
    :rel="props.rel"
    :class="[
      'group inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer select-none text-decoration-none',
      props.variant === 'primary'
        ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-[0_4px_20px_rgba(251,191,36,0.35)] hover:shadow-[0_6px_28px_rgba(251,191,36,0.5)]'
        : props.variant === 'glass'
        ? 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 backdrop-blur-md'
        : 'bg-background/80 hover:bg-background text-foreground border border-border/60 hover:border-amber-400/50 backdrop-blur-sm shadow-sm'
    ]"
  >
    <span class="flex items-center gap-2.5 tracking-normal font-semibold">
      <slot name="leading" />
      <slot />
    </span>
    <span
      :class="[
        'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5',
        props.variant === 'primary'
          ? 'bg-neutral-950 text-white shadow-sm'
          : props.variant === 'glass'
          ? 'bg-white/15 text-white'
          : 'bg-neutral-900 dark:bg-neutral-800 text-white'
      ]"
    >
      <slot name="icon">
        <Icon :name="props.icon" class="w-4 h-4 text-white" />
      </slot>
    </span>
  </a>

  <button
    v-else
    :type="props.type || 'button'"
    :class="[
      'group inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer select-none',
      props.variant === 'primary'
        ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 shadow-[0_4px_20px_rgba(251,191,36,0.35)] hover:shadow-[0_6px_28px_rgba(251,191,36,0.5)]'
        : props.variant === 'glass'
        ? 'bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 backdrop-blur-md'
        : 'bg-background/80 hover:bg-background text-foreground border border-border/60 hover:border-amber-400/50 backdrop-blur-sm shadow-sm'
    ]"
  >
    <span class="flex items-center gap-2.5 tracking-normal font-semibold">
      <slot name="leading" />
      <slot />
    </span>
    <span
      :class="[
        'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5',
        props.variant === 'primary'
          ? 'bg-neutral-950 text-white shadow-sm'
          : props.variant === 'glass'
          ? 'bg-white/15 text-white'
          : 'bg-neutral-900 dark:bg-neutral-800 text-white'
      ]"
    >
      <slot name="icon">
        <Icon :name="props.icon" class="w-4 h-4 text-white" />
      </slot>
    </span>
  </button>
</template>
