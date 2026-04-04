/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        fintech: {
          dark: '#0B1026',
          darker: '#111827',
          teal: '#0EA5A4',
          accent: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          lightBg: '#F8FAFC',
          lightSoft: '#EEF2FF',
          indigo: '#4F46E5',
          sky: '#0EA5E9',
          emerald: '#10B981',
        }
      }
    },
  },
  plugins: [],
}
