/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      extend: {
        colors: {
          //just add this below and your all other tailwind colors willwork

          stone: "#fafaf9",
        },
      },
    },
  },
  variants: [],
  plugins: [],
};
