import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
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
        text:"#999999",
        app:"#F4F4F4",
        skeleton:"#cad3dc"
      },
      maxWidth:{
        card:"250px"
      },
      fontSize:{
        yash:"11px"
      }
    },
  },
  plugins: [],
}
)