import type { RouterConfig } from "@nuxt/schema";
import { useNuxtApp, useRouter } from "#app";
import { START_LOCATION } from "vue-router";

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const samePage = to.path === from.path;

    const position = () => {
      if (savedPosition) return savedPosition;

      if (to.hash) {
        const scrollInset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
        return {
          el: to.hash,
          top: Number.isFinite(scrollInset) ? scrollInset : 24,
          behavior: samePage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "smooth" as const
            : "instant" as const,
        };
      }

      if (samePage && !from.hash) return false as const;
      return { top: 0, left: 0, behavior: "instant" as const };
    };

    if (samePage || from === START_LOCATION) return position();

    // Nuxt resolves the destination after the navigation curtain has covered the old page.
    const nuxtApp = useNuxtApp();
    const router = useRouter();
    return new Promise((resolve) => {
      const removeError = nuxtApp.hook("app:error", scroll);
      const removeLoading = nuxtApp.hook("page:loading:end", scroll);
      const watchdog = window.setTimeout(scroll, 5000);

      function scroll() {
        window.clearTimeout(watchdog);
        removeError();
        removeLoading();
        requestAnimationFrame(() => {
          if (router.currentRoute.value.fullPath !== to.fullPath) {
            resolve(false);
            return;
          }
          resolve(position());

          // Vue Router applies the resolved position before the next paint.
          requestAnimationFrame(() => {
            if (router.currentRoute.value.fullPath === to.fullPath) {
              void nuxtApp.callHook("kairav:page-scroll", to.fullPath);
            }
          });
        });
      }
    });
  },
};
