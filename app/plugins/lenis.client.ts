// Smooth scroll driven by the GSAP ticker so ScrollTrigger scrub stays in sync.
export default defineNuxtPlugin((nuxtApp) => {
  // Holder so components (back-to-top) can reach the instance once it exists.
  const holder: { instance?: import('lenis').default } = {}
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reduced.matches) return { provide: { lenis: holder } }

  nuxtApp.hook('app:mounted', async () => {
    const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      autoRaf: false,
      anchors: { offset: -72 },
      lerp: 0.085,
      // Dialogs (menu/search) own their scroll.
      prevent: node => !!node.closest('[role="dialog"]'),
    })
    holder.instance = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Route changes: Nuxt's scrollBehavior calls window.scrollTo; make Lenis follow instantly.
    nuxtApp.hook('kairav:page-scroll', () => lenis.scrollTo(window.scrollY, { immediate: true }))

    const stop = () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      holder.instance = undefined
    }
    reduced.addEventListener('change', (event) => { if (event.matches) stop() }, { once: true })
  })

  return { provide: { lenis: holder } }
})
