import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Shield, Cpu } from 'lucide-react'

const About = () => {
  const stats = [
    { label: 'Projects Delivered', value: '150+' },
    { label: 'Success Rate', value: '99%' },
    { label: 'Awards Won', value: '12' },
  ]

  const features = [
    { icon: <Zap className="text-primary" />, title: 'Clean Designs', description: 'Modern, high-conversion visual systems.' },
    { icon: <CheckCircle2 className="text-secondary" />, title: 'Fast Delivery', description: 'Real-time updates & quick turnarounds.' },
    { icon: <Cpu className="text-primary" />, title: 'Affordable Rates', description: 'Budget-friendly pricing for startups.' },
  ]

  return (
    <section id="about" className="py-12 lg:py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-xs tracking-widest mb-4 block uppercase font-bold">Who Am I?</span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic">
            Building Digital <br /> <span className="text-gradient">Presence from Scratch.</span>
          </h2>
          <p className="text-muted mb-6 leading-relaxed text-lg">
            I’m a passionate full-stack developer starting my freelancing journey, focused on helping businesses build a strong online presence.
          </p>
          <p className="text-muted mb-8 italic text-sm border-l-2 border-primary pl-4 py-2 bg-primary/5">
             "I’m currently offering <span className="text-primary font-bold">discounted pricing</span> to build my portfolio — so you get high-quality work at a lower cost."
          </p>
          
          <div className="mb-8 p-4 border border-secondary/20 rounded-xl bg-secondary/5">
            <span className="text-[10px] font-black uppercase text-secondary tracking-widest block mb-2">Philosophy: The Real Talk</span>
            <p className="text-sm font-bold text-main">
              "I don't just build websites; I automate customer communication. Clear goals lead to more clients. That's the ZenByte protocol."
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-sm">
               <CheckCircle2 size={16} className="text-primary" />
               <span className="text-muted font-medium">Real-time collaboration & status updates.</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
               <CheckCircle2 size={16} className="text-primary" />
               <span className="text-muted font-medium">Continuous learning with 2026's latest tech.</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
               <CheckCircle2 size={16} className="text-primary" />
               <span className="text-muted font-medium">Treating every project as a long-term partnership.</span>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card flex gap-6 !p-8 group hover:border-primary/40 transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
