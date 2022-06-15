module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    
    extend: {
      colors: {
        blueInput: "9CF8FF"
      },
      fontFamily: {
        Concert: " 'Titan One', cursive",
        Cairo: "'Cairo', sans-serif",
      },
    },
  },
  plugins: [],
};
