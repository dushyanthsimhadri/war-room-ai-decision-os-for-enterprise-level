import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

interface ExplainLikeCFOProps {
  /** Optional decision context to pass through (for future dynamic reports) */
  decisionId?: string
  /** Visual variant */
  variant?: 'button' | 'banner' | 'inline'
  /** Override the navigate target */
  href?: string
  /** Custom label */
  label?: string
}

/**
 * "Explain Like a CFO" trigger button.
 * Drop this on any finance page next to an AI recommendation.
 * It navigates to the full Executive Decision Brief page.
 */
export function ExplainLikeCFO({
  decisionId = 'edb-001',
  variant = 'button',
  href = '/finance/executive-brief',
  label = 'Explain Like a CFO',
}: ExplainLikeCFOProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`${href}?decision=${decisionId}`)
  }

  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        onClick={handleClick}
        style={{
          padding: '14px 20px',
          borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.05))',
          border: '1px solid rgba(99,102,241,0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={16} style={{ color: 'var(--accent-indigo)' }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              10-section executive brief with KPI impact, forecasts & boardroom summary
            </div>
          </div>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, padding: '5px 14px', borderRadius: 99, background: 'var(--gradient-primary)', color: 'white', whiteSpace: 'nowrap' }}>
          View Brief →
        </span>
      </motion.div>
    )
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={handleClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--accent-indigo)',
          padding: '4px 0',
          textDecoration: 'underline',
          textDecorationColor: 'rgba(99,102,241,0.4)',
          textUnderlineOffset: 3,
        }}
      >
        <FileText size={12} />
        {label}
      </button>
    )
  }

  // Default: button
  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ y: -1, boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 18px',
        borderRadius: 10,
        border: '1px solid rgba(99,102,241,0.35)',
        background: 'rgba(99,102,241,0.1)',
        color: 'var(--accent-indigo)',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.01em',
        transition: 'all 0.2s',
      }}
    >
      <FileText size={14} />
      {label}
    </motion.button>
  )
}
