/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        display: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        navy: {
          950: '#050d1a',
          900: '#080f1f',
          800: '#0d1a30',
          700: '#132240',  // was missing — used in progress bars
          600: '#1a2d52',
          500: '#243d6b',
        },
        gold: {
          50:  '#fffbeb',  // was missing — used in hover states, light bg
          100: '#fef3c7',  // was missing — used in active states, icon bg
          200: '#fde68a',  // was missing — used in borders
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',  // was missing — used in text
        },
      },
      animation: {
        'fade-in':        'fadeIn 0.4s ease-out forwards',
        'slide-up':       'slideUp 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'pulse-gold':     'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(251, 191, 36, 0.3)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(251, 191, 36, 0)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        'card-gradient': 'linear-gradient(145deg, rgba(19,34,64,0.8), rgba(8,15,31,0.9))',
      },
    },
  },
  plugins: [],
}
