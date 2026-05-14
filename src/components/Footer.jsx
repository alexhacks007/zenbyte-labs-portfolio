import React from 'react'

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-glass-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-gradient-neon flex items-center justify-center text-dark text-lg font-black italic">Z</span>
            <span className="text-main">ZenByte<span className="text-primary">Labs</span></span>
          </a>
          <p className="text-muted text-xs tracking-widest uppercase">Precision Digital Engineering © 2026</p>
        </div>

        <div className="flex gap-12 text-sm text-muted">
          <div className="flex flex-col gap-2">
            <span className="text-main font-bold mb-2">Platform</span>
            <a href="#services" className="hover:text-primary">Services</a>
            <a href="#projects" className="hover:text-primary">Projects</a>
            <a href="#process" className="hover:text-primary">Process</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-main font-bold mb-2">Support</span>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </div>
        </div>

        <div className="text-center md:text-right">
           <div className="text-[10px] text-muted mb-2 uppercase tracking-[0.2em]">CURRENT_STATUS</div>
           <div className="flex items-center gap-2 justify-center md:justify-end">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="font-mono text-primary text-xs font-bold">ALL_SYSTEMS_OPTIMAL</span>
           </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
