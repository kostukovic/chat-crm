export function hasPermission(required: string[], granted: string[]) {
  return required.every((p) => granted.includes(p));
}
