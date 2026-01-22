/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#4318FF",
        secondary: "#2B3674",
        colorGray300: "#F4F7FE",
        colorGray600: "#A3AED0",
      },
      fontFamily: {
        'inter': ["Inter", "sans-serif"],
        'montse': ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        authBG: "url('/assets/images/loginPageBG.png')",
      },
    },
  },
  plugins: [],
};
