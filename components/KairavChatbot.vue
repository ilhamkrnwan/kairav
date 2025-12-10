<template>
  <div class="fixed bottom-4 right-4 z-50">
    <!-- Chat Toggle Button -->
    <div
      v-if="!isOpen"
      @click="toggleChat"
      class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-4 rounded-full shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 animate-pulse"
    >
      <img
        src="../public/kairav.png"
        alt="Kairav Bot"
        class="w-8 h-8 rounded-full"
      />
    </div>

    <!-- Chat Window -->
    <div
      v-if="isOpen"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-all duration-300"
      :class="isExpanded ? 'w-[90vw] max-w-4xl h-[80vh]' : 'w-96 h-[500px]'"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img
            src="../public/kairav.png"
            alt="Kairav Bot"
            class="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <h3 class="font-bold text-lg">Get in Touch</h3>
            <p class="text-xs opacity-90">
              {{ isTyping ? 'Typing...' : 'Online' }}
            </p>
          </div>
        </div>
        
        <div class="flex items-center space-x-2">
          <!-- Expand/Collapse Button -->
          <button
            @click="toggleExpand"
            class="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-white/20"
            :title="isExpanded ? 'Minimize' : 'Expand'"
          >
            <svg v-if="!isExpanded" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9l6 6m0-6l-6 6m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <!-- Close Button -->
          <button
            @click="toggleChat"
            class="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-white/20"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Messages -->
      <div
        ref="messagesContainer"
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
      >
        <div
          v-for="message in messages"
          :key="message.id"
          class="flex"
          :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
        >
          <div
            class="px-4 py-2 rounded-lg"
            :class="[
              message.sender === 'user'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600',
              isExpanded ? 'max-w-3xl' : 'max-w-xs lg:max-w-md'
            ]"
          >
            <!-- Regular text message -->
            <div v-if="!message.hasComponent" class="text-sm">
              <div v-html="formatMessageText(message.text)"></div>
            </div>
            
            <!-- Message with component -->
            <div v-else class="text-sm">
              <div v-if="message.textBeforeComponent" class="mb-3" v-html="formatMessageText(message.textBeforeComponent)"></div>
              
              <!-- ButtonWhatsApp Component -->
              <div class="flex justify-center my-2">
                <ButtonWhatsApp />
              </div>
              
              <div v-if="message.textAfterComponent" class="mt-3" v-html="formatMessageText(message.textAfterComponent)"></div>
            </div>
            
            <p class="text-xs mt-1 opacity-70">
              {{ formatTime(message.timestamp) }}
            </p>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex justify-start">
          <div class="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg">
            <div class="flex space-x-2">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input
            v-model="currentMessage"
            type="text"
            placeholder="Type your message..."
            class="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-gray-200"
            :disabled="isTyping"
          />
          <button
            type="submit"
            :disabled="!currentMessage.trim() || isTyping"
            class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

// Props untuk custom prompt
const props = defineProps({
  customPrompt: {
    type: String,
    default: 'Anda adalah asisten AI bernama Kairav yang membantu pengguna dengan ramah dan informatif.'
  },
  geminiApiKey: {
    type: String,
    required: true
  }
})

// Reactive data
const isOpen = ref(false)
const isExpanded = ref(false)
const currentMessage = ref('')
const messages = ref([])
const isTyping = ref(false)
const messagesContainer = ref(null)
const whatsappButtonShown = ref(false) // Track if WhatsApp button has been shown

// Audio refs
const kairavSoundEffect = ref(null)
const messageSoundEffect = ref(null)

// Format message text with HTML formatting support
const formatMessageText = (text) => {
  if (!text) return ''
  
  return text
    // Bold: **text** or __text__
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    
    // Italic: *text* or _text_
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    
    // Code: `text`
    .replace(/`(.*?)`/g, '<code class="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">$1</code>')
    
    // Line breaks
    .replace(/\n/g, '<br>')
    
    // Links (basic detection)
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-500 underline">$1</a>')
}

// Toggle chat window
const toggleChat = () => {
  isOpen.value = !isOpen.value
  
  // Reset expand state when closing
  if (!isOpen.value) {
    isExpanded.value = false
  } else {
    // Reset WhatsApp button flag when opening chat
    whatsappButtonShown.value = false
  }
  
  // Play Kairav sound effect
  playKairavSound()
  
  if (isOpen.value && messages.value.length === 0) {
    // Add welcome message without sound since toggle already played sound
    addMessage('bot', 'Hello! I am **Kairav AI**. How can I assist you today? 😊', false)
  }
}

// Toggle expand
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  nextTick(() => {
    scrollToBottom()
  })
}

// Improved function to check if message should show WhatsApp button
const shouldShowWhatsAppButton = (text) => {
  // Return false if WhatsApp button has already been shown
  if (whatsappButtonShown.value) {
    return false
  }
  
  const endingPhrases = [
    'terima kasih',
    'thanks',
    'thx',
    'cukup',
    'bye',
    'selesai',
    'sampai jumpa',
    'kurang jelas',
    'nggak puas',
    'tidak puas',
    'masih bingung',
    'bingung',
    'tidak mengerti',
    'hubungi langsung',
    'contact',
    'whatsapp'
  ]
  
  const lowerText = text.toLowerCase()
  const shouldShow = endingPhrases.some(phrase => lowerText.includes(phrase))
  
  // If we decide to show the button, mark it as shown
  if (shouldShow) {
    whatsappButtonShown.value = true
  }
  
  return shouldShow
}

// Parse message for components (improved logic)
const parseMessageForComponents = (text) => {
  // Check if message contains ButtonWhatsApp component
  const componentRegex = /<span>\s*<ButtonWhatsApp\s*\/>\s*<\/span>/gi
  
  if (componentRegex.test(text)) {
    const parts = text.split(componentRegex)
    return {
      hasComponent: true,
      textBeforeComponent: parts[0]?.trim() || '',
      textAfterComponent: parts[1]?.trim() || ''
    }
  }
  
  return {
    hasComponent: false,
    text: text
  }
}

// Add message to chat
const addMessage = (sender, text, playSound = true) => {
  const parsedMessage = parseMessageForComponents(text)
  
  const messageData = {
    id: Date.now(),
    sender,
    timestamp: new Date(),
    ...parsedMessage
  }
  
  messages.value.push(messageData)
  
  // Play message sound effect
  if (playSound) {
    playMessageSound()
  }
  
  nextTick(() => {
    scrollToBottom()
  })
}

// Scroll to bottom
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Format time
const formatTime = (timestamp) => {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(timestamp)
}

// Send message
const sendMessage = async () => {
  if (!currentMessage.value.trim()) return

  const userMessage = currentMessage.value.trim()
  addMessage('user', userMessage)
  currentMessage.value = ''

  // Start typing indicator
  isTyping.value = true

  try {
    const response = await callGeminiAPI(userMessage)
    
    // Stop typing indicator
    isTyping.value = false
    
    // Faster typing effect
    await typeWriterEffect(response)
  } catch (error) {
    isTyping.value = false
    addMessage('bot', 'Sorry, an error occurred. Please try again later.')
    console.error('Error calling Gemini API:', error)
  }
}

// Call Gemini API with marketing focus
const callGeminiAPI = async (message) => {
  const whatsappStatus = whatsappButtonShown.value
    ? 'SUDAH DITAMPILKAN - JANGAN TAMPILKAN LAGI'
    : 'BELUM DITAMPILKAN'

  const enhancedPrompt = `
Anda adalah **asisten marketing pribadi Kairav**. 
Tugas Anda adalah mempromosikan jasa dan kemampuan Kairav dengan cara natural, sopan, dan tidak memaksa.

GAYA KOMUNIKASI:
- Ramah, profesional, dan meyakinkan.
- Selalu sisipkan informasi bahwa Kairav adalah Fullstack Developer yang bisa mengerjakan Web, Mobile, AI, dan IoT.
- Jika user ingin bikin web / project, tanyakan kebutuhan, fitur, dan teknologi yang diinginkan.
- Gunakan format **bold** untuk penekanan, *italic* untuk detail tambahan.
- Maksimal 2 paragraf singkat dan to the point.

TARGET:
- Bawa percakapan agar user mau menghubungi Kairav via WhatsApp.
- Jika percakapan mulai panjang atau mengarah penutupan → kasih tombol WA.

KOMPONEN TOMBOL WHATSAPP: <span><ButtonWhatsApp /></span>

STATUS TOMBOL WHATSAPP: ${whatsappStatus}

ATURAN TOMBOL WHATSAPP:
- Hanya boleh muncul MAKSIMAL 1 KALI per sesi chat.
- Tampilkan jika STATUS = "BELUM DITAMPILKAN" DAN:
  1. User ingin mengakhiri chat.
  2. User bingung / kurang jelas / tidak puas.
  3. User minta kontak langsung.
- Jangan tampilkan lagi jika STATUS = "SUDAH DITAMPILKAN".

User: ${message}
Assistant:
`

  const response = await $fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
    method: 'POST',
    query: {
      key: props.geminiApiKey
    },
    body: {
      contents: [{
        parts: [{
          text: enhancedPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 300, // Reduced for shorter responses
      },
    }
  })

  return response.candidates[0]?.content?.parts[0]?.text || 'Sorry, I could not understand your question.'
}

// Faster typewriter effect with component support
const typeWriterEffect = async (text) => {
  const parsedMessage = parseMessageForComponents(text)
  
  if (parsedMessage.hasComponent) {
    // For messages with components, use faster typing for text parts
    const messageId = Date.now()
    messages.value.push({
      id: messageId,
      sender: 'bot',
      textBeforeComponent: '',
      textAfterComponent: '',
      hasComponent: true,
      timestamp: new Date()
    })

    const messageIndex = messages.value.findIndex(m => m.id === messageId)
    
    // Play sound when bot starts responding
    playMessageSound()
    
    // Fast typing for text before component (3ms delay)
    const beforeText = parsedMessage.textBeforeComponent
    for (let i = 0; i < beforeText.length; i++) {
      messages.value[messageIndex].textBeforeComponent += beforeText[i]
      await new Promise(resolve => setTimeout(resolve, 3))
      scrollToBottom()
    }
    
    // Small pause before showing after text
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // Fast typing for text after component if exists
    const afterText = parsedMessage.textAfterComponent
    for (let i = 0; i < afterText.length; i++) {
      messages.value[messageIndex].textAfterComponent += afterText[i]
      await new Promise(resolve => setTimeout(resolve, 3))
      scrollToBottom()
    }
    
    return
  }
  
  // Super fast typewriter effect for normal messages (3ms delay)
  const messageId = Date.now()
  messages.value.push({
    id: messageId,
    sender: 'bot',
    text: '',
    hasComponent: false,
    timestamp: new Date()
  })

  const messageIndex = messages.value.findIndex(m => m.id === messageId)
  
  // Play sound when bot starts responding
  playMessageSound()
  
  // Much faster typing (3ms instead of 5ms)
  for (let i = 0; i < text.length; i++) {
    messages.value[messageIndex].text += text[i]
    await new Promise(resolve => setTimeout(resolve, 3))
    scrollToBottom()
  }
}

// Play sound effects
const playKairavSound = () => {
  if (kairavSoundEffect.value) {
    kairavSoundEffect.value.currentTime = 0
    kairavSoundEffect.value.play().catch(e => {
      console.log('Error playing Kairav sound:', e)
    })
  }
}

const playMessageSound = () => {
  if (messageSoundEffect.value) {
    messageSoundEffect.value.currentTime = 0
    messageSoundEffect.value.play().catch(e => {
      console.log('Error playing message sound:', e)
    })
  }
}

// Initialize audio on mount
onMounted(() => {
  // Initialize audio elements
  kairavSoundEffect.value = new Audio('/sound-effect/kairav-sound-effect.mp3')
  messageSoundEffect.value = new Audio('/sound-effect/message-sound-effect.mp3')
  
  // Set audio properties
  if (kairavSoundEffect.value) {
    kairavSoundEffect.value.volume = 0.7
    kairavSoundEffect.value.preload = 'auto'
  }
  
  if (messageSoundEffect.value) {
    messageSoundEffect.value.volume = 0.5
    messageSoundEffect.value.preload = 'auto'
  }
})
</script>

<style scoped>
@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* Smooth transitions for expand/collapse */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Styling for formatted text */
:deep(strong) {
  font-weight: 600;
}

:deep(em) {
  font-style: italic;
}

:deep(code) {
  font-family: 'Courier New', monospace;
  font-size: 0.85em;
}

:deep(a) {
  transition: color 0.2s;
}

:deep(a:hover) {
  color: #3b82f6 !important;
}
</style>