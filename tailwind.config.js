/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background color for light sections
        cream: '#EFE4D2',

        // Primary color for buttons, headings, links
        primaryBlue: '#254D70',

        // Dark navy for navbar, footer, main text
        darkNavy: '#131D4F',

        // Accent color (burnt orange) for highlights, buttons
        accentOrange: '#954C2E',

        // Neutral dark gray/brown for secondary text
        neutralDark: '#2E2C2E',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shine: 'shine 1.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
