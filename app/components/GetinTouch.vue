<script setup lang="ts">
const { t, locale } = useI18n()
const contact = useTemplateRef<HTMLElement>('contact')
const whatsapp = 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20punya%20ide%20proyek%20digital%20dan%20ingin%20konsultasi.'

useEditorialMotion(contact, ({ root, gsap, ScrollTrigger }) => {
  if (!ScrollTrigger) return

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: root,
      start: 'top 94%',
      end: 'clamp(top 50%)',
      scrub: 0.36,
      invalidateOnRefresh: true,
    },
  })
    .fromTo(root.children, {
      y: () => window.matchMedia('(max-width: 47.99rem)').matches ? 12 : 24,
    }, { y: 0, duration: 0.57, stagger: 0.06 }, 0.18)

  return watch(locale, () => ScrollTrigger.refresh(true), { flush: 'post' })
}, true)
</script>

<template>
  <div class="inverse-band">
  <section id="contact" ref="contact" class="site-frame editorial-section contact-strip">
    <div>
      <h2 class="editorial-title">{{ t('cta.title') }}</h2>
      <p class="mt-4 max-w-[60ch] text-muted">{{ t('cta.description') }}</p>
    </div>
    <div class="flex flex-wrap gap-2.5">
      <UiArrowButton :href="whatsapp" target="_blank" rel="noopener noreferrer" icon="lucide:arrow-up-right">
        {{ t('cta.button_consult') }}
      </UiArrowButton>
      <UiArrowButton to="/contact" variant="secondary">
        {{ t('cta.button_contact') }}
      </UiArrowButton>
    </div>
  </section>
  </div>
</template>
