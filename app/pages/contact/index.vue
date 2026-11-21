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
            <li v-for="method in contactMethods" :key="method.label">
              <ULink :to="method.href" target="_blank" rel="noopener noreferrer" raw class="contact-method">
                <UIcon :name="method.icon" class="size-5 text-primary" aria-hidden="true" />
                <span class="min-w-0">
                  <span class="editorial-label block text-muted">{{ method.label }}</span>
                  <span class="block wrap-anywhere text-base font-semibold text-highlighted sm:text-lg">{{ method.value }}</span>
                </span>
                <UIcon name="lucide:arrow-up-right" class="size-4" aria-hidden="true" />
              </ULink>
            </li>
          </ul>
        </div>
      </div>
    </section>

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
      >
        <input type="hidden" name="text" :value="message">
        <div class="grid gap-x-5 gap-y-5 sm:grid-cols-2">
          <div
            v-for="field in contactFields"
            :key="field.key"
            class="min-w-0"
            :class="field.required && 'sm:col-span-2'"
          >
            <label :for="`consultation-${field.key}`" class="mb-2 block text-sm font-semibold text-highlighted">
              {{ t(`contactForm.${field.key}.label`) }}
              <span v-if="!field.required" class="ms-1 font-normal text-muted">{{ t('contactForm.optional') }}</span>
            </label>
            <select
              :id="`consultation-${field.key}`"
              v-model="answers[field.key]"
              :required="field.required"
              class="min-h-11 w-full rounded-lg border border-accented bg-default px-3 py-2 text-base text-highlighted sm:text-sm"
            >
              <option value="" :disabled="field.required">
                {{ t(field.required ? 'contactForm.choose' : 'contactForm.undecided') }}
              </option>
              <option v-for="value in field.options" :key="value" :value="value">
                {{ t(`contactForm.${field.key}.${value}`) }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-default pt-5">
          <UiArrowButton type="submit" icon="lucide:arrow-up-right">
            {{ t('contactForm.whatsapp') }}
          </UiArrowButton>
          <ULink :to="emailUrl" raw class="inline-flex min-h-11 items-center text-sm font-medium text-muted underline underline-offset-4 hover:text-primary">
            {{ t('contactForm.email') }}
          </ULink>
        </div>
      </form>
    </section>

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
            :ui="{
              root: 'overflow-hidden rounded-lg border border-default/40 bg-elevated ring-0',
              body: 'p-6 sm:p-6',
              footer: 'border-t border-default/40 bg-elevated p-3 sm:p-3'
            }"
          >
            <h3 class="mb-2 font-heading text-2xl text-highlighted">
              {{ location.city }}, {{ location.region }}
            </h3>
            <p class="text-sm leading-relaxed text-muted">
              {{ location.description }}
            </p>

            <template #footer>
              <div class="aspect-video overflow-hidden rounded-lg border border-default">
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
