/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1400px" } },
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        background: "#FAF9F6", // ivory
        foreground: "#2C2C2C", // charcoal
        primary: { DEFAULT: "#800000", foreground: "#FFFFFF" }, // maroon
        secondary: { DEFAULT: "#F5F5F0", foreground: "#2C2C2C" },
        muted: { DEFAULT: "#EAEAEA", foreground: "#757575" },
        border: "#EAEAEA",
        gold: { DEFAULT: "#D4AF37", soft: "#F3E5AB" },
        maroon: { DEFAULT: "#800000", deep: "#4A0000" },
        charcoal: "#2C2C2C",
        ivory: "#FAF9F6",
      },
      boxShadow: {
        elegant: "0 10px 40px -10px rgba(0,0,0,0.08)",
        card: "0 4px 20px -2px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

