<script setup lang="ts">
import { onMounted } from "vue";
import NavView from "./components/NavView.vue";
import ListView from "./components/ListView.vue";
import MainView from "./components/MainView.vue";
import Splitter from "./components/common/Splitter.vue";
import PanelView from "./components/PanelView.vue";
import { useUiStore } from "./stores/ui";
import { useViewport } from "./composables/useViewport";
import { useHotkeys } from "./composables/useHotkeys";
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
    // Mobile: Start mit Startup + Liste + Nav sichtbar
    ui.setActive("startup");
    ui.setMobileMode("nav-list"); // "nav-list" | "main" | "panel"
    ui.togglePanel(false);        // Panel initial aus
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

      /* Mobile states */
      'mobile-nav-list': ui.bp === 0 && ui.mobileMode === 'nav-list',
      'mobile-main':     ui.bp === 0 && ui.mobileMode === 'main',
      'mobile-panel':    ui.bp === 0 && ui.mobileMode === 'panel',

      /* Shared states */
      'list-collapsed': ui.bp >= 1 && !ui.showList,

      /* Tablet: toggelt Track zu Panel */
      'tablet-panel': ui.bp === 1 && ui.showPanel,
    }"
  >
    <!-- Mobile: Track/Slides (Nav+List | Main | Panel) -->
    <div class="columns" v-if="ui.bp === 0" :key="'mobile-' + ui.bp">
      <div class="track">
        <div class="slide slide--navlist">
          <NavView class="nav" />
          <ListView class="list" />
        </div>

        <div class="slide slide--main">
          <MainView class="main" />
        </div>

        <div class="slide slide--panel">
          <PanelView class="panel" />
        </div>
      </div>
    </div>

    <!-- Tablet: rechter Bereich als Track (Main | Panel) -->
    <div class="columns" v-else-if="ui.bp === 1" :key="'tablet-' + ui.bp">
      <NavView class="nav" />
      <ListView class="list" />

      <!-- Tablet-Track (2 Slides) -->
      <div class="t-track">
        <div class="t-strip">
          <div class="t-slide t-main">
            <MainView class="main" />
          </div>
          <div class="t-slide t-panel">
            <PanelView class="panel" />
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop: klassisches 4-Spalten-Layout -->
    <div class="columns" v-else :key="'desktop-' + ui.bp">
      <NavView class="nav" />
      <ListView class="list" />
      <MainView class="main" />
      <Splitter v-if="ui.bp === 2 && ui.fullscreen === null" @resize="onResize" />
      <PanelView class="panel" />
    </div>
  </div>
</template>
