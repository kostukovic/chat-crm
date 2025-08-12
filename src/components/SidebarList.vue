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
  <section
    class="list"
    v-show="ui.bp === 0 ? ui.mobileMode === 'nav-list' : true"
  >
    <header class="lv-header">
      <strong>{{ ui.active }}</strong>
      <button v-if="ui.bp >= 1" class="toggle-list-btn" @click="collapse">
        &lt;
      </button>
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
.lv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #1e2733;
}
.toggle-list-btn {
  appearance: none;
  border: 1px solid #243041;
  background: #17202b;
  color: #e6edf3;
  padding: 0.35rem 0.55rem;
  border-radius: 0.6rem;
  cursor: pointer;
}
@media (max-width: 767px) {
  .toggle-list-btn {
    display: none;
  }
}
</style>
