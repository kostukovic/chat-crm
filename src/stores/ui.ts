// src/stores/ui.js

import { defineStore } from "pinia";

export type ViewKey =
  | "startup"
  | "addons"
  | "perform"
  | "account"
  | "settings"
  | "telegram"
  | "email"
  | "calendar"
  | "whatsapp"
  | "signal"
  | "slack"
  | "drive"
  | "notes"
  | "voice"
  | "tasks"
  | "crm"
  | "support";

export type MobileMode = "nav-list" | "main" | "panel";

const BREAKPOINT_MID = 768;
const BREAKPOINT_DESKTOP = 1367;

export const useUiStore = defineStore("ui", {
  state: () => ({
    active: "startup" as ViewKey,
    showList: true,
    showPanel: false,
    fullscreen: null as null | "main" | "panel",
    width: window.innerWidth,
    height: window.innerHeight,
    mobileMode: "nav-list" as MobileMode,
  }),
  getters: {
    bp(state) {
      const w = state.width;
      if (w < BREAKPOINT_MID) return 0;
      if (w < BREAKPOINT_DESKTOP) return 1;
      return 2;
    },
    listWidth() {
      return 270;
    },
    mainBaseWidth() {
      return 640;
    },
  },
  actions: {
    setActive(k: ViewKey) {
      this.active = k;
    },
    setSize(w: number, h: number) {
      this.width = w;
      this.height = h;
    },
    toggleList(v?: boolean) {
      this.showList = v ?? !this.showList;
    },
    togglePanel(v?: boolean) {
      this.showPanel = v ?? !this.showPanel;
    },
    setFullscreen(area: null | "main" | "panel") {
      this.fullscreen = area;
    },
    setMobileMode(mode: MobileMode) {
      this.mobileMode = mode;
    },
    openPanel()  { this.togglePanel(true);  },
    closePanel() { this.togglePanel(false); },
  },
});
