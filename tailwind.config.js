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
        primary: "rgb(var(--color-primary-rgb) / <alpha-value>)", // Theme primary with opacity support
        secondary: "rgb(var(--color-secondary-rgb) / <alpha-value>)", // Theme secondary with opacity support
        accent: "rgb(var(--color-accent-rgb) / <alpha-value>)", // Theme accent with opacity support
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
          '0%': { boxShadow: '0 0 5px rgba(15, 164, 175, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(15, 164, 175, 0.6)' },
        }
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        'gradient-surface': 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)',
        'hero-mesh': 'radial-gradient(at 0% 0%, var(--color-primary) 0, transparent 50%), radial-gradient(at 50% 0%, var(--color-secondary) 0, transparent 50%)',
      }
    },
  },
  plugins: [],
}
