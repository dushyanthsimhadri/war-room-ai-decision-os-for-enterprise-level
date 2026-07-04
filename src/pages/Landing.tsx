import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Brain, TrendingUp, Shield, BarChart3, Users, CheckCircle, GitMerge } from 'lucide-react'
import { AI_EMPLOYEES } from '@/data/mockData'

const features = [
  { icon: Brain, title: 'Multi-Mind AI Debates', desc: 'Specialized AI executives debate your decision from every angle — finance, product, legal, marketing, and more.' },
  { icon: TrendingUp, title: 'KPI Impact Prediction', desc: 'Instantly see how each decision affects Revenue, MRR, Churn, NPS, and 12+ metrics before you commit.' },
  { icon: BarChart3, title: 'Future Forecast Engine', desc: 'AI forecasts business outcomes at 7D, 30D, 90D, 6M, and 1Y horizons with confidence scores.' },
  { icon: GitMerge, title: 'Scenario Simulator', desc: 'Run "Build it / Delay / Reject" scenarios side-by-side and pick the path with the best risk-adjusted return.' },
  { icon: Shield, title: 'Decision Memory', desc: 'Every decision is stored, tracked, and compared against actual outcomes — improving over time.' },
  { icon: Users, title: 'Smart Agent Router', desc: 'AI automatically identifies which executives are relevant to your question. No manual setup required.' },
]

const stats = [
  { value: '10x', label: 'Faster decisions' },
  { value: '87%', label: 'Avg confidence score' },
  { value: '$2.4M', label: 'Avg value unlocked per session' },
  { value: '6 min', label: 'Avg session duration' },
]

// Round table positions for 8 agents
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

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <div className="noise-overlay" />

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '80vw',
        maxWidth: 1000,
        maxHeight: 1000,
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        borderBottom: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(6,9,15,0.8)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99,102,241,0.4)',
          }}>
            <span style={{ fontSize: 18 }}>⚔️</span>
          </div>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: 20, letterSpacing: '-0.03em' }}>WAR ROOM</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Features', 'How It Works', 'Pricing', 'Case Studies'].map((item) => (
            <span key={item} style={{ color: 'var(--text-secondary)', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="btn-ghost" onClick={() => navigate('/dashboard')} style={{ fontSize: 14, padding: '8px 18px' }}>
            Sign In
          </button>
          <button className="btn-primary" onClick={() => navigate('/dashboard')} style={{ fontSize: 14, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 6 }}>
            Enter WAR ROOM <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: '100px 48px 60px', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 99,
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.25)',
            marginBottom: 32,
          }}>
            <Zap size={12} style={{ color: 'var(--accent-amber)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent-indigo)' }}>
              AI Decision Operating System · Series B Ready
            </span>
          </div>

          <h1 style={{
            fontFamily: 'Outfit',
            fontSize: 'clamp(48px, 6vw, 88px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
            marginBottom: 16,
            maxWidth: 900,
            margin: '0 auto 24px',
          }}>
            Every important business<br />
            <span className="gradient-text">decision deserves</span><br />
            a room full of experts.
          </h1>

          <p style={{
            fontSize: 20,
            color: 'var(--text-secondary)',
            marginBottom: 8,
            fontWeight: 400,
          }}>
            What if those experts were AI?
          </p>
          <p style={{
            fontSize: 16,
            color: 'var(--text-muted)',
            marginBottom: 48,
            maxWidth: 580,
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}>
            WAR ROOM compresses days of executive meetings into minutes. Ask any business question. Watch specialized AI executives debate, forecast, and recommend the optimal path forward.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <motion.button
              className="btn-primary"
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ fontSize: 16, padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: 14 }}
            >
              Enter WAR ROOM <ArrowRight size={18} />
            </motion.button>
            <button
              className="btn-ghost"
              onClick={() => navigate('/warroom')}
              style={{ fontSize: 16, padding: '14px 28px', borderRadius: 14 }}
            >
              Watch a live session →
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            {['No credit card required', 'Setup in 2 minutes', '14-day free trial'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={13} style={{ color: 'var(--accent-emerald)' }} />
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Round Table Animation */}
      <section style={{ padding: '20px 48px 80px', display: 'flex', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'relative',
            width: 520,
            height: 520,
          }}
        >
          {/* Table surface */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, rgba(6,9,15,0.8) 70%)',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 0 80px rgba(99,102,241,0.15), inset 0 0 40px rgba(99,102,241,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 800, color: 'var(--accent-indigo)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>WAR</div>
            <div style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 800, color: 'var(--accent-indigo)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>ROOM</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6, textAlign: 'center', maxWidth: 100, lineHeight: 1.4 }}>
              One question.<br />Multiple minds.
            </div>
          </div>

          {/* Orbit ring */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: '1px dashed rgba(99,102,241,0.15)',
          }} />

          {/* Agent avatars around table */}
          {executives.map((agent, i) => {
            const pos = TABLE_POSITIONS[i]
            const radius = 190
            const angle = (i / executives.length) * 2 * Math.PI - Math.PI / 2
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 200 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${agent.color}22, ${agent.color}08)`,
                    border: `2px solid ${agent.color}40`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: `0 0 20px ${agent.color}25`,
                    backdropFilter: 'blur(10px)',
                  }}
                  title={`${agent.name} — ${agent.title}`}
                >
                  <span style={{ fontSize: 22 }}>{agent.avatar}</span>
                </motion.div>
                <div style={{
                  textAlign: 'center',
                  marginTop: 6,
                  fontSize: 10,
                  fontWeight: 700,
                  color: agent.color,
                  maxWidth: 60,
                  lineHeight: 1.2,
                }}>
                  {agent.role}
                </div>
              </motion.div>
            )
          })}

          {/* Connecting lines from center */}
          <svg
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 520 520"
          >
            {executives.slice(0, 3).map((agent, i) => {
              const angle = (i / executives.length) * 2 * Math.PI - Math.PI / 2
              const r1 = 110
              const r2 = 190
              const x1 = 260 + Math.cos(angle) * r1
              const y1 = 260 + Math.sin(angle) * r1
              const x2 = 260 + Math.cos(angle) * r2
              const y2 = 260 + Math.sin(angle) * r2
              return (
                <motion.line
                  key={agent.id}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={agent.color}
                  strokeWidth={1}
                  strokeOpacity={0.3}
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                />
              )
            })}
          </svg>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section style={{
        background: 'rgba(13,17,23,0.6)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '40px 48px',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 900, letterSpacing: '-0.04em' }} className="gradient-text">
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Everything your executive team needs.<br />
            <span className="gradient-text">Powered by AI.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            WAR ROOM replaces fragmented spreadsheets, endless meetings, and gut-feel decisions with a unified AI Decision Operating System.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="card"
              style={{ padding: 28 }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
              }}>
                <f.icon size={20} style={{ color: 'var(--accent-indigo)' }} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center',
        padding: '80px 48px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.08) 0%, transparent 60%)',
      }}>
        <h2 style={{ fontFamily: 'Outfit', fontSize: 48, fontWeight: 900, letterSpacing: '-0.04em', marginBottom: 16 }}>
          Ready to run your first<br />
          <span className="gradient-text">WAR ROOM?</span>
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 40 }}>
          Join 2,400+ companies making smarter decisions, faster.
        </p>
        <motion.button
          className="btn-primary"
          onClick={() => navigate('/dashboard')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ fontSize: 18, padding: '16px 40px', borderRadius: 16, display: 'inline-flex', alignItems: 'center', gap: 12 }}
        >
          Enter WAR ROOM — It's Free <ArrowRight size={20} />
        </motion.button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '32px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--text-muted)',
        fontSize: 13,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Outfit', fontWeight: 800, color: 'var(--text-primary)', fontSize: 15 }}>WAR ROOM</span>
          <span>© 2026. AI Decision Operating System.</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy', 'Terms', 'Security', 'Status'].map((item) => (
            <span key={item} style={{ cursor: 'pointer' }}>{item}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}
