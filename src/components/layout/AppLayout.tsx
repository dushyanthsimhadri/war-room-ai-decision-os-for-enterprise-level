import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { useAppStore } from '@/store/appStore'
import { motion } from 'framer-motion'

export function AppLayout() {
  const { sidebarOpen } = useAppStore()

  return (
    <div className="animated-bg" style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="noise-overlay" />
      <Sidebar />
      <motion.main
        animate={{ marginLeft: sidebarOpen ? 260 : 72 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{ flex: 1, minHeight: '100vh', position: 'relative', zIndex: 1 }}
      >
        <Outlet />
      </motion.main>
    </div>
  )
}
