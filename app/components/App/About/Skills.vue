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
  <section id="skills" class="section overflow-hidden">
    <div class="container">
      <div class="max-w-6xl mx-auto">
        <!-- Section Title -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-heading mb-4">
            {{ t('Skills &') }} <span class="text-amber-400">{{ t('Technologies') }}</span>
          </h2>
          <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
            {{ t('Modern tech stack for building scalable and performant applications') }}
          </p>
        </div>

        <!-- Animated Tech Stack -->
        <div class="space-y-8">
          <!-- Row 1 - Move Right -->
          <div class="marquee-container relative overflow-hidden py-4">
            <div class="marquee flex gap-6 w-max">
              <div
                v-for="i in 2"
                :key="`row1-${i}`"
                class="marquee-content flex gap-6 animate-scroll-right"
              >
                <div
                  v-for="(tech, index) in techStacks.row1"
                  :key="`row1-tech-${i}-${index}`"
                  class="tech-card flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 hover:border-amber-400/30 transition-all duration-300 min-w-35 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/10"
                >
                  <Icon :name="tech.icon" class="w-12 h-12" />
                  <span class="text-xs font-mono text-muted-foreground whitespace-nowrap group-hover:text-foreground">
                    {{ tech.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2 - Move Left -->
          <div class="marquee-container relative overflow-hidden py-4">
            <div class="marquee flex gap-6 w-max">
              <div
                v-for="i in 2"
                :key="`row2-${i}`"
                class="marquee-content flex gap-6 animate-scroll-left"
              >
                <div
                  v-for="(tech, index) in techStacks.row2"
                  :key="`row2-tech-${i}-${index}`"
                  class="tech-card flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 hover:border-amber-400/30 transition-all duration-300 min-w-35 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/10"
                >
                  <Icon :name="tech.icon" class="w-12 h-12" />
                  <span class="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {{ tech.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 3 - Move Right -->
          <div class="marquee-container relative overflow-hidden py-4">
            <div class="marquee flex gap-6 w-max">
              <div
                v-for="i in 2"
                :key="`row3-${i}`"
                class="marquee-content flex gap-6 animate-scroll-right"
              >
                <div
                  v-for="(tech, index) in techStacks.row3"
                  :key="`row3-tech-${i}-${index}`"
                  class="tech-card flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:bg-background/80 hover:border-amber-400/30 transition-all duration-300 min-w-35 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/10"
                >
                  <Icon :name="tech.icon" class="w-12 h-12" />
                  <span class="text-xs font-mono text-muted-foreground whitespace-nowrap">
                    {{ tech.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Note -->
        <div class="mt-16 text-center">
          <span class="inline-flex items-center px-4 py-2 space-x-2 text-sm border rounded-full border-border/50 bg-background/50 backdrop-blur-sm dark:border-gray-700 dark:bg-zinc-800/50 hover:border-amber-400/30 transition-colors duration-300">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span class="font-medium text-gray-600 dark:text-gray-200">
              Continuously learning and expanding skillset with emerging technologies
            </span>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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