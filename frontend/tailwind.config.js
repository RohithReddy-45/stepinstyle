/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Be Vietnam Pro, monospace',
    },
    extend: {
      colors: {
        primary: '#28292d',
        secondary: '#37383e',
        accent: '#585c62',
        accent2: '#3a6ef6',
      },
      height: {
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
