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

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
};

let cleanupEventListeners: (() => void) | null = null;

const setupEventListeners = () => {
  if (!props.enabled) return;

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

  const handleMouseMove = (e: MouseEvent) => {
    if (!spotlightRef.value) return;

    const container = document.querySelector(props.containerSelector);
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseInside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    isInsideSection.value = mouseInside;
    const cards = document.querySelectorAll(props.cardSelector) as NodeListOf<HTMLElement>;

    if (!mouseInside) {
      gsap.to(spotlightRef.value, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
      cards.forEach(card => {
        card.style.setProperty('--glow-intensity', '0');
      });
      return;
    }

    const { proximity, fadeDistance } = calculateSpotlightValues(props.spotlightRadius);
    let minDistance = Infinity;

    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      const distance =
        Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
      const effectiveDistance = Math.max(0, distance);

      minDistance = Math.min(minDistance, effectiveDistance);

      let glowIntensity = 0;
      if (effectiveDistance <= proximity) {
        glowIntensity = 1;
      } else if (effectiveDistance <= fadeDistance) {
        glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
      }

      updateCardGlowProperties(card, e.clientX, e.clientY, glowIntensity);
    });

    gsap.to(spotlightRef.value, {
      left: e.clientX,
      top: e.clientY,
      duration: 0.1,
      ease: 'power2.out'
    });

    const targetOpacity =
      minDistance <= proximity
        ? 0.8
        : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
          : 0;

    gsap.to(spotlightRef.value, {
      opacity: targetOpacity,
      duration: targetOpacity > 0 ? 0.2 : 0.5,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    isInsideSection.value = false;
    (document.querySelectorAll(props.cardSelector) as NodeListOf<HTMLElement>).forEach(card => {
      card.style.setProperty('--glow-intensity', '0');
    });
    if (spotlightRef.value) {
      gsap.to(spotlightRef.value, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);

  cleanupEventListeners = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseleave', handleMouseLeave);
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
