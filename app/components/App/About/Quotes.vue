<script setup lang="ts">
const { t } = useI18n()

const quotes = computed(() => [
  { text: t('There are no limits to what you can accomplish except the limits you place on your own thinking.'), author: t('Brian Tracy') },
  { text: t('The only way to do great work is to love what you do.'), author: t('Steve Jobs') },
  { text: t('Believe you can and you\'re halfway there.'), author: t('Theodore Roosevelt') },
  { text: t('Don\'t watch the clock; do what it does. Keep going.'), author: t('Sam Levenson') },
  { text: t('Success is not final, failure is not fatal: it is the courage to continue that counts.'), author: t('Winston Churchill') },
  { text: t('It\'s never too late to become whatever you want to be.'), author: t('George Eliot') },
  { text: t('Run, don\'t walk. Either you are running for food, or you are running from being food.'), author: t('Jensen Huang (NVIDIA CEO)') },
  { text: t('AI will be the greatest force for empowerment and human capability enhancement that we have ever seen.'), author: t('Sam Altman (OpenAI CEO)') },
  { text: t('AI is probably the most important thing humanity has ever worked on. I think of it as something more profound than electricity or fire.'), author: t('Sundar Pichai (Google CEO)') },
  { text: t('The future is about human-AI collaboration, where technology empowers human ingenuity.'), author: t('Satya Nadella (Microsoft CEO)') },
  { text: t('If we can build AI that can learn to do anything, then we can use it to help solve all these other problems.'), author: t('Demis Hassabis (Google DeepMind CEO)') },
  { text: t('The best way to understand the universe is to build a maximum truth-seeking AI.'), author: t('Elon Musk (xAI Founder)') }
])

// Pick randomly on mount only (SSR renders the first quote, avoiding hydration mismatch)
const index = ref(0)
onMounted(() => {
  index.value = Math.floor(Math.random() * quotes.value.length)
})
const currentQuote = computed(() => quotes.value[index.value]!)
</script>

<template>
  <section class="flex w-full flex-col items-center justify-center px-6 py-32 md:px-12 lg:px-20">
    <div class="relative z-10 mx-auto max-w-4xl text-center">
      <UIcon name="lucide:quote" class="pointer-events-none absolute -top-12 -left-12 size-32 text-primary opacity-10" />
      <h2 :key="$i18n.locale" class="stagger-item mb-8 font-heading text-3xl leading-tight tracking-tight text-highlighted will-change-[transform,opacity] md:text-5xl lg:text-6xl">
        "{{ currentQuote.text }}"
      </h2>
      <div class="stagger-item mx-auto mb-6 h-1 w-16 bg-primary will-change-[transform,opacity]" />
      <p class="stagger-item text-sm text-muted will-change-[transform,opacity] font-medium">
        — {{ currentQuote.author }}
      </p>
    </div>
  </section>
</template>
