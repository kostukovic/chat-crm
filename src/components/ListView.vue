<script setup lang="ts">
import { useUiStore } from "../stores/ui";
import Startup from "./ListView/startup_ListView.vue";
import Addons from "./ListView/addons_ListView.vue";
import Perform from "./ListView/perform_ListView.vue";
import Account from "./ListView/account_ListView.vue";
import Settings from "./ListView/setting_ListView.vue";
import TelegramList from "./ListView/telegram_ListView.vue";
import EmailList from "./ListView/emails_ListView.vue";
import CalendarList from "./ListView/calendar_ListView.vue";
import DummyList from "./ListView/dummy_ListView.vue";

const ui = useUiStore();
</script>

<template>
  <section
    class="list"
    v-show="ui.bp === 0 ? ui.mobileMode === 'nav-list' : true"
  >
    <header class="lv-header">
      <div class="l-head-view">
        <strong class="lv-title">{{ ui.active }}</strong>
      </div>
      <div class="r-head-view">
        <button class="lv-btn lv-btn-ghost">☰</button>
        <button class="lv-btn lv-btn-ghost">🔎</button>
        <button v-if="ui.bp >= 1" class="lv-btn lv-btn-ghost toggle-list-btn" @click="collapse">
          ⟨
        </button>
      </div>
    </header>
  
    <component
      :is="
        {
          startup: Startup,
          addons: Addons,
          perform: Perform,
          account: Account,
          settings: Settings,
          telegram: TelegramList,
          email: EmailList,
          calendar: CalendarList,
          whatsapp: DummyList,
          signal: DummyList,
          slack: DummyList,
          drive: DummyList,
          notes: DummyList,
          voice: DummyList,
          tasks: DummyList,
          crm: DummyList,
          support: DummyList,
        }[ui.active]
      "
    />
  </section>
</template>

<style scoped>
/* Header-Layout */
.lv-header {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #1e2733;
  background: #0f141b;              /* leicht abgesetzt vom List-Hintergrund */
}

/* Linke Seite (Titel) bleibt links */
.l-head-view {
  display: flex;
  align-items: center;
  min-width: 0;                      /* ellipsis erlaubt */
  flex: 1 1 auto;                    /* nimmt verfügbaren Platz */
}

/* Titel-Styling */
.lv-title {
  color: #e6edf3;
  font-weight: 600;
  font-size: .95rem;
  letter-spacing: .2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Rechte Seite: schiebt sich nach rechts */
.r-head-view {
  margin-left: auto;                 /* => rechts ausrichten */
  display: flex;
  align-items: center;
  gap: .5rem;
}

/* Schöne, dezente Buttons im Dark-Theme */
.lv-btn {
  appearance: none;
  border: 1px solid #243041;
  background: #17202b;
  color: #e6edf3;
  padding: 0.35rem 0.6rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: .85rem;
  line-height: 1;
  transition: background .15s ease, border-color .15s ease, transform .04s ease;
}
.lv-btn:hover { background: #1b2533; border-color: #2b3a4c; }
.lv-btn:active { transform: translateY(1px); }
.lv-btn:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }

/* Ghost-Variante (dezenter) */
.lv-btn-ghost {
  background: #141b24;
  border-color: #223041;
}
.lv-btn-ghost:hover {
  background: #1a2330;
  border-color: #2a3a4e;
}

/* Collapse-Button verstecken auf Mobile */
@media (max-width: 767px) {
  .toggle-list-btn { display: none; }
}
</style>
