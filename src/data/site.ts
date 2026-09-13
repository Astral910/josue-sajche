// Contenido de la portada. Sigue la narrativa de un "atelier" con objetos de
// Guatemala generados en 3D: cada sección usa un símbolo distinto del país.

export type LandmarkKind = "volcan" | "barrilete" | "piramide" | "lago" | "marimba";

export interface LandmarkSpec {
  kind: LandmarkKind;
  /** Nombre del símbolo que aparece como etiqueta. */
  name: string;
  /** Proyecto al que acompaña. */
  label: string;
}

/** Un símbolo por build, en el mismo orden que src/data/projects.ts. */
export const landmarks: LandmarkSpec[] = [
  { kind: "volcan", name: "Volcán de Pacaya", label: "DevPrep GT" },
  { kind: "barrilete", name: "Barrilete de Sumpango", label: "SignTrack" },
  { kind: "piramide", name: "Templo I · Tikal", label: "Sistema Bancario" },
  { kind: "lago", name: "Lago de Atitlán", label: "CotiRadar" },
  { kind: "marimba", name: "Marimba", label: "Gestor Restaurante" },
];

export const hero = {
  eyebrow: "No modifico ideas",
  eyebrowSecond: "Las construyo desde Guatemala",
  title: "Para quienes rechazan lo ordinario",
  subtitle:
    "Un atelier digital de producto, inteligencia artificial y craftsmanship, con los volcanes de fondo.",
  statement:
    "Productos digitales construidos sobre criterio, intención e identidad. No simplemente para cumplir.",
  /** Frase que aparece mientras el volcán entra en erupción con el scroll. */
  eruption:
    "Como el Pacaya: la presión acumulada, con dirección, se convierte en algo que se ve desde lejos.",
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
  /** Símbolo que gira en la plataforma mientras el paso está activo. */
  landmark: LandmarkKind;
  landmarkName: string;
}

export const approach: ApproachStep[] = [
  {
    index: "01",
    title: "Identidad",
    text: "Como un barrilete de Sumpango, cada build lleva el color de quien lo vuela: su contexto, su ritmo y el problema real que quiere resolver. Sin eso, no hay producto.",
    landmark: "barrilete",
    landmarkName: "Barrilete de Sumpango",
  },
  {
    index: "02",
    title: "Intención",
    text: "Tikal se levantó piedra sobre piedra con un plan. Interfaz, datos y arquitectura se resuelven como una sola visión; cada decisión técnica existe porque la experiencia la necesita.",
    landmark: "piramide",
    landmarkName: "Templo I · Tikal",
  },
  {
    index: "03",
    title: "Cohesión",
    text: "Una marimba son muchas teclas y un solo sonido. Cada detalle se elige con precisión para que el conjunto tenga propósito, equilibrio y carácter. Nada decorativo, todo con función.",
    landmark: "marimba",
    landmarkName: "Marimba",
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
