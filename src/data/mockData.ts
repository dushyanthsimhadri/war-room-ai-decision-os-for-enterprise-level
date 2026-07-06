// WAR ROOM — Realistic SaaS Mock Data
// All metrics, agents, decisions, and scenarios are generated here

export const COMPANY = {
  name: 'NexaFlow',
  industry: 'B2B SaaS',
  stage: 'Series B',
  founded: '2021',
  employees: 148,
  customers: 2847,
  mrr: 2340000,
  arr: 28080000,
}

export const DEMO_VIDEO_CONFIG = {
  url: '', // Empty to show 'coming soon' placeholder as default, or configure YouTube embed url
  title: 'WAR ROOM — 2 Minute Product Walkthrough',
  description: 'See how autonomous AI executives collaborate to make business decisions.'
}

// ============================================================
// KPI Data
// ============================================================
export const kpiData = {
  revenue: {
    current: 28080000,
    previous: 25200000,
    change: 11.4,
    label: 'ARR',
    format: 'currency',
  },
  mrr: {
    current: 2340000,
    previous: 2100000,
    change: 11.4,
    label: 'MRR',
    format: 'currency',
  },
  cashFlow: {
    current: 4200000,
    previous: 3800000,
    change: 10.5,
    label: 'Cash Flow',
    format: 'currency',
  },
  burnRate: {
    current: 1850000,
    previous: 1920000,
    change: -3.6,
    label: 'Burn Rate',
    format: 'currency',
    inverseGood: true,
  },
  nps: {
    current: 62,
    previous: 57,
    change: 8.8,
    label: 'NPS',
    format: 'number',
  },
  churn: {
    current: 2.4,
    previous: 3.1,
    change: -22.6,
    label: 'Churn Rate',
    format: 'percent',
    inverseGood: true,
  },
  retention: {
    current: 94.2,
    previous: 92.8,
    change: 1.5,
    label: 'Retention',
    format: 'percent',
  },
  activation: {
    current: 68.5,
    previous: 61.2,
    change: 11.9,
    label: 'Activation',
    format: 'percent',
  },
  cac: {
    current: 4200,
    previous: 4800,
    change: -12.5,
    label: 'CAC',
    format: 'currency',
    inverseGood: true,
  },
  ltv: {
    current: 48000,
    previous: 42000,
    change: 14.3,
    label: 'LTV',
    format: 'currency',
  },
  supportTickets: {
    current: 342,
    previous: 418,
    change: -18.2,
    label: 'Support Tickets',
    format: 'number',
    inverseGood: true,
  },
  engVelocity: {
    current: 87,
    previous: 74,
    change: 17.6,
    label: 'Eng Velocity',
    format: 'number',
  },
}

// ============================================================
// Revenue trend (last 12 months)
// ============================================================
export const revenueTrend = [
  { month: 'Jul', mrr: 1480000, arr: 17760000 },
  { month: 'Aug', mrr: 1620000, arr: 19440000 },
  { month: 'Sep', mrr: 1780000, arr: 21360000 },
  { month: 'Oct', mrr: 1890000, arr: 22680000 },
  { month: 'Nov', mrr: 1980000, arr: 23760000 },
  { month: 'Dec', mrr: 2050000, arr: 24600000 },
  { month: 'Jan', mrr: 2120000, arr: 25440000 },
  { month: 'Feb', mrr: 2100000, arr: 25200000 },
  { month: 'Mar', mrr: 2180000, arr: 26160000 },
  { month: 'Apr', mrr: 2240000, arr: 26880000 },
  { month: 'May', mrr: 2290000, arr: 27480000 },
  { month: 'Jun', mrr: 2340000, arr: 28080000 },
]

// ============================================================
// AI Employees
// ============================================================
export const AI_EMPLOYEES = [
  {
    id: 'cfo',
    name: 'Alex Chen',
    role: 'CFO',
    title: 'Chief Financial Officer',
    avatar: '🧑‍💼',
    color: '#6366f1',
    expertise: ['Finance', 'Cash Flow', 'Budget', 'Revenue', 'Tax', 'Compliance'],
    traits: ['Data-driven', 'Risk-averse', 'Precise'],
    bio: '12 years of CFO experience at high-growth SaaS companies. Ex-Goldman Sachs.',
  },
  {
    id: 'cpo',
    name: 'Sarah Kim',
    role: 'CPO',
    title: 'Chief Product Officer',
    avatar: '👩‍💼',
    color: '#06b6d4',
    expertise: ['Product', 'Roadmap', 'Features', 'User Research', 'UX'],
    traits: ['User-centric', 'Strategic', 'Creative'],
    bio: 'Built and shipped 40+ product features at Stripe, Notion. Expert in PLG growth.',
  },
  {
    id: 'cto',
    name: 'Marcus Rao',
    role: 'CTO',
    title: 'Chief Technology Officer',
    avatar: '👨‍💻',
    color: '#10b981',
    expertise: ['Engineering', 'Architecture', 'Tech Debt', 'Infrastructure', 'Security'],
    traits: ['Technical', 'Long-term thinker', 'Systems-oriented'],
    bio: 'Principal Engineer at AWS. Built distributed systems handling 10M+ req/s.',
  },
  {
    id: 'cmo',
    name: 'Priya Nair',
    role: 'CMO',
    title: 'Chief Marketing Officer',
    avatar: '👩‍🎨',
    color: '#f59e0b',
    expertise: ['Marketing', 'Brand', 'Growth', 'Demand Gen', 'Content'],
    traits: ['Creative', 'Data-driven', 'Ambitious'],
    bio: '0-to-1 marketer who scaled 3 B2B SaaS companies to $50M+ ARR.',
  },
  {
    id: 'clo',
    name: 'David Park',
    role: 'CLO',
    title: 'Chief Legal Officer',
    avatar: '👨‍⚖️',
    color: '#8b5cf6',
    expertise: ['Legal', 'Compliance', 'Contracts', 'IP', 'Risk'],
    traits: ['Cautious', 'Detail-oriented', 'Protective'],
    bio: 'Former Big Law partner. Expert in SaaS contracts, GDPR, and M&A.',
  },
  {
    id: 'cs',
    name: 'Aisha Obi',
    role: 'Head of CS',
    title: 'Head of Customer Success',
    avatar: '👩‍💻',
    color: '#ec4899',
    expertise: ['Customer Success', 'NPS', 'Churn', 'Onboarding', 'Retention'],
    traits: ['Empathetic', 'Proactive', 'Customer-obsessed'],
    bio: 'Built CS teams at Intercom and HubSpot. Reduced churn by 60% in 12 months.',
  },
  {
    id: 'data',
    name: 'Ethan Wu',
    role: 'Head of Data',
    title: 'Head of Data & Analytics',
    avatar: '👨‍🔬',
    color: '#06b6d4',
    expertise: ['Analytics', 'Forecasting', 'KPIs', 'ML', 'A/B Testing'],
    traits: ['Analytical', 'Evidence-based', 'Skeptical'],
    bio: 'Data scientist who built ML-powered analytics at Airbnb and Meta.',
  },
  {
    id: 'coo',
    name: 'Lena Schmidt',
    role: 'COO',
    title: 'Chief Operating Officer',
    avatar: '👩‍🏭',
    color: '#f97316',
    expertise: ['Operations', 'Supply Chain', 'Process', 'Efficiency', 'Hiring'],
    traits: ['Execution-focused', 'Systematic', 'Direct'],
    bio: 'Scaled operations at Shopify from Series A to IPO. Expert in OKRs.',
  },
  {
    id: 'moderator',
    name: 'Victor Reyes',
    role: 'Moderator',
    title: 'AI Board Moderator',
    avatar: '🤵',
    color: '#94a3b8',
    expertise: ['Synthesis', 'Facilitation', 'Decision Making'],
    traits: ['Neutral', 'Synthesizing', 'Decisive'],
    bio: 'AI system trained on 10,000+ board decisions. Moderates all War Room sessions.',
  },
]

// ============================================================
// AI Recommendation (Dashboard)
// ============================================================
export const aiRecommendation = {
  id: 'rec-001',
  severity: 'warning',
  title: 'Revenue at risk of 8% decline next quarter',
  description: 'Enterprise onboarding friction is causing 34% of trial conversions to drop off at day 3. If unaddressed, this will cost an estimated $2.1M in ARR.',
  confidence: 87,
  impact: 'high',
  category: 'Revenue',
  agents: ['cfo', 'cpo', 'cs'],
  createdAt: new Date().toISOString(),
}

// ============================================================
// Smart Agent Router — Question → Agents mapping
// ============================================================
export const AGENT_ROUTING = {
  finance: {
    triggers: ['hire', 'budget', 'cost', 'pay', 'invoice', 'vendor', 'cash', 'revenue', 'pricing', 'price', 'subscription', 'raise', 'invest', 'acquire', 'acquisition', 'buy'],
    agents: ['cfo', 'coo', 'clo', 'data', 'moderator'],
  },
  product: {
    triggers: ['feature', 'launch', 'build', 'ship', 'product', 'roadmap', 'release', 'redesign', 'api', 'integration'],
    agents: ['cpo', 'cto', 'cmo', 'cs', 'data', 'moderator'],
  },
  growth: {
    triggers: ['expand', 'market', 'market entry', 'marketing', 'brand', 'campaign', 'ads', 'growth', 'users', 'customers', 'churn', 'retention'],
    agents: ['cmo', 'cfo', 'cs', 'data', 'coo', 'moderator'],
  },
  hr: {
    triggers: ['hire', 'engineer', 'team', 'headcount', 'lay off', 'fire', 'salaries', 'employees', 'culture', 'hr'],
    agents: ['coo', 'cfo', 'cto', 'clo', 'moderator'],
  },
  legal: {
    triggers: ['contract', 'legal', 'compliance', 'gdpr', 'lawsuit', 'ip', 'trademark', 'regulation'],
    agents: ['clo', 'cfo', 'coo', 'moderator'],
  },
  strategy: {
    triggers: ['strategy', 'direction', 'pivot', 'vision', 'mission', 'competition', 'competitor', 'partner'],
    agents: ['cfo', 'cpo', 'cmo', 'cto', 'coo', 'moderator'],
  },
}

// ============================================================
// Sample War Room Session — "Should we launch Feature X?"
// ============================================================
export const sampleDebateMessages = [
  {
    agentId: 'cpo',
    timestamp: Date.now() - 180000,
    content: "Feature X addresses our #1 user pain point. We have 847 open requests and a 34 NPS detractor cluster citing this exact issue. I recommend we fast-track this to Q3.",
    confidence: 88,
    type: 'statement',
    references: [],
  },
  {
    agentId: 'cto',
    timestamp: Date.now() - 150000,
    content: "Agreed on the demand signal, but we have a 6-week engineering estimate with high technical risk. We're carrying 40% tech debt in that module — we'd need to refactor first, pushing launch to Q4.",
    confidence: 82,
    type: 'challenge',
    references: ['cpo'],
  },
  {
    agentId: 'cmo',
    timestamp: Date.now() - 120000,
    content: "Competitor Prism launched a similar feature last month and already captured 3 key accounts we were targeting. Every week we delay is revenue lost. I vote for Q3 with an MVP scope.",
    confidence: 91,
    type: 'statement',
    references: ['cto'],
  },
  {
    agentId: 'cfo',
    timestamp: Date.now() - 90000,
    content: "Running the numbers: Q3 launch = $1.8M incremental ARR risk if it fails. Q4 launch = $820K revenue delay but 70% lower rework cost. I prefer Q4 with the refactor.",
    confidence: 79,
    type: 'challenge',
    references: ['cmo', 'cto'],
  },
  {
    agentId: 'cs',
    timestamp: Date.now() - 60000,
    content: "I've spoken with our top 20 enterprise accounts. Feature X is a genuine blocker for 6 renewal conversations worth $1.2M ARR. This isn't optional — we need it by October at latest.",
    confidence: 94,
    type: 'evidence',
    references: ['cfo'],
  },
  {
    agentId: 'data',
    timestamp: Date.now() - 30000,
    content: "Modeling 3 scenarios: (A) Q3 MVP launch — 67% probability of success, $1.4M upside. (B) Q4 full launch — 84% success probability, $2.1M upside. (C) No launch — 41% churn increase in affected segment.",
    confidence: 86,
    type: 'analysis',
    references: ['cfo', 'cs', 'cto'],
  },
  {
    agentId: 'moderator',
    timestamp: Date.now() - 5000,
    content: "The board has reached consensus. Evidence strongly favors a Q4 full launch with immediate refactor beginning July 15. Risk is acceptable given the $2.1M ARR opportunity and renewal pressure.",
    confidence: 89,
    type: 'summary',
    references: ['cpo', 'cto', 'cmo', 'cfo', 'cs', 'data'],
  },
]

// ============================================================
// Decision History
// ============================================================
export const decisionHistory = [
  {
    id: 'd-001',
    question: 'Should we launch Feature X (Advanced Analytics Dashboard)?',
    date: '2026-06-28',
    agents: ['cpo', 'cto', 'cmo', 'cfo', 'cs', 'data', 'moderator'],
    recommendation: 'Launch in Q4 with refactor',
    confidence: 89,
    status: 'approved',
    kpiImpact: { mrr: +8.2, retention: +3.1, nps: +12, churn: -18 },
    outcome: 'pending',
  },
  {
    id: 'd-002',
    question: 'Should we expand into the UAE market?',
    date: '2026-06-15',
    agents: ['cmo', 'cfo', 'coo', 'clo', 'moderator'],
    recommendation: 'Wait 6 months — prioritize EU expansion first',
    confidence: 76,
    status: 'approved',
    kpiImpact: { mrr: +22, cashFlow: -15, burnRate: +18 },
    outcome: 'in_progress',
  },
  {
    id: 'd-003',
    question: 'Should we reduce pricing by 20%?',
    date: '2026-06-02',
    agents: ['cfo', 'cmo', 'cpo', 'cs', 'data', 'moderator'],
    recommendation: 'Rejected — price elasticity analysis shows 14% revenue decline',
    confidence: 91,
    status: 'rejected',
    kpiImpact: { mrr: -14, customers: +28, retention: +4 },
    outcome: 'correct',
    actualImpact: { mrr: -11, customers: +24, retention: +3 },
  },
  {
    id: 'd-004',
    question: 'Should we hire 20 engineers in Q3?',
    date: '2026-05-20',
    agents: ['coo', 'cfo', 'cto', 'clo', 'moderator'],
    recommendation: 'Hire 8 engineers, expand after revenue milestone',
    confidence: 84,
    status: 'approved',
    kpiImpact: { burnRate: +12, engVelocity: +35, cac: -8 },
    outcome: 'success',
    actualImpact: { burnRate: +14, engVelocity: +31, cac: -6 },
  },
]

// ============================================================
// Forecast Data
// ============================================================
export const forecastData = {
  '7d': {
    growth: 2.1,
    revenue: 2387400,
    customers: 2901,
    confidence: 94,
    risk: 'low',
    trend: [2340, 2352, 2361, 2368, 2375, 2381, 2387].map((v) => ({ value: v * 1000 })),
  },
  '30d': {
    growth: 8.4,
    revenue: 2536560,
    customers: 2984,
    confidence: 87,
    risk: 'low',
    trend: [2340, 2375, 2410, 2445, 2470, 2502, 2520, 2536].map((v, i) => ({ day: i * 4, value: v * 1000 })),
  },
  '90d': {
    growth: 18.2,
    revenue: 2765880,
    customers: 3246,
    confidence: 79,
    risk: 'medium',
    trend: [2340, 2410, 2490, 2560, 2630, 2690, 2740, 2765].map((v, i) => ({ week: i * 2, value: v * 1000 })),
  },
  '6m': {
    growth: 34.6,
    revenue: 3149640,
    customers: 3824,
    confidence: 68,
    risk: 'medium',
    trend: [2340, 2480, 2640, 2790, 2940, 3060, 3149].map((v, i) => ({ month: i, value: v * 1000 })),
  },
  '1y': {
    growth: 71.8,
    revenue: 4019040,
    customers: 4891,
    confidence: 54,
    risk: 'high',
    trend: [2340, 2520, 2740, 2980, 3180, 3420, 3620, 3780, 3880, 3940, 3990, 4019].map((v, i) => ({ month: i + 1, value: v * 1000 })),
  },
}

// ============================================================
// Scenarios
// ============================================================
export const scenarios = [
  {
    id: 'a',
    label: 'Scenario A',
    title: 'Build & Launch Feature X (Q4)',
    color: '#6366f1',
    metrics: {
      revenue: '+18.4%',
      retention: '+5.2%',
      roi: '340%',
      risk: 'Medium',
      engCost: '$480K',
      csat: '+14 pts',
    },
    description: 'Full build with refactor. Highest upside, 12-week timeline.',
    probability: 72,
    recommended: true,
  },
  {
    id: 'b',
    label: 'Scenario B',
    title: 'Delay to Q1 Next Year',
    color: '#f59e0b',
    metrics: {
      revenue: '+4.1%',
      retention: '-2.8%',
      roi: '120%',
      risk: 'High',
      engCost: '$120K',
      csat: '-8 pts',
    },
    description: 'Delay while fixing tech debt. Risk of churn from key accounts.',
    probability: 18,
    recommended: false,
  },
  {
    id: 'c',
    label: 'Scenario C',
    title: 'Reject — Prioritize Other Features',
    color: '#ef4444',
    metrics: {
      revenue: '-8.2%',
      retention: '-11.4%',
      roi: '-40%',
      risk: 'Critical',
      engCost: '$0',
      csat: '-22 pts',
    },
    description: 'Reject entirely. Highest risk of enterprise churn and competitor loss.',
    probability: 10,
    recommended: false,
  },
]

// ============================================================
// Roadmap Data
// ============================================================
export const roadmapData = {
  now: [
    { id: 'r1', title: 'Advanced Analytics Dashboard', priority: 'critical', effort: 'XL', owner: 'cpo', impact: 'Revenue' },
    { id: 'r2', title: 'Enterprise SSO (SAML)', priority: 'high', effort: 'M', owner: 'cto', impact: 'Sales' },
    { id: 'r3', title: 'Bulk Import API', priority: 'high', effort: 'L', owner: 'cto', impact: 'Activation' },
  ],
  next: [
    { id: 'r4', title: 'Mobile App (iOS + Android)', priority: 'medium', effort: 'XL', owner: 'cpo', impact: 'Activation' },
    { id: 'r5', title: 'Zapier Integration', priority: 'medium', effort: 'S', owner: 'cto', impact: 'Retention' },
    { id: 'r6', title: 'AI-powered Insights', priority: 'high', effort: 'L', owner: 'cpo', impact: 'NPS' },
    { id: 'r7', title: 'Custom Reporting', priority: 'medium', effort: 'M', owner: 'cpo', impact: 'Revenue' },
  ],
  later: [
    { id: 'r8', title: 'White-label Solution', priority: 'low', effort: 'XL', owner: 'cpo', impact: 'Revenue' },
    { id: 'r9', title: 'Marketplace / App Store', priority: 'low', effort: 'XL', owner: 'cto', impact: 'Ecosystem' },
    { id: 'r10', title: 'Multi-region Deployment', priority: 'medium', effort: 'L', owner: 'cto', impact: 'Compliance' },
  ],
  icebox: [
    { id: 'r11', title: 'Desktop App (Electron)', priority: 'low', effort: 'XL', owner: 'cto', impact: 'UX' },
    { id: 'r12', title: 'Blockchain Audit Trail', priority: 'low', effort: 'XL', owner: 'clo', impact: 'Compliance' },
  ],
}

// ============================================================
// Experiments
// ============================================================
export const experiments = [
  {
    id: 'e1',
    hypothesis: 'Showing a progress bar during onboarding will increase activation rate by 15%',
    metric: 'Activation Rate',
    baseline: '68.5%',
    target: '78.8%',
    expectedLift: '+15%',
    status: 'running',
    confidence: 76,
    successCondition: 'Activation > 75% after 14 days',
    failureCondition: 'Activation < 70% or statistical significance < 90%',
    startDate: '2026-06-20',
    endDate: '2026-07-04',
  },
  {
    id: 'e2',
    hypothesis: 'Sending a personalized email at day 3 will reduce early churn by 20%',
    metric: 'Day-7 Retention',
    baseline: '62%',
    target: '74%',
    expectedLift: '+19%',
    status: 'complete',
    confidence: 94,
    result: 'success',
    actualLift: '+22%',
  },
]

// ============================================================
// Competitor Analysis (Sample)
// ============================================================
export const competitorData = {
  company: 'Prism Analytics',
  website: 'prism.io',
  pricing: '$299-$999/mo',
  strengths: ['Strong brand recognition', 'Extensive integrations (200+)', 'Enterprise sales team', 'SOC2 certified'],
  weaknesses: ['Complex onboarding (avg 45 days)', 'No mobile app', 'Slow product velocity', 'Poor customer support (NPS: 28)'],
  features: ['Dashboard builder', 'Custom reports', 'Team collaboration', 'API access', 'White-label'],
  missing: ['AI-powered insights', 'Real-time alerts', 'Predictive analytics', 'Voice interface'],
  recommendations: [
    'Double down on AI features — their roadmap shows no AI investment',
    'Target their churning customers with onboarding speed as differentiator',
    'Win on support quality — their NPS is 28 vs our 62',
  ],
}

// ============================================================
// Executive Timeline
// ============================================================
export const executiveTimeline = [
  { id: 't1', date: '2026-06-28', type: 'decision', title: 'Feature X Launch Strategy', impact: '+$2.1M ARR potential', status: 'approved', accuracy: null },
  { id: 't2', date: '2026-06-15', type: 'decision', title: 'UAE Market Expansion', impact: 'In progress', status: 'in_progress', accuracy: null },
  { id: 't3', date: '2026-06-02', type: 'decision', title: 'Pricing Strategy Review', impact: 'Rejected — saved $2.8M', status: 'success', accuracy: 96 },
  { id: 't4', date: '2026-05-20', type: 'decision', title: 'Engineering Headcount', impact: '+31% velocity achieved', status: 'success', accuracy: 89 },
  { id: 't5', date: '2026-05-05', type: 'kpi', title: 'NPS hit 62 (+12 from Jan)', impact: 'Exceeded forecast by 8pts', status: 'success', accuracy: 91 },
  { id: 't6', date: '2026-04-18', type: 'decision', title: 'Enterprise Sales Playbook', impact: '+18% win rate', status: 'success', accuracy: 84 },
]

// ============================================================
// Suggested Questions (Smart Question Box)
// ============================================================
export const suggestedQuestions = [
  'Should we launch Feature X this quarter?',
  'Should we expand into the UAE market?',
  'Should we hire 20 more engineers?',
  'Should we reduce our pricing by 20%?',
  'Should we acquire Company X for $8M?',
  'Should we raise a Series C round now?',
  'Should we pay Vendor ABC\'s $240K invoice early?',
  'Should we launch a mobile app in Q3?',
  'Should we sunset our legacy API v1?',
  'Should we pivot to product-led growth?',
]
