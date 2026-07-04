import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts'
import { TopBar } from '@/components/layout/TopBar'
import { forecastData } from '@/data/mockData'
import { TrendingUp, AlertTriangle, CheckCircle, Activity } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const PERIODS = ['7d', '30d', '90d', '6m', '1y'] as const
type Period = typeof PERIODS[number]

const PERIOD_LABELS: Record<Period, string> = {
  '7d': '7 Days',
  '30d': '30 Days',
  '90d': '90 Days',
  '6m': '6 Months',
  '1y': '1 Year',
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="glass-strong" style={{ padding: '10px 14px', borderRadius: 10, fontSize: 13 }}>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: '#6366f1', fontWeight: 600 }}>
          MRR: {formatCurrency(p.value)}
        </div>
      ))}
    </div>
  )
}

export function Forecast() {
  const [period, setPeriod] = useState<Period>('30d')
  const data = forecastData[period]

  const riskColor = data.risk === 'low' ? 'var(--accent-emerald)' : data.risk === 'medium' ? 'var(--accent-amber)' : 'var(--accent-red)'
  const RiskIcon = data.risk === 'low' ? CheckCircle : data.risk === 'medium' ? AlertTriangle : AlertTriangle

  return (
    <div>
      <TopBar title="Forecast Engine" subtitle="AI-powered business trajectory predictions" />
      <div style={{ padding: 32 }}>

        {/* Period Selector */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '8px 20px',
                borderRadius: 10,
                border: '1px solid',
                borderColor: period === p ? 'rgba(99,102,241,0.5)' : 'var(--border-subtle)',
                background: period === p ? 'rgba(99,102,241,0.12)' : 'transparent',
                color: period === p ? 'var(--accent-indigo)' : 'var(--text-muted)',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Revenue Forecast', value: formatCurrency(data.revenue), sub: `+${data.growth}% growth` },
            { label: 'Est. Customers', value: data.customers.toLocaleString(), sub: `+${(data.customers - 2847).toLocaleString()} new` },
            { label: 'Confidence', value: `${data.confidence}%`, sub: `${period} horizon` },
            { label: 'Risk Level', value: data.risk.charAt(0).toUpperCase() + data.risk.slice(1), sub: 'AI assessment', riskColor },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="kpi-card"
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                {card.label}
              </div>
              <div style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 800, color: (card as any).riskColor || 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                {card.value}
              </div>
              <div style={{ fontSize: 12, color: 'var(--accent-emerald)' }}>{card.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Forecast Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
          style={{ padding: 28, marginBottom: 28 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                Revenue Forecast — {PERIOD_LABELS[period]}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                AI-projected MRR trajectory with {data.confidence}% confidence
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <RiskIcon size={16} style={{ color: riskColor }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: riskColor }}>
                {data.risk.charAt(0).toUpperCase() + data.risk.slice(1)} Risk
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.trend}>
              <defs>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#forecastGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Impact Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            {
              title: 'Business Growth',
              icon: TrendingUp,
              color: 'var(--accent-emerald)',
              items: [
                `Revenue grows to ${formatCurrency(data.revenue)} (+${data.growth}%)`,
                `${data.customers.toLocaleString()} total customers`,
                'NRR expected to exceed 120%',
              ],
            },
            {
              title: 'Financial Impact',
              icon: Activity,
              color: 'var(--accent-indigo)',
              items: [
                'Gross margin holds at 74-78%',
                'Runway extends by 8 months',
                'Path to profitability: Q2 next year',
              ],
            },
            {
              title: 'Customer Impact',
              icon: CheckCircle,
              color: 'var(--accent-teal)',
              items: [
                'NPS expected to reach 68-72',
                'Churn projected to drop to 1.8%',
                'Enterprise tier grows 40%',
              ],
            },
            {
              title: 'Operational Impact',
              icon: AlertTriangle,
              color: 'var(--accent-amber)',
              items: [
                'Support load increases 22% — scale team',
                'Infra costs rise $180K/quarter',
                'Engineering velocity risk at 90d mark',
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="card"
              style={{ padding: 24 }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${section.color}15`,
                  border: `1px solid ${section.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <section.icon size={16} style={{ color: section.color }} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{section.title}</div>
              </div>
              {section.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: section.color, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
