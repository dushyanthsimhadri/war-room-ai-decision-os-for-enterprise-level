import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Zap, Brain, TrendingUp, Shield, BarChart3,
  Users, CheckCircle, GitMerge, FileText, Play, X,
  Database, GitBranch, Cpu, Award
} from 'lucide-react'
import { AI_EMPLOYEES } from '@/data/mockData'

const stats = [
  { value: '10x', label: 'Faster Executive Decisions' },
  { value: '93%', label: 'Average Forecast Accuracy' },
  { value: '₹420 Cr', label: 'Demo Corporate Revenue' },
  { value: '97%', label: 'Compliance Audit Score' },
]

const TABLE_POSITIONS = [
  { angle: 0, x: 50, y: 0 },
  { angle: 45, x: 85, y: 15 },
  { angle: 90, x: 100, y: 50 },
  { angle: 135, x: 85, y: 85 },
  { angle: 180, x: 50, y: 100 },
  { angle: 225, x: 15, y: 85 },
  { angle: 270, x: 0, y: 50 },
  { angle: 315, x: 15, y: 15 },
]

export function Landing() {
  const navigate = useNavigate()
  const executives = AI_EMPLOYEES.slice(0, 8)

  const [showVideo, setShowVideo] = useState(false)
  const [showArch, setShowArch] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  // Autoplay visual timeline step highlights
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 9)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const enterDemo = () => {
    navigate('/finance?demo=true&wow=true')
  }

  const timelineSteps = [
    { label: 'Business Question', desc: 'User submits a strategic query like: "Should we pay Vendor ABC today?"', icon: '❓' },
    { label: 'Smart Agent Router', desc: 'The system parses the domain context and invites required personnel.', icon: '⚡' },
    { label: 'AI Employees Join', desc: 'CFO, Treasury, Compliance, Auditor, and Tax managers convene.', icon: '👥' },
    { label: 'AI Debate', desc: 'Agents cross-examine data, challenge risk thresholds, and debate live.', icon: '💬' },
    { label: 'Business Analysis', desc: 'Real-time telemetry and cash-flow data sources are parsed.', icon: '📊' },
    { label: 'KPI Impact Prediction', desc: 'Simulates direct impacts on Cash Position, DPO, and Net Profit.', icon: '📈' },
    { label: 'Future Forecast', desc: 'Computes 7D to 1Y projection scenarios (Best, Expected, Worst).', icon: '🔮' },
    { label: 'Executive Brief', desc: 'Compiles a 10-section boardroom memorandum (CFO Brief).', icon: '📄' },
    { label: 'Human Approval', desc: 'The executive reviews, print-exports, and signs off on actions.', icon: '👑' },
  ]

  const liveStatuses = [
    { role: 'Chief Financial Officer', status: 'Online', color: 'var(--accent-emerald)', pulse: true },
    { role: 'Treasury Manager', status: 'Thinking', color: 'var(--accent-amber)', pulse: true },
    { role: 'Compliance Officer', status: 'Reviewing', color: 'var(--accent-indigo)', pulse: true },
    { role: 'Tax Specialist', status: 'Idle', color: 'var(--text-muted)', pulse: false },
    { role: 'Internal Auditor', status: 'Analyzing', color: 'var(--accent-teal)', pulse: true },
    { role: 'Procurement Manager', status: 'Waiting', color: 'var(--text-muted)', pulse: false },
    { role: 'FP&A Analyst', status: 'Idle', color: 'var(--text-muted)', pulse: false },
  ]

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', position: 'relative', overflowX: 'hidden', color: 'var(--text-primary)' }}>
      {/* Glow Effects */}
      <div className="noise-overlay" />
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '90vw', height: '60vw', maxWidth: 1200, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.09) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      {/* Grid pattern background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
        backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0, opacity: 0.8
      }} />

      {/* Header / Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px', borderBottom: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(6,9,15,0.7)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center',
            boxShadow: '0 0 24px rgba(99,102,241,0.3)',
          }}>
            <span style={{ fontSize: 16 }}>⚔️</span>
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em' }}>WAR ROOM</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#how-it-works" style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>How It Works</a>
          <a href="#story" style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Why WAR ROOM</a>
          <span onClick={() => setShowArch(true)} style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Architecture</span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn-primary" onClick={enterDemo} style={{ fontSize: 13, padding: '9px 18px', display: 'flex', alignItems: 'center', gap: 6 }}>
            Launch Demo <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '100px 48px 60px', position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99,
            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 28,
          }}>
            <Zap size={12} style={{ color: 'var(--accent-amber)' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              The World's First AI Decision Operating System
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Outfit', fontSize: 'clamp(44px, 6vw, 84px)', fontWeight: 900,
            lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--text-primary)',
            maxWidth: 1000, margin: '0 auto 24px',
          }}>
            One Question. <br />
            <span className="gradient-text">Multiple AI Minds.</span> <br />
            One Confident Decision.
          </h1>

          <p style={{ fontSize: 20, color: 'var(--text-secondary)', marginBottom: 12, fontWeight: 600 }}>
            Every important business decision deserves a room full of experts.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 40, maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.7 }}>
            What if those experts were autonomous AI executives acting as your CFO, Auditor, Compliance Officer, and Treasury leads? Compiling consensus, auditing records, and building forecasts in 30 seconds.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <motion.button
              className="btn-primary"
              onClick={enterDemo}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}
              whileTap={{ scale: 0.98 }}
              style={{ fontSize: 16, padding: '14px 34px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 12 }}
            >
              🚀 Enter Demo
            </motion.button>
            <button
              className="btn-ghost"
              onClick={() => setShowVideo(true)}
              style={{ fontSize: 16, padding: '14px 28px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Play size={16} fill="currentColor" /> Watch 2 Minute Demo
            </button>
            <button
              className="btn-ghost"
              onClick={() => setShowArch(true)}
              style={{ fontSize: 16, padding: '14px 28px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <FileText size={16} /> View Architecture
            </button>
          </div>
        </motion.div>
      </section>

      {/* Main Interactive Interactive Visual Section */}
      <section style={{ padding: '20px 48px 80px', display: 'flex', gap: 40, maxWidth: 1300, margin: '0 auto', zIndex: 1, position: 'relative' }}>
        
        {/* Left Column: Live AI Status Indicator Panel */}
        <div style={{ width: 340, flexShrink: 0 }}>
          <div className="card" style={{ padding: 24, background: 'rgba(10,14,22,0.5)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Cpu size={16} style={{ color: 'var(--accent-indigo)' }} />
              <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Executive Status</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {liveStatuses.map((stat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 16 }}>💼</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{stat.role}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {stat.pulse && (
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%', background: stat.color,
                        animation: 'pulse 1.5s infinite ease-in-out'
                      }} />
                    )}
                    <span style={{ fontSize: 11, fontWeight: 700, color: stat.color }}>{stat.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Dynamic Animated Debate Orbit */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', width: 440, height: 440 }}
          >
            {/* Table Core */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 180, height: 180, borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, rgba(6,9,15,0.85) 80%)',
              border: '1px solid rgba(99,102,241,0.25)',
              boxShadow: '0 0 60px rgba(99,102,241,0.15), inset 0 0 24px rgba(99,102,241,0.08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ fontFamily: 'Outfit', fontSize: 12, fontWeight: 900, color: 'var(--accent-indigo)', letterSpacing: '0.1em' }}>AI DECISION</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 12, fontWeight: 900, color: 'var(--accent-indigo)', letterSpacing: '0.1em' }}>OS</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center', lineHeight: 1.4 }}>
                Real-time consensus
              </div>
            </div>

            {/* Orbit ring */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: 320, height: 320, borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.04)'
            }} />

            {/* Executives Orbits */}
            {executives.map((agent, i) => {
              const pos = TABLE_POSITIONS[i]
              const radius = 160
              const angle = (i / executives.length) * 2 * Math.PI - Math.PI / 2
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <motion.div
                  key={agent.id}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'rgba(10,14,22,0.8)', border: `2px solid ${agent.color}45`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 0 16px ${agent.color}20`, backdropFilter: 'blur(8px)'
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{agent.avatar}</span>
                  </motion.div>
                  <div style={{ textAlign: 'center', marginTop: 4, fontSize: 9, fontWeight: 700, color: agent.color }}>
                    {agent.role}
                  </div>
                </motion.div>
              )
            })}

            {/* Glowing active line connections */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 440 440">
              {executives.slice(0, 4).map((agent, i) => {
                const angle = (i / executives.length) * 2 * Math.PI - Math.PI / 2
                const r1 = 90
                const r2 = 160
                const x1 = 220 + Math.cos(angle) * r1
                const y1 = 220 + Math.sin(angle) * r1
                const x2 = 220 + Math.cos(angle) * r2
                const y2 = 220 + Math.sin(angle) * r2
                return (
                  <motion.line
                    key={agent.id}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={agent.color} strokeWidth={1} strokeOpacity={0.4}
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: i * 0.8 }}
                  />
                )
              })}
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Stats Indicator Row */}
      <section style={{
        background: 'rgba(10,14,22,0.4)', borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)', padding: '36px 48px', backdropFilter: 'blur(16px)'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="number-font gradient-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em' }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Timeline: How It Works */}
      <section id="how-it-works" style={{ padding: '80px 48px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Decision Assembly Pipeline<br />
            <span className="gradient-text">How WAR ROOM Operates</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto' }}>
            A deterministic multi-agent pipeline resolving strategic proposals in nine key stages.
          </p>
        </div>

        {/* Timeline Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 1100, margin: '0 auto' }}>
          {timelineSteps.map((step, i) => {
            const isActive = activeStep === i
            return (
              <motion.div
                key={i}
                className="card"
                animate={{
                  borderColor: isActive ? 'rgba(99,102,241,0.45)' : 'var(--border-subtle)',
                  background: isActive ? 'rgba(99,102,241,0.04)' : 'rgba(255,255,255,0.01)',
                  boxShadow: isActive ? '0 0 24px rgba(99,102,241,0.08)' : 'none'
                }}
                transition={{ duration: 0.3 }}
                style={{ padding: '20px 24px', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: isActive ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Stage 0{i + 1}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: isActive ? 'var(--accent-indigo)' : 'var(--text-primary)' }}>{step.label}</span>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{step.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Founder Story Section */}
      <section id="story" style={{
        padding: '100px 48px', borderTop: '1px solid var(--border-subtle)',
        background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.02))'
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99,
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', marginBottom: 20
          }}>
            <Award size={12} style={{ color: 'var(--accent-emerald)' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>Founder Story</span>
          </div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>
            Why I Built WAR ROOM
          </h2>
          
          <div style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontWeight: 600, fontSize: 18, color: 'var(--text-primary)', borderLeft: '3px solid var(--accent-indigo)', paddingLeft: 16 }}>
              "Meetings don't make decisions. People do."
            </p>
            <p>
              But before every important decision, leaders spend hours gathering information, waiting for updates, reading dashboards, and aligning departments.
            </p>
            <p>
              I wanted to build a system where AI executives collaborate, challenge each other, forecast outcomes, and recommend the best decision before the meeting even begins.
            </p>
            <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
              WAR ROOM isn't designed to replace leaders. It exists to help leaders make better decisions faster.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section style={{
        textAlign: 'center', padding: '80px 48px', borderTop: '1px solid var(--border-subtle)',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 60%)'
      }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
          Experience the Future of Decisions
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
          Convene your autonomous board in less than 30 seconds.
        </p>
        <button
          onClick={enterDemo}
          className="btn-primary"
          style={{ fontSize: 16, padding: '14px 34px', borderRadius: 12, display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          🚀 Enter Interactive Demo
        </button>
      </section>

      {/* Video Demo Modal */}
      <AnimatePresence>
        {showVideo && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24
          }}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="card" style={{ maxWidth: 800, width: '100%', overflow: 'hidden', padding: 0 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>🎥 WAR ROOM — 2 Minute Walkthrough</span>
                <button onClick={() => setShowVideo(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: 'black' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                  <Play size={48} style={{ color: 'var(--accent-indigo)' }} />
                  <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Interactive Demo Sandbox: Explore directly via "Enter Demo" CTA.</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Architecture Modal */}
      <AnimatePresence>
        {showArch && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24
          }}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="card" style={{ maxWidth: 840, width: '100%', overflow: 'hidden', padding: 24 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Database size={16} style={{ color: 'var(--accent-indigo)' }} />
                  <span style={{ fontSize: 15, fontWeight: 700 }}>WAR ROOM System Architecture Map</span>
                </div>
                <button onClick={() => setShowArch(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Architecture diagram mapping */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
                {[
                  { title: 'Data Ingestion Tier', desc: 'Secure feeds sync ERP records, banking API journals, support tickets, and CRM records continuously.', icon: '📡' },
                  { title: 'Smart Router & Graph', desc: 'Active context classification router filters query tags to summon domain-expert AI executive agents.', icon: '🧠' },
                  { title: 'Collaborative Boardroom', desc: 'Agents run peer debates and conflict resolution routines to produce consensus recommendations.', icon: '👥' },
                  { title: 'KPI Simulator Engine', desc: 'Runs impact predictions across 18 operational metrics against a custom forecasting model.', icon: '📈' },
                  { title: 'CFO Memo Generator', desc: 'Translates raw AI logs into a 10-section McKinsey-style board executive summary document.', icon: '📄' },
                  { title: 'Audit Ledger Memory', desc: 'Saves decision outcomes and records actual logs to review prediction accuracy.', icon: '💾' },
                ].map((tier, idx) => (
                  <div key={idx} style={{ padding: '16px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 18, marginBottom: 8 }}>{tier.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{tier.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.45 }}>{tier.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
                Built on React 19 + TypeScript + Vite + Zustand store modules.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)', padding: '32px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: 'var(--text-muted)', fontSize: 12, position: 'relative', zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, color: 'var(--text-primary)' }}>WAR ROOM</span>
          <span>© 2026. AI Decision Operating System.</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security Ledger</span>
        </div>
      </footer>
    </div>
  )
}
