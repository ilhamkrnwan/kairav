import sharp from 'sharp';
import fs from 'fs';

const width = 1536;
const height = 1024;

async function generateApiAiIllustration() {
  const svgContent = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Background Gradient -->
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F8FAFC" />
          <stop offset="50%" stop-color="#F1F5F9" />
          <stop offset="100%" stop-color="#E2E8F0" />
        </linearGradient>

        <!-- Ambient Warm Glow -->
        <radialGradient id="warmAmbient" cx="25%" cy="35%" r="50%">
          <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
        </radialGradient>

        <!-- Ambient Blue Glow -->
        <radialGradient id="blueAmbient" cx="80%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.10" />
          <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
        </radialGradient>

        <!-- Card Glow & Shadow -->
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="25" flood-color="#0F172A" flood-opacity="0.12" />
        </filter>
        <filter id="phoneShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="10" dy="25" stdDeviation="20" flood-color="#0F172A" flood-opacity="0.18" />
        </filter>
        <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#F59E0B" flood-opacity="0.45" />
        </filter>
        <filter id="aiGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#8B5CF6" flood-opacity="0.3" />
        </filter>

        <!-- Dot Pattern Grid -->
        <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.5" fill="#CBD5E1" opacity="0.6" />
        </pattern>

        <!-- Gradients for UI Elements -->
        <linearGradient id="aiCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>

        <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#D97706" />
        </linearGradient>

        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B5CF6" />
          <stop offset="100%" stop-color="#6D28D9" />
        </linearGradient>

        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10B981" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
      </defs>

      <!-- Canvas Background -->
      <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
      <rect width="${width}" height="${height}" fill="url(#warmAmbient)" />
      <rect width="${width}" height="${height}" fill="url(#blueAmbient)" />

      <!-- Top decorative dot grid box -->
      <rect x="1100" y="60" width="160" height="90" fill="url(#dotGrid)" rx="4" />
      <rect x="360" y="80" width="180" height="40" fill="url(#dotGrid)" rx="4" />

      <!-- ================= LEFT FLOATING 3D PROPS ================= -->
      <!-- 1. AI Assistant Orb / Brain Card Top Left -->
      <g filter="url(#softShadow)" transform="translate(100, 140)">
        <rect width="130" height="130" rx="24" fill="#FFFFFF" />
        <!-- Floating 3D AI Icon -->
        <circle cx="65" cy="55" r="32" fill="url(#orangeGrad)" filter="url(#nodeGlow)" />
        <path d="M 52 55 Q 65 40 78 55 Q 65 70 52 55 Z" fill="#FFFFFF" opacity="0.9" />
        <circle cx="65" cy="55" r="7" fill="#FFFFFF" />
        <circle cx="85" cy="38" r="4" fill="#FDE68A" />
        <circle cx="45" cy="70" r="3" fill="#FDE68A" />
        <text x="65" y="108" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#1E293B" text-anchor="middle">AI Agent</text>
        <text x="65" y="120" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" fill="#10B981" text-anchor="middle">● Active</text>
      </g>

      <!-- 2. Cloud Server Rack & API Shield (Middle-Left) -->
      <g filter="url(#softShadow)" transform="translate(80, 320)">
        <!-- Pedestal / Base Platform -->
        <ellipse cx="65" cy="190" rx="80" ry="25" fill="#E2E8F0" opacity="0.7" />
        
        <!-- Server Racks Stack -->
        <!-- Server 1 -->
        <rect x="15" y="70" width="100" height="28" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
        <circle cx="30" cy="84" r="3" fill="#10B981" />
        <circle cx="40" cy="84" r="3" fill="#3B82F6" />
        <line x1="60" y1="84" x2="95" y2="84" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />

        <!-- Server 2 -->
        <rect x="15" y="106" width="100" height="28" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
        <circle cx="30" cy="120" r="3" fill="#10B981" />
        <circle cx="40" cy="120" r="3" fill="#F59E0B" />
        <line x1="60" y1="120" x2="95" y2="120" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />

        <!-- Server 3 -->
        <rect x="15" y="142" width="100" height="28" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
        <circle cx="30" cy="156" r="3" fill="#10B981" />
        <circle cx="40" cy="156" r="3" fill="#10B981" />
        <line x1="60" y1="156" x2="95" y2="156" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />

        <!-- Security / API Shield Badge -->
        <g transform="translate(40, 15)">
          <polygon points="25,5 45,15 45,40 25,55 5,40 5,15" fill="url(#orangeGrad)" />
          <path d="M 25 20 L 25 38 M 18 28 L 32 28" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" />
        </g>
      </g>

      <!-- 3. Developer Working at Desk (Bottom-Left) -->
      <g transform="translate(100, 560)">
        <!-- Plant Left -->
        <g transform="translate(-40, 180)">
          <ellipse cx="30" cy="80" rx="20" ry="8" fill="#CBD5E1" />
          <path d="M 18 55 L 42 55 L 38 80 L 22 80 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
          <!-- Leaves -->
          <path d="M 30 55 C 10 30 15 10 30 5 C 45 10 50 30 30 55 Z" fill="#10B981" />
          <path d="M 28 55 C 5 45 0 25 15 20 C 25 25 28 45 28 55 Z" fill="#059669" />
          <path d="M 32 55 C 55 45 60 25 45 20 C 35 25 32 45 32 55 Z" fill="#34D399" />
        </g>

        <!-- Desk & Chair -->
        <rect x="110" y="170" width="130" height="8" rx="3" fill="#E2E8F0" />
        <line x1="130" y1="178" x2="120" y2="280" stroke="#94A3B8" stroke-width="4" />
        <line x1="220" y1="178" x2="230" y2="280" stroke="#94A3B8" stroke-width="4" />

        <!-- Laptop on desk -->
        <path d="M 140 170 L 175 140 L 195 140 L 180 170 Z" fill="#334155" />
        <path d="M 135 170 L 185 170 L 180 174 L 130 174 Z" fill="#64748B" />
        <polygon points="144,168 172,144 190,144 162,168" fill="#38BDF8" opacity="0.8" />

        <!-- 3D Stylized Male Developer -->
        <g transform="translate(60, 40)">
          <!-- Chair -->
          <path d="M 30 120 L 50 120 L 45 170 L 25 170 Z" fill="#CBD5E1" />
          <line x1="37" y1="170" x2="30" y2="240" stroke="#64748B" stroke-width="5" />
          
          <!-- Legs -->
          <path d="M 45 130 L 75 135 L 70 200 L 95 240" stroke="#1E293B" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <!-- Shoes -->
          <ellipse cx="105" cy="245" rx="14" ry="7" fill="#0F172A" />

          <!-- Body / Orange Sweater -->
          <path d="M 25 70 C 25 45 65 45 70 70 L 65 135 C 50 140 35 140 25 135 Z" fill="#F59E0B" />
          
          <!-- Arms typing -->
          <path d="M 55 70 L 90 95 L 115 90" stroke="#D97706" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <circle cx="118" cy="90" r="6" fill="#FBCFE8" />

          <!-- Head -->
          <circle cx="48" cy="30" r="16" fill="#FBCFE8" />
          <!-- Hair -->
          <path d="M 35 28 C 35 12 60 10 62 25 C 55 20 45 20 35 28 Z" fill="#0F172A" />
        </g>
      </g>


      <!-- ================= CENTER MAIN UI: API & AI WORKFLOW ================= -->
      <g filter="url(#softShadow)" transform="translate(290, 110)">
        <!-- Outer Card Frame -->
        <rect width="840" height="780" rx="20" fill="#FFFFFF" />

        <!-- Dark Sidebar Left -->
        <path d="M 0 20 Q 0 0 20 0 L 160 0 L 160 780 L 20 780 Q 0 780 0 760 Z" fill="#0F172A" />

        <!-- Sidebar Brand / Logo -->
        <g transform="translate(24, 28)">
          <rect width="24" height="24" rx="6" fill="#F59E0B" />
          <circle cx="8" cy="8" r="3" fill="#FFFFFF" />
          <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
          <line x1="8" y1="8" x2="16" y2="16" stroke="#FFFFFF" stroke-width="2" />
          <text x="34" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Kairav AI</text>
        </g>

        <!-- Sidebar Nav Items -->
        <g transform="translate(14, 85)">
          <!-- Active Tab: AI Pipelines -->
          <rect width="132" height="36" rx="8" fill="rgba(245, 158, 11, 0.18)" />
          <line x1="0" y1="6" x2="0" y2="30" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" />
          <circle cx="20" cy="18" r="5" fill="#F59E0B" />
          <text x="36" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#F59E0B">AI Pipelines</text>

          <!-- Nav 2: API Endpoints -->
          <g transform="translate(0, 48)">
            <circle cx="20" cy="18" r="4" fill="#64748B" />
            <text x="36" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Endpoints</text>
          </g>

          <!-- Nav 3: Webhooks -->
          <g transform="translate(0, 96)">
            <circle cx="20" cy="18" r="4" fill="#64748B" />
            <text x="36" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Webhooks</text>
          </g>

          <!-- Nav 4: LLM Models -->
          <g transform="translate(0, 144)">
            <circle cx="20" cy="18" r="4" fill="#64748B" />
            <text x="36" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">LLM Config</text>
          </g>

          <!-- Nav 5: Real-time Logs -->
          <g transform="translate(0, 192)">
            <circle cx="20" cy="18" r="4" fill="#64748B" />
            <text x="36" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Live Logs</text>
          </g>

          <!-- Nav 6: Settings -->
          <g transform="translate(0, 240)">
            <circle cx="20" cy="18" r="4" fill="#64748B" />
            <text x="36" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#94A3B8">Settings</text>
          </g>

          <!-- Bottom Status Node in Sidebar -->
          <g transform="translate(6, 560)">
            <rect width="120" height="50" rx="8" fill="#1E293B" />
            <circle cx="18" cy="25" r="5" fill="#10B981" />
            <text x="32" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Gateway API</text>
            <text x="32" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="500" fill="#10B981">99.98% Healthy</text>
          </g>
        </g>

        <!-- Main Dashboard Header -->
        <g transform="translate(180, 20)">
          <!-- Search Bar -->
          <rect width="380" height="36" rx="8" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
          <circle cx="20" cy="18" r="5" fill="none" stroke="#94A3B8" stroke-width="1.5" />
          <line x1="24" y1="22" x2="28" y2="26" stroke="#94A3B8" stroke-width="1.5" />
          <text x="38" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#94A3B8">Search workflow, trigger, LLM prompt...</text>

          <!-- Right Header Status / User Profile -->
          <g transform="translate(520, 0)">
            <rect width="110" height="36" rx="8" fill="#F1F5F9" />
            <circle cx="20" cy="18" r="9" fill="#F59E0B" />
            <text x="20" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AI</text>
            <text x="36" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#1E293B">Auto Engine</text>
            <text x="36" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="600" fill="#64748B">Production</text>
          </g>
        </g>

        <!-- Top Title -->
        <g transform="translate(180, 75)">
          <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#0F172A">Integrasi API &amp; Otomatisasi AI</text>
          <text y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748B">Visual Pipeline Builder &amp; Real-time AI Automation</text>
        </g>

        <!-- Metrics Cards Row -->
        <g transform="translate(180, 115)">
          <!-- Metric 1: Total API Requests -->
          <g transform="translate(0, 0)">
            <rect width="145" height="72" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" />
            <rect x="12" y="12" width="26" height="26" rx="6" fill="#EFF6FF" />
            <path d="M 20 25 L 30 25 M 25 20 L 30 25 L 25 30" stroke="#3B82F6" stroke-width="1.5" stroke-linecap="round" fill="none" />
            <text x="46" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#64748B">API Calls</text>
            <text x="46" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#0F172A">148.5K</text>
            <text x="12" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" fill="#10B981">↑ +24% bln ini</text>
          </g>

          <!-- Metric 2: AI Prompt Latency -->
          <g transform="translate(160, 0)">
            <rect width="145" height="72" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" />
            <rect x="12" y="12" width="26" height="26" rx="6" fill="#FEF3C7" />
            <circle cx="25" cy="25" r="7" fill="none" stroke="#F59E0B" stroke-width="1.5" />
            <polyline points="25,21 25,25 28,27" fill="none" stroke="#F59E0B" stroke-width="1.5" />
            <text x="46" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#64748B">AI Latency</text>
            <text x="46" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#0F172A">128 ms</text>
            <text x="12" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" fill="#10B981">Ultra Fast LLM</text>
          </g>

          <!-- Metric 3: Automated Actions -->
          <g transform="translate(320, 0)">
            <rect width="145" height="72" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" />
            <rect x="12" y="12" width="26" height="26" rx="6" fill="#F3E8FF" />
            <polygon points="25,18 29,26 21,26" fill="#8B5CF6" />
            <text x="46" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#64748B">Auto Tasks</text>
            <text x="46" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#0F172A">34.2K</text>
            <text x="12" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" fill="#8B5CF6">Otomatis 100%</text>
          </g>

          <!-- Metric 4: Success Rate -->
          <g transform="translate(480, 0)">
            <rect width="145" height="72" rx="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.2" />
            <rect x="12" y="12" width="26" height="26" rx="6" fill="#ECFDF5" />
            <polyline points="19,25 23,29 31,20" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" />
            <text x="46" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#64748B">Success Rate</text>
            <text x="46" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#0F172A">99.9%</text>
            <text x="12" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" fill="#10B981">Reliable &amp; Secure</text>
          </g>
        </g>

        <!-- Visual Node Pipeline Flow Canvas -->
        <g transform="translate(180, 205)">
          <rect width="630" height="280" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
          <rect width="630" height="280" fill="url(#dotGrid)" rx="12" opacity="0.5" />

          <!-- Header of Pipeline -->
          <text x="20" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#0F172A">Live Automation Flow Canvas</text>
          <rect x="490" y="14" width="120" height="22" rx="11" fill="rgba(16,185,129,0.12)" />
          <circle cx="502" cy="25" r="4" fill="#10B981" />
          <text x="512" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#059669">Pipeline Active</text>

          <!-- Connecting Curved Flow Lines -->
          <!-- Line 1: Trigger -> AI Brain -->
          <path d="M 155 125 C 190 125, 200 125, 235 125" fill="none" stroke="#F59E0B" stroke-width="3.5" stroke-dasharray="6 4" />
          <!-- Line 2: AI Brain -> Webhook -->
          <path d="M 405 105 C 440 105, 450 75, 480 75" fill="none" stroke="#10B981" stroke-width="3" />
          <!-- Line 3: AI Brain -> WhatsApp Bot -->
          <path d="M 405 145 C 440 145, 450 175, 480 175" fill="none" stroke="#25D366" stroke-width="3" />

          <!-- NODE 1: API / Webhook Trigger -->
          <g filter="url(#softShadow)" transform="translate(20, 70)">
            <rect width="135" height="110" rx="10" fill="#FFFFFF" stroke="#3B82F6" stroke-width="2" />
            <rect width="135" height="24" rx="8" fill="#EFF6FF" />
            <circle cx="14" cy="12" r="4" fill="#3B82F6" />
            <text x="24" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#1D4ED8">API TRIGGER IN</text>
            
            <text x="12" y="44" font-family="monospace" font-size="10" font-weight="700" fill="#0F172A">POST /webhook</text>
            <rect x="12" y="52" width="110" height="20" rx="4" fill="#F1F5F9" />
            <text x="16" y="66" font-family="monospace" font-size="8" fill="#64748B">Payload: JSON data</text>
            <text x="12" y="92" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="600" fill="#3B82F6">Event: New Order</text>
            <!-- Connector Pin -->
            <circle cx="135" cy="55" r="5" fill="#3B82F6" />
          </g>

          <!-- NODE 2: AI Prompt Engine & NLP Core (Center Hero Node) -->
          <g filter="url(#nodeGlow)" transform="translate(235, 50)">
            <rect width="170" height="150" rx="12" fill="#0F172A" stroke="#F59E0B" stroke-width="2.5" />
            <!-- Pin In -->
            <circle cx="0" cy="75" r="5" fill="#F59E0B" />

            <rect width="170" height="28" rx="10" fill="#1E293B" />
            <circle cx="16" cy="14" r="5" fill="#F59E0B" />
            <text x="28" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="900" fill="#F59E0B">AI CORE ENGINE</text>
            
            <text x="14" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">LLM Prompting &amp; NLP</text>
            
            <!-- Code Box inside node -->
            <rect x="12" y="58" width="146" height="52" rx="6" fill="#05070C" />
            <text x="18" y="74" font-family="monospace" font-size="8" fill="#FDE68A">system: "Process order"</text>
            <text x="18" y="88" font-family="monospace" font-size="8" fill="#10B981">ai_format_invoice()</text>
            <text x="18" y="100" font-family="monospace" font-size="8" fill="#38BDF8">return { status: "ready" }</text>

            <rect x="12" y="118" width="146" height="20" rx="4" fill="rgba(245,158,11,0.2)" />
            <text x="85" y="132" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700" fill="#F59E0B" text-anchor="middle">⚡ Gemini &amp; OpenAI API</text>

            <!-- Pin Out 1 & 2 -->
            <circle cx="170" cy="55" r="5" fill="#10B981" />
            <circle cx="170" cy="95" r="5" fill="#25D366" />
          </g>

          <!-- NODE 3: Database & Cloud Webhook -->
          <g filter="url(#softShadow)" transform="translate(480, 25)">
            <rect width="130" height="90" rx="10" fill="#FFFFFF" stroke="#10B981" stroke-width="1.8" />
            <!-- Pin In -->
            <circle cx="0" cy="50" r="4" fill="#10B981" />
            <rect width="130" height="22" rx="8" fill="#ECFDF5" />
            <text x="12" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#059669">DATABASE SYNC</text>
            <text x="12" y="44" font-family="monospace" font-size="9" fill="#0F172A">Supabase / SQL</text>
            <text x="12" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" fill="#64748B">Auto-store invoice</text>
            <text x="12" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700" fill="#10B981">✓ Stored &amp; Indexed</text>
          </g>

          <!-- NODE 4: WhatsApp / Notifier Bot -->
          <g filter="url(#softShadow)" transform="translate(480, 135)">
            <rect width="130" height="95" rx="10" fill="#FFFFFF" stroke="#25D366" stroke-width="1.8" />
            <!-- Pin In -->
            <circle cx="0" cy="40" r="4" fill="#25D366" />
            <rect width="130" height="22" rx="8" fill="#F0FDF4" />
            <text x="12" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="800" fill="#15803D">WA NOTIFIER BOT</text>
            <text x="12" y="44" font-family="monospace" font-size="9" fill="#0F172A">WhatsApp Gateway</text>
            <text x="12" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" fill="#64748B">Send client receipt</text>
            <text x="12" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="700" fill="#16A34A">✓ Message Sent (WA)</text>
          </g>
        </g>

        <!-- Bottom Row: Real-time Execution Stream Table -->
        <g transform="translate(180, 500)">
          <rect width="630" height="255" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
          <text x="20" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#0F172A">Aktivitas Integrasi &amp; Eksekusi Terbaru</text>

          <!-- Table Header -->
          <g transform="translate(20, 42)">
            <rect width="590" height="26" rx="4" fill="#F8FAFC" />
            <text x="10" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#64748B">EVENT / ENDPOINT</text>
            <text x="180" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#64748B">AI ACTION</text>
            <text x="360" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#64748B">LATENCY</text>
            <text x="490" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#64748B">STATUS</text>
          </g>

          <!-- Row 1 -->
          <g transform="translate(20, 75)">
            <circle cx="15" cy="14" r="3" fill="#10B981" />
            <text x="26" y="18" font-family="monospace" font-size="10" font-weight="600" fill="#0F172A">POST /v1/order.create</text>
            <text x="180" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#1E293B">Auto Summarize &amp; Invoice</text>
            <text x="360" y="18" font-family="monospace" font-size="10" fill="#64748B">112 ms</text>
            <rect x="490" y="4" width="75" height="20" rx="10" fill="#ECFDF5" />
            <text x="527" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#059669" text-anchor="middle">Success 200</text>
          </g>
          <line x1="30" y1="108" x2="600" y2="108" stroke="#F1F5F9" stroke-width="1" />

          <!-- Row 2 -->
          <g transform="translate(20, 115)">
            <circle cx="15" cy="14" r="3" fill="#3B82F6" />
            <text x="26" y="18" font-family="monospace" font-size="10" font-weight="600" fill="#0F172A">POST /v1/ai.chat.query</text>
            <text x="180" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#1E293B">Gemini RAG Knowledge Base</text>
            <text x="360" y="18" font-family="monospace" font-size="10" fill="#64748B">145 ms</text>
            <rect x="490" y="4" width="75" height="20" rx="10" fill="#ECFDF5" />
            <text x="527" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#059669" text-anchor="middle">Success 200</text>
          </g>
          <line x1="30" y1="148" x2="600" y2="148" stroke="#F1F5F9" stroke-width="1" />

          <!-- Row 3 -->
          <g transform="translate(20, 155)">
            <circle cx="15" cy="14" r="3" fill="#25D366" />
            <text x="26" y="18" font-family="monospace" font-size="10" font-weight="600" fill="#0F172A">POST /v1/wa.broadcast</text>
            <text x="180" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#1E293B">Auto WA Notification Bot</text>
            <text x="360" y="18" font-family="monospace" font-size="10" fill="#64748B">88 ms</text>
            <rect x="490" y="4" width="75" height="20" rx="10" fill="#ECFDF5" />
            <text x="527" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#059669" text-anchor="middle">Delivered</text>
          </g>
          <line x1="30" y1="188" x2="600" y2="188" stroke="#F1F5F9" stroke-width="1" />

          <!-- Row 4 -->
          <g transform="translate(20, 195)">
            <circle cx="15" cy="14" r="3" fill="#F59E0B" />
            <text x="26" y="18" font-family="monospace" font-size="10" font-weight="600" fill="#0F172A">POST /v1/payment.midtrans</text>
            <text x="180" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#1E293B">Webhook Auto Verification</text>
            <text x="360" y="18" font-family="monospace" font-size="10" fill="#64748B">95 ms</text>
            <rect x="490" y="4" width="75" height="20" rx="10" fill="#ECFDF5" />
            <text x="527" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#059669" text-anchor="middle">Settlement</text>
          </g>
        </g>
      </g>


      <!-- ================= RIGHT COMPANION: SMARTPHONE MOCKUP ================= -->
      <g filter="url(#phoneShadow)" transform="translate(1160, 240)">
        <!-- Outer Phone Shell -->
        <rect width="260" height="520" rx="36" fill="#0F172A" stroke="#E2E8F0" stroke-width="4" />
        <!-- Screen Glass -->
        <rect x="10" y="10" width="240" height="500" rx="28" fill="#FFFFFF" />

        <!-- Dynamic Island / Speaker Pill -->
        <rect x="85" y="18" width="90" height="18" rx="9" fill="#0F172A" />
        <circle cx="155" cy="27" r="3.5" fill="#1E293B" />

        <!-- Phone UI Header -->
        <g transform="translate(24, 52)">
          <circle cx="16" cy="16" r="14" fill="url(#orangeGrad)" />
          <text x="16" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">AI</text>
          <text x="38" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#0F172A">AI Assistant</text>
          <text x="38" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8" font-weight="600" fill="#10B981">● WhatsApp Auto-reply</text>
        </g>

        <line x1="20" y1="92" x2="240" y2="92" stroke="#F1F5F9" stroke-width="1" />

        <!-- Mobile Chat Bubbles -->
        <!-- User Chat Bubble -->
        <g transform="translate(30, 110)">
          <rect x="40" width="170" height="40" rx="12" fill="#F1F5F9" />
          <text x="50" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" fill="#1E293B">Halo Kairav, apakah</text>
          <text x="50" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" fill="#1E293B">pesanan saya sudah diproses?</text>
          <text x="180" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7" fill="#94A3B8">09:41</text>
        </g>

        <!-- AI Bot Chat Bubble -->
        <g transform="translate(20, 165)">
          <rect width="200" height="75" rx="12" fill="#0F172A" />
          <text x="12" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" fill="#F59E0B">🤖 AI Assistant (Automated):</text>
          <text x="12" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" fill="#F8FAFC">Halo Kak! Pembayaran via Midtrans</text>
          <text x="12" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" fill="#F8FAFC">telah diverifikasi otomatis (200 OK).</text>
          <text x="12" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="8.5" font-weight="600" fill="#38BDF8">Invoice #INV-2026 siap dikirim!</text>
          <text x="180" y="68" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7" fill="#64748B">09:41</text>
        </g>

        <!-- Mobile Automation Card Widget -->
        <g transform="translate(20, 260)">
          <rect width="220" height="135" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1" />
          <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" fill="#0F172A">Real-time Webhook Feed</text>
          
          <rect x="12" y="30" width="196" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
          <circle cx="24" cy="44" r="4" fill="#10B981" />
          <text x="34" y="47" font-family="monospace" font-size="8" fill="#0F172A">Midtrans Webhook: 200</text>

          <rect x="12" y="64" width="196" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
          <circle cx="24" cy="78" r="4" fill="#F59E0B" />
          <text x="34" y="81" font-family="monospace" font-size="8" fill="#0F172A">AI Prompt: 1.2k tokens</text>

          <rect x="12" y="98" width="196" height="28" rx="6" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
          <circle cx="24" cy="112" r="4" fill="#25D366" />
          <text x="34" y="115" font-family="monospace" font-size="8" fill="#0F172A">WhatsApp Broadcast: Sent</text>
        </g>

        <!-- Bottom Home Indicator -->
        <line x1="85" y1="495" x2="175" y2="495" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
      </g>


      <!-- ================= RIGHT 3D CHARACTER & FLOATING PROPS ================= -->
      <!-- 3D Female Specialist Standing with Tablet -->
      <g transform="translate(1220, 60)">
        <!-- Specialist Holding Tablet -->
        <g transform="translate(30, 0)">
          <!-- Head -->
          <circle cx="48" cy="45" r="18" fill="#FBCFE8" />
          <!-- Black Hair -->
          <path d="M 30 45 C 30 18 68 18 68 45 C 72 65 65 75 60 85 C 50 65 52 40 45 40 C 35 40 30 55 30 45 Z" fill="#0F172A" />

          <!-- Body in Orange / Dark Slate -->
          <path d="M 25 75 C 25 65 70 65 70 75 L 75 160 L 20 160 Z" fill="#F59E0B" />

          <!-- Arms holding tablet -->
          <path d="M 25 80 L 10 115 L 45 125" stroke="#D97706" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none" />
          <path d="M 70 80 L 75 115 L 50 125" stroke="#D97706" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none" />

          <!-- Tablet -->
          <rect x="15" y="105" width="48" height="34" rx="4" fill="#1E293B" transform="rotate(-15 39 122)" />
          <rect x="18" y="108" width="42" height="28" rx="2" fill="#38BDF8" opacity="0.8" transform="rotate(-15 39 122)" />
        </g>
      </g>

      <!-- Floating JSON Code Snippet Badge Top Right -->
      <g filter="url(#softShadow)" transform="translate(1180, 160)">
        <rect width="180" height="50" rx="10" fill="#0F172A" />
        <circle cx="18" cy="25" r="4" fill="#10B981" />
        <text x="32" y="24" font-family="monospace" font-size="9" fill="#F59E0B">{ "api_status": 200,</text>
        <text x="32" y="38" font-family="monospace" font-size="9" fill="#38BDF8">  "ai_automation": true }</text>
      </g>

      <!-- Plant Bottom Right -->
      <g transform="translate(1420, 780)">
        <ellipse cx="30" cy="80" rx="20" ry="8" fill="#CBD5E1" />
        <path d="M 18 55 L 42 55 L 38 80 L 22 80 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1" />
        <path d="M 30 55 C 10 30 15 10 30 5 C 45 10 50 30 30 55 Z" fill="#10B981" />
        <path d="M 28 55 C 5 45 0 25 15 20 C 25 25 28 45 28 55 Z" fill="#059669" />
        <path d="M 32 55 C 55 45 60 25 45 20 C 35 25 32 45 32 55 Z" fill="#34D399" />
      </g>
    </svg>
  `;

  console.log('Rendering API & AI Automation Illustration (1536x1024)...');
  
  // Output high quality PNG, JPG, and AVIF
  await sharp(Buffer.from(svgContent))
    .png({ quality: 100 })
    .toFile('public/services/api-ai-automation-custom.png');

  await sharp(Buffer.from(svgContent))
    .jpeg({ quality: 95 })
    .toFile('public/services/api-ai-automation.jpg');

  await sharp(Buffer.from(svgContent))
    .avif({ quality: 90 })
    .toFile('public/services/api-ai-automation.avif');

  console.log('Successfully generated public/services/api-ai-automation-custom.png, .jpg, and .avif!');
}

generateApiAiIllustration().catch(console.error);
