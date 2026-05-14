import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-white/5 border border-glass-border flex items-center px-1 transition-colors duration-500 hover:border-primary/50"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: theme === 'dark' ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full bg-gradient-neon flex items-center justify-center shadow-lg"
      >
        {theme === 'dark' ? (
          <Moon size={12} className="text-black" />
        ) : (
          <Sun size={12} className="text-black" />
        )}
      </motion.div>
    </button>
  )
}

export default ThemeToggle
