import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, type Ref } from "vue";

/**
 * Reusable scroll reveal hook for individual pages or components.
 * Finds all elements with the `.scroll-section` class inside the container
 * and applies entrance and staggered reveal animations.
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
        const staggerItems = section.querySelectorAll(".stagger-item");

        // Create a single coordinated animation timeline for this section
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%", // triggers when top of section is 88% from the top of the viewport
            toggleActions: "play none none reverse", // plays entry animation forward, reverses back when scrolling past the start going up
          },
        });

        // 1. Entry Animation: slide/fade up as section enters viewport
        tl.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            // Strip inline transform/will-change after reveal so nested
            // glass cards keep working backdrop-filter (no backdrop root left).
            clearProps: "transform,willChange",
          }
        );

        // 2. Staggered Entry for child elements containing the .stagger-item class
        if (staggerItems.length > 0) {
          tl.fromTo(
            staggerItems,
            { opacity: 0, y: 25 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.6,
              ease: "power3.out",
              clearProps: "transform,willChange",
            },
            "-=0.6" // overlaps with parent reveal for seamless entry
          );
        }
      });
    });

    // Recalculate ScrollTrigger heights after a short timeout to let the DOM settle
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  });

  onUnmounted(() => {
    if (ctx) {
      ctx.revert();
    }
  });
}

