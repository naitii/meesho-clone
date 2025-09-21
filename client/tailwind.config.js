/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'meesho-pink': '#9F2089',
        'meesho-pink-light': '#E4007C',
        'meesho-dark': '#1A1A1A',
        'meesho-gray': '#F8F8F8',
        'meesho-light-gray': '#F5F5F5',
        'meesho-red': '#F43397',
        'meesho-orange': '#FF6B35',
        'meesho-blue': '#3B82F6',
        'meesho-green': '#10B981',
      },
      fontFamily: {
        'sans': ['Inter', 'Arial', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['11px', '16px'],
        'sm': ['13px', '18px'],
        'base': ['14px', '20px'],
        'lg': ['16px', '24px'],
        'xl': ['18px', '28px'],
        '2xl': ['20px', '32px'],
        '3xl': ['24px', '36px'],
        '4xl': ['28px', '40px'],
        '5xl': ['36px', '48px'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'meesho': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'meesho-lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}
