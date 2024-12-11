/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem",
        162: "40rem",
        192: "48rem",
        
      }
    },
    fontFamily: {
      "monts": ['sans-serif', "Montserrat"],
    }
  },
  plugins: [],
}

