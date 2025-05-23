/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.vue",
    "./src/views/*.vue",
    "./src/components/*.vue",
    "./src/components/**/*.vue",
    "./src/views/*.vue",
    "./src/views/**/*.vue",
    "./src/layouts/*.vue",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1440px",
        "4xl": "2560px",
      },
      fontFamily: {
        sf: ["SF Pro Display"],
      },
    },
  },
  plugins: [],
};
