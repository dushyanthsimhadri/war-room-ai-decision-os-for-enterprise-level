import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { scenarios } from '@/data/mockData'
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const comparisonRows = [
  { metric: 'Revenue Impact', a: '+18.4%', b: '+4.1%', c: '-8.2%', aGood: true, bNeutral: true, cGood: false },
  { metric: 'Customer Retention', a: '+5.2%', b: '-2.8%', c: '-11.4%', aGood: true, bNeutral: false, cGood: false },
  { metric: 'ROI', a: '340%', b: '120%', c: '-40%', aGood: true, bNeutral: true, cGood: false },
  { metric: 'Risk Level', a: 'Medium', b: 'High', c: 'Critical', aGood: true, bNeutral: false, cGood: false },
  { metric: 'Engineering Cost', a: '$480K', b: '$120K', c: '$0', aGood: true, bNeutral: true, cGood: true },
  { metric: 'Customer Satisfaction', a: '+14 pts', b: '-8 pts', c: '-22 pts', aGood: true, bNeutral: false, cGood: false },
  { metric: 'Timeline', a: '12 weeks', b: '24 weeks', c: 'N/A', aGood: true, bNeutral: false, cGood: false },
  { metric: 'Success Probability', a: '72%', b: '18%', c: '10%', aGood: true, bNeutral: false, cGood: false },
]

function ScenarioHeader({ s }: { s: typeof scenarios[0] }) {
  return (
    <div style={{
      padding: 24,
      borderBottom: '1px solid var(--border-subtle)',
      background: `linear-gradient(135deg, ${s.color}08, transparent)`,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
        {s.label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{s.title}</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 16 }}>{s.description}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>AI Probability</div>
          <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 800, color: s.color }}>{s.probability}%</div>
        </div>
        {s.recommended && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            borderRadius: 99,
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--accent-emerald)',
          }}>
            <CheckCircle size={12} /> Recommended
          </div>
        )}
      </div>
      {/* Probability bar */}
      <div className="confidence-bar" style={{ marginTop: 12 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${s.probability}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ height: '100%', borderRadius: 99, background: s.color }}
        />
      </div>
    </div>
  )
}

export function Scenarios() {
  return (
    <div>
      <TopBar title="Scenario Simulator" subtitle="Side-by-side decision outcomes" />
      <div style={{ padding: 32 }}>

        {/* 3-column comparison grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
          {scenarios.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(13,17,23,0.9)',
                border: `1px solid ${s.color}30`,
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: s.recommended ? `0 0 40px ${s.color}15` : undefined,
              }}
            >
              <ScenarioHeader s={s} />
              <div style={{ padding: 20 }}>
                {Object.entries(s.metrics).map(([key, value]) => (
                  <div key={key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border-subtle)',
                    fontSize: 13,
                  }}>
                    <span style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span style={{
                      fontWeight: 700,
                      color: String(value).startsWith('+') ? 'var(--accent-emerald)'
                        : String(value).startsWith('-') && !String(value).includes('$') ? 'var(--accent-red)'
                          : 'var(--text-primary)',
                    }}>
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
          style={{ overflow: 'hidden' }}
        >
          <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Head-to-Head Comparison</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '14px 28px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Metric
                </th>
                {scenarios.map((s) => (
                  <th key={s.id} style={{ padding: '14px 28px', textAlign: 'center', fontSize: 12, fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.metric} style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 28px', fontSize: 14, color: 'var(--text-secondary)' }}>{row.metric}</td>
                  <td style={{ padding: '14px 28px', textAlign: 'center', fontSize: 14, fontWeight: 700, color: row.aGood ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>
                    {row.a}
                  </td>
                  <td style={{ padding: '14px 28px', textAlign: 'center', fontSize: 14, fontWeight: 700, color: row.bNeutral ? 'var(--accent-amber)' : 'var(--accent-red)' }}>
                    {row.b}
                  </td>
                  <td style={{ padding: '14px 28px', textAlign: 'center', fontSize: 14, fontWeight: 700, color: row.cGood ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>
                    {row.c}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}
