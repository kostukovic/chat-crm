import { watch, onMounted, onBeforeUnmount } from "vue";
import { useUiStore } from "../stores/ui";

/**
 * Synchronisiert ui.mobileMode (nur bp<=1) mit window.history,
 * sodass der Hardware‑Back‑Button zwischen List/Main/Panel zurückspringt.
 */
export function useBackNav() {
  const ui = useUiStore();

  function pushStateFor(mode: "nav-list" | "main" | "panel") {
    try {
      const state = { _crmNav: true, mode };
      window.history.pushState(state, "");
    } catch {}
  }

  function onPop(e: PopStateEvent) {
    const s = e.state as any;
    if (ui.bp <= 1 && s && s._crmNav && typeof s.mode === "string") {
      ui.setMobileMode(s.mode);
    } else if (ui.bp <= 1) {
      // Fallback: wenn kein State vorhanden ist, zur Liste
      ui.setMobileMode("nav-list");
    }
  }

  onMounted(() => {
    // Initialen Zustand setzen (nur ≤1366px)
    if (ui.bp <= 1) {
      const init = { _crmNav: true, mode: ui.mobileMode };
      try {
        window.history.replaceState(init, "");
      } catch {}
      window.addEventListener("popstate", onPop);
    }
  });

  onBeforeUnmount(() => {
    window.removeEventListener("popstate", onPop);
  });

  // Jede Änderung des Modes (nur ≤1366px) auf den History‑Stack legen
  watch(
    () => ui.mobileMode,
    (m, prev) => {
      if (ui.bp <= 1 && m !== prev) {
        pushStateFor(m);
      }
    }
  );
}
