export async function loadAddonModule(url: string) {
  // Dynamisches ESM-Laden (Sicherheitschecks vorher!)
  return import(/* @vite-ignore */ url);
}
