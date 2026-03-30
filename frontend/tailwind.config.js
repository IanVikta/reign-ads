/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        reignBlack: '#111111',
        reignGold: '#D4AF37',
        reignBlue: '#1E3A8A', // Deep blue
        reignLightBlue: '#3B82F6', // Lighter blue for accents
        reignOrange: '#FF8C00',
        reignWhite: '#FFFFFF',
        charcoal: '#333333',
        // Official Brand Colors from Brand Guidelines PDF
        brandBlue: '#0220aa',   // Royal Azure – primary (65%)
        brandGold: '#ffd22a',   // Golden Dream – accent (35%)
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
        display: ['Montserrat', 'Outfit', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(to right, #D4AF37, #FFD700, #D4AF37)',
        'gradient-blue-gold': 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #D4AF37 100%)',
        'gradient-gold-blue': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #3B82F6 100%)',
      },
    },
  },
  plugins: [],
}
