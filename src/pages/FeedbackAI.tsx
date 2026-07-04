import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { MessageSquare, Sparkles, Upload, TrendingUp, AlertTriangle, Star } from 'lucide-react'

const SAMPLE_FEEDBACK = `Love the dashboard but onboarding is confusing. Took 45 minutes to set up.
The analytics are world-class. Best I've seen in any tool.
Why is there no mobile app?? I need to check metrics on the go.
Great product but support takes 3 days to respond.
The bulk import keeps failing for files over 10MB. Frustrating.
NPS: 10. Would recommend to every team.
The API documentation is excellent. Integration was smooth.
Pricing is too high for startups. Need a cheaper tier.
Love the automation features. Saved our team 6 hours/week.
The onboarding is broken. I almost churned on day 3.`

const clusters = [
  { id: 'onboarding', label: 'Onboarding Friction', count: 34, sentiment: 'negative', mentions: ['confusing', 'slow setup', 'day 3 churn risk'], value: '$1.2M ARR at risk', priority: 1, color: '#ef4444' },
  { id: 'analytics', label: 'Analytics Quality', count: 28, sentiment: 'positive', mentions: ['world-class', 'best in class', 'love the dashboard'], value: '+$800K expansion potential', priority: 3, color: '#10b981' },
  { id: 'mobile', label: 'Mobile App Request', count: 22, sentiment: 'neutral', mentions: ['no mobile', 'need mobile', 'check metrics on go'], value: 'Blocks 40% of enterprise deals', priority: 2, color: '#f59e0b' },
  { id: 'support', label: 'Support Speed', count: 19, sentiment: 'negative', mentions: ['slow response', '3 days', 'frustrating'], value: 'NPS impact: -18 pts', priority: 1, color: '#ef4444' },
  { id: 'pricing', label: 'Pricing Concerns', count: 15, sentiment: 'negative', mentions: ['too expensive', 'need cheaper', 'startup tier'], value: 'Blocks 30% of SMB conversions', priority: 2, color: '#f59e0b' },
]

export function FeedbackAI() {
  const [text, setText] = useState(SAMPLE_FEEDBACK)
  const [analyzed, setAnalyzed] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim()) return
    setAnalyzing(true)
    await new Promise((r) => setTimeout(r, 1800))
    setAnalyzing(false)
    setAnalyzed(true)
  }

  return (
    <div>
      <TopBar title="Customer Feedback AI" subtitle="Cluster, analyze, and act on customer feedback" />
      <div style={{ padding: 32 }}>
        {/* Input Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 28, marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <MessageSquare size={18} style={{ color: 'var(--accent-indigo)' }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Paste Customer Feedback</div>
          </div>
          <textarea
            className="war-room-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste reviews, NPS responses, support tickets, G2 reviews..."
            rows={8}
            style={{ marginBottom: 16 }}
          />
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primary" onClick={handleAnalyze} disabled={analyzing} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {analyzing ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Sparkles size={14} />
                </motion.div> Analyzing…</>
              ) : <><Sparkles size={14} /> Analyze Feedback</>}
            </button>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', alignSelf: 'center' }}>
              {text.split('\n').filter(Boolean).length} responses
            </span>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {analyzed && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Sentiment Overview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
                {[
                  { label: 'Positive', pct: 38, color: 'var(--accent-emerald)' },
                  { label: 'Neutral', pct: 24, color: 'var(--accent-amber)' },
                  { label: 'Negative', pct: 38, color: 'var(--accent-red)' },
                ].map((s) => (
                  <div key={s.label} className="kpi-card">
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{s.label}</div>
                    <div style={{ fontFamily: 'Outfit', fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 8 }}>{s.pct}%</div>
                    <div className="confidence-bar">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.8 }} style={{ height: '100%', borderRadius: 99, background: s.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Clusters */}
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Feedback Clusters</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {clusters.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="card"
                    style={{ padding: 20, borderLeft: `3px solid ${c.color}` }}
                  >
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{c.label}</span>
                          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.count} mentions</span>
                          <span className={c.sentiment === 'positive' ? 'badge-positive' : c.sentiment === 'negative' ? 'badge-negative' : 'badge-neutral'}>
                            {c.sentiment}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                          {c.mentions.map((m) => (
                            <span key={m} style={{ fontSize: 12, padding: '2px 10px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                              "{m}"
                            </span>
                          ))}
                        </div>
                        <div style={{ fontSize: 13, color: c.color, fontWeight: 600 }}>💡 {c.value}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Priority</div>
                        <div style={{ display: 'flex', gap: 3 }}>
                          {[1, 2, 3].map((s) => (
                            <Star key={s} size={14} style={{ color: s <= c.priority ? 'var(--accent-amber)' : 'var(--border-default)', fill: s <= c.priority ? 'var(--accent-amber)' : 'none' }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Feature Recommendations */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card" style={{ padding: 28 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>AI Feature Recommendations</div>
                {[
                  { feature: 'Redesign onboarding flow (Days 1–3)', impact: 'Reduces churn by ~40%', effort: 'High', value: '$1.2M' },
                  { feature: 'Mobile app (iOS first)', impact: 'Unblocks 40% of enterprise deals', effort: 'Very High', value: '$2.8M' },
                  { feature: 'Live chat support (<5min SLA)', impact: 'NPS +18 pts', effort: 'Medium', value: '$600K' },
                  { feature: 'Startup pricing tier ($49/mo)', impact: 'Opens SMB market segment', effort: 'Low', value: '$900K' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < 3 ? '1px solid var(--border-subtle)' : undefined }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>{r.feature}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{r.impact}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Effort: {r.effort}</span>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'Outfit' }}>{r.value}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
