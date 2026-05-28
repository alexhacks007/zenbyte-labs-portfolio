import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Sparkles, ArrowRight, Zap, Shield, PhoneCall } from 'lucide-react'

const KNOWLEDGE_BASE = [
  { keywords: ['price', 'pricing', 'cost', 'how much', 'plan'], answer: "Our pricing starts at ₹2,999 for Starter Portfolios and goes up to ₹12,999+ for full Business Ecosystems. We also offer custom quotes for enterprise dynamic platforms." },
  { keywords: ['service', 'offer', 'what do you do', 'skills'], answer: "I specialize in Website Development (React/FastAPI), UI Redesign, WhatsApp Automation, SEO, and Maintenance. Essentially, I build high-performance digital engines for your business." },
  { keywords: ['whatsapp', 'automation', 'bot'], answer: "Our WhatsApp automation includes lead capture bots, auto-replies, and appointment booking systems integrated directly with your business number." },
  { keywords: ['psychology', 'engine', 'conversion'], answer: "The Psychology Engine is our proprietary AI tool that analyzes user interaction data to optimize website layouts for maximum resonance and conversion." },
  { keywords: ['contact', 'hire', 'talk', 'email', 'whatsapp'], answer: `You can reach me via the contact form below, email me at ${import.meta.env.VITE_EMAIL || 'zenbytelabsofficial@gmail.com'}, or chat on WhatsApp at ${import.meta.env.VITE_WHATSAPP_DISPLAY || '+91 63740 66541'}. Ready to architect your digital presence?` },
  { keywords: ['hosting', 'domain', 'ssl'], answer: "Every Business and Growth pack includes end-to-end hosting setup, domain guidance, and SSL installation to ensure your site is secure and live." },
]

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Protocol initiated. I am the ZenByte Assistant. How can I architect your digital presence today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
        scrollToBottom()
    }
  }, [messages, isTyping, isOpen])

  const findAnswer = (query) => {
    const q = query.toLowerCase()
    const match = KNOWLEDGE_BASE.find(k => k.keywords.some(key => q.includes(key)))
    return match ? match.answer : "Analyzing request... I'm still learning that specific protocol. For immediate details, I recommend connecting via WhatsApp or checking our 'Services' section."
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const botMessage = { role: 'bot', content: findAnswer(userMessage.content), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1200)
  }

  const quickActions = [
    { label: "Pricing", icon: <Zap size={12} />, query: "Tell me about pricing" },
    { label: "Services", icon: <Shield size={12} />, query: "What services do you offer?" },
    { label: "Connect", icon: <PhoneCall size={12} />, query: "How can I contact you?" },
  ]

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="mb-6 w-[calc(100vw-3rem)] sm:w-[350px] md:w-[400px] h-[600px] max-h-[80vh] bg-bg-surface overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col border border-glass-border backdrop-blur-2xl origin-bottom-right"
          >
            {/* Header */}
            <div className="p-6 bg-primary flex items-center justify-between shadow-xl z-20">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-black flex items-center justify-center border border-white/20 shadow-lg">
                    <Bot className="text-primary animate-pulse" size={20} />
                </div>
                <div>
                    <h3 className="text-black font-black uppercase text-xs tracking-widest italic">ZenByte_Vanguard</h3>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                        <span className="text-[9px] font-mono text-black/60 uppercase font-black">Neural_Active</span>
                    </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/10 rounded-xl transition-all text-black hover:rotate-90"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-grow p-6 overflow-y-auto custom-scrollbar space-y-8 bg-gradient-to-b from-black/0 to-primary/5 overscroll-contain"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`group relative max-w-[85%] p-5 rounded-[2rem] text-[13px] leading-relaxed transition-all ${
                    msg.role === 'user' 
                    ? 'bg-secondary/15 dark:bg-secondary/20 border border-secondary/30 text-main rounded-br-none shadow-lg' 
                    : 'bg-black/5 dark:bg-white/5 border border-glass-border text-muted rounded-bl-none hover:border-primary/30'
                  }`}>
                    {msg.content}
                    <div className={`absolute -bottom-5 ${msg.role === 'user' ? 'right-0 text-right' : 'left-0'} text-[8px] font-mono text-muted/40 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity`}>
                        {msg.time} • LOG_ENTRY
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-white/5 border border-primary/10 p-4 rounded-full flex gap-1.5 shadow-inner">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-duration:0.6s]" />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-black/40">
                {quickActions.map((action, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setInput(action.query)
                        }}
                        className="whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-full bg-bg-main dark:bg-[#0F172A] border border-glass-border text-[10px] font-black uppercase tracking-tighter text-muted hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 shadow-lg"
                    >
                        {action.icon} {action.label}
                    </button>
                ))}
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSend}
              className="p-6 border-t border-glass-border bg-bg-surface relative"
            >
              <div className="flex items-center gap-4 relative z-10">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="EX: Describe Pricing_Protocol..."
                  className="flex-grow bg-bg-main dark:bg-white/5 border border-glass-border rounded-3xl px-6 py-4 text-xs text-main focus:outline-none focus:border-primary/40 focus:bg-primary/5 transition-all font-mono placeholder:text-muted/50"
                />
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={!input.trim()}
                  className="w-12 h-12 rounded-2xl bg-primary text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,255,209,0.3)] disabled:opacity-20 disabled:shadow-none transition-all"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-[1.8rem] bg-primary flex items-center justify-center shadow-[0_20px_50px_rgba(0,255,209,0.3)] relative group border-2 border-black/10"
      >
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        {isOpen ? (
          <X className="text-black" size={28} />
        ) : (
          <div className="relative">
             <MessageSquare className="text-black" size={28} />
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-primary animate-bounce shadow-lg flex items-center justify-center text-[7px] font-black text-white">1</span>
          </div>
        )}
      </motion.button>
    </div>
  )
}

export default Chatbot

