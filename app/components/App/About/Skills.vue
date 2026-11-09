<script setup lang="ts">
const { t } = useI18n()

// Rows alternate scroll direction (even = right, odd = left)
const techRows = [
  [
    { name: 'Vue.js', icon: 'logos:vue' },
    { name: 'Nuxt.js', icon: 'logos:nuxt-icon' },
    { name: 'React', icon: 'logos:react' },
    { name: 'Next.js', icon: 'logos:nextjs-icon' },
    { name: 'TailwindCSS', icon: 'logos:tailwindcss-icon' },
    { name: 'Laravel', icon: 'logos:laravel' },
    { name: 'Flutter', icon: 'logos:flutter' },
    { name: 'CodeIgniter', icon: 'logos:codeigniter-icon' }
  ],
  [
    { name: 'Supabase', icon: 'logos:supabase-icon' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon' },
    { name: 'PostgreSQL', icon: 'logos:postgresql' },
    { name: 'Firebase', icon: 'logos:firebase-icon' },
    { name: 'MySQL', icon: 'logos:mysql' },
    { name: 'Flask', icon: 'logos:flask' },
    { name: 'Django', icon: 'logos:django' },
    { name: 'Express', icon: 'skill-icons:expressjs-dark' }
  ],
  [
    { name: 'Play Store', icon: 'logos:google-play-console-icon' },
    { name: 'Hosting', icon: 'simple-icons:hostinger' },
    { name: 'Git', icon: 'logos:git-icon' },
    { name: 'GitHub', icon: 'logos:github-icon' },
    { name: 'Ethers', icon: 'logos:ethers' },
    { name: 'Solidity', icon: 'logos:solidity' },
    { name: 'Docker', icon: 'logos:docker-icon' },
    { name: 'Capacitor', icon: 'logos:capacitorjs-icon' }
  ],
  [
    { name: 'WordPress', icon: 'logos:wordpress-icon' },
    { name: 'Gemini', icon: 'logos:google-gemini' },
    { name: 'ChatGPT', icon: 'logos:openai-icon' },
    { name: 'Claude', icon: 'logos:claude-icon' },
    { name: 'Qwen', icon: 'logos:qwen-icon' },
    { name: 'DeepSeek', icon: 'logos:deepseek-icon' },
    { name: 'Antigravity', icon: 'lucide:atom' },
    { name: 'VS Code', icon: 'logos:visual-studio-code' }
  ]
]
</script>

<template>
  <section id="skills" class="overflow-hidden px-6 py-20 md:px-12 lg:px-20">
    <div class="skills-container mx-auto max-w-7xl">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div class="stagger-item relative z-0 will-change-[transform,opacity] lg:col-span-4">
          <h2 :key="$i18n.locale" class="mb-6 leading-[0.88] tracking-tight">
            <span class="section-title-filled block">{{ t('Skills and') }}</span>
            <span class="block text-highlighted">
              <span class="section-title-outline">{{ t('Technologies') }}</span><span class="text-primary">.</span>
            </span>
          </h2>
          <div class="mb-6 h-1 w-12 bg-primary" />
          <p class="text-sm leading-relaxed text-muted">
            {{ t('Technologies I currently rely on to') }}
            <UiTextGradient>
              {{ t('execute ideas.') }}
            </UiTextGradient>
            <br><br>
            {{ t('As a tech-agnostic developer, I am always ready to adapt to') }}
            <UiTextGradient>
              {{ t('any ecosystem required.') }}
            </UiTextGradient>
          </p>
        </div>

        <div class="relative z-10 space-y-6 lg:col-span-8">
          <div
            v-for="(row, r) in techRows"
            :key="r"
            class="marquee-container stagger-item relative overflow-hidden py-2 will-change-[transform,opacity]"
          >
            <div class="flex w-max gap-4">
              <div
                v-for="copy in 2"
                :key="copy"
                class="flex gap-4"
                :class="r % 2 ? 'animate-scroll-left' : 'animate-scroll-right'"
              >
                <div
                  v-for="tech in row"
                  :key="tech.name"
                >
                  <UCard
                    :ui="{
                      root: 'h-full rounded-lg ring-0 border border-default/30 bg-elevated shadow-lg transition-all duration-300 hover:bg-elevated',
                      body: 'flex items-center justify-center gap-3 px-6 py-4 sm:px-6 sm:py-4'
                    }"
                  >
                    <UIcon :name="tech.icon" class="size-6" />
                    <span class="text-xs font-medium tracking-wide whitespace-nowrap text-highlighted">
                      {{ tech.name }}
                    </span>
                  </UCard>
                </div>
              </div>
            </div>
          </div>
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
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes scroll-left {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

.marquee-container:hover .animate-scroll-right,
.marquee-container:hover .animate-scroll-left {
  animation-play-state: paused;
}

/* Edge fade */
.marquee-container::before,
.marquee-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 10;
  pointer-events: none;
}

.marquee-container::before {
  left: 0;
  background: linear-gradient(to right, var(--ui-bg), transparent);
}

.marquee-container::after {
  right: 0;
  background: linear-gradient(to left, var(--ui-bg), transparent);
}
</style>
