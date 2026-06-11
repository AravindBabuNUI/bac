/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './apps/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        // Input micro-interactions
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-5px)' },
          '40%': { transform: 'translateX(5px)' },
          '60%': { transform: 'translateX(-3px)' },
          '80%': { transform: 'translateX(3px)' },
        },
        'input-focus': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.012)' },
          '100%': { transform: 'scale(1)' },
        },
        // Step / content transitions
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'step-slide-in': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        // Success page entrance
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '60%': { opacity: '1', transform: 'scale(1.05)' },
          '80%': { transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        shake: 'shake 0.45s ease-in-out',
        'input-focus': 'input-focus 0.25s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'step-slide-in': 'step-slide-in 0.5s ease-out',
        'bounce-in': 'bounce-in 0.5s ease-out',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#104E8B',
          button: '#2F69B3',
        },
        secondary: {
          DEFAULT: '#FF7F24',
        },
        muted: '#515151',
        input: '#2C2C37',
        linen: '#FAF0E6',
        progress: {
          active: '#639A67',
          inactive: '#D6C7B7',
        },
        disclaimer: '#666666',
        error: '#ef4444',
        header: '#1874CD',
      },
    },
  },
  plugins: [],
}
