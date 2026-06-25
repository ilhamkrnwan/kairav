import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, type Ref } from "vue";

/**
 * Reusable scroll reveal hook for individual pages or components.
 * Finds all elements with the `.scroll-section` class inside the container
 * and applies entrance, exit, and staggered reveal animations.
 *
 * @param containerRef Optional Vue ref pointing to the container element to scope the animation search.
 */
export function useScrollReveal(containerRef?: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    if (!import.meta.client) return;

    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      // Scope search to the provided container or fall back to document
      const searchRoot = containerRef?.value || document;
      
      // Select sections specifically marked for scroll animation
      const sections = gsap.utils.toArray(
        searchRoot.querySelectorAll(".scroll-section")
      ) as HTMLElement[];

      sections.forEach((section) => {
        // 1. Exit Animation: parallax fade/slide up as section leaves viewport
        gsap.to(section, {
          opacity: 0,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => {
              const height = section.offsetHeight;
              const viewportHeight = window.innerHeight;
              // If the element is taller than 80% of the viewport, start fading only when its bottom starts leaving
              return height > viewportHeight * 0.8 ? "bottom 20%" : "top top";
            },
            end: "bottom top",
            scrub: true,
          },
        });

        // 2. Entry Animation: slide/fade up as section enters viewport
        gsap.fromTo(
          section,
          { y: 30, opacity: 0.85 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // 3. Staggered Entry for child elements containing the .stagger-item class
        const staggerItems = section.querySelectorAll(".stagger-item");
        if (staggerItems.length > 0) {
          gsap.set(staggerItems, { opacity: 0, y: 20 });

          ScrollTrigger.create({
            trigger: section,
            start: "top 95%",
            once: true,
            onEnter: () => {
              ScrollTrigger.batch(staggerItems, {
                start: "top 88%",
                onEnter: (batch) =>
                  gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: "power3.out",
                    overwrite: "auto",
                  }),
                onLeaveBack: (batch) =>
                  gsap.to(batch, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    overwrite: "auto",
                  }),
                onEnterBack: (batch) =>
                  gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: "power3.out",
                    overwrite: "auto",
                  }),
              });
            },
          });
        }
      });
    });

    // Recalculate heights after a short timeout to let the DOM settle
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });

  onUnmounted(() => {
    if (ctx) {
      ctx.revert();
    }
  });
}
