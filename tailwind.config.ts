import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#121820",
          sky: "#17C3B2",
          purple: "#0B0F14",
          pink: "#D4AF37",
          offwhite: "#FFFFFF"
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))"
      },
      boxShadow: {
        glow: "0 0 42px rgba(23, 195, 178, 0.22)",
        "pink-glow": "0 0 34px rgba(212, 175, 55, 0.16)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.32)"
      },
      backgroundImage: {
        "soft-grid":
          "linear-gradient(to right, hsl(var(--border) / .32) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / .32) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
