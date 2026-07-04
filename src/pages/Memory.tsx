import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { decisionHistory, AI_EMPLOYEES } from '@/data/mockData'
import { CheckCircle, XCircle, Clock, Swords, TrendingUp, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const STATUS_CONFIG = {
  approved: { icon: CheckCircle, color: 'var(--accent-indigo)', label: 'Approved' },
  rejected: { icon: XCircle, color: 'var(--accent-red)', label: 'Rejected' },
  in_progress: { icon: Clock, color: 'var(--accent-amber)', label: 'In Progress' },
}
const OUTCOME_CONFIG = {
  success: { color: 'var(--accent-emerald)', label: 'Successful' },
  correct: { color: 'var(--accent-emerald)', label: 'Correct Call' },
  pending: { color: 'var(--accent-amber)', label: 'Pending' },
  in_progress: { color: 'var(--accent-teal)', label: 'In Progress' },
  failed: { color: 'var(--accent-red)', label: 'Failed' },
}

export function Memory() {
  const navigate = useNavigate()

  return (
    <div>
      <TopBar title="Decision Memory" subtitle="Complete history of War Room sessions and outcomes" />
      <div style={{ padding: 32 }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Decisions', value: '47', sub: 'Since Jan 2026' },
            { label: 'Avg Confidence', value: '84%', sub: 'AI forecast accuracy' },
            { label: 'Success Rate', value: '91%', sub: 'Approved decisions' },
            { label: 'Value Created', value: '$8.4M', sub: 'ARR impact attributed' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="kpi-card">
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{s.label}</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Decision List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {decisionHistory.map((d, i) => {
            const statusConf = STATUS_CONFIG[d.status as keyof typeof STATUS_CONFIG]
            const outcomeConf = d.outcome ? OUTCOME_CONFIG[d.outcome as keyof typeof OUTCOME_CONFIG] : null
            const StatusIcon = statusConf.icon
            const agentList = AI_EMPLOYEES.filter((a) => d.agents.includes(a.id))

            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card"
                style={{ padding: 24 }}
              >
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: `${statusConf.color}12`,
                    border: `1px solid ${statusConf.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <StatusIcon size={18} style={{ color: statusConf.color }} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.date}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: statusConf.color }}>{statusConf.label}</span>
                      {outcomeConf && (
                        <span className="badge-positive" style={{ fontSize: 11, color: outcomeConf.color, background: `${outcomeConf.color}12`, borderColor: `${outcomeConf.color}25` }}>
                          {outcomeConf.label}
                        </span>
                      )}
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.confidence}% confidence</span>
                    </div>

                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4 }}>
                      {d.question}
                    </h3>

                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.5 }}>
                      <strong style={{ color: 'var(--text-muted)' }}>Decision:</strong> {d.recommendation}
                    </div>

                    {/* KPI Impact */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
                      {Object.entries(d.kpiImpact).map(([k, v]) => (
                        <span
                          key={k}
                          className={v > 0 ? 'badge-positive' : v < 0 ? 'badge-negative' : 'badge-neutral'}
                          style={{ fontSize: 11 }}
                        >
                          {k}: {v > 0 ? '+' : ''}{v}%
                        </span>
                      ))}
                    </div>

                    {/* Predicted vs Actual */}
                    {d.actualImpact && (
                      <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)', fontSize: 12, marginBottom: 14 }}>
                        <span style={{ color: 'var(--text-muted)' }}>Actual outcome vs prediction: </span>
                        {Object.entries(d.actualImpact).map(([k, v]) => (
                          <span key={k} style={{ marginLeft: 8, color: 'var(--accent-emerald)', fontWeight: 600 }}>
                            {k}: {v > 0 ? '+' : ''}{v}%
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Agents */}
                    <div style={{ display: 'flex', gap: 4 }}>
                      {agentList.map((a) => (
                        <span key={a.id} title={a.name} style={{ fontSize: 18, cursor: 'default' }}>{a.avatar}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    className="btn-ghost"
                    style={{ fontSize: 12, padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}
                    onClick={() => navigate(`/warroom?session=${d.id}`)}
                  >
                    Replay <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
