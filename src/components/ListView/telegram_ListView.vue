<script setup lang="ts">
import type { ListItem } from "../../types/models";
import { useUiStore } from "../../stores/ui";
import { useSelectionStore } from "../../stores/selection";

const ui = useUiStore();
const sel = useSelectionStore();

// viele Einträge für Overflow
const items: ListItem[] = [
  { id: "nataschaa", title: "Nataschaa", subtitle: "zuletzt online: eben" },
  { id: "kostja", title: "Kostja", subtitle: "schreibt …" },
  { id: "andrei", title: "Andrei", subtitle: "online" },
  { id: "vitja", title: "Vitja", subtitle: "zuletzt online: 10:12" },
  { id: "nina", title: "Nina", subtitle: "Sprachnachricht" },
  { id: "goscha", title: "Goscha", subtitle: "Datei gesendet" },
  { id: "sergej", title: "Sergej", subtitle: "Sticker 🎉" },
  { id: "masha", title: "Masha", subtitle: "Foto 📷" },
  { id: "dima", title: "Dima", subtitle: "Tippt …" },
  { id: "oleg", title: "Oleg", subtitle: "zuletzt online: gestern" },
  { id: "irina", title: "Irina", subtitle: "Link geteilt" },
  { id: "pavel", title: "Pavel", subtitle: "Reaktion 👍" },
  { id: "olga", title: "Olga", subtitle: "neue Nachricht" },
];

function open(it: ListItem) {
  sel.select("telegram", it.id as any);
  if (ui.bp === 0) ui.setMobileMode("main");
}
</script>

<template>
  <!-- Flex-Column: Header oben, Liste füllt den Rest -->
  <div class="lv-col">
    <h3 class="section-title">✈️ Telegram</h3>

    <!-- Scrollbereich: dünne Scrollbar + Wheel/Touch -->
    <ul
      class="lv-scroll thin-scroll"
      style="
        list-style: none;
        margin: 0;
        padding: 0.25rem 0.5rem;
        display: grid;
        gap: 0.25rem;
      "
      tabindex="0"
    >
      <li
        v-for="it in items"
        :key="it.id"
        @click="open(it)"
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
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Container: Header (auto) oben, Liste (1fr) füllt den Rest */
.lv-col {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr; /* <-- Header auto, Liste flexibel */
  min-height: 0;               /* wichtig für Scrollen */
}

/* Liste: Inhalte von unten nach oben, mit Scrollen */
.lv-scroll {
  display: flex;
  flex-direction: column-reverse; /* neueste Einträge unten, wächst nach oben */
  overflow: auto;
  min-height: 0;
  padding: 0.25rem 0.5rem;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
}
</style>
