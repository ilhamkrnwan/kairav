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
  <figure class="site-frame editorial-section editorial-quote">
    <UIcon name="lucide:quote" class="size-7 text-primary" aria-hidden="true" />
    <blockquote class="max-w-[42ch] text-xl leading-snug tracking-tight text-highlighted sm:text-3xl">
      {{ currentQuote.text }}
    </blockquote>
    <figcaption class="editorial-label text-muted">{{ currentQuote.author }}</figcaption>
  </figure>
</template>
