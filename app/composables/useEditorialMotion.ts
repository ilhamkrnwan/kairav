import type { Ref } from 'vue'

const fullMotion = '(prefers-reduced-motion: no-preference)'
const precise = '(hover: hover) and (pointer: fine)'

type MotionOptions = {
  root: HTMLElement
  gsap: typeof import('gsap').gsap
  context: ReturnType<typeof import('gsap').gsap.context>
  ScrollTrigger?: typeof import('gsap/ScrollTrigger').ScrollTrigger
  finePointer: boolean
}

export function useEditorialMotion(
  root: Readonly<Ref<HTMLElement | null>>,
  setup: (options: MotionOptions) => (() => void) | undefined,
  scroll = false,
) {
  let disposed = false
  let stop: (() => void) | undefined
  let media: ReturnType<MotionOptions['gsap']['matchMedia']> | undefined

  onMounted(async () => {
    try {
      const [{ gsap }, scrollModule] = await Promise.all([
        import('gsap'),
        scroll ? import('gsap/ScrollTrigger') : undefined,
      ])
      if (disposed) return
      const ScrollTrigger = scrollModule?.ScrollTrigger
      if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger)

      stop = watch(root, (element) => {
        media?.revert()
        if (!element) return

        media = gsap.matchMedia(element)
        media.add({ motion: fullMotion, finePointer: precise }, (context) => {
          if (!context.conditions?.motion) return
          return setup({ root: element, gsap, context, ScrollTrigger, finePointer: !!context.conditions.finePointer })
        })
      }, { immediate: true, flush: 'post' })
    } catch (error) {
      console.warn('[Kairav] Editorial motion could not be initialized.', error)
      media?.revert()
    }
  })

  onBeforeUnmount(() => {
    disposed = true
    stop?.()
    media?.revert()
  })
}
