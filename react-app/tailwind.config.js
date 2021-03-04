const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      green: {
        DEFAULT: '#00ce86',
        dark: '#007a50',
      },
      purple: {
        DEFAULT: '#9556dc',
        dark: '#391463',
      },
    },
    fontFamily: {
      big: ['Montserrat', ...defaultTheme.fontFamily.sans],
      sans: ['"Carrois Gothic"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      gridTemplateRows: {
        'layout': 'auto minmax(900px, 1fr) auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
