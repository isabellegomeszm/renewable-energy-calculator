// tailwind.config.js
module.exports = {
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: true,
  },
  future: {
    // 🔧 força Tailwind a não usar cores oklch
    disableColorOpacityUtilitiesByDefault: false,
  },
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],       // para usar font-inter
        helvetica: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"], // para usar font-helvetica
      },
    },
  },
  plugins: [],
};
