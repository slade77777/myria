const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    'animate-slide-up',
    'animate-slide-down',
    'animate-slide-out',
    'animate-slide-down-and-fade',
    'animate-slide-up-and-fade',
    'animate-slide-right-and-fade',
    'animate-slide-left-and-fade',
    'animate-fade-in',
    'animate-fade-out'
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#F5B941',
        'brand-orange': '#ED8A33',
        'brand-deep-blue': '#081824',
        'brand-dark-blue': '#0F2F45',
        'brand-mid-blue': '#4B9CB9',
        'brand-light-blue': '#9AC9E3',
        'brand-white': '#FFFFFF',
        dark: '#050E15',
        light: '#97AAB5',
        'light-green': '#9ECEAB',
        'light-red': '#D55E5E',
        purple: '#8E74D3',
        green: '#41F59F',
        flat: '#A9A6B1'
      },
      maxWidth: {
        content: 1264
      },
      boxShadow: {
        'dark-panel': '0px 0px 40px 10px rgba(0, 0, 0, 0.3)'
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--height)' }
        },
        slideUp: {
          from: { height: 'var(--height)' },
          to: { height: 0 }
        },
        slideOut: {
          '0%': {
            backgroundPosition: '100%'
          },
          '100%': {
            backgroundPosition: '0%'
          }
        },
        cloud: {
          '0%': {
            opacity: 0,
            transform: 'scale(1)'
          },
          '25%, 75%': {
            opacity: 1
          },
          '100%': {
            opacity: 0,
            transform: 'scale(3)'
          }
        },
        slideUpAndFade: {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        slideDownAndFade: {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        slideRightAndFade: {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        slideLeftAndFade: {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      },
      animation: {
        'slide-up': 'slideUp 300ms',
        'slide-down': 'slideDown 300ms',
        'slide-out': 'slideOut 1.5s cubic-bezier(0.85,0,0.15,1) forwards',
        cloud: 'cloud calc(3s * var(--index)) linear infinite',
        'slide-up-and-fade': 'slideUpAndFade 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down-and-fade': 'slideDownAndFade 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right-and-fade': 'slideRightAndFade 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left-and-fade': 'slideLeftAndFade 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-out': 'fadeOut 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards'
      },
      boxShadow: {
        'dark-panel': '0px 0px 40px 10px rgba(0, 0, 0, 0.3)',
        'light-panel': '0px 0px 40px rgba(154, 201, 227, 0.4)'
      },
      backgroundImage: {
        hightlight: 'linear-gradient(135.49deg, #FFFFFF 22.84%, rgba(255, 255, 255, 0) 55.58%)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addComponents, theme, addVariant }) {
      addVariant('open', '&[data-state~="open"]');
      addVariant('parent-open', '[data-state~="open"] &');

      addComponents({
        '.aos-text-slide-right': {
          '--animated-color': theme('colors.brand-light-blue'),
          '--current-color': 'white',
          backgroundImage:
            'linear-gradient(to right, var(--animated-color) 50%, var(--current-color) 50% 100%)',
          backgroundSize: '200%',
          backgroundPosition: '100%',
          backgroundClip: 'text',
          '.aos-animate &': {
            color: 'transparent!important',
            animation: theme('animation.slide-out')
          }
        },
        '.collapse-content': {
          '--height': 'var(--radix-collapsible-content-height)',
          overflow: 'hidden',
          '&[data-state="open"]': {
            animation: theme('animation.slide-down')
          },
          '&[data-state="closed"]': {
            animation: theme('animation.slide-up')
          }
        },
        '.dialog-overlay': {
          backgroundColor: 'rgba(0, 0, 0, .65)',
          position: 'fixed',
          zIndex: 29,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          '&[data-state="open"]': {
            animation: theme('animation.fade-in')
          },
          '&[data-state="closed"]': {
            animation: theme('animation.fade-out')
          }
        },

        '.dialog-content': {
          position: 'fixed',
          zIndex: 30,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          maxHeight: '100vh',
          overflow: 'auto',
          padding: '50px 24px',
          '&:focus': {
            outline: 'none'
          },
          '&[data-state="open"]': {
            animation: theme('animation.fade-in')
          },
          '&[data-state="closed"]': {
            animation: theme('animation.fade-out')
          }
        },
        '.dropdown-content': {
          willChange: 'transform, opacity',
          '&[data-state="open"]': {
            '&[data-side="top"]': { animation: theme('animation.slide-down-and-fade') },
            '&[data-side="right"]': { animation: theme('animation.slide-left-and-fade') },
            '&[data-side="bottom"]': { animation: theme('animation.slide-up-and-fade') },
            '&[data-side="left"]': { animation: theme('animation.slide-right-and-fade') }
          }
        },
        '.tooltip-content': {
          background: theme('colors.brand-deep-blue'),
          color: theme('colors.light'),
          padding: 16,
          fontSize: 12,
          lineHeight: 1.5,
          borderRadius: 8,
          boxShadow: theme('boxShadow.dark-panel'),
          willChange: 'transform, opacity',
          '&[data-state="open"]': {
            '&[data-side="top"]': { animation: theme('animation.slide-down-and-fade') },
            '&[data-side="right"]': { animation: theme('animation.slide-left-and-fade') },
            '&[data-side="bottom"]': { animation: theme('animation.slide-up-and-fade') },
            '&[data-side="left"]': { animation: theme('animation.slide-right-and-fade') }
          }
        },
        '.heading-massive': {
          fontSize: 60,
          lineHeight: 1.15,
          fontWeight: 700
        },
        '.heading-lg': {
          fontSize: 40,
          lineHeight: 1.25,
          fontWeight: 700
        },
        '.heading-md': {
          fontSize: 32,
          lineHeight: 1.25,
          fontWeight: 700
        },
        '.heading-sm': {
          fontSize: 28,
          lineHeight: 1.3,
          fontWeight: 500
        },
        '.heading-list': {
          fontSize: 24,
          lineHeight: 1.5,
          fontWeight: 500
        },
        '.heading-sm-mobile': {
          fontSize: 18,
          lineHeight: 1.25,
          fontWeight: 500
        },
        '.body-lg': {
          fontSize: 24,
          lineHeight: 1.5
        },
        '.body': {
          fontSize: 20,
          lineHeight: 1.5
        },
        '.body-sm': {
          fontSize: 18,
          lineHeight: 1.5
        },
        '.caption': {
          fontSize: 14,
          lineHeight: 1.25,
          fontWeight: 800,
          textTransform: 'uppercase'
        },
        '.btn-lg': {
          padding: '16px 24px',
          borderRadius: '8px',
          fontSize: 16,
          lineHeight: 1,
          transition: '0.3s',
          fontWeight: 700,
          textTransform: 'uppercase',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.btn-sm': {
          padding: '7px 24px',
          borderRadius: '8px',
          fontSize: 14,
          lineHeight: 1.05,
          transition: '0.3s',
          fontWeight: 700,
          textTransform: 'uppercase',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.btn-icon': {
          padding: '9px 24px',
          borderRadius: '8px',
          fontSize: 16,
          lineHeight: 1,
          transition: '0.3s',
          fontWeight: 700,
          textTransform: 'uppercase',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.btn-icon-sm': {
          padding: '9px 24px',
          borderRadius: '8px',
          fontSize: 14,
          lineHeight: 1,
          transition: '0.3s',
          fontWeight: 700,
          textTransform: 'uppercase',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.btn-primary': {
          backgroundColor: theme('colors.brand-gold'),
          color: '#000',
          '&:hover': {
            backgroundColor: theme('colors.brand-orange')
          }
        },
        '.btn-secondary': {
          color: theme('colors.brand-gold'),
          border: '1px solid currentColor',
          '&:hover': {
            color: theme('colors.brand-orange')
          }
        },
        '.btn-white': {
          backgroundColor: theme('colors.brand-white'),
          color: '#000',
          '&:hover': {
            backgroundColor: '#ccc'
          }
        },
        '.btn-light-blue': {
          backgroundColor: theme('colors.brand-light-blue'),
          color: '#000',
          '&:hover': {
            backgroundColor: theme('colors.brand-mid-blue')
          }
        },
        '.btn-dark-blue': {
          backgroundColor: theme('colors.brand-deep-blue'),
          color: 'rgba(255, 255, 255, 0.5)',

          '&:hover, &.active': {
            backgroundColor: theme('colors.brand-dark-blue'),
            color: '#fff'
          }
        },
        '.link': {
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1,
          color: theme('colors.brand-gold'),
          textDecoration: 'underline',
          '&:hover': {
            color: theme('colors.brand-orange')
          }
        },
        '.input': {
          padding: '12px 16px',
          fontSize: 16,
          lineHeight: 1.5,
          color: theme('colors.light'),
          border: '1px solid currentColor',
          borderRadius: 8,
          outline: 'none',
          background: 'transparent',
          '&:focus': {
            color: '#fff',
            '&::placeholder': {
              color: '#fff'
            }
          }
        },
        '.switchRoot': {
          all: 'unset',
          width: 42,
          height: 25,
          backgroundColor: theme('colors.brand-deep-blue'),
          borderRadius: '9999px',
          position: 'relative',
          '&[data-state="checked"]': {
            backgroundColor: theme('colors.brand-gold')
          }
        },
        '.switchThumb': {
          display: 'block',
          width: 21,
          height: 21,
          backgroundColor: 'white',
          borderRadius: '9999px',
          transition: 'transform 100ms',
          transform: 'translateX(2px)',
          willChange: 'transform',
          '&[data-state="checked"]': { transform: 'translateX(19px)' }
        },
        '.sticky-header': {
          position: 'fixed',
          top: 0,
          left: 0,
          background: theme('colors.dark'),
          '&.w-full': {
            // hack fix for full width element when scrollbar is hiden
            width: 'calc(100% - var(--removed-body-scroll-bar-size, 0px))',
            marginRight: 'var(--removed-body-scroll-bar-size, 0px)'
          }
        },
        '.carousel-dots': {
          position: 'absolute',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '2',
          display: 'grid !important',
          gap: 25,
          gridAutoFlow: 'column',
          '& button': {
            background: 'rgba(154, 201, 227, 0.5)',
            width: 94,
            height: 7,
            fontSize: 0
          },
          '& .slick-active button': {
            background: '#9AC9E3'
          }
        },
        '.insignia-panel': {
          background: `linear-gradient(174.77deg, rgba(154, 201, 227, 0.05) 5.09%, rgba(154, 201, 227, 0) 47.22%), rgba(5, 15, 23, 0.9)`,
          boxShadow: theme('boxShadow.dark-panel'),
          borderRadius: 12,
          border: '1px solid rgba(154, 201, 227, 0.102)'
        }
      });
    })
  ]
};
