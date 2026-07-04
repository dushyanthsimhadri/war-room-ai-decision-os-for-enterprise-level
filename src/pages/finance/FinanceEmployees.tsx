import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { FINANCE_EMPLOYEES } from '@/data/financeData'
import { TrendingUp, Shield, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react'

export function FinanceEmployees() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div>
      <TopBar title="AI Finance Employees" subtitle="11 specialized AI executives, always on duty" />
      <div style={{ padding: 32 }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'AI Employees', value: '11', sub: 'Finance specialists', color: '#6366f1' },
            { label: 'Avg Confidence', value: '91%', sub: 'Decision accuracy', color: '#10b981' },
            { label: 'On Alert', value: '1', sub: 'Kavitha — GST filing', color: '#ef4444' },
            { label: 'Active Now', value: '8', sub: 'Monitoring live', color: '#06b6d4' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="kpi-card">
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{s.label}</div>
              <div className="number-font" style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Employee Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {FINANCE_EMPLOYEES.map((emp, i) => {
            const isOpen = selected === emp.id
            return (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="card"
                style={{
                  overflow: 'hidden',
                  borderColor: emp.status === 'alert' ? `${emp.color}50` : undefined,
                  boxShadow: emp.status === 'alert' ? `0 0 24px ${emp.color}20` : undefined,
                }}
              >
                {/* Header */}
                <div
                  style={{ padding: '20px 20px 16px', cursor: 'pointer', background: `linear-gradient(135deg, ${emp.color}08, transparent)` }}
                  onClick={() => setSelected(isOpen ? null : emp.id)}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                      background: `${emp.color}15`, border: `2px solid ${emp.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
                      boxShadow: emp.status === 'alert' ? `0 0 16px ${emp.color}50` : undefined,
                    }}>
                      {emp.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{emp.name}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: emp.color }}>{emp.title}</div>
                      <div style={{
                        marginTop: 4, fontSize: 10, fontWeight: 700,
                        color: emp.status === 'alert' ? 'var(--accent-red)' : emp.status === 'active' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      }}>
                        {emp.status === 'alert' ? '⚠ ALERT' : emp.status === 'active' ? '● ACTIVE' : '◎ MONITORING'}
                      </div>
                    </div>
                    {isOpen ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
                  </div>

                  {/* Confidence Bar */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                      <span>Decision Confidence</span>
                      <span style={{ fontWeight: 700, color: emp.color }}>{emp.confidence}%</span>
                    </div>
                    <div className="confidence-bar">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${emp.confidence}%` }} transition={{ duration: 1, delay: i * 0.06 }}
                        style={{ height: '100%', borderRadius: 99, background: emp.color }} />
                    </div>
                  </div>

                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    Currently: {emp.currentFocus}
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                      style={{ borderTop: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                      <div style={{ padding: 20 }}>
                        {/* Bio */}
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                          {emp.bio}
                        </div>

                        {/* Expertise */}
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                            Expertise
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {emp.expertise.map((e) => (
                              <span key={e} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 99, background: `${emp.color}10`, border: `1px solid ${emp.color}25`, color: emp.color, fontWeight: 600 }}>
                                {e}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Live Recommendation */}
                        <div style={{ padding: '12px 14px', borderRadius: 10, background: `${emp.color}06`, border: `1px solid ${emp.color}20` }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: emp.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                            💡 Current Recommendation
                          </div>
                          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{emp.recommendation}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
