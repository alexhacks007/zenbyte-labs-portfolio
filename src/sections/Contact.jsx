import React from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Phone, MapPin, Send, Code2, Briefcase } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="grid lg:grid-cols-2 gap-20">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter leading-[0.85]">Let’s Build <br /><span className="text-gradient">Something Amazing.</span></h2>
          <p className="text-muted text-lg mb-12 max-w-md font-medium leading-relaxed opacity-80">
            I’m ready to guide you step-by-step. Message me now for a free consultation and let's get your business online.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center border border-white/5 group-hover:border-primary transition-all">
                <Mail className="text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-muted uppercase tracking-[0.3em] font-black">Direct Email</div>
                <div className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors italic">[Your Email]</div>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-[#128C7E]/5 flex items-center justify-center border border-white/5 group-hover:border-[#128C7E] transition-all">
                <MessageSquare className="text-[#128C7E]" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] text-muted uppercase tracking-[0.3em] font-black">Instant Connect</div>
                <a href="https://wa.me/yournumber" target="_blank" rel="noreferrer" className="text-2xl font-black tracking-tight text-[#128C7E] underline decoration-[#128C7E]/20 underline-offset-8 block italic">[Your Number]</a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-16 border-t border-glass-border flex flex-col md:flex-row gap-8 items-center">
            <div className="flex items-center gap-4 mr-auto">
              <div className="relative">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute inset-0" />
                <div className="w-3 h-3 bg-red-600 rounded-full relative" />
              </div>
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted">Awaiting_Transmission</div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://wa.me/yournumber"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 py-4 px-8 rounded-2xl bg-[#128C7E] text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-[#128C7E]/20 transition-all hover:scale-105 hover:bg-[#075E54] active:scale-95"
              >
                <MessageSquare size={16} fill="white" /> WhatsApp Connect
              </a>

              <div className="flex gap-2">
                {[
                  { name: 'Twitter', icon: <MessageSquare size={18} />, href: '#' },
                  { name: 'LinkedIn', icon: <Briefcase size={18} />, href: '#' },
                  { name: 'Github', icon: <Code2 size={18} />, href: '#' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-glass-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-500"
                  >
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className="glass p-8 md:p-12 rounded-[2.5rem] space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-black/[0.03] dark:bg-white/5 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-black/[0.03] dark:bg-white/5 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Objective</label>
              <select className="w-full bg-black/[0.03] dark:bg-white/5 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all appearance-none text-muted">
                <option>Web Platform</option>
                <option>Mobile Engineering</option>
                <option>AI Automation</option>
                <option>General Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted px-1">Message</label>
              <textarea rows={4} placeholder="Tell us about your project..." className="w-full bg-black/[0.03] dark:bg-white/5 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all resize-none" />
            </div>

            <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2 group">
              Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <p className="text-[10px] text-center text-white/30 tracking-wider">SECURE TRANSMISSION ENCRYPTED</p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
