import { onMounted, onUnmounted } from "vue";
import { useUiStore } from "../stores/ui";

export function useHotkeys() {
  const ui = useUiStore();
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") ui.setFullscreen(null);
    if (e.key === "m" && (e.ctrlKey || e.metaKey)) ui.toggleNav();
  };
  onMounted(() => window.addEventListener("keydown", onKey));
  onUnmounted(() => window.removeEventListener("keydown", onKey));
}
