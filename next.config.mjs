const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // El portafolio no necesita servidor: el export estático reduce superficie
  // de ataque y permite alojarlo tanto en Vercel como en GitHub Pages.
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/josue-sajche" : "",
  assetPrefix: isGitHubPages ? "/josue-sajche/" : "",
  // Prefijo público para assets cargados manualmente (modelos 3D, etc.).
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/josue-sajche" : "",
  },
  // Three.js se transpila para el bundle del cliente.
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
