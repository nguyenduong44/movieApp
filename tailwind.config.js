module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ['"Nanum Gothic"', 'san6s-serif'],
        dancing: ['"Dancing Script"', 'sans-serif']
      },
      colors: {
        'primary': '#CCFF00',
        'primary-rgba': 'rgba(204, 255, 0, 0.7)'
      }
    },
  },
  plugins: [],
}