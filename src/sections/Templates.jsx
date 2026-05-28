import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Tablet, Monitor, X, Check, ArrowRight, ShieldCheck, Zap, Heart, Star, ShoppingCart, Calendar, Menu, RotateCw, Layers, Sun, Moon, ExternalLink } from 'lucide-react'

const categories = ["All", "E-commerce", "Medical & Clinics", "Creative Portfolio"]

const templates = [
  {
    id: "medvitals",
    title: "MedVitals Clinic Portal",
    category: "Medical & Clinics",
    desc: "A surgical-grade Patient Portal engineered for doctors, clinics, and wellness centers. Built-in WhatsApp booking protocol.",
    thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    features: ["WhatsApp Booking Sync", "Interactive Doctor Profiles", "Dynamic Service Grid", "Mobile Patient Records"],
    metrics: "99% Mobile Score • SEO Optimized",
    liveUrl: "https://alexhacks007.github.io/medical-website-ultra/",
    previewData: {
      type: "medical",
      title: "MedVitals Clinic Portal",
      tagline: "Precision Healthcare, Synaptic Scheduling",
      heroImg: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
      services: ["Neurology Consultation", "Cardiology Analysis", "Executive Health Audits", "Synaptic Therapy"],
      reviews: [
        { name: "Dr. Sarah Mitchell", text: "ZenByte's clinic template doubled our online bookings in 30 days." },
        { name: "Robert Chen", text: "Booking an appointment via WhatsApp took less than 10 seconds." }
      ]
    }
  },
  {
    id: "simplecafe",
    title: "Simple Cafe Platform",
    category: "E-commerce",
    desc: "A beautifully animated local cafe website platform featuring a dynamic menu, responsive items grid, and seamless WhatsApp booking.",
    thumbnail: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
    features: ["Dynamic Product Menu", "WhatsApp Order System", "Highly Responsive Layout", "Light/Dark Mode Ready"],
    metrics: "100% Mobile Friendly • 0.5s Loading Speed",
    liveUrl: "https://cafe-322g0cdzf-zenbytelabsofficial-1596s-projects.vercel.app/",
    previewData: {
      type: "iframe",
      title: "Simple Cafe Platform",
      tagline: "Freshly Brewed Innovation",
      heroImg: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200"
    }
  },
  {
    id: "nomadboutique",
    title: "NomadBoutique Shop Core",
    category: "E-commerce",
    desc: "A lightning-fast micro e-commerce hub with animated sliding cart mechanics and Stripe/Razorpay sync foundations.",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    features: ["Slide-out Synaptic Cart", "Interactive Spec Zoom", "Instant Payment Flow", "Technical Inventory Tracker"],
    metrics: "Ultra-Light Bundle Size",
    liveUrl: "https://nomadshop-demo.com",
    previewData: {
      type: "ecommerce",
      title: "NomadBoutique",
      tagline: "Curated Technical Goods for Modern Nomads",
      heroImg: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
      products: [
        { id: 1, name: "Synaptic Backpack Pro", price: 12999, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400" },
        { id: 2, name: "Outlaw Technical Shell", price: 18999, img: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=400" },
        { id: 3, name: "Vanguard Desk Organizer", price: 4499, img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400" }
      ]
    }
  },
  {
    id: "vanguardportfolio",
    title: "Vanguard Creative Schema",
    category: "Creative Portfolio",
    desc: "A high-density portfolio canvas engineered for designers, engineers, and agencies. Dark mode default with full red compatibility.",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    features: ["GSAP Horizontal Scrolling", "Dynamic Cursor Attractors", "Noise Depth Overlays", "Synaptic Form Fields"],
    metrics: "100% Core Web Vitals Score",
    liveUrl: "https://vanguard-demo.com",
    previewData: {
      type: "portfolio",
      title: "Vanguard Schema",
      tagline: "Industrial Design Meets Surgical Code",
      heroImg: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
      projects: [
        { title: "NeuroOS Interface", category: "UX Engineering" },
        { title: "Krypton Database", category: "Backend Infrastructure" },
        { title: "Vortex Ledger", category: "Web3 Platform" }
      ]
    }
  }
]

// Device frame bezel mockup container
const DeviceFrame = ({ mode, orientation, theme, children, title, url, windowWidth, customScale }) => {
  let width = 1200
  let height = 750

  if (mode === 'tablet') {
    width = orientation === 'portrait' ? 768 : 1024
    height = orientation === 'portrait' ? 1024 : 768
  } else if (mode === 'mobile') {
    width = orientation === 'portrait' ? 375 : 812
    height = orientation === 'portrait' ? 812 : 375
  }

  const getScaleFactor = (targetWidth) => {
    const padding = windowWidth < 768 ? 32 : 64
    const availableWidth = windowWidth - padding
    if (availableWidth < targetWidth) {
      return availableWidth / targetWidth
    }
    return 1.0
  }

  const scale = customScale !== undefined ? customScale : getScaleFactor(width)
  const scaledWidth = width * scale
  const scaledHeight = height * scale

  if (mode === 'desktop') {
    return (
      <div 
        style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }} 
        className="relative shrink-0 transition-all duration-300 select-none"
      >
        <div 
          style={{ 
            width: `${width}px`, 
            height: `${height}px`, 
            transform: `scale(${scale})`, 
            transformOrigin: 'top left' 
          }}
          className={`absolute top-0 left-0 bg-bg-main border border-glass-border shadow-2xl rounded-[1.5rem] flex flex-col overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}
        >
          {/* Browser Top Chrome */}
          <div className="bg-bg-surface px-6 py-3 border-b border-glass-border flex items-center justify-between select-none shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="w-[50%] bg-black/10 dark:bg-white/5 rounded-lg py-1 px-4 text-[10px] text-muted text-center font-mono border border-glass-border truncate">
              {url}
            </div>
            <div className="w-16" />
          </div>
          <div className="flex-grow overflow-auto relative select-text custom-scrollbar">
            {children}
          </div>
        </div>
      </div>
    )
  }

  const isMobile = mode === 'mobile'
  const bezelSize = isMobile ? 'border-[12px]' : 'border-[16px]'
  const roundedSize = isMobile ? 'rounded-[2.5rem]' : 'rounded-[2rem]'
  const screenRounded = isMobile ? 'rounded-[1.8rem]' : 'rounded-[1.2rem]'

  return (
    <div 
      style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }} 
      className="relative shrink-0 transition-all duration-300 select-none"
    >
      <div 
        style={{ 
          width: `${width}px`, 
          height: `${height}px`, 
          transform: `scale(${scale})`, 
          transformOrigin: 'top left' 
        }}
        className={`absolute top-0 left-0 bg-slate-950 ${bezelSize} border-slate-900 ${roundedSize} shadow-2xl flex flex-col overflow-hidden`}
      >
        {/* Notch / Camera indicator */}
        {isMobile && orientation === 'portrait' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-xl z-50 flex items-center justify-center">
            <div className="w-12 h-1 bg-slate-800 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-850 rounded-full ml-3" />
          </div>
        )}
        {/* Home Bar indicator */}
        {isMobile && orientation === 'portrait' && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-800 rounded-full z-50" />
        )}
        
        {/* Screen Content Wrapper */}
        <div className={`w-full h-full ${screenRounded} overflow-hidden bg-bg-main relative flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
          {/* Compact Mobile/Tablet Address bar */}
          <div className="bg-bg-surface px-4 py-2 border-b border-glass-border flex items-center justify-center select-none shrink-0">
            <div className="w-[85%] bg-black/10 dark:bg-white/5 rounded-md py-0.5 px-3 text-[8px] text-muted text-center font-mono border border-glass-border truncate">
              {url}
            </div>
          </div>
          <div className="flex-grow overflow-auto relative select-text custom-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [deviceMode, setDeviceMode] = useState("desktop") // desktop, tablet, mobile, multi
  const [previewTheme, setPreviewTheme] = useState("dark") // dark, light
  const [isLandscape, setIsLandscape] = useState(false)
  const [multiZoom, setMultiZoom] = useState(0.4)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mock states inside live preview simulator
  const [activeSubTab, setActiveSubTab] = useState("home") // home, services/features, action
  const [isYearlyPlan, setIsYearlyPlan] = useState(false) // for saas template
  const [cartItems, setCartItems] = useState([]) // for ecom template
  const [selectedDoctor, setSelectedDoctor] = useState("Dr. Sarah Mitchell") // for medical template
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null) // for medical template
  const [bookingConfirmed, setBookingConfirmed] = useState(false) // for medical template

  const filteredTemplates = activeCategory === "All"
    ? templates
    : templates.filter(t => t.category === activeCategory)

  const handleOpenPreview = (template) => {
    setSelectedTemplate(template)
    setDeviceMode("desktop")
    setPreviewTheme("dark")
    setIsLandscape(false)
    setActiveSubTab("home")
    // Reset simulated states
    setIsYearlyPlan(false)
    setCartItems([])
    setSelectedTimeSlot(null)
    setBookingConfirmed(false)
  }

  const handleClosePreview = () => {
    setSelectedTemplate(null)
  }

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  // Parameterized template preview engine
  const renderTemplateContent = (template, viewMode = "desktop") => {
    if (template.id === "medvitals" || template.id === "simplecafe") {
      return (
        <iframe 
          src={template.liveUrl} 
          className="w-full h-full border-none flex-grow min-h-[400px]" 
          title={template.title}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      )
    }

    const type = template.previewData.type

    if (type === "medical") {
      return (
        <div className="w-full min-h-full flex flex-col text-main bg-bg-main font-sans">
          {/* Simulated Medical Nav */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-glass-border">
            <span className="font-black italic text-sm text-primary">MedVitals+</span>
            {viewMode === 'mobile' ? (
              <button className="p-1 text-muted hover:text-primary"><Menu size={16} /></button>
            ) : (
              <div className="flex gap-4 text-[9px] font-bold uppercase tracking-wider text-muted">
                <span className="text-primary">Home</span>
                <span>Services</span>
                <span>Doctors</span>
              </div>
            )}
          </div>

          {/* Hero Section */}
          <div className="p-8 text-center border-b border-glass-border relative overflow-hidden bg-bg-surface">
            <span className="px-2 py-1 bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest rounded-full">
              Synaptic Clinic Architecture
            </span>
            <h4 className={`font-black italic tracking-tighter uppercase mt-4 mb-3 ${viewMode === 'mobile' ? 'text-lg' : 'text-2xl'}`}>
              {template.previewData.tagline}
            </h4>
            <p className="text-[10px] text-muted max-w-md mx-auto mb-5 leading-normal">
              Connect patients to medical specialists in real-time. Full record sync with Zero-latency scheduling pipelines.
            </p>
            <button 
              onClick={() => setActiveSubTab("action")}
              className="px-5 py-2.5 rounded-full bg-primary text-black font-black uppercase text-[8px] tracking-wider"
            >
              Book Appointment Node
            </button>
          </div>

          {/* Interactive Sub-Tabs */}
          <div className="flex border-b border-glass-border text-center text-[10px] font-black uppercase shrink-0">
            <button
              onClick={() => setActiveSubTab("home")}
              className={`flex-1 py-3 border-r border-glass-border ${activeSubTab === "home" ? "bg-primary/5 text-primary border-b-2 border-b-primary" : "text-muted"}`}
            >
              Clinical Services
            </button>
            <button
              onClick={() => setActiveSubTab("action")}
              className={`flex-1 py-3 ${activeSubTab === "action" ? "bg-primary/5 text-primary border-b-2 border-b-primary" : "text-muted"}`}
            >
              Simulated Booking Portal
            </button>
          </div>

          {/* Interactive Page Content */}
          <div className="p-5 flex-grow">
            {activeSubTab === "home" ? (
              <div>
                <h5 className="text-[10px] font-black uppercase tracking-wider text-primary mb-4">Featured Specializations</h5>
                <div className={`grid gap-3 mb-6 ${viewMode === 'desktop' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {template.previewData.services.map((serv, idx) => (
                    <div key={idx} className="p-3 border border-glass-border rounded-xl bg-bg-surface flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary shrink-0">
                        0{idx + 1}
                      </div>
                      <span className="text-[9px] font-black uppercase leading-tight">{serv}</span>
                    </div>
                  ))}
                </div>
                <h5 className="text-[10px] font-black uppercase tracking-wider text-primary mb-4">Patient Resonance</h5>
                <div className="space-y-3">
                  {template.previewData.reviews.map((rev, idx) => (
                    <div key={idx} className="p-4 border border-glass-border rounded-2xl bg-bg-surface/50">
                      <p className="text-[9px] italic text-muted leading-normal mb-2">"{rev.text}"</p>
                      <span className="text-[8px] font-black text-main uppercase">— {rev.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-sm mx-auto">
                {bookingConfirmed ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                      <Check size={22} />
                    </div>
                    <h5 className="font-black text-sm mb-2">Node Booked Successfully</h5>
                    <p className="text-[10px] text-muted leading-relaxed mb-6">
                      Patient vector mapped with **{selectedDoctor}** on **{selectedTimeSlot}**. Auto-syncing WhatsApp protocol is initialized.
                    </p>
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="px-6 py-2 rounded-full border border-glass-border text-[8px] font-black uppercase tracking-wider"
                    >
                      Reset Schedule Node
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[8px] font-black uppercase text-muted tracking-wider block mb-1.5">Select Medical Specialist</label>
                      <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        className="w-full bg-bg-surface border border-glass-border rounded-xl px-3 py-2 text-[10px] font-bold outline-none focus:border-primary text-main"
                      >
                        <option value="Dr. Sarah Mitchell">Dr. Sarah Mitchell (Neurologist)</option>
                        <option value="Dr. Arthur Vance">Dr. Arthur Vance (Cardiologist)</option>
                        <option value="Dr. Elena Rostov">Dr. Elena Rostov (Psychiatrist)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[8px] font-black uppercase text-muted tracking-wider block mb-1.5">Select Temporal Coordinate (Time)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["09:00 AM", "11:30 AM", "02:00 PM"].map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 rounded-lg border text-[8px] font-black tracking-tighter transition-all ${
                              selectedTimeSlot === slot
                                ? "bg-primary border-primary text-black"
                                : "border-glass-border bg-bg-surface hover:bg-black/5"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      disabled={!selectedTimeSlot}
                      onClick={() => setBookingConfirmed(true)}
                      className="w-full py-3 rounded-xl bg-primary text-black font-black uppercase text-[9px] tracking-wider disabled:opacity-20 shadow-md shadow-primary/20 mt-4"
                    >
                      Initialize WhatsApp Booking
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )
    }

    if (type === "saas") {
      return (
        <div className="w-full min-h-full flex flex-col text-main bg-bg-main font-sans">
          <div className="px-6 py-4 flex items-center justify-between border-b border-glass-border bg-bg-surface">
            <span className="font-black italic text-sm text-secondary">ApexSaaS_</span>
            {viewMode === 'mobile' ? (
              <button className="p-1 text-muted hover:text-secondary"><Menu size={16} /></button>
            ) : (
              <div className="flex gap-4 text-[9px] font-bold uppercase tracking-wider text-muted">
                <span className="text-secondary">Infrastructure</span>
                <span>Nodes</span>
                <span>Pricing</span>
              </div>
            )}
          </div>

          {/* Interactive Sub-Tabs */}
          <div className="flex border-b border-glass-border text-center text-[10px] font-black uppercase shrink-0">
            <button
              onClick={() => setActiveSubTab("home")}
              className={`flex-1 py-3 border-r border-glass-border ${activeSubTab === "home" ? "bg-secondary/5 text-secondary border-b-2 border-b-secondary" : "text-muted"}`}
            >
              Features Blueprint
            </button>
            <button
              onClick={() => setActiveSubTab("action")}
              className={`flex-1 py-3 ${activeSubTab === "action" ? "bg-secondary/5 text-secondary border-b-2 border-b-secondary" : "text-muted"}`}
            >
              Pricing Sandbox
            </button>
          </div>

          <div className="p-6 flex-grow flex flex-col justify-center">
            {activeSubTab === "home" ? (
              <div className="space-y-6">
                <div className="text-center max-w-sm mx-auto">
                  <h4 className={`font-black uppercase italic tracking-tighter mb-2 ${viewMode === 'mobile' ? 'text-lg' : 'text-2xl'}`}>
                    Cloud Neural Mesh
                  </h4>
                  <p className="text-[10px] text-muted leading-relaxed">
                    Run containerized layouts with deep conversion tracking models active on every client cluster.
                  </p>
                </div>
                <div className={`grid gap-3 ${viewMode === 'desktop' ? 'grid-cols-3' : viewMode === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {template.previewData.features.map((feat, idx) => (
                    <div key={idx} className="p-4 border border-glass-border rounded-2xl bg-bg-surface hover:border-secondary/30 transition-colors">
                      <div className="w-7 h-7 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary mb-3 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <h5 className="text-[9px] font-black uppercase mb-1">{feat.title}</h5>
                      <p className="text-[8px] text-muted leading-normal">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto w-full">
                {/* Monthly / Yearly Toggle */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className={`text-[9px] font-black uppercase ${!isYearlyPlan ? "text-secondary" : "text-muted"}`}>Monthly Bill</span>
                  <button
                    onClick={() => setIsYearlyPlan(!isYearlyPlan)}
                    className="w-12 h-6 rounded-full bg-black/10 dark:bg-white/5 border border-glass-border flex items-center px-1 transition-colors"
                  >
                    <div className={`w-4 h-4 rounded-full bg-secondary transition-transform ${isYearlyPlan ? "translate-x-6" : ""}`} />
                  </button>
                  <span className={`text-[9px] font-black uppercase ${isYearlyPlan ? "text-secondary" : "text-muted"}`}>
                    Annual Core <span className="text-[8px] bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-black ml-1">Save 20%</span>
                  </span>
                </div>

                <div className={`grid gap-4 ${viewMode === 'desktop' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {template.previewData.plans.map((plan, idx) => (
                    <div key={idx} className={`p-5 rounded-2xl border ${idx === 1 ? "border-secondary/30 bg-secondary/5" : "border-glass-border bg-bg-surface"} flex flex-col`}>
                      <span className="text-[9px] font-black uppercase text-muted tracking-wider block mb-1">{plan.name}</span>
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-black italic text-main">
                          ${isYearlyPlan ? plan.priceYearly : plan.priceMonthly}
                        </span>
                        <span className="text-[9px] text-muted font-bold">/mo</span>
                      </div>
                      <ul className="space-y-2 mb-6 flex-grow">
                        {plan.specs.slice(0, viewMode === 'mobile' ? 2 : 3).map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2 text-[9px] font-bold text-muted">
                            <Check size={10} className="text-secondary shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                      <button className={`w-full py-2.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${idx === 1 ? "bg-secondary text-white" : "border border-glass-border text-main hover:bg-black/5"}`}>
                        Deploy Node
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (type === "ecommerce") {
      return (
        <div className="w-full min-h-full flex flex-col text-main bg-bg-main font-sans">
          <div className="px-6 py-4 flex items-center justify-between border-b border-glass-border bg-bg-surface sticky top-0 z-10">
            <span className="font-black italic text-sm text-primary">NomadShop_</span>
            
            {/* Simulated Cart Badge */}
            <div className="relative cursor-pointer p-1" onClick={() => setActiveSubTab("action")}>
              <ShoppingCart size={16} className={cartItems.length > 0 ? "text-primary" : "text-main"} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-black rounded-full text-[8px] font-black flex items-center justify-center">
                  {cartItems.reduce((acc, i) => acc + i.qty, 0)}
                </span>
              )}
            </div>
          </div>

          {/* Interactive Sub-Tabs */}
          <div className="flex border-b border-glass-border text-center text-[10px] font-black uppercase shrink-0">
            <button
              onClick={() => setActiveSubTab("home")}
              className={`flex-1 py-3 border-r border-glass-border ${activeSubTab === "home" ? "bg-primary/5 text-primary border-b-2 border-b-primary" : "text-muted"}`}
            >
              Simulated Shop
            </button>
            <button
              onClick={() => setActiveSubTab("action")}
              className={`flex-1 py-3 ${activeSubTab === "action" ? "bg-primary/5 text-primary border-b-2 border-b-primary" : "text-muted"}`}
            >
              Slide Cart ({cartItems.reduce((acc, i) => acc + i.qty, 0)})
            </button>
          </div>

          <div className="p-6 flex-grow">
            {activeSubTab === "home" ? (
              <div>
                <div className="text-center max-w-sm mx-auto mb-6">
                  <h4 className="text-xl font-black uppercase italic tracking-tighter">
                    Technical Inventory
                  </h4>
                  <p className="text-[10px] text-muted">
                    Curated hardware and apparel. Experience instant cart state updates below.
                  </p>
                </div>
                <div className={`grid gap-3 ${viewMode === 'desktop' ? 'grid-cols-3' : viewMode === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {template.previewData.products.map((prod) => (
                    <div key={prod.id} className="p-3 border border-glass-border rounded-2xl bg-bg-surface flex flex-col group/prod">
                      <div className="relative h-28 rounded-xl overflow-hidden mb-3 bg-black/10 bg-opacity-20">
                        <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover/prod:scale-105 transition-transform" />
                      </div>
                      <h5 className="text-[9px] font-black uppercase mb-1 leading-tight">{prod.name}</h5>
                      <div className="flex items-center justify-between mt-auto pt-2">
                        <span className="text-[10px] font-mono font-bold">₹{prod.price.toLocaleString("en-IN")}</span>
                        <button
                          onClick={() => addToCart(prod)}
                          className="px-3 py-1 rounded bg-primary text-black font-black uppercase text-[8px] tracking-wide"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-sm mx-auto w-full">
                <h5 className="text-xs font-black uppercase tracking-wider text-primary mb-4">Synaptic Shopping Cart</h5>
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={32} className="text-muted/40 mx-auto mb-4 animate-pulse" />
                    <p className="text-[10px] text-muted uppercase">Your Cart Node is empty</p>
                    <button
                      onClick={() => setActiveSubTab("home")}
                      className="mt-4 px-4 py-2 bg-primary text-black text-[9px] font-black uppercase rounded-full tracking-wider"
                    >
                      Go Back to Shop
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="divide-y divide-glass-border max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                      {cartItems.map((item) => (
                        <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/10 shrink-0">
                              <img src={item.img} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h6 className="text-[9px] font-black uppercase leading-tight text-main">{item.name}</h6>
                              <span className="text-[8px] font-mono text-muted">₹{item.price} x {item.qty}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-black text-main">
                            ₹{(item.price * item.qty).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-glass-border">
                      <div className="flex justify-between items-center text-xs font-bold mb-6">
                        <span className="text-muted uppercase">Total Weight</span>
                        <span className="text-lg font-black text-primary font-mono">
                          ₹{cartItems.reduce((acc, i) => acc + (i.price * i.qty), 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          alert("Simulated Checkout Protocol Initialized. Connecting Stripe Nodes...")
                          setCartItems([])
                        }}
                        className="w-full py-3 rounded-xl bg-primary text-black font-black uppercase text-[9px] tracking-wider shadow-md shadow-primary/20"
                      >
                        Initialize Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )
    }

    if (type === "portfolio") {
      return (
        <div className="w-full min-h-full flex flex-col text-main bg-[#030712] font-sans dark">
          <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
            <span className="font-black italic text-xs text-white tracking-[0.2em]">Vanguard.OS</span>
            <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.3em]">Synaptic_Network</span>
          </div>

          {/* Interactive Sub-Tabs */}
          <div className="flex border-b border-white/5 text-center text-[10px] font-black uppercase shrink-0">
            <button
              onClick={() => setActiveSubTab("home")}
              className={`flex-1 py-3 border-r border-white/5 ${activeSubTab === "home" ? "bg-white/5 text-white border-b-2 border-b-white" : "text-white/40"}`}
            >
              Blueprints
            </button>
            <button
              onClick={() => setActiveSubTab("action")}
              className={`flex-1 py-3 ${activeSubTab === "action" ? "bg-white/5 text-white border-b-2 border-b-white" : "text-white/40"}`}
            >
              Neural Terminal
            </button>
          </div>

          <div className="p-6 flex-grow flex flex-col justify-center">
            {activeSubTab === "home" ? (
              <div className="space-y-6">
                <div className="text-center max-w-sm mx-auto">
                  <span className="text-[8px] font-mono text-white/40 uppercase tracking-[0.4em] block mb-2">Portfolio_Core</span>
                  <h4 className="text-xl font-black uppercase italic tracking-tighter text-white mb-2 leading-tight">
                    {template.previewData.tagline}
                  </h4>
                  <p className="text-[9px] text-white/50 leading-relaxed">
                    Explore dynamic case studies structured for client resonance. Zero jank animation tracks.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-[8px] font-black uppercase text-white/40 tracking-wider">Engineered Projects</h5>
                  {template.previewData.projects.map((proj, idx) => (
                    <div key={idx} className="p-3 border border-white/5 rounded-xl bg-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center font-mono text-[9px] text-white font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-[9px] font-black uppercase text-white">{proj.title}</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/40 uppercase bg-white/5 px-2 py-0.5 rounded">{proj.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-sm mx-auto w-full bg-black/60 rounded-2xl border border-white/5 p-5 font-mono text-[9px] text-white/70">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2 text-[8px] text-white/40">
                  <span>TERMINAL_RESONANCE_v1.0</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                  </div>
                </div>
                <div className="space-y-1.5 h-[120px] overflow-hidden flex flex-col justify-end">
                  <div>[SYS] Launching Gsap ScrollTrigger...</div>
                  <div>[SYS] Syncing Lenis virtual scroll core...</div>
                  <div className="text-white font-bold">[SYS] Dynamic cursor magnetic attraction active</div>
                  <div className="text-primary font-bold animate-pulse">&gt; Active_State: Nominally Aligned</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
  }

  return (
    <section id="templates" className="py-24 px-6 max-w-7xl mx-auto w-full relative">
      <div className="text-center mb-16">
        <span className="text-primary font-mono text-xs tracking-widest mb-4 block uppercase font-bold">Design Prototypes</span>
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.85] mb-6">
          Example <span className="text-gradient">Templates</span>
        </h2>
        <p className="text-muted max-w-2xl mx-auto font-medium text-lg">
          Click any blueprint design below to explore our **Interactive Live Simulator**. Zero latency deployment frameworks ready for your business.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
              activeCategory === cat
                ? "bg-primary text-black shadow-lg shadow-primary/20 scale-[1.03]"
                : "bg-white/5 border border-glass-border text-muted hover:bg-white/10 hover:text-main"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <motion.div
              layout
              key={template.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 22 }}
              className="glass-card flex flex-col group"
            >
              <div className="relative h-64 rounded-[2rem] overflow-hidden mb-8 border border-glass-border bg-black/20">
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-bg-main/90 backdrop-blur-md text-[9px] font-black text-primary border border-glass-border uppercase tracking-widest">
                  {template.category}
                </span>
              </div>

              <div className="flex-grow flex flex-col">
                <h3 className="text-2xl font-black mb-3 italic tracking-tight uppercase">{template.title}</h3>
                <p className="text-sm text-muted mb-6 leading-relaxed flex-grow">{template.desc}</p>

                <div className="space-y-2 mb-8">
                  {template.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-muted">
                      <ShieldCheck size={14} className="text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-glass-border mt-auto">
                  <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">{template.metrics}</span>
                  <button
                    onClick={() => handleOpenPreview(template)}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-main hover:text-primary transition-colors group/btn"
                  >
                    Interactive Preview <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Simulator Modal Frame */}
      <AnimatePresence>
        {selectedTemplate && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePreview}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Simulation Canvas Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full h-[95vh] md:h-[90vh] bg-bg-main border border-glass-border rounded-[2.5rem] md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden z-20"
            >
              {/* Simulator Control Header */}
              <div className="flex flex-wrap items-center justify-between px-6 py-4 md:px-8 md:py-5 border-b border-glass-border bg-bg-surface gap-3 shrink-0">
                {/* Left Brand Area */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-black font-black italic shadow-md shadow-primary/10">
                    Z
                  </div>
                  <div className="hidden sm:block">
                    <h3 className="text-xs md:text-sm font-black uppercase text-main">{selectedTemplate.title}</h3>
                    <p className="text-[8px] md:text-[9px] font-mono text-muted uppercase">Interactive Live Sandbox Protocol</p>
                  </div>
                </div>

                {/* Middle Device Selector Controls */}
                <div className="flex items-center bg-black/10 dark:bg-white/5 rounded-full p-1 border border-glass-border">
                  <button
                    onClick={() => setDeviceMode("desktop")}
                    className={`p-2 rounded-full transition-all ${deviceMode === "desktop" ? "bg-primary text-black scale-105" : "text-muted hover:text-main"}`}
                    title="Desktop Preview"
                  >
                    <Monitor size={13} />
                  </button>
                  <button
                    onClick={() => setDeviceMode("tablet")}
                    className={`p-2 rounded-full transition-all ${deviceMode === "tablet" ? "bg-primary text-black scale-105" : "text-muted hover:text-main"}`}
                    title="Tablet Preview"
                  >
                    <Tablet size={13} />
                  </button>
                  <button
                    onClick={() => setDeviceMode("mobile")}
                    className={`p-2 rounded-full transition-all ${deviceMode === "mobile" ? "bg-primary text-black scale-105" : "text-muted hover:text-main"}`}
                    title="Mobile Portrait Preview"
                  >
                    <Smartphone size={13} />
                  </button>
                  <button
                    onClick={() => setDeviceMode("multi")}
                    className={`p-2 rounded-full transition-all ${deviceMode === "multi" ? "bg-primary text-black scale-105" : "text-muted hover:text-main"}`}
                    title="Synchronized Multi-Device View"
                  >
                    <Layers size={13} />
                  </button>
                </div>

                {/* Right Interactive Controls */}
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Zoom Slider for Multi-Device */}
                  {deviceMode === 'multi' && (
                    <div className="hidden lg:flex items-center gap-2 bg-black/10 dark:bg-white/5 border border-glass-border px-3 py-1.5 rounded-full shrink-0">
                      <span className="text-[8px] font-mono text-muted uppercase">Zoom: {Math.round(multiZoom * 100)}%</span>
                      <input
                        type="range"
                        min="0.25"
                        max="0.80"
                        step="0.05"
                        value={multiZoom}
                        onChange={(e) => setMultiZoom(parseFloat(e.target.value))}
                        className="w-16 accent-primary h-1 bg-black/20 dark:bg-white/10 rounded-lg cursor-pointer"
                      />
                    </div>
                  )}

                  {/* Orientation Rotate Toggle */}
                  {(deviceMode === 'mobile' || deviceMode === 'tablet') && (
                    <button
                      onClick={() => setIsLandscape(prev => !prev)}
                      className={`p-2 rounded-full border border-glass-border bg-black/10 dark:bg-white/5 transition-all active:scale-90 ${isLandscape ? 'text-primary border-primary/30' : 'text-muted hover:text-main'}`}
                      title="Rotate Orientation"
                    >
                      <RotateCw size={13} className={`transition-transform duration-300 ${isLandscape ? 'rotate-90' : ''}`} />
                    </button>
                  )}

                  {/* Preview Theme Toggler */}
                  <button
                    onClick={() => setPreviewTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-full bg-black/10 dark:bg-white/5 text-muted hover:text-main border border-glass-border transition-all active:scale-90"
                    title={`Switch to ${previewTheme === 'dark' ? 'Light' : 'Dark'} Preview Theme`}
                  >
                    {previewTheme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
                  </button>

                  {/* External Live Link */}
                  {selectedTemplate.liveUrl && (
                    <a
                      href={selectedTemplate.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-black/10 dark:bg-white/5 text-muted hover:text-main border border-glass-border transition-all hover:scale-105"
                      title="Open Live Website in New Tab"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <a
                    href="#contact"
                    onClick={() => {
                      const contactFormMessage = document.getElementById("contact-message")
                      if (contactFormMessage) {
                        contactFormMessage.value = `Hi ZenByteLabs,\\n\\nI am interested in using the "${selectedTemplate.title}" design template blueprint for my website project.\\n\\nPlease share availability for starting this week.`
                      }
                      handleClosePreview()
                    }}
                    className="px-4 py-2 rounded-full bg-primary text-black font-black uppercase text-[8px] md:text-[9px] tracking-wider hover:scale-[1.03] active:scale-95 transition-all shadow-md shadow-primary/10 shrink-0"
                  >
                    Get Template
                  </a>
                  <button
                    onClick={handleClosePreview}
                    className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/5 flex items-center justify-center text-muted hover:text-main hover:bg-black/20 dark:hover:bg-white/10 transition-colors shrink-0"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Simulator Display Body Canvas */}
              <div className="flex-grow bg-slate-950/40 p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center overflow-auto custom-scrollbar">
                {deviceMode === 'multi' ? (
                  /* Multi-Device Side-by-Side Synchronized Preview */
                  <div className="flex gap-8 overflow-x-auto w-full h-full items-center p-4 justify-start xl:justify-center custom-scrollbar">
                    {/* Desktop frame */}
                    <div className="flex flex-col items-center gap-2.5 shrink-0">
                      <span className="text-[9px] font-mono text-muted uppercase flex items-center gap-1.5">
                        <Monitor size={11} className="text-primary" /> Desktop View (1200px)
                      </span>
                      <DeviceFrame 
                        mode="desktop" 
                        orientation="portrait" 
                        theme={previewTheme} 
                        windowWidth={windowWidth}
                        customScale={multiZoom}
                        title={selectedTemplate.title}
                        url={selectedTemplate.liveUrl}
                      >
                        {renderTemplateContent(selectedTemplate, "desktop")}
                      </DeviceFrame>
                    </div>

                    {/* Tablet frame */}
                    <div className="flex flex-col items-center gap-2.5 shrink-0">
                      <span className="text-[9px] font-mono text-muted uppercase flex items-center gap-1.5">
                        <Tablet size={11} className="text-primary" /> Tablet View (768px)
                      </span>
                      <DeviceFrame 
                        mode="tablet" 
                        orientation="portrait" 
                        theme={previewTheme} 
                        windowWidth={windowWidth}
                        customScale={multiZoom}
                        title={selectedTemplate.title}
                        url={selectedTemplate.liveUrl}
                      >
                        {renderTemplateContent(selectedTemplate, "tablet")}
                      </DeviceFrame>
                    </div>

                    {/* Mobile frame */}
                    <div className="flex flex-col items-center gap-2.5 shrink-0">
                      <span className="text-[9px] font-mono text-muted uppercase flex items-center gap-1.5">
                        <Smartphone size={11} className="text-primary" /> Mobile View (375px)
                      </span>
                      <DeviceFrame 
                        mode="mobile" 
                        orientation="portrait" 
                        theme={previewTheme} 
                        windowWidth={windowWidth}
                        customScale={multiZoom}
                        title={selectedTemplate.title}
                        url={selectedTemplate.liveUrl}
                      >
                        {renderTemplateContent(selectedTemplate, "mobile")}
                      </DeviceFrame>
                    </div>
                  </div>
                ) : (
                  /* Single Device Preview with bezel and dynamic scaling */
                  <DeviceFrame 
                    mode={deviceMode} 
                    orientation={isLandscape ? "landscape" : "portrait"} 
                    theme={previewTheme} 
                    windowWidth={windowWidth}
                    title={selectedTemplate.title}
                    url={selectedTemplate.liveUrl}
                  >
                    {renderTemplateContent(selectedTemplate, deviceMode)}
                  </DeviceFrame>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Templates
