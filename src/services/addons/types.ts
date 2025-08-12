export interface AddonManifest {
  id: string;
  name: string;
  version: string;
  entry: string; // URL zu ESM (.mjs)
  permissions?: string[];
  signature?: string;
}
