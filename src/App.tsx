import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppLayout } from '@/components/layout/AppLayout'

// Core pages
import { Landing } from '@/pages/Landing'
import { Dashboard } from '@/pages/Dashboard'
import { WarRoom } from '@/pages/WarRoom'
import { KPIImpact } from '@/pages/KPIImpact'
import { Forecast } from '@/pages/Forecast'
import { Scenarios } from '@/pages/Scenarios'
import { FeedbackAI } from '@/pages/FeedbackAI'
import { CompetitorAI } from '@/pages/CompetitorAI'
import { Roadmap } from '@/pages/Roadmap'
import { Experiments } from '@/pages/Experiments'
import { Memory } from '@/pages/Memory'
import { Report } from '@/pages/Report'
import { Voice } from '@/pages/Voice'

// Finance Edition pages
import { FinanceDashboard } from '@/pages/finance/FinanceDashboard'
import { FinanceWarRoom } from '@/pages/finance/FinanceWarRoom'
import { FinanceEmployees } from '@/pages/finance/FinanceEmployees'
import { MonthEnd } from '@/pages/finance/MonthEnd'
import { InvoiceApproval } from '@/pages/finance/InvoiceApproval'
import { VendorPayments } from '@/pages/finance/VendorPayments'
import { CashFlowPlanning } from '@/pages/finance/CashFlowPlanning'
import { ComplianceRisk } from '@/pages/finance/ComplianceRisk'
import { FinancialForecast } from '@/pages/finance/FinancialForecast'
import { FinanceKPIImpact } from '@/pages/finance/FinanceKPIImpact'
import { WhatIf } from '@/pages/finance/WhatIf'
import { ExecutiveBrief } from '@/pages/finance/ExecutiveBrief'
import { PredictionReview } from '@/pages/finance/PredictionReview'

const queryClient = new QueryClient()

function Placeholder({ title }: { title: string }) {
  return (
    <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>🚧</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
      <div style={{ fontSize: 14, marginTop: 8 }}>Coming soon</div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />

          {/* App (with layout) */}
          <Route element={<AppLayout />}>
            {/* Core WAR ROOM */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/warroom" element={<WarRoom />} />
            <Route path="/kpi-impact" element={<KPIImpact />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/feedback" element={<FeedbackAI />} />
            <Route path="/competitor" element={<CompetitorAI />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/experiments" element={<Experiments />} />
            <Route path="/memory" element={<Memory />} />
            <Route path="/report" element={<Report />} />
            <Route path="/voice" element={<Voice />} />

            {/* Finance Edition (Zamp Demo) */}
            <Route path="/finance" element={<FinanceDashboard />} />
            <Route path="/finance/warroom" element={<FinanceWarRoom />} />
            <Route path="/finance/employees" element={<FinanceEmployees />} />
            <Route path="/finance/month-end" element={<MonthEnd />} />
            <Route path="/finance/invoices" element={<InvoiceApproval />} />
            <Route path="/finance/payments" element={<VendorPayments />} />
            <Route path="/finance/cashflow" element={<CashFlowPlanning />} />
            <Route path="/finance/compliance" element={<ComplianceRisk />} />
            <Route path="/finance/forecast" element={<FinancialForecast />} />
            <Route path="/finance/kpi-impact" element={<FinanceKPIImpact />} />
            <Route path="/finance/what-if" element={<WhatIf />} />
            <Route path="/finance/executive-brief" element={<ExecutiveBrief />} />
            <Route path="/finance/prediction-review" element={<PredictionReview />} />

            <Route path="/settings" element={<Placeholder title="Settings" />} />
            <Route path="/help" element={<Placeholder title="Help & Docs" />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
