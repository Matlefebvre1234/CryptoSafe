module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      secondary: "9CF8FF"
    },
    extend: {
      fontFamily: {
        Concert: " 'Titan One', cursive",
        Cairo: "'Cairo', sans-serif",
      },
    },
  },
  plugins: [],
};
