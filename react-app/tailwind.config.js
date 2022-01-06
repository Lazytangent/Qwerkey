const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    boxShadow: {
      ...defaultTheme.boxShadow,
      light:
        '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
      'light-lg':
        '0 10px 15px 3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.06)',
    },
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
      sans: ['"Carrois Gothic"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      gridTemplateRows: {
        layout: 'auto minmax(98vh, 1fr) auto',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['dark'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      borderColor: ['disabled'],
    },
  },
  plugins: [],
  corePlugins: {
    ringColor: false,
  },
};
