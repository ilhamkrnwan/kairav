import type { Ref } from 'vue'

type HomeMotionState = {
  activeSlug: Readonly<Ref<string>>
  previewDirection: Readonly<Ref<number>>
  showAlternativePortrait: Readonly<Ref<boolean>>
}

function followPointer(area: HTMLElement, update: (x: number, y: number) => void) {
  const controller = new AbortController()
  const options = { signal: controller.signal, passive: true }
  let bounds: DOMRect | undefined
  const invalidate = () => { bounds = undefined }
  const bound = (value: number) => Math.max(-1, Math.min(1, value))

  area.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || area.classList.contains('is-dragging')) return
    bounds ??= area.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return
    update(
      bound((event.clientX - bounds.left) / bounds.width * 2 - 1),
      bound((event.clientY - bounds.top) / bounds.height * 2 - 1),
    )
  }, options)
  area.addEventListener('pointerleave', () => {
    invalidate()
    update(0, 0)
  }, options)
  window.addEventListener('scroll', invalidate, options)
  window.addEventListener('resize', invalidate, options)
  return () => controller.abort()
}

export function useHomeMotion(
  hero: Readonly<Ref<HTMLElement | null>>,
  work: Readonly<Ref<HTMLElement | null>>,
  state: HomeMotionState,
) {
  let introduced = false

  useEditorialMotion(hero, ({ root, gsap, finePointer }) => {
    const title = root.querySelector<HTMLElement>('.home-name')
    const words = root.querySelectorAll('[data-name-word]')
    const ink = root.querySelectorAll<HTMLElement>('[data-name-ink]')
    const pictures = root.querySelectorAll('[data-cover-art]')
    const portrait = root.querySelector<HTMLElement>('.home-portrait')
    const portraitDepth = root.querySelector<HTMLElement>('[data-portrait-depth]')
    const portraitShutter = root.querySelector<HTMLElement>('[data-portrait-shutter]')
    if (!title || !portrait || !portraitDepth || !portraitShutter) return

    if (!introduced && !window.location.hash && root.getBoundingClientRect().top >= 0) {
      introduced = true

      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .fromTo(words, { yPercent: 87, skewY: 5 }, {
          yPercent: 0, skewY: 0, duration: 0.95, stagger: 0.12, clearProps: 'transform',
        }, 0)
        .fromTo(pictures, { scaleX: 1 }, {
          scaleX: 0, duration: 0.82, stagger: 0.12, clearProps: 'transform',
        }, 0.18)
    }

    const portraitSwap = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      .fromTo(portraitShutter, { scaleX: 1 }, {
        scaleX: 0, duration: 0.6, immediateRender: false, clearProps: 'transform',
      }, 0)
      .fromTo(portraitDepth, { scale: 1.15 }, { scale: 1, duration: 0.72, immediateRender: false }, 0)

    const stopPortrait = watch(state.showAlternativePortrait, () => portraitSwap.restart(), { flush: 'post' })
    if (!finePointer) return stopPortrait

    const moveInk = [...ink].map(element => ({
      x: gsap.quickTo(element, 'x', { duration: 0.46, ease: 'power3.out' }),
      y: gsap.quickTo(element, 'y', { duration: 0.46, ease: 'power3.out' }),
    }))
    const stopTitle = followPointer(title, (x, y) => {
      moveInk.forEach((word, index) => {
        const direction = index % 2 === 0 ? 1 : -1
        word.x(x * direction * 9)
        word.y(y * direction * 6)
      })
    })

    const portraitX = gsap.quickTo(portraitDepth, 'x', { duration: 0.52, ease: 'power3.out' })
    const portraitY = gsap.quickTo(portraitDepth, 'y', { duration: 0.52, ease: 'power3.out' })
    const portraitTurn = gsap.quickTo(portraitDepth, 'rotationY', { duration: 0.52, ease: 'power3.out' })
    const stopLens = followPointer(portrait, (x, y) => {
      portraitX(x * 9)
      portraitY(y * 7)
      portraitTurn(x * 7)
    })

    return () => {
      stopPortrait()
      stopTitle()
      stopLens()
    }
  })

  useEditorialMotion(work, ({ root, gsap, finePointer, ScrollTrigger }) => {
    const preview = root.querySelector<HTMLElement>('.work-preview')
    const stage = preview?.querySelector<HTMLElement>('[data-work-stage]')
    const frame = root.querySelector<HTMLElement>('[data-work-preview]')
    const depth = root.querySelector<HTMLElement>('[data-work-depth]')
    const art = root.querySelector<HTMLElement>('[data-work-art]')
    const shutters = root.querySelectorAll('[data-work-shutter]')
    const copy = root.querySelector<HTMLElement>('[data-work-copy]')
    if (!ScrollTrigger || !preview || !stage || !frame || !depth || !art || !shutters.length || !copy) return

    gsap.timeline({
      scrollTrigger: { id: 'home-project-art', trigger: preview, start: 'top 98%', end: 'top 49%', scrub: 0.38 },
      defaults: { ease: 'none' },
    })
      .fromTo(frame, { clipPath: 'polygon(0% 48%, 100% 8%, 100% 100%, 0% 100%)' }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }, 0)
      .fromTo(depth, { scale: 1.18 }, { scale: 1 }, 0)

    const titles = root.querySelectorAll('.work-index-title')
    const summary = copy.parentElement
    if (titles.length && summary) {
      gsap.timeline({
        scrollTrigger: { id: 'home-project-index', trigger: root, start: 'top 95%', end: 'top 46%', scrub: 0.36 },
        defaults: { ease: 'none' },
      })
        .fromTo(titles, { y: 14 }, { y: 0, duration: 0.48, stagger: 0.1 }, 0)
        .fromTo(summary, { y: 24 }, { y: 0, duration: 0.44 }, 0.36)
    }

    const pinMedia = gsap.matchMedia(root)
    pinMedia.add('(min-width: 64rem) and (min-height: 46rem) and (hover: hover) and (pointer: fine)', () => {
      ScrollTrigger.create({
        id: 'home-project-pin',
        trigger: preview,
        pin: stage,
        start: () => `top ${(document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 68) + 20}px`,
        end: () => `+=${Math.min(212, Math.round(window.innerHeight * 0.22))}`,
        refreshPriority: 1,
      })
    })

    const swap = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      .fromTo(shutters, { scaleY: 1 }, {
        scaleY: 0,
        duration: 0.62,
        stagger: { amount: 0.16, from: 'start' },
        immediateRender: false,
        clearProps: 'transform',
      }, 0)
      .fromTo(art, { xPercent: () => state.previewDirection.value * 9, scale: 1.13 }, {
        xPercent: 0, scale: 1, duration: 0.76, immediateRender: false, clearProps: 'transform',
      }, 0.05)
      .fromTo(copy, { opacity: 0.68, y: 14 }, {
        opacity: 1, y: 0, duration: 0.42, immediateRender: false, clearProps: 'opacity,transform',
      }, 0.11)

    const stop = watch(state.activeSlug, () => swap.invalidate().restart(), { flush: 'post' })
    ScrollTrigger.refresh(true)

    const stopStage = () => {
      stop()
      pinMedia.revert()
    }
    if (!finePointer) return stopStage

    const x = gsap.quickTo(depth, 'x', { duration: 0.58, ease: 'power3.out' })
    const y = gsap.quickTo(depth, 'y', { duration: 0.58, ease: 'power3.out' })
    const tiltX = gsap.quickTo(depth, 'rotationX', { duration: 0.58, ease: 'power3.out' })
    const tiltY = gsap.quickTo(depth, 'rotationY', { duration: 0.58, ease: 'power3.out' })
    const stopTilt = followPointer(frame, (horizontal, vertical) => {
      x(horizontal * 17)
      y(vertical * 12)
      tiltX(vertical * -7)
      tiltY(horizontal * 8)
    })

    return () => {
      stopStage()
      stopTilt()
    }
  }, true)
}
