import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts'
import {
  Activity, AlertTriangle, ArrowUpRight, ArrowDownRight,
  Brain, CheckCircle, Clock, Database, DollarSign, FileText,
  Play, Pause, FastForward, Rewind, RotateCcw, Shield,
  Sparkles, Swords, TrendingUp, Users, ChevronDown, ChevronUp,
  Sliders, Star
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import {
  BUSINESS_HEALTH, HIGH_IMPACT_DECISION, DEPARTMENTS,
  EXECUTIVE_ALERTS, SOURCES_OF_TRUTH, DECISION_REPLAY_STEPS
} from '@/data/executiveIntelligenceData'
import { FINANCE_EMPLOYEES } from '@/data/financeData'
import { formatINR } from '@/lib/financeUtils'

export function Dashboard() {
  const navigate = useNavigate()

  // Replay State
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [replaySpeed, setReplaySpeed] = useState<0.5 | 1 | 2>(1)

  // Expandable Sources of Truth
  const [expandedSource, setExpandedSource] = useState<string | null>(null)

  // Selected Department for War Room Modal
  const [selectedDept, setSelectedDept] = useState<typeof DEPARTMENTS[0] | null>(null)

  // Automated Replay player loop
  useEffect(() => {
    let interval: any
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= DECISION_REPLAY_STEPS.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 3000 / replaySpeed)
    }
    return () => clearInterval(interval)
  }, [isPlaying, replaySpeed])

  const handleStepJump = (idx: number) => {
    setCurrentStep(idx)
    setIsPlaying(false)
  }

  // Get color for department health
  const getDeptColor = (code: 'green' | 'yellow' | 'orange' | 'red') => {
    switch (code) {
      case 'green': return 'var(--accent-emerald)'
      case 'yellow': return 'var(--accent-amber)'
      case 'orange': return '#f97316'
      case 'red': return 'var(--accent-red)'
    }
  }

  // AI Confidence Meter display logic
  const confidence = HIGH_IMPACT_DECISION.confidenceMeter.overall
  const isConfidenceLow = confidence < 70

  return (
    <div>
      <TopBar title="Executive Command Center" subtitle="Real-time company health monitor & strategic decision intelligence console" />
      <div style={{ padding: 32 }}>

        {/* ─── CEO SUMMARY METRICS GRID ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 24 }}>
          {/* Health Score Circular Dial */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="kpi-card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 68, height: 68, flexShrink: 0 }}>
              <svg viewBox="0 0 68 68" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <motion.circle
                  cx="34"
                  cy="34"
                  r="28"
                  fill="none"
                  stroke="var(--accent-emerald)"
                  strokeWidth="6"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - BUSINESS_HEALTH.healthScore / 100) }}
                  transition={{ duration: 1 }}
                  strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="number-font" style={{ fontSize: 16, fontWeight: 850, color: 'var(--text-primary)' }}>{BUSINESS_HEALTH.healthScore}</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Business Health</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-emerald)', marginTop: 2 }}>Excellent</div>
            </div>
          </motion.div>

          {[
            { label: 'Company Risk Score', value: `${BUSINESS_HEALTH.companyRiskScore}/100`, color: 'var(--accent-emerald)', trend: 'down', desc: 'Reduced by 2 pts this week' },
            { label: '30D Revenue Forecast', value: formatINR(BUSINESS_HEALTH.revenueForecast30D), color: 'var(--accent-indigo)', trend: 'up', desc: 'Aligned with target' },
            { label: 'Cash Position', value: formatINR(BUSINESS_HEALTH.cashPosition), color: 'var(--accent-teal)', trend: 'flat', desc: 'Across checked accounts' },
            { label: 'Open Core Decisions', value: `${BUSINESS_HEALTH.openDecisionsCount} Active`, color: 'var(--accent-amber)', trend: 'flat', desc: 'Requires executive approval' },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="kpi-card">
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
              <div className="number-font" style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>{m.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{m.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* ─── TODAYS HIGHEST IMPACT DECISION ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, marginBottom: 28 }}>
          {/* Main Decision Detail Column */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <div>
                <span className="badge-positive" style={{ fontSize: 10, background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', borderColor: 'rgba(239,68,68,0.2)' }}>
                  🔥 Today's Highest Impact Decision
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginTop: 8, letterSpacing: '-0.02em' }}>
                  {HIGH_IMPACT_DECISION.title}
                </h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                  {HIGH_IMPACT_DECISION.recommendation}
                </p>
              </div>
            </div>

            {/* Cost Analyzer metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24, padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
              {[
                { label: 'Investment Required', value: '₹2.4 Cr', color: 'var(--accent-red)' },
                { label: 'Expected Return', value: '₹11.8 Cr', color: 'var(--accent-emerald)' },
                { label: 'Projected ROI', value: '392%', color: 'var(--accent-emerald)' },
                { label: 'Break-even Period', value: '8 Months', color: 'var(--accent-teal)' },
                { label: 'Staff Needed', value: '12 Eng / 4 Biz', color: 'var(--text-primary)' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                  <div className="number-font" style={{ fontSize: 16, fontWeight: 850, color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
                  Investment Cost vs Projected Cumulative Value Realization
                </div>
                <div style={{ height: 160 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={HIGH_IMPACT_DECISION.valueTimeline}>
                      <defs>
                        <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--accent-emerald)" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="var(--accent-emerald)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                      <YAxis tickFormatter={(v) => `₹${v/10000000}Cr`} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
                      <Tooltip formatter={(v: any) => formatINR(v)} contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 10, fontSize: 11 }} />
                      <Area type="monotone" dataKey="Value" stroke="var(--accent-emerald)" strokeWidth={2} fillOpacity={1} fill="url(#valGrad)" />
                      <Area type="monotone" dataKey="Cost" stroke="var(--accent-red)" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 12 }}>
                  Implementation Costs
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {HIGH_IMPACT_DECISION.costBreakdown.map((c) => (
                    <div key={c.name} style={{ padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4 }}>
                        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{c.name}</span>
                        <span className="number-font" style={{ fontWeight: 700, color: c.color }}>{formatINR(c.value)}</span>
                      </div>
                      <div style={{ height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(c.value / HIGH_IMPACT_DECISION.investment) * 100}%`, background: c.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SOURCE OF TRUTH (Expandable business evidence) */}
            <div style={{ marginTop: 24, borderTop: '1px solid var(--border-subtle)', paddingTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
                📡 Sourced Business Evidence ({SOURCES_OF_TRUTH.length})
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {SOURCES_OF_TRUTH.map((source) => {
                  const isExpanded = expandedSource === source.name
                  return (
                    <div key={source.name} style={{ borderRadius: 10, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                      <button
                        onClick={() => setExpandedSource(isExpanded ? null : source.name)}
                        style={{ width: '100%', padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>{source.name}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                            Updated: {source.lastUpdated} · contribution: <strong style={{ color: 'var(--accent-indigo)' }}>{source.contribution}%</strong>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp size={14} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
                            <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.005)', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11 }}>
                              <div><strong style={{ color: 'var(--text-muted)' }}>Key Insights:</strong> <span style={{ color: 'var(--text-secondary)' }}>{source.insights}</span></div>
                              <div><strong style={{ color: 'var(--text-muted)' }}>Data Points:</strong> <span style={{ color: 'var(--text-secondary)' }}>{source.dataUsed}</span></div>
                              <div><strong style={{ color: 'var(--text-muted)' }}>AI Reasoning:</strong> <span style={{ color: 'var(--text-secondary)' }}>{source.reasoning}</span></div>
                              <div><strong style={{ color: 'var(--text-muted)' }}>Verifiable Evidence:</strong> <span style={{ color: 'var(--accent-emerald)' }}>{source.evidence}</span></div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right column: Confidence Meter & Actions */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Confidence Meter Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>AI Confidence</span>
                <span className="badge-positive" style={{
                  background: isConfidenceLow ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                  color: isConfidenceLow ? 'var(--accent-red)' : 'var(--accent-emerald)',
                  borderColor: isConfidenceLow ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)',
                  fontSize: 10
                }}>
                  {HIGH_IMPACT_DECISION.confidenceMeter.level}
                </span>
              </div>

              {/* Dial Progress */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 20 }}>
                <span className="number-font" style={{ fontSize: 44, fontWeight: 900, color: isConfidenceLow ? 'var(--accent-red)' : 'var(--accent-indigo)' }}>
                  {confidence}%
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Weighted Score</span>
              </div>

              {/* Warning Warning Alert if drops below 70% */}
              {isConfidenceLow && (
                <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', marginBottom: 20, display: 'flex', gap: 8 }}>
                  <AlertTriangle size={16} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-red)' }}>Human Review Recommended</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>AI model uncertainty is elevated due to missing telemetry fields.</div>
                  </div>
                </div>
              )}

              {/* Confidence Reasons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Weighted Justification</div>
                {HIGH_IMPACT_DECISION.confidenceMeter.reasons.map((r, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent-emerald)', fontSize: 12, marginTop: -2 }}>✓</span>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{r.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch War Room directly from High Impact Decision card */}
            <div>
              <button
                onClick={() => navigate('/warroom')}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}
              >
                <Swords size={16} /> Convene AI War Room
              </button>
              <button
                onClick={() => navigate('/finance/executive-brief')}
                className="btn-ghost"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <FileText size={16} /> View CFO memorandum
              </button>
            </div>
          </motion.div>
        </div>

        {/* ─── DEPARTMENT HEALTH HEAT MAP ─── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>Department Health Map</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Click department card to instantly summon relevant AI Employees</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
            {DEPARTMENTS.map((dept, i) => {
              const borderCol = getDeptColor(dept.colorCode)
              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -3, borderColor: `${borderCol}70`, boxShadow: `0 0 16px ${borderCol}10` }}
                  onClick={() => setSelectedDept(dept)}
                  className="card"
                  style={{
                    padding: '16px 20px', cursor: 'pointer',
                    borderColor: `${borderCol}30`,
                    background: `linear-gradient(135deg, ${borderCol}06, transparent)`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{dept.name}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: borderCol, textTransform: 'uppercase' }}>
                      ● {dept.riskLevel} risk
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="number-font" style={{ fontSize: 28, fontWeight: 900, color: borderCol }}>
                      {dept.healthScore}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      load: <strong style={{ color: 'var(--text-primary)' }}>{dept.decisionLoad}</strong>
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 8 }}>
                    <span>{dept.openIssues} unresolved flags</span>
                    <span style={{ color: dept.trend === 'up' ? 'var(--accent-emerald)' : dept.trend === 'down' ? 'var(--accent-red)' : 'var(--text-muted)' }}>
                      {dept.trend === 'up' ? '↑ improving' : dept.trend === 'down' ? '↓ declining' : '→ stable'}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ─── PROACTIVE EXECUTIVE ALERTS ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, marginBottom: 28 }}>
          
          {/* Alerts panel */}
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14 }}>
              Proactive Business Monitoring Alerts
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {EXECUTIVE_ALERTS.map((alert) => (
                <div key={alert.id} style={{
                  padding: '16px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.015)', border: '1px solid var(--border-subtle)',
                  borderLeft: `4px solid ${alert.urgency === 'Immediate' ? 'var(--accent-red)' : 'var(--accent-amber)'}`,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span className="badge-positive" style={{
                        background: alert.urgency === 'Immediate' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                        color: alert.urgency === 'Immediate' ? 'var(--accent-red)' : 'var(--accent-amber)',
                        borderColor: alert.urgency === 'Immediate' ? 'rgba(239,68,68,0.2)' : 'rgba(245,158,11,0.2)',
                        fontSize: 10, fontWeight: 700
                      }}>
                        {alert.urgency} urgency
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>AI Confidence: {alert.confidence}%</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{alert.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{alert.impact}</div>
                    <div style={{ fontSize: 12, color: 'var(--accent-indigo)', fontWeight: 600, marginTop: 4 }}>👉 {alert.recommendedAction}</div>
                  </div>
                  <button
                    onClick={() => navigate('/warroom?q=' + encodeURIComponent(alert.title))}
                    className="btn-primary"
                    style={{ fontSize: 11, padding: '7px 14px', whiteSpace: 'nowrap' }}
                  >
                    Launch War Room
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ─── DECISION REPLAY PLAYER ─── */}
          <div className="card" style={{ padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>Decision Replay Player</div>
                <span className="badge-positive" style={{ fontSize: 9 }}>Audit log</span>
              </div>

              {/* Player Timeline Step */}
              <div style={{ padding: 14, borderRadius: 10, background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>Stage {currentStep + 1} of {DECISION_REPLAY_STEPS.length}</span>
                  <span>{DECISION_REPLAY_STEPS[currentStep].time}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-indigo)', marginBottom: 6 }}>
                  {DECISION_REPLAY_STEPS[currentStep].stage}
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {DECISION_REPLAY_STEPS[currentStep].title}
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4, fontStyle: 'italic', marginBottom: 8 }}>
                  "{DECISION_REPLAY_STEPS[currentStep].thoughts}"
                </p>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', borderTop: '1px dashed var(--border-subtle)', paddingTop: 8 }}>
                  📄 Telemetry: {DECISION_REPLAY_STEPS[currentStep].evidence}
                </div>
              </div>

              {/* Scrub timeline */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 }}>
                {DECISION_REPLAY_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStepJump(idx)}
                    style={{
                      flex: '1 0 18%', padding: '4px 2px', borderRadius: 4, border: '1px solid',
                      borderColor: currentStep === idx ? 'var(--accent-indigo)' : 'var(--border-subtle)',
                      background: currentStep === idx ? 'rgba(99,102,241,0.15)' : 'transparent',
                      color: currentStep === idx ? 'var(--accent-indigo)' : 'var(--text-muted)',
                      fontSize: 8, fontWeight: 700, cursor: 'pointer'
                    }}
                  >
                    S{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Play controls */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="btn-primary"
                    style={{ padding: '6px 12px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    onClick={() => handleStepJump(0)}
                    className="btn-ghost"
                    style={{ padding: '6px 10px', fontSize: 10 }}
                  >
                    Reset
                  </button>
                </div>
                
                {/* Speed selector */}
                <div style={{ display: 'flex', gap: 4 }}>
                  {([0.5, 1, 2] as const).map((sp) => (
                    <button
                      key={sp}
                      onClick={() => setReplaySpeed(sp)}
                      style={{
                        padding: '4px 8px', borderRadius: 6, border: '1px solid',
                        borderColor: replaySpeed === sp ? 'var(--accent-indigo)' : 'transparent',
                        background: replaySpeed === sp ? 'rgba(99,102,241,0.1)' : 'transparent',
                        color: replaySpeed === sp ? 'var(--accent-indigo)' : 'var(--text-muted)',
                        fontSize: 9, fontWeight: 700, cursor: 'pointer'
                      }}
                    >
                      {sp}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Summon Department War Room Dialog */}
      <AnimatePresence>
        {selectedDept && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="card"
              style={{ width: '100%', maxWidth: 440, padding: 28, position: 'relative' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <span className="badge-positive" style={{ fontSize: 10, background: 'rgba(16,185,129,0.1)', color: 'var(--accent-emerald)', borderColor: 'rgba(16,185,129,0.2)' }}>
                    Summon AI Board
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginTop: 6 }}>
                    {selectedDept.name} Department Room
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>

              <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                You are about to launch a WAR ROOM session focusing on the <strong>{selectedDept.name}</strong> department. 
                The AI moderator will assemble the designated expert advisors:
                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  {FINANCE_EMPLOYEES.filter(emp => selectedDept.relevantAgents.includes(emp.id)).map(emp => (
                    <span key={emp.id} style={{ fontSize: 20 }} title={emp.name}>{emp.avatar}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => {
                    setSelectedDept(null)
                    navigate('/warroom?dept=' + selectedDept.id)
                  }}
                  className="btn-primary"
                  style={{ flex: 1, fontSize: 13 }}
                >
                  Convene War Room Now
                </button>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="btn-ghost"
                  style={{ fontSize: 13 }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
