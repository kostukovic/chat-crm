<script setup lang="ts">
import type { ListItem } from "../../types/models";
import { useUiStore } from "../../stores/ui";
import { useSelectionStore } from "../../stores/selection";

const ui = useUiStore();
const sel = useSelectionStore();

const items: ListItem[] = [
  { id: "nina", title: "Nina", subtitle: "2 neue Mails" },
  { id: "goscha", title: "Goscha", subtitle: "Letzte Mail: Mo 10:12" },
];

function open(it: ListItem) {
  sel.select("email", it.id as any);
  if (ui.bp === 0) ui.setMobileMode("main");
}
</script>

<template>
  <div>
    <h3 class="section-title">✉️ E‑Mail</h3>
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
        @click="open(it)"
        style="
          border: 1px solid #1e2733;
          background: #111925;
          border-radius: 0.6rem;
          padding: 0.6rem;
          cursor: pointer;
        "
      >
        <div style="font-weight: 600">{{ it.title }}</div>
        <div style="opacity: 0.8; font-size: 0.85rem">{{ it.subtitle }}</div>
      </li>
    </ul>
  </div>
</template>
