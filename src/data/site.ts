// Contenido de la portada. Sigue la narrativa de un "atelier": cada sección
// traduce el lenguaje de un taller de autos a medida al mundo del producto digital.

export interface CarSpec {
  /** Archivo dentro de public/models (Kenney Car Kit, CC0). */
  file: string;
  /** Color de pintura del showroom. */
  paint: string;
  /** Etiqueta que aparece bajo el auto en la escena. */
  label: string;
}

export const fleet: CarSpec[] = [
  { file: "race-future.glb", paint: "#e8b86d", label: "DevPrep GT" },
  { file: "sedan-sports.glb", paint: "#2a2a31", label: "SignTrack" },
  { file: "suv-luxury.glb", paint: "#3a3a40", label: "Sistema Bancario" },
  { file: "hatchback-sports.glb", paint: "#8f1d1d", label: "CotiRadar" },
  { file: "race.glb", paint: "#d9d4cb", label: "Gestor Restaurante" },
];

export const hero = {
  eyebrow: "No modifico ideas",
  eyebrowSecond: "Las construyo contigo",
  title: "Para quienes rechazan lo ordinario",
  subtitle:
    "Un atelier digital de producto, inteligencia artificial y craftsmanship desde Guatemala.",
  statement:
    "Productos digitales construidos sobre criterio, intención e identidad. No simplemente para cumplir.",
} as const;

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "C#",
  ".NET",
  "Supabase",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Expo",
  "React Native",
  "GSAP",
  "Three.js",
] as const;

export interface ApproachStep {
  index: string;
  title: string;
  text: string;
  paint: string;
  model: string;
}

export const approach: ApproachStep[] = [
  {
    index: "01",
    title: "Identidad",
    text: "Cada build empieza con la persona detrás del volante: su contexto, su ritmo y el problema real que quiere resolver. Sin eso, no hay producto.",
    paint: "#e8b86d",
    model: "race-future.glb",
  },
  {
    index: "02",
    title: "Intención",
    text: "Interfaz, datos y arquitectura se resuelven como una sola visión. Cada decisión técnica existe porque la experiencia la necesita.",
    paint: "#26262b",
    model: "sedan-sports.glb",
  },
  {
    index: "03",
    title: "Cohesión",
    text: "Cada detalle se elige con precisión para que el conjunto tenga propósito, equilibrio y carácter. Nada decorativo, todo con función.",
    paint: "#8f1d1d",
    model: "hatchback-sports.glb",
  },
];

export interface Service {
  title: string;
  text: string;
}

export const services: Service[] = [
  {
    title: "Frontend",
    text: "Interfaces con Next.js y React diseñadas para cambiar la presencia de un producto sin traicionar su carácter. Animación con intención, no ruido.",
  },
  {
    title: "Backend & APIs",
    text: "Servicios en Node.js y .NET con autenticación, validación y trazabilidad. La confianza también se diseña en la arquitectura.",
  },
  {
    title: "Móvil",
    text: "Clientes con Expo y React Native que acercan sistemas complejos a personas reales, en su contexto y en su bolsillo.",
  },
  {
    title: "IA aplicada",
    text: "LLMs, visión y agentes usados para resolver una necesidad concreta. La inteligencia sirve al producto, no al revés.",
  },
  {
    title: "Datos & Infra",
    text: "PostgreSQL, MongoDB, Redis y Docker para entornos reproducibles que crecen sin perder claridad.",
  },
  {
    title: "Producto & Pitch",
    text: "Hackathons enseñan a escuchar, priorizar y entregar bajo presión. Traduzco problemas en narrativa y en un MVP que se puede usar.",
  },
];

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Enfoque", href: "/#enfoque" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Trayectoria", href: "/#trayectoria" },
  { label: "Contacto", href: "/#contacto" },
] as const;
