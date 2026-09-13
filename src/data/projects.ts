export interface Project {
  slug: string;
  index: string;
  name: string;
  kind: string;
  year: string;
  statement: string;
  summary: string;
  problem: string;
  role: string;
  contribution: string[];
  stack: string[];
  repo: string;
  demo?: string;
  visual: "amber" | "signal" | "blue" | "steel" | "ember";
}

export const projects: Project[] = [
  {
    slug: "devprep-gt",
    index: "01",
    name: "DevPrep GT",
    kind: "IA · EdTech · Hackathon",
    year: "2025",
    statement: "Prepararse para una entrevista tech también debería entender Guatemala.",
    summary:
      "Plataforma de preparación para entrevistas técnicas con una guía personalizada por CV, simulación con IA y entrenamiento gamificado.",
    problem:
      "Las herramientas genéricas preparan para mercados ajenos. DevPrep adaptó preguntas, salarios, lenguaje y expectativas al contexto junior guatemalteco.",
    role: "Cofundador del prototipo y desarrollador durante la Cursor Hackathon Guatemala.",
    contribution: [
      "Flujo de carga y lectura del CV",
      "Experiencia de entrevista guiada por IA",
      "Sistema de práctica con progreso, vidas y XP",
      "Integración con Supabase y proxy seguro para el modelo",
    ],
    stack: ["JavaScript", "Supabase", "Groq AI", "Edge Functions"],
    repo: "https://github.com/Rakataxxd/devprep-gt",
    visual: "amber",
  },
  {
    slug: "signtrack",
    index: "02",
    name: "SignTrack",
    kind: "Accesibilidad · IA · Tiempo real",
    year: "2026",
    statement: "Una videollamada que no obliga a dejar el lenguaje de señas afuera.",
    summary:
      "Plataforma tipo Teams con videollamadas y traducción de lenguaje de señas a texto mediante análisis de video.",
    problem:
      "La comunicación remota suele asumir que todas las personas hablan y escuchan igual. SignTrack explora un puente en tiempo real entre señas y texto.",
    role: "Proyecto de equipo. Colaboré en el cliente móvil y su conexión con los servicios.",
    contribution: [
      "Cliente móvil con Expo y React Native",
      "Flujos de sesión y consumo de APIs",
      "Integración con una arquitectura de videollamada y traducción",
      "Pruebas del recorrido de usuario móvil",
    ],
    stack: ["React Native", "Expo", "Node.js", "C#", "WebSocket", "MediaPipe"],
    repo: "https://github.com/Gappy99/SignTrack",
    visual: "signal",
  },
  {
    slug: "sistema-bancario",
    index: "03",
    name: "Sistema Bancario",
    kind: "Fintech · Microservicios",
    year: "2026",
    statement: "La confianza se diseña también en la arquitectura.",
    summary:
      "Sistema bancario full stack con autenticación en .NET, administración en Node.js y clientes React, orquestado con Docker.",
    problem:
      "Coordinar identidad, operaciones y administración entre tecnologías distintas sin perder seguridad ni trazabilidad.",
    role: "Desarrollador principal del repositorio; 114 contribuciones registradas.",
    contribution: [
      "Servicio de autenticación con arquitectura por capas",
      "API administrativa con validación y JWT",
      "Integración de PostgreSQL y MongoDB",
      "Entorno reproducible mediante Docker Compose",
    ],
    stack: ["C#", ".NET", "Node.js", "React", "PostgreSQL", "MongoDB", "Docker"],
    repo: "https://github.com/osicajau-2024318/Sistema-Bancario--SCRUM",
    visual: "blue",
  },
  {
    slug: "cotiradar",
    index: "04",
    name: "CotiRadar",
    kind: "GovTech · Datos · IA",
    year: "2026",
    statement: "Los datos públicos sirven cuando alguien logra hacerlos visibles.",
    summary:
      "Herramienta de inteligencia pública para explorar contratos y detectar posibles señales de sobreprecio en compras gubernamentales.",
    problem:
      "Miles de registros abiertos siguen siendo opacos si una persona no puede entenderlos, compararlos ni reconocer patrones de riesgo.",
    role: "Participante de Hack@LATAM en el desarrollo del prototipo y su narrativa de producto.",
    contribution: [
      "Exploración y presentación de datos públicos",
      "Flujos de consulta asistida por IA",
      "Visualización de señales de riesgo",
      "Construcción y entrega del demo de hackathon",
    ],
    stack: ["React", "Node.js", "Python", "LLM", "Vercel"],
    repo: "https://github.com/jsajche-2024380/Hack-latam",
    demo: "https://web-seven-zeta-97.vercel.app",
    visual: "steel",
  },
  {
    slug: "gestor-restaurante",
    index: "05",
    name: "Gestor Restaurante",
    kind: "Mobile · Operaciones",
    year: "2026",
    statement: "Del pedido a la operación: una experiencia conectada.",
    summary:
      "Ecosistema para restaurantes con panel administrativo web y aplicación móvil para clientes construida con Expo.",
    problem:
      "Un restaurante necesita conectar catálogo, pedidos, mesas, ubicación y operación sin convertir cada canal en una isla.",
    role: "Proyecto de equipo. Fui el principal contribuidor del cliente móvil, con 20 commits.",
    contribution: [
      "Aplicación móvil para clientes con Expo",
      "Navegación y estado de sesión seguro",
      "Ubicación, selección de imágenes y flujos de pedido",
      "Integración con el backend del equipo",
    ],
    stack: ["React Native", "Expo", "React", "Node.js", ".NET", "Docker"],
    repo: "https://github.com/EddyCode1/client-user-restaurant",
    visual: "ember",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
