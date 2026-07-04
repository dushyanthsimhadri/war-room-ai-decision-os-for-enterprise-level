import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import { TopBar } from '@/components/layout/TopBar'
import { financialForecast } from '@/data/financeData'
import { formatINR } from '@/lib/financeUtils'
import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'

const PERIODS = ['7d', '30d', '90d', '6m', '1y'] as const
type Period = typeof PERIODS[number]

const PERIOD_LABELS: Record<Period, string> = {
  '7d': '7 Days', '30d': '30 Days', '90d': '90 Days', '6m': '6 Months', '1y': '1 Year',
}

const METRICS = [
  { key: 'revenue', label: 'Revenue', color: '#6366f1', icon: '💰' },
  { key: 'opex', label: 'Operating Expenses', color: '#ef4444', icon: '📤' },
  { key: 'ebitda', label: 'EBITDA', color: '#10b981', icon: '📊' },
  { key: 'cashFlow', label: 'Cash Flow', color: '#06b6d4', icon: '💧' },
]

// Generate trend line data from the forecast objects
function buildTrendData(period: Period) {
  const f = financialForecast[period]
  const points = 7
  return Array.from({ length: points }, (_, i) => {
    const pct = i / (points - 1)
    return {
      label: `P${i + 1}`,
      revenueBest: Math.round(f.revenue.best * pct),
      revenueExpected: Math.round(f.revenue.expected * pct),
      revenueWorst: Math.round(f.revenue.worst * pct),
      ebitdaExpected: Math.round(f.ebitda.expected * pct),
      cashFlowExpected: Math.round(f.cashFlow.expected * pct),
    }
  })
}

function ForecastTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-strong" style={{ padding: '12px 16px', borderRadius: 10, fontSize: 12 }}>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 4 }}>
          {p.name}: <strong>{formatINR(p.value)}</strong>
        </div>
      ))}
    </div>
  )
}

export function FinancialForecast() {
  const [period, setPeriod] = useState<Period>('30d')
  const data = financialForecast[period]
  const trendData = buildTrendData(period)

  return (
    <div>
      <TopBar title="Financial Forecast Engine" subtitle="AI-powered revenue, EBITDA, and cash flow prediction" />
      <div style={{ padding: 32 }}>

        {/* Period Selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: '8px 20px', borderRadius: 10, border: '1px solid',
              borderColor: period === p ? 'rgba(99,102,241,0.5)' : 'var(--border-subtle)',
              background: period === p ? 'rgba(99,102,241,0.12)' : 'transparent',
              color: period === p ? 'var(--accent-indigo)' : 'var(--text-muted)',
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>{PERIOD_LABELS[p]}</button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
            AI Confidence:
            <span style={{ fontWeight: 700, color: data.confidence > 85 ? 'var(--accent-emerald)' : data.confidence > 70 ? 'var(--accent-amber)' : 'var(--accent-red)' }}>
              {data.confidence}%
            </span>
          </div>
        </div>

        {/* 4 Metric Cards with 3 scenarios */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {METRICS.map((m, i) => {
            const metric = data[m.key as keyof typeof data] as { best: number; expected: number; worst: number }
            return (
              <motion.div key={m.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{ background: 'rgba(13,17,23,0.9)', border: `1px solid ${m.color}25`, borderRadius: 16, padding: 20, boxShadow: `0 0 20px ${m.color}08` }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                  <span>{m.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: m.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</span>
                </div>
                <div className="number-font" style={{ fontSize: 22, fontWeight: 900, color: m.color, marginBottom: 16 }}>{formatINR(metric.expected)}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {[
                    { label: '🚀 Best', value: metric.best, color: '#10b981' },
                    { label: '📊 Expected', value: metric.expected, color: m.color },
                    { label: '⚠ Worst', value: metric.worst, color: '#ef4444' },
                  ].map((s) => (
                    <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                      <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                      <span style={{ fontWeight: 700, color: s.color }}>{formatINR(s.value)}</span>
                    </div>
                  ))}
                </div>
                <div className="confidence-bar" style={{ marginTop: 14 }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${data.confidence}%` }} transition={{ duration: 1 }}
                    style={{ height: '100%', borderRadius: 99, background: m.color }} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Revenue Scenario Chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Revenue Scenarios — {PERIOD_LABELS[period]}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 24 }}>Best Case, Expected, and Worst Case trajectories</div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="bestGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="label" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatINR(v)} />
              <Tooltip content={<ForecastTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: 'var(--text-muted)' }} />
              <Area type="monotone" dataKey="revenueBest" stroke="#10b981" strokeWidth={1.5} fill="url(#bestGrad)" name="Best Case" strokeDasharray="4 2" />
              <Area type="monotone" dataKey="revenueExpected" stroke="#6366f1" strokeWidth={2.5} fill="url(#expGrad)" name="Expected" />
              <Area type="monotone" dataKey="revenueWorst" stroke="#ef4444" strokeWidth={1.5} fill="none" name="Worst Case" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* KPI Forecast Table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            Forecast Summary — {PERIOD_LABELS[period]}
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                {['Metric', 'Best Case', 'Expected', 'Worst Case', 'Confidence'].map((h) => (
                  <th key={h} style={{ padding: '12px 24px', textAlign: h === 'Metric' ? 'left' : 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {METRICS.map((m, i) => {
                const metric = data[m.key as keyof typeof data] as { best: number; expected: number; worst: number }
                return (
                  <tr key={m.key} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{m.icon}</span>
                      <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{m.label}</span>
                    </td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#10b981', fontFamily: 'Outfit' }}>{formatINR(metric.best)}</td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: m.color, fontFamily: 'Outfit' }}>{formatINR(metric.expected)}</td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: metric.worst < 0 ? '#ef4444' : '#94a3b8', fontFamily: 'Outfit' }}>{formatINR(metric.worst)}</td>
                    <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>{data.confidence}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>

        {/* CFO Brief */}
        <div style={{ marginTop: 24 }}>
          <ExplainLikeCFO variant="banner" label="Explain Like a CFO — Get Board-Ready Forecast Decision Brief" />
        </div>
      </div>
    </div>
  )
}
