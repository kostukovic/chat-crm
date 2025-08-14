<script setup lang="ts">
import { onMounted } from "vue";
import NavView from "./components/NavView.vue";
import ListView from "./components/ListView.vue";
import MainView from "./components/MainView.vue";
import PanelView from "./components/PanelView.vue";
import { useUiStore } from "./stores/ui";
import { useViewport } from "./composables/useViewport";
import { useHotkeys } from "./composables/useHotkeys";
import Splitter from "./components/common/Splitter.vue";
import { useBackNav } from "./composables/useBackNav";

const ui = useUiStore();
useViewport();
useHotkeys();

let mainWidth = ui.mainBaseWidth;
function onResize(dx: number) {
  mainWidth = Math.max(320, Math.min(960, mainWidth + dx));
  document.documentElement.style.setProperty("--main-base", mainWidth + "px");
}

onMounted(() => {
  if (ui.bp === 0) {
    // Mobile: Starte mit Startup + Liste sichtbar + Nav (50px) sichtbar
    ui.setActive("startup");
    ui.setMobileMode("nav-list");
    ui.togglePanel(false); // Panel aus; Panel wird nur in "mobile-panel" sichtbar
  }
});

useBackNav();
</script>

<template>
  <div
    class="app"
    :class="{
      'fullscreen-main': ui.fullscreen === 'main',
      'fullscreen-panel': ui.fullscreen === 'panel',
      'mobile-nav-list': ui.bp === 0 && ui.mobileMode === 'nav-list',
      'mobile-main': ui.bp === 0 && ui.mobileMode === 'main',
      'mobile-panel': ui.bp === 0 && ui.mobileMode === 'panel',
      'list-collapsed': ui.bp >= 1 && !ui.showList,
      'tablet-panel': ui.bp === 1 && ui.showPanel,
    }"
  >
    <div class="columns">
      <NavView />
      <ListView />
      <MainView />
      <Splitter v-if="ui.bp === 2 && ui.fullscreen === null" @resize="onResize" />
      <PanelView />
    </div>
  </div>
</template>
