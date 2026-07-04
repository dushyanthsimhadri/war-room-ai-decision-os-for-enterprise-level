import { useState } from 'react'
import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { vendorPayments } from '@/data/financeData'
import { formatINR, aiDecisionColor, aiDecisionLabel } from '@/lib/financeUtils'
import { CheckCircle, XCircle, AlertTriangle, Clock, TrendingUp, DollarSign } from 'lucide-react'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'

const PRIORITY_CATEGORIES = [
  { key: 'pay_today', label: 'Pay Today', icon: '🚀', color: '#10b981', description: 'Must pay now — savings or critical dependency' },
  { key: 'pay_next_week', label: 'Pay Next Week', icon: '⏭️', color: '#06b6d4', description: 'Safe to pay in 7 days without penalty' },
  { key: 'delay_safely', label: 'Delay Safely', icon: '🔮', color: '#8b5cf6', description: 'Can delay 14+ days, no impact' },
  { key: 'hold', label: 'Hold — Investigate', icon: '🚨', color: '#ef4444', description: 'Fraud risk or anomaly detected — do not pay' },
]

export function VendorPayments() {
  const [selected, setSelected] = useState<string | null>(null)
  const [approved, setApproved] = useState<Set<string>>(new Set())

  const todayPayments = vendorPayments.filter((v) => v.aiDecision === 'pay_today')
  const nextWeek = vendorPayments.filter((v) => v.aiDecision === 'pay_next_week')
  const delaySafe = vendorPayments.filter((v) => v.aiDecision === 'delay_safely')
  const held = vendorPayments.filter((v) => v.aiDecision === 'hold')

  const totalToday = todayPayments.reduce((a, b) => a + b.amount, 0)
  const totalSavings = vendorPayments.reduce((a, b) => a + (b.savingsIfPaidEarly || 0), 0)
  const totalHeld = held.reduce((a, b) => a + b.amount, 0)

  return (
    <div>
      <TopBar title="Vendor Payment Intelligence" subtitle="AI-prioritized payment queue" />
      <div style={{ padding: 32 }}>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Pay Today', value: formatINR(totalToday), count: `${todayPayments.length} vendors`, color: '#10b981', icon: '🚀' },
            { label: 'Next Week', value: formatINR(nextWeek.reduce((a, b) => a + b.amount, 0)), count: `${nextWeek.length} vendors`, color: '#06b6d4', icon: '⏭️' },
            { label: 'Potential Savings', value: formatINR(totalSavings), count: 'Early pay discounts', color: '#f59e0b', icon: '💰' },
            { label: 'Held for Review', value: formatINR(totalHeld), count: `${held.length} flagged`, color: '#ef4444', icon: '🚨' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="kpi-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
              </div>
              <div className="number-font" style={{ fontSize: 24, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.count}</div>
            </motion.div>
          ))}
        </div>

        {/* Payment Lists */}
        {PRIORITY_CATEGORIES.map((cat) => {
          const payments = vendorPayments.filter((v) => v.aiDecision === cat.key)
          if (payments.length === 0) return null
          return (
            <motion.div key={cat.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ marginBottom: 20, overflow: 'hidden' }}>
              {/* Category Header */}
              <div style={{
                padding: '16px 24px',
                background: `${cat.color}08`,
                borderBottom: `1px solid ${cat.color}20`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 20 }}>{cat.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: cat.color }}>{cat.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{cat.description}</div>
                  </div>
                </div>
                <div className="number-font" style={{ fontSize: 18, fontWeight: 700, color: cat.color }}>
                  {formatINR(payments.reduce((a, b) => a + b.amount, 0))}
                </div>
              </div>

              {/* Payments */}
              {payments.map((payment, i) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    padding: '18px 24px',
                    borderBottom: i < payments.length - 1 ? '1px solid var(--border-subtle)' : undefined,
                    cursor: 'pointer',
                    background: selected === payment.id ? 'rgba(255,255,255,0.02)' : undefined,
                  }}
                  onClick={() => setSelected(selected === payment.id ? null : payment.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{payment.vendor}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)' }}>
                          {payment.category}
                        </span>
                        {payment.fraudRisk === 'critical' && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-red)', padding: '2px 8px', borderRadius: 99, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                            🚨 FRAUD RISK
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        Due: {payment.dueDate} ({payment.daysUntilDue === 1 ? 'Tomorrow' : `${payment.daysUntilDue} days`})
                        {payment.earlyPayDiscount > 0 && (
                          <span style={{ color: 'var(--accent-emerald)', fontWeight: 600, marginLeft: 10 }}>
                            +{payment.earlyPayDiscount}% early discount → save {formatINR(payment.savingsIfPaidEarly || 0)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div>
                        <div className="number-font" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{formatINR(payment.amount)}</div>
                        <div style={{ display: 'flex', gap: 6, marginTop: 4, justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: payment.poMatch ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: payment.poMatch ? 'var(--accent-emerald)' : 'var(--accent-red)', border: `1px solid ${payment.poMatch ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`, fontWeight: 700 }}>
                            {payment.poMatch ? 'PO ✓' : 'PO ✗'}
                          </span>
                          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: payment.fraudRisk === 'low' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', color: payment.fraudRisk === 'low' ? 'var(--accent-emerald)' : 'var(--accent-red)', border: `1px solid ${payment.fraudRisk === 'low' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`, fontWeight: 700 }}>
                            {payment.fraudRisk === 'low' ? 'Safe' : 'Risk'}
                          </span>
                        </div>
                      </div>
                      {cat.key !== 'hold' && !approved.has(payment.id) && (
                        <button
                          className="btn-primary"
                          style={{ fontSize: 12, padding: '7px 14px', whiteSpace: 'nowrap' }}
                          onClick={(e) => { e.stopPropagation(); setApproved((prev) => new Set([...prev, payment.id])) }}
                        >
                          Approve
                        </button>
                      )}
                      {approved.has(payment.id) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-emerald)', fontSize: 12, fontWeight: 700 }}>
                          <CheckCircle size={14} /> Approved
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded AI Reason */}
                  {selected === payment.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ marginTop: 12, padding: '12px 16px', borderRadius: 10, background: `${cat.color}06`, border: `1px solid ${cat.color}20` }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 700, color: cat.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                        AI Reasoning
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{payment.reason}</div>
                      {payment.alert && (
                        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--accent-red)', fontWeight: 600 }}>⚠ {payment.alert}</div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )
        })}
      </div>

      {/* CFO Brief CTA */}
      <div style={{ padding: '0 32px 32px' }}>
        <ExplainLikeCFO variant="banner" label="Explain Like a CFO — Get Board-Ready Brief for This Payment Decision" />
      </div>
    </div>
  )
}
