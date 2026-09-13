/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // El portafolio no necesita servidor: el export estático reduce superficie
  // de ataque y permite alojarlo tanto en Vercel como en GitHub Pages.
  output: "export",
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
