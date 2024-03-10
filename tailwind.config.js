const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["sans-serif", ...defaultTheme.fontFamily.sans], //"Roboto",
        // muli: ["Muli", ...defaultTheme.fontFamily.sans],
      },
      width: {
        500: "500px",
      },
      zIndex: {
        100: "100",
      },
      height: {
        500: "500px",
        600: "600px",
      },
      textUnderlineOffset: {
        16: "16px",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
        },
      },
      colors: {
        'orange': '#FFC444',
      },
    },
  },
};
