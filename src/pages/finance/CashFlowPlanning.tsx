import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, ReferenceLine, Cell
} from 'recharts'
import { TopBar } from '@/components/layout/TopBar'
import { cashFlowForecast } from '@/data/financeData'
import { formatINR } from '@/lib/financeUtils'
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, ArrowUp, ArrowDown } from 'lucide-react'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'

const VIEWS = ['Daily', 'Weekly', 'Monthly'] as const
type View = typeof VIEWS[number]

function CashTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong" style={{ padding: '12px 16px', borderRadius: 10, fontSize: 12 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 4 }}>
          {p.name}: <strong>{formatINR(p.value)}</strong>
        </div>
      ))}
    </div>
  )
}

function NetBarChart({ data }: { data: typeof cashFlowForecast.daily }) {
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatINR(v)} />
        <Tooltip content={<CashTooltip />} />
        <ReferenceLine y={0} stroke="rgba(255,255,255,0.15)" />
        <Bar dataKey="net" name="Net Cash" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.net >= 0 ? '#10b981' : '#ef4444'} fillOpacity={0.8} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CashFlowPlanning() {
  const [view, setView] = useState<View>('Daily')
  const { daily, weekly, current, shortageRisk, recommendations } = cashFlowForecast

  const data = view === 'Daily' ? daily : weekly
  const balanceKey = 'balance'

  return (
    <div>
      <TopBar title="Cash Flow Intelligence" subtitle="AI-powered daily, weekly & monthly cash position" />
      <div style={{ padding: 32 }}>

        {/* Current Position */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Current Balance', value: formatINR(current), color: '#10b981', icon: '💰' },
            { label: 'Next 7 Days In', value: formatINR(37500000), color: '#6366f1', icon: '📥' },
            { label: 'Next 7 Days Out', value: formatINR(26820000), color: '#ef4444', icon: '📤' },
            { label: 'Net Position', value: formatINR(10680000), color: '#06b6d4', icon: '📊' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="kpi-card">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                <span>{s.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
              </div>
              <div className="number-font" style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {VIEWS.map((v) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '8px 20px', borderRadius: 10, border: '1px solid',
              borderColor: view === v ? 'rgba(99,102,241,0.5)' : 'var(--border-subtle)',
              background: view === v ? 'rgba(99,102,241,0.12)' : 'transparent',
              color: view === v ? 'var(--accent-indigo)' : 'var(--text-muted)',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>{v}</button>
          ))}
        </div>

        {/* Main Cash Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                Cash Balance — {view} Forecast
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Based on confirmed receivables + payables + AI-predicted transactions
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />Balance
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#6366f1' }} />Inflow
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />Outflow
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data as any[]}>
              <defs>
                <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey={view === 'Daily' ? 'date' : 'week'} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatINR(v)} />
              <Tooltip content={<CashTooltip />} />
              <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={2.5} fill="url(#balGrad)" name="Balance" />
              <Area type="monotone" dataKey="inflow" stroke="#6366f1" strokeWidth={1.5} fill="url(#inGrad)" name="Inflow" strokeDasharray="4 2" />
              <Area type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={1.5} fill="none" name="Outflow" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Net Flow Bar Chart */}
        {view === 'Daily' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Daily Net Cash Flow</div>
            <NetBarChart data={daily} />
          </motion.div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Cash Shortage Risks */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
              <AlertTriangle size={15} style={{ color: 'var(--accent-amber)' }} /> High-Risk Days
            </div>
            {shortageRisk.map((r, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < shortageRisk.length - 1 ? '1px solid var(--border-subtle)' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{r.date}</span>
                  <span className={r.severity === 'high' ? 'badge-negative' : 'badge-neutral'} style={{ fontSize: 11 }}>{r.severity}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.reason}</div>
              </div>
            ))}
          </motion.div>

          {/* AI Recommendations */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card" style={{ padding: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
              <TrendingUp size={15} style={{ color: 'var(--accent-emerald)' }} /> AI Recommendations
            </div>
            {recommendations.map((rec, i) => (
              <div key={i} style={{ padding: '12px 0', borderBottom: i < recommendations.length - 1 ? '1px solid var(--border-subtle)' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-emerald)' }}>{rec.action}</span>
                  {rec.cashSaved > 0 && <span style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 700, color: 'var(--accent-emerald)' }}>{formatINR(rec.cashSaved)}</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{rec.detail}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CFO Brief */}
        <ExplainLikeCFO variant="banner" label="Explain Like a CFO — Get Board-Ready Cash Flow Decision Brief" />
      </div>
    </div>
  )
}
