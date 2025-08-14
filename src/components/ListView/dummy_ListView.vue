<script setup lang="ts">
import { useUiStore } from "../../stores/ui";
import { useSelectionStore } from "../../stores/selection";

const ui = useUiStore();
const sel = useSelectionStore();

function open() {
  // Nur Demo – kein echter Inhalt; wechsle in Main und zeige Placeholder
  sel.select("telegram", "nataschaa"); // oder: beliebige Default-Auswahl
  if (ui.bp === 0) ui.setMobileMode("main");
}
</script>

<template>
  <div>
    <h3 class="section-title">🧪 Dummy‑Addon</h3>
    <div style="padding: 0.5rem; display: grid; gap: 0.5rem">
      <div
        style="
          border: 1px solid #1e2733;
          background: #111925;
          border-radius: 0.6rem;
          padding: 0.6rem;
        "
      >
        <div style="font-weight: 600">Platzhalter‑Liste</div>
        <div style="opacity: 0.8">
          Hier könnte eine Addon‑Liste erscheinen. Tippe, um Main zu zeigen.
        </div>
        <div style="margin-top: 0.5rem">
          <button class="nav-btn" @click="open()">Öffnen</button>
        </div>
      </div>
    </div>
  </div>
</template>
