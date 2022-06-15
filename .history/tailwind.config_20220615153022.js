module.exports = {
theme:{
  colors: {
    secondary : "#22d3ee",
  },
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Concert: " 'Titan One', cursive",
        Cairo: "'Cairo', sans-serif",
      },
    },
  },
  plugins: [],
}
 
};
