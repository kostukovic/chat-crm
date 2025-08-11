<script setup lang="ts">
  import type { ListItem } from '../../types/models'
  import { useUiStore } from '../../stores/ui'
  
  const ui = useUiStore()
  
  const items: ListItem[] = [
    { id:'1', title:'Willkommen 👋', subtitle:'CRM-Chat ist bereit', time:'Jetzt' },
    { id:'2', title:'Telegram 🔔', subtitle:'1 neue Nachricht', time:'09:41' },
    { id:'3', title:'E-Mail ✉️',  subtitle:'2 ungelesen',     time:'Gestern' },
  ]
  
  function openItem(it: ListItem){
    // hier ggf. Auswahl setzen / Route laden …
    if (ui.bp === 0) {
      ui.toggleList(false)   // → mobile-main-only
    }
  }
  </script>
  
  <template>
    <div>
      <h3 class="section-title">🚀 Startup</h3>
      <ul style="list-style:none;margin:0;padding:.25rem .5rem;display:grid;gap:.25rem">
        <li v-for="it in items" :key="it.id"
            @click="openItem(it)"
            style="border:1px solid #1e2733;background:#111925;border-radius:.6rem;padding:.6rem;cursor:pointer">
          <div style="display:flex;justify-content:space-between;gap:.5rem">
            <div>
              <div style="font-weight:600">{{ it.title }}</div>
              <div style="opacity:.8;font-size:.85rem">{{ it.subtitle }}</div>
            </div>
            <small style="opacity:.7">{{ it.time }}</small>
          </div>
        </li>
      </ul>
    </div>
  </template>
  