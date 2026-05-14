<script setup>
const { t } = useI18n()

const quotes = computed(() => [
  { text: t('There are no limits to what you can accomplish except the limits you place on your own thinking.'), author: t('Brian Tracy') },
  { text: t('The only way to do great work is to love what you do.'), author: t('Steve Jobs') },
  { text: t('Believe you can and you\'re halfway there.'), author: t('Theodore Roosevelt') },
  { text: t('Don\'t watch the clock; do what it does. Keep going.'), author: t('Sam Levenson') },
  { text: t('Success is not final, failure is not fatal: it is the courage to continue that counts.'), author: t('Winston Churchill') },
  { text: t('It\'s never too late to become whatever you want to be.'), author: t('George Eliot') }
])

const currentQuote = ref({ text: '', author: '' })

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.value.length)
  currentQuote.value = quotes.value[randomIndex]
}

onMounted(() => {
  getRandomQuote()
})
</script>

<template>
  <section class="w-full flex flex-col items-center justify-center py-32 px-6 md:px-12 lg:px-20 text-gray-800 dark:text-white">
    <div class="max-w-4xl mx-auto text-center relative z-10">
      <div class="absolute -top-12 -left-12 opacity-10 pointer-events-none">
        <Icon name="lucide:quote" class="w-32 h-32 text-amber-400" />
      </div>
      <h2 class="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-8">
        "{{ currentQuote.text }}"
      </h2>
      <div class="w-16 h-1 bg-amber-400 mx-auto mb-6"></div>
      <p class="text-sm font-mono tracking-widest uppercase text-muted-foreground">
        — {{ currentQuote.author }}
      </p>
    </div>
  </section>
</template>
