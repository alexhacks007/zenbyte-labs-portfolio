import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Users, Target } from 'lucide-react'

const projects = [
  {
    title: "EcoStore E-commerce",
    tag: "Online Business Solution",
    metric: "Fast Loading",
    metricLabel: "Google PageSpeed",
    img: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
    color: "#00FFD1"
  },
  {
    title: "HealthyBite Meals",
    tag: "Local Service Landing Page",
    metric: "Mobile-First",
    metricLabel: "User Experience",
    img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1200",
    color: "#8B5CF6"
  },
  {
    title: "Personal Brand Site",
    tag: "Creative Portfolio",
    metric: "SEO Ready",
    metricLabel: "Search Visibility",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    color: "#F472B6"
  }
]

const Projects = () => {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"])

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-bg-main">
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden">
        <div className="section-padding flex justify-between items-end mb-10">
           <div>
             <span className="text-primary font-mono text-xs tracking-widest mb-4 block uppercase">Featured Work</span>
             <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter">Selected <br /> <span className="text-gradient">Case Studies</span></h2>
           </div>
           <p className="text-muted max-w-sm mb-4 font-light text-right hidden md:block">
             Engineered for performance. Designed for humans. Every project is a testament to precision and behavioral science.
           </p>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-6 md:px-20 w-full h-[60vh]">
          {projects.map((project, i) => (
            <div key={i} className="group relative h-full min-w-[85vw] md:min-w-[60vw] rounded-[3rem] overflow-hidden bg-bg-surface border border-glass-border">
               <img 
                 src={project.img} 
                 alt={project.title} 
                 className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
               
               <div className="absolute inset-0 p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div>
                        <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-2 block">{project.tag}</span>
                        <h3 className="text-4xl font-bold text-white">{project.title}</h3>
                     </div>
                     <motion.div 
                       whileHover={{ rotate: 45 }}
                       className="w-16 h-16 rounded-full glass border-white/20 flex items-center justify-center text-white"
                     >
                       <ArrowUpRight size={32} />
                     </motion.div>
                  </div>

                  <div className="flex gap-12">
                     <div>
                        <span className="text-[10px] font-mono text-primary uppercase tracking-widest block mb-2">{project.metricLabel}</span>
                        <div className="text-4xl font-black italic text-white">{project.metric}</div>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
