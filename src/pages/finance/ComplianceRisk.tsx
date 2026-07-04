import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { complianceStatus } from '@/data/financeData'
import { severityColor } from '@/lib/financeUtils'
import { formatINR } from '@/lib/financeUtils'
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'

const COMPLIANCE_TYPES = [
  { key: 'GST', icon: '🧾', label: 'GST / GSTIN' },
  { key: 'TDS', icon: '💼', label: 'TDS / TCS' },
  { key: 'SOX Control', icon: '🔒', label: 'SOX Controls' },
  { key: 'Duplicate Payment', icon: '🔄', label: 'Duplicate Payments' },
  { key: 'Approval Violation', icon: '⚠️', label: 'Approval Violations' },
  { key: 'Vendor Risk', icon: '🏢', label: 'Vendor Risk' },
]

export function ComplianceRisk() {
  const { overallScore, violations, gstHealth, tdsHealth, auditorReadiness, fraudRiskScore } = complianceStatus
  const totalExposure = violations.reduce((a, b) => a + b.exposure, 0)
  const openCount = violations.filter((v) => v.status === 'open').length

  return (
    <div>
      <TopBar title="Compliance Risk Monitor" subtitle="Real-time AI compliance surveillance" />
      <div style={{ padding: 32 }}>

        {/* Score Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Compliance Score', value: `${overallScore}/100`, color: overallScore > 90 ? '#10b981' : overallScore > 70 ? '#f59e0b' : '#ef4444', sub: 'Overall health' },
            { label: 'Financial Exposure', value: formatINR(totalExposure), color: '#ef4444', sub: `${openCount} open violations` },
            { label: 'Audit Readiness', value: `${auditorReadiness}%`, color: '#6366f1', sub: 'Audit trail complete' },
            { label: 'Fraud Risk Score', value: `${fraudRiskScore}/100`, color: fraudRiskScore < 30 ? '#10b981' : '#f59e0b', sub: 'Low risk zone' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="kpi-card">
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{s.label}</div>
              <div className="number-font" style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Score Ring + Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24, marginBottom: 24 }}>
          {/* Ring */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 32, textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 20px' }}>
              <svg viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
                <motion.circle cx="70" cy="70" r="60" fill="none"
                  stroke={overallScore > 90 ? '#10b981' : overallScore > 70 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="14"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - overallScore / 100) }}
                  transition={{ duration: 1.4, delay: 0.2 }}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Outfit', fontSize: 32, fontWeight: 900, color: '#10b981' }}>{overallScore}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>/ 100</span>
              </div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Compliance Health</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>AI-monitored 24/7</div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'GST Score', value: gstHealth.score },
                { label: 'TDS Score', value: tdsHealth.score },
                { label: 'Audit Readiness', value: auditorReadiness },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderTop: '1px solid var(--border-subtle)', fontSize: 12 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: s.value > 90 ? 'var(--accent-emerald)' : s.value > 75 ? 'var(--accent-amber)' : 'var(--accent-red)' }}>{s.value}/100</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {COMPLIANCE_TYPES.map((type, i) => {
              const typeViolations = violations.filter((v) => v.type === type.key)
              const hasIssue = typeViolations.length > 0
              const maxSeverity = typeViolations.reduce((acc, v) => {
                const order = { critical: 0, high: 1, medium: 2, low: 3 }
                return order[v.severity as keyof typeof order] < order[acc as keyof typeof order] ? v.severity : acc
              }, 'low' as string)
              return (
                <motion.div
                  key={type.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    padding: 18,
                    borderRadius: 14,
                    background: hasIssue ? `${severityColor(maxSeverity)}08` : 'rgba(16,185,129,0.04)',
                    border: `1px solid ${hasIssue ? severityColor(maxSeverity) + '30' : 'rgba(16,185,129,0.15)'}`,
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{type.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{type.label}</div>
                  {hasIssue ? (
                    <div style={{ fontSize: 11, fontWeight: 700, color: severityColor(maxSeverity) }}>
                      {typeViolations.length} violation{typeViolations.length > 1 ? 's' : ''} · {maxSeverity}
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-emerald)' }}>✓ All Clear</div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Violations List */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
            Active Violations ({violations.length})
          </div>
          {violations.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                padding: '18px 24px',
                borderBottom: i < violations.length - 1 ? '1px solid var(--border-subtle)' : undefined,
                borderLeft: `3px solid ${severityColor(v.severity)}`,
                background: `${severityColor(v.severity)}04`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: `${severityColor(v.severity)}15`, color: severityColor(v.severity), border: `1px solid ${severityColor(v.severity)}30` }}>
                      {v.severity.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' }}>{v.type}</span>
                    <span className={v.status === 'open' ? 'badge-negative' : v.status === 'under_review' ? 'badge-neutral' : 'badge-positive'} style={{ fontSize: 11 }}>
                      {v.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: 700 }}>{v.description}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 20 }}>
                  {v.exposure > 0 && (
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Financial Exposure</div>
                      <div className="number-font" style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-red)' }}>{formatINR(v.exposure)}</div>
                    </div>
                  )}
                  <button className="btn-ghost" style={{ marginTop: 8, fontSize: 12, padding: '5px 12px' }}>
                    Remediate →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CFO Brief */}
        <div style={{ marginTop: 24 }}>
          <ExplainLikeCFO variant="banner" label="Explain Like a CFO — Get Board-Ready Compliance Risk Brief" />
        </div>
      </div>
    </div>
  )
}
