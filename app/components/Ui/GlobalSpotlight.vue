<script setup lang="ts">
import { gsap } from 'gsap';
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';

interface Props {
  containerSelector?: string;
  cardSelector?: string;
  glowColor?: string;
  spotlightRadius?: number;
  enabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  containerSelector: '.features-container',
  cardSelector: '.animated-card',
  glowColor: '251, 191, 36',
  spotlightRadius: 400,
  enabled: true
});

const spotlightRef = ref<HTMLDivElement | null>(null);
const isInsideSection = ref(false);

interface SpotlightCardMetrics {
  element: HTMLElement;
  rect: DOMRect;
  centerX: number;
  centerY: number;
  radius: number;
}

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, rect: DOMRect, mouseX: number, mouseY: number, glow: number) => {
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
};

let cleanupEventListeners: (() => void) | null = null;

const setupEventListeners = () => {
  if (!props.enabled) return;

  let container: HTMLElement | null = null;
  let containerRect: DOMRect | null = null;
  let cardMetrics: SpotlightCardMetrics[] = [];
  let resizeObserver: ResizeObserver | null = null;
  let mutationObserver: MutationObserver | null = null;
  let mouseMoveFrame: number | null = null;
  let pendingPointer: { clientX: number; clientY: number } | null = null;
  let metricsDirty = true;
  let animateSpotlightX: ((value: number) => gsap.core.Tween) | null = null;
  let animateSpotlightY: ((value: number) => gsap.core.Tween) | null = null;
  let animateSpotlightOpacity: ((value: number) => gsap.core.Tween) | null = null;

  const markMetricsDirty = () => {
    metricsDirty = true;
  };

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
    cardMetrics = getCards().map(card => {
      const rect = card.getBoundingClientRect();
      return {
        element: card,
        rect,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
        radius: Math.max(rect.width, rect.height) / 2
      };
    });
    metricsDirty = false;
  };

  const resetCardGlow = () => {
    cardMetrics.forEach(({ element }) => {
      element.style.setProperty('--glow-intensity', '0');
    });
  };

  const spotlight = document.createElement('div');
  spotlight.className = 'global-spotlight';
  spotlight.style.cssText = `
    position: fixed;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle,
      rgba(${props.glowColor}, 0.15) 0%,
      rgba(${props.glowColor}, 0.08) 15%,
      rgba(${props.glowColor}, 0.04) 25%,
      rgba(${props.glowColor}, 0.02) 40%,
      rgba(${props.glowColor}, 0.01) 65%,
      transparent 70%
    );
    z-index: 1;
    opacity: 0;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
  `;
  document.body.appendChild(spotlight);
  spotlightRef.value = spotlight;
  animateSpotlightX = gsap.quickTo(spotlight, 'left', { duration: 0.1, ease: 'power2.out' });
  animateSpotlightY = gsap.quickTo(spotlight, 'top', { duration: 0.1, ease: 'power2.out' });
  animateSpotlightOpacity = gsap.quickTo(spotlight, 'opacity', { duration: 0.2, ease: 'power2.out' });

  refreshMetrics();

  if (container) {
    resizeObserver = new ResizeObserver(markMetricsDirty);
    resizeObserver.observe(container);
    getCards().forEach(card => resizeObserver?.observe(card));

    mutationObserver = new MutationObserver(() => {
      markMetricsDirty();
      if (!container) return;
      resizeObserver?.disconnect();
      resizeObserver?.observe(container);
      getCards().forEach(card => resizeObserver?.observe(card));
    });
    mutationObserver.observe(container, { childList: true, subtree: true });
  }

  const flushMouseMove = () => {
    mouseMoveFrame = null;

    if (!spotlightRef.value || !pendingPointer) return;

    if (metricsDirty) {
      refreshMetrics();
    }

    if (!containerRect) return;

    const { clientX, clientY } = pendingPointer;
    const mouseInside =
      clientX >= containerRect.left &&
      clientX <= containerRect.right &&
      clientY >= containerRect.top &&
      clientY <= containerRect.bottom;

    isInsideSection.value = mouseInside;

    if (!mouseInside) {
      animateSpotlightOpacity?.(0);
      resetCardGlow();
      return;
    }

    const { proximity, fadeDistance } = calculateSpotlightValues(props.spotlightRadius);
    let minDistance = Infinity;

    cardMetrics.forEach(({ element, rect, centerX, centerY, radius }) => {
      const distance =
        Math.hypot(clientX - centerX, clientY - centerY) - radius;
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

    const targetOpacity =
      minDistance <= proximity
        ? 0.8
        : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
          : 0;

    animateSpotlightOpacity?.(targetOpacity);
  };

  const handleMouseMove = (e: MouseEvent) => {
    pendingPointer = {
      clientX: e.clientX,
      clientY: e.clientY
    };

    if (mouseMoveFrame !== null) return;
    mouseMoveFrame = requestAnimationFrame(flushMouseMove);
  };

  const handleMouseLeave = () => {
    isInsideSection.value = false;
    pendingPointer = null;
    resetCardGlow();
    animateSpotlightOpacity?.(0);

    if (mouseMoveFrame !== null) {
      cancelAnimationFrame(mouseMoveFrame);
      mouseMoveFrame = null;
    }
  };

  document.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', markMetricsDirty, { passive: true });
  window.addEventListener('scroll', markMetricsDirty, { passive: true });

  cleanupEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('resize', markMetricsDirty);
    window.removeEventListener('scroll', markMetricsDirty);

    if (mouseMoveFrame !== null) {
      cancelAnimationFrame(mouseMoveFrame);
    }

    resizeObserver?.disconnect();
    mutationObserver?.disconnect();
    spotlightRef.value?.parentNode?.removeChild(spotlightRef.value);
    spotlightRef.value = null;
  };
};

onMounted(() => {
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
  }
);
</script>

<template>
  <div style="display: none;"></div>
</template>

<style scoped>
/* Component is invisible, only manages spotlight effect */
</style>
