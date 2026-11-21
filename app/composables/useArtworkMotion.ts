import type { Ref } from 'vue'

export function useArtworkMotion(root: Readonly<Ref<HTMLElement | null>>) {
  useEditorialMotion(root, ({ root: element, gsap, context, ScrollTrigger }) => {
    if (!ScrollTrigger) return
    const images = [...element.querySelectorAll<HTMLElement>('[data-artwork]')].slice(0, 8)
    const reveal = context.add('revealArtwork', (batch: Element[]) => {
      const fresh = batch.filter(target => target.isConnected && !target.closest(':focus-within'))
      if (!fresh.length) return

      gsap.fromTo(fresh, { clipPath: 'inset(0% 0% 22% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.62,
        stagger: 0.06,
        ease: 'expo.out',
        overwrite: 'auto',
        clearProps: 'clipPath',
      })
    })

    if (images.length) ScrollTrigger.batch(images, {
      start: 'top 92%',
      once: true,
      interval: 0.08,
      batchMax: 3,
      onEnter: batch => reveal(batch),
    })
  }, true)
}
