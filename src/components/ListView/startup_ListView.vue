<script setup lang="ts">
import type { ListItem } from "../../types/models";
import { useUiStore } from "../../stores/ui";

const ui = useUiStore();

const items: ListItem[] = [
  {
    id: "1",
    title: "Willkommen 👋",
    subtitle: "CRM-Chat ist bereit",
    time: "Jetzt",
  },
  {
    id: "2",
    title: "Telegram 🔔",
    subtitle: "1 neue Nachricht",
    time: "09:41",
  },
  { id: "3", title: "E-Mail ✉️", subtitle: "2 ungelesen", time: "Gestern" },
];

function openItem(it: ListItem) {
  if (ui.bp === 0) {
    ui.toggleList(false); // → mobile-main-only
  }
}
</script>

<template>
  <div>
    <h3 class="section-title">🚀 Startup</h3>
    <input type="text" name="Suche" size="30" maxlength="40">
    <ul
      style="
        list-style: none;
        margin: 0;
        padding: 0.25rem 0.5rem;
        display: grid;
        gap: 0.25rem;
      "
    >
      <li
        v-for="it in items"
        :key="it.id"
        @click="openItem(it)"
        style="
          border: 1px solid #1e2733;
          background: #111925;
          border-radius: 0.6rem;
          padding: 0.6rem;
          cursor: pointer;
        "
      >
        <div style="display: flex; justify-content: space-between; gap: 0.5rem">
          <div>
            <div style="font-weight: 600">{{ it.title }}</div>
            <div style="opacity: 0.8; font-size: 0.85rem">
              {{ it.subtitle }}
            </div>
          </div>
          <small style="opacity: 0.7">{{ it.time }}</small>
        </div>
      </li>
    </ul>
  </div>
</template>
