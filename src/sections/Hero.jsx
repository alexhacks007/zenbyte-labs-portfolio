import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import TypingText from '../components/TypingText'
import Magnetic from '../components/Magnetic'
import { ArrowRight, ChevronDown } from 'lucide-react'

const Hero = () => {
  const heroRef = useRef(null)

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="mesh-bg" />

      <div className="section-padding relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 py-2 px-5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-lg shadow-primary/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Special Portfolio Launch Offer — Save 50%
          </motion.div>

          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black mb-10 leading-[0.9] tracking-tighter italic">
            Build Your Website. <br />
            <span className="text-secondary/80">Grow Your Business.</span>
            <div className="text-primary mt-2">
              <TypingText texts={['Stay Ahead.', 'Launch Fast.', 'Scale Now.', 'Get Results.']} />
            </div>
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-16 leading-relaxed font-medium mt-6 opacity-80">
            I help small businesses and startups launch fast, secure, and budget-friendly websites — with smart automation and SEO support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Magnetic>
              <a href="#pricing" className="btn-primary flex items-center gap-2 whitespace-nowrap">
                🚀 Get Your Website <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP || '916374066541'}`} target="_blank" rel="noreferrer" className="btn-secondary flex items-center gap-2">
                💬 Chat on WhatsApp
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="text-muted hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest px-4">
                📩 Get Free Consultation
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles Placeholder */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted/20"
      >
        <ChevronDown size={40} />
      </motion.div>
    </section>
  )
}

export default Hero

