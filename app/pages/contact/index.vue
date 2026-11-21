<script setup lang="ts">
const { t } = useI18n()

useDynamicSeo({
  titleKey: 'seo.contact.title',
  descriptionKey: 'seo.contact.description'
})


const contactMethods = [
  {
    label: 'WhatsApp',
    value: '+62 877-6129-6676',
    href: 'https://wa.me/6287761296676?text=Halo%20Ilham%2C%20saya%20ingin%20diskusi%20project.',
    icon: 'simple-icons:whatsapp'
  },
  {
    label: 'Email',
    value: 'ilhamkurniawanjateng@gmail.com',
    href: 'mailto:ilhamkurniawanjateng@gmail.com',
    icon: 'lucide:mail'
  },
  {
    label: 'LinkedIn',
    value: 'ilham-kurniawan',
    href: 'https://www.linkedin.com/in/ilham-kurniawan-9667891b7/',
    icon: 'simple-icons:linkedin'
  },
  {
    label: 'GitHub',
    value: 'ilhamkrnwan',
    href: 'https://github.com/ilhamkrnwan',
    icon: 'simple-icons:github'
  }
]

const locations = computed(() => [
  {
    city: t('Blora'),
    region: t('Jawa Tengah'),
    description: t('Base kerja untuk kolaborasi remote, konsultasi project, dan koordinasi digital dengan client dari berbagai kota.'),
    mapLabel: t('Peta area Blora'),
    mapSrc: 'https://www.google.com/maps?q=Blora%2C%20Jawa%20Tengah&output=embed'
  },
  {
    city: t('Sleman'),
    region: t('Yogyakarta'),
    description: t('Area kerja fleksibel untuk meeting online, diskusi product, dan kolaborasi hybrid bila dibutuhkan.'),
    mapLabel: t('Peta area Sleman, Yogyakarta'),
    mapSrc: 'https://www.google.com/maps?q=Kabupaten%20Sleman%2C%20Daerah%20Istimewa%20Yogyakarta&output=embed'
  }
])

const contactFields = [
  { key: 'service', required: true, options: ['website', 'mobile', 'dashboard', 'automation', 'consulting'] },
  { key: 'timeline', required: false, options: ['urgent', 'weeks', 'months', 'flexible'] },
  { key: 'budget', required: false, options: ['underFive', 'fiveToFifteen', 'fifteenToThirty', 'overThirty'] },
] as const
const answers = reactive({ service: '', timeline: '', budget: '' })

const message = computed(() => [
  t('contactForm.message'),
  ...contactFields.flatMap(({ key }) => {
    const value = answers[key]
    return value ? [t('contactForm.messageLine', {
      label: t(`contactForm.${key}.label`),
      value: t(`contactForm.${key}.${value}`),
    })] : []
  }),
].join('\n'))

// Three quick steps: service (required), timeline, budget. Picking an option moves on by itself.
const step = ref(0)
const last = contactFields.length - 1
const current = computed(() => contactFields[step.value]!)
const selections = computed(() => contactFields.flatMap(({ key }) =>
  answers[key] ? [t(`contactForm.${key}.${answers[key]}`)] : [],
))
let advanceTimer: ReturnType<typeof setTimeout> | undefined
const pick = () => {
  clearTimeout(advanceTimer)
  if (step.value < last) advanceTimer = setTimeout(() => { step.value++ }, 220)
}
const next = () => { if (step.value < last && (step.value > 0 || answers.service)) step.value++ }
const goTo = (index: number) => { if (index <= step.value || answers.service) step.value = index }
const onSubmit = (event: Event) => {
  if (!answers.service) { event.preventDefault(); step.value = 0; return }
  if (step.value < last) { event.preventDefault(); next() }
}
onBeforeUnmount(() => clearTimeout(advanceTimer))

const emailUrl = computed(() =>
  `mailto:ilhamkurniawanjateng@gmail.com?subject=${encodeURIComponent(t('contactForm.subject'))}&body=${encodeURIComponent(message.value)}`,
)
</script>

<template>
  <div>
    <section class="site-frame contact-masthead" aria-labelledby="contact-title">
      <h1 id="contact-title" class="editorial-title">{{ t('Contact') }}</h1>
      <div class="editorial-split">
        <div>
          <p class="max-w-[38ch] text-lg leading-relaxed text-muted sm:text-xl">
            {{ t('contactForm.intro') }}
          </p>
          <UiArrowButton to="#consultation-quiz" class="mt-6" icon="lucide:arrow-down">
            {{ t('contactForm.title') }}
          </UiArrowButton>
        </div>
        <div class="min-w-0">
          <ul class="editorial-list">
            <li v-for="method in contactMethods" :key="method.label" data-reveal>
              <ULink :to="method.href" target="_blank" rel="noopener noreferrer" raw class="contact-method">
                <UIcon :name="method.icon" class="size-5 text-primary" aria-hidden="true" />
                <span class="min-w-0">
                  <span class="editorial-label block text-muted">{{ method.label }}</span>
                  <span class="block wrap-anywhere text-lg font-medium tracking-tight text-highlighted sm:text-2xl">{{ method.value }}</span>
                </span>
                <UIcon name="lucide:arrow-up-right" class="size-4" aria-hidden="true" />
              </ULink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div class="inverse-band">
    <section id="consultation-quiz" class="site-frame editorial-section editorial-split" aria-labelledby="consultation-title">
      <div>
        <h2 id="consultation-title" class="editorial-title">{{ t('contactForm.title') }}</h2>
        <p class="mt-4 max-w-[36ch] text-muted">{{ t('contactForm.hint') }}</p>
      </div>

      <form
        action="https://wa.me/6287761296676"
        method="get"
        target="_blank"
        rel="noopener noreferrer"
        class="min-w-0"
        aria-labelledby="consultation-title"
        @submit="onSubmit"
      >
        <input type="hidden" name="text" :value="message">

        <ol class="quiz-track">
          <li
            v-for="(field, index) in contactFields"
            :key="field.key"
            :class="{ 'is-done': index < step, 'is-current': index === step }"
            :aria-current="index === step ? 'step' : undefined"
          >
            <button type="button" :disabled="index > step && !answers.service" @click="goTo(index)">
              {{ t(`contactForm.${field.key}.label`) }}
            </button>
          </li>
        </ol>

        <fieldset :key="current.key" class="quiz-step">
          <legend class="quiz-question">
            {{ t(`contactForm.${current.key}.label`) }}
            <span v-if="!current.required" class="ms-1 text-base font-normal text-muted">{{ t('contactForm.optional') }}</span>
          </legend>
          <div class="quiz-options">
            <label v-if="!current.required" class="quiz-option">
              <input v-model="answers[current.key]" type="radio" :name="current.key" value="" @change="pick">
              <span>{{ t('contactForm.undecided') }}</span>
            </label>
            <label v-for="value in current.options" :key="value" class="quiz-option">
              <input
                v-model="answers[current.key]"
                type="radio"
                :name="current.key"
                :value="value"
                :required="current.required"
                @change="pick"
              >
              <span>{{ t(`contactForm.${current.key}.${value}`) }}</span>
            </label>
          </div>
        </fieldset>

        <p v-if="step === last && selections.length" class="quiz-summary">
          <span class="editorial-label">{{ t('contactForm.summary') }}</span>
          {{ selections.join(' · ') }}
        </p>

        <div class="quiz-actions">
          <UiArrowButton v-if="step > 0" type="button" variant="secondary" icon="lucide:arrow-left" @click="step--">
            {{ t('contactForm.back') }}
          </UiArrowButton>
          <UiArrowButton v-if="step < last" type="button" :disabled="step === 0 && !answers.service" @click="next">
            {{ t('contactForm.next') }}
          </UiArrowButton>
          <template v-else>
            <UiArrowButton type="submit" icon="lucide:arrow-up-right">
              {{ t('contactForm.whatsapp') }}
            </UiArrowButton>
            <ULink :to="emailUrl" raw class="inline-flex min-h-11 items-center text-sm font-medium text-muted underline underline-offset-4 hover:text-primary">
              {{ t('contactForm.email') }}
            </ULink>
          </template>
        </div>
      </form>
    </section>
    </div>

    <section class="site-frame editorial-section">
      <div>
        <div class="mb-10 max-w-3xl">
          <h2 class="editorial-title mb-5">
            {{ t('Fleksibel untuk remote, hybrid, dan kolaborasi project.') }}
          </h2>
          <p class="text-base font-normal leading-relaxed text-muted md:text-lg">
            {{ t('Lokasi saya berada di Kabupaten Blora dan Sleman, Yogyakarta. Untuk project, konsultasi, dan kolaborasi, saya tetap fleksibel melayani client secara remote melalui meeting online, WhatsApp, dan workflow digital.') }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UCard
            v-for="location in locations"
            :key="location.city"
            data-reveal
            :ui="{
              root: 'overflow-hidden rounded-none border-0 border-t border-default bg-transparent shadow-none ring-0',
              body: 'px-0 py-6 sm:px-0',
              footer: 'border-0 bg-transparent px-0 pb-0 pt-0 sm:px-0'
            }"
          >
            <h3 class="mb-2 font-heading text-2xl text-highlighted">
              {{ location.city }}, {{ location.region }}
            </h3>
            <p class="text-sm leading-relaxed text-muted">
              {{ location.description }}
            </p>

            <template #footer>
              <div class="map-frame aspect-video overflow-hidden">
                <iframe
                  :src="location.mapSrc"
                  :title="location.mapLabel"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  class="size-full"
                />
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </section>
  </div>
</template>
