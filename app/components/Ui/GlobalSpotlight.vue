<script setup lang="ts">
import { gsap } from "gsap";
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";

interface Props {
  containerSelector?: string;
  cardSelector?: string;
  glowColor?: string;
  spotlightRadius?: number;
  enabled?: boolean;
  /** When true: only manages the cursor ring (no aurora, no card glow).
   *  Use this for the layout-level instance so the ring is always global. */
  ringOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  containerSelector: ".features-container",
  cardSelector: ".animated-card",
  glowColor: "251, 191, 36",
  spotlightRadius: 400,
  enabled: true,
  ringOnly: false,
});

const spotlightRef = ref<HTMLDivElement | null>(null);
const isInsideSection = ref(false);

// ─── Singleton ring tag ───────────────────────────────────────────────────────
// Only ONE cursor ring should exist in the DOM at any time.
// We mark it with data-spotlight-ring so any instance can find / reuse it.
const RING_ATTR = "data-spotlight-ring";

interface SpotlightCardMetrics {
  element: HTMLElement;
  rect: DOMRect;
  centerX: number;
  centerY: number;
  radius: number;
}

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  rect: DOMRect,
  mouseX: number,
  mouseY: number,
  glow: number,
) => {
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
};

let cleanupEventListeners: (() => void) | null = null;

const setupEventListeners = () => {
  if (!props.enabled) return;

  // ── Shared state ───────────────────────────────────────────────────────────
  let pendingPointer: { clientX: number; clientY: number } | null = null;
  let isMouseDown  = false;
  let pointerOnPage = false;

  // ── Only relevant for aurora mode (ringOnly === false) ─────────────────────
  let container: HTMLElement | null = null;
  let containerRect: DOMRect | null = null;
  let cardMetrics: SpotlightCardMetrics[] = [];
  let resizeObserver: ResizeObserver | null = null;
  let mutationObserver: MutationObserver | null = null;
  let metricsDirty = true;

  let animateSpotlightX: ((value: number) => gsap.core.Tween) | null = null;
  let animateSpotlightY: ((value: number) => gsap.core.Tween) | null = null;
  let animateSpotlightOpacity: ((value: number) => gsap.core.Tween) | null = null;
  let spotlight: HTMLDivElement | null = null;

  // Velocity tracking for aurora mode
  let lastPointerX = 0;
  let lastPointerY = 0;
  let lastPointerTime = 0;
  let currentVelocity = 0;
  const MIN_VELOCITY = 0.5; // pixels/ms
  const MAX_VELOCITY = 1.8; // pixels/ms

  // ── Only relevant for ring mode (ringOnly === true) ────────────────────────
  let cursorRing: HTMLDivElement | null = null;
  let ringOwner = false;
  let animateRingX: ((value: number) => gsap.core.Tween) | null = null;
  let animateRingY: ((value: number) => gsap.core.Tween) | null = null;
  let animateRingOpacity: ((value: number) => gsap.core.Tween) | null = null;
  let animateRingScale: ((value: number) => gsap.core.Tween) | null = null;

  const markMetricsDirty = () => { metricsDirty = true; };

  const getCards = () => {
    if (!container) return [];
    return Array.from(container.querySelectorAll(props.cardSelector)) as HTMLElement[];
  };

  const refreshMetrics = () => {
    container = document.querySelector(props.containerSelector);
    if (!container) {
      containerRect = null;
      cardMetrics = [];
      metricsDirty = false;
      return;
    }
    containerRect = container.getBoundingClientRect();
    cardMetrics = getCards().map((card) => {
      const rect = card.getBoundingClientRect();
      return {
        element: card,
        rect,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        radius: Math.max(rect.width, rect.height) / 2,
      };
    });
    metricsDirty = false;
  };

  const resetCardGlow = () => {
    cardMetrics.forEach(({ element }) => {
      element.style.setProperty("--glow-intensity", "0");
    });
  };

  // ─── Setup Aurora Spotlight (aurora mode only) ─────────────────────────────
  if (!props.ringOnly) {
    const bgContainer = document.querySelector("[data-aurora-bg]") as HTMLElement | null;
    const auroraParent = bgContainer ?? document.body;

    spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: ${bgContainer ? "absolute" : "fixed"};
      width: 900px;
      height: 900px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${props.glowColor}, 0.12) 0%,
        rgba(${props.glowColor}, 0.06) 30%,
        rgba(${props.glowColor}, 0.02) 55%,
        transparent 70%
      );
      z-index: 0;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      will-change: left, top, opacity;
    `;
    auroraParent.appendChild(spotlight);
    spotlightRef.value = spotlight;

    animateSpotlightX = gsap.quickTo(spotlight, "left", { duration: 1.8, ease: "power1.out" });
    animateSpotlightY = gsap.quickTo(spotlight, "top",  { duration: 1.8, ease: "power1.out" });
    animateSpotlightOpacity = gsap.quickTo(spotlight, "opacity", { duration: 0.4, ease: "power2.out" });

    refreshMetrics();

    if (container) {
      resizeObserver = new ResizeObserver(markMetricsDirty);
      resizeObserver.observe(container);
      getCards().forEach((card) => resizeObserver?.observe(card));

      mutationObserver = new MutationObserver(() => {
        markMetricsDirty();
        if (!container) return;
        resizeObserver?.disconnect();
        resizeObserver?.observe(container);
        getCards().forEach((card) => resizeObserver?.observe(card));
      });
      mutationObserver.observe(container, { childList: true, subtree: true });
    }
  }

  // ─── Setup Cursor Ring (ring mode only) ────────────────────────────────────
  if (props.ringOnly) {
    cursorRing = document.querySelector(`[${RING_ATTR}]`) as HTMLDivElement | null;

    if (!cursorRing) {
      ringOwner = true;
      cursorRing = document.createElement("div");
      cursorRing.className = "global-spotlight-ring";
      cursorRing.setAttribute(RING_ATTR, "true");
      cursorRing.style.cssText = `
        position: fixed;
        width: 32px;
        height: 32px;
        border: 1.5px solid rgba(${props.glowColor}, 0.75);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999999;
        opacity: 0;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%) scale(1);
        will-change: left, top, opacity, transform;
      `;
      document.body.appendChild(cursorRing);
    }

    animateRingX = gsap.quickTo(cursorRing, "left",    { duration: 0.04, ease: "none" });
    animateRingY = gsap.quickTo(cursorRing, "top",     { duration: 0.04, ease: "none" });
    animateRingOpacity = gsap.quickTo(cursorRing, "opacity", { duration: 0.25, ease: "power2.out" });
    animateRingScale   = gsap.quickTo(cursorRing, "scale",   { duration: 0.2,  ease: "power2.out" });
  }

  // ─── GSAP tick ─────────────────────────────────────────────────────────────
  const tickHandler = () => {
    // ── Ring (ring mode only) ────────────────────────────────────────────────
    if (props.ringOnly && cursorRing) {
      if (pendingPointer && pointerOnPage) {
        animateRingX?.(pendingPointer.clientX);
        animateRingY?.(pendingPointer.clientY);
        animateRingOpacity?.(0.85);
        animateRingScale?.(isMouseDown ? 0.7 : 1);
      } else {
        animateRingOpacity?.(0);
        animateRingScale?.(1);
      }
    }

    // ── Aurora + card glow (aurora mode only) ────────────────────────────────
    if (!props.ringOnly) {
      if (metricsDirty) refreshMetrics();

      // Velocity decay if mouse stops moving
      const now = performance.now();
      const timeSinceLastMove = lastPointerTime > 0 ? now - lastPointerTime : 0;
      if (timeSinceLastMove > 30) {
        currentVelocity = currentVelocity * Math.exp(-(timeSinceLastMove - 30) * 0.015);
      }

      if (pendingPointer && isInsideSection.value && containerRect) {
        const { clientX, clientY } = pendingPointer;
        const { proximity, fadeDistance } = calculateSpotlightValues(props.spotlightRadius);
        let minDistance = Infinity;

        cardMetrics.forEach(({ element, rect, centerX, centerY, radius }) => {
          const distance = Math.hypot(clientX - centerX, clientY - centerY) - radius;
          const effectiveDistance = Math.max(0, distance);
          minDistance = Math.min(minDistance, effectiveDistance);

          let glowIntensity = 0;
          if (effectiveDistance <= proximity) {
            glowIntensity = 1;
          } else if (effectiveDistance <= fadeDistance) {
            glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
          }
          updateCardGlowProperties(element, rect, clientX, clientY, glowIntensity);
        });

        animateSpotlightX?.(clientX);
        animateSpotlightY?.(clientY);

        // Calculate opacity based on velocity
        const velocityMultiplier = Math.max(0, Math.min(1, (currentVelocity - MIN_VELOCITY) / (MAX_VELOCITY - MIN_VELOCITY)));

        const baseOpacity =
          minDistance <= proximity
            ? 0.7
            : minDistance <= fadeDistance
              ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.7
              : 0;

        animateSpotlightOpacity?.(baseOpacity * velocityMultiplier);
      } else {
        animateSpotlightOpacity?.(0);
        resetCardGlow();
      }
    }
  };

  gsap.ticker.add(tickHandler);

  // ─── Event listeners ───────────────────────────────────────────────────────
  const handleMouseMove = (e: MouseEvent) => {
    pointerOnPage = true;
    pendingPointer = { clientX: e.clientX, clientY: e.clientY };

    if (!props.ringOnly && containerRect) {
      isInsideSection.value =
        e.clientX >= containerRect.left &&
        e.clientX <= containerRect.right &&
        e.clientY >= containerRect.top &&
        e.clientY <= containerRect.bottom;

      // Track velocity for aurora mode
      const now = performance.now();
      if (lastPointerTime > 0 && now - lastPointerTime < 200) {
        const dt = now - lastPointerTime;
        if (dt > 0) {
          const dx = e.clientX - lastPointerX;
          const dy = e.clientY - lastPointerY;
          const dist = Math.hypot(dx, dy);
          const instantVelocity = dist / dt; // px per ms
          currentVelocity = currentVelocity + (instantVelocity - currentVelocity) * 0.35;
        }
      } else {
        currentVelocity = 0;
      }
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastPointerTime = now;
    }
  };

  const handleMouseLeave = () => {
    pointerOnPage = false;
    isInsideSection.value = false;
    pendingPointer = null;
    if (!props.ringOnly) {
      resetCardGlow();
      animateSpotlightOpacity?.(0);
      currentVelocity = 0;
      lastPointerTime = 0;
    } else {
      animateRingOpacity?.(0);
    }
  };

  const handleMouseDown = () => { isMouseDown = true; };
  const handleMouseUp   = () => { isMouseDown = false; };

  document.addEventListener("mousemove",  handleMouseMove,  { passive: true });
  document.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("mousedown",  handleMouseDown);
  document.addEventListener("mouseup",    handleMouseUp);
  if (!props.ringOnly) {
    window.addEventListener("resize", markMetricsDirty, { passive: true });
    window.addEventListener("scroll", markMetricsDirty, { passive: true });
  }

  // ─── Cleanup ───────────────────────────────────────────────────────────────
  cleanupEventListeners = () => {
    document.removeEventListener("mousemove",  handleMouseMove);
    document.removeEventListener("mouseleave", handleMouseLeave);
    document.removeEventListener("mousedown",  handleMouseDown);
    document.removeEventListener("mouseup",    handleMouseUp);
    if (!props.ringOnly) {
      window.removeEventListener("resize", markMetricsDirty);
      window.removeEventListener("scroll", markMetricsDirty);
    }

    gsap.ticker.remove(tickHandler);
    resizeObserver?.disconnect();
    mutationObserver?.disconnect();

    // Remove aurora
    if (spotlight?.parentNode) {
      spotlight.parentNode.removeChild(spotlight);
    }
    spotlightRef.value = null;

    // Remove ring only if this instance created it
    if (props.ringOnly && ringOwner && cursorRing?.parentNode) {
      cursorRing.parentNode.removeChild(cursorRing);
    }
  };
};

onMounted(() => {
  const route = useRoute();
  console.log('[GlobalSpotlight] onMounted called. ringOnly:', props.ringOnly, 'enabled:', props.enabled, 'route:', route.path);
  nextTick(() => {
    setupEventListeners();
  });
});

onUnmounted(() => {
  cleanupEventListeners?.();
});

watch(
  () => props.enabled,
  () => {
    cleanupEventListeners?.();
    if (props.enabled) {
      setupEventListeners();
    }
  },
);
</script>

<template>
  <div style="display: none"></div>
</template>

<style scoped>
/* Component is invisible, only manages spotlight effect */
</style>
