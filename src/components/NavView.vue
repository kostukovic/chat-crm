<!-- src/components/NavView.vue -->
<script setup lang="ts">
  import IconButton from './common/IconButton.vue'
  import { useUiStore } from '../stores/ui'
  import { onMounted, ref } from 'vue'
  
  const ui = useUiStore()
  const showUp = ref(false)
  const showDown = ref(false)
  const scrollRef = ref<HTMLDivElement|null>(null)
  
  function updateArrows(){
    const el = scrollRef.value
    if(!el) return
    showUp.value = el.scrollTop > 0
    showDown.value = el.scrollTop + el.clientHeight < el.scrollHeight
  }
  function scrollByStep(dir: 'up'|'down'){
    const el = scrollRef.value
    if(!el) return
    const step = Math.max(96, el.clientHeight * 0.6)
    el.scrollBy({ top: dir==='down' ? step : -step, behavior: 'smooth' })
    // Nach dem Scrollen Zustand aktualisieren
    setTimeout(updateArrows, 300)
  }
  
  onMounted(()=>{ updateArrows(); scrollRef.value?.addEventListener('scroll', updateArrows, { passive:true }) })
  </script>
  
  <template>
    <aside class="nav" :class="{ expanded: ui.navExpanded }">
      <div class="nav-inner">
        <div class="nav-top">
          <IconButton id="menu"    emoji="☰" label="Menü" />
          <IconButton id="startup" emoji="🚀" label="Startup" />
        </div>
  
        <div class="nav-middle">
          <div class="nav-scroll" ref="scrollRef">
            <div class="section-title">Addons</div>
            <IconButton id="addons" emoji="🧩" label="Addons" />
            <IconButton id="telegram" emoji="✈️" label="Telegram" />
            <IconButton id="email"    emoji="✉️" label="E‑Mail" />
            <IconButton id="calendar" emoji="📅" label="Kalender" />

            <IconButton id="whatsapp" emoji="💬" label="WhatsApp" />
            <IconButton id="signal"   emoji="📶" label="Signal" />
            <IconButton id="slack"    emoji="🧵" label="Slack" />
            <IconButton id="drive"    emoji="🗂️" label="Drive" />
            <IconButton id="notes"    emoji="📝" label="Notizen" />
            <IconButton id="voice"    emoji="🎙️" label="Voice" />
            <IconButton id="tasks"    emoji="✅" label="Tasks" />
            <IconButton id="crm"      emoji="📇" label="CRM" />
            <IconButton id="support"  emoji="🛟" label="Support" />
            <!-- hier kommen später dynamische Addon-Icons -->
          </div>
  
          <div class="nav-arrow top" v-show="showUp">
            <button @click.stop.prevent="scrollByStep('up')">⬆️</button>
          </div>
          <div class="nav-arrow bottom" v-show="showDown">
            <button @click.stop.prevent="scrollByStep('down')">⬇️</button>
          </div>
        </div>
  
        <div class="nav-bottom">
          <IconButton id="perform"  emoji="🚦" label="Performance" />
          <IconButton id="account"  emoji="👤" label="Konto" />
          <IconButton id="settings" emoji="⚙️" label="Einstellungen" />
        </div>
      </div>
    </aside>
  </template>
  