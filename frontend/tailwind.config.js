/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors : {
        "weather-primary" : "#00668A",
        "weather-secondary" : "#FFFFFF"
      },
    },
    fontFamily : {
      Roboto : ["Roboto" , "sans-serif"]
    },
    container: {
      padding : "2rem",
      center : true,
    },
    screens : {
      sm : "640px",
      md : "760px"
    }
  },
  plugins: [],
}

