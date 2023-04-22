module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: "5rem",
    },
    extend: {
      colors: {
        accent: "#005A9B",
        primary: "#FF611E",
        "low-contrast": "#7D92A1",
        "high-contrast": "#324552",
        "medium-contrast": "#566976",
      },
      screens: {
        monic: "1800px",
      },
      height: {
        contract: "600px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
