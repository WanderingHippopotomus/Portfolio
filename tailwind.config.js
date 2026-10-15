/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1F2347',
        paper: '#F4F5FC',
        peri: '#6C7BFF',
        mint: '#C9F0E2',
        blush: '#FFD9E0',
        butter: '#FFF0B8',
        sky: '#D6E4FF',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wordIn: {
          '0%': { transform: 'translateY(108%) rotate(4deg)' },
          '100%': { transform: 'translateY(0) rotate(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        hop: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '45%': { transform: 'translateY(-32%) scale(1.18) rotate(-6deg)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
        dot: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        wordIn: 'wordIn 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        marquee: 'marquee 45s linear infinite',
        hop: 'hop 0.42s ease-in-out',
        dot: 'dot 1.1s ease-in-out infinite',
        pop: 'pop 0.25s ease-out both',
      },
    },
  },
  plugins: [],
}
