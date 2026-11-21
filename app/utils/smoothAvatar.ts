// Smooth replacement for @bible-strong/avatar-web's renderer (same DOM, MIT-licensed core maths).
// avatar-web can only switch between named expressions; here every numeric face value eases
// continuously toward its goal, so a gaze that follows the cursor never steps or jitters.
import {
  expressionFields,
  expressionFromDefinition,
  renderAvatarExpression,
  validateAvatarDefinition
} from '@bible-strong/avatar-core'
import type { AvatarScene, Expression } from '@bible-strong/avatar-core'

export interface SmoothAvatar {
  play: (animation: string) => void
  setExpression: (key: string) => void
  /** Head target in degrees (yaw right, pitch down), or null to let go of the cursor. */
  look: (yaw: number | null, pitch?: number) => void
  destroy: () => void
}

const NS = 'http://www.w3.org/2000/svg'
const svg = (tag: string) => document.createElementNS(NS, tag)
let uid = 0

export function createSmoothAvatar(target: HTMLElement, opts: { definition: unknown, size: number | string, ariaLabel: string, animation: string }): SmoothAvatar {
  const parsed = validateAvatarDefinition(opts.definition)
  if (!parsed.ok) throw new Error('Invalid avatar definition')
  const def = parsed.value
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---- DOM (mirrors avatar-web) ----
  const root = document.createElement('span')
  const px = typeof opts.size === 'number' ? `${opts.size}px` : opts.size
  Object.assign(root.style, { display: 'inline-block', width: px, height: px })
  root.setAttribute('role', 'img')
  root.setAttribute('aria-label', opts.ariaLabel)
  const canvas = svg('svg')
  canvas.setAttribute('viewBox', '-150 -150 300 300')
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, { display: 'block', width: '100%', height: '100%' })
  const clipId = `smooth-avatar-${++uid}`
  const clip = svg('clipPath')
  clip.id = clipId
  const clipPath = svg('path')
  clip.append(clipPath)
  const defs = svg('defs')
  defs.append(clip)
  const count = def.body.nodes.length + 2
  const mk = (n: number) => Array.from({ length: n }, () => svg('path'))
  const back = mk(count)
  const head = svg('path')
  const front = mk(count)
  const face = svg('g')
  face.setAttribute('clip-path', `url(#${clipId})`)
  const [eyeL, eyeR, nose, mouth] = mk(4) as [SVGElement, SVGElement, SVGElement, SVGElement]
  face.append(eyeL, eyeR, nose, mouth)
  canvas.append(defs, ...back, head, face, ...front)
  root.append(canvas)
  target.append(root)

  const paint = (s: AvatarScene) => {
    const g = s.geometry
    clipPath.setAttribute('d', g.headPath)
    head.setAttribute('d', g.headPath)
    head.setAttribute('fill', s.colors.body)
    const eye = (el: SVGElement, d: string, visible: boolean) => {
      el.setAttribute('d', d)
      el.setAttribute('fill', s.colors.eyes)
      el.setAttribute('opacity', visible ? '1' : '0')
    }
    eye(eyeL, g.leftPath, g.leftVisible)
    eye(eyeR, g.rightPath, g.rightVisible)
    nose.setAttribute('d', g.nosePath)
    nose.setAttribute('fill', s.colors.eyes)
    const stroked = g.mouthStrokeWidth > 0
    mouth.setAttribute('d', g.mouthPath)
    mouth.setAttribute('fill', stroked ? 'none' : s.colors.eyes)
    mouth.setAttribute('stroke', stroked ? s.colors.eyes : 'none')
    mouth.setAttribute('stroke-width', String(g.mouthStrokeWidth))
    mouth.setAttribute('stroke-linecap', 'round')
    mouth.setAttribute('stroke-linejoin', 'round')
    back.forEach((p, i) => { p.setAttribute('d', g.backPaths[i] ?? ''); p.setAttribute('fill', s.bodyColors.back[i] ?? s.colors.body) })
    front.forEach((p, i) => { p.setAttribute('d', g.frontPaths[i] ?? ''); p.setAttribute('fill', s.bodyColors.front[i] ?? s.colors.body) })
  }

  // ---- motion state ----
  const goalOf = (key: string): Expression => expressionFromDefinition(key, def.expressions[key] ?? def.expressions.neutral!)
  let goal = goalOf('neutral')
  const cur: Record<string, number> = {}
  for (const f of expressionFields) cur[f] = (goal as unknown as Record<string, number>)[f]!
  let tau = 0.14 // seconds; ~95% of the way in 3 tau
  const gaze = { yaw: 0, pitch: 0, weight: 0 }
  let aim: { yaw: number, pitch: number } | null = null
  let stepTimer: ReturnType<typeof setTimeout> | undefined
  let blinkAt = performance.now() + 1500
  let blinkStart = -1

  const setGoal = (key: string, ms = 140) => { goal = goalOf(key); tau = Math.max(ms, 40) / 1000 / 3 }

  const stopSteps = () => clearTimeout(stepTimer)
  const play = (name: string) => {
    stopSteps()
    const steps = def.animations[name]?.steps
    if (!steps?.length) return
    let i = 0
    const run = () => {
      const step = steps[i % steps.length]!
      setGoal(step.expression, step.transitionMs)
      i++
      stepTimer = setTimeout(run, step.transitionMs + step.holdMs)
    }
    run()
  }

  const frame = (now: number, dt: number) => {
    const k = 1 - Math.exp(-dt / tau)
    const kg = 1 - Math.exp(-dt / 0.13)
    gaze.weight += ((aim ? 1 : 0) - gaze.weight) * (1 - Math.exp(-dt / 0.35))
    gaze.yaw += ((aim?.yaw ?? gaze.yaw) - gaze.yaw) * kg
    gaze.pitch += ((aim?.pitch ?? gaze.pitch) - gaze.pitch) * kg

    const ex = { ...goal } as unknown as Record<string, number>
    for (const f of expressionFields) {
      cur[f]! += (ex[f]! - cur[f]!) * k
      ex[f] = cur[f]!
    }
    const w = gaze.weight
    ex.headY! += gaze.yaw * w
    ex.headX! += gaze.pitch * w
    ex.headZ! += gaze.yaw * 0.1 * w
    ex.positionXLeft! += gaze.yaw * 0.3 * w
    ex.positionXRight! += gaze.yaw * 0.3 * w
    ex.positionYLeft! += gaze.pitch * 0.3 * w
    ex.positionYRight! += gaze.pitch * 0.3 * w

    let blink = 1
    if (goal.blinking && !reduced) {
      if (blinkStart < 0 && now >= blinkAt) { blinkStart = now; blinkAt = now + 2800 + Math.random() * 2400 }
      if (blinkStart >= 0) {
        const r = (now - blinkStart) / 260
        if (r >= 1) blinkStart = -1
        else blink = Math.abs(r * 2 - 1)
      }
    }
    // Breathing sway: two slow sines. The core's ambient motion twitches the eyes in 140ms jumps, which
    // reads as shaking once the avatar is drawn large, so it is not used.
    if (!reduced) {
      const t = now / 1000
      const s = 1 - 0.7 * w
      const sway = (a: number, b: number, ph: number) => (Math.sin(t * a + ph) + Math.sin(t * b + ph * 2) * 0.5) * s
      ex.headX! += sway(0.9, 1.7, 0) * 0.7
      ex.headY! += sway(0.7, 1.3, 1.3) * 1
      ex.headZ! += sway(0.5, 1.1, 2.1) * 0.5
      ex.positionYLeft! += sway(1.1, 0.6, 0.4) * 0.5
      ex.positionYRight! += sway(1.1, 0.6, 0.4) * 0.5
    }
    paint(renderAvatarExpression(def, ex as unknown as Expression, undefined, blink))
  }

  let raf = 0
  let last = performance.now()
  let visible = true
  const loop = (now: number) => {
    raf = 0
    if (!visible) return
    frame(now, Math.min((now - last) / 1000, 0.05))
    last = now
    raf = requestAnimationFrame(loop)
  }
  const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop) } }
  const io = typeof IntersectionObserver === 'undefined'
    ? undefined
    : new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true
      if (visible) start()
    })
  io?.observe(root)

  frame(performance.now(), 0.016)
  if (opts.animation) play(opts.animation)
  start()

  return {
    play,
    setExpression: (key) => { stopSteps(); setGoal(key) },
    look: (yaw, pitch = 0) => { aim = yaw === null ? null : { yaw, pitch } },
    destroy: () => {
      stopSteps()
      io?.disconnect()
      cancelAnimationFrame(raf)
      root.remove()
    }
  }
}
