import type { Config } from 'tailwindcss';

export default {
  content: [
    './client/index.html',
    './client/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#4c1d95',
      },
    },
  },
  plugins: [],
} satisfies Config;
