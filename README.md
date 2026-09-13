# Josue Sajche — Portafolio

Portafolio personal cinematográfico de Josue Sajche. Cuenta una trayectoria de
producto, hackathons, sistemas full stack y experiencias móviles desde
Guatemala.

## Stack

- Next.js 14 (App Router)
- TypeScript estricto
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis
- Componentes base con shadcn/ui

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Editar contenido

- Perfil, trayectoria, metas y capacidades: `src/data/profile.ts`
- Proyectos y casos de estudio: `src/data/projects.ts`
- Composición de inicio: `src/components/home-experience.tsx`

## Verificación

```bash
npm run typecheck
npm run build
```

## Deploy

El proyecto está preparado para desplegarse en Vercel conectando el repositorio
`Astral910/josue-sajche`. No requiere variables de entorno.
