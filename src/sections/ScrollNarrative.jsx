import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const narrative = [
  {
    step: "01",
    title: "The Friction Problem",
    description: "In the 2026 digital landscape, standard interfaces are industrial noise. Psychological friction causes 84% of user drop-off before your value is even perceived.",
    accent: "var(--color-accent)"
  },
  {
    step: "02",
    title: "The Neural Protocol",
    description: "We don't design layouts; we architect neural resonance. Our systems map behavioral pathways to ensure your infrastructure connects with user intent instantly.",
    accent: "var(--color-primary)"
  },
  {
    step: "03",
    title: "Vanguard Engineering",
    description: "Clean code is our baseline. Peak performance is our mission. We implement synaptic optimization to ensure zero-latency conversion at every interaction node.",
    accent: "var(--color-secondary)"
  },
  {
    step: "04",
    title: "Industrial Impact",
    description: "The result is a high-performance ecosystem that transforms simple visitors into loyal nodes. Precision engineering for a market that demands perfection.",
    accent: "var(--color-primary)"
  }
]

const ScrollNarrative = () => {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      const track = containerRef.current.querySelector('.narrative-track')

      const pin = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      })
      return () => pin.kill()
    }, containerRef)
    return () => ctx.revert()
  }, [isMobile])

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-bg-main text-main border-y border-glass-border">
      <div className={isMobile ? "relative py-12" : "h-screen flex items-center"}>
        <div
          className={isMobile ? "narrative-track flex flex-col gap-24 px-8 py-12 items-start" : "narrative-track flex gap-[30vw] px-[20vw] items-center"}
          style={isMobile ? {} : { willChange: 'transform' }}
        >
          {narrative.map((item, i) => (
            <div key={i} className={`relative ${isMobile ? "w-full" : "w-[85vw] md:w-[60vw] flex-shrink-0"}`}>
              <span 
                className="text-[8rem] sm:text-[12rem] md:text-[25rem] font-black absolute -top-20 sm:-top-32 md:-top-60 -left-4 sm:-left-10 md:-left-20 select-none italic tracking-tighter opacity-[0.08] dark:opacity-5 transition-opacity"
                style={{ color: item.accent }}
              >
                {item.step}
              </span>
              <div className={`relative z-10 ${isMobile ? "pt-12" : "pt-20"}`}>
                <span 
                   className="font-mono tracking-[0.6em] mb-4 sm:mb-6 block uppercase text-[10px] font-black"
                   style={{ color: i % 2 === 0 ? 'var(--color-secondary)' : 'var(--color-accent)' }}
                >
                  ZEN_VANGUARD_PROTOCOL_{item.step}
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-9xl font-black mb-6 sm:mb-10 leading-[0.9] tracking-tighter italic uppercase text-main">
                  {item.title}
                </h2>
                <p className="text-base sm:text-lg md:text-2xl text-muted max-w-2xl leading-relaxed font-medium opacity-80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="absolute bottom-20 left-10 right-10 h-px bg-glass-border hidden md:block">
        <motion.div
          className="h-full bg-primary"
          style={{ width: '25%' }} // This would eventually be linked to scroll
        />
      </div>
    </section>
  )
}

export default ScrollNarrative
