import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import {
  CheckCircle, AlertTriangle, XCircle, Clock, TrendingUp,
  Brain, FileText, ArrowRight, BookOpen, Sparkles
} from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import {
  predictionHistory, PREDICTION_ACCURACY_SUMMARY, DecisionPrediction
} from '@/data/predictionReviewData'

export function PredictionReview() {
  const [selectedDecision, setSelectedDecision] = useState<DecisionPrediction | null>(null)

  const getStatusBadge = (status: 'Accurate' | 'Needs Review' | 'Incorrect') => {
    switch (status) {
      case 'Accurate':
        return (
          <span className="badge-positive" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <CheckCircle size={12} /> Accurate
          </span>
        )
      case 'Needs Review':
        return (
          <span className="badge-neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <AlertTriangle size={12} /> Needs Review
          </span>
        )
      case 'Incorrect':
        return (
          <span className="badge-negative" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <XCircle size={12} /> Incorrect
          </span>
        )
    }
  }

  const getStatusColor = (status: 'Accurate' | 'Needs Review' | 'Incorrect') => {
    switch (status) {
      case 'Accurate': return 'var(--accent-emerald)'
      case 'Needs Review': return 'var(--accent-amber)'
      case 'Incorrect': return 'var(--accent-red)'
    }
  }

  return (
    <div>
      <TopBar title="Prediction Accuracy & Review" subtitle="Auditable validation logs comparing AI forecasts against actual business outcomes" />
      <div style={{ padding: 32 }}>

        {/* Hero Accuracy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'grid', gridTemplateColumns: '320px 1fr', gap: 28, marginBottom: 28,
            padding: '32px 36px', borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(99,102,241,0.04))',
            border: '1px solid rgba(16,185,129,0.2)'
          }}
        >
          {/* Radial Accuracy Indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--border-subtle)', paddingRight: 24 }}>
            <div style={{ position: 'relative', width: 130, height: 130 }}>
              <svg viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                <circle cx="65" cy="65" r="55" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                <motion.circle
                  cx="65"
                  cy="65"
                  r="55"
                  fill="none"
                  stroke="var(--accent-emerald)"
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 55}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 55 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 55 * (1 - PREDICTION_ACCURACY_SUMMARY.overall / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="number-font" style={{ fontSize: 36, fontWeight: 900, color: 'var(--accent-emerald)' }}>{PREDICTION_ACCURACY_SUMMARY.overall}%</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Overall Accuracy</span>
              </div>
            </div>
          </div>

          {/* Sub-KPI Accuracies */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
              Active Validation Matrix
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {PREDICTION_ACCURACY_SUMMARY.categories.map((c) => (
                <div key={c.name} style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>{c.name}</div>
                  <div className="number-font" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>{c.value}%</div>
                  <span className="badge-positive" style={{ fontSize: 10 }}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Info Note */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 10,
          background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', marginBottom: 28, fontSize: 12, color: 'var(--text-secondary)'
        }}>
          <Brain size={16} style={{ color: 'var(--accent-indigo)' }} />
          <span><strong>Transparency & Compliance Log</strong>: Continuous model weights fine-tuning or automatic retraining is deactivated to preserve historical audit consistency. Users can manually review each variance outcome to inform strategic business decisions.</span>
        </div>

        {/* History List */}
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Historical Decision Logs</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {predictionHistory.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card"
              style={{ padding: 24 }}
            >
              {/* Header block */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Forecast Date: {d.forecastDate}</span>
                    <span className="badge-positive" style={{ fontSize: 10, background: 'rgba(99,102,241,0.12)', color: 'var(--accent-indigo)', borderColor: 'rgba(99,102,241,0.2)' }}>{d.status}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{d.question}</h3>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--text-muted)' }}>Recommendation:</strong> {d.recommendation}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>Prediction Accuracy</div>
                  <div className="number-font" style={{ fontSize: 32, fontWeight: 900, color: d.overallAccuracy > 90 ? 'var(--accent-emerald)' : d.overallAccuracy > 80 ? 'var(--accent-indigo)' : 'var(--accent-amber)' }}>{d.overallAccuracy}%</div>
                </div>
              </div>

              {/* Grid with Table & Visualization */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
                
                {/* Metric comparisons */}
                <div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border-subtle)' }}>
                        {['KPI metric', 'Predicted', 'Actual Outcome', 'Variance', 'Status'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: h === 'KPI metric' ? 'left' : 'center' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {d.metrics.map((m, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '12px 14px', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{m.kpi}</td>
                          <td style={{ padding: '12px 14px', textAlign: 'center', fontSize: 13, fontFamily: 'Outfit', color: 'var(--text-muted)' }}>{m.predicted}</td>
                          <td style={{ padding: '12px 14px', textAlign: 'center', fontSize: 13, fontFamily: 'Outfit', fontWeight: 700, color: 'var(--text-primary)' }}>{m.actual}</td>
                          <td style={{ padding: '12px 14px', textAlign: 'center', fontSize: 12, fontFamily: 'Outfit', color: getStatusColor(m.status), fontWeight: 600 }}>{m.difference}</td>
                          <td style={{ padding: '12px 14px', textAlign: 'center' }}>{getStatusBadge(m.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: 16 }}>
                    <button
                      className="btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, padding: '8px 16px' }}
                      onClick={() => setSelectedDecision(d)}
                    >
                      <BookOpen size={14} /> Review Decision & Explain Variance
                    </button>
                  </div>
                </div>

                {/* KPI bar chart visualization */}
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
                    Prediction vs Actual Value
                  </div>
                  <div style={{ height: 120 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={d.metrics.map(m => ({
                        name: m.kpi.split(' ')[0],
                        Predicted: m.accuracy,
                        Actual: 100
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                        <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
                        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 9 }} domain={[0, 100]} />
                        <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', fontSize: 11 }} />
                        <Legend wrapperStyle={{ fontSize: 9 }} />
                        <Bar dataKey="Predicted" fill="var(--accent-indigo)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Actual" fill="var(--accent-emerald)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Review Dialog */}
      <AnimatePresence>
        {selectedDecision && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="card"
              style={{ width: '100%', maxWidth: 680, padding: 32, position: 'relative', overflow: 'hidden' }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 99, background: 'rgba(99,102,241,0.12)', color: 'var(--accent-indigo)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 8 }}>
                    <Brain size={12} /> AI DEBRIEF ANALYSIS
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>Variance Performance Review</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{selectedDecision.question}</p>
                </div>
                <button
                  onClick={() => setSelectedDecision(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>

              {/* Explanatory blocks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                {[
                  { title: '🔮 What Was Predicted', text: selectedDecision.aiExplanation.whatPredicted, color: 'var(--accent-indigo)' },
                  { title: '✅ What Actually Happened', text: selectedDecision.aiExplanation.whatHappened, color: 'var(--accent-emerald)' },
                  { title: '⚖️ Why There Was a Difference', text: selectedDecision.aiExplanation.whyDifference, color: 'var(--accent-amber)' },
                  { title: '💡 Learning & Future Enhancements', text: selectedDecision.aiExplanation.whatToImprove, color: '#ec4899' },
                ].map((sec) => (
                  <div key={sec.title} style={{ padding: '14px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.015)', border: '1px solid var(--border-subtle)', borderLeft: `3px solid ${sec.color}` }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: sec.color, marginBottom: 6 }}>{sec.title}</div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{sec.text}</p>
                  </div>
                ))}
              </div>

              {/* Footer notice */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Strategic review purposes only. Dynamic retuning weights: offline.
                </span>
                <button
                  className="btn-primary"
                  style={{ fontSize: 12, padding: '8px 20px' }}
                  onClick={() => setSelectedDecision(null)}
                >
                  Acknowledge & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
