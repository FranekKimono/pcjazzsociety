import type { Config } from "tailwindcss";
// import defaultTheme from "tailwindcss/defaultTheme";
// import colors from "tailwindcss/colors";
// import aspectRatio from "@tailwindcss/aspect-ratio";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const aspectRatio = require("@tailwindcss/aspect-ratio");
// Get the primary color from env or use default aquamarine
const primaryColor = process.env.NUXT_PRIMARY_COLOR || "#001c40";
// Get font names from environment variables or use defaults
const mainFont = process.env.NUXT_FONT_MAIN || "Lato";
const codeFont = process.env.NUXT_FONT_CODE || "Fira Code";

export default <Partial<Config>>{
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./content/**/*.{md,yml,json,yaml,toml,csv}",
    "./nuxt.config.{js,ts}",
  ],
  safelist: [
    "grid",
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "sm:grid",
    "sm:grid-cols-1",
    "sm:grid-cols-2",
    "sm:grid-cols-3",
    "md:grid",
    "md:grid-cols-1",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "lg:grid",
    "lg:grid-cols-1",
    "lg:grid-cols-2",
    "lg:grid-cols-3",
    "gap-4",
    "gap-8",
    "hidden",
    "sm:hidden",
    "md:hidden",
    "lg:hidden",
    "sm:block",
    "md:block",
    "lg:block",
    "via-primary-500/25",
    "via-primary-500/33",
    "via-primary-500/50",
    "via-teal-800/25",
    "via-teal-800/33",
    "via-teal-800/50",
    "via-emerald-800/25",
    "via-emerald-800/33",
    "via-emerald-800/50",
    "via-amber-800/25",
    "via-amber-800/33",
    "via-amber-800/50",
  ],
  safelistPatterns: [
    /^text-/,
    /^bg-/,
    /^border-/,
    /^p-/,
    /^m-/,
    /^w-/,
    /^h-/,
    /^flex-/,
    /^grid-/,
    /^justify-/,
    /^items-/,
    /^rounded-/,
    /^shadow-/,
    /^transition-/,
    /^transform-/,
    /^hover:/,
    /^focus:/,
    /^sm:/,
    /^md:/,
    /^lg:/,
    /^xl:/,
    /^2xl:/,
    /^via-/,
    /^from-/,
    /^to-/,
    /^bg-gradient-to-br/,
    /^bg-gradient-to-tr/,
    /^bg-gradient-to-tl/,
    /^bg-gradient-to-bl/,
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Using environment variable or default aquamarine
          DEFAULT: primaryColor,
          50: "#eaf1fb",
          100: "#d5e3f7",
          200: "#aec9ee",
          300: "#86afe6",
          400: "#5d7edd",
          500: "#4a60d1",
          600: "#394ea7",
          700: "#2b467e",
          800: "#1d3054",
          900: "#0f192a",
          950: "#060b15",
        },
        // Import amber from Tailwind's colors
        amber: colors.amber,
        // Import teal from Tailwind's colors for gradients
        teal: colors.teal,
      },
      fontFamily: {
        sans: [mainFont, ...defaultTheme.fontFamily.sans],
        mono: [codeFont, ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [aspectRatio],
};
