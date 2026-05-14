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
    accent: "#F472B6"
  },
  {
    step: "02",
    title: "The Neural Protocol",
    description: "We don't design layouts; we architect neural resonance. Our systems map behavioral pathways to ensure your infrastructure connects with user intent instantly.",
    accent: "#00FFD1"
  },
  {
    step: "03",
    title: "Vanguard Engineering",
    description: "Clean code is our baseline. Peak performance is our mission. We implement synaptic optimization to ensure zero-latency conversion at every interaction node.",
    accent: "#8B5CF6"
  },
  {
    step: "04",
    title: "Industrial Impact",
    description: "The result is a high-performance ecosystem that transforms simple visitors into loyal nodes. Precision engineering for a market that demands perfection.",
    accent: "#00FFD1"
  }
]

const ScrollNarrative = () => {
  const containerRef = useRef(null)

  useEffect(() => {
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
  }, [])

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-bg-main text-main border-y border-glass-border">
      <div className="h-screen flex items-center">
        <div
          className="narrative-track flex gap-[30vw] px-[20vw] items-center"
          style={{ willChange: 'transform' }}
        >
          {narrative.map((item, i) => (
            <div key={i} className="w-[85vw] md:w-[60vw] flex-shrink-0 relative">
              <span 
                className="text-[15rem] md:text-[25rem] font-black absolute -top-40 md:-top-60 -left-10 md:-left-20 select-none italic tracking-tighter opacity-[0.08] dark:opacity-5 transition-opacity"
                style={{ color: item.accent }}
              >
                {item.step}
              </span>
              <div className="relative z-10 pt-20">
                <span 
                   className="font-mono tracking-[0.6em] mb-6 block uppercase text-[10px] font-black"
                   style={{ color: i % 2 === 0 ? '#8B5CF6' : '#F472B6' }}
                >
                  ZEN_VANGUARD_PROTOCOL_{item.step}
                </span>
                <h2 className="text-6xl md:text-9xl font-black mb-10 leading-[0.85] tracking-tighter italic uppercase text-main">
                  {item.title}
                </h2>
                <p className="text-xl md:text-2xl text-muted max-w-2xl leading-relaxed font-medium opacity-80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Progress Bar */}
      <div className="absolute bottom-20 left-10 right-10 h-px bg-glass-border">
        <motion.div
          className="h-full bg-primary"
          style={{ width: '25%' }} // This would eventually be linked to scroll
        />
      </div>
    </section>
  )
}

export default ScrollNarrative
