<script setup lang="ts">
import { computed } from "vue";
import { useUiStore } from "../stores/ui";
import { useSelectionStore } from "../stores/selection";

const ui = useUiStore();
const sel = useSelectionStore();

const title = computed(() => {
  if (sel.module === "telegram" && sel.item === "nataschaa")
    return "Thema 1 – Design‑Review & Prototyping";
  if (sel.module === "telegram" && sel.item === "kostja")
    return "Thema 2 – Messdaten & Auswertung";
  if (sel.module === "email" && sel.item === "nina")
    return "Rechnung A – Bestellübersicht & Rückfragen";
  if (sel.module === "email" && sel.item === "goscha")
    return "Rechnung B – Adresskorrektur & Prozess";
  if (sel.module === "calendar" && sel.item === "wichtig")
    return "Agenda – Projekt‑Sync 14:30";
  return "Details";
});

const paragraphs = computed(() => {
  if (sel.module === "telegram" && sel.item === "nataschaa") {
    return [
      "Dieses Panel fasst die offenen Punkte für das Design‑Review zusammen: Komponentenübersicht, Status der Screens, offene UX‑Fragen und Priorisierung für den nächsten Sprint. Ziel ist, die Click‑Dummies in konkrete Tickets zu überführen und Abhängigkeiten früh zu identifizieren.",
      "Vorgehen: (1) Screens sichten, (2) Problemstellen markieren, (3) technische Risiken bewerten, (4) Aufwand grob schätzen, (5) nächste Schritte und Zuständigkeiten festlegen.",
    ];
  }
  if (sel.module === "telegram" && sel.item === "kostja") {
    return [
      "Hier bündeln wir Messdaten des letzten Laufs: Rohdaten (CSV), berechnete Kennzahlen (Mittelwert, Varianz), sowie visuelle Plots. Besonderes Augenmerk liegt auf Abweichungen >2σ und Korrelationen zwischen Temperaturprofil und Ausbringung.",
      "To‑dos: (1) Ausreißer validieren, (2) Sensorkalibrierung prüfen, (3) Regressionsmodell aktualisieren, (4) Parameterempfehlung für den nächsten Versuch ableiten.",
    ];
  }
  if (sel.module === "email" && sel.item === "nina") {
    return [
      "Rechnung A bezieht sich auf Bestellung #A‑113. Enthalten sind drei Positionen mit gestaffelten Lieferterminen. Klärungsbedarf besteht bei der Verfügbarkeit von Bauteil X sowie der Teillieferung für Position 2.",
      "Nächste Schritte: (1) Terminbestätigung je Position, (2) etwaige Alternativteile vorschlagen, (3) finale Rechnung versenden.",
    ];
  }
  if (sel.module === "email" && sel.item === "goscha") {
    return [
      "Für Rechnung B ist die Rechnungsadresse auf die neue Gesellschaft zu ändern. Prüfen, ob die USt‑ID bereits hinterlegt ist und ob Liefer‑/Rechnungsadresse synchronisiert werden müssen.",
      "Nächste Schritte: (1) Stammdaten anpassen, (2) korrigiertes PDF erzeugen, (3) Versand dokumentieren.",
    ];
  }
  if (sel.module === "calendar" && sel.item === "wichtig") {
    return [
      "Agenda für den Termin: Statusrunde, Risiken & Blocker, Entscheidungsbedarf, Nächste Schritte. Teilnehmer: Projektkernteam. Erwartetes Ergebnis: klare To‑dos mit Verantwortlichen und Terminen.",
      "Hinweis: Bitte vorab die letzten Messdaten und das UI‑Mockup prüfen, damit Entscheidungen zügig getroffen werden können.",
    ];
  }
  return ["Keine Details verfügbar."];
});

function goBack() {
  if (ui.bp <= 1) {
    if (window.history.length > 1) window.history.back();
    else ui.setMobileMode("main");
  }
}
</script>

<template>
  <section
    class="panel"
    v-show="
      (ui.bp === 2 && ui.showPanel) ||
      (ui.bp === 0 && ui.mobileMode === 'panel')
    "
  >
    <header
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.6rem 0.8rem;
        border-bottom: 1px solid #1e2733;
      "
    >
      <button
        v-if="ui.bp <= 1"
        class="back-btn"
        @click="goBack"
        aria-label="Zurück"
      >
        ←
      </button>
      <strong>📎 {{ title }}</strong>
      <div style="display: flex; gap: 0.4rem">
        <button
          v-if="ui.bp === 2"
          class="btn"
          @click="ui.setFullscreen(ui.fullscreen === 'panel' ? null : 'panel')"
        >
          {{ ui.fullscreen === "panel" ? "Vollbild verlassen" : "Vollbild" }}
        </button>
        <button
          v-if="ui.bp === 0"
          class="btn"
          @click="ui.setMobileMode('main')"
        >
          Zurück
        </button>
      </div>
    </header>

    <div style="padding: 1rem; line-height: 1.55; max-width: 72ch">
      <p v-for="(p, i) in paragraphs" :key="i" style="margin: 0.75rem 0">
        {{ p }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.pv-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #1e2733;
}
.back-btn {
  appearance: none;
  border: 1px solid #243041;
  background: #17202b;
  color: #e6edf3;
  padding: 0.35rem 0.55rem;
  border-radius: 0.6rem;
  margin-right: 0.5rem;
  cursor: pointer;
}
@media (min-width: 1367px) {
  .back-btn {
    display: none;
  }
}
</style>
