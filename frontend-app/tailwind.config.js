/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0071FF",
        black: "#1B1B1B",
        white: "#FFFFFF",
        gray: "#F0F0F0",
      },
    },
  },
  plugins: [],
};
