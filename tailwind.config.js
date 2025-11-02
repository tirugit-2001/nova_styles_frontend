/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#d6ad75",
          light: "#e2c89e",
          dark: "#b5894f",
        },
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
      },
    },
  },
  plugins: [],
};
