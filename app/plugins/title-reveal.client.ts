// Scroll life for every page except home (whose composables own their own motion):
// - h1 titles rise line by line out of a mask on arrival
// - h2.editorial-title rise the same way when scrolled into view
// - [data-reveal] elements fade up in staggered batches
// - [data-scrub-text] brightens word by word as it scrolls through
export default defineNuxtPlugin((nuxtApp) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  nuxtApp.hook('app:mounted', async () => {
    const [{ gsap }, { SplitText }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/SplitText'),
      import('gsap/ScrollTrigger'),
    ])
    gsap.registerPlugin(SplitText, ScrollTrigger)
    let context: ReturnType<typeof gsap.context> | undefined

    const rise = (title: HTMLElement, scrollTrigger?: ScrollTrigger.Vars) => {
      let played = false
      SplitText.create(title, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: self => played ? undefined : gsap.from(self.lines, {
          yPercent: 110,
          duration: 1,
          ease: 'expo.out',
          stagger: 0.09,
          onStart: () => { played = true },
          scrollTrigger,
        }),
      })
    }

    const run = () => {
      context?.revert()
      if (reduced.matches) return
      const isHome = !!document.querySelector('.home-page')

      context = gsap.context(() => {
        document.querySelectorAll<HTMLElement>('#main-content h1:is(.editorial-title, .detail-title)').forEach(title => rise(title))

        if (isHome) return
        document.querySelectorAll<HTMLElement>('#main-content h2.editorial-title').forEach((title) => {
          rise(title, { trigger: title, start: 'top 88%', once: true })
        })

        document.querySelectorAll<HTMLElement>('.detail-hero-image').forEach((image) => {
          gsap.fromTo(image, { yPercent: -4 }, {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: image.closest('.detail-hero'), start: 'top top', end: 'bottom top', scrub: true },
          })
        })

        const items = gsap.utils.toArray<HTMLElement>('#main-content [data-reveal]')
        if (items.length) {
          gsap.set(items, { opacity: 0, y: 28 })
          ScrollTrigger.batch(items, {
            start: 'top 92%',
            once: true,
            onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, overwrite: true }),
          })
        }

        document.querySelectorAll<HTMLElement>('#main-content [data-scrub-text]').forEach((block) => {
          const split = SplitText.create(block, { type: 'words' })
          gsap.fromTo(split.words, { opacity: 0.18 }, {
            opacity: 1,
            ease: 'none',
            stagger: 0.15,
            scrollTrigger: { trigger: block, start: 'top 82%', end: 'bottom 58%', scrub: true },
          })
        })
      })
    }

    nuxtApp.hook('page:start', () => context?.revert())
    nuxtApp.hook('page:finish', () => { requestAnimationFrame(() => { run(); ScrollTrigger.refresh() }) })
    run()
  })
})
