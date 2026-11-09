import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { nextTick, onMounted, onUnmounted, watch, type Ref } from "vue";

/**
 * Bold scroll choreography for a page or component.
 *
 *  - `.scroll-section`  big tilted rise, alternating tilt direction
 *  - `.stagger-item`    springy sticker pop inside its section
 *  - `h1`, `h2.tracking-tight`, `[data-split]`
 *                       masked word-by-word rise (SplitText); re-split when the
 *                       language changes so the new words rise in again
 *  - `[data-highlight]` lemon highlighter sweeps across the text
 *  - `[data-parallax]`  image drifts against the scroll (put it on an <img>
 *                       inside an `overflow-hidden` frame, scaled up a bit)
 *  - `[data-float]`     endless gentle bob, like a sticker on a wobbly wall
 *  - `[data-magnetic]`  pulled toward the pointer (fine pointers only)
 *
 * Reduced motion: nothing is touched, content stays visible and in place.
 */
export function useScrollReveal(containerRef?: Ref<HTMLElement | null>) {
  const { locale } = useI18n();
  let ctx: gsap.Context | null = null;
  let splits: SplitText[] = [];

  onMounted(() => {
    if (!import.meta.client) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    const root: ParentNode = containerRef?.value || document;
    const all = (selector: string) =>
      gsap.utils.toArray(root.querySelectorAll(selector)) as HTMLElement[];

    // Masked word rise. Tight heading leading would clip descenders (g, y, p) and the
    // wavy underline, so each mask gets padding that is cancelled by a negative margin.
    const splitHeadings = () => {
      splits.forEach((s) => s.revert());
      splits = all("h1, h2.tracking-tight, [data-split]").map((el) =>
        SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            // Headings like <h2><span class="text-6xl"> carry their size on an inner span, so
            // em padding on the mask would be relative to the wrong font: measure the word.
            self.masks?.forEach((m: HTMLElement) => {
              const word = m.querySelector<HTMLElement>('div[style*="inline-block"]');
              const fs = parseFloat(getComputedStyle(word || m).fontSize) || 16;
              const y = `${(fs * 0.25).toFixed(1)}px`;
              const x = `${(fs * 0.12).toFixed(1)}px`;
              m.style.padding = `${y} ${x}`;
              m.style.margin = `-${y} -${x}`;
            });
            return gsap.from(self.words, {
              yPercent: 115,
              rotate: 7,
              transformOrigin: "0% 100%",
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.06,
              scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
            });
          },
        })
      );
    };

    ctx = gsap.context(() => {
      // 1. Sections + their stagger items
      all(".scroll-section").forEach((section, i) => {
        const items = section.querySelectorAll(".stagger-item");
        const tilt = i % 2 === 0 ? 2.5 : -2.5;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top 90%", toggleActions: "play none none none" },
        });

        tl.fromTo(
          section,
          { y: 110, rotate: tilt, scale: 0.94, opacity: 0, transformOrigin: "50% 100%" },
          {
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            // Strip inline transform so nested effects aren't trapped in a stacking context.
            clearProps: "transform,willChange",
          }
        );

        if (items.length) {
          tl.fromTo(
            items,
            { opacity: 0, y: 70, scale: 0.82, rotate: () => gsap.utils.random(-5, 5) },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              stagger: 0.1,
              duration: 0.9,
              ease: "back.out(1.8)",
              clearProps: "transform,willChange",
            },
            "-=0.8"
          );
        }
      });

      // 2. Headings
      splitHeadings();

      // 3. Highlighter sweep (clearProps hands the final width back to CSS)
      all("[data-highlight]").forEach((el) => {
        gsap.fromTo(
          el,
          { backgroundSize: "0% 100%" },
          {
            backgroundSize: "100% 100%",
            duration: 0.9,
            delay: 0.3,
            ease: "power3.inOut",
            clearProps: "backgroundSize",
            scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
          }
        );
      });

      // 4. Parallax drift
      all("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );
      });

      // 5. Idle float
      all("[data-float]").forEach((el, i) => {
        gsap.to(el, {
          y: -10,
          rotate: `+=${i % 2 ? -1.5 : 1.5}`,
          duration: 2.4 + (i % 3) * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      // 6. Magnetic pull
      if (window.matchMedia("(pointer: fine)").matches) {
        all("[data-magnetic]").forEach((el) => {
          const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.45)" });
          const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.45)" });
          el.addEventListener("pointermove", (e) => {
            const r = el.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * 0.28);
            y((e.clientY - (r.top + r.height / 2)) * 0.28);
          });
          el.addEventListener("pointerleave", () => {
            x(0);
            y(0);
          });
        });
      }
    }, containerRef?.value || undefined);

    // New language: SplitText replaced the heading text nodes, so re-split once Vue has patched them.
    watch(locale, async () => {
      await nextTick();
      ctx?.add(splitHeadings);
      ScrollTrigger.refresh();
    });

    // Heights shift once fonts and images settle.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 300);
  });

  onUnmounted(() => {
    splits.forEach((s) => s.revert());
    ctx?.revert();
  });
}
