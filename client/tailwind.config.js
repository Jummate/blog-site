/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    boxShadow: {
      pref: "1px 1px 15px 4px rgba(0,0,0,0.1)",
    },
    extend: {},
    fontFamily: {
      // mono: ["Share Tech Mono", "Ubuntu Mono", "Roboto Mono"],
      sans: ["Inter", "Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
