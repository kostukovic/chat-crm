import { onMounted, onUnmounted } from "vue";
import { useUiStore } from "../stores/ui";

export function useViewport() {
  const ui = useUiStore();
  const onResize = () => ui.setSize(window.innerWidth, window.innerHeight);
  onMounted(() => {
    window.addEventListener("resize", onResize, { passive: true });
  });
  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
}
