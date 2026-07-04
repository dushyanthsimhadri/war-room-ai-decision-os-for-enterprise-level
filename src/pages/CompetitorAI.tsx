import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { Globe, Sparkles, TrendingUp, TrendingDown, Target } from 'lucide-react'
import { competitorData } from '@/data/mockData'

export function CompetitorAI() {
  const [url, setUrl] = useState('https://prism.io')
  const [analyzed, setAnalyzed] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!url.trim()) return
    setAnalyzing(true)
    await new Promise((r) => setTimeout(r, 2000))
    setAnalyzing(false)
    setAnalyzed(true)
  }

  return (
    <div>
      <TopBar title="Competitor AI" subtitle="Competitive intelligence in seconds" />
      <div style={{ padding: 32 }}>

        {/* URL Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 28, marginBottom: 28 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <Globe size={18} style={{ color: 'var(--accent-teal)' }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Analyze Competitor</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              className="war-room-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://competitor.com"
              style={{ flex: 1, padding: '12px 16px' }}
            />
            <button className="btn-primary" onClick={handleAnalyze} disabled={analyzing} style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              {analyzing ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                  <Sparkles size={14} />
                </motion.div> Analyzing…</>
              ) : <><Sparkles size={14} /> Analyze</>}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {analyzed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                    {competitorData.company}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{competitorData.website} · Pricing: {competitorData.pricing}</div>
                </div>
                <div className="badge-negative" style={{ fontSize: 13, padding: '6px 14px' }}>Threat Level: Medium</div>
              </div>

              {/* SWOT Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 24, borderLeft: '3px solid var(--accent-emerald)' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                    <TrendingUp size={16} style={{ color: 'var(--accent-emerald)' }} />
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: 12 }}>Strengths</div>
                  </div>
                  {competitorData.strengths.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>+</span>{s}
                    </div>
                  ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 24, borderLeft: '3px solid var(--accent-red)' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
                    <TrendingDown size={16} style={{ color: 'var(--accent-red)' }} />
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Weaknesses (Opportunities for Us)</div>
                  </div>
                  {competitorData.weaknesses.map((w, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>−</span>{w}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Missing Opportunities */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 24, marginBottom: 20, borderLeft: '3px solid var(--accent-amber)' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-amber)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
                  Gaps We Can Win
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {competitorData.missing.map((m, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 14px', borderRadius: 10, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', fontSize: 13, color: 'var(--text-secondary)' }}>
                      <Target size={13} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
                      {m}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Strategic Recommendations */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Strategic Recommendations</div>
                {competitorData.recommendations.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 0', borderBottom: i < competitorData.recommendations.length - 1 ? '1px solid var(--border-subtle)' : undefined }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--accent-indigo)', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r}</span>
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
