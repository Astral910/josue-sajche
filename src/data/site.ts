// Contenido de la portada. Copy directo orientado a clientes freelance; los
// objetos 3D (volcán, barrilete, Tikal, Atitlán, marimba) son la parte visual.

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
  eyebrow: "Josue Sajche · Desarrollador full stack e IA",
  eyebrowSecond: "Guatemalteco · Disponible para proyectos freelance",
  /** Título principal en dos líneas. */
  titleLine1: "Construyo productos",
  titleLine2: "web, móviles y con IA",
  subtitle:
    "Trabajo con negocios y startups que quieren lanzar algo nuevo: desde la interfaz hasta la API, la base de datos y la integración con IA.",
  statement: "De la idea a un producto en producción, con alcance y tiempos claros desde el inicio.",
  /** Datos que aparecen mientras el volcán entra en erupción con el scroll. */
  facts: [
    { value: "5", label: "proyectos con caso de estudio" },
    { value: "1er", label: "lugar · Cursor Hackathon 2025" },
    { value: "3", label: "frentes: web, móvil e IA" },
  ],
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
  /** Objeto 3D que gira en la plataforma mientras el paso está activo (solo visual). */
  landmark: LandmarkKind;
  landmarkName: string;
}

/** Cómo trabajo un proyecto, en tres pasos. */
export const approach: ApproachStep[] = [
  {
    index: "01",
    title: "Entender",
    text: "Antes de escribir código definimos juntos el problema, para quién es y qué tiene que pasar para que el proyecto valga la pena. Sales con un alcance claro, tiempos y precio.",
    landmark: "barrilete",
    landmarkName: "Barrilete de Sumpango",
  },
  {
    index: "02",
    title: "Construir",
    text: "Interfaz, API y datos se desarrollan juntos, con entregas que puedes probar cada semana. Uso Next.js, React Native, Node.js o .NET según lo que el producto necesita, no al revés.",
    landmark: "piramide",
    landmarkName: "Templo I · Tikal",
  },
  {
    index: "03",
    title: "Lanzar",
    text: "Despliegue, pruebas y ajustes con usuarios reales. Entrego el código documentado y con acceso completo, y sigo disponible para iterar cuando el producto lo pida.",
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
    title: "Aplicaciones web",
    text: "Sitios y plataformas con Next.js y React: landing pages, dashboards y sistemas completos, rápidos y responsivos, listos para crecer.",
  },
  {
    title: "Backend & APIs",
    text: "APIs en Node.js y .NET con autenticación, validación y base de datos en PostgreSQL, MongoDB o Supabase.",
  },
  {
    title: "Apps móviles",
    text: "Apps para iOS y Android con Expo y React Native conectadas a tu backend: pedidos, sesiones, ubicación y notificaciones.",
  },
  {
    title: "IA aplicada",
    text: "Asistentes con LLMs, lectura de documentos, visión por computadora y automatizaciones integradas dentro de tu producto.",
  },
  {
    title: "MVP para startups",
    text: "De la idea a un prototipo funcional en semanas, para validar con usuarios reales o presentarlo a inversionistas.",
  },
  {
    title: "Infra & despliegue",
    text: "Docker, Vercel, Supabase y Redis para entornos reproducibles y despliegues sin sorpresas.",
  },
];

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo trabajo", href: "/#enfoque" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Trayectoria", href: "/#trayectoria" },
  { label: "Contacto", href: "/#contacto" },
] as const;
