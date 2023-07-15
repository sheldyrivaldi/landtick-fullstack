/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        avenir: ["Avenir", "sans-serif"],
        opticon: ["Opticon", "sans-serif"],
      },
      colors: {
        soft: "#B1B1B1",
        "soft-pink": "#EC7AB7",
        "strong-pink": "#EC7A7A",
      },
    },
  },
  plugins: [],
};
