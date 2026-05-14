import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Sparkles, Rocket } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      title: "Starter Website",
      price: "₹2,999 – ₹5,999",
      description: "Ideal for 3–5 page personal portfolios or simple landing pages.",
      features: ["Clean Modern Design", "Mobile Responsive", "Contact Form", "Standard SSL", "Fast Delivery"],
      icon: <Zap className="text-primary" />,
      popular: false
    },
    {
      title: "Business Website",
      price: "₹6,999 – ₹12,999",
      description: "For businesses needing 5–10 pages and lead generation tools.",
      features: ["Up to 10 Pages", "WhatsApp Integration", "Google Search Console", "Business Email Setup", "UX Improvements"],
      icon: <Sparkles className="text-secondary" />,
      popular: true
    },
    {
      title: "Premium Ecosystem",
      price: "Custom Pricing",
      description: "Full-scale dynamic platforms with admin panels and databases.",
      features: ["Advanced Admin Panel", "Customer Database", "Custom API Logic", "Razorpay/Stripe Setup", "24/7 Security Support"],
      icon: <Rocket className="text-primary" />,
      popular: false
    }
  ]

  const bundles = [
    { name: "Starter Pack", content: "Website + Hosting + SSL", efficiency: "Quick Launch" },
    { name: "Business Pack", content: "Website + WhatsApp Automation + SEO", efficiency: "Lead Focused" },
    { name: "Growth Pack", content: "Website + Maintenance + Automation", efficiency: "Scale Ready" },
  ]

  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-primary font-mono text-xs tracking-widest mb-4 block uppercase font-bold">Pricing Guide</span>
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Flexible Plans for <span className="text-gradient italic">Your Growth</span></h2>
        <p className="text-muted max-w-2xl mx-auto font-medium text-lg">Transparent pricing with no hidden costs. Best value for startups.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card relative flex flex-col p-10 h-full ${plan.popular ? 'border-primary/40 bg-primary/5 scale-105 z-10' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-8">
              {plan.icon}
            </div>
            <h3 className="text-2xl font-black mb-2 italic tracking-tight">{plan.title}</h3>
            <div className="text-3xl font-bold text-primary mb-4">{plan.price}</div>
            <p className="text-sm text-muted mb-8 leading-relaxed font-medium">{plan.description}</p>
            
            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-center gap-3 text-sm">
                  <Check size={16} className="text-primary shrink-0" />
                  <span className="text-muted">{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${plan.popular ? 'bg-primary text-black hover:bg-slate-900 hover:text-white' : 'bg-slate-950 text-white dark:bg-white/5 dark:text-white hover:bg-black dark:hover:bg-white/10'}`}>
              Book Project
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-20">
        <h3 className="text-center text-xl font-bold mb-8 uppercase tracking-widest text-primary">Smart Strategy: Bundle Packs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {bundles.map((bundle, bIndex) => (
            <div key={bIndex} className="p-6 border border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm">
              <div className="text-[10px] uppercase font-black text-secondary mb-2 tracking-tighter">{bundle.efficiency}</div>
              <h4 className="font-bold text-lg mb-2">{bundle.name}</h4>
              <p className="text-sm text-muted font-medium">{bundle.content}</p>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-center mt-12 text-muted text-sm italic">
        *Pricing varies based on specific requirements and custom features. 
        <br />
        <span className="text-primary font-bold">Message me now — We’ll build your clear path to growth.</span>
      </p>
    </section>
  )
}

export default Pricing
