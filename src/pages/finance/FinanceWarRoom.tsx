import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import { FINANCE_EMPLOYEES } from '@/data/financeData'
import { Send, Swords, ChevronRight } from 'lucide-react'
import { sleep } from '@/lib/utils'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'

const QUICK_QUESTIONS = [
  'Can we close this month\'s books today?',
  'Should we pay all vendors today?',
  'What\'s our liquidity risk this week?',
  'Is the Infosys invoice safe to pay?',
  'What\'s our compliance exposure right now?',
  'Should we move cash to liquid fund?',
]

// Pre-written AI debates for demo scenarios
const DEBATE_FLOWS: Record<string, Array<{ agent: string; text: string; confidence: number }>> = {
  'Can we close this month\'s books today?': [
    { agent: 'controller', text: 'Bank reconciliation has ₹2.4L unreconciled — 2 HDFC transactions pending clearance. Estimated by 5PM today. I recommend delaying close by 4 hours.', confidence: 91 },
    { agent: 'compliance', text: 'GST 3B has 3 unmatched input tax credits totaling ₹24K. We can book as vendor liability and reconcile next month — not a hard blocker.', confidence: 94 },
    { agent: 'tax', text: 'Tax provision is 98% complete. The remaining 2% variance is ₹8K — immaterial. I can post the provision now and adjust in Q2.', confidence: 89 },
    { agent: 'auditor', text: 'Audit trail is complete. All JEs over ₹5L have dual approval. Segregation of duties checks passed. I recommend conditional close pending bank rec.', confidence: 96 },
    { agent: 'cfo', text: 'Reviewing all inputs: Bank rec will clear by 5PM, tax provision is immaterial, GST gap is manageable. My decision: delay close by 4 hours. Complete bank rec first. Confidence: 94%.', confidence: 94 },
  ],
  'Should we pay all vendors today?': [
    { agent: 'ap_manager', text: 'We have 7 vendors queued. 3 should pay today: Infosys (2% discount = ₹84K savings), AWS (critical infra), WeWork (lease obligation). 1 is flagged for fraud — DO NOT pay Unknown Vendor XYZ.', confidence: 96 },
    { agent: 'treasury', text: 'Current cash position is ₹4.3Cr. Paying today\'s queue of ₹8.2Cr is possible but leaves us thin before the Jul 7 payroll. I recommend staggering non-critical payments.', confidence: 88 },
    { agent: 'auditor', text: 'Unknown Vendor XYZ — first-time vendor, bank account registered last week, invoice pattern matches a known fraud scheme. This must not be paid without full vendor verification.', confidence: 97 },
    { agent: 'risk', text: 'Concentration risk: 68% of today\'s outflow goes to 2 vendors (Infosys + AWS). This is acceptable given both are critical. The WeWork PO gap needs resolution before payment.', confidence: 85 },
    { agent: 'cfo', text: 'Pay Infosys and AWS today. Hold WeWork pending PO verification. Delay Razorpay and TCS to next week. Flag XYZ for fraud investigation. Net payment today: ₹7.04Cr. Cash safe.', confidence: 93 },
  ],
}

const DEFAULT_DEBATE = [
  { agent: 'fpa', text: 'I\'m analyzing current financials and comparing against the question context. Running scenario models across multiple variables.', confidence: 88 },
  { agent: 'risk', text: 'Risk assessment complete. Primary risk vectors identified. Probability-weighted outcomes calculated.', confidence: 85 },
  { agent: 'compliance', text: 'Compliance implications reviewed. No regulatory violations detected in the proposed course of action.', confidence: 94 },
  { agent: 'cfo', text: 'Board synthesis complete. Based on all inputs, here is my recommendation with 89% confidence.', confidence: 89 },
]

export function FinanceWarRoom() {
  const [params] = useSearchParams()
  const [question, setQuestion] = useState(params.get('q') || '')
  const [phase, setPhase] = useState<'idle' | 'routing' | 'debating' | 'complete'>('idle')
  const [activeAgents, setActiveAgents] = useState<typeof FINANCE_EMPLOYEES>([])
  const [messages, setMessages] = useState<Array<{ agent: typeof FINANCE_EMPLOYEES[0]; text: string; confidence: number }>>([])
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null)

  const runSession = async (q: string) => {
    if (!q.trim()) return
    setQuestion(q)
    setPhase('routing')
    setMessages([])
    await sleep(1200)

    // Pick relevant agents
    const flow = DEBATE_FLOWS[q] || DEFAULT_DEBATE
    const agentIds = [...new Set(flow.map((f) => f.agent))]
    const agents = FINANCE_EMPLOYEES.filter((e) => agentIds.includes(e.id))
    setActiveAgents(agents)
    setPhase('debating')

    for (const msg of flow) {
      const agent = FINANCE_EMPLOYEES.find((e) => e.id === msg.agent)!
      setCurrentSpeaker(agent.id)
      await sleep(1800 + Math.random() * 800)
      setMessages((prev) => [...prev, { agent, text: msg.text, confidence: msg.confidence }])
    }
    setCurrentSpeaker(null)
    setPhase('complete')
  }

  const lastMsg = messages[messages.length - 1]

  return (
    <div>
      <TopBar title="Finance War Room" subtitle="AI Executive Board — Financial Decision Intelligence" />
      <div style={{ padding: 32 }}>

        {/* Question Input */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <Swords size={18} style={{ color: 'var(--accent-indigo)' }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Ask the Finance AI Board</div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <input
              className="war-room-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Can we close this month's books today?"
              onKeyDown={(e) => e.key === 'Enter' && runSession(question)}
              style={{ flex: 1 }}
            />
            <button className="btn-primary" onClick={() => runSession(question)} disabled={phase === 'routing' || phase === 'debating'}
              style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
              <Swords size={14} /> Convene Board
            </button>
          </div>

          {/* Quick Questions */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {QUICK_QUESTIONS.map((q) => (
              <button key={q} onClick={() => runSession(q)}
                style={{ fontSize: 12, padding: '5px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                {q}
              </button>
            ))}
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>

          {/* Agent Panel */}
          <div>
            {/* Routing Phase */}
            {phase === 'routing' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                  🔍 Routing Question…
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>AI is identifying which Finance Executives are relevant…</div>
              </motion.div>
            )}

            {activeAgents.length > 0 && (
              <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Convened Board ({activeAgents.length})
                </div>
                {activeAgents.map((agent) => {
                  const isSpeaking = currentSpeaker === agent.id
                  const hasSeen = messages.some((m) => m.agent.id === agent.id)
                  return (
                    <motion.div key={agent.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                      style={{
                        padding: '14px 20px',
                        borderBottom: '1px solid var(--border-subtle)',
                        background: isSpeaking ? `${agent.color}08` : undefined,
                        borderLeft: isSpeaking ? `3px solid ${agent.color}` : '3px solid transparent',
                      }}>
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <span style={{ fontSize: 22 }}>{agent.avatar}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{agent.name}</div>
                          <div style={{ fontSize: 11, color: agent.color }}>{agent.role}</div>
                        </div>
                        {isSpeaking && (
                          <div className="typing-dots" style={{ display: 'flex', gap: 3 }}>
                            {[0, 1, 2].map((i) => (
                              <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                style={{ width: 5, height: 5, borderRadius: '50%', background: agent.color }} />
                            ))}
                          </div>
                        )}
                        {hasSeen && !isSpeaking && (
                          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-emerald)' }}>✓</div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Debate Stream */}
          <div>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }}
                  style={{
                    marginBottom: 16,
                    padding: 22,
                    borderRadius: 16,
                    background: 'rgba(13,17,23,0.9)',
                    border: `1px solid ${msg.agent.color}25`,
                    borderLeft: `4px solid ${msg.agent.color}`,
                  }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{msg.agent.avatar}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div>
                          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginRight: 8 }}>{msg.agent.name}</span>
                          <span style={{ fontSize: 12, color: msg.agent.color, fontWeight: 600 }}>{msg.agent.title}</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Confidence: <strong style={{ color: msg.agent.color }}>{msg.confidence}%</strong></div>
                      </div>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{msg.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {currentSpeaker && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '14px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
                {(() => {
                  const a = FINANCE_EMPLOYEES.find((e) => e.id === currentSpeaker)!
                  return (
                    <>
                      <span style={{ fontSize: 20 }}>{a.avatar}</span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{a.name} is preparing response…</span>
                      <div style={{ display: 'flex', gap: 3, marginLeft: 8 }}>
                        {[0, 1, 2].map((i) => (
                          <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            style={{ width: 5, height: 5, borderRadius: '50%', background: a.color }} />
                        ))}
                      </div>
                    </>
                  )
                })()}
              </motion.div>
            )}

            {/* Final Decision */}
            <AnimatePresence>
              {phase === 'complete' && lastMsg && (
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: 28, borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))',
                    border: '1px solid rgba(99,102,241,0.25)',
                    boxShadow: '0 0 40px rgba(99,102,241,0.12)',
                  }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                    ⚔️ Board Decision
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 16 }}>
                    {lastMsg.text}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn-primary">Approve Decision</button>
                    <button className="btn-ghost">Export Report</button>
                    <button className="btn-ghost">Save to Memory</button>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <ExplainLikeCFO variant="button" label="Explain Like a CFO" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
