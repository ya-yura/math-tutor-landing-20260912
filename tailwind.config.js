/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A1830',
        navy: '#0D2342',
        paper: '#F7F8F6',
        coral: '#E87961',
        sand: '#F1E9DE',
        fog: '#DCE5EE'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 20px 60px rgba(10, 24, 48, 0.12)',
        coral: '0 12px 28px rgba(232, 121, 97, 0.28)'
      }
    }
  },
  plugins: []
};
