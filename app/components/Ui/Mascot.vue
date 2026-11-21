<script setup lang="ts">
// Procedural avatar from Avatar Lab (https://avatars.bible-strong.app), drawn by app/utils/smoothAvatar.ts
// on the MIT-licensed @bible-strong/avatar-core. The definition lives in app/assets/avatars/<name>.avatar.json.
// The head follows the cursor continuously (eased every frame, no stepping), hover = happy face, clicking a part
// of the face (eye, mouth, forehead, sides, belly) pokes it, clicking elsewhere = next line, `greet` =
// it waves hello once per session. `say()` is exposed for pages that want to make it talk.
import type { SmoothAvatar } from '~/utils/smoothAvatar'

interface Line { text: string, expression: string }

const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  animation?: string
  label?: string
  lines?: Line[]
  greet?: string
  side?: 'top' | 'left' | 'right'
}>(), { size: 160, animation: 'idle', label: 'Maskot Kairav', side: 'top' })


const { locale } = useI18n()
const definitions = import.meta.glob('~/assets/avatars/*.avatar.json', { import: 'default' })

const defaults: Record<string, Line[]> = {
  id: [
    { text: 'Halo, aku Kairav!', expression: 'happy' },
    { text: 'Ilham lagi buka slot proyek baru.', expression: 'surprised' },
    { text: 'Hmm, mau bikin apa ya hari ini?', expression: 'thinking' },
    { text: 'Tema terang dan gelap ada di menu.', expression: 'wink' },
    { text: 'Klik aku lagi, ekspresiku banyak.', expression: 'curious' },
    { text: 'Aku ngantuk... coba chat Ilham saja.', expression: 'sleepy' }
  ],
  en: [
    { text: "Hi, I'm Kairav!", expression: 'happy' },
    { text: 'Ilham has a slot open for a new project.', expression: 'surprised' },
    { text: 'Hmm, what should we build today?', expression: 'thinking' },
    { text: 'Switch between light and dark in the menu.', expression: 'wink' },
    { text: 'Click me again, I have plenty of faces.', expression: 'curious' },
    { text: "I'm sleepy... just message Ilham instead.", expression: 'sleepy' }
  ]
}
// Where you click decides the face. Regions are fractions of the box, centre = 0.
const pokes: Record<string, Line & { en: string }> = {
  'eye-l': { text: 'Kedip kiri~', en: 'Left wink~', expression: 'wink-left' },
  'eye-r': { text: 'Kedip kanan~', en: 'Right wink~', expression: 'wink' },
  'mouth': { text: 'Ups, itu mulutku!', en: "Oops, that's my mouth!", expression: 'surprised' },
  'head': { text: 'Zzz... jangan diketok.', en: "Zzz... don't knock.", expression: 'sleepy' },
  'side-l': { text: 'Ada apa di sebelah kiri?', en: "What's over on the left?", expression: 'look-left' },
  'side-r': { text: 'Ada apa di sebelah kanan?', en: "What's over on the right?", expression: 'look-right' },
  'belly': { text: 'Aduh, geli!', en: 'Ouch, ticklish!', expression: 'ouch' }
}
const partAt = (nx: number, ny: number) => {
  if (ny < -0.5) return 'head'
  if (ny > 0.55) return 'belly'
  if (Math.abs(nx) > 0.6) return nx < 0 ? 'side-l' : 'side-r'
  if (ny > 0.12) return Math.abs(nx) < 0.45 ? 'mouth' : undefined
  if (ny > -0.45 && Math.abs(nx) > 0.08) return nx < 0 ? 'eye-l' : 'eye-r'
}
const pool = computed(() => props.lines?.length ? props.lines : (defaults[locale.value] ?? defaults.id)!)

const host = ref<HTMLElement | null>(null)
const bubble = ref('')
const bubbleOpen = ref(false)
const announcement = ref('')
let avatar: SmoothAvatar | undefined
let speaking = false
let hover = false
let tracking = false
let idleTimer: ReturnType<typeof setTimeout> | undefined
let index = 0
const timers: ReturnType<typeof setTimeout>[] = []
let typer: ReturnType<typeof setInterval> | undefined

const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Back to rest: neutral face while the cursor is being followed, otherwise the idle loop.
const resume = () => { speaking = false; if (tracking) avatar?.setExpression('neutral'); else avatar?.play(props.animation) }

const say = (text: string, expression = 'happy', holdMs = 3800) => {
  if (!avatar) return
  timers.splice(0).forEach(clearTimeout)
  clearInterval(typer)
  speaking = true
  bubbleOpen.value = true
  bubble.value = ''
  announcement.value = text
  avatar.play('talk')

  const talkMs = reduced() ? 0 : Math.min(text.length * 38, 2400)
  if (talkMs) {
    let i = 0
    typer = setInterval(() => {
      bubble.value = text.slice(0, ++i)
      if (i >= text.length) clearInterval(typer)
    }, talkMs / text.length)
  } else {
    bubble.value = text
  }
  later(() => avatar?.setExpression(expression), talkMs)
  later(() => {
    bubbleOpen.value = false
    announcement.value = ''
    resume()
  }, talkMs + holdMs)
}

const next = () => {
  const line = pool.value[index++ % pool.value.length]!
  say(line.text, line.expression)
}

const onClick = (e: MouseEvent) => {
  if (e.detail === 0 || !host.value) return next()
  const r = host.value.getBoundingClientRect()
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return next()
  const part = partAt(((e.clientX - r.left) / r.width - 0.5) * 2, ((e.clientY - r.top) / r.height - 0.5) * 2)
  const poke = part && pokes[part]
  if (!poke) return next()
  say(locale.value === 'en' ? poke.en : poke.text, poke.expression, 2600)
}

const onEnter = () => { hover = true; if (!speaking) avatar?.setExpression('happy') }
const onLeave = () => { hover = false; if (!speaking) resume() }

// Head follows the cursor; the engine eases toward it every frame. Idle loop returns after 4s of stillness.
const clamp = (v: number) => Math.max(-1, Math.min(1, v))
const onMove = (e: PointerEvent) => {
  if (!avatar || e.pointerType === 'touch' || !host.value) return
  const r = host.value.getBoundingClientRect()
  const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth * 0.3)
  const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight * 0.3)
  avatar.look(clamp(dx) * 24, clamp(dy) * 14)
  if (!tracking) {
    tracking = true
    if (!speaking && !hover) avatar.setExpression('neutral')
  }
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => {
    tracking = false
    avatar?.look(null)
    if (!speaking && !hover) resume()
  }, 4000)
}

onMounted(async () => {
  const load = Object.entries(definitions).find(([path]) => path.endsWith(`/${props.name}.avatar.json`))?.[1]
  if (!load || !host.value) return
  const [{ createSmoothAvatar }, definition] = await Promise.all([import('~/utils/smoothAvatar'), load()])
  if (!host.value) return
  avatar = createSmoothAvatar(host.value, { definition, size: props.size, ariaLabel: props.label, animation: props.animation })

  if (!reduced()) window.addEventListener('pointermove', onMove, { passive: true })

  if (props.greet && !sessionStorage.getItem(`mascot-greeted-${props.name}`)) {
    sessionStorage.setItem(`mascot-greeted-${props.name}`, '1')
    later(() => say(props.greet!, 'happy', 4200), 2200)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove)
  clearTimeout(idleTimer)
  timers.forEach(clearTimeout)
  clearInterval(typer)
  avatar?.destroy()
})

defineExpose({ say })

const px = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)
const place = computed(() => ({
  top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
  left: 'right-full top-4 mr-2',
  right: 'left-full top-4 ml-2'
})[props.side])
const tail = computed(() => ({
  top: '-bottom-1 left-1/2 -translate-x-1/2',
  left: '-right-1 top-5',
  right: '-left-1 top-5'
})[props.side])
</script>

<template>
  <div class="relative inline-block" :style="{ width: px, height: px }">
    <button
      type="button"
      class="mascot-control block size-full cursor-pointer"
      :aria-label="`${label}: ${locale === 'en' ? 'say something' : 'ajak ngobrol'}`"
      @click="onClick"
      @pointerenter="onEnter"
      @pointerleave="onLeave"
    >
      <span ref="host" class="mascot-canvas pointer-events-none relative block size-full">
        <slot name="fallback" />
      </span>
      <slot name="caption" />
    </button>

    <Transition name="bubble">
      <div
        v-if="bubbleOpen"
        aria-hidden="true"
        class="mascot-bubble pointer-events-none absolute z-20 w-max max-w-52 border border-accented bg-elevated px-3.5 py-2 text-sm font-medium leading-snug text-highlighted"
        :class="place"
      >
        {{ bubble }}
        <span aria-hidden="true" class="absolute size-2.5 rotate-45 border border-default bg-elevated" :class="[tail, side === 'top' ? 'border-t-0 border-l-0' : side === 'left' ? 'border-b-0 border-l-0' : 'border-t-0 border-r-0']" />
      </div>
    </Transition>
    <span role="status" class="sr-only">{{ announcement }}</span>
  </div>
</template>
