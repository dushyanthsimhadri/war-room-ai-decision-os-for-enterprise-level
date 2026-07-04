import { useRef } from 'react'
import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { COMPANY, kpiData, decisionHistory, AI_EMPLOYEES, forecastData } from '@/data/mockData'
import { Download, FileText, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { formatCurrency } from '@/lib/utils'

const trendData = [
  { month: 'Jan', mrr: 2120000 },
  { month: 'Feb', mrr: 2100000 },
  { month: 'Mar', mrr: 2180000 },
  { month: 'Apr', mrr: 2240000 },
  { month: 'May', mrr: 2290000 },
  { month: 'Jun', mrr: 2340000 },
]

export function Report() {
  const reportRef = useRef<HTMLDivElement>(null)

  const handleExport = () => {
    window.print()
  }

  return (
    <div>
      <TopBar title="Executive Report" subtitle="Board-ready decision summary" />
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          <button className="btn-primary" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Download size={14} /> Export PDF
          </button>
          <button className="btn-ghost">Share Link</button>
        </div>

        {/* Report */}
        <div
          ref={reportRef}
          style={{
            background: 'rgba(13,17,23,0.95)',
            border: '1px solid var(--border-default)',
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'var(--gradient-primary)',
            padding: '40px 48px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                WAR ROOM · Executive Report
              </div>
              <div style={{ fontFamily: 'Outfit', fontSize: 32, fontWeight: 900, color: 'white', marginBottom: 8, letterSpacing: '-0.03em' }}>
                {COMPANY.name} — Decision Brief
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                June 28, 2026 · Prepared by AI Board of Directors
              </div>
            </div>
          </div>

          <div style={{ padding: '40px 48px' }}>
            {/* Executive Summary */}
            <section style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                Executive Summary
              </div>
              <div style={{ padding: 24, borderRadius: 14, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  The AI Board convened to evaluate the question: <strong style={{ color: 'var(--text-primary)' }}>"Should we launch Feature X this quarter?"</strong> After analyzing market data, financial models, customer signals, and competitive intelligence, the board reached an 89% confidence recommendation to proceed with a Q4 launch following a 6-week technical refactor. This decision is projected to generate $2.1M in incremental ARR while protecting $1.2M in enterprise renewals at risk.
                </p>
              </div>
            </section>

            {/* KPIs */}
            <section style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                Current Business Health
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { label: 'ARR', value: '$28.1M', change: '+11.4%' },
                  { label: 'MRR', value: '$2.34M', change: '+11.4%' },
                  { label: 'NPS', value: '62', change: '+8.8%' },
                  { label: 'Churn Rate', value: '2.4%', change: '-22.6%' },
                  { label: 'Retention', value: '94.2%', change: '+1.5%' },
                  { label: 'Activation', value: '68.5%', change: '+11.9%' },
                ].map((m) => (
                  <div key={m.label} style={{ padding: '16px 20px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{m.label}</div>
                    <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{m.value}</div>
                    <div className="badge-positive" style={{ fontSize: 11, marginTop: 6 }}>{m.change}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Revenue Chart */}
            <section style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                Revenue Trend
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="rptGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip />
                  <Area type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={2} fill="url(#rptGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </section>

            {/* Decision */}
            <section style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                Decision & Rationale
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { icon: CheckCircle, color: 'var(--accent-emerald)', title: 'Recommendation', content: 'Proceed with Q4 launch following 6-week refactor of the core analytics module. Begin July 15.' },
                  { icon: TrendingUp, color: 'var(--accent-indigo)', title: 'Financial Impact', content: '+$2.1M ARR, 340% ROI, $480K engineering budget required. Payback in 2.8 months.' },
                  { icon: AlertTriangle, color: 'var(--accent-amber)', title: 'Key Risks', content: 'Execution risk (55%) due to tech debt. Mitigated by dedicated refactor sprint. Market risk low (20%).' },
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: 14, padding: 20, borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                    <item.icon size={18} style={{ color: item.color, flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Board Signatures */}
            <section>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                AI Board Members
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {AI_EMPLOYEES.slice(0, 8).map((agent) => (
                  <div key={agent.id} style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{agent.avatar}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{agent.name}</div>
                    <div style={{ fontSize: 11, color: agent.color }}>{agent.role}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
