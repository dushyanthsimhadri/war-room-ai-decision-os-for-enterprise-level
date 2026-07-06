import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swords, CheckCircle2, Loader2, Sparkles, FileText, LayoutDashboard } from 'lucide-react'

interface Message {
  role: string
  avatar: string
  text: string
  color: string
}

export function WowExperience({ onClose, onViewBrief }: { onClose: () => void; onViewBrief: () => void }) {
  const [step, setStep] = useState(0)
  const [messages, setMessages] = useState<Message[]>([])
  
  const allMessages: Message[] = [
    { role: 'Treasury Manager', avatar: ' Vikram', text: 'Cash flow will improve if payment is delayed by 5 days.', color: 'var(--accent-amber)' },
    { role: 'Compliance Officer', avatar: ' Kavitha', text: 'No policy violation detected. Standard grace terms apply.', color: 'var(--accent-indigo)' },
    { role: 'Tax Specialist', avatar: ' Suresh', text: 'GST input tax credit remains valid and fully reconciled.', color: 'var(--accent-teal)' },
    { role: 'Internal Auditor', avatar: ' Ananya', text: 'Low financial risk. Net saving offset is ₹84,000.', color: 'var(--accent-emerald)' },
  ]

  useEffect(() => {
    // Stage 0: Boardroom Summoned (0-3s)
    // Stage 1-4: Messages streaming (3-12s)
    // Stage 5: Finding Consensus (12-15s)
    // Stage 6: Finished summary (15s+)
    const interval = setInterval(() => {
      setStep((s) => {
        if (s < 6) {
          const next = s + 1
          if (next >= 1 && next <= 4) {
            setMessages((prev) => [...prev, allMessages[next - 1]])
          }
          return next
        }
        clearInterval(interval)
        return s
      })
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(5,7,12,0.92)', backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          maxWidth: 720, width: '100%', borderRadius: 20,
          background: 'rgba(10,15,26,0.6)', border: '1px solid rgba(99,102,241,0.25)',
          boxShadow: '0 0 60px rgba(99,102,241,0.15)', overflow: 'hidden'
        }}
      >
        {/* Onboarding Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Swords size={18} style={{ color: 'var(--accent-indigo)', animation: 'spin 4s linear infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Collaborative Boardroom</span>
          </div>
          <h2 style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>
            Onboarding Question: <span style={{ color: 'var(--accent-indigo)' }}>"Should we pay Vendor ABC today?"</span>
          </h2>
        </div>

        {/* Cinematic Streaming Area */}
        <div style={{ padding: 32, minHeight: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Summoned Status indicators */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            {[
              { role: 'CFO', active: step >= 0, emoji: ' Arjun' },
              { role: 'Treasury', active: step >= 1, emoji: ' Vikram' },
              { role: 'Compliance', active: step >= 2, emoji: ' Kavitha' },
              { role: 'Tax', active: step >= 3, emoji: ' Suresh' },
              { role: 'Auditor', active: step >= 4, emoji: ' Ananya' },
            ].map((p, idx) => (
              <motion.div
                key={idx}
                animate={{
                  borderColor: p.active ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.05)',
                  opacity: p.active ? 1 : 0.4
                }}
                style={{
                  padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.01)',
                  border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12
                }}
              >
                <span>{p.emoji}</span>
                <span style={{ fontWeight: 600 }}>{p.role}</span>
                <span style={{ fontSize: 9, color: p.active ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                  {p.active ? '● Joined' : '○ Pending'}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Scrolling Debate Logs */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', maxHeight: 220 }}>
            <AnimatePresence>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{
                    padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.015)',
                    border: '1px solid var(--border-subtle)', borderLeft: `3px solid ${msg.color}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 14 }}>{msg.avatar}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: msg.color, textTransform: 'uppercase' }}>{msg.role}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{msg.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Simulated Live Thinking Message */}
            {step >= 1 && step < 5 && (
              <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                <Loader2 size={12} style={{ animation: 'spin 1.5s linear infinite' }} />
                <span>AI Employees are debating & analyzing Ledger telemetry...</span>
              </motion.div>
            )}
          </div>

          {/* Stage Logs Checklists */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            {[
              { label: 'Analyzing Data', active: step >= 1 },
              { label: 'Running Forecast', active: step >= 2 },
              { label: 'Comparing Scenarios', active: step >= 3 },
              { label: 'Finding Consensus', active: step >= 4 },
              { label: 'Preparing CFO Brief', active: step >= 5 },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: c.active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                <CheckCircle2 size={12} style={{ color: c.active ? 'var(--accent-emerald)' : 'var(--text-muted)' }} />
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Consensus Summary Output Card */}
        <AnimatePresence>
          {step >= 5 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ overflow: 'hidden', borderTop: '1px solid rgba(99,102,241,0.25)', background: 'linear-gradient(180deg, rgba(99,102,241,0.06), transparent)' }}
            >
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Sparkles size={16} style={{ color: 'var(--accent-amber)' }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Consensus Recommendation Ready</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 20 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Delay Vendor ABC Payment by 5 Days</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                      Improves net cash position and working capital efficiency while retaining zero compliance penalties and strong supplier relations.
                    </p>
                  </div>
                  <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: 20 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>AI Confidence</div>
                    <div className="number-font" style={{ fontSize: 32, fontWeight: 900, color: 'var(--accent-emerald)' }}>95%</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Risk: <strong>Low</strong></div>
                  </div>
                </div>

                {/* Final CTA Buttons to Dashboard */}
                <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                  <button onClick={onClose} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', fontSize: 13 }}>
                    <LayoutDashboard size={14} /> Enter Command Dashboard
                  </button>
                  <button onClick={onViewBrief} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', fontSize: 13 }}>
                    <FileText size={14} /> View Executive CFO brief
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
