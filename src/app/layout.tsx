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

// Serif editorial para las frases-manifiesto, al estilo de un atelier.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Josue Sajche — Para quienes rechazan lo ordinario",
  description:
    "Atelier digital de Josue Sajche: productos full stack, experiencias móviles e inteligencia artificial construidos con intención desde Guatemala.",
  metadataBase: new URL("https://astral910.github.io/josue-sajche"),
  openGraph: {
    title: "Josue Sajche — Para quienes rechazan lo ordinario",
    description:
      "Productos digitales construidos sobre criterio, intención e identidad.",
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
