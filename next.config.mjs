const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // El portafolio no necesita servidor: el export estático reduce superficie
  // de ataque y permite alojarlo tanto en Vercel como en GitHub Pages.
  output: "export",
  basePath: isGitHubPages ? "/josue-sajche" : "",
  assetPrefix: isGitHubPages ? "/josue-sajche/" : "",
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true,
  },
};

export default nextConfig;
