import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Swords, Sparkles, ChevronRight, Send, Download, RefreshCw, CheckCircle, AlertTriangle, TrendingUp, Clock, DollarSign, Zap } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { AI_EMPLOYEES, sampleDebateMessages, AGENT_ROUTING, suggestedQuestions } from '@/data/mockData'
import { useAppStore } from '@/store/appStore'
import { sleep } from '@/lib/utils'

// ─── Agent Routing Logic ─────────────────────────────────────
function routeAgents(question: string) {
  const q = question.toLowerCase()
  for (const [, config] of Object.entries(AGENT_ROUTING)) {
    if (config.triggers.some((t) => q.includes(t))) {
      return AI_EMPLOYEES.filter((a) => (config as any).agents.includes(a.id))
    }
  }
  // Default: all agents
  return AI_EMPLOYEES
}

// ─── Typing Indicator ────────────────────────────────────────
function TypingIndicator({ color }: { color: string }) {
  return (
    <div className="typing-dots">
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ background: color, animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  )
}

// ─── Agent Card ──────────────────────────────────────────────
function AgentCard({ agent, status, confidence, speaking }: {
  agent: typeof AI_EMPLOYEES[0]
  status: 'idle' | 'thinking' | 'speaking' | 'done'
  confidence: number
  speaking: boolean
}) {
  return (
    <motion.div
      className={`agent-card ${status === 'speaking' ? 'speaking' : status !== 'idle' ? 'active' : ''}`}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{ borderColor: status !== 'idle' ? agent.color : undefined }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: `radial-gradient(ellipse, ${agent.color}20, ${agent.color}08)`,
            border: `2px solid ${agent.color}${status === 'speaking' ? 'cc' : '40'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            transition: 'all 0.3s',
          }}>
            {agent.avatar}
          </div>
          {status === 'thinking' && (
            <div style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              background: 'var(--bg-base)',
              borderRadius: '50%',
              padding: 2,
            }}>
              <div className="status-dot thinking" />
            </div>
          )}
          {status === 'speaking' && (
            <div style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              background: 'var(--bg-base)',
              borderRadius: '50%',
              padding: 2,
            }}>
              <div className="status-dot active" />
            </div>
          )}
          {status === 'done' && (
            <div style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              background: 'var(--bg-base)',
              borderRadius: '50%',
              padding: 1,
            }}>
              <CheckCircle size={14} style={{ color: 'var(--accent-emerald)' }} />
            </div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{agent.name}</div>
          <div style={{ fontSize: 11, color: agent.color, fontWeight: 600 }}>{agent.role}</div>
        </div>
        {status === 'thinking' && <TypingIndicator color={agent.color} />}
      </div>

      {status !== 'idle' && (
        <>
          <div className="confidence-bar" style={{ marginBottom: 6 }}>
            <motion.div
              className="confidence-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ background: `linear-gradient(90deg, ${agent.color}, ${agent.color}cc)` }}
            />
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Confidence: <span style={{ color: agent.color, fontWeight: 600 }}>{confidence}%</span>
          </div>
        </>
      )}
    </motion.div>
  )
}

// ─── Debate Message ──────────────────────────────────────────
function DebateMessage({ msg, agents, isLatest }: { msg: any; agents: typeof AI_EMPLOYEES; isLatest: boolean }) {
  const agent = agents.find((a) => a.id === msg.agentId)!
  const refs = msg.references.map((r: string) => agents.find((a) => a.id === r)?.name).filter(Boolean)

  const typeStyles: Record<string, { bg: string; border: string; label: string }> = {
    statement: { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.2)', label: 'Statement' },
    challenge: { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.2)', label: 'Challenge' },
    evidence: { bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.15)', label: 'Evidence' },
    analysis: { bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)', label: 'Analysis' },
    summary: { bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.3)', label: 'Summary' },
  }
  const style = typeStyles[msg.type] || typeStyles.statement

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
      }}
    >
      <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: `${agent?.color}20`,
          border: `2px solid ${agent?.color}40`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          flexShrink: 0,
        }}>
          {agent?.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{agent?.name}</span>
            <span style={{ fontSize: 11, color: agent?.color, fontWeight: 600 }}>{agent?.role}</span>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 99,
              background: style.border.replace('0.2', '0.15'),
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {style.label}
            </span>
            {refs.length > 0 && (
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                → replying to {refs.join(', ')}
              </span>
            )}
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{msg.content}</p>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>
          {msg.confidence}% conf.
        </div>
      </div>
    </motion.div>
  )
}

// ─── Decision Engine Panel ───────────────────────────────────
function DecisionPanel({ question, onClose }: { question: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="decision-panel"
      style={{ padding: 28, height: '100%', overflow: 'auto' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            Decision Engine
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>Recommendation</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            fontSize: 28,
            fontWeight: 900,
            color: 'var(--accent-emerald)',
            fontFamily: 'Outfit',
          }}>89%</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>confidence</div>
        </div>
      </div>

      {/* Recommendation */}
      <div style={{
        background: 'rgba(16,185,129,0.06)',
        border: '1px solid rgba(16,185,129,0.2)',
        borderRadius: 14,
        padding: 18,
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <CheckCircle size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: 6 }}>Recommended Action</div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
              Launch Feature X in Q4 with full tech debt refactor beginning July 15. Scope refactor to 6 weeks, then launch in October.
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      {[
        { icon: TrendingUp, label: 'Revenue Impact', value: '+$2.1M ARR', color: 'var(--accent-emerald)' },
        { icon: Clock, label: 'Timeline', value: '12 weeks', color: 'var(--accent-teal)' },
        { icon: DollarSign, label: 'Budget Required', value: '$480K', color: 'var(--accent-amber)' },
        { icon: Zap, label: 'ROI', value: '340%', color: 'var(--accent-indigo)' },
      ].map((m) => (
        <div key={m.label} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 0',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `${m.color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <m.icon size={14} style={{ color: m.color }} />
          </div>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{m.label}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: m.color, fontFamily: 'Outfit' }}>{m.value}</div>
        </div>
      ))}

      {/* Risk */}
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Risk Assessment</div>
        {[
          { label: 'Technical Risk', level: 45, color: '#f59e0b' },
          { label: 'Market Risk', level: 20, color: '#10b981' },
          { label: 'Financial Risk', level: 35, color: '#06b6d4' },
          { label: 'Execution Risk', level: 55, color: '#ef4444' },
        ].map((r) => (
          <div key={r.label} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: 'var(--text-secondary)' }}>
              <span>{r.label}</span>
              <span style={{ color: r.color }}>{r.level}%</span>
            </div>
            <div className="confidence-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${r.level}%` }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ height: '100%', borderRadius: 99, background: r.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tradeoffs */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Trade-offs</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { pro: true, text: '$2.1M ARR upside from enterprise renewals' },
            { pro: true, text: 'Kills competitor threat from Prism' },
            { pro: false, text: '6-week delay for refactor costs $240K' },
            { pro: false, text: 'Engineering capacity locked for 3 months' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13 }}>
              <span style={{ color: t.pro ? 'var(--accent-emerald)' : 'var(--accent-red)', fontWeight: 700, flexShrink: 0 }}>
                {t.pro ? '+' : '−'}
              </span>
              <span style={{ color: 'var(--text-secondary)' }}>{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Actions */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Next Actions
        </div>
        {['Start refactor planning with CTO by July 10', 'Brief enterprise accounts on October launch date', 'Allocate $480K from Q3 engineering budget', 'Set up success metrics dashboard'].map((action, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
            <span style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              color: 'var(--accent-indigo)',
              fontWeight: 700,
              flexShrink: 0,
              marginTop: 1,
            }}>{i + 1}</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{action}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
        <button className="btn-primary" style={{ flex: 1, fontSize: 13 }}>
          Approve Decision
        </button>
        <button className="btn-ghost" style={{ fontSize: 13 }}>
          <Download size={13} />
        </button>
      </div>
    </motion.div>
  )
}

// ─── War Room Page ───────────────────────────────────────────
export function WarRoom() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { currentQuestion } = useAppStore()
  const question = searchParams.get('q') || currentQuestion || suggestedQuestions[0]

  const [phase, setPhase] = useState<'routing' | 'assembling' | 'debating' | 'complete'>('routing')
  const [activeAgents, setActiveAgents] = useState<typeof AI_EMPLOYEES>([])
  const [agentStatuses, setAgentStatuses] = useState<Record<string, { status: string; confidence: number }>>({})
  const [messages, setMessages] = useState<typeof sampleDebateMessages>([])
  const [customQuestion, setCustomQuestion] = useState(question)
  const debateRef = useRef<HTMLDivElement>(null)

  const runSession = async (q: string) => {
    setPhase('routing')
    setMessages([])
    setAgentStatuses({})

    await sleep(800)
    const agents = routeAgents(q)
    setActiveAgents(agents)
    setPhase('assembling')

    await sleep(1000)
    setPhase('debating')

    // Initialize all as thinking
    const initialStatuses: Record<string, { status: string; confidence: number }> = {}
    agents.forEach((a) => { initialStatuses[a.id] = { status: 'thinking', confidence: 0 } })
    setAgentStatuses(initialStatuses)

    // Play out messages
    for (let i = 0; i < sampleDebateMessages.length; i++) {
      const msg = sampleDebateMessages[i]
      await sleep(1200 + Math.random() * 800)

      setAgentStatuses((prev) => ({
        ...prev,
        [msg.agentId]: { status: 'speaking', confidence: msg.confidence },
      }))

      setMessages((prev) => [...prev, msg])

      // Scroll to bottom
      setTimeout(() => {
        debateRef.current?.scrollTo({ top: debateRef.current.scrollHeight, behavior: 'smooth' })
      }, 100)

      await sleep(200)
      setAgentStatuses((prev) => ({
        ...prev,
        [msg.agentId]: { status: 'done', confidence: msg.confidence },
      }))
    }

    setPhase('complete')
  }

  useEffect(() => {
    runSession(question)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <TopBar
        title="War Room"
        subtitle={question.length > 60 ? question.substring(0, 60) + '…' : question}
      />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Left: Agents */}
        <div style={{ width: 280, borderRight: '1px solid var(--border-subtle)', padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              AI Executives
            </div>
            <div style={{
              padding: '8px 12px',
              borderRadius: 10,
              background: phase === 'routing' ? 'rgba(245,158,11,0.08)' : phase === 'assembling' ? 'rgba(99,102,241,0.08)' : phase === 'debating' ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.08)',
              border: `1px solid ${phase === 'routing' ? 'rgba(245,158,11,0.2)' : phase === 'assembling' ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)'}`,
              fontSize: 12,
              fontWeight: 600,
              color: phase === 'routing' ? 'var(--accent-amber)' : phase === 'assembling' ? 'var(--accent-indigo)' : 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <div className={`status-dot ${phase === 'debating' || phase === 'complete' ? 'active' : 'thinking'}`} />
              {phase === 'routing' ? 'Routing question…'
                : phase === 'assembling' ? `Assembling ${activeAgents.length} executives…`
                  : phase === 'debating' ? 'Debate in progress'
                    : 'Session complete'}
            </div>
          </div>

          <AnimatePresence>
            {activeAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                status={(agentStatuses[agent.id]?.status as any) || 'idle'}
                confidence={agentStatuses[agent.id]?.confidence || 0}
                speaking={agentStatuses[agent.id]?.status === 'speaking'}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Center: Debate Stream */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Question banner */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(99,102,241,0.04)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Question Under Debate
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
              {question}
            </div>
          </div>

          {/* Debate feed */}
          <div ref={debateRef} style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
            {phase === 'routing' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                >
                  <Swords size={32} style={{ color: 'var(--accent-indigo)' }} />
                </motion.div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Routing your question to the right executives…
                </div>
              </div>
            )}

            {phase === 'assembling' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Assembling {activeAgents.length} AI executives…
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {activeAgents.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ fontSize: 28 }}
                    >
                      {a.avatar}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {(phase === 'debating' || phase === 'complete') && (
              <div>
                {messages.map((msg, i) => (
                  <DebateMessage
                    key={i}
                    msg={msg}
                    agents={activeAgents}
                    isLatest={i === messages.length - 1}
                  />
                ))}
                {phase === 'debating' && messages.length < sampleDebateMessages.length && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.02)' }}>
                    <TypingIndicator color="var(--accent-indigo)" />
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>An executive is responding…</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: 12,
          }}>
            <input
              className="war-room-input"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { runSession(customQuestion) } }}
              placeholder="Ask a follow-up question…"
              style={{ padding: '12px 16px' }}
            />
            <button
              className="btn-primary"
              onClick={() => runSession(customQuestion)}
              style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}
            >
              <RefreshCw size={14} /> New Session
            </button>
          </div>
        </div>

        {/* Right: Decision Engine */}
        {(phase === 'complete' || messages.length > 3) && (
          <div style={{ width: 340, borderLeft: '1px solid var(--border-subtle)', overflowY: 'auto' }}>
            <DecisionPanel question={question} onClose={() => {}} />
          </div>
        )}
      </div>
    </div>
  )
}
