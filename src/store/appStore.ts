import { create } from 'zustand'

interface AppState {
  sidebarOpen: boolean
  currentQuestion: string
  activeSession: string | null
  setSidebarOpen: (open: boolean) => void
  setCurrentQuestion: (q: string) => void
  setActiveSession: (id: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  currentQuestion: '',
  activeSession: null,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentQuestion: (q) => set({ currentQuestion: q }),
  setActiveSession: (id) => set({ activeSession: id }),
}))
