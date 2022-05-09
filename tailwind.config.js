const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: {
        0: '#edf3ff',
        50: '#d3def4',
        100: '#bbcae9',
        150: '#a5b7de',
        200: '#8fa5d3',
        300: '#6c85bd',
        400: '#506ca7',
        500: '#3b5691',
        600: '#2c457b',
        700: '#2f4166',
        800: '#2f4166',
        900: '#1b2947',
      },
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
    fontFamily: {
      title: ['"Unica One"', 'cursive'],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            hr: {
              borderColor: theme('colors.indigo.200'),
              borderTopWidth: '1px',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'ol > li::before': {
              color: theme('colors.indigo.900'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.indigo.900'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
