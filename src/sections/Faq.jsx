import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, CheckCircle2, DollarSign, Calendar, ShieldCheck, Zap } from 'lucide-react'

const faqCategories = ["All", "Services & Tech", "Pricing & Timeline", "Hosting & Support"]

const faqs = [
  {
    category: "Services & Tech",
    question: "What exactly does ZenByteLabs build?",
    answer: "We engineer high-performance digital systems: responsive business websites, custom web applications (React, FastAPI, Flask), automated WhatsApp lead capture pipelines, and custom scripting to automate daily business tasks.",
    icon: <Zap size={18} className="text-primary" />
  },
  {
    category: "Pricing & Timeline",
    question: "How much will my project cost?",
    answer: "We believe in transparent, budget-friendly pricing with zero hidden costs. Starter single-page portfolios range from ₹2,999 to ₹5,999. Full business websites with integrations range from ₹6,999 to ₹12,999. Complex databases or custom apps are custom-quoted.",
    icon: <DollarSign size={18} className="text-secondary" />
  },
  {
    category: "Pricing & Timeline",
    question: "What is the typical development timeline?",
    answer: "Turnaround depends on complexity. Single-page landing pages and portfolios are delivered within 3–5 days. Multi-page business platforms and WhatsApp systems take 7–14 days. Full-stack customized web portals require 2–4 weeks.",
    icon: <Calendar size={18} className="text-primary" />
  },
  {
    category: "Hosting & Support",
    question: "Do you handle domain purchase and hosting setup?",
    answer: "Yes, we guide you end-to-end. We will recommend the best value registrar and hosting plan for your needs (e.g., Hostinger, AWS). Once purchased, we set up your custom business emails, secure SSL certificates, and deploy the site completely free of charge.",
    icon: <ShieldCheck size={18} className="text-secondary" />
  },
  {
    category: "Services & Tech",
    question: "What is WhatsApp Automation and how does it benefit me?",
    answer: "It bridges the gap between your website and direct customer communication. When a user submits an inquiry, our custom webhook triggers an instant automated response to their WhatsApp, captures their details, and alerts you immediately so you never lose a lead.",
    icon: <Zap size={18} className="text-primary" />
  },
  {
    category: "Hosting & Support",
    question: "Do you provide search engine optimization (SEO) and security?",
    answer: "Every website we build is packaged with basic SEO foundations (metadata tags, Google Search Console integration, XML sitemaps) and certified SSL encryption. We build with lightweight, optimized code to ensure rapid load times, which boosts Google rankings.",
    icon: <CheckCircle2 size={18} className="text-secondary" />
  }
]

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedIndex, setExpandedIndex] = useState(null)

  const filteredFaqs = activeCategory === "All"
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory)

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 lg:py-40 px-6 max-w-5xl mx-auto relative overflow-hidden">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block"
        >
          FAQ_DATABASE_v1.0
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] mb-6">
          Frequently Asked <span className="text-gradient">Questions</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto font-medium">
          Get transparent, straightforward answers about our process, technology stack, and pricing structure.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {faqCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat)
              setExpandedIndex(null) // reset accordion
            }}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
              activeCategory === cat
                ? "bg-primary text-black shadow-lg shadow-primary/20 scale-[1.03]"
                : "bg-white/5 border border-glass-border text-muted hover:bg-white/10 hover:text-main"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx
            return (
              <motion.div
                layout
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform, opacity' }}
                className={`glass-card !p-0 overflow-hidden border transition-colors duration-300 ${
                  isExpanded ? 'border-primary/30 bg-primary/5' : 'border-glass-border hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl bg-white/5 border border-glass-border shrink-0`}>
                      {faq.icon}
                    </div>
                    <span className="text-base md:text-lg font-bold text-main leading-snug">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-muted shrink-0 ml-4"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 border-t border-glass-border">
                        <p className="text-sm md:text-base text-muted leading-relaxed font-medium pt-6">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Faq
