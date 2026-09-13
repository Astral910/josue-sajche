# Josue Sajche — Portafolio

Portafolio personal de Josue Sajche con narrativa de "atelier digital" y
símbolos de Guatemala en 3D: la cordillera emerge del lago al entrar, el Pacaya
entra en erupción conforme se hace scroll, y cada sección usa un objeto del país
(barrilete de Sumpango, Templo I de Tikal, lago de Atitlán, marimba) como
metáfora del producto, la IA y el software.

Sitio en vivo: https://astral910.github.io/josue-sajche/

## Stack

- Next.js 14 (App Router, export estático)
- TypeScript estricto
- Tailwind CSS
- Three.js + React Three Fiber + Drei (escenas 3D)
- GSAP + ScrollTrigger (scroll, parallax, preloader)
- Lenis (scroll suave)

## Objetos 3D

Todos los objetos se generan por código (sin archivos `.glb` ni texturas
externas) en `src/components/three/objects/`:

- `volcano.tsx`: cono con relieve procedural, cráter, coladas de lava (tubos que
  siguen el perfil), brasas y columna de ceniza. La erupción se controla con
  `eruptionRef` (0 → 1) desde el scroll del hero.
- `kite.tsx`: barrilete de Sumpango dibujado en un canvas 2D como textura.
- `pyramid.tsx`: templo escalonado inspirado en el Templo I de Tikal.
- `lake.tsx`: lago de Atitlán con sus tres volcanes y cayucos.
- `marimba.tsx`: marimba con teclas, resonadores y baquetas.
- `embers.tsx`: partículas reutilizables (brasas, ceniza, estrellas).

La escena del hero vive en `src/components/three/cordillera.tsx` y la
plataforma giratoria de "Enfoque" y los casos de estudio en
`src/components/three/spotlight-landmark.tsx`. Para cambiar qué símbolo
acompaña a cada paso o build, edita `approach` y `landmarks` en
`src/data/site.ts`.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Editar contenido

- Perfil, trayectoria, metas y logros: `src/data/profile.ts`
- Proyectos y casos de estudio: `src/data/projects.ts`
- Textos de portada, símbolos 3D, enfoque, servicios y menú: `src/data/site.ts`
- Composición de inicio: `src/components/home-experience.tsx`

## Verificación

```bash
npm run typecheck
npm run build
```

## Deploy (GitHub Pages)

```bash
npm run build:pages
npm exec --yes --package=gh-pages@6.3.0 -- gh-pages -d out -t --nojekyll -m "deploy: publica portafolio"
```

`build:pages` activa `basePath`/`assetPrefix` en `/josue-sajche` y expone
`NEXT_PUBLIC_BASE_PATH` para los assets cargados manualmente (imágenes). No
requiere variables de entorno adicionales.
