import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-center">
      <div>
        <p className="section-label">Error 404</p>
        <h1 className="display mt-5 text-6xl font-semibold md:text-8xl">
          Esta historia no existe.
        </h1>
        <Button asChild className="mt-10">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}
