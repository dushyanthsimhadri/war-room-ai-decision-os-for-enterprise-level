import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ReferenceLine,
} from 'recharts'
import { TopBar } from '@/components/layout/TopBar'
import { kpiData, scenarios } from '@/data/mockData'
import { TrendingUp, TrendingDown, CheckCircle, AlertTriangle, X } from 'lucide-react'

const kpiImpactData = [
  { kpi: 'MRR', current: 2340, scenarioA: 2771, scenarioB: 2436, scenarioC: 2148 },
  { kpi: 'ARR', current: 28080, scenarioA: 33241, scenarioB: 29231, scenarioC: 25793 },
  { kpi: 'Retention', current: 94.2, scenarioA: 99.1, scenarioB: 91.6, scenarioC: 83.5 },
  { kpi: 'NPS', current: 62, scenarioA: 76, scenarioB: 54, scenarioC: 40 },
  { kpi: 'Churn', current: 2.4, scenarioA: 1.4, scenarioB: 3.1, scenarioC: 6.8 },
]

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null
  return (
    <div className="glass-strong" style={{ padding: '12px 16px', borderRadius: 10, fontSize: 13 }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.fill, marginBottom: 4 }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export function KPIImpact() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div>
      <TopBar title="KPI Impact Engine" subtitle="Before / after decision analysis" />
      <div style={{ padding: 32 }}>

        {/* Scenario Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {scenarios.map((s) => (
            <motion.div
              key={s.id}
              className={`card ${selected === s.id ? 'card-accent' : ''}`}
              style={{
                padding: 20,
                cursor: 'pointer',
                borderColor: selected === s.id ? s.color : undefined,
              }}
              whileHover={{ y: -2 }}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{s.title}</div>
                </div>
                {s.recommended && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-emerald)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '3px 8px', borderRadius: 99, whiteSpace: 'nowrap' }}>
                    Recommended
                  </span>
                )}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>{s.description}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Revenue</div>
                  <div style={{ fontWeight: 700, color: s.metrics.revenue.startsWith('+') ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>{s.metrics.revenue}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>ROI</div>
                  <div style={{ fontWeight: 700, color: s.metrics.roi.startsWith('-') ? 'var(--accent-red)' : 'var(--accent-emerald)' }}>{s.metrics.roi}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Risk</div>
                  <div style={{ fontWeight: 700, color: s.metrics.risk === 'Critical' ? 'var(--accent-red)' : s.metrics.risk === 'High' ? 'var(--accent-amber)' : 'var(--accent-emerald)' }}>{s.metrics.risk}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* KPI Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
          style={{ padding: 28, marginBottom: 28 }}
        >
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>KPI Impact Comparison</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Current baseline vs. each scenario outcome</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpiImpactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="kpi" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="current" name="Current" fill="rgba(255,255,255,0.12)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="scenarioA" name="Scenario A" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="scenarioB" name="Scenario B" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="scenarioC" name="Scenario C" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Before / After Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { label: 'MRR', before: '$2.34M', after: '$2.77M', delta: '+18.4%', good: true },
            { label: 'Retention', before: '94.2%', after: '99.1%', delta: '+5.2%', good: true },
            { label: 'NPS', before: '62', after: '76', delta: '+14 pts', good: true },
            { label: 'Churn Rate', before: '2.4%', after: '1.4%', delta: '-41.7%', good: true },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="kpi-card"
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                {item.label}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Before</div>
                  <div style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: 'var(--text-muted)' }}>{item.before}</div>
                </div>
                <div style={{ fontSize: 20, color: 'var(--border-default)' }}>→</div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>After</div>
                  <div style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: 'var(--accent-emerald)' }}>{item.after}</div>
                </div>
              </div>
              <div style={{ marginTop: 10 }} className={item.good ? 'badge-positive' : 'badge-negative'}>
                {item.delta}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
