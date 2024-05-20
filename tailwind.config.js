/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const { transform } = require('typescript')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  screens: {
    md: '1000px'
  },
  theme: {
    extend: {
      colors: {
        primary: 'hsl(359, 92%, 42%)',
        secondary: 'hsl(359, 91%, 29%)',
        menuColor: 'hsl(0, 62%, 93%)',
        modifiedGreen: 'hsl(120, 61%, 50%)'
      },
      fontFamily: {
        sans: ['Josefin Sans','sans-serif']
      },
      animation: {
        'slideY': 'slide-vertically 1000ms ease-in-out',
        'slideX': 'slide-horizontally 1000ms ease-in-out',
        'spinSlow': 'spin-slow 20s linear infinite'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

