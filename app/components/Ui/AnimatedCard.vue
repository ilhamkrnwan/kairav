<script setup lang="ts">
import { gsap } from 'gsap';
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';

interface Props {
  glowColor?: string;
  particleCount?: number;
  enableParticles?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  enableBorderGlow?: boolean;
  clickEffect?: boolean;
  disableAnimations?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  glowColor: '251, 191, 36', // amber-400
  particleCount: 12,
  enableParticles: true,
  enableTilt: true,
  enableMagnetism: true,
  enableBorderGlow: true,
  clickEffect: true,
  disableAnimations: false
});

const cardRef = ref<HTMLDivElement | null>(null);
const particlesRef = ref<HTMLDivElement[]>([]);
const timeoutsRef = ref<ReturnType<typeof setTimeout>[]>([]);
const isHoveredRef = ref(false);
const memoizedParticles = ref<HTMLDivElement[]>([]);
const particlesInitialized = ref(false);
const magnetismAnimationRef = ref<gsap.core.Tween | null>(null);

const createParticleElement = (x: number, y: number): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'animated-particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${props.glowColor}, 1);
    box-shadow: 0 0 6px rgba(${props.glowColor}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const initializeParticles = () => {
  if (particlesInitialized.value || !cardRef.value || !props.enableParticles) return;

  const { width, height } = cardRef.value.getBoundingClientRect();
  memoizedParticles.value = Array.from({ length: props.particleCount }, () =>
    createParticleElement(Math.random() * width, Math.random() * height)
  );
  particlesInitialized.value = true;
};

const clearAllParticles = () => {
  timeoutsRef.value.forEach(clearTimeout);
  timeoutsRef.value = [];
  magnetismAnimationRef.value?.kill();

  particlesRef.value.forEach(particle => {
    gsap.to(particle, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'back.in(1.7)',
      onComplete: () => {
        particle.parentNode?.removeChild(particle);
      }
    });
  });
  particlesRef.value = [];
};

const animateParticles = () => {
  if (!cardRef.value || !isHoveredRef.value || !props.enableParticles) return;

  if (!particlesInitialized.value) {
    initializeParticles();
  }

  memoizedParticles.value.forEach((particle, index) => {
    const timeoutId = setTimeout(() => {
      if (!isHoveredRef.value || !cardRef.value) return;

      const clone = particle.cloneNode(true) as HTMLDivElement;
      cardRef.value.appendChild(clone);
      particlesRef.value.push(clone);

      gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

      gsap.to(clone, {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        rotation: Math.random() * 360,
        duration: 2 + Math.random() * 2,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });

      gsap.to(clone, {
        opacity: 0.3,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true
      });
    }, index * 100);

    timeoutsRef.value.push(timeoutId);
  });
};

const handleMouseEnter = () => {
  if (props.disableAnimations) return;

  isHoveredRef.value = true;
  animateParticles();

  if (cardRef.value) {
    gsap.to(cardRef.value, { y: -2, duration: 0.3, ease: 'power2.out' });
  }
};

const handleMouseLeave = () => {
  if (props.disableAnimations) return;

  isHoveredRef.value = false;
  clearAllParticles();

  if (cardRef.value) {
    gsap.to(cardRef.value, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};

const handleMouseMove = (e: MouseEvent) => {
  if (props.disableAnimations || !cardRef.value) return;

  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Update glow position
  const relativeX = (x / rect.width) * 100;
  const relativeY = (y / rect.height) * 100;
  cardRef.value.style.setProperty('--glow-x', `${relativeX}%`);
  cardRef.value.style.setProperty('--glow-y', `${relativeY}%`);

  if (props.enableMagnetism) {
    const magnetX = (x - centerX) * 0.05;
    const magnetY = (y - centerY) * 0.05;

    magnetismAnimationRef.value = gsap.to(cardRef.value, {
      x: magnetX,
      y: magnetY,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};

const handleClick = (e: MouseEvent) => {
  if (!props.clickEffect || props.disableAnimations || !cardRef.value) return;

  const rect = cardRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const maxDistance = Math.max(
    Math.hypot(x, y),
    Math.hypot(x - rect.width, y),
    Math.hypot(x, y - rect.height),
    Math.hypot(x - rect.width, y - rect.height)
  );

  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: absolute;
    width: ${maxDistance * 2}px;
    height: ${maxDistance * 2}px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${props.glowColor}, 0.4) 0%, rgba(${props.glowColor}, 0.2) 30%, transparent 70%);
    left: ${x - maxDistance}px;
    top: ${y - maxDistance}px;
    pointer-events: none;
    z-index: 1000;
  `;

  cardRef.value.appendChild(ripple);

  gsap.fromTo(
    ripple,
    {
      scale: 0,
      opacity: 1
    },
    {
      scale: 1,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => ripple.remove()
    }
  );
};

onMounted(() => {
  nextTick(() => {
    if (!cardRef.value || props.disableAnimations) return;

    cardRef.value.addEventListener('mouseenter', handleMouseEnter);
    cardRef.value.addEventListener('mouseleave', handleMouseLeave);
    cardRef.value.addEventListener('mousemove', handleMouseMove);
    cardRef.value.addEventListener('click', handleClick);
  });
});

onUnmounted(() => {
  if (cardRef.value) {
    cardRef.value.removeEventListener('mouseenter', handleMouseEnter);
    cardRef.value.removeEventListener('mouseleave', handleMouseLeave);
    cardRef.value.removeEventListener('mousemove', handleMouseMove);
    cardRef.value.removeEventListener('click', handleClick);
  }
  clearAllParticles();
});
</script>

<template>
  <div
    ref="cardRef"
    class="animated-card relative overflow-hidden"
    :class="{ 'animated-card--border-glow': enableBorderGlow }"
  >
    <slot />
  </div>
</template>

<style scoped>
.animated-card {
  --glow-x: 50%;
  --glow-y: 50%;
  --glow-intensity: 1;
  --glow-radius: 300px;
  --glow-color: v-bind(glowColor);
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
}

.animated-card--border-glow::after {
  content: '';
  position: absolute;
  inset: 0;
  padding: 2px;
  background: radial-gradient(
    var(--glow-radius) circle at var(--glow-x) var(--glow-y),
    rgba(v-bind(glowColor), calc(var(--glow-intensity) * 0.6)) 0%,
    rgba(v-bind(glowColor), calc(var(--glow-intensity) * 0.3)) 30%,
    transparent 60%
  );
  border-radius: inherit;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: subtract;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1;
  opacity: 0;
}

.animated-card:hover.animated-card--border-glow::after {
  opacity: 1;
}

.animated-particle::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: rgba(v-bind(glowColor), 0.2);
  border-radius: 50%;
  z-index: -1;
}
</style>
