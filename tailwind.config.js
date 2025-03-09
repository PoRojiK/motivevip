/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'motive-pink': '#e5097f',
        'motive-purple': '#26264b',
      },
    },
  },
  plugins: [],
};
