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

function collapse() {
  if (ui.bp >= 1) ui.toggleList(false);
}
</script>

<template>
  <section class="list" v-show="ui.bp === 0 ? ui.mobileMode === 'nav-list' : true">
    <header class="mv-header">
      <div class="mv-left">
        <strong class="mv-title">{{ ui.active }}</strong>
      </div>
      <div class="mv-right">
        <button class="lv-btn lv-btn-ghost">☰</button>
        <button class="lv-btn lv-btn-ghost">🔎</button>
        <button v-if="ui.bp >= 1" class="lv-btn lv-btn-ghost" @click="collapse">
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
/* Collapse-Button verstecken auf Mobile */
@media (max-width: 767px) {
  .toggle-list-btn { display: none; }
}
</style>
