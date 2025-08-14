<script setup lang="ts">
import IconButton from "./common/IconButton.vue";
import { useUiStore } from "../stores/ui";
import { onMounted, ref } from "vue";

const ui = useUiStore();
const showUp = ref(false);
const showDown = ref(false);
const scrollRef = ref<HTMLDivElement | null>(null);

function updateArrows() {
  const el = scrollRef.value;
  if (!el) return;

  const EPS = 1; // 1px Toleranz
  const remaining = el.scrollHeight - (el.scrollTop + el.clientHeight);

  // Oben: Pfeil nur anzeigen, wenn man wirklich nicht ganz oben ist
  showUp.value = el.scrollTop > EPS;

  // Unten: Pfeil ausblenden, wenn weniger als 20% der Sichtfläche übrig sind
  const threshold = el.clientHeight * 0.05; // 20% Resthöhe
  showDown.value = remaining > threshold + EPS;
}

function scrollByStep(dir: "up" | "down") {
  const el = scrollRef.value;
  if (!el) return;
  const step = Math.max(96, el.clientHeight * 0.6);
  el.scrollBy({ top: dir === "down" ? step : -step, behavior: "smooth" });

  // während der Animation mehrfach nachziehen
  let t = 0;
  const tick = () => {
    updateArrows();
    if (t++ < 12) requestAnimationFrame(tick); // ~200ms bei 60fps
  };
  requestAnimationFrame(tick);
}

onMounted(() => {
  updateArrows();
  scrollRef.value?.addEventListener("scroll", updateArrows, { passive: true });
});
</script>

<template>
  <aside class="nav">
    <div class="nav-inner">

      <div class="nav-top">
        <IconButton id="startup" emoji="🚀" label="Startup" />
      </div>

      <div class="nav-middle">
        
        <div class="nav-scroll" ref="scrollRef">
          <IconButton id="telegram" emoji="✈️" label="Telegram" />
          <IconButton id="email" emoji="✉️" label="E‑Mail" />
          <IconButton id="calendar" emoji="📅" label="Kalender" />

          <IconButton id="whatsapp" emoji="💬" label="WhatsApp" />
          <IconButton id="signal" emoji="📶" label="Signal" />
          <IconButton id="slack" emoji="🧵" label="Slack" />
          <IconButton id="drive" emoji="🗂️" label="Drive" />
          <IconButton id="notes" emoji="📝" label="Notizen" />
          <IconButton id="voice" emoji="🎙️" label="Voice" />
          <IconButton id="tasks" emoji="✅" label="Tasks" />
          <IconButton id="crm" emoji="📇" label="CRM" />
          <IconButton id="support" emoji="🛟" label="Support" />
          <!-- hier kommen später dynamische Addon-Icons -->
        </div>

        <div class="nav-arrow top" v-show="showUp">
          <button @click.stop.prevent="scrollByStep('up')">⬆️</button>
        </div>
        <div class="nav-arrow bottom" v-show="showDown">
          <button @click.stop.prevent="scrollByStep('down')">⬇️</button>
        </div>

      </div>

      <div class="nav-bottom">
        <IconButton id="addons" emoji="🧩" label="Addons" />
        <IconButton id="perform" emoji="🚦" label="Performance" />
        <IconButton id="account" emoji="👤" label="Konto" />
        <IconButton id="settings" emoji="⚙️" label="Einstellungen" />
      </div>

    </div>
  </aside>
</template>
