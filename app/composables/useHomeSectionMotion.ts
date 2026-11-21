import type { Ref } from 'vue'
import { SplitText } from 'gsap/SplitText'

export function useHomeSectionMotion(home: Readonly<Ref<HTMLElement | null>>) {
  const { locale } = useI18n()

  useEditorialMotion(home, ({ root, gsap, ScrollTrigger, finePointer }) => {
    if (!ScrollTrigger) return
    gsap.registerPlugin(SplitText)
    const compact = () => window.matchMedia('(max-width: 47.99rem)').matches
    // Decorative parallax and rule scrubs run only with a fine pointer; touch keeps the essentials
    // (name clip, statement, band, line reveals) so mid-range phones stay smooth.
    const hero = root.querySelector('.home-hero')
    const work = root.querySelector('#selected-work')
    const workTitle = work?.querySelector('.editorial-title')

    if (hero && work && workTitle) {
      const heroExit = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'home-hero-to-work',
          trigger: hero,
          start: 'clamp(top 6%)',
          endTrigger: root.querySelector('.home-statement') ?? work,
          end: 'top 30%',
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

      if (finePointer) {
        heroExit
          .to(hero.querySelector('.home-portrait'), { y: () => compact() ? 20 : 74, duration: 0.9 }, 0)
          .to(hero.querySelector('.home-mascot'), { y: () => compact() ? 8 : 28, duration: 0.78 }, 0.03)

        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { id: 'home-work-entry', trigger: work, start: 'top 96%', end: 'top 48%', scrub: 0.42 },
        })
          .fromTo(work, { '--home-scroll-rule': 0 }, { '--home-scroll-rule': 1, duration: 0.62 }, 0)
          .fromTo(workTitle, { y: () => compact() ? 14 : 36 }, { y: 0, duration: 0.56 }, 0.08)
      } else {
        gsap.set(work, { '--home-scroll-rule': 1 })
      }
    }

    // Sticky statement: a tilted field of words flies toward the viewer while the title dissolves, and the
    // next section slides over the stuck band. The motion keeps running through that cover phase (run spacer
    // plus one viewport), so the band is never a static, empty white screen.
    const statement = root.querySelector('.home-statement')
    const field = statement?.querySelector('.statement-field')
    const statementWords = statement?.querySelectorAll('.statement-title span')
    const statementRun = root.querySelector<HTMLElement>('.statement-run')
    if (statement && field && statementWords?.length && statementRun) {
      gsap.set(field, { rotationX: 62, rotationZ: -18, yPercent: -8, z: -600 })
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'home-statement',
          trigger: statementRun,
          start: 'top bottom',
          end: () => `+=${statementRun.offsetHeight + window.innerHeight}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })
        .from(statementWords, { yPercent: 40, opacity: 0, stagger: 0.1, duration: 0.2 }, 0)
        .to(field, { opacity: 0.6, duration: 0.2 }, 0.05)
        .to(field, { rotationX: 50, rotationZ: -12, z: 250, yPercent: 10, duration: 1 }, 0)
        .to(statementWords, { opacity: 0, yPercent: -24, stagger: 0.07, duration: 0.22 }, 0.62)
    }

    // Section titles rise line by line out of a mask, once.
    root.querySelectorAll<HTMLElement>('.editorial-title').forEach((title) => {
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
          scrollTrigger: { trigger: title, start: 'top 88%', once: true },
        }),
      })
    })

    // The inverted band widens from inset to full-bleed as it scrolls in.
    root.querySelectorAll('[data-inverse-band]').forEach((band) => {
      gsap.fromTo(band, { '--band-inset': 1 }, {
        '--band-inset': 0,
        ease: 'none',
        scrollTrigger: { trigger: band, start: 'top 95%', end: 'top 35%', scrub: 0.4 },
      })
    })

    const services = root.querySelector('#features')
    if (services) {
      if (finePointer) {
        gsap.fromTo(services, { '--home-scroll-rule': 0 }, {
          '--home-scroll-rule': 1,
          ease: 'none',
          scrollTrigger: { id: 'home-services-rule', trigger: services, start: 'top 96%', end: 'top 58%', scrub: 0.32 },
        })
      } else {
        gsap.set(services, { '--home-scroll-rule': 1 })
      }

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
    if (skills && groups?.length && !finePointer) {
      gsap.set(skills, { '--home-scroll-rule': 1 })
    } else if (skills && groups?.length) {
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
