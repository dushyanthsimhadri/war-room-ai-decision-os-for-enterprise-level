import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { financeDecisions, FINANCE_EMPLOYEES } from '@/data/financeData'
import { formatINR } from '@/lib/financeUtils'
import { CheckCircle, TrendingUp, Brain } from 'lucide-react'

const FULL_KPI_IMPACT = [
  { label: 'Cash Flow', current: '₹4.28Cr', predicted: '₹4.97Cr', delta: '+₹69L', trend: 'up', confidence: 92 },
  { label: 'Working Capital', current: '₹2.42Cr', predicted: '₹2.71Cr', delta: '+₹29L', trend: 'up', confidence: 89 },
  { label: 'Accounts Payable Days', current: '38d', predicted: '34d', delta: '-4 days', trend: 'up', confidence: 91 },
  { label: 'Accounts Receivable Days', current: '42d', predicted: '38d', delta: '-4 days', trend: 'up', confidence: 87 },
  { label: 'DSO', current: '42d', predicted: '38d', delta: '-4 days', trend: 'up', confidence: 87 },
  { label: 'DPO', current: '38d', predicted: '34d', delta: '-4 days', trend: 'down', confidence: 91 },
  { label: 'Operating Margin', current: '28.4%', predicted: '31.2%', delta: '+2.8%', trend: 'up', confidence: 84 },
  { label: 'EBITDA', current: '₹1.2Cr', predicted: '₹1.4Cr', delta: '+₹20L', trend: 'up', confidence: 86 },
  { label: 'Gross Margin', current: '72.1%', predicted: '72.1%', delta: 'No change', trend: 'flat', confidence: 99 },
  { label: 'Net Profit', current: '₹84L', predicted: '₹98L', delta: '+₹14L', trend: 'up', confidence: 83 },
  { label: 'Revenue', current: '₹4.28Cr', predicted: '₹4.28Cr', delta: 'No change', trend: 'flat', confidence: 99 },
  { label: 'Forecast Accuracy', current: '94.2%', predicted: '95.1%', delta: '+0.9%', trend: 'up', confidence: 88 },
  { label: 'Month-End Close Time', current: '3.2 days', predicted: '2.8 days', delta: '-0.4 days', trend: 'up', confidence: 82 },
  { label: 'Invoice Processing', current: '2.1 days', predicted: '1.4 days', delta: '-0.7 days', trend: 'up', confidence: 90 },
  { label: 'Compliance Score', current: '91/100', predicted: '93/100', delta: '+2 pts', trend: 'up', confidence: 94 },
  { label: 'Audit Readiness', current: '82%', predicted: '86%', delta: '+4%', trend: 'up', confidence: 88 },
  { label: 'Fraud Risk Score', current: '23/100', predicted: '19/100', delta: '-4 pts', trend: 'up', confidence: 91 },
  { label: 'Vendor Satisfaction', current: '4.1/5', predicted: '4.4/5', delta: '+0.3 pts', trend: 'up', confidence: 76 },
  { label: 'Customer Satisfaction', current: '4.3/5', predicted: '4.3/5', delta: 'No change', trend: 'flat', confidence: 99 },
  { label: 'Working Capital Improvement', current: 'Baseline', predicted: '+12%', delta: '+12%', trend: 'up', confidence: 85 },
]

export function FinanceKPIImpact() {
  return (
    <div>
      <TopBar title="Finance KPI Impact Engine" subtitle="Before/after prediction for every finance decision" />
      <div style={{ padding: 32 }}>

        {/* Decision Context */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{
            padding: 24, borderRadius: 16, marginBottom: 28,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(16,185,129,0.05))',
            border: '1px solid rgba(99,102,241,0.2)',
          }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Brain size={20} style={{ color: 'var(--accent-indigo)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                Decision Being Modeled
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                Pay all recommended vendor invoices + optimize payment timing
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                AI is modeling the downstream KPI impact of approving today's payment queue (Infosys + AWS + WeWork) and delaying Razorpay + TCS to next week.
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              20 Finance KPIs — Current vs Predicted
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              AI confidence weighted average: <strong style={{ color: 'var(--accent-emerald)' }}>88%</strong>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                {['KPI', 'Current', 'Predicted', 'Delta', 'Trend', 'Confidence'].map((h) => (
                  <th key={h} style={{ padding: '12px 24px', textAlign: h === 'KPI' ? 'left' : 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FULL_KPI_IMPACT.map((kpi, i) => {
                const isPositive = kpi.trend === 'up'
                const isFlat = kpi.trend === 'flat'
                return (
                  <motion.tr
                    key={kpi.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    style={{ borderTop: '1px solid var(--border-subtle)' }}
                  >
                    <td style={{ padding: '13px 24px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {kpi.label}
                    </td>
                    <td style={{ padding: '13px 24px', textAlign: 'center', fontSize: 13, fontFamily: 'Outfit', color: 'var(--text-muted)' }}>
                      {kpi.current}
                    </td>
                    <td style={{ padding: '13px 24px', textAlign: 'center', fontSize: 13, fontFamily: 'Outfit', fontWeight: 700, color: isFlat ? 'var(--text-muted)' : 'var(--accent-emerald)' }}>
                      {kpi.predicted}
                    </td>
                    <td style={{ padding: '13px 24px', textAlign: 'center' }}>
                      <span className={isFlat ? 'badge-neutral' : 'badge-positive'} style={{ fontSize: 11 }}>
                        {kpi.delta}
                      </span>
                    </td>
                    <td style={{ padding: '13px 24px', textAlign: 'center', fontSize: 16 }}>
                      {isFlat ? '→' : '↑'}
                    </td>
                    <td style={{ padding: '13px 24px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${kpi.confidence}%`, background: kpi.confidence > 90 ? '#10b981' : kpi.confidence > 80 ? '#6366f1' : '#f59e0b', borderRadius: 99 }} />
                        </div>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{kpi.confidence}%</span>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Decision History */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Recent Finance Decisions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {financeDecisions.map((d, i) => {
              const agents = FINANCE_EMPLOYEES.filter((e) => d.agents.includes(e.id))
              return (
                <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card" style={{ padding: 22 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{d.date}</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{d.question}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>{d.recommendation}</div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {agents.map((a) => <span key={a.id} title={a.name} style={{ fontSize: 18 }}>{a.avatar}</span>)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', marginLeft: 20 }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Confidence</div>
                      <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 800, color: 'var(--accent-indigo)' }}>{d.confidence}%</div>
                      {d.value && (
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-emerald)', marginTop: 4 }}>
                          Value: {formatINR(d.value)}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
