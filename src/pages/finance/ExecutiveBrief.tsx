import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell, RadarChart,
  PolarGrid, PolarAngleAxis, Radar, Legend,
} from 'recharts'
import {
  ChevronDown, ChevronUp, CheckCircle, XCircle, AlertTriangle,
  TrendingUp, TrendingDown, Minus, FileText, Download, Printer,
  Zap, Target, Shield, DollarSign, Users, Clock, Activity,
  ChevronRight, Star, ArrowUpRight, ArrowDownRight, GitBranch,
} from 'lucide-react'

import { TopBar } from '@/components/layout/TopBar'
import {
  BRIEF_DECISION, EXECUTIVE_SUMMARY, WHY_DECISION, DATA_USED,
  KPI_IMPACT, TRADE_OFFS, ALTERNATIVES, FUTURE_FORECAST,
  IMPACT_SCORES, NEXT_ACTIONS, BOARDROOM_SUMMARY,
} from '@/data/executiveBriefData'
import { FINANCE_EMPLOYEES } from '@/data/financeData'
import { formatINR } from '@/lib/financeUtils'

// ─── Section Wrapper ──────────────────────────────────────────
function Section({
  id, number, title, subtitle, icon, defaultOpen = true, accent = '#6366f1',
  children,
}: {
  id: string; number: string; title: string; subtitle?: string;
  icon: React.ReactNode; defaultOpen?: boolean; accent?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
      style={{ overflow: 'hidden', marginBottom: 20 }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '22px 28px', display: 'flex', alignItems: 'center',
          gap: 16, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
          borderBottom: open ? '1px solid var(--border-subtle)' : 'none',
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
          background: `${accent}15`, border: `1px solid ${accent}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent,
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'Outfit', fontSize: 11, fontWeight: 800, color: accent, letterSpacing: '0.1em' }}>
              {number}
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</span>
          </div>
          {subtitle && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</div>}
        </div>
        {open ? <ChevronUp size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '28px 28px' }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Confidence Bar ───────────────────────────────────────────
function ConfidenceBar({ value, color = '#6366f1', width = 80 }: { value: number; color?: string; width?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width, height: 4, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8 }}
          style={{ height: '100%', borderRadius: 99, background: color }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, minWidth: 32 }}>{value}%</span>
    </div>
  )
}

// ─── Trend Icon ───────────────────────────────────────────────
function TrendIcon({ trend, kpiKey }: { trend: string; kpiKey: string }) {
  // For these KPIs, "down" is actually good
  const inverseKPIs = ['DPO', 'DSO', 'Fraud Risk Score', 'Invoice Processing Time', 'Month-End Close Time', 'Risk Level']
  const isInverse = inverseKPIs.some(k => kpiKey.includes(k))

  if (trend === 'flat') return <Minus size={14} style={{ color: 'var(--text-muted)' }} />
  const isGood = isInverse ? trend === 'down' || trend === 'slight-down' : trend === 'up'
  if (trend === 'up') return <TrendingUp size={14} style={{ color: isGood ? 'var(--accent-emerald)' : 'var(--accent-red)' }} />
  if (trend === 'down' || trend === 'slight-down') return <TrendingDown size={14} style={{ color: isGood ? 'var(--accent-emerald)' : 'var(--accent-red)' }} />
  return <Minus size={14} style={{ color: 'var(--text-muted)' }} />
}

// ─── Change Badge ─────────────────────────────────────────────
function ChangeBadge({ change, trend, kpiKey }: { change: string; trend: string; kpiKey: string }) {
  const inverseKPIs = ['DPO', 'DSO', 'Fraud Risk', 'Processing Time', 'Close Time', 'Risk']
  const isInverse = inverseKPIs.some(k => kpiKey.includes(k))
  if (change === 'No change') return <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>Unchanged</span>
  const isPositive = isInverse
    ? (trend === 'down' || trend === 'slight-down')
    : (trend === 'up')
  return (
    <span className={isPositive ? 'badge-positive' : 'badge-negative'} style={{ fontSize: 11 }}>
      {change}
    </span>
  )
}

// ─── 1. Executive Summary ─────────────────────────────────────
function ExecSummary() {
  return (
    <Section id="s1" number="01" title="Executive Summary" icon={<FileText size={18} />} accent="#6366f1"
      subtitle="One-paragraph strategic overview for board presentation">
      <div style={{
        padding: '22px 28px', borderRadius: 14,
        background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(6,182,212,0.04))',
        border: '1px solid rgba(99,102,241,0.15)',
        borderLeft: '4px solid #6366f1',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
          EXECUTIVE SUMMARY
        </div>
        <p style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.8, fontWeight: 400 }}>
          {EXECUTIVE_SUMMARY}
        </p>
      </div>

      {/* Decision Header Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 24 }}>
        {[
          { label: 'Decision Score', value: `${BRIEF_DECISION.overallScore}/100`, color: '#10b981', icon: '🏆' },
          { label: 'AI Confidence', value: `${BRIEF_DECISION.confidence}%`, color: '#6366f1', icon: '🎯' },
          { label: 'Financial Impact', value: '+₹84,000', color: '#10b981', icon: '💰' },
          { label: 'Risk Level', value: 'Low', color: '#10b981', icon: '🛡️' },
        ].map((m) => (
          <div key={m.label} style={{ padding: '16px 20px', borderRadius: 12, background: `${m.color}08`, border: `1px solid ${m.color}20`, textAlign: 'center' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{m.icon}</div>
            <div className="number-font" style={{ fontSize: 22, fontWeight: 800, color: m.color, marginBottom: 4 }}>{m.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{m.label}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── 2. Why This Decision ─────────────────────────────────────
function WhyDecision() {
  const strengthColors = { critical: '#ef4444', high: '#f59e0b', medium: '#6366f1', low: '#94a3b8' }
  return (
    <Section id="s2" number="02" title="Why This Decision" icon={<Target size={18} />} accent="#10b981"
      subtitle="Primary reasoning factors ranked by business impact">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {WHY_DECISION.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            style={{
              padding: '16px 18px', borderRadius: 12,
              background: 'rgba(255,255,255,0.015)', border: '1px solid var(--border-subtle)',
              borderLeft: `3px solid ${strengthColors[item.strength as keyof typeof strengthColors]}`,
              display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
            <div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.55 }}>{item.reason}</div>
              <div style={{ marginTop: 6, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: strengthColors[item.strength as keyof typeof strengthColors] }}>
                {item.strength} factor
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

// ─── 3. Data Used ─────────────────────────────────────────────
function DataUsed() {
  const categories = [...new Set(DATA_USED.map(d => d.category))]
  return (
    <Section id="s3" number="03" title="Data Used" icon={<Activity size={18} />} accent="#06b6d4"
      subtitle="Every business input powering this decision — with confidence and source">
      {categories.map((cat) => {
        const items = DATA_USED.filter(d => d.category === cat)
        return (
          <div key={cat} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-teal)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--border-subtle)' }}>
              {cat}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {items.map((d, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(6,182,212,0.03)', border: '1px solid rgba(6,182,212,0.12)' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>{d.label}</div>
                  <div className="number-font" style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>{d.value}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <ConfidenceBar value={d.confidence} color="#06b6d4" width={60} />
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>📡 {d.source}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </Section>
  )
}

// ─── 4. KPI Impact ───────────────────────────────────────────
function KPIImpact() {
  return (
    <Section id="s4" number="04" title="KPI Impact" icon={<TrendingUp size={18} />} accent="#8b5cf6"
      subtitle="Before vs. predicted after — 18 finance KPIs with confidence scores">
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: 'rgba(139,92,246,0.06)' }}>
            {['KPI', 'Current', 'Predicted', 'Change', 'Trend', 'Confidence', 'Note'].map(h => (
              <th key={h} style={{ padding: '12px 16px', textAlign: h === 'KPI' || h === 'Note' ? 'left' : 'center', fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {KPI_IMPACT.map((row, i) => (
            <motion.tr key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              style={{ borderTop: '1px solid var(--border-subtle)', background: i % 2 === 0 ? 'rgba(255,255,255,0.006)' : undefined }}>
              <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{row.kpi}</td>
              <td style={{ padding: '13px 16px', textAlign: 'center', fontSize: 12, fontFamily: 'Outfit', color: 'var(--text-muted)' }}>{row.current}</td>
              <td style={{ padding: '13px 16px', textAlign: 'center', fontSize: 13, fontFamily: 'Outfit', fontWeight: 700, color: row.trend === 'flat' ? 'var(--text-muted)' : 'var(--text-primary)' }}>{row.predicted}</td>
              <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                <ChangeBadge change={row.change} trend={row.trend} kpiKey={row.kpi} />
              </td>
              <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                <TrendIcon trend={row.trend} kpiKey={row.kpi} />
              </td>
              <td style={{ padding: '13px 16px', textAlign: 'center' }}>
                <ConfidenceBar value={row.confidence} color={row.confidence > 90 ? '#10b981' : row.confidence > 80 ? '#6366f1' : '#f59e0b'} width={56} />
              </td>
              <td style={{ padding: '13px 16px', fontSize: 11, color: 'var(--text-muted)', maxWidth: 220, lineHeight: 1.4 }}>{row.note}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* KPI Chart */}
      <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Bar chart of change values */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>KPI Change Magnitude</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={KPI_IMPACT.filter(k => k.changeVal !== 0).slice(0, 9).map(k => ({
              name: k.kpi.split(' ').slice(0, 2).join(' '),
              value: Math.abs(k.changeVal) > 1000000 ? k.changeVal / 1000000 : k.changeVal,
              positive: k.changeVal > 0,
            }))} margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} angle={-30} textAnchor="end" />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {KPI_IMPACT.filter(k => k.changeVal !== 0).slice(0, 9).map((k, i) => (
                  <Cell key={i} fill={k.changeVal > 0 ? '#10b981' : '#ef4444'} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Impact Radar</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={[
              { subject: 'Cash Flow', current: 72, predicted: 74 },
              { subject: 'Profit', current: 68, predicted: 82 },
              { subject: 'Compliance', current: 91, predicted: 92 },
              { subject: 'Vendor Health', current: 82, predicted: 88 },
              { subject: 'Operations', current: 75, predicted: 80 },
              { subject: 'Liquidity', current: 78, predicted: 76 },
            ]}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} />
              <Radar name="Current" dataKey="current" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
              <Radar name="Predicted" dataKey="predicted" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Section>
  )
}

// ─── 5. Trade-Off Analysis ────────────────────────────────────
function TradeOffAnalysis() {
  return (
    <Section id="s5" number="05" title="Trade-Off Analysis" icon={<Shield size={18} />} accent="#f59e0b"
      subtitle="Complete transparency — every benefit and sacrifice clearly stated">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Benefits */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '10px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}>
            <CheckCircle size={15} style={{ color: 'var(--accent-emerald)' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-emerald)' }}>Benefits ({TRADE_OFFS.benefits.length})</span>
          </div>
          {TRADE_OFFS.benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', gap: 12, marginBottom: 14, padding: '14px 16px', borderRadius: 12, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.1)', borderLeft: '3px solid rgba(16,185,129,0.5)' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{b.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trade-offs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '10px 14px', borderRadius: 10, background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}>
            <AlertTriangle size={15} style={{ color: 'var(--accent-amber)' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-amber)' }}>Trade-offs ({TRADE_OFFS.tradeoffs.length})</span>
          </div>
          {TRADE_OFFS.tradeoffs.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', gap: 12, marginBottom: 14, padding: '14px 16px', borderRadius: 12, background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.1)', borderLeft: '3px solid rgba(245,158,11,0.5)' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-amber)', marginBottom: 4 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{t.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── 6. Alternatives Considered ──────────────────────────────
function Alternatives() {
  return (
    <Section id="s6" number="06" title="Alternatives Considered" icon={<GitBranch size={18} />} accent="#ec4899"
      subtitle="AI-evaluated alternatives — why each was accepted or rejected">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {ALTERNATIVES.map((alt, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            style={{
              padding: 20, borderRadius: 14,
              background: alt.status === 'selected' ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${alt.status === 'selected' ? 'rgba(16,185,129,0.3)' : 'var(--border-subtle)'}`,
              boxShadow: alt.status === 'selected' ? '0 0 24px rgba(16,185,129,0.1)' : undefined,
            }}>
            {/* Status Badge */}
            <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', marginBottom: 12, background: `${alt.labelColor}15`, color: alt.labelColor, border: `1px solid ${alt.labelColor}30` }}>
              {alt.status === 'selected' ? '✓ SELECTED' : '✗ REJECTED'}
            </div>

            {/* Option Header */}
            <div style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 900, color: alt.labelColor, marginBottom: 4 }}>
              {alt.id}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{alt.option}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>{alt.description}</div>

            {/* Score */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 5 }}>
                <span>AI Score</span>
                <span style={{ fontWeight: 700, color: alt.labelColor }}>{alt.score}/100</span>
              </div>
              <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${alt.score}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                  style={{ height: '100%', borderRadius: 99, background: alt.labelColor }} />
              </div>
            </div>

            {/* Pros */}
            <div style={{ marginBottom: 10 }}>
              {alt.pros.map((p, j) => (
                <div key={j} style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4, display: 'flex', gap: 6 }}>
                  <span style={{ color: '#10b981', flexShrink: 0 }}>+</span> {p}
                </div>
              ))}
            </div>

            {/* Cons */}
            {alt.cons.map((c, j) => (
              <div key={j} style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4, display: 'flex', gap: 6 }}>
                <span style={{ color: '#ef4444', flexShrink: 0 }}>−</span> {c}
              </div>
            ))}

            {/* Rejection Reason */}
            {alt.rejectionReason && (
              <div style={{ marginTop: 12, padding: '8px 10px', borderRadius: 8, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', fontSize: 11, color: 'var(--accent-red)', lineHeight: 1.5 }}>
                🚫 {alt.rejectionReason}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

// placeholder for Lucide GitBranch
function GitBranchIcon({ size }: { size: number }) {
  return <span style={{ fontSize: size - 2 }}>⑂</span>
}

// ─── 7. Future Forecast ───────────────────────────────────────
function FutureForecast() {
  const [period, setPeriod] = useState<keyof typeof FUTURE_FORECAST>('30D')
  const periods: Array<keyof typeof FUTURE_FORECAST> = ['1D', '7D', '30D', '90D', '6M', '1Y']
  const data = FUTURE_FORECAST[period]

  // Build chart data
  const chartData = periods.map(p => {
    const d = FUTURE_FORECAST[p]
    return {
      period: p,
      best: d.cashPosition.best,
      expected: d.cashPosition.expected,
      worst: d.cashPosition.worst,
    }
  })

  return (
    <Section id="s7" number="07" title="Future Forecast" icon={<BarChart3Icon size={18} />} accent="#06b6d4"
      subtitle="AI-predicted business trajectory across 6 time horizons">
      {/* Period tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {periods.map(p => (
          <button key={p} onClick={() => setPeriod(p)} style={{
            padding: '7px 16px', borderRadius: 10, border: '1px solid',
            borderColor: period === p ? 'rgba(6,182,212,0.5)' : 'var(--border-subtle)',
            background: period === p ? 'rgba(6,182,212,0.12)' : 'transparent',
            color: period === p ? '#06b6d4' : 'var(--text-muted)',
            fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
          }}>{p}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
          AI Confidence: <strong style={{ color: data.confidence > 85 ? '#10b981' : data.confidence > 70 ? '#f59e0b' : '#ef4444', marginLeft: 6 }}>{data.confidence}%</strong>
        </span>
      </div>

      {/* Cash forecast chart */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Cash Position Forecast — All Horizons</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="bestFG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expFG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="period" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => formatINR(v)} />
            <Tooltip formatter={(v: any) => formatINR(v)} contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', borderRadius: 10, fontSize: 12 }} />
            <Area type="monotone" dataKey="best" stroke="#10b981" strokeWidth={1.5} fill="url(#bestFG)" name="Best Case" strokeDasharray="4 2" />
            <Area type="monotone" dataKey="expected" stroke="#6366f1" strokeWidth={2.5} fill="url(#expFG)" name="Expected" />
            <Area type="monotone" dataKey="worst" stroke="#ef4444" strokeWidth={1.5} fill="none" name="Worst Case" strokeDasharray="4 2" />
            <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: '🚀 Best Case', color: '#10b981', cash: data.cashPosition.best, revenue: data.revenue.best, profit: data.profit.best, risk: data.risk.best, vendor: data.vendorHealth.best },
          { label: '📊 Expected', color: '#6366f1', cash: data.cashPosition.expected, revenue: data.revenue.expected, profit: data.profit.expected, risk: data.risk.expected, vendor: data.vendorHealth.expected },
          { label: '⚠ Worst Case', color: '#ef4444', cash: data.cashPosition.worst, revenue: data.revenue.worst, profit: data.profit.worst, risk: data.risk.worst, vendor: data.vendorHealth.worst },
        ].map((s) => (
          <motion.div key={s.label} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            style={{ padding: 18, borderRadius: 14, background: `${s.color}06`, border: `1px solid ${s.color}20` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 14 }}>{s.label}</div>
            {[
              { k: 'Cash Position', v: formatINR(s.cash) },
              { k: 'Revenue', v: s.revenue === 0 ? '—' : formatINR(s.revenue) },
              { k: 'Profit', v: formatINR(s.profit) },
              { k: 'Risk Level', v: s.risk },
              { k: 'Vendor Health', v: s.vendor },
            ].map(r => (
              <div key={r.k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 12 }}>
                <span style={{ color: 'var(--text-muted)' }}>{r.k}</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>{r.v}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function BarChart3Icon({ size }: { size: number }) {
  return <span style={{ fontSize: size - 2 }}>📊</span>
}

// ─── 8. Business Impact Score ─────────────────────────────────
function ImpactScore() {
  const scores = Object.values(IMPACT_SCORES).filter(s => typeof s === 'object') as typeof IMPACT_SCORES.cashFlow[]

  return (
    <Section id="s8" number="08" title="Business Impact Score" icon={<Star size={18} />} accent="#f59e0b"
      subtitle="Composite AI-weighted score across all business dimensions">
      {/* Hero Score */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'center', marginBottom: 32, padding: '28px 32px', borderRadius: 20, background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(99,102,241,0.06))', border: '1px solid rgba(245,158,11,0.2)' }}>
        <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
          <svg viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="70" cy="70" r="60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
            <motion.circle cx="70" cy="70" r="60" fill="none" stroke="#f59e0b" strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 60}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - IMPACT_SCORES.overall / 100) }}
              transition={{ duration: 1.5, delay: 0.3 }}
              strokeLinecap="round" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span className="number-font" style={{ fontSize: 36, fontWeight: 900, color: '#f59e0b' }}>{IMPACT_SCORES.overall}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>/ 100</span>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>Overall Decision Score</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 500 }}>
            This decision scores <strong style={{ color: '#f59e0b' }}>94 out of 100</strong> — ranking in the <strong style={{ color: '#10b981' }}>Top 5%</strong> of finance decisions reviewed by the AI board. The primary driver is the high-certainty, immediate financial return (₹84K savings) combined with strategic vendor relationship value.
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <span className="badge-positive" style={{ fontSize: 12 }}>✓ Strongly Recommended</span>
            <span className="badge-positive" style={{ fontSize: 12 }}>Strategic Alignment 96%</span>
          </div>
        </div>
      </div>

      {/* Score Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {Object.entries(IMPACT_SCORES).filter(([k]) => k !== 'overall').map(([key, s]: any, i) => (
          <motion.div key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            style={{ padding: '16px 18px', borderRadius: 12, background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>{s.label}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <span className="number-font" style={{ fontSize: 22, fontWeight: 800, color: s.color }}>
                {s.inverse ? s.score : s.rating || `${s.score}%`}
              </span>
              {s.rating && !s.inverse && (
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: `${s.color}15`, color: s.color }}>{s.rating}</span>
              )}
            </div>
            {!s.rating && (
              <div className="confidence-bar" style={{ marginBottom: 8 }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${s.score}%` }} transition={{ duration: 0.8, delay: i * 0.06 }}
                  style={{ height: '100%', borderRadius: 99, background: s.color }} />
              </div>
            )}
            <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{s.note}</div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

// ─── 9. Next Recommended Actions ─────────────────────────────
function NextActions() {
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  return (
    <Section id="s9" number="09" title="Next Recommended Actions" icon={<Zap size={18} />} accent="#10b981"
      subtitle="AI-prioritized action plan with auto-assigned Finance Employees">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {NEXT_ACTIONS.map((action, i) => {
          const emp = FINANCE_EMPLOYEES.find(e => e.id === action.assignedTo)
          const done = completed.has(i)
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              style={{
                padding: '16px 20px', borderRadius: 14,
                background: done ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${done ? 'rgba(16,185,129,0.2)' : 'var(--border-subtle)'}`,
                display: 'flex', gap: 14, alignItems: 'center',
              }}>
              {/* Priority Number */}
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: done ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800,
                color: done ? 'var(--accent-emerald)' : 'var(--text-muted)',
              }}>
                {done ? '✓' : action.priority}
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: done ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: done ? 'line-through' : undefined }}>
                    {action.action}
                  </span>
                  {action.automate && (
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 99, background: 'rgba(99,102,241,0.12)', color: 'var(--accent-indigo)', border: '1px solid rgba(99,102,241,0.2)' }}>
                      AUTO
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{action.detail}</div>
              </div>

              {/* Assigned To */}
              {emp && (
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontSize: 22 }}>{emp.avatar}</div>
                  <div style={{ fontSize: 10, color: emp.color, fontWeight: 600 }}>{emp.role}</div>
                </div>
              )}

              {/* Deadline */}
              <div style={{ textAlign: 'right', flexShrink: 0, minWidth: 90 }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>
                  <Clock size={10} style={{ display: 'inline', marginRight: 3 }} />{action.deadline}
                </div>
                <button
                  onClick={() => setCompleted(prev => { const n = new Set(prev); done ? n.delete(i) : n.add(i); return n })}
                  className={done ? 'btn-ghost' : 'btn-primary'}
                  style={{ fontSize: 11, padding: '5px 12px' }}
                >
                  {done ? 'Undo' : 'Execute'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

// ─── 10. Boardroom Summary ────────────────────────────────────
function BoardroomSummary() {
  const [printing, setPrinting] = useState(false)

  const handleExport = () => {
    setPrinting(true)
    setTimeout(() => { window.print(); setPrinting(false) }, 300)
  }

  return (
    <Section id="s10" number="10" title="Boardroom Summary" icon={<Users size={18} />} accent="#8b5cf6"
      subtitle="One-click Board Meeting ready summary — export to PDF">
      <div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
        <button onClick={handleExport} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Download size={14} /> Export to PDF
        </button>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Printer size={14} /> Print
        </button>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          Share via Slack
        </button>
      </div>

      <div style={{
        padding: 36, borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(99,102,241,0.04))',
        border: '1px solid rgba(139,92,246,0.2)',
        fontFamily: 'Inter, sans-serif',
      }}>
        {/* Memo Header */}
        <div style={{ borderBottom: '2px solid rgba(139,92,246,0.2)', paddingBottom: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-violet)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>BOARD MEMORANDUM — CONFIDENTIAL</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{BOARDROOM_SUMMARY.title}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{BOARDROOM_SUMMARY.subtitle}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>AI Decision Score</div>
              <div className="number-font" style={{ fontSize: 36, fontWeight: 900, color: '#f59e0b' }}>{BRIEF_DECISION.overallScore}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>/ 100</div>
            </div>
          </div>
        </div>

        {[
          { label: 'Decision', icon: '⚡', content: BOARDROOM_SUMMARY.decision },
          { label: 'Business Justification', icon: '📊', content: BOARDROOM_SUMMARY.justification },
          { label: 'Financial Impact', icon: '💰', content: BOARDROOM_SUMMARY.financialImpact },
          { label: 'Forecast', icon: '🔮', content: BOARDROOM_SUMMARY.forecast },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-violet)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              {s.icon} {s.label}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.content}</p>
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {[
            { label: 'KPIs Changed', icon: '📈', items: BOARDROOM_SUMMARY.kpisChanged },
            { label: 'Risks', icon: '⚠️', items: BOARDROOM_SUMMARY.risks },
            { label: 'Action Items', icon: '✅', items: BOARDROOM_SUMMARY.actionItems },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-violet)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                {s.icon} {s.label}
              </div>
              {s.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: 6, marginBottom: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                  <ChevronRight size={12} style={{ flexShrink: 0, marginTop: 3, color: 'var(--accent-violet)' }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

// ─── Table of Contents ────────────────────────────────────────
function TableOfContents() {
  const sections = [
    { n: '01', label: 'Executive Summary', id: 's1' },
    { n: '02', label: 'Why This Decision', id: 's2' },
    { n: '03', label: 'Data Used', id: 's3' },
    { n: '04', label: 'KPI Impact', id: 's4' },
    { n: '05', label: 'Trade-Off Analysis', id: 's5' },
    { n: '06', label: 'Alternatives Considered', id: 's6' },
    { n: '07', label: 'Future Forecast', id: 's7' },
    { n: '08', label: 'Business Impact Score', id: 's8' },
    { n: '09', label: 'Next Actions', id: 's9' },
    { n: '10', label: 'Boardroom Summary', id: 's10' },
  ]
  return (
    <div className="card" style={{ padding: '16px 20px', marginBottom: 24 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Contents</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {sections.map(s => (
          <a key={s.id} href={`#${s.id}`}
            style={{ fontSize: 12, padding: '5px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{ fontFamily: 'Outfit', fontWeight: 800, color: 'var(--accent-indigo)', fontSize: 11 }}>{s.n}</span>
            {s.label}
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────
export function ExecutiveBrief() {
  return (
    <div>
      <TopBar title="Executive Decision Brief" subtitle="Explain Like a CFO — Board-Ready Intelligence Report" />
      <div style={{ padding: '32px 40px', maxWidth: 1400 }}>

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{
            marginBottom: 28, padding: '28px 32px', borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.06), rgba(16,185,129,0.04))',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 0 60px rgba(99,102,241,0.1)',
          }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 99, background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)', letterSpacing: '0.1em' }}>
                  EXPLAIN LIKE A CFO
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>{BRIEF_DECISION.date}</span>
              </div>
              <div style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                {BRIEF_DECISION.title}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>{BRIEF_DECISION.subtitle}</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  { label: 'Decision Owner', value: BRIEF_DECISION.decisionOwner },
                  { label: 'Prepared By', value: BRIEF_DECISION.preparedBy },
                  { label: 'Category', value: BRIEF_DECISION.category },
                  { label: 'Priority', value: BRIEF_DECISION.priority },
                ].map(m => (
                  <span key={m.label} style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    <strong style={{ color: 'var(--text-secondary)' }}>{m.label}:</strong> {m.value}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div className="number-font" style={{ fontSize: 56, fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>{BRIEF_DECISION.overallScore}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Decision Score</div>
              <div style={{ marginTop: 8 }}>
                <span className="badge-positive">✓ {BRIEF_DECISION.decisionStatus}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <TableOfContents />

        {/* All 10 Sections */}
        <ExecSummary />
        <WhyDecision />
        <DataUsed />
        <KPIImpact />
        <TradeOffAnalysis />
        <Alternatives />
        <FutureForecast />
        <ImpactScore />
        <NextActions />
        <BoardroomSummary />
      </div>
    </div>
  )
}
