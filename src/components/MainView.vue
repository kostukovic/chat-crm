<script setup lang="ts">
  import { computed } from 'vue'
  import { useUiStore } from '../stores/ui'
  import { useSelectionStore } from '../stores/selection'
  
  const ui = useUiStore()
  const sel = useSelectionStore()
  
  const title = computed(() => {
    if (sel.module==='telegram' && sel.item==='nataschaa') return '✈️ Telegram – Nataschaa × Andrei'
    if (sel.module==='telegram' && sel.item==='kostja')    return '✈️ Telegram – Kostja × Vitja'
    if (sel.module==='telegram' && sel.item==='andrei')    return '✈️ Telegram – Andrei × Ich'
    if (sel.module==='email'    && sel.item==='nina')      return '✉️ E‑Mail – Nina'
    if (sel.module==='email'    && sel.item==='goscha')    return '✉️ E‑Mail – Goscha'
    if (sel.module==='calendar' && sel.item==='wichtig')   return '📅 Kalender – Wichtiger Termin'
    return '🗨️ Konversation'
  })
  
  
  const body = computed(() => {
    if (sel.module==='telegram' && sel.item==='andrei') {
      const msgs = [] as {from:string;text:string}[]
      const speakers = ['Andrei','Ich']
      const seeds = [
        'Kurzes Update: Ich hab das Modul refactored, Build ist schneller.',
        'Top! Hast du die Ladezeiten gemessen?',
        'Ja, First Interaction -25%, TTI -18%.',
        'Sehr gut. Wie sieht das mit dem Lazy Loading der Addons aus?',
        'Aktiv ab perfMode=active, sonst Notifications only.',
        'Können wir für Mobile den Chatverlauf virtualisieren?',
        'Ja, eine Windowing-Lösung mit IntersectionObserver ist geplant.',
        'Bitte noch eine kleine Typo‑Fix in der Toolbar.',
        'Erledigt. Splitter hat jetzt Snap‑Points.',
        'Perfekt. Logs für Panel‑Öffnungen sind auch drin.',
        'Dann testen wir heute Overflow richtig durch.',
        'Scrollbar ist extra schlank, sollte smooth sein.',
        'Auf iOS wirkt das sehr smooth. 👍',
        'Ich füge noch Tastatur‑Shortcuts hinzu (J/K, Ctrl+K).',
        'Zeilenhöhe leicht erhöht für Lesbarkeit.',
        'Ok, wir brauchen mehr Dummy‑Messages… 😅',
      ]
      for(let i=0;i<60;i++){
        msgs.push({ from: speakers[i%2], text: seeds[i%seeds.length] + `  (#${i+1})` })
      }
      return msgs
    }
    if (sel.module==='telegram' && sel.item==='nataschaa') {
      return [
        { from:'Nataschaa', text:'Hallo Andrei, können wir das Prototyp‑Review heute verschieben?' },
        { from:'Andrei',    text:'Klar, wie wäre 16:00? Ich habe vorher noch ein Standup.' },
        { from:'Nataschaa', text:'Passt. Ich lade die letzten Screens hoch.' },
      ]
    }
    if (sel.module==='telegram' && sel.item==='kostja') {
      return [
        { from:'Kostja', text:'Vitja, hast du die Messdaten vom letzten Run?' },
        { from:'Vitja',  text:'Ja, gerade exportiert. Ich schicke dir CSV + Plot.' },
        { from:'Kostja', text:'Super, dann check ich die Abweichungen.' },
      ]
    }
    if (sel.module==='email' && sel.item==='nina') {
      return [ { from:'Nina', text:'Betreff: Rückfrage zur Bestellung #A‑113... (Mailtext)'} ]
    }
    if (sel.module==='email' && sel.item==='goscha') {
      return [ { from:'Goscha', text:'Betreff: Korrektur der Rechnungsadresse... (Mailtext)'} ]
    }
    if (sel.module==='calendar' && sel.item==='wichtig') {
      return [ { from:'System', text:'Termin: Projekt‑Sync 14:30–15:00. Agenda: Risiken, Blocker, nächste Schritte.' } ]
    }
    return []
  })
  
  function openPanel(){
  if (ui.bp === 0) {
    // Mobile: in den Panel-Mode wechseln
    ui.setMobileMode('panel')
  } else if (ui.bp === 1) {
    // Tablet: Panel sichtbar schalten (Main wird per CSS ausgeblendet)
    ui.togglePanel(true)
  } else {
    // Desktop: wie gehabt
    ui.openPanel()
  }
}

  </script>
  
  <template>
    <main class="main">
      <header class="mv-header">
        <div class="mv-left">
          <button v-if="ui.bp<=1" class="back-btn" @click="goBack" aria-label="Zurück">←</button>
          <strong>{{ title }}</strong>
        </div>
        <div class="mv-right">
          <button class="btn" @click="ui.setFullscreen(ui.fullscreen==='main'?null:'main')">
            {{ ui.fullscreen==='main' ? 'Vollbild verlassen' : 'Vollbild' }}
          </button>
          <button v-if="ui.bp<=1 && body.length>0" class="arrow-btn" @click="openPanel" aria-label="Details im Panel öffnen">➡️</button>

        </div>
      </header>
  
      <div class="mv-col">
        <div class="mv-scroll thin-scroll">
          <div v-if="body.length===0" style="opacity:.7; padding:.75rem">Keine Auswahl – wähle links etwas aus.</div>
          <div v-for="(m,i) in body" :key="i" class="msg" :class="m.from==='Ich' ? 'out' : 'in'">
            <div class="from">{{ m.from }}</div>
            <pre class="text">{{ m.text }}</pre>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <style scoped>
    .mv-header{ display:flex; align-items:center; justify-content:space-between; padding:.6rem .8rem; border-bottom:1px solid #1e2733 }
    .mv-left{ display:flex; align-items:center; gap:.5rem }
    .mv-right{ display:flex; align-items:center; gap:.4rem }
    
    .mv-col{ height:calc(100dvh - 44px); display:flex; flex-direction:column; }
    .mv-scroll{ flex:1 1 auto; overflow:auto; padding:.75rem; }
    
    .msg{ border:1px solid #1e2733; background:#0f141b; border-radius:.6rem; padding:.6rem; margin-bottom:.5rem; max-width:72ch }
    .msg.out{ margin-left:auto; background:#0c141e; border-color:#243041 }
    .from{ font-weight:600; margin-bottom:.15rem }
    .text{ margin:.25rem 0 0 0; white-space:pre-wrap; font-family:inherit; }
    
    .back-btn{ appearance:none; border:1px solid #243041; background:#17202b; color:#e6edf3; padding:.35rem .55rem; border-radius:.6rem; cursor:pointer }
    .arrow-btn{ appearance:none; border:1px solid #243041; background:#17202b; color:#e6edf3; padding:.25rem .5rem; border-radius:.6rem; cursor:pointer }
    
    /* Ab 1367 px beide Hilfsbuttons ausblenden */
    @media (min-width: 1367px){
      .back-btn, .arrow-btn { display: none; }
    }
    </style>