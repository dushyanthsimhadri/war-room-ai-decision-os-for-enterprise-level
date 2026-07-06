import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Swords, TrendingUp, BarChart3, GitBranch,
  MessageSquare, Globe, Map, FlaskConical, Clock, FileText,
  Mic, ChevronLeft, ChevronDown, ChevronUp, Zap, Settings,
  HelpCircle, DollarSign, BookOpen, CreditCard, ShieldCheck,
  PieChart, LineChart, Calculator, Users, Sliders, History, Home
} from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { COMPANY } from '@/data/mockData'

const coreNavGroups = [
  {
    label: 'Command Center',
    items: [
      { to: '/', icon: Home, label: 'Home' },
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/warroom', icon: Swords, label: 'War Room', badge: 'Live' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { to: '/kpi-impact', icon: TrendingUp, label: 'KPI Impact' },
      { to: '/forecast', icon: BarChart3, label: 'Forecast Engine' },
      { to: '/scenarios', icon: GitBranch, label: 'Scenarios' },
    ],
  },
  {
    label: 'Analysis',
    items: [
      { to: '/feedback', icon: MessageSquare, label: 'Customer Feedback AI' },
      { to: '/competitor', icon: Globe, label: 'Competitor AI' },
      { to: '/roadmap', icon: Map, label: 'Roadmap AI' },
      { to: '/experiments', icon: FlaskConical, label: 'Experiments' },
    ],
  },
  {
    label: 'History',
    items: [
      { to: '/memory', icon: Clock, label: 'Decision Memory' },
      { to: '/report', icon: FileText, label: 'Executive Report' },
      { to: '/voice', icon: Mic, label: 'Voice Mode' },
    ],
  },
]

const financeNavGroups = [
  {
    label: 'Finance Command',
    items: [
      { to: '/finance', icon: DollarSign, label: 'Finance Dashboard', badge: '3 alerts' },
      { to: '/finance/warroom', icon: Swords, label: 'Finance War Room', badge: 'AI' },
      { to: '/finance/employees', icon: Users, label: 'AI Finance Team' },
    ],
  },
  {
    label: 'Live Scenarios',
    items: [
      { to: '/finance/month-end', icon: BookOpen, label: 'Month-End Close' },
      { to: '/finance/invoices', icon: CreditCard, label: 'Invoice Approval' },
      { to: '/finance/payments', icon: DollarSign, label: 'Vendor Payments' },
      { to: '/finance/cashflow', icon: LineChart, label: 'Cash Flow' },
      { to: '/finance/compliance', icon: ShieldCheck, label: 'Compliance Risk' },
      { to: '/finance/forecast', icon: PieChart, label: 'Financial Forecast' },
    ],
  },
  {
    label: 'Decision Tools',
    items: [
      { to: '/finance/kpi-impact', icon: Calculator, label: 'KPI Impact Engine' },
      { to: '/finance/what-if', icon: Sliders, label: 'What-If Simulator' },
      { to: '/finance/executive-brief', icon: FileText, label: 'Exec Decision Brief', badge: 'CFO' },
      { to: '/finance/prediction-review', icon: History, label: 'Prediction Accuracy', badge: '91%' },
    ],
  },
]

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore()
  const location = useLocation()
  const [financeOpen, setFinanceOpen] = useState(location.pathname.startsWith('/finance'))

  const isFinanceRoute = location.pathname.startsWith('/finance')

  return (
    <AnimatePresence initial={false}>
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="sidebar"
        style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 16px', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0,
        }}>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-glow-indigo)' }}>
                  <Swords size={16} color="white" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>WAR ROOM</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>{COMPANY.name}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {!sidebarOpen && (
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <Swords size={16} color="white" />
            </div>
          )}
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4, borderRadius: 6 }}>
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 10px' }}>

          {/* Core Nav */}
          {coreNavGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: 20 }}>
              {sidebarOpen && <div className="section-label" style={{ padding: '4px 8px', marginBottom: 4 }}>{group.label}</div>}
              {group.items.map((item) => {
                const isActive = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to))
                return (
                  <NavLink key={item.to} to={item.to}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center', padding: sidebarOpen ? '10px 14px' : '10px' }}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <item.icon size={17} style={{ flexShrink: 0 }} />
                    {sidebarOpen && <span style={{ flex: 1 }}>{item.label}</span>}
                    {sidebarOpen && (item as any).badge && (
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 99, background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)', border: '1px solid rgba(16,185,129,0.25)' }}>
                        {(item as any).badge}
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </div>
          ))}

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '8px 0 16px' }} />

          {/* Finance Edition Section Header */}
          {sidebarOpen ? (
            <button
              onClick={() => setFinanceOpen(!financeOpen)}
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 10, border: 'none',
                background: financeOpen ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.02)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 8,
              }}
            >
              <div style={{ width: 22, height: 22, borderRadius: 6, background: 'linear-gradient(135deg, #10b981, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <DollarSign size={12} color="white" />
              </div>
              <span style={{ flex: 1, textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Finance Edition
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 99, background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}>ZAMP</span>
              {financeOpen ? <ChevronUp size={12} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={12} style={{ color: 'var(--text-muted)' }} />}
            </button>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
              <NavLink to="/finance" title="Finance Edition"
                style={{ width: 40, height: 40, borderRadius: 10, background: isFinanceRoute ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isFinanceRoute ? 'rgba(16,185,129,0.3)' : 'var(--border-subtle)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                💰
              </NavLink>
            </div>
          )}

          {/* Finance Nav Groups */}
          <AnimatePresence>
            {financeOpen && sidebarOpen && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                {financeNavGroups.map((group) => (
                  <div key={group.label} style={{ marginBottom: 16 }}>
                    <div className="section-label" style={{ padding: '4px 8px', marginBottom: 4, color: '#10b981' }}>{group.label}</div>
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.to
                      return (
                        <NavLink key={item.to} to={item.to}
                          className={`sidebar-link ${isActive ? 'active' : ''}`}
                          style={{ justifyContent: 'flex-start', padding: '9px 14px', borderLeft: isActive ? '2px solid #10b981' : '2px solid transparent' }}
                        >
                          <item.icon size={15} style={{ flexShrink: 0, color: isActive ? '#10b981' : undefined }} />
                          <span style={{ flex: 1, fontSize: 13 }}>{item.label}</span>
                          {(item as any).badge && (
                            <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 99, background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                              {(item as any).badge}
                            </span>
                          )}
                        </NavLink>
                      )
                    })}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '12px 10px', flexShrink: 0 }}>
          <NavLink to="/settings" className="sidebar-link" style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center', padding: sidebarOpen ? '10px 14px' : '10px' }} title={!sidebarOpen ? 'Settings' : undefined}>
            <Settings size={17} />
            {sidebarOpen && <span>Settings</span>}
          </NavLink>
          <NavLink to="/help" className="sidebar-link" style={{ justifyContent: sidebarOpen ? 'flex-start' : 'center', padding: sidebarOpen ? '10px 14px' : '10px' }} title={!sidebarOpen ? 'Help' : undefined}>
            <HelpCircle size={17} />
            {sidebarOpen && <span>Help & Docs</span>}
          </NavLink>
          {sidebarOpen && (
            <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 10, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Zap size={12} style={{ color: 'var(--accent-amber)' }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-amber)' }}>Series B · Active</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {COMPANY.employees} employees · {COMPANY.customers.toLocaleString()} customers
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} style={{ width: '100%', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '8px', color: 'var(--accent-indigo)', cursor: 'pointer', display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <ChevronLeft size={14} style={{ transform: 'rotate(180deg)' }} />
            </button>
          )}
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
