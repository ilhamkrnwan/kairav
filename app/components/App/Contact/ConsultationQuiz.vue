<script setup lang="ts">
import { ref, computed } from 'vue'

const { t } = useI18n()

// Current Step: 1, 2, 3, or 4 (Summary)
const currentStep = ref(1)

// Selections
const selectedService = ref<string>('')
const selectedTimeline = ref<string>('')
const selectedBudget = ref<string>('')

// Step 1: Project Needs / Services
const serviceOptions = computed(() => [
  {
    id: 'web',
    title: t('Website Modern & Branding'),
    desc: t('Landing page, company profile, e-commerce, atau website portofolio interaktif berkinerja tinggi.'),
    icon: 'lucide:globe',
    badge: 'Popular',
  },
  {
    id: 'mobile',
    title: t('Aplikasi Mobile'),
    desc: t('Aplikasi Android, iOS, atau solusi multiplatform modern dengan performa native.'),
    icon: 'lucide:smartphone',
    badge: 'Mobile',
  },
  {
    id: 'dashboard',
    title: t('Custom Dashboard & Web App'),
    desc: t('Sistem admin internal, dashboard analitik, platform SaaS, atau portal bisnis.'),
    icon: 'lucide:layout-dashboard',
    badge: 'System',
  },
  {
    id: 'ai',
    title: t('Solusi AI & Otomasi'),
    desc: t('Integrasi LLM/AI, chatbot cerdas, workflow automation, atau sistem berbasis Machine Learning.'),
    icon: 'lucide:sparkles',
    badge: 'AI / ML',
  },
  {
    id: 'other',
    title: t('Konsultasi & Kolaborasi Tim'),
    desc: t('Diskusi arsitektur teknis, audit performa website, atau kolaborasi gabung tim proyek.'),
    icon: 'lucide:messages-square',
    badge: 'Discuss',
  },
])

// Step 2: Timeline
const timelineOptions = computed(() => [
  {
    id: 'urgent',
    title: t('Segera (< 2 Minggu)'),
    desc: t('Kebutuhan prioritas tinggi, sprint cepat, atau perbaikan mendesak.'),
    icon: 'lucide:zap',
  },
  {
    id: 'standard',
    title: t('1 – 2 Bulan'),
    desc: t('Timeline pengerjaan standar & ideal untuk kualitas optimal.'),
    icon: 'lucide:calendar',
  },
  {
    id: 'flexible',
    title: t('> 2 Bulan / Fleksibel'),
    desc: t('Proyek bertahap, produk skala besar, atau pengembangan berkelanjutan.'),
    icon: 'lucide:clock',
  },
  {
    id: 'planning',
    title: t('Tahap Perencanaan & Ide'),
    desc: t('Belum ada deadline pasti, ingin diskusi kelayakan dan konsep terlebih dahulu.'),
    icon: 'lucide:lightbulb',
  },
])

// Step 3: Budget Range
const budgetOptions = computed(() => [
  {
    id: 'b1',
    title: t('< Rp 5 Juta'),
    desc: t('Landing page ringkas, branding starter, atau perbaikan fitur terarah.'),
    badge: 'Starter',
  },
  {
    id: 'b2',
    title: t('Rp 5 – 15 Juta'),
    desc: t('Website bisnis lengkap, company profile custom, atau web app skala menengah.'),
    badge: 'Standard',
  },
  {
    id: 'b3',
    title: t('Rp 15 – 30 Juta'),
    desc: t('Aplikasi mobile custom, dashboard komprehensif, atau integrasi sistem fullstack.'),
    badge: 'Pro',
  },
  {
    id: 'b4',
    title: t('> Rp 30 Juta'),
    desc: t('Platform skala enterprise, arsitektur multi-layanan, atau solusi AI custom.'),
    badge: 'Enterprise',
  },
  {
    id: 'b5',
    title: t('Fleksibel / Diskusi Terbuka'),
    desc: t('Estimasi akan disesuaikan secara transparan setelah rincian fitur dibahas.'),
    badge: 'Konsultasi',
  },
])

// Step Selection Handlers
const selectService = (title: string) => {
  selectedService.value = title
  currentStep.value = 2
}

const selectTimeline = (title: string) => {
  selectedTimeline.value = title
  currentStep.value = 3
}

const selectBudget = (title: string) => {
  selectedBudget.value = title
  currentStep.value = 4
}

const goToStep = (step: number) => {
  if (step >= 1 && step <= 4) {
    currentStep.value = step
  }
}

const resetQuiz = () => {
  selectedService.value = ''
  selectedTimeline.value = ''
  selectedBudget.value = ''
  currentStep.value = 1
}

// WhatsApp URL Generator
const whatsappUrl = computed(() => {
  const phone = '6287761296676'
  const service = selectedService.value || 'Belum dipilih'
  const timeline = selectedTimeline.value || 'Belum dipilih'
  const budget = selectedBudget.value || 'Belum dipilih'

  const message = [
    'Halo Ilham, saya ingin konsultasi proyek:',
    `• Kebutuhan: ${service}`,
    `• Target Waktu: ${timeline}`,
    `• Estimasi Budget: ${budget}`,
    '',
    'Bisa kita diskusikan lebih lanjut? Terima kasih!'
  ].join('\n')

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
})

// Mailto URL Generator
const emailUrl = computed(() => {
  const email = 'ilhamkurniawanjateng@gmail.com'
  const subject = `Konsultasi Proyek: ${selectedService.value || 'Diskusi Digital'}`
  const body = [
    'Halo Ilham,',
    '',
    'Saya ingin berkonsultasi mengenai proyek dengan rincian kebutuhan berikut:',
    `- Kebutuhan: ${selectedService.value || '-'}`,
    `- Target Waktu: ${selectedTimeline.value || '-'}`,
    `- Estimasi Budget: ${selectedBudget.value || '-'}`,
    '',
    'Mohon informasi ketersediaan jadwal meeting online atau diskusi lebih lanjut.',
    '',
    'Terima kasih.'
  ].join('\n')

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
})
</script>

<template>
  <div
    class="relative w-full rounded-2xl overflow-hidden border border-amber-400/30 bg-background/80 dark:bg-[#0c0a08]/90 backdrop-blur-xl shadow-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300"
  >
    <!-- Background Ambient Glow Accents -->
    <div
      aria-hidden="true"
      class="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"
    />
    <div
      aria-hidden="true"
      class="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"
    />

    <!-- Header & Step Progress Indicator -->
    <div class="relative z-10 mb-8 pb-6 border-b border-border/40">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-amber-400/30 bg-amber-400/10 text-amber-500 dark:text-amber-400 text-[11px] font-mono uppercase tracking-widest mb-2 font-semibold">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {{ t('Konsultasi Cepat (3 Tahap)') }}
          </div>
          <h3 class="text-xl sm:text-2xl lg:text-3xl font-heading font-black tracking-tight text-foreground">
            {{ currentStep === 1 ? t('1. Apa jenis solusi digital yang Anda butuhkan?') :
               currentStep === 2 ? t('2. Berapa target timeline pengerjaan yang diinginkan?') :
               currentStep === 3 ? t('3. Berapa estimasi budget yang dialokasikan?') :
               t('Ringkasan Kebutuhan Proyek Siap Dikirim!') }}
          </h3>
        </div>

        <!-- Step Pill Indicator -->
        <div class="flex items-center gap-2">
          <div class="text-xs font-mono text-muted-foreground whitespace-nowrap">
            {{ currentStep <= 3 ? `Tahap ${currentStep} dari 3` : 'Selesai' }}
          </div>
          <button
            v-if="currentStep > 1"
            type="button"
            class="text-xs font-mono text-muted-foreground hover:text-amber-400 transition-colors inline-flex items-center gap-1 cursor-pointer ml-2 px-2.5 py-1 rounded border border-border/40 hover:border-amber-400/40"
            @click="goToStep(currentStep - 1)"
          >
            <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
            <span>{{ t('Kembali') }}</span>
          </button>
        </div>
      </div>

      <!-- Visual Step Progress Bar -->
      <div class="w-full h-1.5 bg-muted/40 rounded-full overflow-hidden flex gap-1">
        <div
          class="h-full transition-all duration-500 rounded-full"
          :class="currentStep >= 1 ? 'bg-amber-400 flex-1' : 'bg-muted/30 flex-1'"
        />
        <div
          class="h-full transition-all duration-500 rounded-full"
          :class="currentStep >= 2 ? 'bg-amber-400 flex-1' : 'bg-muted/30 flex-1'"
        />
        <div
          class="h-full transition-all duration-500 rounded-full"
          :class="currentStep >= 3 ? 'bg-amber-400 flex-1' : 'bg-muted/30 flex-1'"
        />
      </div>
    </div>

    <!-- ─── TAHAP 1: JENIS LAYANAN ─── -->
    <div v-if="currentStep === 1" class="relative z-10 space-y-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <button
          v-for="item in serviceOptions"
          :key="item.id"
          type="button"
          class="group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer"
          :class="selectedService === item.title
            ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/10'
            : 'border-border/50 bg-background/50 hover:border-amber-400/50 hover:bg-background/80 hover:scale-[1.01]'"
          @click="selectService(item.title)"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                :class="selectedService === item.title ? 'bg-amber-400 text-black' : 'bg-amber-400/10 text-amber-500 group-hover:bg-amber-400 group-hover:text-black'"
              >
                <Icon :name="item.icon" class="w-5 h-5" />
              </div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border/40 px-2 py-0.5 rounded">
                {{ item.badge }}
              </span>
            </div>
            <h4 class="font-heading font-bold text-base text-foreground mb-1 group-hover:text-amber-500 transition-colors">
              {{ item.title }}
            </h4>
            <p class="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {{ item.desc }}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-amber-500">
            <span>{{ selectedService === item.title ? '✓ Terpilih' : 'Pilih opsi ini' }}</span>
            <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>

    <!-- ─── TAHAP 2: TIMELINE / TARGET WAKTU ─── -->
    <div v-else-if="currentStep === 2" class="relative z-10 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          v-for="item in timelineOptions"
          :key="item.id"
          type="button"
          class="group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer"
          :class="selectedTimeline === item.title
            ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/10'
            : 'border-border/50 bg-background/50 hover:border-amber-400/50 hover:bg-background/80 hover:scale-[1.01]'"
          @click="selectTimeline(item.title)"
        >
          <div class="flex items-start gap-4">
            <div
              class="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors"
              :class="selectedTimeline === item.title ? 'bg-amber-400 text-black' : 'bg-amber-400/10 text-amber-500 group-hover:bg-amber-400 group-hover:text-black'"
            >
              <Icon :name="item.icon" class="w-5 h-5" />
            </div>
            <div>
              <h4 class="font-heading font-bold text-base text-foreground mb-1 group-hover:text-amber-500 transition-colors">
                {{ item.title }}
              </h4>
              <p class="text-xs text-muted-foreground leading-relaxed">
                {{ item.desc }}
              </p>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-amber-500">
            <span>{{ selectedTimeline === item.title ? '✓ Terpilih' : 'Pilih timeline ini' }}</span>
            <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>

    <!-- ─── TAHAP 3: ESTIMASI BUDGET ─── -->
    <div v-else-if="currentStep === 3" class="relative z-10 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <button
          v-for="item in budgetOptions"
          :key="item.id"
          type="button"
          class="group relative text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between cursor-pointer"
          :class="selectedBudget === item.title
            ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/10'
            : 'border-border/50 bg-background/50 hover:border-amber-400/50 hover:bg-background/80 hover:scale-[1.01]'"
          @click="selectBudget(item.title)"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-[10px] font-mono uppercase tracking-wider text-amber-500 border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 rounded font-semibold">
                {{ item.badge }}
              </span>
            </div>
            <h4 class="font-heading font-black text-lg text-foreground mb-1 group-hover:text-amber-500 transition-colors">
              {{ item.title }}
            </h4>
            <p class="text-xs text-muted-foreground leading-relaxed">
              {{ item.desc }}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-border/30 flex items-center justify-between text-xs font-mono text-muted-foreground group-hover:text-amber-500">
            <span>{{ selectedBudget === item.title ? '✓ Terpilih' : 'Pilih estimasi' }}</span>
            <Icon name="lucide:arrow-right" class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>

    <!-- ─── TAHAP 4: SUMMARY & SEND TO WA ─── -->
    <div v-else class="relative z-10 space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <!-- Message Card Preview (7 cols) -->
        <div class="lg:col-span-7 bg-background/90 dark:bg-black/60 border border-border/60 rounded-xl p-5 sm:p-6 shadow-inner">
          <div class="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border/40">
            <span class="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold flex items-center gap-1.5">
              <Icon name="simple-icons:whatsapp" class="w-4 h-4 text-emerald-500" />
              {{ t('Format Pesan WhatsApp Otomatis') }}
            </span>
            <button
              type="button"
              class="text-xs font-mono text-muted-foreground hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
              @click="resetQuiz"
            >
              <Icon name="lucide:rotate-ccw" class="w-3 h-3" />
              <span>{{ t('Mulai Ulang') }}</span>
            </button>
          </div>

          <div class="font-mono text-xs sm:text-sm text-foreground/90 space-y-2 leading-relaxed bg-muted/20 p-4 rounded-lg border border-border/30">
            <p class="text-muted-foreground">Halo Ilham, saya ingin konsultasi proyek:</p>
            <p>
              <span class="text-amber-500 font-bold">• Layanan:</span>
              <span class="text-foreground ml-1">{{ selectedService }}</span>
            </p>
            <p>
              <span class="text-amber-500 font-bold">• Target Waktu:</span>
              <span class="text-foreground ml-1">{{ selectedTimeline }}</span>
            </p>
            <p>
              <span class="text-amber-500 font-bold">• Estimasi Budget:</span>
              <span class="text-foreground ml-1">{{ selectedBudget }}</span>
            </p>
            <p class="text-muted-foreground pt-1">Bisa kita diskusikan lebih lanjut? Terima kasih!</p>
          </div>

          <!-- Meeting note -->
          <div class="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="lucide:video" class="w-4 h-4 text-amber-400 shrink-0" />
            <span>{{ t('Online meeting (Google Meet / Zoom) siap dijadwalkan setelah chat terhubung.') }}</span>
          </div>
        </div>

        <!-- Action CTAs (5 cols) -->
        <div class="lg:col-span-5 flex flex-col justify-center space-y-3">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="group w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-heading font-black text-sm uppercase tracking-wider bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.02] text-center cursor-pointer"
          >
            <Icon name="simple-icons:whatsapp" class="w-5 h-5 text-black" />
            <span>{{ t('Kirim ke WhatsApp Sekarang') }}</span>
            <Icon name="lucide:arrow-up-right" class="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            :href="emailUrl"
            class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider border border-border/60 hover:border-amber-400/60 bg-background/60 hover:bg-background/90 text-foreground transition-all duration-300 hover:scale-[1.01] text-center cursor-pointer"
          >
            <Icon name="lucide:mail" class="w-4 h-4 text-muted-foreground" />
            <span>{{ t('Kirim via Email Alternatif') }}</span>
          </a>

          <button
            type="button"
            class="w-full text-center text-xs font-mono text-muted-foreground hover:text-amber-400 py-2 transition-colors cursor-pointer"
            @click="goToStep(1)"
          >
            {{ t('← Ubah Pilihan Jawaban') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
