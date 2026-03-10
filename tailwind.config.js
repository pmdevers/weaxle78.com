/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gaming: {
          dark: '#0e0e0e', // Very dark grey/black
          card: '#161616', // Slightly lighter grey for cards
          primary: '#e31e24', // Red (from screenshot)
          secondary: '#333333', // Muted dark
          accent: '#ffffff', // White
        }
      },
      backgroundImage: {
        'gaming-gradient': 'linear-gradient(180deg, rgba(14, 14, 14, 0.8) 0%, #0e0e0e 100%)',
      },
      fontFamily: {
        gaming: ['Rajdhani', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
