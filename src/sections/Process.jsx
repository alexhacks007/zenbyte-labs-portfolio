import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { MessageSquare, Layout, Code2, CheckCircle, Rocket } from 'lucide-react'

const steps = [
  {
    number: "01",
    icon: <MessageSquare className="text-black" />,
    title: "Requirement Discussion",
    content: "We talk about your business needs, goals and map out the website structure.",
    status: "DISCOVERY",
    accent: "bg-primary"
  },
  {
    number: "02",
    icon: <Layout className="text-black" />,
    title: "Design Preview",
    content: "I create a visual draft for your approval. You see exactly what you'll get before we build.",
    status: "APPROVAL_STAGE",
    accent: "bg-secondary"
  },
  {
    number: "03",
    icon: <Code2 className="text-white" />,
    title: "Development Phase",
    content: "Hard-coding your site with clean, modern technologies for speed and reliability.",
    status: "ACTIVE_BUILD",
    accent: "bg-slate-800"
  },
  {
    number: "04",
    icon: <CheckCircle className="text-black" />,
    title: "Testing & Feedback",
    content: "Multiple test runs to ensure mobile responsiveness and performance. Your feedback matters.",
    status: "QA_QUALITY",
    accent: "bg-primary"
  },
  {
    number: "05",
    icon: <Rocket className="text-black" />,
    title: "Final Delivery",
    content: "Live deployment on your domain with 1-year basic SEO support and full security setup.",
    status: "LAUNCH_READY",
    accent: "bg-secondary"
  }
]

const Process = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section ref={containerRef} id="process" className="py-24 lg:py-48 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="text-center mb-40">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary font-mono text-xs tracking-[0.5em] mb-6 block uppercase font-black"
        >
          STEP_BY_STEP_FLOW
        </motion.span>
        <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.8]">
          Project <br /> <span className="text-gradient">Process.</span>
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* The Technical Track */}
        <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block" />
        <motion.div 
          style={{ scaleY }}
          className="absolute left-10 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary origin-top -translate-x-1/2 z-10 hidden md:block shadow-[0_0_15px_rgba(0,255,209,0.5)]" 
        />

        <div className="space-y-48">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex flex-col md:flex-row items-center gap-16 md:gap-32 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Central Technical Hub */}
              <div className="absolute left-10 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg-main border-2 border-primary z-20 hidden md:flex items-center justify-center">
                 <motion.div 
                   initial={{ scale: 0 }}
                   whileInView={{ scale: 1 }}
                   className="w-1.5 h-1.5 rounded-full bg-primary" 
                 />
              </div>

              {/* Dynamic Content Card */}
              <div className="flex-1 w-full relative z-10">
                <div className={`group relative p-10 md:p-14 glass-card border-none hover:bg-bg-surface transition-colors duration-500 ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                  {/* Phase Label */}
                  <div className={`flex items-center gap-4 mb-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-xl ${step.accent}`}>
                       {step.icon}
                    </div>
                    <div className="space-y-1">
                      <span className="text-primary font-mono text-[10px] tracking-[0.3em] uppercase block">PHASE_{step.number}</span>
                      <span className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]">{step.status}</span>
                    </div>
                  </div>

                  <h3 className="text-5xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-[0.85] text-main">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-muted leading-relaxed font-medium opacity-90 mb-8 max-w-xl group-hover:text-main transition-colors mx-auto md:mx-0">
                    {step.content}
                  </p>

                  {/* Blueprint Detail */}
                  <div className={`flex gap-4 opacity-5 font-mono text-[9px] ${index % 2 === 1 ? 'justify-end' : ''}`}>
                     <span>40.7128° N, 74.0060° W</span>
                     <span>VER_8.0.1</span>
                  </div>
                </div>
              </div>

              {/* Huge Background Vector - Improved for designer-grade contrast */}
              <span className={`absolute -top-10 md:-top-20 ${index % 2 === 1 ? 'md:left-0' : 'md:right-0'} text-[18rem] md:text-[25rem] font-black select-none italic tracking-tighter -z-10 transition-colors duration-1000 ${
                index % 2 === 0 
                  ? 'text-primary/[0.07] dark:text-primary/[0.04]' 
                  : 'text-secondary/[0.07] dark:text-secondary/[0.04]'
              }`}>
                {step.number}
              </span>

              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
