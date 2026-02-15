import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'
import typographyUtilities from './tailwind.typography.mjs'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography, typographyUtilities],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    // Block padding classes (responsive spacing tokens)
    'pt-3xs', 'pt-2xs', 'pt-xs', 'pt-sm', 'pt-md', 'pt-lg', 'pt-xl', 'pt-2xl',
    'pb-3xs', 'pb-2xs', 'pb-xs', 'pb-sm', 'pb-md', 'pb-lg', 'pb-xl', 'pb-2xl',
    // Background position classes
    'bg-center',
    'bg-top',
    'bg-bottom',
    'bg-left',
    'bg-right',
    'bg-cover',
    'bg-no-repeat',
    // Background color classes
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-muted',
    'bg-card',
    'bg-background',
    // Foreground color classes
    'text-primary-foreground',
    'text-secondary-foreground',
    'text-accent-foreground',
    'text-muted-foreground',
    'text-card-foreground',
    'text-foreground',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee var(--marquee-duration, 30s) linear infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        brand: {
          black: '#1E1A15',
          'off-white': '#FAF7F5',
          'gray-light': '#d1d5db',
          gray: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mix: ['var(--font-mix)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      spacing: {
        '2xl': 'var(--spacing-2xl)',
        'xl': 'var(--spacing-xl)',
        'lg': 'var(--spacing-lg)',
        'md': 'var(--spacing-md)',
        'sm': 'var(--spacing-sm)',
        'xs': 'var(--spacing-xs)',
        '2xs': 'var(--spacing-2xs)',
        '3xs': 'var(--spacing-3xs)',
      },
    },
  },
}

export default config
