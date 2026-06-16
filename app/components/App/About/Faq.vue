<script setup lang="ts">
const { t } = useI18n()

const faqs = computed(() => [
  {
    q: t('Are you available for freelance projects?'),
    a: t("Yes! I'm actively open to freelance collaborations — whether it's a full web app, landing page, or API integration. Feel free to reach out via the contact section below and we can discuss your needs.")
  },
  {
    q: t('What is your preferred tech stack?'),
    a: t("My primary stack is Vue.js / Nuxt.js for frontend and Node.js / Laravel for backend. For databases I work with Supabase, PostgreSQL, and MongoDB. That said, I'm tech-agnostic — I adapt to whatever stack best fits the project.")
  },
  {
    q: t('Are you open to full-time employment?'),
    a: t("Absolutely. I'm open to full-time positions as a Fullstack or Frontend Developer. I value collaborative teams, clear communication, and meaningful products. Let's connect and see if we're a good fit!")
  },
  {
    q: t('How long does it typically take to build a project?'),
    a: t("It depends on the scope. A landing page can take 3–7 days, while a full-featured web app typically takes 2–6 weeks. I always provide a timeline estimate after understanding the project requirements.")
  },
  {
    q: t('What industries have you worked in?'),
    a: t("I've worked in agritech (Jurutani), general software services (Sekeco), and delivered freelance projects across e-commerce, company profiles, dashboards, and educational platforms.")
  },
  {
    q: t('How can I contact you?'),
    a: t("You can reach me through the 'Get in Touch' section at the bottom of this page, or connect with me on LinkedIn and GitHub. I usually respond within 1–2 business days.")
  }
])

const openIndex = ref<number | null>(null)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="section py-20 px-6 md:px-12 lg:px-20 overflow-hidden text-gray-800 dark:text-white">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Title Area -->
        <div class="lg:col-span-4 lg:sticky lg:top-32 h-fit">
          <h2 class="leading-[0.88] tracking-tight mb-6">
            <span class="section-title-filled block">{{ t('FAQ') }}</span>
            <span class="section-title-outline text-foreground block">{{ t('Questions') }}<span class="text-amber-400 !important">.</span></span>
          </h2>
          <div class="w-12 h-1 bg-amber-400 mb-6"></div>
          <p class="text-sm font-mono tracking-wider uppercase text-muted-foreground">{{ t('Things people usually ask about working with me') }}</p>
          
          <div class="mt-8 hidden lg:block">
            <NuxtLink
              to="#contact"
              class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
            >
              <span class="relative z-10 flex items-center gap-2">
                {{ t('Get In Touch') }}
              </span>
              <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                <Icon name="lucide:message-circle" class="w-4 h-4" />
              </span>
            </NuxtLink>
          </div>
        </div>
        
        <!-- FAQ Accordion -->
        <div class="lg:col-span-8">
          <div class="space-y-4">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="faq-item rounded-sm border bg-background/40 backdrop-blur-md overflow-hidden transition-all duration-300"
              :class="openIndex === index ? 'border-amber-400/50 shadow-lg' : 'border-border/30 hover:border-border/60 hover:bg-background/60'"
            >
              <!-- Question (Toggle Button) -->
              <button
                class="w-full flex items-center justify-between gap-4 p-6 text-left group"
                @click="toggle(index)"
              >
                <div class="flex items-center gap-4">
                  <span
                    class="flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 border"
                    :class="openIndex === index
                      ? 'bg-amber-400/20 border-amber-400/50 text-amber-400'
                      : 'bg-background/80 border-border/30 text-muted-foreground group-hover:border-amber-400/30'"
                  >
                    {{ String(index + 1).padStart(2, '0') }}
                  </span>
                  <span
                    class="text-sm md:text-base font-semibold tracking-wide transition-colors duration-300"
                    :class="openIndex === index ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'"
                  >
                    {{ faq.q }}
                  </span>
                </div>
                <Icon
                  name="lucide:chevron-down"
                  class="w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-300"
                  :class="openIndex === index ? 'rotate-180 text-amber-400' : ''"
                />
              </button>

              <!-- Answer (Collapsible) -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[500px]"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 max-h-[500px]"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="openIndex === index" class="overflow-hidden">
                  <div class="px-6 pb-6 pt-0">
                    <div class="flex gap-4">
                      <div class="w-px bg-amber-400/30 ml-4 flex-shrink-0" />
                      <p class="text-sm text-muted-foreground leading-relaxed pl-4 font-light">
                        {{ faq.a }}
                      </p>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          
          <div class="mt-8 lg:hidden block text-center">
            <NuxtLink
              to="#contact"
              class="group relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-3 font-mono tracking-widest uppercase text-xs font-bold transition-all duration-300 border bg-background/50 backdrop-blur-sm text-foreground border-border/40 hover:border-amber-400/50 hover:text-amber-400 hover:bg-background/80 hover:-translate-y-0.5"
            >
              <span class="relative z-10 flex items-center gap-2">
                {{ t('Get In Touch') }}
              </span>
              <span class="ml-2 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                <Icon name="lucide:message-circle" class="w-4 h-4" />
              </span>
            </NuxtLink>
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
</style>
