# Josue Sajche — Portafolio

Portafolio personal de Josue Sajche con narrativa de "atelier digital": una
flota de autos 3D entra al showroom, y cada sección traduce el lenguaje de un
taller de autos a medida al mundo del producto, la IA y el software.

Sitio en vivo: https://astral910.github.io/josue-sajche/

## Stack

- Next.js 14 (App Router, export estático)
- TypeScript estricto
- Tailwind CSS
- Three.js + React Three Fiber + Drei (escenas 3D)
- GSAP + ScrollTrigger (scroll, parallax, preloader)
- Lenis (scroll suave)

## Modelos 3D

Los autos provienen del **Car Kit de Kenney** (licencia CC0, uso libre):
https://kenney.nl/assets/car-kit. Viven en `public/models/` junto con su
licencia. Al cargarlos, `src/components/three/car-model.tsx` reemplaza los
materiales por un acabado de showroom (pintura con clearcoat + ruedas oscuras),
por lo que basta cambiar `paint` en `src/data/site.ts` para recolorear un auto.

Para agregar otro modelo: copia el `.glb` a `public/models/` y referencia el
archivo en `fleet` o `approach` dentro de `src/data/site.ts`.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

## Editar contenido

- Perfil, trayectoria, metas y logros: `src/data/profile.ts`
- Proyectos y casos de estudio: `src/data/projects.ts`
- Textos de portada, flota 3D, enfoque, servicios y menú: `src/data/site.ts`
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
`NEXT_PUBLIC_BASE_PATH` para los assets cargados manualmente (modelos 3D,
imágenes). No requiere variables de entorno adicionales.
