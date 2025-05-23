/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],      
      },
      colors: {
        customBlue: '#8aa4c5',
        customGray: '#8c8c8c',
      },
      borderRadius: {
        full: '9999px',
      },
    },
  },
  plugins: [],
};