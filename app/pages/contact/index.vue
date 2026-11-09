<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const { t } = useI18n()

useDynamicSeo({
  titleKey: 'seo.contact.title',
  descriptionKey: 'seo.contact.description'
})

// Initialize Scroll Reveal Animations
useScrollReveal()

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

const projectScopes = computed(() => [
  t('Website Bisnis & Branding Online'),
  t('Custom Dashboard & Sistem Internal'),
  t('Fullstack Web Application'),
  t('Third-Party & AI Integration')
])

const messageFormat = computed(() => [
  { title: t('Context'), text: t('Briefly explain the product, audience, and current stage.') },
  { title: t('Need'), text: t('Mention the service area, deadline, and existing materials.') },
  { title: t('Outcome'), text: t('Share the result you want users or the business to feel.') }
])

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

// === Consultation quiz (3 steps + summary) ===
type QuizKey = 'service' | 'timeline' | 'budget'
interface QuizOption {
  value: string
  label: string
  desc: string
  glyph?: string
  badge?: string
}

const step = ref(1)
const answers = reactive<Record<QuizKey, string>>({ service: '', timeline: '', budget: '' })

const stepperItems: StepperItem[] = [
  { value: 1, icon: 'lucide:layers' },
  { value: 2, icon: 'lucide:clock' },
  { value: 3, icon: 'lucide:wallet' },
  { value: 4, icon: 'lucide:send' }
]

const option = (label: string, desc: string, icon?: string, badge?: string): QuizOption => ({ value: label, label, desc, glyph: icon, badge })

const quizSteps = computed<{ key: QuizKey, title: string, hint: string, columns: string, options: QuizOption[] }[]>(() => [
  {
    key: 'service',
    title: t('1. Apa jenis solusi digital yang Anda butuhkan?'),
    hint: 'Pilih opsi ini',
    columns: 'sm:grid-cols-2 lg:grid-cols-3',
    options: [
      option(t('Website Modern & Branding'), t('Landing page, company profile, e-commerce, atau website portofolio interaktif berkinerja tinggi.'), 'lucide:globe', 'Popular'),
      option(t('Aplikasi Mobile'), t('Aplikasi Android, iOS, atau solusi multiplatform modern dengan performa native.'), 'lucide:smartphone', 'Mobile'),
      option(t('Custom Dashboard & Web App'), t('Sistem admin internal, dashboard analitik, platform SaaS, atau portal bisnis.'), 'lucide:layout-dashboard', 'System'),
      option(t('Solusi AI & Otomasi'), t('Integrasi LLM/AI, chatbot cerdas, workflow automation, atau sistem berbasis Machine Learning.'), 'lucide:sparkles', 'AI / ML'),
      option(t('Konsultasi & Kolaborasi Tim'), t('Diskusi arsitektur teknis, audit performa website, atau kolaborasi gabung tim proyek.'), 'lucide:messages-square', 'Discuss')
    ]
  },
  {
    key: 'timeline',
    title: t('2. Berapa target timeline pengerjaan yang diinginkan?'),
    hint: 'Pilih timeline ini',
    columns: 'sm:grid-cols-2',
    options: [
      option(t('Segera (< 2 Minggu)'), t('Kebutuhan prioritas tinggi, sprint cepat, atau perbaikan mendesak.'), 'lucide:zap'),
      option(t('1 – 2 Bulan'), t('Timeline pengerjaan standar & ideal untuk kualitas optimal.'), 'lucide:calendar'),
      option(t('> 2 Bulan / Fleksibel'), t('Proyek bertahap, produk skala besar, atau pengembangan berkelanjutan.'), 'lucide:clock'),
      option(t('Tahap Perencanaan & Ide'), t('Belum ada deadline pasti, ingin diskusi kelayakan dan konsep terlebih dahulu.'), 'lucide:lightbulb')
    ]
  },
  {
    key: 'budget',
    title: t('3. Berapa estimasi budget yang dialokasikan?'),
    hint: 'Pilih estimasi',
    columns: 'sm:grid-cols-2 lg:grid-cols-3',
    options: [
      option(t('< Rp 5 Juta'), t('Landing page ringkas, branding starter, atau perbaikan fitur terarah.'), undefined, 'Starter'),
      option(t('Rp 5 – 15 Juta'), t('Website bisnis lengkap, company profile custom, atau web app skala menengah.'), undefined, 'Standard'),
      option(t('Rp 15 – 30 Juta'), t('Aplikasi mobile custom, dashboard komprehensif, atau integrasi sistem fullstack.'), undefined, 'Pro'),
      option(t('> Rp 30 Juta'), t('Platform skala enterprise, arsitektur multi-layanan, atau solusi AI custom.'), undefined, 'Enterprise'),
      option(t('Fleksibel / Diskusi Terbuka'), t('Estimasi akan disesuaikan secara transparan setelah rincian fitur dibahas.'), undefined, 'Konsultasi')
    ]
  }
])

// Slide direction for the step transition: forward slides left, back slides right
const stepDir = ref<'fwd' | 'back'>('fwd')
watch(step, (next, prev) => {
  stepDir.value = next < prev ? 'back' : 'fwd'
}, { flush: 'sync' })

const currentQuiz = computed(() => quizSteps.value[step.value - 1])
const selectedAnswer = computed(() => currentQuiz.value ? answers[currentQuiz.value.key] : '')
const quizTitle = computed(() => currentQuiz.value?.title ?? t('Ringkasan Kebutuhan Proyek Siap Dikirim!'))

// Going to an earlier step clears that step's answer so it can be picked (and auto-advance) again
const goToStep = (target: number) => {
  const key = quizSteps.value[target - 1]?.key
  if (key) answers[key] = ''
  step.value = target
}

const resetQuiz = () => {
  Object.assign(answers, { service: '', timeline: '', budget: '' })
  step.value = 1
}

const summary = computed(() => [
  { label: 'Layanan', value: answers.service },
  { label: 'Target Waktu', value: answers.timeline },
  { label: 'Estimasi Budget', value: answers.budget }
])

const whatsappUrl = computed(() => {
  const message = [
    'Halo Ilham, saya ingin konsultasi proyek:',
    `• Kebutuhan: ${answers.service || 'Belum dipilih'}`,
    `• Target Waktu: ${answers.timeline || 'Belum dipilih'}`,
    `• Estimasi Budget: ${answers.budget || 'Belum dipilih'}`,
    '',
    'Bisa kita diskusikan lebih lanjut? Terima kasih!'
  ].join('\n')

  return `https://wa.me/6287761296676?text=${encodeURIComponent(message)}`
})

const emailUrl = computed(() => {
  const subject = `Konsultasi Proyek: ${answers.service || 'Diskusi Digital'}`
  const body = [
    'Halo Ilham,',
    '',
    'Saya ingin berkonsultasi mengenai proyek dengan rincian kebutuhan berikut:',
    `- Kebutuhan: ${answers.service || '-'}`,
    `- Target Waktu: ${answers.timeline || '-'}`,
    `- Estimasi Budget: ${answers.budget || '-'}`,
    '',
    'Mohon informasi ketersediaan jadwal meeting online atau diskusi lebih lanjut.',
    '',
    'Terima kasih.'
  ].join('\n')

  return `mailto:ilhamkurniawanjateng@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
</script>

<template>
  <main class="min-h-screen">
    <!-- Hero + contact methods -->
    <section class="scroll-section relative flex min-h-screen w-full items-center overflow-hidden px-6 py-28 will-change-[transform,opacity] md:px-12 lg:px-20">
      <div class="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div class="stagger-item lg:col-span-5">
          <h1 :key="$i18n.locale" class="mb-8 leading-[0.88] tracking-tight">
            <span class="section-title-filled block">{{ t('Contact') }}</span>
            <span class="section-title-outline block">{{ t('Start Here') }}<span class="text-primary">.</span></span>
          </h1>

          <p class="mb-10 max-w-xl text-base font-normal leading-relaxed text-muted md:text-lg">
            {{ t('Tell me what you are building, what is currently blocking the product, and what outcome you want to reach. I will help map the next practical step.') }}
          </p>

          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="scope in projectScopes"
              :key="scope"
              color="neutral"
              variant="outline"
              size="lg"
              class="rounded-lg border-default/40 bg-elevated text-xs text-highlighted font-medium"
            >
              {{ scope }}
            </UBadge>
          </div>
        </div>

        <div class="stagger-item lg:col-span-7">
          <div class="grid grid-cols-2 gap-3 sm:gap-4">
            <UPageCard
              v-for="method in contactMethods"
              :key="method.label"
              :to="method.href"
              target="_blank"
              rel="noopener noreferrer"
              :ui="{
                root: 'group rounded-lg border border-default/40 bg-elevated ring-0 transition-all duration-300 hover:border-primary/50 hover:bg-elevated',
                container: 'p-3.5 sm:p-5 md:p-6',
                leading: 'mb-3 flex w-full items-start justify-between gap-1 sm:mb-6 md:mb-8',
                wrapper: 'w-full'
              }"
            >
              <template #leading>
                <div class="flex size-8 shrink-0 items-center justify-center rounded-lg border border-default bg-primary/10 sm:size-12">
                  <UIcon :name="method.icon" class="size-4 text-primary sm:size-5" />
                </div>
                <UIcon
                  name="lucide:arrow-up-right"
                  class="size-3.5 text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary sm:size-4"
                />
              </template>
              <template #title>
                <span class="mb-1 block text-xs font-normal text-muted sm:mb-2 sm:text-xs">
                  {{ method.label }}
                </span>
              </template>
              <template #description>
                <span class="line-clamp-2 break-words font-heading text-xs text-highlighted sm:text-base">
                  {{ method.value }}
                </span>
              </template>
            </UPageCard>
          </div>

          <UCard
            class="mt-6"
            :ui="{
              root: 'rounded-lg border border-default/40 bg-elevated ring-0',
              body: 'p-6 sm:p-6'
            }"
          >
            <p class="mb-4 text-xs text-muted font-medium">
              {{ t('Best message format') }}
            </p>
            <div class="grid grid-cols-1 gap-4 text-sm text-muted md:grid-cols-3">
              <div v-for="item in messageFormat" :key="item.title">
                <p class="mb-2 font-heading text-highlighted">{{ item.title }}</p>
                <p>{{ item.text }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Location + consultation quiz -->
    <section class="scroll-section px-6 pb-28 will-change-[transform,opacity] md:px-12 lg:px-20">
      <div class="mx-auto max-w-7xl">
        <div class="stagger-item mb-10 max-w-3xl">
          <p class="mb-4 text-xs text-muted font-medium">
            {{ t('Location & Availability') }}
          </p>
          <h2 :key="$i18n.locale" class="mb-5 font-heading text-3xl tracking-tight md:text-5xl">
            {{ t('Fleksibel untuk remote, hybrid, dan kolaborasi project.') }}
          </h2>
          <p class="text-base font-normal leading-relaxed text-muted md:text-lg">
            {{ t('Lokasi saya berada di Kabupaten Blora dan Sleman, Yogyakarta. Untuk project, konsultasi, dan kolaborasi, saya tetap fleksibel melayani client secara remote melalui meeting online, WhatsApp, dan workflow digital.') }}
          </p>
        </div>

        <div class="stagger-item grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UCard
            v-for="location in locations"
            :key="location.city"
            :ui="{
              root: 'overflow-hidden rounded-lg border border-default/40 bg-elevated ring-0',
              body: 'p-6 sm:p-6',
              footer: 'border-t border-default/40 bg-elevated p-3 sm:p-3'
            }"
          >
            <div class="mb-5 flex items-start justify-between gap-4">
              <div class="flex size-12 items-center justify-center rounded-lg border border-default bg-primary/10">
                <UIcon name="lucide:map-pin" class="size-5 text-primary" />
              </div>
              <UBadge
                color="neutral"
                variant="outline"
                class="rounded-lg border-default/40 bg-elevated text-xs text-muted font-medium"
              >
                {{ t('Area umum') }}
              </UBadge>
            </div>
            <h3 class="mb-1 font-heading text-2xl text-highlighted">
              {{ location.city }}
            </h3>
            <p class="mb-4 text-xs text-primary font-medium">
              {{ location.region }}
            </p>
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

        <!-- Interactive 3-step WhatsApp consultation wizard -->
        <UCard
          class="stagger-item mt-8"
          :ui="{
            root: 'relative overflow-hidden rounded-xl border border-default bg-elevated ring-0',
            body: 'p-6 sm:p-8 lg:p-10'
          }"
        >

          <!-- Header & step progress -->
          <div class="relative z-10 mb-8">
            <div class="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <UBadge
                  color="primary"
                  variant="subtle"
                  size="lg"
                  class="mb-2 gap-2 rounded-lg border border-default text-xs font-semibold"
                >
                  <template #leading>
                    <span class="size-1.5 animate-pulse rounded-full bg-primary" />
                  </template>
                  {{ t('Konsultasi Cepat (3 Tahap)') }}
                </UBadge>
                <Transition name="swap" mode="out-in">
                  <h3 :key="quizTitle" class="font-heading text-xl tracking-tight text-highlighted sm:text-2xl lg:text-3xl">
                    {{ quizTitle }}
                  </h3>
                </Transition>
              </div>

              <div class="flex items-center gap-2">
                <Transition name="swap" mode="out-in">
                  <span :key="step" class="whitespace-nowrap text-xs text-muted">
                    {{ step <= 3 ? `Tahap ${step} dari 3` : 'Selesai' }}
                  </span>
                </Transition>
                <UButton
                  v-if="step > 1"
                  color="neutral"
                  variant="outline"
                  size="xs"
                  icon="lucide:arrow-left"
                  class="ml-2 hover:border-primary/40 hover:text-primary"
                  @click="goToStep(step - 1)"
                >
                  {{ t('Kembali') }}
                </UButton>
              </div>
            </div>

            <UStepper :model-value="step" :items="stepperItems" disabled size="sm" class="w-full" />
            <USeparator class="mt-6" />
          </div>

          <Transition :name="`step-${stepDir}`" mode="out-in">
          <!-- Steps 1-3: pick an option, auto-advance -->
          <URadioGroup
            v-if="currentQuiz"
            :key="currentQuiz.key"
            v-model="answers[currentQuiz.key]"
            :items="currentQuiz.options"
            variant="card"
            indicator="hidden"
            class="relative z-10"
            :ui="{
              fieldset: `quiz-options grid grid-cols-1 gap-3 ${currentQuiz.columns}`,
              item: 'group cursor-pointer rounded-xl p-4 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] sm:p-5',
              wrapper: 'w-full items-stretch gap-0 text-left',
              label: 'w-full cursor-pointer'
            }"
            @update:model-value="step++"
          >
            <template #label="{ item }">
              <span class="flex h-full flex-col justify-between">
                <span class="block">
                  <span v-if="item.glyph || item.badge" class="mb-3 flex items-center justify-between gap-2">
                    <span
                      v-if="item.glyph"
                      class="flex size-10 items-center justify-center rounded-lg transition-colors"
                      :class="selectedAnswer === item.value ? 'bg-primary text-inverted' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-inverted'"
                    >
                      <UIcon :name="item.glyph" class="size-5" />
                    </span>
                    <UBadge
                      v-if="item.badge"
                      color="neutral"
                      variant="outline"
                      class="rounded text-xs font-medium"
                    >
                      {{ item.badge }}
                    </UBadge>
                  </span>
                  <span class="block mb-1 font-heading text-base text-highlighted transition-colors group-hover:text-primary">
                    {{ item.label }}
                  </span>
                  <span class="block text-xs font-normal leading-relaxed text-muted">
                    {{ item.desc }}
                  </span>
                </span>

                <span class="mt-4 flex items-center justify-between border-t border-default/30 pt-3 text-xs font-normal text-muted group-hover:text-primary">
                  <span>{{ selectedAnswer === item.value ? 'Terpilih' : currentQuiz?.hint }}</span>
                  <UIcon name="lucide:arrow-right" class="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </span>
            </template>
          </URadioGroup>

          <!-- Step 4: summary & send -->
          <div v-else key="summary" class="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            <div class="rounded-xl border border-default bg-elevated p-5 shadow-inner sm:p-6 lg:col-span-7 dark:bg-black/60">
              <div class="mb-4 flex items-center justify-between gap-2 border-b border-default/40 pb-3">
                <span class="flex items-center gap-1.5 text-xs font-semibold text-primary">
                  <UIcon name="simple-icons:whatsapp" class="size-4 text-primary" />
                  {{ t('Format Pesan WhatsApp Otomatis') }}
                </span>
                <UButton
                  color="neutral"
                  variant="link"
                  size="xs"
                  icon="lucide:rotate-ccw"
                  class="hover:text-primary"
                  @click="resetQuiz"
                >
                  {{ t('Mulai Ulang') }}
                </UButton>
              </div>

              <div class="space-y-2 rounded-lg border border-default bg-muted/20 p-4 text-xs leading-relaxed text-highlighted/90 sm:text-sm">
                <p class="text-muted">Halo Ilham, saya ingin konsultasi proyek:</p>
                <p v-for="row in summary" :key="row.label">
                  <span class="font-bold text-primary">• {{ row.label }}:</span>
                  <span class="ml-1 text-highlighted">{{ row.value }}</span>
                </p>
                <p class="pt-1 text-muted">Bisa kita diskusikan lebih lanjut? Terima kasih!</p>
              </div>

              <div class="mt-4 flex items-center gap-2 text-xs text-muted">
                <UIcon name="lucide:video" class="size-4 shrink-0 text-primary" />
                <span>{{ t('Online meeting (Google Meet / Zoom) siap dijadwalkan setelah chat terhubung.') }}</span>
              </div>
            </div>

            <div class="flex flex-col justify-center space-y-3 lg:col-span-5">
              <UButton
                :to="whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                size="xl"
                block
                icon="simple-icons:whatsapp"
                trailing-icon="lucide:arrow-up-right"
                class="rounded-xl bg-primary font-semibold text-inverted hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] hover:bg-primary"
              >
                {{ t('Kirim ke WhatsApp Sekarang') }}
              </UButton>

              <UButton
                :to="emailUrl"
                color="neutral"
                variant="outline"
                size="lg"
                block
                icon="lucide:mail"
                class="rounded-xl border-default/60 bg-elevated text-xs transition-all duration-300 hover:scale-[1.01] hover:border-primary/60 hover:bg-elevated font-medium"
              >
                {{ t('Kirim via Email Alternatif') }}
              </UButton>

              <UButton
                color="neutral"
                variant="link"
                size="xs"
                block
                icon="lucide:arrow-left"
                class="hover:text-primary"
                @click="goToStep(1)"
              >
                {{ t('Ubah Pilihan Jawaban') }}
              </UButton>
            </div>
          </div>
          </Transition>
        </UCard>
      </div>
    </section>
  </main>
</template>
