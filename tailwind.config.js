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
      },
      boxShadow: {
        'large': 'inset 0px 0px 500px rgba(0,0,0,1)'
      }
    },
    screens: {
      'mobile': {'max': '739px'},
      'tablet': {'min': '740px', 'max': '1023px'},
      'desktop': {'min': '1024px'}
    }
  },
  plugins: [],
}