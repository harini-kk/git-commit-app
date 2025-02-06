/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        courier: ['"Courier New", Courier'],
        arial: ['Arial'],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary : '#39496A',
        lightGrey : '#6D727C',
        secondary: '#32405D',
        tertiary: '#1C7CD6',
        successgreen: '#D8FFCB',
        errorred: '#FFE4E9',
      },
      letterSpacing: {
        '4p': '0.04em',
      },
    },
  },
  plugins: [],
}