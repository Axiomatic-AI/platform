import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fbe8',
          100: '#dff7d0',
          200: '#c0ee9d',
          300: '#9de063',
          400: '#85d33a',
          500: '#6EB600',
          600: '#5a9200',
          700: '#4a7a00',
          800: '#3c6100',
          900: '#324f00',
          950: '#1a2900',
        },
        dark: {
          100: '#e0e3e5',
          200: '#c2c8cc',
          300: '#a3acb2',
          400: '#849099',
          500: '#65747f',
          600: '#475966',
          700: '#364450',
          800: '#242e39',
          900: '#121B21',
          950: '#0a1015',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config 