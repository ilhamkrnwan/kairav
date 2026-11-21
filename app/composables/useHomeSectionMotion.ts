import type { Ref } from 'vue'

export function useHomeSectionMotion(home: Readonly<Ref<HTMLElement | null>>) {
  const { locale } = useI18n()

  useEditorialMotion(home, ({ root, gsap, ScrollTrigger }) => {
    if (!ScrollTrigger) return
    const compact = () => window.matchMedia('(max-width: 47.99rem)').matches
    const hero = root.querySelector('.home-hero')
    const work = root.querySelector('#selected-work')
    const workTitle = work?.querySelector('.editorial-title')

    if (hero && work && workTitle) {
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'home-hero-to-work',
          trigger: hero,
          start: 'clamp(top 6%)',
          endTrigger: work,
          end: 'top 48%',
          scrub: 0.42,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(hero.querySelectorAll('.home-name-mask'), { yPercent: 0, clipPath: 'inset(0% 0% 0% 0%)' }, {
          yPercent: () => compact() ? -10 : -24,
          clipPath: () => compact() ? 'inset(0% 0% 48% 0%)' : 'inset(0% 0% 100% 0%)',
          duration: 0.6,
          stagger: 0.09,
        }, 0)
        .to(hero.querySelector('.home-portrait'), {
          y: () => compact() ? 20 : 74,
          duration: 0.9,
        }, 0)
        .to(hero.querySelector('.home-mascot'), {
          y: () => compact() ? 8 : 28,
          duration: 0.78,
        }, 0.03)
        .fromTo(work, { '--home-scroll-rule': 0 }, { '--home-scroll-rule': 1, duration: 0.62 }, 0.36)
        .fromTo(workTitle, { y: () => compact() ? 14 : 36 }, { y: 0, duration: 0.56 }, 0.44)
    }

    const services = root.querySelector('#features')
    if (services) {
      gsap.fromTo(services, { '--home-scroll-rule': 0 }, {
        '--home-scroll-rule': 1,
        ease: 'none',
        scrollTrigger: {
          id: 'home-services-rule',
          trigger: services,
          start: 'top 96%',
          end: 'top 58%',
          scrub: 0.32,
        },
      })

      services.querySelectorAll('.home-service-link').forEach((row, index) => {
        const thumbnail = row.querySelector('img')
        const copy = row.querySelector('div')
        if (!thumbnail || !copy) return

        gsap.timeline({
          defaults: { ease: 'expo.out' },
          scrollTrigger: { id: `home-service-${index + 1}`, trigger: row, start: 'top 90%', once: true },
        })
          .from(thumbnail, {
            x: compact() ? -12 : -32,
            clipPath: 'inset(0% 24% 0% 0%)',
            immediateRender: false,
            duration: 0.62,
            clearProps: 'transform,clipPath',
          }, 0)
          .from(copy, {
            x: compact() ? 8 : 24,
            immediateRender: false,
            duration: 0.52,
            clearProps: 'transform',
          }, 0.07)
      })
    }

    const skills = root.querySelector('#skills')
    const groups = skills?.querySelectorAll('dl > div')
    if (skills && groups?.length) {
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'home-skills',
          trigger: skills,
          start: 'top 94%',
          end: 'center 60%',
          scrub: 0.36,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(skills, { '--home-scroll-rule': 0 }, { '--home-scroll-rule': 1, duration: 0.52 }, 0)
        .fromTo(groups, { y: () => compact() ? 10 : 22 }, { y: 0, duration: 0.5, stagger: 0.12 }, 0.24)
    }

    return watch(locale, () => ScrollTrigger.refresh(true), { flush: 'post' })
  }, true)
}
