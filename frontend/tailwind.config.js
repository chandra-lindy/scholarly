/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-main": "#c8532c",
        "brand-aux-1": "#dc4304",
        "brand-aux-2": "#f64f06",
        "brand-paper": "#fdf6e3",
      },
    },
  },
  plugins: [],
};
