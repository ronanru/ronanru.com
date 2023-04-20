const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type import('tailwindcss').Config */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Ubuntu', ...fontFamily.sans]
    },
    extend: {}
  },
  plugins: []
};
