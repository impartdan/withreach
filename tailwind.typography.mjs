const plugin = require('tailwindcss/plugin')

const seasonMix = 'Season Mix, sans-serif'
const seasonSans = 'Season Sans, sans-serif'

module.exports = plugin(function ({ addUtilities }) {
  addUtilities(
    {
      '.type-display-hero-a': {
        'font-size': '64px',
        'line-height': '0.9',
        'letter-spacing': '-0.03em',
        'font-family': seasonMix,
        'font-weight': 'normal',
        '@screen md': {
          'font-size': '80px',
        },
        '@screen lg': {
          'font-size': '96px',
        },
      },
      '.type-display-hero-b': {
        'font-size': '64px',
        'line-height': '0.9',
        'letter-spacing': '-0.03em',
        'font-family': seasonSans,
        'font-weight': '300',
        '@screen md': {
          'font-size': '80px',
        },
        '@screen lg': {
          'font-size': '96px',
        },
      },
      '.type-display-xl': {
        'font-size': '72px',
        'line-height': '1.1',
        'letter-spacing': '-0.02em',
        'font-weight': '400',
        'font-family': seasonMix,
      },
      '.type-display-lg': {
        'font-size': '40px',
        'line-height': '1.1',
        'letter-spacing': '-0.02em',
        'font-family': seasonMix,
        'font-weight': 'normal',
        '@screen md': {
          'font-size': '56px',
        },
      },
      '.type-display-md': {
        'font-size': '32px',
        'line-height': '1.1',
        'font-family': seasonSans,
        'font-weight': 'normal',
        '@screen md': {
          'font-size': '40px',
        },
      },
      '.type-display-sm': {
        'font-size': '28px',
        'line-height': '1.2',
        'letter-spacing': '-0.02em',
        'font-family': seasonMix,
        'font-weight': 'normal',
        '@screen md': {
          'font-size': '32px',
        },
      },
      '.type-display-xs': {
        'font-size': '20px',
        'line-height': '1.3',
        'font-weight': '500',
        'font-family': seasonSans,
        '@screen md': {
          'font-size': '24px',
        },
      },
      '.type-intro': {
        'font-size': '20px',
        'line-height': '1.3',
        'font-weight': 'bold',
        'font-family': seasonSans,
        '@screen md': {
          'font-size': '22px',
        },
      },
      '.type-micro': {
        'font-size': '16px',
        'line-height': '1.3',
        'font-weight': 'regular',
        'font-family': seasonSans,
        '@screen lg': {
          'line-height': '1.4',
        },
      },
      '.type-micro-b': {
        'font-size': '16px',
        'line-height': '1.3',
        'font-weight': '500',
        'font-family': seasonSans,
      },
      '.type-body': {
        'font-size': '16px',
        'line-height': '1.3',
        'font-weight': '500',
        'font-family': seasonSans,
        '@screen lg': {
          'font-size': '18px',
        },
      },
      '.type-button': {
        'font-size': '16px',
        'line-height': '1.3',
        'font-weight': '600',
        'font-family': seasonSans,
      },
      '.type-eyebrow': {
        'font-size': '18px',
        'line-height': '1.2',
        'font-weight': '600',
        'font-family': seasonSans,
      },
    },
    { variants: ['responsive'] },
  )
})
