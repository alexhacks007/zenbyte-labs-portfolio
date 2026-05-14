/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#00FFD1", // Vivid Neon Mint
        secondary: "#8B5CF6", // Electric Violet
        accent: "#F472B6", // Soft Pink accent
        dark: "#000000", // Pure Deep Black
        "dark-surface": "#0A0A0A", // Slightly lighter black surface
        "glass-border": "var(--glass-border)",
        surface: "var(--bg-surface)",
        main: "var(--text-main)",
        muted: "var(--text-muted)",
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 245, 212, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 245, 212, 0.6)' },
        }
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #00FFD1 0%, #8B5CF6 100%)',
        'gradient-surface': 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)',
        'hero-mesh': 'radial-gradient(at 0% 0%, rgba(0, 255, 209, 0.1) 0, transparent 50%), radial-gradient(at 50% 0%, rgba(139, 92, 246, 0.1) 0, transparent 50%)',
      }
    },
  },
  plugins: [],
}
