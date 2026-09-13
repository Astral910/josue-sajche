"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

import { lockScroll, scrollToTarget } from "@/components/motion/motion-shell";
import { navigation } from "@/data/site";
import { profile } from "@/data/profile";

/**
 * Cabecera fija con el botón "Navegar / Cerrar" y el menú a pantalla completa.
 */
export function NavOverlay() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    lockScroll(open);
    const links = overlay.querySelectorAll<HTMLElement>(".nav-link");

    if (open) {
      gsap.set(overlay, { pointerEvents: "auto" });
      gsap.to(overlay, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.inOut" });
      gsap.fromTo(
        links,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.06, delay: 0.35, ease: "power3.out" },
      );
    } else {
      gsap.to(overlay, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => gsap.set(overlay, { pointerEvents: "none" }),
      });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      const hashIndex = href.indexOf("#");
      const hash = hashIndex >= 0 ? href.slice(hashIndex) : null;

      // En la portada usamos el scroll suave; fuera de ella, navegamos.
      if (pathname === "/" && (hash || href === "/")) {
        window.setTimeout(() => scrollToTarget(hash ?? "#"), 250);
        return;
      }
      router.push(href);
    },
    [pathname, router],
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] mix-blend-difference">
        <div className="container-wide flex h-16 items-center justify-between md:h-20">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="display text-sm font-bold uppercase tracking-[0.18em] text-white"
          >
            Josue Sajche
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-principal"
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white"
          >
            <span className="relative block h-[1em] overflow-hidden">
              <span
                className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)]"
                style={{ transform: open ? "translateY(-100%)" : "translateY(0)" }}
              >
                Navegar
              </span>
              <span
                className="block transition-transform duration-500 ease-[cubic-bezier(.76,0,.24,1)]"
                style={{ transform: open ? "translateY(-100%)" : "translateY(0)" }}
              >
                Cerrar
              </span>
            </span>
            <span className="relative block size-8 border border-white/60 transition-colors group-hover:bg-white/10">
              <span
                className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-white transition-transform duration-500"
                style={{ transform: `translate(-50%, ${open ? "0" : "-3px"}) rotate(${open ? "45deg" : "0"})` }}
              />
              <span
                className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-white transition-transform duration-500"
                style={{ transform: `translate(-50%, ${open ? "0" : "3px"}) rotate(${open ? "-45deg" : "0"})` }}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="menu-principal"
        className="pointer-events-none fixed inset-0 z-[75] flex flex-col justify-between bg-[#0b0b0b] px-5 pb-8 pt-28 text-[#f3f0ea] md:px-10"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        aria-hidden={!open}
      >
        <nav aria-label="Menú principal" className="grid gap-10 md:grid-cols-12">
          <ul className="md:col-span-8">
            {navigation.map((item, index) => (
              <li key={item.href} className="overflow-hidden border-b border-white/10">
                <button
                  type="button"
                  onClick={() => navigate(item.href)}
                  className="nav-link group flex w-full items-baseline gap-6 py-4 text-left md:py-5"
                >
                  <span className="font-mono text-xs text-white/40">0{index + 1}</span>
                  <span className="display text-[clamp(2.4rem,7vw,6rem)] font-semibold uppercase leading-none transition-transform duration-500 group-hover:translate-x-3">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="nav-link self-end md:col-span-4">
            <p className="section-label">Contacto directo</p>
            <a href={`mailto:${profile.email}`} className="mt-3 block text-lg hover:text-gold">
              {profile.email}
            </a>
            <div className="mt-6 flex gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white">
                GitHub <ArrowUpRight className="size-3" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white">
                LinkedIn <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
        </nav>
        <div className="flex items-end justify-between border-t border-white/10 pt-5">
          <p className="section-label">Atelier digital · Guatemala</p>
          <p className="section-label">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
}
