/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paper / ink editorial palette. AA-tested for body & links:
        //   ink-900 (#161513) on paper-50 (#f7f4ed) = 14.7:1
        //   ink-700 (#3a352e) on paper-50            =  9.7:1
        //   accent-700 (#0d4f4a) on paper-50         =  7.9:1 (AA normal & large)
        paper: {
          50:  '#f7f4ed',
          100: '#efeadd',
          200: '#e3dac4',
          300: '#cfc3a5',
        },
        ink: {
          400: '#7a7368',
          500: '#5a5347',
          700: '#3a352e',
          800: '#23201b',
          900: '#161513',
        },
        accent: {
          50:  '#e9f3f1',
          100: '#cfe4e0',
          500: '#0f6760',
          600: '#0e5b54',
          700: '#0d4f4a',
          800: '#0a3f3a',
        },
        rust: {
          500: '#a14a2a',
          700: '#7a3520',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', '"Source Serif Pro"', 'Charter', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        display: ['"Playfair Display"', 'Charter', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        prose: '38rem',     // ~608px — body text reading column
        essay: '45rem',     // ~720px — generous editorial width incl. callouts
        wide:  '72rem',
      },
    },
  },
  plugins: [],
};
