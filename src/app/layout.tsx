import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Syne } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Josue Sajche — Desarrollador de producto",
  description:
    "Portafolio de Josue Sajche: productos full stack, experiencias móviles e inteligencia artificial desde Guatemala.",
  metadataBase: new URL("https://josue-sajche.vercel.app"),
  openGraph: {
    title: "Josue Sajche — Código con propósito",
    description:
      "Productos full stack, experiencias móviles e IA aplicada desde Guatemala.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body
        className={`${syne.variable} ${manrope.variable} ${plex.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
