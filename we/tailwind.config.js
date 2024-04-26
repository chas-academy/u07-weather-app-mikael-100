/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'theOddZone': "880px",
      'lg': '1024px',
      'theOddZone2': '1136px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    extend: {},
  },
  plugins: [],
};
