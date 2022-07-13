module.exports = {
  mode: 'jit',
  purge: [
    './public/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './src/**/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'c-black': '#071512',
        'c-background': '#081824',
        'c-sidebar': '#081824',
        primary6: '#F5B941',
        base7: '#2B4C63',
        base8: '#5A7486',
        base9: '#A1AFBA',
        gray1: '#979797',
        'light-blue': '#9AC9E3',
      },
      boxShadow: {
        popover: '0px 0px 40px 10px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        animation: {
          'spin-slow': 'spin 3s linear infinite',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
