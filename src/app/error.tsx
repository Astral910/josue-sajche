"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-center">
      <div>
        <p className="section-label">Algo interrumpió la experiencia</p>
        <h1 className="display mt-5 text-5xl font-semibold md:text-7xl">
          Volvamos a intentarlo.
        </h1>
        <Button className="mt-10" onClick={reset}>
          Recargar experiencia
        </Button>
      </div>
    </main>
  );
}
