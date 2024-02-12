/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#00FF75",
        "custom-red": "#FA5F5F",
        "custom-orange": "#FFC107",
        "custom-bg": "#272727",
        "custom-bg-light": "#524D4D",
        "custom-white": "#F0E7E7",
      },
    },
  },
  plugins: [],
};
