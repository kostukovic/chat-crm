<script setup lang="ts">
    import type { ListItem } from '../../types/models'
    import { useUiStore } from '../../stores/ui'
    import { useSelectionStore } from '../../stores/selection'
    
    const ui = useUiStore()
    const sel = useSelectionStore()
    
    const items: ListItem[] = [
      { id:'wichtig', title:'Wichtiger Termin', subtitle:'Heute 14:30 – Projekt Sync' },
    ]
    
    function open(it: ListItem){
      sel.select('calendar', it.id as any)
      if (ui.bp === 0) ui.setMobileMode('main')
    }
    </script>
    
    <template>
      <div>
        <h3 class="section-title">📅 Kalender</h3>
        <ul style="list-style:none;margin:0;padding:.25rem .5rem;display:grid;gap:.25rem">
          <li v-for="it in items" :key="it.id" @click="open(it)"
              style="border:1px solid #1e2733;background:#111925;border-radius:.6rem;padding:.6rem;cursor:pointer">
            <div style="font-weight:600">{{ it.title }}</div>
            <div style="opacity:.8;font-size:.85rem">{{ it.subtitle }}</div>
          </li>
        </ul>
      </div>
    </template>