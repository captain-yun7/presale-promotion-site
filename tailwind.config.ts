import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a4d2e",
          50: "#f0f7f3",
          100: "#d9ebe0",
          200: "#b3d7c1",
          300: "#8cc3a2",
          400: "#66af83",
          500: "#409b64",
          600: "#1a4d2e",
          700: "#153d24",
          800: "#102e1b",
          900: "#0a1f12",
        },
        secondary: {
          DEFAULT: "#c5a572",
          50: "#faf8f3",
          100: "#f2ede0",
          200: "#e6dbc1",
          300: "#d9c9a2",
          400: "#cdb783",
          500: "#c5a572",
          600: "#b08d52",
          700: "#8a6e41",
          800: "#654f30",
          900: "#3f301f",
        },
        accent: {
          DEFAULT: "#8b7355",
          50: "#f5f2ef",
          100: "#e8e0d7",
          200: "#d1c1af",
          300: "#baa287",
          400: "#a3835f",
          500: "#8b7355",
          600: "#6f5c44",
          700: "#534533",
          800: "#372e22",
          900: "#1b1711",
        },
        luxury: {
          gold: "#d4af37",
          rose: "#b76e79",
          cream: "#faf7f2",
          charcoal: "#2c2c2c",
        },
      },
      fontFamily: {
        noto: ["Noto Sans KR", "sans-serif"],
        serif: ["Noto Serif KR", "serif"],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
        slideDown: "slideDown 0.6s ease-out",
        scaleIn: "scaleIn 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
