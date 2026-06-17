/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"]
  },
  transpilePackages: ["pdfjs-dist"],
  webpack: (config) => {
    // pdf.js worker must not be bundled — serve it as a static asset
    config.resolve.alias.canvas = false;

    return config;
  }
};

export default nextConfig;
