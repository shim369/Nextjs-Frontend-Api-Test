/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'message-image': "url('/message.jpg')",
      }),
      boxSizing: ['border-box'],
      margin: ['0'],
      padding: ['0'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

