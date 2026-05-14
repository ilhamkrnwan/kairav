<script setup lang="ts">
import { Icon } from "#components";

const { t } = useI18n()

const techStacks = {
  row1: [
    { name: "Vue.js", icon: "logos:vue" },
    { name: "Nuxt.js", icon: "logos:nuxt-icon" },
    { name: "React", icon: "logos:react" },
    { name: "Next.js", icon: "logos:nextjs-icon" },
    { name: "TailwindCSS", icon: "logos:tailwindcss-icon" },
    { name: "Laravel", icon: "logos:laravel" },
    { name: "Flutter", icon: "logos:flutter" },
    { name: "CodeIgniter", icon: "logos:codeigniter-icon" },
  ],
  row2: [
    { name: "Supabase", icon: "logos:supabase-icon" },
    { name: "MongoDB", icon: "logos:mongodb-icon" },
    { name: "PostgreSQL", icon: "logos:postgresql" },
    { name: "Firebase", icon: "logos:firebase-icon" },
    { name: "MySQL", icon: "logos:mysql" },
    { name: "Flask", icon: "logos:flask" },
    { name: "Django", icon: "logos:django" },
    { name: "Express", icon: "skill-icons:expressjs-dark" },
  ],
  row3: [
    { name: "Play Store", icon: "logos:google-play-console-icon" },
    { name: "Hosting", icon: "simple-icons:hostinger" },
    { name: "Git", icon: "logos:git-icon" },
    { name: "GitHub", icon: "logos:github-icon" },
    { name: "Ethers", icon: "logos:ethers" },
    { name: "Solidity", icon: "logos:solidity" },
    { name: "Docker", icon: "logos:docker-icon" },
    { name: "Capacitor", icon: "logos:capacitorjs-icon" },
  ],
};
</script>

<template>
  <section id="skills" class="section py-20 px-6 md:px-12 lg:px-20 overflow-hidden text-gray-800 dark:text-white">
    <UiGlobalSpotlight
      container-selector=".skills-container"
      card-selector=".animated-card"
      :glow-color="'251, 191, 36'"
      :spotlight-radius="400"
      :enabled="true"
    />
    <div class="max-w-6xl mx-auto skills-container">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Title Area -->
        <div class="lg:col-span-4">
          <h2 class="leading-[0.88] tracking-tight mb-6">
            <span class="section-title-filled block">{{ t('Skills &') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Technologies') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="w-12 h-1 bg-amber-400 mb-6"></div>
          <p class="text-sm font-mono tracking-wider text-muted-foreground leading-relaxed">
            {{ t('Technologies I currently rely on to') }}
            <UiTextGradient :colors="['#FBBF24', '#F59E0B', '#FBBF24']" :animation-speed="3">
              {{ t('execute ideas.') }}
            </UiTextGradient>
            <br/><br/>
            {{ t('As a tech-agnostic developer, I am always ready to adapt to') }}
            <UiTextGradient :colors="['#A78BFA', '#8B5CF6', '#A78BFA']" :animation-speed="3">
              {{ t('any ecosystem required.') }}
            </UiTextGradient>
          </p>
        </div>

        <!-- Animated Tech Stack -->
        <div class="lg:col-span-8 space-y-6">
          <!-- Row 1 - Move Right -->
          <div class="marquee-container relative overflow-hidden py-2">
            <div class="marquee flex gap-4 w-max">
              <div
                v-for="i in 2"
                :key="`row1-${i}`"
                class="marquee-content flex gap-4 animate-scroll-right"
              >
                <UiAnimatedCard
                  v-for="(tech, index) in techStacks.row1"
                  :key="`row1-tech-${i}-${index}`"
                  :glow-color="'251, 191, 36'"
                  :particle-count="6"
                  :enable-particles="true"
                  :enable-tilt="false"
                  :enable-magnetism="false"
                  :enable-border-glow="false"
                  :click-effect="true"
                >
                  <div
                    class="tech-card flex items-center justify-center gap-3 p-4 px-6 rounded-sm bg-background/40 backdrop-blur-md border border-border/30 hover:bg-background/60 transition-all duration-300 h-full shadow-lg"
                  >
                    <Icon :name="tech.icon" class="w-6 h-6" />
                    <span class="text-xs font-mono font-medium text-foreground whitespace-nowrap tracking-wide">
                      {{ tech.name }}
                    </span>
                  </div>
                </UiAnimatedCard>
              </div>
            </div>
          </div>

          <!-- Row 2 - Move Left -->
          <div class="marquee-container relative overflow-hidden py-2">
            <div class="marquee flex gap-4 w-max">
              <div
                v-for="i in 2"
                :key="`row2-${i}`"
                class="marquee-content flex gap-4 animate-scroll-left"
              >
                <UiAnimatedCard
                  v-for="(tech, index) in techStacks.row2"
                  :key="`row2-tech-${i}-${index}`"
                  :glow-color="'251, 191, 36'"
                  :particle-count="6"
                  :enable-particles="true"
                  :enable-tilt="false"
                  :enable-magnetism="false"
                  :enable-border-glow="false"
                  :click-effect="true"
                >
                  <div
                    class="tech-card flex items-center justify-center gap-3 p-4 px-6 rounded-sm bg-background/40 backdrop-blur-md border border-border/30 hover:bg-background/60 transition-all duration-300 h-full shadow-lg"
                  >
                    <Icon :name="tech.icon" class="w-6 h-6" />
                    <span class="text-xs font-mono font-medium text-foreground whitespace-nowrap tracking-wide">
                      {{ tech.name }}
                    </span>
                  </div>
                </UiAnimatedCard>
              </div>
            </div>
          </div>

          <!-- Row 3 - Move Right -->
          <div class="marquee-container relative overflow-hidden py-2">
            <div class="marquee flex gap-4 w-max">
              <div
                v-for="i in 2"
                :key="`row3-${i}`"
                class="marquee-content flex gap-4 animate-scroll-right"
              >
                <UiAnimatedCard
                  v-for="(tech, index) in techStacks.row3"
                  :key="`row3-tech-${i}-${index}`"
                  :glow-color="'251, 191, 36'"
                  :particle-count="6"
                  :enable-particles="true"
                  :enable-tilt="false"
                  :enable-magnetism="false"
                  :enable-border-glow="false"
                  :click-effect="true"
                >
                  <div
                    class="tech-card flex items-center justify-center gap-3 p-4 px-6 rounded-sm bg-background/40 backdrop-blur-md border border-border/30 hover:bg-background/60 transition-all duration-300 h-full shadow-lg"
                  >
                    <Icon :name="tech.icon" class="w-6 h-6" />
                    <span class="text-xs font-mono font-medium text-foreground whitespace-nowrap tracking-wide">
                      {{ tech.name }}
                    </span>
                  </div>
                </UiAnimatedCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-title-filled {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.section-title-outline {
  font-family: var(--font-heading, 'Inter', sans-serif);
  font-weight: 900;
  font-size: clamp(3rem, 7vw, 5rem);
  letter-spacing: -0.03em;
  text-transform: uppercase;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px currentColor;
  opacity: 0.85;
}

.animate-scroll-right {
  animation: scroll-right 30s linear infinite;
}

.animate-scroll-left {
  animation: scroll-left 30s linear infinite;
}

@keyframes scroll-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-left {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Pause animation on hover */
.marquee-container:hover .animate-scroll-right,
.marquee-container:hover .animate-scroll-left {
  animation-play-state: paused;
}

/* Add gradient fade effect on edges */
.marquee-container::before,
.marquee-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 10;
  pointer-events: none;
}

.marquee-container::before {
  left: 0;
  background: linear-gradient(
    to right,
    hsl(var(--background)) 0%,
    transparent 100%
  );
}

.marquee-container::after {
  right: 0;
  background: linear-gradient(
    to left,
    hsl(var(--background)) 0%,
    transparent 100%
  );
}
</style>
