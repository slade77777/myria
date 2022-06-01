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
        flat: '#A9A6B1',
        'border-blue': '#5BA7D2',
        input: '#132533',
        blue: '#5BA7D2',
        'primary/1': '#181206',
        'primary/2': '#31250D',
        'primary/3': '#624A1A',
        'primary/4': '#936F27',
        'primary/5': '#C49434',
        'primary/6': '#F5B941',
        'primary/7': '#F7C767',
        'primary/8': '#F9D58D',
        'primary/9': '#FCEAC6',
        'primary/10': '#FEF8EC',
        'base/1': '#040B10',
        'base/2': '#050E15',
        'base/3': '#081824',
        'base/4': '#0B2231',
        'base/5': '#0F2D42',
        'base/6': '#0F2F45',
        'base/7': '#2B4C63',
        'base/8': '#5A7486',
        'base/9': '#A1AFBA',
        'base/10': '#E7EBEE',
        'blue/1': '#071012',
        'blue/2': '#0F1F25',
        'blue/3': '#1F282D',
        'blue/4': '#5C7988',
        'blue/5': '#8BB5CC',
        'blue/6': '#9AC9E3',
        'blue/7': '#A4CEE6',
        'blue/8': '#B8D9EB',
        'blue/9': '#D7E9F4',
        'blue/10': '#F5FAFC',
        'teal/1': '#021312',
        'teal/2': '#042723',
        'teal/3': '#084D47',
        'teal/4': '#0B746A',
        'teal/5': '#0F9A8E',
        'teal/6': '#13C1B1',
        'teal/7': '#42CDC1',
        'teal/8': '#5AD4C8',
        'teal/9': '#B8ECE8',
        'teal/10': '#E7F9F7',
        'purple/1': '#100712',
        'purple/2': '#1F0F25',
        'purple/3': '#3E1E4A',
        'purple/4': '#5E2D6F',
        'purple/5': '#7D3C94',
        'purple/6': '#9C4BB9',
        'purple/7': '#B06FC7',
        'purple/8': '#D191E1',
        'purple/9': '#E1C9EA',
        'purple/10': '#F5EDF8',
        'error/1': '#180B0B',
        'error/2': '#311717',
        'error/3': '#492222',
        'error/4': '#924444',
        'error/5': '#C25B5B',
        'error/6': '#F37272',
        'error/7': '#F58E8E',
        'error/8': '#F9B9B9',
        'error/9': '#FBD5D5',
        'error/10': '#FEF1F1',
        'success/1': '#041108',
        'success/2': '#0D3218',
        'success/3': '#175328',
        'success/4': '#1B642F',
        'success/5': '#24853F',
        'success/6': '#2DA64F',
        'success/7': '#57B872',
        'success/8': '#81CA95',
        'success/9': '#C0E4CA',
        'success/10': '#EAF6ED',
        'warning/1': '#18160E',
        'warning/2': '#494229',
        'warning/3': '#796E45',
        'warning/4': '#918453',
        'warning/5': '#C2B06E',
        'warning/6': '#F2DC8A',
        'warning/7': '#F5E3A1',
        'warning/8': '#F9EEC5',
        'warning/9': '#FBF5DC',
        'warning/10': '#FEFCF3',
        'gray/1': '#111827',
        'gray/2': '#1F2937',
        'gray/3': '#374151',
        'gray/4': '#4B5563',
        'gray/5': '#6B7280',
        'gray/6': '#9CA3AF',
        'gray/7': '#D1D5DB',
        'gray/8': '#E5E7EB',
        'gray/9': '#F3F4F6',
        'gray/10': '#F9FAFB'
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
        },
        float: {
          '0%': {
            transform: 'translatey(0px)'
          },
          '50%': {
            transform: 'translatey(-20px)'
          },
          '100%': {
            transform: 'translatey(0px)'
          }
        },
        starUp: {
          '0%': {
            transform: 'translateY(0px)',
            opacity: 0
          },
          '30%': {
            opacity: 1
          },
          '100%': {
            transform: 'translateY(-50px)',
            opacity: 0
          }
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
        'fade-out': 'fadeOut 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite;',
        starUp: 'starUp 6s ease-in-out infinite'
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
          top: 60,
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
        '.btn-md': {
          padding: '12px 24px',
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
          borderColor: '#000',
          color: '#000',
          '&:hover': {
            backgroundColor: theme('colors.brand-orange')
          }
        },
        '.btn-secondary': {
          color: theme('colors.brand-gold'),
          borderColor: theme('colors.brand-gold'),
          border: '1px solid currentColor',
          '&:hover': {
            color: theme('colors.brand-orange')
          }
        },
        '.btn-white': {
          backgroundColor: theme('colors.brand-white'),
          color: '#000',
          borderColor: '#000',
          '&:hover': {
            backgroundColor: '#ccc'
          }
        },
        '.btn-light-blue': {
          backgroundColor: theme('colors.brand-light-blue'),
          color: '#000',
          borderColor: '#000',
          '&:hover': {
            backgroundColor: theme('colors.brand-mid-blue')
          }
        },
        '.btn-dark-blue': {
          backgroundColor: theme('colors.brand-deep-blue'),
          color: 'rgba(255, 255, 255, 0.5)',
          borderColor: 'rgba(255, 255, 255, 0.5)',

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
        '.sigil-panel': {
          background: `linear-gradient(174.77deg, rgba(154, 201, 227, 0.05) 5.09%, rgba(154, 201, 227, 0) 47.22%), rgba(5, 15, 23, 0.9)`,
          boxShadow: theme('boxShadow.dark-panel'),
          borderRadius: 12,
          border: '1px solid rgba(154, 201, 227, 0.102)'
        },
        '.sigil-text': {
          textShadow: '0px 0px 10px rgba(154, 201, 227, 0.5)'
        },
        '.sigil-btn-mission': {
          borderRadius: 4,
          color: '#9ECEAB',
          background: `linear-gradient(-45deg, transparent 6px, #9ECEAB 0) right,
          linear-gradient(135deg, transparent 6px, #9ECEAB 0) left`,
          backgroundSize: `50% 100%`,
          backgroundRepeat: `no-repeat`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          width: `202px`,
          height: `48px`,
          '&:hover': {
            filter: `drop-shadow(0 0px 5px rgba(158, 206, 171, 0.5))`
          },
          '.label': {
            position: `relative`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            width: `calc(100% - 2px)`,
            height: `calc(100% - 2px)`,
            background: `linear-gradient(-45deg, transparent 6px,#081824 0) right,
            linear-gradient(135deg, transparent 6px, #081824 0) left`,
            borderRadius: 4,
            clipPath: `polygon(
              0 8px,
              8px 0,
              100% 0,
              100% calc(100% - 8px),
              calc(100% - 8px) 100%,
              0 100%
            )`,
            '.mask': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: 4,
              width: '100%',
              height: '100%',
              background: `linear-gradient(180deg, rgba(158, 206, 171, 0.2) 0%, rgba(158, 206, 171, 0) 100%)`
            }
          }
        },
        '.sigil-btn-mission-locked': {
          background: `linear-gradient(180deg, rgba(213, 94, 94, 0.2) 0%, rgba(213, 94, 94, 0) 100%)`,
          borderRadius: 4,
          position: 'relative',
          border: '1px solid #D55E5E',
          color: '#D55E5E',
          '&::before': {
            position: `absolute`,
            left: `-5px`,
            top: `-6px`,
            content: "'' !important",
            width: '11px',
            height: '13px',
            borderRight: `1px solid #D55E5E`,
            transform: `rotate(45deg)`,
            backgroundColor: `${theme('colors.brand-deep-blue')}`
          },
          '&::after': {
            position: `absolute`,
            right: `-5px`,
            bottom: `-6px`,
            content: "'' !important",
            width: '11px',
            height: '13px',
            transform: `rotate(45deg)`,
            backgroundColor: `${theme('colors.brand-deep-blue')}`,
            borderLeft: `1px solid #D55E5E`
          }
        },
        '.sigil-btn-mission-disable': {
          background: `linear-gradient(180deg, rgba(172, 172, 172, 0.2) 0%, rgba(172, 172, 172, 0) 100%)`,
          borderRadius: 4,
          position: 'relative',
          border: '1px solid #ACACAC',
          color: '#ACACAC',
          '&::before': {
            position: `absolute`,
            left: `-5px`,
            top: `-6px`,
            content: "'' !important",
            width: '11px',
            height: '13px',
            borderRight: `1px solid #ACACAC`,
            transform: `rotate(45deg)`,
            backgroundColor: `${theme('colors.brand-deep-blue')}`
          },
          '&::after': {
            position: `absolute`,
            right: `-5px`,
            bottom: `-6px`,
            content: "'' !important",
            width: '11px',
            height: '13px',
            transform: `rotate(45deg)`,
            backgroundColor: `${theme('colors.brand-deep-blue')}`,
            borderLeft: `1px solid #ACACAC`
          }
        },
        '.h1': {
          fontSize: '60px',
          lineHeight: 1,
          fontWeight: 800
        },
        '.h2': {
          fontSize: 48,
          lineHeight: 1.25,
          fontWeight: 700
        },
        '.h3': {
          fontSize: 40,
          lineHeight: 1.5,
          fontWeight: 700
        },
        '.h4': {
          fontSize: 32,
          lineHeight: 1.47,
          fontWeight: 500
        },
        '.h5': {
          fontSize: 28,
          lineHeight: 1.5,
          fontWeight: 500
        },
        '.h6': {
          fontSize: 24,
          lineHeight: 1.33,
          fontWeight: 700
        },
        '.body-36-medium': {
          fontSize: 36,
          lineHeight: 1.31,
          fontWeight: 500
        },
        '.body-36-regular': {
          fontSize: 36,
          lineHeight: 1.11,
          fontWeight: 400
        },
        '.body-32-medium': {
          fontSize: 32,
          lineHeight: 1.31,
          fontWeight: 500
        },
        '.body-32-regular': {
          fontSize: 32,
          lineHeight: 1.31,
          fontWeight: 400
        },
        '.body-28-medium': {
          fontSize: 28,
          lineHeight: 1.43,
          fontWeight: 500
        },
        '.body-28-regular': {
          fontSize: 28,
          lineHeight: 1.43,
          fontWeight: 400
        },
        '.body-24-medium': {
          fontSize: 24,
          lineHeight: 1.17,
          fontWeight: 500
        },
        '.body-24-regular': {
          fontSize: 24,
          lineHeight: 1.17,
          fontWeight: 400
        },
        '.body-24-medium': {
          fontSize: 24,
          lineHeight: 1.17,
          fontWeight: 500
        },
        '.body-24-regular': {
          fontSize: 24,
          lineHeight: 1.17,
          fontWeight: 400
        },
        '.body-20-semibold': {
          fontSize: 20,
          lineHeight: 1.3,
          fontWeight: 600
        },
        '.body-20-medium': {
          fontSize: 20,
          lineHeight: 1.3,
          fontWeight: 500
        },
        '.body-20-regular': {
          fontSize: 20,
          lineHeight: 1.3,
          fontWeight: 400
        },
        '.body-18-bold': {
          fontSize: 18,
          lineHeight: 1.33,
          fontWeight: 700
        },
        '.body-18-medium': {
          fontSize: 18,
          lineHeight: 1.33,
          fontWeight: 500
        },
        '.body-18-regular': {
          fontSize: 18,
          lineHeight: 1.33,
          fontWeight: 400
        },
        '.body-16-bold': {
          fontSize: 16,
          lineHeight: 1.44,
          fontWeight: 700
        },
        '.body-16-medium': {
          fontSize: 16,
          lineHeight: 1.44,
          fontWeight: 500
        },
        '.body-16-regular': {
          fontSize: 16,
          lineHeight: 1.44,
          fontWeight: 400
        },
        '.body-14-bold': {
          fontSize: 14,
          lineHeight: 1.57,
          fontWeight: 700
        },
        '.body-14-medium': {
          fontSize: 14,
          lineHeight: 1.57,
          fontWeight: 500
        },
        '.body-14-regular': {
          fontSize: 14,
          lineHeight: 1.57,
          fontWeight: 400
        },
        '.body-12-medium': {
          fontSize: 12,
          lineHeight: 1.17,
          fontWeight: 500
        },
        '.body-12-regular': {
          fontSize: 12,
          lineHeight: 1.17,
          fontWeight: 400
        },
        '.caption-small': {
          fontSize: 10,
          lineHeight: 1.4,
          fontWeight: 400
        },
        '.caption-medium': {
          fontSize: 14,
          lineHeight: 1.5,
          fontWeight: 700
        },
        '.caption-default': {
          fontSize: 12,
          lineHeight: 1.5,
          fontWeight: 700
        },
        '.caption-overline-small': {
          fontSize: 10,
          lineHeight: 1.2,
          fontWeight: 600
        },
        '.caption-overline-default': {
          fontSize: 12,
          lineHeight: 1.5,
          fontWeight: 600
        }
      });
    })
  ]
};
