import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { experiments } from '@/data/mockData'
import { FlaskConical, CheckCircle, Clock, TrendingUp, AlertTriangle, Plus } from 'lucide-react'

export function Experiments() {
  return (
    <div>
      <TopBar title="Experiment Center" subtitle="AI-generated A/B test plans" />
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, padding: '8px 16px' }}>
            <Plus size={13} /> New Experiment
          </button>
          <button className="btn-ghost" style={{ fontSize: 13, padding: '8px 14px' }}>View Results</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card"
              style={{ padding: 28 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <FlaskConical size={16} style={{ color: 'var(--accent-indigo)' }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Hypothesis
                    </span>
                    <span className={
                      exp.status === 'complete' && exp.result === 'success' ? 'badge-positive'
                        : exp.status === 'running' ? 'badge-neutral'
                          : 'badge-negative'
                    }>
                      {exp.status === 'complete' && exp.result === 'success' ? 'Success ✓'
                        : exp.status === 'running' ? 'Running'
                          : 'Failed'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4, maxWidth: 700 }}>
                    {exp.hypothesis}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>AI Confidence</div>
                  <div style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 800, color: 'var(--accent-indigo)' }}>{exp.confidence}%</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
                {[
                  { label: 'Metric', value: exp.metric },
                  { label: 'Baseline', value: exp.baseline },
                  { label: 'Target', value: exp.target },
                  { label: 'Expected Lift', value: exp.expectedLift, color: 'var(--accent-emerald)' },
                ].map((m) => (
                  <div key={m.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                      {m.label}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: (m as any).color || 'var(--text-primary)', fontFamily: 'Outfit' }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {exp.status === 'running' && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
                    <span>Progress ({exp.startDate} → {exp.endDate})</span>
                    <span>Day 7 of 14</span>
                  </div>
                  <div className="confidence-bar" style={{ height: 6 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '50%' }}
                      transition={{ duration: 1 }}
                      style={{ height: '100%', borderRadius: 99, background: 'var(--gradient-primary)' }}
                    />
                  </div>
                </div>
              )}

              {exp.result === 'success' && (
                <div style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <CheckCircle size={16} style={{ color: 'var(--accent-emerald)' }} />
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    Experiment succeeded! Actual lift: <strong style={{ color: 'var(--accent-emerald)' }}>{exp.actualLift}</strong> vs expected {exp.expectedLift}
                  </span>
                </div>
              )}

              <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)', fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: 4 }}>✓ Success Condition</div>
                  <div style={{ color: 'var(--text-muted)' }}>{exp.successCondition}</div>
                </div>
                <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)', fontSize: 12 }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-red)', marginBottom: 4 }}>✗ Failure Condition</div>
                  <div style={{ color: 'var(--text-muted)' }}>{exp.failureCondition}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
