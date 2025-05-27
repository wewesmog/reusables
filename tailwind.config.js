const { hairlineWidth } = require('nativewind/theme');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        fredoka: ['Fredoka', ...fontFamily.sans],
        'fredoka-light': ['Fredoka-Light', ...fontFamily.sans],
        'fredoka-regular': ['Fredoka-Regular', ...fontFamily.sans],
        'fredoka-medium': ['Fredoka-Medium', ...fontFamily.sans],
        'fredoka-semibold': ['Fredoka-SemiBold', ...fontFamily.sans],
        'fredoka-bold': ['Fredoka-Bold', ...fontFamily.sans],
        comic: ['ComicNeue-Regular', ...fontFamily.sans],
        'comic-light': ['ComicNeue-Light', ...fontFamily.sans],
        'comic-bold': ['ComicNeue-Bold', ...fontFamily.sans],
        'comic-italic': ['ComicNeue-Italic', ...fontFamily.sans],
        'comic-bold-italic': ['ComicNeue-BoldItalic', ...fontFamily.sans],
        'comic-light-italic': ['ComicNeue-LightItalic', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
