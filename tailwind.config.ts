import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f2ed',
        foreground: '#1a1a1a',
        muted: '#8c8c8c',
        border: '#e5e0d8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        content: '1400px',
      },
      spacing: {
        section: '6rem',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
};

export default config;
