import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Manrope, Syne } from "next/font/google";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Serif editorial para las frases destacadas de los casos de estudio.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Josue Sajche — Desarrollador full stack e IA",
  description:
    "Portafolio de Josue Sajche, desarrollador full stack guatemalteco: aplicaciones web, móviles e integraciones con IA para negocios y startups.",
  metadataBase: new URL("https://astral910.github.io/josue-sajche"),
  openGraph: {
    title: "Josue Sajche — Desarrollador full stack e IA",
    description: "Aplicaciones web, móviles e integraciones con IA para negocios y startups.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${syne.variable} ${manrope.variable} ${plex.variable} ${cormorant.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
