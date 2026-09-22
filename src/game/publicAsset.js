export function publicAsset(path) {
  const normalized = String(path).replace(/^\/+/, '');
  const base = import.meta.env?.BASE_URL || '/';
  return `${base}${normalized}`;
}
