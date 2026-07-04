// Finance utility functions
export function formatINR(value: number, compact = true): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (compact) {
    if (abs >= 10000000) return `${sign}₹${(abs / 10000000).toFixed(1)}Cr`
    if (abs >= 100000) return `${sign}₹${(abs / 100000).toFixed(1)}L`
    if (abs >= 1000) return `${sign}₹${(abs / 1000).toFixed(0)}K`
  }
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
}

export function formatDelta(value: number, prefix = '₹'): string {
  if (value === 0) return 'No change'
  const sign = value > 0 ? '+' : ''
  if (Math.abs(value) >= 10000000) return `${sign}${prefix}${(value / 10000000).toFixed(1)}Cr`
  if (Math.abs(value) >= 100000) return `${sign}${prefix}${(value / 100000).toFixed(1)}L`
  return `${sign}${prefix}${Math.abs(value).toLocaleString('en-IN')}`
}

export function severityColor(severity: string): string {
  switch (severity) {
    case 'critical': return '#ef4444'
    case 'high': return '#f97316'
    case 'medium': return '#f59e0b'
    case 'low': return '#10b981'
    default: return '#94a3b8'
  }
}

export function aiDecisionColor(decision: string): string {
  switch (decision) {
    case 'approve': case 'pay_today': return '#10b981'
    case 'needs_review': case 'pay_next_week': return '#f59e0b'
    case 'reject': case 'hold': return '#ef4444'
    case 'delay_safely': return '#06b6d4'
    default: return '#94a3b8'
  }
}

export function aiDecisionLabel(decision: string): string {
  switch (decision) {
    case 'approve': return 'Approve'
    case 'reject': return 'Reject'
    case 'needs_review': return 'Needs Review'
    case 'pay_today': return 'Pay Today'
    case 'pay_next_week': return 'Pay Next Week'
    case 'delay_safely': return 'Delay Safely'
    case 'hold': return 'Hold – Investigate'
    default: return decision
  }
}
