/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["var(--lato)"],
        raleway: ["var(--raleway)"],
      },
      container: {
        center: true
      },
      colors:{
        primary:"#AC2318",
        text:"#999999"
      },
      fontSize:{
        yash:"11px"
      }
    },
  },
  plugins: [],
}
