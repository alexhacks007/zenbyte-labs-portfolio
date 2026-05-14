import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import Magnetic from './Magnetic'

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#projects' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' }
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    // Center-Line Intersection Observer: Ensures only the section at the viewport center is active
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, {
      rootMargin: '-50% 0px -50% 0px', // Trigger at the exact horizontal center line
      threshold: 0
    })

    const sections = ['home', 'services', 'projects', 'pricing', 'process', 'contact']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const resetAtTop = () => {
      if (window.scrollY < 100) setActiveSection('home')
    }
    window.addEventListener('scroll', resetAtTop)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', resetAtTop)
      observer.disconnect()
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
      isScrolled ? 'py-4 md:py-6' : 'py-8 md:py-12'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <Magnetic>
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-black font-black italic shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
              Z
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter text-main">ZenByte<span className="text-primary">Labs</span></span>
              <span className="text-[8px] font-mono tracking-[0.4em] opacity-30 uppercase">Precision_OS</span>
            </div>
          </a>
        </Magnetic>

        <div className="hidden lg:flex items-center gap-6">
          <div className="glass px-2 py-2 rounded-full flex items-center relative overflow-hidden">
            {/* Technical Sweep Animation */}
            <motion.div 
               animate={{ x: ['100%', '-100%'] }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-[30deg]"
            />

            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              
              return (
                <Magnetic key={link.name}>
                  <a 
                    href={link.href} 
                    className={`relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 z-10 ${
                      isActive ? 'text-black' : 'text-muted hover:text-main'
                    } ${sectionId === 'contact' ? 'ml-4' : ''}`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary rounded-full z-0 shadow-lg shadow-primary/40"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {sectionId === 'contact' && !isActive && (
                      <div className="absolute inset-0 border border-primary/20 rounded-full -z-10" />
                    )}
                  </a>
                </Magnetic>
              )
            })}
          </div>
          
          <div className="flex items-center gap-4 border-l border-glass-border pl-6">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="lg:hidden glass w-12 h-12 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <motion.div 
            animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-main" 
          />
          <motion.div 
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-0.5 bg-main" 
          />
          <motion.div 
            animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-main" 
          />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[110%] left-6 right-6 glass p-8 rounded-[2rem] lg:hidden flex flex-col gap-6 items-center shadow-2xl"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = activeSection === sectionId
              return (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`text-lg font-black uppercase tracking-[0.3em] transition-colors italic ${
                    isActive ? 'text-primary' : 'text-main hover:text-primary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            })}
            <div className="h-px w-full bg-glass-border my-2" />
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center py-4">Start Project</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
