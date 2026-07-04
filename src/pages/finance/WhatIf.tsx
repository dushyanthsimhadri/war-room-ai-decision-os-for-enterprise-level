import { useState } from 'react'
import { motion } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { whatIfScenarios, whatIfResults } from '@/data/financeData'
import { formatINR, formatDelta } from '@/lib/financeUtils'
import { Sliders, TrendingUp, TrendingDown, Zap, RotateCcw } from 'lucide-react'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'

const BASE_STATE = {
  cashFlow: 42850000,
  workingCapital: 24210000,
  profit: 8400000,
  compliance: 91,
  risk: 23,
  liquidity: 78,
  dpo: 38,
  dso: 42,
}

const KPI_LABELS: Record<string, string> = {
  cashFlow: 'Cash Flow', workingCapital: 'Working Capital', profit: 'Net Profit',
  compliance: 'Compliance Score', risk: 'Risk Score', liquidity: 'Liquidity Score',
  dpo: 'DPO (Days)', dso: 'DSO (Days)',
}

const KPI_FORMAT: Record<string, 'currency' | 'score'> = {
  cashFlow: 'currency', workingCapital: 'currency', profit: 'currency',
  compliance: 'score', risk: 'score', liquidity: 'score', dpo: 'score', dso: 'score',
}

function formatKPI(key: string, value: number): string {
  if (KPI_FORMAT[key] === 'currency') return formatINR(value)
  return String(value)
}

function DeltaBadge({ value, key }: { value: number; key: string }) {
  const isGood = (key === 'risk' || key === 'dso' || key === 'dpo') ? value < 0 : value > 0
  if (value === 0) return <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>No change</span>
  return (
    <span className={isGood ? 'badge-positive' : 'badge-negative'} style={{ fontSize: 11 }}>
      {KPI_FORMAT[key] === 'currency' ? formatDelta(value) : `${value > 0 ? '+' : ''}${value}`}
    </span>
  )
}

export function WhatIf() {
  const [selected, setSelected] = useState<string | null>(null)
  const [custom, setCustom] = useState('')
  const [customValue, setCustomValue] = useState(10)

  const result = selected ? whatIfResults[selected] : null

  const impactedKPIs = result
    ? Object.entries(result).filter(([k, v]) => v !== 0).map(([k, v]) => ({
        key: k,
        label: KPI_LABELS[k] || k,
        base: BASE_STATE[k as keyof typeof BASE_STATE] || 0,
        delta: v as number,
        projected: (BASE_STATE[k as keyof typeof BASE_STATE] || 0) + (v as number),
      }))
    : []

  return (
    <div>
      <TopBar title="What-If Simulator" subtitle="Simulate financial scenarios instantly" />
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '360px 1fr', gap: 24 }}>

        {/* Scenario Picker */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Choose a Scenario</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {whatIfScenarios.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelected(selected === s.id ? null : s.id)}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  background: selected === s.id ? 'rgba(99,102,241,0.1)' : 'rgba(13,17,23,0.9)',
                  border: `1px solid ${selected === s.id ? 'rgba(99,102,241,0.4)' : 'var(--border-default)'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: selected === s.id ? '0 0 20px rgba(99,102,241,0.15)' : undefined,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Change: {s.value}{s.unit === 'percent' ? '%' : ` ${s.unit}`}</div>
              </motion.button>
            ))}

            {/* Custom Scenario */}
            <div style={{ padding: 16, borderRadius: 12, border: '1px dashed var(--border-default)', background: 'rgba(255,255,255,0.01)' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Custom Scenario</div>
              <input
                className="war-room-input"
                placeholder="What if revenue drops by X%?"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={customValue}
                  onChange={(e) => setCustomValue(+e.target.value)}
                  style={{ flex: 1, accentColor: 'var(--accent-indigo)' }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-indigo)', width: 40, textAlign: 'right' }}>{customValue}%</span>
              </div>
              <button className="btn-primary" style={{ width: '100%', marginTop: 10, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Zap size={13} /> Simulate
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {!selected ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, color: 'var(--text-muted)', textAlign: 'center' }}>
              <Sliders size={48} style={{ margin: '0 auto 20px', opacity: 0.2 }} />
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Select a scenario to simulate</div>
              <div style={{ fontSize: 14 }}>See instant KPI impact across cash flow, working capital, and compliance</div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Scenario Header */}
              <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                  <Zap size={20} style={{ color: 'var(--accent-indigo)' }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                      {whatIfScenarios.find((s) => s.id === selected)?.label}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      Simulating impact across {impactedKPIs.length} KPIs
                    </div>
                  </div>
                  <button className="btn-ghost" style={{ marginLeft: 'auto', fontSize: 12, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
                    onClick={() => setSelected(null)}>
                    <RotateCcw size={12} /> Reset
                  </button>
                </div>
                {/* Summary Delta */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                  {[
                    { label: 'Cash Impact', delta: result?.cashFlow || 0, key: 'cashFlow' },
                    { label: 'Profit Impact', delta: result?.profit || 0, key: 'profit' },
                    { label: 'Risk Change', delta: result?.risk || 0, key: 'risk' },
                  ].map((s) => (
                    <div key={s.label} style={{ padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>{s.label}</div>
                      <DeltaBadge value={s.delta} key={s.key} />
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Impact Table */}
              <motion.div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                  KPI Impact Analysis
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                      {['KPI', 'Current', 'Projected', 'Delta', 'Trend'].map((h) => (
                        <th key={h} style={{ padding: '12px 24px', textAlign: h === 'KPI' ? 'left' : 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {impactedKPIs.map((kpi, i) => {
                      const isGood = (kpi.key === 'risk' || kpi.key === 'dso' || kpi.key === 'dpo') ? kpi.delta < 0 : kpi.delta > 0
                      return (
                        <motion.tr key={kpi.key} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                          style={{ borderTop: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: '14px 24px', fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600 }}>{kpi.label}</td>
                          <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, fontFamily: 'Outfit', fontWeight: 600, color: 'var(--text-muted)' }}>
                            {formatKPI(kpi.key, kpi.base)}
                          </td>
                          <td style={{ padding: '14px 24px', textAlign: 'center', fontSize: 13, fontFamily: 'Outfit', fontWeight: 700, color: isGood ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>
                            {formatKPI(kpi.key, kpi.projected)}
                          </td>
                          <td style={{ padding: '14px 24px', textAlign: 'center' }}>
                            <DeltaBadge value={kpi.delta} key={kpi.key} />
                          </td>
                          <td style={{ padding: '14px 24px', textAlign: 'center' }}>
                            {isGood
                              ? <TrendingUp size={16} style={{ color: 'var(--accent-emerald)' }} />
                              : <TrendingDown size={16} style={{ color: 'var(--accent-red)' }} />}
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </motion.div>

              {/* Narrative */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="card" style={{ padding: 24, marginTop: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>AI Narrative</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {selected === 'w1' && 'Delaying vendor payments by 10 days improves cash position by ₹82L and working capital by the same amount. However, DPO increases, and two key vendors (Infosys, AWS) have clauses against late payment. Recommend applying delay only to non-critical vendors with no early-pay discounts.'}
                  {selected === 'w2' && 'A 15% revenue drop significantly impacts cash flow (−₹1.07Cr) and net profit (−₹84L). Working capital shrinks, increasing risk score by 28 points. This scenario requires immediate cost reduction measures and potential draw-down on credit facility.'}
                  {selected === 'w3' && 'A 20% payroll increase costs ₹48L/month, reducing net profit by the same amount. Cash flow impact is immediate. At current burn rate, runway reduces by 3.2 months. Recommend offsetting with pricing increase or headcount optimization.'}
                  {selected === 'w4' && 'Improving collections by 25% delivers ₹78L in additional cash flow and reduces DSO from 42 to 30 days. This is the highest-ROI financial action available — recommend accelerating collections on the 3 overdue enterprise accounts immediately.'}
                  {selected === 'w5' && 'A 2% GST rate increase raises tax liability by ₹18.4L/month. Cash flow impact is material. Compliance score drops due to re-filing requirements. Recommend updating invoice templates and ERP configuration before the effective date.'}
                  {selected === 'w6' && 'Paying all available early-payment discounts saves ₹84K but requires ₹1.24Cr in early cash outflow. Liquidity score drops 28 points. Net benefit after cost of funds: ₹42K. Recommend selective early payment only where discount >1.5%.'}
                </div>
                <div style={{ marginTop: 20 }}>
                  <ExplainLikeCFO variant="button" label="Explain Like a CFO" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
