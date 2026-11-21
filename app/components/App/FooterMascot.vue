<script setup lang="ts">
const { t } = useI18n()
const stage = useTemplateRef<HTMLElement>('stage')
const hovered = ref(false)
const keyboardFocused = ref(false)
const speaking = ref(false)

useEditorialMotion(stage, ({ root, gsap }) => {
  if (!('IntersectionObserver' in window)) return

  const timeline = gsap.timeline({ paused: true })
  const runner = '.footer-mascot-runner'
  const lift = '.footer-mascot-lift'
  const avatar = '.footer-mascot-avatar'
  const shadow = '.footer-mascot-shadow'
  const feet = ['.footer-mascot-foot--far', '.footer-mascot-foot--near']
  const stride = 0.64
  const strides = 3
  const start = 0.25

  timeline
    .to(runner, { x: () => Math.min(62, root.clientWidth * 0.13), duration: stride * strides, ease: 'sine.inOut' }, start)
    .to(avatar, { y: -2, duration: stride / 4, ease: 'sine.inOut', repeat: strides * 4 - 1, yoyo: true }, start)

  feet.forEach((foot, index) => {
    const swing = [
      { x: 4, y: -4, rotation: 12, duration: stride / 4 },
      { x: 4, y: 0, rotation: 0, duration: stride / 4 },
    ]
    const plant = { x: -4, y: 0, rotation: 0, duration: stride / 2, ease: 'none' }

    timeline.to(foot, {
      keyframes: index === 0 ? [plant, ...swing] : [...swing, plant],
      repeat: strides - 1,
    }, start)
  })

  // A short stroll, a full rest, and one hop per visit keep the stage from looping.
  timeline.to(feet, { x: 0, y: 0, rotation: 0, duration: 0.14 })
  const hop = timeline.duration() + 1.95
  timeline
    .to(lift, { scaleX: 1.06, scaleY: 0.9, duration: 0.12, ease: 'power2.in' }, hop)
    .to(lift, { y: -17, scaleX: 0.97, scaleY: 1.04, duration: 0.22, ease: 'power2.out' }, hop + 0.12)
    .to(shadow, { scaleX: 0.62, opacity: 0.35, duration: 0.22, repeat: 1, yoyo: true, ease: 'sine.inOut' }, hop + 0.12)
    .to(lift, { y: 0, scaleX: 1.06, scaleY: 0.91, duration: 0.22, ease: 'power2.in' }, hop + 0.34)
    .to(lift, { scaleX: 1, scaleY: 1, duration: 0.15, ease: 'power2.out' }, hop + 0.56)

  let inView = false
  const syncPlayback = () => {
    timeline.paused(!inView || hovered.value || keyboardFocused.value || speaking.value || document.hidden)
  }
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false
    if (!inView && timeline.progress() === 1) timeline.pause(0).invalidate()
    syncPlayback()
  })
  const stop = watch([hovered, keyboardFocused, speaking], syncPlayback)
  observer.observe(root)
  document.addEventListener('visibilitychange', syncPlayback)

  return () => {
    observer.disconnect()
    document.removeEventListener('visibilitychange', syncPlayback)
    stop()
  }
})

function onFocus(event: FocusEvent) {
  keyboardFocused.value = event.target instanceof HTMLElement && event.target.matches(':focus-visible')
}
</script>

<template>
  <div ref="stage" class="footer-mascot">
    <div class="footer-mascot-park">
      <div class="footer-mascot-tree" aria-hidden="true">
        <span class="footer-mascot-crown" />
      </div>
      <div class="footer-mascot-swing" aria-hidden="true">
        <span class="footer-mascot-swing-bar" />
        <span class="footer-mascot-swing-seat" />
      </div>
      <div class="footer-mascot-runner">
        <div class="footer-mascot-shadow" aria-hidden="true" />
        <div class="footer-mascot-lift">
          <span class="footer-mascot-foot footer-mascot-foot--far" aria-hidden="true" />
          <div
            class="footer-mascot-avatar"
            @pointerenter="hovered = $event.pointerType !== 'touch'"
            @pointerleave="hovered = false"
            @focusin="onFocus"
            @focusout="keyboardFocused = false"
          >
            <LazyUiMascot
              name="kairav"
              size="100%"
              label="Kairav"
              animation=""
              :follow-pointer="false"
              :hover-greeting="t('footer.mascot_hello')"
              hydrate-on-visible
              @speaking-change="speaking = $event"
            >
              <template #fallback>
                <UiMascotMark class="footer-mascot-fallback" />
              </template>
            </LazyUiMascot>
          </div>
          <span class="footer-mascot-foot footer-mascot-foot--near" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-mascot {
  --mascot-size: clamp(3.75rem, 7vw, 5.375rem);
  --track-gutter: clamp(0.875rem, 2.8vw, 2.625rem);
  --track-floor: 1.125rem;
  --park-structure: color-mix(in srgb, var(--mascot-color) 35%, var(--ui-border-accented));
  --park-foliage: color-mix(in srgb, var(--mascot-color) 24%, var(--ui-bg-muted));

  position: relative;
  margin-block-start: -1rem;
}

:root:not(.dark) .footer-mascot {
  background: linear-gradient(to top, color-mix(in srgb, var(--mascot-stage) 30%, transparent), transparent 65%);
}

.footer-mascot::before {
  position: absolute;
  inset: auto var(--track-gutter) var(--track-floor);
  border-block-end: 1px solid var(--ui-border);
  content: '';
}

.footer-mascot-park {
  position: relative;
  max-inline-size: 44rem;
  min-block-size: clamp(9.5rem, 15vw, 11.75rem);
  margin-inline: auto;
}

.footer-mascot-tree,
.footer-mascot-swing {
  position: absolute;
  inset-block-end: var(--track-floor);
  pointer-events: none;
}

.footer-mascot-tree {
  inset-inline-start: clamp(0.5rem, 8%, 3.75rem);
  inline-size: clamp(3.25rem, 12vw, 7.25rem);
  block-size: clamp(3.75rem, 10vw, 7.625rem);
}

.footer-mascot-tree::before {
  position: absolute;
  inset: 35% 47% 0;
  border-radius: 2px 2px 0 0;
  background: var(--park-structure);
  content: '';
}

.footer-mascot-crown {
  position: absolute;
  inset: 0 16% 32%;
  border-radius: 50% 53% 43% 49%;
  background: var(--park-foliage);
}

.footer-mascot-crown::before,
.footer-mascot-crown::after {
  position: absolute;
  inline-size: 73%;
  block-size: 68%;
  border-radius: 48% 51% 48% 46%;
  background: var(--park-foliage);
  content: '';
}

.footer-mascot-crown::before { inset: 34% auto auto -23%; }
.footer-mascot-crown::after { inset: 28% -21% auto auto; }

.footer-mascot-swing {
  inset-inline-end: clamp(0.5rem, 7%, 3.125rem);
  inline-size: clamp(3.5rem, 13vw, 8.125rem);
  block-size: clamp(3.5rem, 8vw, 6.75rem);
}

.footer-mascot-swing::before,
.footer-mascot-swing::after {
  position: absolute;
  inset-block: 0 0;
  inline-size: 3px;
  border-radius: 2px;
  background: var(--park-structure);
  transform-origin: bottom center;
  content: '';
}

.footer-mascot-swing::before { inset-inline-start: 4%; transform: skewX(-12deg); }
.footer-mascot-swing::after { inset-inline-end: 4%; transform: skewX(12deg); }

.footer-mascot-swing-bar,
.footer-mascot-swing-seat {
  position: absolute;
  background: var(--park-structure);
}

.footer-mascot-swing-bar {
  inset: 0 10% auto;
  block-size: 3px;
  border-radius: 2px;
}

.footer-mascot-swing-seat {
  inset: 2px 34% 29%;
  border-inline: 1px solid var(--park-structure);
  background: transparent;
}

.footer-mascot-swing-seat::after {
  position: absolute;
  inset: auto -16% 0;
  block-size: 4px;
  border-radius: 2px;
  background: var(--park-structure);
  content: '';
}

.footer-mascot-runner {
  position: absolute;
  inset-block-end: var(--track-floor);
  inset-inline-start: 34%;
  z-index: 1;
  color: var(--mascot-color);
}

.footer-mascot-lift {
  position: relative;
  inline-size: var(--mascot-size);
  block-size: var(--mascot-size);
  transform-origin: center bottom;
}

.footer-mascot-avatar {
  position: absolute;
  inset: 0 0 6%;
}

.footer-mascot-avatar :deep(.mascot-control) {
  border-radius: 24%;
}

.footer-mascot-avatar :deep(.mascot-canvas) {
  transform: translateY(3%) scale(1.16);
}

.footer-mascot-avatar :deep(.mascot-canvas > span > svg > path) { fill: var(--mascot-color); }
.footer-mascot-avatar :deep(.mascot-canvas > span > svg > g > path:not([fill='none'])) { fill: var(--mascot-ink); }
.footer-mascot-avatar :deep(.mascot-canvas > span > svg > g > path[stroke]:not([stroke='none'])) { stroke: var(--mascot-ink); }

.footer-mascot-fallback {
  position: absolute;
  inset: 14%;
  inline-size: 72%;
  block-size: 72%;
}

.footer-mascot-avatar :deep(.mascot-canvas:has(> span > svg)) .footer-mascot-fallback { display: none; }
.footer-mascot-avatar :deep(.mascot-bubble) { max-inline-size: min(11rem, 56vw); }

.footer-mascot-foot {
  position: absolute;
  inset-block-end: 0;
  inline-size: 21%;
  block-size: 24%;
  border-radius: 45% 45% 40% 40%;
  background: currentColor;
  pointer-events: none;
  transform-origin: center top;
}

.footer-mascot-foot--far {
  inset-inline-start: 25%;
  background: color-mix(in srgb, currentColor 75%, var(--mascot-ink));
}

.footer-mascot-foot--near { inset-inline-end: 25%; }

.footer-mascot-shadow {
  position: absolute;
  inset-block-end: -0.18rem;
  inset-inline-start: calc(var(--mascot-size) * 0.12);
  inline-size: calc(var(--mascot-size) * 0.76);
  block-size: 0.35rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--mascot-ink) 35%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .footer-mascot-avatar :deep(.mascot-bubble) { transition: none; }
}
</style>
