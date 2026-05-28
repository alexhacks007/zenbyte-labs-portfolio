import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, Sparkles, Rocket, X, Send } from 'lucide-react'

const Pricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null
  })

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan)
    setFormData({
      name: '',
      email: '',
      message: `Hi there,\n\nI am interested in the ${plan.title} plan (${plan.price}).\n\nPlease let me know the next steps to get started.\n\nThanks!`
    })
    setStatus({ loading: false, success: null, error: null })
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `ZenByteLabs Booking: ${selectedPlan?.title} (${selectedPlan?.price})`,
          message: formData.message
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setStatus({ loading: false, success: 'Booking request sent successfully!', error: null })
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          setIsModalOpen(false)
          setStatus({ loading: false, success: null, error: null })
        }, 2000)
      } else {
        setStatus({ loading: false, success: null, error: data.error || 'Failed to submit booking inquiry.' })
      }
    } catch (err) {
      console.error(err)
      setStatus({ loading: false, success: null, error: 'Connection error. Please try again.' })
    }
  }

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
            className={`glass-card relative flex flex-col p-10 h-full ${plan.popular ? 'border-primary/40 bg-primary/5 md:scale-105 z-10' : ''}`}
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

            <button 
              onClick={() => handleOpenModal(plan)}
              className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg ${plan.popular ? 'bg-primary text-black hover:bg-slate-900 hover:text-white' : 'bg-slate-950 text-white dark:bg-white/5 dark:text-white hover:bg-black dark:hover:bg-white/10'}`}
            >
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

      {/* Booking Modal Popup */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#020617] border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tighter text-white">Book {selectedPlan?.title}</h3>
                  <p className="text-muted text-sm font-medium">{selectedPlan?.price}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted px-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm text-white placeholder:text-muted/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted px-1">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm text-white placeholder:text-muted/50" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted px-1">Project Details</label>
                  <textarea 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none text-sm leading-relaxed text-white placeholder:text-muted/50" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status.loading}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2 group mt-4 disabled:opacity-50"
                >
                  {status.loading ? 'TRANSMITTING...' : 'Send Inquiry'} 
                  {!status.loading && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>

                {status.success && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-xs text-center text-primary font-mono font-bold mt-2"
                  >
                    ● {status.success}
                  </motion.div>
                )}

                {status.error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="text-xs text-center text-red-500 font-mono font-bold mt-2"
                  >
                    ● {status.error}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Pricing
