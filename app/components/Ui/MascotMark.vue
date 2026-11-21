<script setup lang="ts">
import { expressionFromDefinition, renderAvatarExpression, validateAvatarDefinition } from '@bible-strong/avatar-core'
import mascot from '~/assets/avatars/kairav.avatar.json'

defineProps<{ idleBlink?: boolean }>()

const definition = validateAvatarDefinition(mascot)
const face = definition.ok && definition.value.expressions.happy
  ? renderAvatarExpression(definition.value, expressionFromDefinition('happy', definition.value.expressions.happy)).geometry
  : undefined
</script>

<template>
  <svg v-if="face" viewBox="-92 -94 184 198" class="mascot-mark" :class="{ 'mascot-mark--idle-blink': idleBlink }" aria-hidden="true">
    <path :d="face.headPath" fill="currentColor" />
    <path :d="face.leftPath" class="mascot-mark-eye" fill="var(--mascot-ink)" />
    <path :d="face.rightPath" class="mascot-mark-eye" fill="var(--mascot-ink)" />
    <path :d="face.mouthPath" fill="none" stroke="var(--mascot-ink)" :stroke-width="face.mouthStrokeWidth" stroke-linecap="round" />
  </svg>
  <UIcon v-else name="lucide:smile" aria-hidden="true" />
</template>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .mascot-mark--idle-blink .mascot-mark-eye {
    transform-box: fill-box;
    transform-origin: center;
    animation: mascot-mark-blink 5.6s ease-in-out infinite;
  }

  @keyframes mascot-mark-blink {
    0%, 95%, 100% { transform: scaleY(1); }
    97% { transform: scaleY(0.08); }
  }
}
</style>
