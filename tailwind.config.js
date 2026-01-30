/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#4318FF",
        secondary: "#2B3674",
        'colorGray-300': "#F4F7FE",
        'colorGray-600': "#A3AED0"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montse: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        authBG: "url('assets/images/loginPageBG.png')",
        'primary-gradient': 'linear-gradient(125deg, rgba(134,140,255,1) 0%, rgba(67,24,255,1) 100%)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite'
      }
    },
  },
  plugins: [],
};
