import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { 50: "#F1F4FA", 100: "#D5DEEF", 200: "#B8C8E8", 500: "#2A4178", 700: "#162A57", 900: "#0B1B3A" },
        green: { 50: "#F0FDF4", 200: "#BBF7D0", 300: "#86EFAC", 500: "#00C46A", 600: "#00A85A", 700: "#15803D", 800: "#166534" },
        amber: { 50: "#FFFBEB", 200: "#FDE68A", 500: "#F59E0B" },
        slate: { 50: "#F8FAFC", 100: "#F1F5F9", 500: "#64748B", 900: "#0F172A" },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Geist", "Inter", "ui-sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
