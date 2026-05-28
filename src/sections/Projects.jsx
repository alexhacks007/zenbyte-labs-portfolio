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
    color: "#00FFD1",
    url: "#"
  },
  {
    title: "Simple Cafe Platform",
    tag: "Local Cafe Website Platform",
    metric: "Mobile-First",
    metricLabel: "User Experience",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200",
    color: "#8B5CF6",
    url: "https://cafe-322g0cdzf-zenbytelabsofficial-1596s-projects.vercel.app/"
  },
  {
    title: "Personal Brand Site",
    tag: "Creative Portfolio",
    metric: "SEO Ready",
    metricLabel: "Search Visibility",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    color: "#F472B6",
    url: "#"
  }
]

const Projects = () => {
  const targetRef = useRef(null)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : targetRef
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6%"])

  return (
    <section id="projects" ref={isMobile ? null : targetRef} className={isMobile ? "relative py-24 bg-bg-main" : "relative h-[300vh] bg-bg-main"}>
      <div className={isMobile ? "relative flex flex-col items-center w-full" : "sticky top-0 h-screen flex flex-col items-center overflow-hidden"}>
        <div className="section-padding flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 w-full">
           <div>
             <span className="text-primary font-mono text-xs tracking-widest mb-4 block uppercase font-bold">Featured Work</span>
             <h2 className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9]">Selected <br /> <span className="text-gradient">Case Studies</span></h2>
           </div>
           <p className="text-muted max-w-sm mb-4 font-light sm:text-right hidden sm:block">
             Engineered for performance. Designed for humans. Every project is a testament to precision and behavioral science.
           </p>
        </div>

        <motion.div 
          style={isMobile ? {} : { x }} 
          className={isMobile ? "flex flex-col gap-8 px-6 w-full max-w-3xl" : "flex gap-12 px-6 md:px-20 w-full h-[60vh]"}
        >
          {projects.map((project, i) => (
            <a 
              href={project.url}
              target={project.url === "#" ? undefined : "_blank"}
              rel="noreferrer"
              key={i} 
              className={`group relative rounded-[3rem] overflow-hidden bg-bg-surface border border-glass-border w-full block cursor-pointer ${isMobile ? 'h-[320px] min-w-0' : 'h-full min-w-[85vw] md:min-w-[60vw]'}`}
            >
               <img 
                 src={project.img} 
                 alt={project.title} 
                 className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
               
               <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div>
                        <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-2 block">{project.tag}</span>
                        <h3 className="text-2xl sm:text-4xl font-bold text-white leading-tight">{project.title}</h3>
                     </div>
                     <motion.div 
                       whileHover={{ rotate: 45 }}
                       className="w-12 h-12 sm:w-16 sm:h-16 rounded-full glass border-white/20 flex items-center justify-center text-white shrink-0"
                     >
                       <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />
                     </motion.div>
                  </div>

                  <div className="flex gap-12">
                     <div>
                        <span className="text-[10px] font-mono text-primary uppercase tracking-widest block mb-2">{project.metricLabel}</span>
                        <div className="text-2xl sm:text-4xl font-black italic text-white leading-none">{project.metric}</div>
                     </div>
                  </div>
               </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
