import React from 'react'
import { motion } from 'framer-motion'
import { Globe, Rocket, Shield, Settings, RefreshCcw, BarChart, HardDrive, Lock, MessageSquare, Zap, Sparkles } from 'lucide-react'

const services = [
  { 
    icon: <Globe className="text-primary" />, 
    title: 'Website Development', 
    description: 'High-performance static & dynamic websites (React, Flask, FastAPI) tailored for businesses, clinics, and startups.' 
  },
  { 
    icon: <Zap className="text-secondary" />, 
    title: 'UI Redesign & Optimization', 
    description: 'Transforming outdated sites into modern, mobile-responsive experiences with optimized UX and speed.' 
  },
  { 
    icon: <Rocket className="text-primary" />, 
    title: 'Deployment & Hosting', 
    description: 'End-to-end setup: Domain purchase guidance, AWS/Hostinger hosting, SSL installation, and business email.' 
  },
  { 
    icon: <RefreshCcw className="text-secondary" />, 
    title: 'Website Maintenance', 
    description: 'Reliable recurring support: Monthly updates, bug fixes, security audits, and performance monitoring.' 
  },
  { 
    icon: <MessageSquare className="text-primary" />, 
    title: 'WhatsApp Automation', 
    description: 'Powerful lead capture, auto-reply bots, and appointment booking systems integrated with WhatsApp.' 
  },
  { 
    icon: <BarChart className="text-secondary" />, 
    title: 'Basic SEO Setup', 
    description: 'Simple but effective: Meta tags, Google Search Console setup, sitemaps, and keyword optimization.' 
  },
  { 
    icon: <Settings className="text-primary" />, 
    title: 'Automation Scripts', 
    description: 'Efficiency at scale: Data scraping, Excel automation, and automated form/email processing scripts.' 
  },
  { 
    icon: <Rocket className="text-secondary" />, 
    title: 'E-commerce Solutions', 
    description: 'Small online stores with secure payment integration (Stripe/Razorpay) and lightweight admin panels.' 
  },
  { 
    icon: <Shield className="text-primary" />, 
    title: 'Security Foundations', 
    description: 'Protecting your digital assets with SSL, basic authentication systems, and admin panel protection.' 
  },
  { 
    icon: <Sparkles className="text-secondary" />, 
    title: 'Personal Branding', 
    description: 'High-impact portfolio and branding websites for students, job seekers, and freelancers.' 
  },
]

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto w-full relative">
      <div className="text-center mb-20">
        <span className="text-primary font-mono text-xs tracking-widest mb-4 block uppercase font-bold">Services</span>
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">What I <span className="text-gradient italic">Offer</span></h2>
        <p className="text-muted max-w-2xl mx-auto font-medium text-lg">High-quality digital solutions tailored for your business growth.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card group hover:border-primary/40 transition-all !p-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold mb-3">{service.title}</h3>
            <p className="text-xs text-muted leading-relaxed group-hover:text-main transition-colors">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Services
