/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        petroleum: {
          50:  '#e6f4f4',
          100: '#c0e0e0',
          200: '#8ec3c3',
          300: '#5aa6a6',
          400: '#2f9090',
          500: '#0B4F4F',
          600: '#063B3B',
          700: '#052E2E',
          800: '#031f1f',
          900: '#011212',
        },
        gold: {
          300: '#fcd97a',
          400: '#f9c840',
          500: '#F5B21B',
          600: '#d4940a',
          700: '#a87208',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'petroleum-gradient': 'linear-gradient(135deg, #031f1f 0%, #063B3B 40%, #0A4A4A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5B21B 0%, #fcd97a 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(11,79,79,0.6) 0%, rgba(6,59,59,0.4) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(245,178,27,0.2)',
        'gold-lg': '0 0 60px rgba(245,178,27,0.25)',
        'petroleum': '0 0 40px rgba(6,59,59,0.5)',
        'card': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
