import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TopBar } from '@/components/layout/TopBar'
import { invoiceQueue } from '@/data/financeData'
import { FINANCE_EMPLOYEES } from '@/data/financeData'
import { formatINR } from '@/lib/financeUtils'
import { aiDecisionColor, aiDecisionLabel } from '@/lib/financeUtils'
import { Upload, CheckCircle, XCircle, AlertTriangle, Zap, FileText } from 'lucide-react'
import { sleep } from '@/lib/utils'
import { ExplainLikeCFO } from '@/components/finance/ExplainLikeCFO'

const AI_CHECKS = [
  { id: 'duplicate', label: 'Duplicate Invoice Check', icon: '🔍' },
  { id: 'po', label: 'PO Match Verification', icon: '📋' },
  { id: 'contract', label: 'Contract Match', icon: '📝' },
  { id: 'budget', label: 'Budget Availability', icon: '💰' },
  { id: 'vendor', label: 'Vendor History & Rating', icon: '🏢' },
  { id: 'fraud', label: 'Fraud Risk Analysis', icon: '🛡️' },
  { id: 'gst', label: 'GST Validation', icon: '📊' },
  { id: 'compliance', label: 'Compliance Check', icon: '✅' },
  { id: 'terms', label: 'Payment Terms Review', icon: '⏰' },
]

function CheckResult({ check, result }: { check: typeof AI_CHECKS[0]; result: any }) {
  const statusColor = result === 'pass' ? 'var(--accent-emerald)' : result === 'fail' ? 'var(--accent-red)' : result === 'warning' ? 'var(--accent-amber)' : 'var(--text-muted)'
  const StatusIcon = result === 'pass' ? CheckCircle : result === 'fail' ? XCircle : result === 'warning' ? AlertTriangle : null

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 0', borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ fontSize: 16 }}>{check.icon}</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{check.label}</span>
      </div>
      {result === 'pending' ? (
        <div className="typing-dots">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-indigo)', animationDelay: `${i * 0.2}s`, display: 'inline-block' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {StatusIcon && <StatusIcon size={15} style={{ color: statusColor }} />}
          <span style={{ fontSize: 12, fontWeight: 700, color: statusColor, textTransform: 'uppercase' }}>
            {result === 'pass' ? 'Pass' : result === 'fail' ? 'Fail' : result === 'warning' ? 'Warning' : '—'}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export function InvoiceApproval() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoiceQueue[0] | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [checkResults, setCheckResults] = useState<Record<string, string>>({})
  const [finalDecision, setFinalDecision] = useState<string | null>(null)

  const analyzeInvoice = async (invoice: typeof invoiceQueue[0]) => {
    setSelectedInvoice(invoice)
    setAnalyzing(true)
    setCheckResults({})
    setFinalDecision(null)

    const checkMap: Record<string, string> = {
      duplicate: invoice.duplicateCheck === 'pass' ? 'pass' : 'fail',
      po: invoice.poMatch ? 'pass' : 'fail',
      contract: invoice.contractMatch ? 'pass' : invoice.aiDecision === 'needs_review' ? 'warning' : 'fail',
      budget: invoice.budgetAvailable ? 'pass' : 'fail',
      vendor: invoice.fraudRisk === 'low' ? 'pass' : invoice.fraudRisk === 'high' ? 'fail' : 'warning',
      fraud: invoice.fraudRisk === 'low' ? 'pass' : invoice.fraudRisk === 'high' ? 'fail' : 'warning',
      gst: invoice.gstValid ? 'pass' : 'fail',
      compliance: invoice.aiDecision === 'approve' ? 'pass' : invoice.aiDecision === 'needs_review' ? 'warning' : 'fail',
      terms: 'pass',
    }

    for (const check of AI_CHECKS) {
      setCheckResults((prev) => ({ ...prev, [check.id]: 'pending' }))
      await sleep(400 + Math.random() * 300)
      setCheckResults((prev) => ({ ...prev, [check.id]: checkMap[check.id] }))
    }

    await sleep(600)
    setFinalDecision(invoice.aiDecision)
    setAnalyzing(false)
  }

  return (
    <div>
      <TopBar title="Invoice Approval AI" subtitle="Automated invoice validation and approval" />
      <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 420px', gap: 24 }}>

        {/* Left: Invoice Queue */}
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
            Invoice Queue ({invoiceQueue.length} pending)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {invoiceQueue.map((inv, i) => {
              const decColor = aiDecisionColor(inv.aiDecision)
              const decLabel = aiDecisionLabel(inv.aiDecision)
              return (
                <motion.div
                  key={inv.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => analyzeInvoice(inv)}
                  className="card"
                  style={{
                    padding: 22,
                    cursor: 'pointer',
                    borderColor: selectedInvoice?.id === inv.id ? decColor : undefined,
                    boxShadow: selectedInvoice?.id === inv.id ? `0 0 20px ${decColor}20` : undefined,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{inv.vendor}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Invoice {inv.id} · {inv.date} · {inv.paymentTerms}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{formatINR(inv.amount)}</div>
                      <div style={{
                        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99, marginTop: 4, display: 'inline-block',
                        background: `${decColor}15`, color: decColor, border: `1px solid ${decColor}30`,
                      }}>
                        {decLabel}
                      </div>
                    </div>
                  </div>

                  {/* Check grid preview */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                    {[
                      { label: 'PO Match', ok: inv.poMatch },
                      { label: 'Contract', ok: inv.contractMatch },
                      { label: 'Budget', ok: inv.budgetAvailable },
                      { label: 'GST', ok: inv.gstValid },
                      { label: 'Fraud', ok: inv.fraudRisk === 'low' },
                    ].map((c) => (
                      <div key={c.label} style={{ textAlign: 'center', padding: '6px', borderRadius: 8, background: c.ok ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.06)', border: `1px solid ${c.ok ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}` }}>
                        <div style={{ fontSize: 14 }}>{c.ok ? '✓' : '✗'}</div>
                        <div style={{ fontSize: 9, fontWeight: 600, color: c.ok ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>{c.label}</div>
                      </div>
                    ))}
                  </div>

                  {inv.reviewReason && (
                    <div style={{ marginTop: 12, padding: '8px 12px', borderRadius: 8, background: `${decColor}08`, border: `1px solid ${decColor}20`, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <strong>AI Note:</strong> {inv.reviewReason}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Upload zone */}
          <div style={{
            marginTop: 20, padding: 24, borderRadius: 14, border: '2px dashed var(--border-default)',
            textAlign: 'center', color: 'var(--text-muted)', cursor: 'pointer',
            background: 'rgba(255,255,255,0.01)',
          }}>
            <Upload size={24} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
            <div style={{ fontSize: 13, fontWeight: 600 }}>Upload Invoice for AI Analysis</div>
            <div style={{ fontSize: 12, marginTop: 4 }}>PDF, PNG, JPG — AI extracts and validates automatically</div>
          </div>
        </div>

        {/* Right: AI Analysis Panel */}
        <div>
          {!selectedInvoice && (
            <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
              <FileText size={40} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Select an invoice</div>
              <div style={{ fontSize: 13 }}>Click any invoice to run the AI validation analysis</div>
            </div>
          )}

          {selectedInvoice && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Invoice Header */}
              <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                  {analyzing ? 'Analyzing Invoice…' : 'AI Analysis Complete'}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{selectedInvoice.vendor}</div>
                <div style={{ fontFamily: 'Outfit', fontSize: 28, fontWeight: 900, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {formatINR(selectedInvoice.amount)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selectedInvoice.date} · {selectedInvoice.paymentTerms}</div>
              </div>

              {/* AI Checks */}
              <div className="card" style={{ padding: '20px 24px', marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>AI Validation Checks</div>
                {AI_CHECKS.map((check) => (
                  <CheckResult key={check.id} check={check} result={checkResults[check.id] || '—'} />
                ))}
              </div>

              {/* Decision */}
              <AnimatePresence>
                {finalDecision && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      padding: 24, borderRadius: 16,
                      background: `${aiDecisionColor(finalDecision)}08`,
                      border: `1px solid ${aiDecisionColor(finalDecision)}30`,
                    }}
                  >
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                      {finalDecision === 'approve' ? <CheckCircle size={28} style={{ color: 'var(--accent-emerald)' }} />
                        : finalDecision === 'reject' ? <XCircle size={28} style={{ color: 'var(--accent-red)' }} />
                          : <AlertTriangle size={28} style={{ color: 'var(--accent-amber)' }} />}
                      <div>
                        <div style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 900, color: aiDecisionColor(finalDecision) }}>
                          {aiDecisionLabel(finalDecision)}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                          Confidence: {selectedInvoice.confidence}%
                        </div>
                      </div>
                    </div>
                    {selectedInvoice.reviewReason && (
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                        {selectedInvoice.reviewReason}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 8 }}>
                      {finalDecision === 'approve' && <button className="btn-primary" style={{ flex: 1, fontSize: 13 }}>✓ Approve & Queue Payment</button>}
                      {finalDecision === 'reject' && <button style={{ flex: 1, fontSize: 13, padding: '10px', borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--accent-red)', cursor: 'pointer', fontWeight: 600 }}>✗ Reject Invoice</button>}
                      {finalDecision === 'needs_review' && <button className="btn-primary" style={{ flex: 1, fontSize: 13 }}>Request Documentation</button>}
                      <button className="btn-ghost" style={{ fontSize: 13 }}>Override</button>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <ExplainLikeCFO variant="button" label="Explain Like a CFO" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
