/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","*.html"],
  theme: {
    extend: {
      colors: {
        "portto-light-gold": "#FFE7C2",
        "portto-purple": "#4920E5",
        "portto-black": "#0B0B1B",
        "portto-green": "#12BB74",
        "portto-red": "#E64D56",
      },
      fontFamily: {
        "poppins": "Poppins",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideToR: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideToT: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        slideToB: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0%)" },
        },
      },
    },
  },
  plugins: [],
}