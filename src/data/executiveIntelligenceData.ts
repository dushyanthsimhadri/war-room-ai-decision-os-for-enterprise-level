// Advanced Executive Intelligence Data Model

export interface DepartmentHealth {
  id: string
  name: string
  healthScore: number
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  trend: 'up' | 'down' | 'flat'
  decisionLoad: number
  openIssues: number
  colorCode: 'green' | 'yellow' | 'orange' | 'red'
  relevantAgents: string[]
}

export interface ExecutiveAlert {
  id: string
  type: 'revenue' | 'cashflow' | 'compliance' | 'churn' | 'budget' | 'risk'
  title: string
  impact: string
  urgency: 'Low' | 'Medium' | 'High' | 'Immediate'
  confidence: number
  recommendedAction: string
}

export interface SourceOfTruth {
  name: string
  status: 'online' | 'synced' | 'pending' | 'offline'
  lastUpdated: string
  confidence: number
  contribution: number
  insights: string
  dataUsed: string
  reasoning: string
  evidence: string
}

export const BUSINESS_HEALTH = {
  healthScore: 92,
  companyRiskScore: 16,
  revenueForecast30D: 124000000, // ₹12.4Cr
  cashPosition: 42850000, // ₹4.28Cr
  openDecisionsCount: 3,
  predictionAccuracy: 91,
}

export const HIGH_IMPACT_DECISION = {
  id: 'hid-101',
  title: 'Consolidate Cloud Infrastructure & Database Clusters',
  recommendation: 'Migrate legacy local DB instances to AWS Aurora Serverless and retire underutilized development pipelines.',
  investment: 24000000, // ₹2.4Cr
  expectedReturn: 118000000, // ₹11.8Cr
  roi: 392,
  breakevenMonths: 8,
  engTeamSize: 12,
  bizTeamSize: 4,
  priority: 'High',
  costBreakdown: [
    { name: 'Engineering', value: 8000000, color: '#6366f1' },
    { name: 'Infrastructure Migration', value: 6000000, color: '#06b6d4' },
    { name: 'Operational Training', value: 4000000, color: '#f59e0b' },
    { name: 'Licensing & Subscriptions', value: 6000000, color: '#8b5cf6' },
  ],
  valueTimeline: [
    { month: 'M0', Cost: 24000000, Value: 0 },
    { month: 'M2', Cost: 24000000, Value: 12000000 },
    { month: 'M4', Cost: 24000000, Value: 34000000 },
    { month: 'M6', Cost: 24000000, Value: 68000000 },
    { month: 'M8', Cost: 24000000, Value: 96000000 },
    { month: 'M10', Cost: 24000000, Value: 118000000 },
  ],
  confidenceMeter: {
    overall: 95,
    level: 'Very High',
    reasons: [
      { text: 'High quality cloud telemetry datasets sourced directly from APM APIs.', type: 'positive' },
      { text: 'Unanimous consensus across CPO (Sarah), CTO (Marcus), and CFO (Alex).', type: 'positive' },
      { text: 'Minimal cloud migration latency risks detected under current AWS agreements.', type: 'positive' },
      { text: 'Historical similarity models show 94% accuracy on past data-tier migrations.', type: 'positive' }
    ]
  }
}

export const DEPARTMENTS: DepartmentHealth[] = [
  { id: 'dept-fin', name: 'Finance', healthScore: 92, riskLevel: 'Low', trend: 'up', decisionLoad: 4, openIssues: 1, colorCode: 'green', relevantAgents: ['alex_chen', 'arjun_mehta'] },
  { id: 'dept-prod', name: 'Product', healthScore: 88, riskLevel: 'Low', trend: 'flat', decisionLoad: 2, openIssues: 0, colorCode: 'green', relevantAgents: ['sarah_kim'] },
  { id: 'dept-eng', name: 'Engineering', healthScore: 78, riskLevel: 'Medium', trend: 'down', decisionLoad: 6, openIssues: 3, colorCode: 'yellow', relevantAgents: ['marcus_rao'] },
  { id: 'dept-sales', name: 'Sales', healthScore: 94, riskLevel: 'Low', trend: 'up', decisionLoad: 1, openIssues: 0, colorCode: 'green', relevantAgents: ['priya_nair'] },
  { id: 'dept-mktg', name: 'Marketing', healthScore: 84, riskLevel: 'Low', trend: 'up', decisionLoad: 3, openIssues: 1, colorCode: 'green', relevantAgents: ['priya_nair'] },
  { id: 'dept-ops', name: 'Operations', healthScore: 71, riskLevel: 'High', trend: 'down', decisionLoad: 5, openIssues: 4, colorCode: 'orange', relevantAgents: ['lena_schmidt'] },
  { id: 'dept-legal', name: 'Legal', healthScore: 95, riskLevel: 'Low', trend: 'flat', decisionLoad: 2, openIssues: 0, colorCode: 'green', relevantAgents: ['david_park'] },
  { id: 'dept-hr', name: 'HR', healthScore: 89, riskLevel: 'Low', trend: 'up', decisionLoad: 0, openIssues: 0, colorCode: 'green', relevantAgents: ['lena_schmidt'] },
  { id: 'dept-risk', name: 'Risk', healthScore: 82, riskLevel: 'Medium', trend: 'flat', decisionLoad: 4, openIssues: 2, colorCode: 'yellow', relevantAgents: ['david_park'] },
  { id: 'dept-comp', name: 'Compliance', healthScore: 64, riskLevel: 'Critical', trend: 'down', decisionLoad: 7, openIssues: 5, colorCode: 'red', relevantAgents: ['kavitha_iyer', 'david_park'] },
]

export const EXECUTIVE_ALERTS: ExecutiveAlert[] = [
  {
    id: 'ea-201',
    type: 'revenue',
    title: 'Q3 Enterprise revenue decline forecast (12% drop)',
    impact: 'Est. ARR variance: −₹1.44Cr. Major driver: Renewal friction with 3 key accounts.',
    urgency: 'Immediate',
    confidence: 88,
    recommendedAction: 'Formulate an early renewal discount offering plan to Zeta Inc & Beta Corp.'
  },
  {
    id: 'ea-202',
    type: 'cashflow',
    title: 'Working Capital balance warning',
    impact: 'Estimated to fall below checking target threshold (₹2.5Cr) by July 11 due to GST payouts.',
    urgency: 'High',
    confidence: 94,
    recommendedAction: 'Queue non-critical vendor disbursements to Net-60 cycle to conserve cash reserves.'
  },
  {
    id: 'ea-203',
    type: 'compliance',
    title: 'GST audit reconciliation discrepancy',
    impact: '₹18.4L in unresolved input tax credit (ITC) mismatches detected for FY 2026-27.',
    urgency: 'High',
    confidence: 91,
    recommendedAction: 'Launch internal audit review and trigger GST reconciliation sequence.'
  },
  {
    id: 'ea-204',
    type: 'churn',
    title: 'NPS decline & ticket load uptick',
    impact: 'CSAT dropped from 4.3 to 4.1. Average API timeout complaints increased by 22%.',
    urgency: 'Medium',
    confidence: 76,
    recommendedAction: 'Convene product task group to address backend infrastructure load bottlenecks.'
  }
]

export const SOURCES_OF_TRUTH: SourceOfTruth[] = [
  {
    name: 'ERP (Zoho Books Sync)',
    status: 'synced',
    lastUpdated: '12 mins ago',
    confidence: 99,
    contribution: 35,
    insights: 'Active ledger statements, outstanding receivables, and payments records.',
    dataUsed: 'GL Accounts 2810, 4821. Cash reserves ledger.',
    reasoning: 'Establishes our exact liquidity baseline to ensure funding capacity.',
    evidence: 'Bank reconciliation matching to 99.8% balance accuracy.'
  },
  {
    name: 'AWS CloudWatch Billing API',
    status: 'online',
    lastUpdated: '1 hour ago',
    confidence: 98,
    contribution: 25,
    insights: 'Active compute resource usage levels, network transfers, and instance sizing.',
    dataUsed: 'AWS Cost Explorer daily usage reports (M4, T3 instances).',
    reasoning: 'Identifies underutilized dev infrastructure suitable for consolidation.',
    evidence: '8 inactive EC2 clusters averaging less than 4.2% CPU usage.'
  },
  {
    name: 'Vendor MSA Contracts (Legal PDF)',
    status: 'synced',
    lastUpdated: 'June 28, 2026',
    confidence: 96,
    contribution: 20,
    insights: 'Contract termination guidelines, early-exit fees, and software license clauses.',
    dataUsed: 'Clause 12.4 (Early Exit Penalty), Clause 14.1 (AWS Migration terms).',
    reasoning: 'Mitigates structural compliance risks and termination penalties.',
    evidence: 'MSA allows migration exit without exit penalties given 30 days notice.'
  },
  {
    name: 'Support Ticket logs (Zendesk)',
    status: 'online',
    lastUpdated: '2 mins ago',
    confidence: 84,
    contribution: 20,
    insights: 'Historical customer downtime grievances, API gateway errors, and loading delays.',
    dataUsed: '247 tickets logged under tag "Database Timeout".',
    reasoning: 'Demonstrates the critical business necessity of migrating database instances to serverless.',
    evidence: '93% of database tickets originated during transaction peak hours (10AM - 2PM).'
  }
]

export const DECISION_REPLAY_STEPS = [
  {
    stage: 'Question Asked',
    title: 'Session Initiation',
    time: '09:00 AM',
    thoughts: 'Executive asked: "How can we optimize our Q3 cloud infrastructure operational expenses?"',
    evidence: 'Initial cost audit: AWS billing reports showing ₹24L monthly run rate.',
    kpis: { cost: '₹24L/mo', yield: '0%' }
  },
  {
    stage: 'Business Context Loaded',
    title: 'Data Collection Sync',
    time: '09:02 AM',
    thoughts: 'Loaded historical infrastructure utilization metrics, active database MSA contracts, and support logs.',
    evidence: 'AWS billing logs + Zoho AP ledger loaded. Identified 8 developer database instances sitting idle.',
    kpis: { cost: '₹24L/mo', yield: '0%' }
  },
  {
    stage: 'Relevant AI Employees Joined',
    title: 'Board Convened',
    time: '09:05 AM',
    thoughts: 'CTO Marcus Rao (technical architecture), CPO Sarah Kim (roadmap impact), and CFO Alex Chen (budget allocation) join the War Room.',
    evidence: 'Agent profiles linked to session workspace context.',
    kpis: { cost: '₹24L/mo', yield: '0%' }
  },
  {
    stage: 'Evidence Collected',
    title: 'Telemetry Scan',
    time: '09:08 AM',
    thoughts: 'Marcus Rao points out that serverless migration eliminates database scaling latency. Alex Chen verifies our current cash position supports the implementation capital cost.',
    evidence: 'AWS billing telemetry + Zoho Books cash position of ₹4.28Cr verified.',
    kpis: { cost: '₹24L/mo', yield: '0%' }
  },
  {
    stage: 'AI Debate Started',
    title: 'Internal Dialogue',
    time: '09:12 AM',
    thoughts: 'Marcus proposes a full database rebuild today. Alex objects, noting that standard migration over 3 months reduces system delivery risks.',
    evidence: 'Agent debate exchange on latency risk vs implementation schedule.',
    kpis: { cost: '₹24L/mo', yield: '0%' }
  },
  {
    stage: 'Trade-offs Discussed',
    title: 'Investment Risk Profile',
    time: '09:18 AM',
    thoughts: 'Sarah Kim reviews the roadmap: "The engineering team will focus on migration, delaying features for 2 weeks." Alex calculates direct ROI.',
    evidence: 'Engineering team allocation: 12 devs. Opportunity cost vs. new product launch analyzed.',
    kpis: { cost: '₹24L/mo', yield: 'ROI: 392%' }
  },
  {
    stage: 'Consensus Achieved',
    title: 'Synthesized Recommendation',
    time: '09:22 AM',
    thoughts: 'The board agrees: Migrate databases to AWS Aurora Serverless immediately. Complete migration in 30 days to save ₹9.8L/month.',
    evidence: 'Consensus score: 95%. Recommendation payload outputted.',
    kpis: { cost: '₹24L/mo', yield: 'ROI: 392%' }
  },
  {
    stage: 'Recommendation Generated',
    title: 'Executive Brief Ready',
    time: '09:25 AM',
    thoughts: 'McKinsey-tier executive memorandum formulated with 10 detailed compliance sections.',
    evidence: 'CFO-brief document compiled for CEO validation.',
    kpis: { cost: '₹2.4Cr Invested', yield: 'ROI: 392%' }
  }
]
