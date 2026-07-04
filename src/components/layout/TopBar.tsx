import { motion } from 'framer-motion'
import { Bell, Search, User, Zap, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { COMPANY } from '@/data/mockData'

interface TopBarProps {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="topbar" style={{ paddingLeft: sidebarOpen ? 32 : 32 }}>
      {/* Title */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {title}
          </h1>
          {subtitle && (
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>
              — {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 10,
        padding: '8px 14px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        width: 220,
      }}>
        <Search size={14} style={{ color: 'var(--text-muted)' }} />
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Search anything...</span>
        <kbd style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--border-subtle)' }}>⌘K</kbd>
      </div>

      {/* Live indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 10, background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
        <div className="status-dot active" />
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-emerald)' }}>Live</span>
      </div>

      {/* Notifications */}
      <button style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 10,
        padding: '8px',
        cursor: 'pointer',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Bell size={16} />
        <span style={{
          position: 'absolute',
          top: 6,
          right: 6,
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: 'var(--accent-red)',
          border: '1.5px solid var(--bg-base)',
        }} />
      </button>

      {/* User */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 10px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid var(--border-subtle)',
        cursor: 'pointer',
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <User size={14} color="white" />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>CEO</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{COMPANY.name}</div>
        </div>
        <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />
      </div>
    </div>
  )
}
