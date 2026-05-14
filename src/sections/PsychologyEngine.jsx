import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Activity, Terminal, Eye, Zap, Database, BarChart3, ShieldCheck, Cpu, MousePointer2, TrendingUp } from 'lucide-react'

const tabs = [
  { id: 'intent', label: 'Intent Analysis', icon: <Eye size={16} />, color: '#00FFD1' },
  { id: 'behavior', label: 'Behavioral Flow', icon: <Zap size={16} />, color: '#8B5CF6' },
  { id: 'prediction', label: 'Conversion Prediction', icon: <Activity size={16} />, color: '#F472B6' },
]

const PsychologyEngine = () => {
  const [activeTab, setActiveTab] = useState('intent')
  const [logs, setLogs] = useState([])
  const [progress, setProgress] = useState(0)
  const [metrics, setMetrics] = useState({ confidence: 98.2, engagement: 84.5 })
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 1) % 100)
      setMetrics({
        confidence: (97 + Math.random() * 2.5).toFixed(1),
        engagement: (80 + Math.random() * 15).toFixed(1)
      })

      const tabLogs = {
        intent: ['Tracking gaze vector', 'Analyzing dwell time', 'Intent probability: HIGH', 'Micro-movement detected'],
        behavior: ['Mapping sequential flow', 'Identifying drop-off nodes', 'Optimizing recursive paths', 'Bot-profile filtering'],
        prediction: ['Neural weight convergence', 'LTV calculation active', 'Conversion funnel optimized', 'Propensity score: 0.941']
      }

      if (Math.random() > 0.6) {
        const currentTabLogs = tabLogs[activeTab]
        const newLog = {
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString().split(' ')[0],
          msg: `[${activeTab.toUpperCase()}] ${currentTabLogs[Math.floor(Math.random() * currentTabLogs.length)]}`
        }
        setLogs(prev => [newLog, ...prev].slice(0, 8))
      }
    }, 800)
    return () => clearInterval(interval)
  }, [activeTab])

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <section id="psych" className="py-24 lg:py-48 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase mb-4 block"
        >
          Neural_Interface_v4.0
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] mb-6">
          The <span className="text-gradient">Psychology</span> Engine
        </h2>
        <p className="text-muted max-w-2xl mx-auto font-medium">Predicting user behavior before they even click. The future of conversion optimization is neural.</p>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="glass-card !p-0 overflow-hidden border-glass-border shadow-2xl shadow-primary/5"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[650px]">
          {/* Sidebar */}
          <div className="lg:col-span-4 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-glass-border bg-black/40 backdrop-blur-xl relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            
            <div className="mb-12 relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Brain className="text-primary" size={16} />
                </div>
                <div className="h-[1px] w-12 bg-primary/20" />
                <span className="text-primary font-mono text-[10px] tracking-widest uppercase">Proprietary_Core</span>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Our engine analyzes <span className="text-main font-bold">micro-interactions</span> to dynamically adapt layouts, maximizing resonance and conversion in real-time.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono text-muted uppercase mb-1">Confidence</div>
                    <div className="text-xl font-black text-primary italic">{metrics.confidence}%</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] font-mono text-muted uppercase mb-1">Engagement</div>
                    <div className="text-xl font-black text-secondary italic">{metrics.engagement}%</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-3xl border transition-all duration-500 group ${activeTab === tab.id
                      ? 'bg-primary border-primary text-black shadow-2xl shadow-primary/30 scale-[1.02]'
                      : 'bg-white/5 border-white/5 text-muted hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-colors duration-500 ${activeTab === tab.id ? 'bg-black/10 text-black' : 'bg-white/5 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                      {tab.icon}
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && (
                    <motion.div layoutId="active-indicator" className="w-2 h-2 rounded-full bg-black shadow-lg" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 text-[10px] font-mono text-muted uppercase">
                    <Cpu size={12} className="text-secondary" />
                    <span>Neural_Weight_v4.2.1</span>
                </div>
            </div>
          </div>

          {/* Visualization Area */}
          <div className="lg:col-span-8 p-6 md:p-10 bg-bg-surface/50 dark:bg-[#050505]/40 relative flex flex-col">
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center opacity-40 font-mono text-[9px] uppercase tracking-[0.2em]">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Status: Nominal
                </span>
                <span>Kernel_Resonance: 0.99{progress % 10}</span>
                <span>Lat: 12ms</span>
              </div>
              <div className="text-primary italic font-black animate-pulse">Live_System_Trace</div>
            </div>

            <div className="flex-grow flex items-center justify-center relative mt-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -10 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                  className="w-full h-full min-h-[400px]"
                >
                  {activeTab === 'intent' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative bg-grid-pattern group">
                        <motion.div 
                            className="absolute w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"
                            animate={{ 
                                left: mousePos.x - 128, 
                                top: mousePos.y - 128 
                            }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                        />
                        <div className="relative text-center z-10">
                            <div className="w-48 h-48 border-2 border-primary/20 rounded-full flex items-center justify-center p-4 relative mb-6">
                                <motion.div 
                                    className="absolute inset-0 border-t-2 border-primary rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                />
                                <Eye size={64} className="text-primary animate-pulse" />
                            </div>
                            <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Intent Detection</h4>
                            <p className="text-muted text-xs font-mono uppercase tracking-[0.3em]">Monitoring Dwell_Space_Vector</p>
                        </div>
                        <div className="absolute bottom-4 left-4 font-mono text-[10px] text-primary/30">
                            Vector_X: {mousePos.x.toFixed(0)} <br />
                            Vector_Y: {mousePos.y.toFixed(0)}
                        </div>
                    </div>
                  )}

                  {activeTab === 'behavior' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                        <svg width="300" height="200" viewBox="0 0 300 200" className="opacity-40">
                            <motion.path
                                d="M 0 100 Q 75 20 150 100 T 300 100"
                                fill="none"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            {[0, 75, 150, 225, 300].map((x, i) => (
                                <motion.circle 
                                    key={i} 
                                    cx={x} 
                                    cy={100 + Math.sin(x/50) * 40} 
                                    r="4" 
                                    fill={i === 2 ? '#8B5CF6' : '#fff'}
                                    animate={{ r: [4, 6, 4] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                />
                            ))}
                        </svg>
                        <div className="mt-8 text-center">
                            <TrendingUp className="text-secondary mx-auto mb-4" size={48} />
                            <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Behavioral Flow</h4>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[9px] font-mono text-secondary uppercase">Node_Optimization_Active</span>
                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-muted uppercase">Recursive_Pathing: OK</span>
                            </div>
                        </div>
                    </div>
                  )}

                  {activeTab === 'prediction' && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                         <div className="relative w-64 h-64 mb-8">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="128"
                                    cy="128"
                                    r="100"
                                    fill="transparent"
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="12"
                                />
                                <motion.circle
                                    cx="128"
                                    cy="128"
                                    r="100"
                                    fill="transparent"
                                    stroke="#F472B6"
                                    strokeWidth="12"
                                    strokeDasharray="628"
                                    initial={{ strokeDashoffset: 628 }}
                                    animate={{ strokeDashoffset: 628 - (628 * (85 + (progress % 10))) / 100 }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-5xl font-black italic text-main">{85 + (progress % 10)}%</span>
                                <span className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">Propensity</span>
                            </div>
                         </div>
                         <h4 className="text-2xl font-black italic tracking-tighter uppercase mb-2">Conversion Prediction</h4>
                         <p className="text-muted text-xs font-mono uppercase tracking-[0.2em]">Analyzing session historical weight</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Terminal Section */}
            <div className="mt-10 bg-black/60 rounded-3xl border border-white/5 p-6 font-mono text-[10px] overflow-hidden shadow-inner backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                  <span className="text-muted flex items-center gap-2">
                    <Terminal size={12} className="text-primary" /> SYSTEM_EXECUTABLE_OUTPUT
                  </span>
                  <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                  </div>
              </div>
              {/* Fixed height and layout transitions to prevent "glitching/jitter" */}
              <div className="space-y-1.5 h-[160px] overflow-hidden flex flex-col pt-2">
                <AnimatePresence mode="popLayout">
                    {logs.map((log) => (
                    <motion.div 
                        key={log.id} 
                        layout
                        initial={{ opacity: 0, x: -5, y: -10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, filter: 'blur(5px)', y: 10 }}
                        transition={{ 
                            layout: { type: 'spring', damping: 25, stiffness: 200 },
                            opacity: { duration: 0.2 }
                        }}
                        className="flex gap-4 items-start"
                    >
                        <span className="text-white/20 shrink-0">[{log.time}]</span>
                        <span className={`${log.msg.includes('HIGH') || log.msg.includes('optimized') ? 'text-primary font-bold' : 'text-muted'}`}>
                            {log.msg}
                        </span>
                    </motion.div>
                    ))}
                </AnimatePresence>
                <motion.div 
                    layout
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-3 bg-primary/40 inline-block mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PsychologyEngine

