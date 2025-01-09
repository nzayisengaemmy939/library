/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'], 
      },
      colors: {
        primary: {
          light: '#66b3ff',
          DEFAULT: '#003366', 
          dark: '#075985',
        },
        background: {
          light: '#ffffff',
          dark: '#212f3c',
        },
      },
    },
  },
  darkMode: 'class', 
  plugins: [],
};
