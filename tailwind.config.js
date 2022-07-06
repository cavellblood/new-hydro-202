const defaultTheme = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
  return ({opacityValue}) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',

        black: '#000000',
        'near-black': '#1D1D1C',
        'grey-darkest': '#282827',
        'grey-darker': '#504F4D',
        'grey-dark': '#797774',
        grey: '#868481',
        'grey-light': '#AAA9A7',
        'grey-lighter': '#CFCECD',
        'grey-lightest': '#EFEFEF',
        'near-white': '#F3F3F2',

        'white-warm': {
          DEFAULT: '#fcfbfa',
          50: '#fcfbfa',
          100: '#f5f2ef',
          200: '#e8e7e6',
          300: '#dedddc',
          400: '#d4d3d2',
          500: '#cac9c8',
          600: '#c0bfbe',
          700: '#b6b5b4',
          800: '#acabaa',
          900: '#a2a1a0',
        },

        text: '#4a6986',
        flameweeder: '#0c2367',

        'primary-darkest': '#0E390A',
        'primary-darker': '#1C7114',
        'primary-dark': '#2AAA1E',
        primary: '#2FBD21',
        'primary-light': '#6DD164',
        'primary-lighter': '#ACE5A6',
        'primary-lightest': '#EAF8E9',

        brand: {
          50: '#61ef53',
          100: '#57e549',
          200: '#4ddb3f',
          300: '#43d135',
          400: '#39c72b',
          500: '#2fbd21',
          600: '#25b317',
          700: '#1ba90d',
          800: '#119f03',
          900: '#079500',
        },
      },
      screens: {
        lap: '736px',
        'hands-wide': '960px',
        'lap-wide': '1068px',
        desk: '1440px',
        wall: '2560px',
      },
      animation: {
        'banner-drop': 'banner-drop .8s ease-in-out forwards',
        'background-banner':
          'animate-background-banner 1s ease-in-out 1.8s forwards',
      },
      keyframes: {
        'banner-drop': {
          '0%': {transform: 'translateY(-100%)'},
          to: {transform: 'translateY(0)'},
        },
        'animate-background-banner': {
          '0%': {
            'background-color': 'var(--ribbon-background-color-initial)',
          },
          to: {'background-color': 'var(--ribbon-background-color)'},
        },
      },
      boxShadow: {
        default: '0 2px 4px 0 rgba(0,0,0,0.10)',
        soft: '0 5px 20px 0 rgba(0, 0, 0, 0.05)',
        'soft-v2': '0 9px 35px -5px rgba(0, 0, 0, 0.07)',
        medium: '0 5px 30px 0 rgba(0, 0, 0, 0.2)',
        sides:
          '18px 0px 18px -18px rgba(0, 0, 0, 0.1), -18px 0px 18px -18px rgba(0, 0, 0, 0.1)',
        'sides-dark':
          '18px 0px 18px -18px rgba(0, 0, 0, 0.8), -18px 0px 18px -18px rgba(0, 0, 0, 0.8)',
        'soft-light-bg': '0px 0px 36px 18px rgba(252,251,250,1)',
        image:
          '0 15px 35px rgba(50, 95, 75, .1), 0 5px 15px rgba(0, 0, 0, 0.07)',
        md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
        lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
        'inner-top-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.4)',
        'dark-bg': '0 4px 10px 0 rgba(0, 0, 0, 0.99)',
        'dark-bg-xl': '0 4px 32px 0 rgba(0, 0, 0, 0.99)',
        outline: '0 0 0 3px rgba(99, 186, 71, .3)',
        none: 'none',
      },
      fontFamily: {
        sans: ['proxima-nova', ...defaultTheme.fontFamily.sans],
        cursive: ['Mr Dafoe', 'cursive'],
      },
      maxWidth: (theme) => ({
        '1/2': '50%',
        '1/3': '33.33333%',
        '2/3': '66.66667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.66667%',
        '5/6': '83.33333%',
        ...theme('screens'),
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            hr: {
              borderColor: theme('colors.gray.200'),
              borderTopWidth: '1px',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            'ol > li::before': {
              color: theme('colors.gray.900'),
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
  },
  // eslint-disable-next-line node/no-unpublished-require
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
