/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#374066',
        // secondary: '#222151',
        secondary: '#394063',
        dark: '#2C353D'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': {
            transform: 'translateY(50%)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1
          }
        }
      },
      animation: {
        'fadeIn': 'fadeIn 2s linear',
        'slideUp': 'slideUp .7s linear'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}