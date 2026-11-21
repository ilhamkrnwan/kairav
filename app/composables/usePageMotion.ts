import type { Ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'

type Gsap = typeof import('gsap').gsap

declare module '#app' {
  interface RuntimeNuxtHooks {
    'kairav:page-scroll': (path: string) => void
  }
}

export function usePageMotion(curtain: Readonly<Ref<HTMLElement | null>>) {
  const router = useRouter()
  const nuxtApp = useNuxtApp()
  const removeHooks: (() => void)[] = []
  let gsap: Gsap | undefined
  let tween: ReturnType<Gsap['to']> | undefined
  let preference: MediaQueryList | undefined
  let target: RouteLocationNormalized | undefined
  let covering: Promise<void> | undefined
  let releaseCover: (() => void) | undefined
  let covered = false
  let hasNavigated = false
  let disposed = false

  function finishCover() {
    const release = releaseCover
    covering = undefined
    releaseCover = undefined
    release?.()
  }

  function reset() {
    tween?.kill()
    tween = undefined
    covered = false
    finishCover()
    const sheet = curtain.value
    if (!sheet) return
    sheet.removeAttribute('data-active')
    const shutters = sheet.querySelectorAll('.route-shutter')
    if (shutters.length) gsap?.set(shutters, { clearProps: 'transform,visibility,opacity' })
  }

  function cover() {
    const sheet = curtain.value
    const shutters = sheet?.querySelectorAll('.route-shutter')
    if (!gsap || !sheet || !shutters?.length || preference?.matches || covered) return
    if (covering) return covering

    tween?.kill()
    sheet.setAttribute('data-active', '')
    covering = new Promise<void>(resolve => { releaseCover = resolve })
    tween = gsap.fromTo(shutters, { yPercent: 102, autoAlpha: 1 }, {
      yPercent: 0,
      duration: 0.26,
      stagger: 0.045,
      ease: 'power3.inOut',
      onComplete: () => {
        covered = true
        finishCover()
      },
    })
    return covering
  }

  function reveal(from: number) {
    const sheet = curtain.value
    const shutters = sheet?.querySelectorAll('.route-shutter')
    if (!gsap || !sheet || !shutters?.length || preference?.matches) return reset()

    tween?.kill()
    covered = false
    sheet.setAttribute('data-active', '')
    tween = gsap.fromTo(shutters, { yPercent: from, autoAlpha: 1 }, {
      yPercent: -102,
      duration: from === 0 ? 0.53 : 0.62,
      stagger: { each: 0.055, from: 'end' },
      ease: 'power4.out',
      onComplete: reset,
    })
  }

  function finishNavigation() {
    target = undefined
    if (covered) reveal(0)
    else if (covering) reset()
  }

  function onMotionChange(event: MediaQueryListEvent) {
    if (event.matches) reset()
  }

  onMounted(async () => {
    preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    preference.addEventListener('change', onMotionChange)

    removeHooks.push(
      router.beforeEach((to, from) => {
        if (to.path === from.path && !target) return
        hasNavigated = true
        target = to
      }),
      router.beforeResolve((to, from) => {
        if (target === to && to.path !== from.path) return cover()
      }),
      router.afterEach((to, from, failure) => {
        if (target === to && (failure || to.path === from.path)) finishNavigation()
      }),
      router.onError((_error, to) => {
        if (target === to) finishNavigation()
      }),
      nuxtApp.hook('kairav:page-scroll', (path) => {
        if (target?.fullPath === path) finishNavigation()
      }),
    )

    try {
      const module = await import('gsap')
      if (disposed) return
      gsap = module.gsap

      if (!hasNavigated && !location.hash && window.scrollY < 8) reveal(-52)
    } catch (error) {
      console.warn('[Kairav] Page motion could not be loaded.', error)
    }
  })

  onBeforeUnmount(() => {
    disposed = true
    preference?.removeEventListener('change', onMotionChange)
    removeHooks.forEach(remove => remove())
    reset()
  })
}
