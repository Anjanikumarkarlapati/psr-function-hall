import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './styles/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a84c',
          light: '#d4aa4c',
          bright: '#e8c870',
        },
        dark: {
          DEFAULT: '#0a0908',
          card: '#111110',
          surface: '#161514',
        },
        silver: '#a8a5a0',
        cream: '#f5f0e8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        montserrat: ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
