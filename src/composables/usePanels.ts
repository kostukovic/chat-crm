import { ref } from "vue";
export function usePanels() {
  const resizing = ref(false);
  return { resizing };
}
