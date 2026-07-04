import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { monthEndClose, FINANCE_EMPLOYEES } from '@/data/financeData'
import { CheckCircle, Clock, AlertTriangle, XCircle, Play, Zap, ChevronDown, ChevronUp } from 'lucide-react'
import { sleep } from '@/lib/utils'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'

const TASK_STATUS_CONFIG = {
  complete: { icon: CheckCircle, color: 'var(--accent-emerald)', label: 'Complete' },
  in_progress: { icon: Clock, color: 'var(--accent-amber)', label: 'In Progress' },
  pending: { icon: Clock, color: 'var(--text-muted)', label: 'Pending' },
}

const AI_ANALYSIS_MESSAGES = [
  { agent: 'controller', text: 'Bank reconciliation shows ₹2.4L unreconciled. 2 transactions pending clearance from HDFC — expected by 5PM today. Safe to close after clearance.' },
  { agent: 'tax', text: 'Tax provision calculation requires final payroll figures. Q2 payroll is 98% processed. Estimated gap: ₹8K variance. Immaterial for close.' },
  { agent: 'compliance', text: '3 GST input tax credits unmatched in GSTR-2B. ₹24K exposure. Can book as vendor liability and reconcile next month. Not a close blocker.' },
  { agent: 'cfo', text: '3 journal entries pending my review. I have reviewed: 2 are approved. 1 requires additional documentation from Controller. Estimated 1 hour to resolve.' },
  { agent: 'auditor', text: 'Audit trail is complete. All material entries have proper approvals. Segregation of duties controls passed. Recommend conditional close.' },
  { agent: 'cfo', text: 'Board recommendation: Delay close by approximately 4 hours. Complete bank rec after HDFC clearance at 5PM. All other items are manageable. Confidence: 94%.' },
]

export function MonthEnd() {
  const [running, setRunning] = useState(false)
  const [messages, setMessages] = useState<typeof AI_ANALYSIS_MESSAGES>([])
  const [result, setResult] = useState<'close' | 'delay' | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const { tasks, risks, completionPercent } = monthEndClose

  const runAnalysis = async () => {
    setRunning(true)
    setMessages([])
    setResult(null)
    for (const msg of AI_ANALYSIS_MESSAGES) {
      await sleep(1400 + Math.random() * 600)
      setMessages((prev) => [...prev, msg])
    }
    setResult('delay')
    setRunning(false)
  }

  const complete = tasks.filter((t) => t.status === 'complete').length
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length
  const pending = tasks.filter((t) => t.status === 'pending').length

  return (
    <div>
      <TopBar title="Month-End Close" subtitle="AI-powered close readiness analysis" />
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>

        {/* Left: Task List */}
        <div>
          {/* Progress Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 28, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: 'Outfit', fontSize: 40, fontWeight: 900, color: '#8b5cf6', marginBottom: 4 }}>{completionPercent}%</div>
                <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Close Readiness</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 700, color: 'var(--accent-emerald)' }}>{complete}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Complete</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 700, color: 'var(--accent-amber)' }}>{inProgress}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>In Progress</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 700, color: 'var(--text-muted)' }}>{pending}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Pending</div>
                </div>
              </div>
            </div>
            <div className="confidence-bar" style={{ height: 10, marginBottom: 16 }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${completionPercent}%` }} transition={{ duration: 1.2 }}
                style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #8b5cf6, #6366f1)' }} />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 600 }}>Estimated close:</span> July 1, 2026 at 6:00 PM
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>Delay risk:</span> Medium
              </div>
            </div>
          </motion.div>

          {/* Task List */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
              Close Checklist ({tasks.length} tasks)
            </div>
            {tasks.map((task, i) => {
              const conf = TASK_STATUS_CONFIG[task.status as keyof typeof TASK_STATUS_CONFIG]
              const Icon = conf.icon
              const owner = FINANCE_EMPLOYEES.find((e) => e.id === task.owner)
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    padding: '14px 24px',
                    borderBottom: i < tasks.length - 1 ? '1px solid var(--border-subtle)' : undefined,
                    background: task.status !== 'complete' && task.critical ? 'rgba(245,158,11,0.02)' : undefined,
                  }}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <Icon size={16} style={{ color: conf.color, flexShrink: 0, marginTop: 2 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: task.status === 'complete' ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: task.status === 'complete' ? 'line-through' : undefined }}>
                          {task.name}
                        </span>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          {task.critical && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-red)', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '2px 7px', borderRadius: 99 }}>Critical</span>}
                          {owner && <span style={{ fontSize: 11, color: owner.color }}>{owner.avatar} {owner.role}</span>}
                        </div>
                      </div>
                      {task.note && (
                        <div style={{ marginTop: 6, fontSize: 12, color: 'var(--accent-amber)', padding: '4px 10px', borderRadius: 6, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
                          ⚠ {task.note}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Right: AI Analysis Panel */}
        <div>
          {/* Run Analysis */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>AI Close Analysis</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
              Ask the AI Finance Board: "Can we close this month's books today?"
            </div>
            <button
              className="btn-primary"
              onClick={runAnalysis}
              disabled={running}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {running ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Zap size={14} /></motion.div> Analyzing…</>
              ) : <><Play size={14} /> Run AI Analysis</>}
            </button>
          </motion.div>

          {/* Risks */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Blocking Risks</div>
            {risks.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, padding: '10px 12px', borderRadius: 10, background: r.severity === 'high' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.04)', border: `1px solid ${r.severity === 'high' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.12)'}` }}>
                <AlertTriangle size={14} style={{ color: r.severity === 'high' ? 'var(--accent-red)' : 'var(--accent-amber)', flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.description}</div>
              </div>
            ))}
          </motion.div>

          {/* AI Messages */}
          <AnimatePresence>
            {messages.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
                  AI Board Analysis
                </div>
                {messages.map((msg, i) => {
                  const emp = FINANCE_EMPLOYEES.find((e) => e.id === msg.agent)!
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      style={{ display: 'flex', gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: i < messages.length - 1 ? '1px solid var(--border-subtle)' : undefined }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{emp.avatar}</span>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: emp.color, marginBottom: 4 }}>{emp.name} · {emp.role}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{msg.text}</div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: 24, borderRadius: 16,
                  background: result === 'close' ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                  border: `1px solid ${result === 'close' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
                  boxShadow: result === 'close' ? '0 0 30px rgba(16,185,129,0.1)' : '0 0 30px rgba(245,158,11,0.1)',
                }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  {result === 'close'
                    ? <CheckCircle size={28} style={{ color: 'var(--accent-emerald)' }} />
                    : <AlertTriangle size={28} style={{ color: 'var(--accent-amber)' }} />}
                  <div>
                    <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 900, color: result === 'close' ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
                      {result === 'close' ? 'Ready to Close' : 'Delay Close — 4 Hours'}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>AI Confidence: 94%</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                  {result === 'delay'
                    ? 'Close after HDFC bank clearance (~5PM). 1 JE needs additional documentation. GST gap is immaterial — book as liability.'
                    : 'All items verified. Proceed with close.'}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-primary" style={{ flex: 1, fontSize: 13 }}>Approve Delay</button>
                  <button className="btn-ghost" style={{ fontSize: 13 }}>Export Report</button>
                </div>
                <div style={{ marginTop: 14 }}>
                  <ExplainLikeCFO variant="button" label="Explain Like a CFO" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
