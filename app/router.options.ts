import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return new Promise((resolve) => {
      // Small timeout to allow page transitions and DOM mounting to complete
      setTimeout(() => {
        resolve({ top: 0, left: 0, behavior: "instant" });
      }, 50);
    });
  },
};
