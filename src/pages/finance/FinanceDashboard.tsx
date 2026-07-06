import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { TopBar } from '@/components/layout/TopBar'
import { financeKPIs, FINANCE_EMPLOYEES, cashFlowForecast, complianceStatus, monthEndClose, vendorPayments, FINANCE_COMPANY } from '@/data/financeData'
import { formatINR } from '@/lib/financeUtils'
import {
  AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown,
  ChevronRight, Zap, Shield, Activity, DollarSign, Swords
} from 'lucide-react'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'
import { WowExperience } from '@/components/finance/WowExperience'

// ─── Animated Counter ────────────────────────────────────────
function AnimatedCounter({ target, format, duration = 1400 }: { target: number; format: string; duration?: number }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(target * e))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])

  if (format === 'currency') return <>{formatINR(value)}</>
  if (format === 'percent') return <>{value.toFixed(1)}%</>
  if (format === 'score') return <>{value}</>
  if (format === 'days') return <>{value}d</>
  return <>{value.toLocaleString('en-IN')}</>
}

// ─── Finance KPI Card ────────────────────────────────────────
function FinKPICard({ kpi, delay = 0, onClick }: { kpi: any; delay?: number; onClick?: () => void }) {
  const isPositive = kpi.inverseGood ? kpi.change < 0 : kpi.change > 0
  return (
    <motion.div
      className="kpi-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{kpi.icon}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {kpi.label}
          </span>
        </div>
        <div className={isPositive ? 'badge-positive' : 'badge-negative'} style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11 }}>
          {isPositive ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
          {Math.abs(kpi.change).toFixed(1)}%
        </div>
      </div>
      <div className="number-font" style={{ fontSize: 26, fontWeight: 800, color: kpi.color, letterSpacing: '-0.02em', marginBottom: 4 }}>
        <AnimatedCounter target={kpi.value} format={kpi.format} />
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{kpi.sub}</div>
    </motion.div>
  )
}

// ─── AI Employee Status Strip ────────────────────────────────
function EmployeeStrip() {
  const navigate = useNavigate()
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card" style={{ padding: '20px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>AI Finance Board</div>
        <button className="btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => navigate('/finance/warroom')}>
          Convene Board →
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {FINANCE_EMPLOYEES.slice(0, 6).map((emp) => (
          <div key={emp.id} style={{ textAlign: 'center' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', margin: '0 auto 6px',
              background: `${emp.color}15`, border: `2px solid ${emp.color}${emp.status === 'alert' ? 'cc' : '40'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              boxShadow: emp.status === 'alert' ? `0 0 12px ${emp.color}60` : undefined,
            }}>
              {emp.avatar}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-primary)' }}>{emp.role}</div>
            <div style={{
              fontSize: 9, marginTop: 2, fontWeight: 600,
              color: emp.status === 'alert' ? 'var(--accent-red)' : emp.status === 'active' ? 'var(--accent-emerald)' : 'var(--text-muted)',
            }}>
              {emp.status === 'alert' ? '⚠ Alert' : emp.status === 'active' ? '● Active' : '◎ Monitor'}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Critical Alerts ─────────────────────────────────────────
function CriticalAlerts() {
  const navigate = useNavigate()
  const alerts = [
    { icon: '🚨', label: 'Fraud Alert', text: 'Unknown vendor invoice ₹4.5L — DO NOT PAY', color: '#ef4444', route: '/finance/payments' },
    { icon: '📅', label: 'GST Filing', text: 'GSTR-3B due Jul 11 — 3 credits unreconciled', color: '#f59e0b', route: '/finance/compliance' },
    { icon: '📖', label: 'Month-End', text: '3 tasks blocking close — bank rec ₹2.4L open', color: '#8b5cf6', route: '/finance/month-end' },
    { icon: '💰', label: 'Cash Opportunity', text: 'Move ₹5Cr to liquid fund — save ₹8.5L/yr', color: '#10b981', route: '/finance/cashflow' },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card" style={{ padding: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Zap size={15} style={{ color: 'var(--accent-amber)' }} /> AI Alerts
      </div>
      {alerts.map((a, i) => (
        <div
          key={i}
          onClick={() => navigate(a.route)}
          style={{
            display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0',
            borderBottom: i < alerts.length - 1 ? '1px solid var(--border-subtle)' : undefined,
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0 }}>{a.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: a.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{a.label}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{a.text}</div>
          </div>
          <ChevronRight size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        </div>
      ))}
    </motion.div>
  )
}

// ─── Cash Flow Mini Chart ────────────────────────────────────
function CashFlowChart() {
  const navigate = useNavigate()
  const data = cashFlowForecast.daily.slice(0, 7)
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Cash Position Forecast</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>7-day daily outlook</div>
        </div>
        <button className="btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => navigate('/finance/cashflow')}>
          Full Forecast →
        </button>
      </div>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatINR(v)} />
          <Tooltip formatter={(v: any) => formatINR(v)} contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 10 }} />
          <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={2} fill="url(#cashGrad)" name="Balance" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

// ─── Vendor Payment Summary ───────────────────────────────────
function VendorSummary() {
  const navigate = useNavigate()
  const today = vendorPayments.filter((v) => v.aiDecision === 'pay_today')
  const total = today.reduce((a, b) => a + b.amount, 0)
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Today's Payment Queue</div>
        <button className="btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => navigate('/finance/payments')}>
          Manage →
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, padding: '12px 16px', borderRadius: 12, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>AI Recommends Paying Today</div>
          <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, color: 'var(--accent-emerald)' }}>{formatINR(total)}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Potential Savings</div>
          <div style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 700, color: 'var(--accent-amber)' }}>₹84K</div>
        </div>
      </div>
      {today.slice(0, 3).map((v) => (
        <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 13 }}>
          <span style={{ color: 'var(--text-secondary)' }}>{v.vendor}</span>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>{formatINR(v.amount)}</span>
        </div>
      ))}
      {vendorPayments.find((v) => v.fraudRisk === 'critical') && (
        <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', fontSize: 12, color: 'var(--accent-red)', fontWeight: 600 }}>
          🚨 1 payment held for fraud investigation
        </div>
      )}
    </motion.div>
  )
}

// ─── Month-End Progress ───────────────────────────────────────
function MonthEndCard() {
  const navigate = useNavigate()
  const { completionPercent, tasks, risks } = monthEndClose
  const done = tasks.filter((t) => t.status === 'complete').length
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Month-End Close</div>
        <button className="btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => navigate('/finance/month-end')}>
          Run AI Check →
        </button>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: 'Outfit', fontSize: 36, fontWeight: 900, color: '#8b5cf6' }}>{completionPercent}%</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{done}/{tasks.length} tasks complete</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Est. close: July 1, 2pm</div>
        </div>
      </div>
      <div className="confidence-bar" style={{ height: 8, marginBottom: 16 }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${completionPercent}%` }} transition={{ duration: 1.2 }}
          style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #8b5cf6, #6366f1)' }} />
      </div>
      {risks.slice(0, 2).map((r, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
          <span style={{ color: r.severity === 'high' ? 'var(--accent-red)' : 'var(--accent-amber)', fontSize: 10, fontWeight: 700, marginTop: 1 }}>
            {r.severity === 'high' ? '●' : '◐'}
          </span>
          {r.description}
        </div>
      ))}
    </motion.div>
  )
}

// ─── Compliance Score Ring ────────────────────────────────────
function ComplianceCard() {
  const navigate = useNavigate()
  const { overallScore, violations } = complianceStatus
  const critical = violations.filter((v) => v.severity === 'critical').length
  const high = violations.filter((v) => v.severity === 'high').length
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="card" style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Compliance Health</div>
        <button className="btn-ghost" style={{ fontSize: 12, padding: '5px 12px' }} onClick={() => navigate('/finance/compliance')}>
          View Details →
        </button>
      </div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 16 }}>
        <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
          <svg viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <motion.circle cx="36" cy="36" r="30" fill="none" stroke="#6366f1" strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 30}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 30 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 30 * (1 - overallScore / 100) }}
              transition={{ duration: 1.2, delay: 0.3 }}
              strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 900, color: '#6366f1' }}>{overallScore}</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Score: {overallScore}/100</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {critical > 0 && <span className="badge-negative" style={{ fontSize: 11 }}>{critical} Critical</span>}
            {high > 0 && <span className="badge-neutral" style={{ fontSize: 11 }}>{high} High</span>}
          </div>
        </div>
      </div>
      {violations.slice(0, 2).map((v, i) => (
        <div key={i} style={{ fontSize: 12, color: 'var(--text-muted)', padding: '6px 0', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 6 }}>
          <span style={{ color: v.severity === 'critical' ? 'var(--accent-red)' : 'var(--accent-amber)', fontWeight: 700 }}>●</span>
          {v.description.substring(0, 60)}…
        </div>
      ))}
    </motion.div>
  )
}

export function FinanceDashboard() {
  const navigate = useNavigate()
  const isDemo = window.location.search.includes('demo=true')
  const [showWow, setShowWow] = useState(window.location.search.includes('wow=true'))

  // Custom preloaded Demo values override
  let kpisToRender = Object.values(financeKPIs)
  if (isDemo) {
    kpisToRender = kpisToRender.map((kpi) => {
      if (kpi.label === 'Cash Position') {
        return { ...kpi, value: 960000000, sub: 'Healthy (Across all accounts)' }
      }
      if (kpi.label === 'Accounts Payable') {
        return { ...kpi, value: 132, sub: '132 pending vendor invoices', format: 'score' }
      }
      if (kpi.label === 'Accounts Receivable') {
        return { ...kpi, label: 'Open Executive Decisions', value: 14, sub: '14 active decisions', format: 'score' }
      }
      if (kpi.label === 'Compliance Health') {
        return { ...kpi, value: 97, sub: '97% compliance score', format: 'score' }
      }
      if (kpi.label === 'Forecast Accuracy') {
        return { ...kpi, value: 93, sub: '93% forecast accuracy', format: 'score' }
      }
      return kpi
    })
  }

  const companyName = isDemo ? 'WAR ROOM Technologies' : FINANCE_COMPANY.name

  return (
    <div>
      <TopBar title="Finance Command Center" subtitle={`${companyName} · ${FINANCE_COMPANY.month}`} />
      <div style={{ padding: 32 }}>

        {/* 30 Second Wow Experience Onboarding modal */}
        <AnimatePresence>
          {showWow && (
            <WowExperience
              onClose={() => setShowWow(false)}
              onViewBrief={() => {
                setShowWow(false)
                navigate('/finance/executive-brief')
              }}
            />
          )}
        </AnimatePresence>

        {/* AI Question Bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 16,
            padding: '16px 24px',
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}>
            <Swords size={20} style={{ color: 'var(--accent-indigo)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                Ask the Finance AI Board
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Can we close this month\'s books today?', 'Should we pay all vendors today?', 'What\'s our cash risk this week?', 'Is our GST filing ready?'].map((q) => (
                  <button key={q} onClick={() => navigate(`/finance/warroom?q=${encodeURIComponent(q)}`)}
                    style={{ fontSize: 12, padding: '5px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <button className="btn-primary" style={{ fontSize: 13, whiteSpace: 'nowrap' }} onClick={() => navigate('/finance/warroom')}>
              Convene Board →
            </button>
          </div>
        </motion.div>

        {/* KPI Grid — 4 cols × 3 rows */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {kpisToRender.map((kpi, i) => (
            <FinKPICard key={kpi.label} kpi={kpi} delay={i * 0.04} />
          ))}
        </div>

        {/* AI Employees */}
        <div style={{ marginBottom: 24 }}>
          <EmployeeStrip />
        </div>

        {/* Middle section: Alerts + Cash Chart */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20, marginBottom: 24 }}>
          <CriticalAlerts />
          <CashFlowChart />
        </div>

        {/* Bottom section: Vendor + Month-End + Compliance */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 24 }}>
          <VendorSummary />
          <MonthEndCard />
          <ComplianceCard />
        </div>

        {/* Explain Like a CFO banner */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <ExplainLikeCFO variant="banner" label="Explain Like a CFO — Generate Executive Decision Brief" />
        </motion.div>
      </div>
    </div>
  )
}

