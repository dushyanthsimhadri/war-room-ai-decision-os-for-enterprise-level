import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, User, Zap, LogOut, Clock, Layers } from 'lucide-react'
import { useAppStore } from '@/store/appStore'

interface TopBarProps {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { sidebarOpen } = useAppStore()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [timeString, setTimeString] = useState('')

  const isDemo = location.search.includes('demo=true') || window.location.search.includes('demo=true')
  const companyName = isDemo ? 'WAR ROOM Technologies' : 'NexaFlow Technologies'
  const workspaceName = location.pathname.startsWith('/finance') ? 'Finance OS' : 'General Board'

  useEffect(() => {
    const update = () => {
      const d = new Date()
      setTimeString(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    update()
    const timer = setInterval(update, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    setShowLogoutModal(false)
    // Clear demo flags from storage or URL
    navigate('/')
  }

  return (
    <div className="topbar" style={{ paddingLeft: sidebarOpen ? 32 : 32 }}>
      
      {/* Title & Subtitle */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h1 style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 8 }}>
            {title}
          </h1>
          {subtitle && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              — {subtitle}
            </span>
          )}

          {/* DEMO MODE Badge */}
          {isDemo && (
            <span style={{
              fontSize: 10, fontWeight: 800, color: 'var(--accent-indigo)',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
              padding: '2px 8px', borderRadius: 99, letterSpacing: '0.04em', marginLeft: 8
            }}>
              DEMO MODE
            </span>
          )}
        </div>
      </div>

      {/* Session Indicators (Demo User, Company, Workspace, Time) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginRight: 8 }}>
        
        {/* Workspace Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
          <Layers size={13} style={{ color: 'var(--accent-indigo)' }} />
          <span>{workspaceName}</span>
        </div>

        {/* Time Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)' }}>
          <Clock size={13} style={{ color: 'var(--text-muted)' }} />
          <span className="number-font">{timeString}</span>
        </div>

        {/* User Card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '5px 12px',
          borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6, background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <User size={12} color="white" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>Demo User</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.1 }}>{companyName}</div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          style={{
            background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)',
            borderRadius: 8, padding: 8, cursor: 'pointer', color: 'var(--accent-red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
          }}
          title="Exit Workspace"
        >
          <LogOut size={14} />
        </button>
      </div>

      {/* Logout Confirmation Modal Overlay */}
      <AnimatePresence>
        {showLogoutModal && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: 24
          }}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="card"
              style={{ maxWidth: 420, width: '100%', padding: 28, border: '1px solid rgba(239,68,68,0.25)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: 'rgba(239,68,68,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-red)'
                }}>
                  <LogOut size={18} />
                </div>
                <h3 style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
                  Leave WAR ROOM?
                </h3>
              </div>
              
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 24 }}>
                You are about to exit the Executive Decision Workspace. Any active simulation states will be reset.
              </p>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button
                  className="btn-ghost"
                  onClick={() => setShowLogoutModal(false)}
                  style={{ padding: '8px 16px', fontSize: 13 }}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleLogout}
                  style={{ padding: '8px 20px', fontSize: 13, background: 'var(--accent-red)', border: '1px solid var(--accent-red)' }}
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
