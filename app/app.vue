<script setup lang="ts">
import { gsap } from 'gsap'

// Page change: a lemon curtain rises over the old page, then drops away to reveal the new one.
const curtain = ref<HTMLElement | null>(null)
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A background tab pauses requestAnimationFrame (and so GSAP): never let that block navigation.
const once = (done: () => void, maxMs: number) => {
  let called = false
  const finish = () => {
    if (called) return
    called = true
    done()
  }
  setTimeout(finish, maxMs)
  return finish
}

const pageTransition = {
  name: 'page',
  mode: 'out-in' as const,
  css: false,
  onLeave(_el: Element, _done: () => void) {
    const done = once(_done, 1200)
    if (reduced() || !curtain.value) return done()
    gsap.set(curtain.value, { yPercent: 100, display: 'flex' })
    gsap.to(curtain.value, {
      yPercent: 0,
      duration: 0.5,
      ease: 'expo.inOut',
      onComplete: () => {
        window.scrollTo(0, 0) // jump while the curtain hides it
        done()
      }
    })
  },
  onEnter(el: Element, _done: () => void) {
    const done = once(_done, 1500)
    if (reduced() || !curtain.value) return done()
    gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: 'expo.out', clearProps: 'transform,opacity' })
    gsap.to(curtain.value, {
      yPercent: -100,
      duration: 0.6,
      delay: 0.1,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(curtain.value, { display: 'none' })
        done()
      }
    })
  }
}
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <div
      ref="curtain"
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-9997 hidden items-center justify-center bg-lemon"
    >
      <span class="font-heading text-5xl text-ink sm:text-7xl">
        Ilham Kurniawan<span class="text-pink-deep">.</span>
      </span>
    </div>

    <NuxtLayout>
      <NuxtPage :page-key="route => route.path" :transition="pageTransition" />
    </NuxtLayout>
  </UApp>
</template>
