// Resuelve rutas de archivos públicos respetando el basePath del hosting
// (GitHub Pages sirve el sitio bajo /josue-sajche).
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
