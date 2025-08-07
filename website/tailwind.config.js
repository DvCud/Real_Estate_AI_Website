/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      },
    },
  },
  plugins: [],
};
