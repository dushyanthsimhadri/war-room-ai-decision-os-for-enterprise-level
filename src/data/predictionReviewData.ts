// Prediction Review Data Model

export interface DecisionPrediction {
  id: string
  question: string
  recommendation: string
  forecastDate: string
  status: 'Approved' | 'Rejected' | 'In Progress'
  overallAccuracy: number
  metrics: {
    kpi: string
    predicted: string
    actual: string
    difference: string
    status: 'Accurate' | 'Needs Review' | 'Incorrect'
    accuracy: number
    chartData: { name: string; Predicted: number; Actual: number }[]
  }[]
  aiExplanation: {
    whatPredicted: string
    whatHappened: string
    whyDifference: string
    whatToImprove: string
  }
}

export const PREDICTION_ACCURACY_SUMMARY = {
  overall: 91,
  categories: [
    { name: 'Revenue Accuracy', value: 92, status: 'Accurate', color: '#10b981' },
    { name: 'Cash Flow Accuracy', value: 89, status: 'Accurate', color: '#10b981' },
    { name: 'Retention Accuracy', value: 95, status: 'Accurate', color: '#10b981' },
    { name: 'DSO/DPO Accuracy', value: 88, status: 'Accurate', color: '#10b981' },
  ]
}

export const predictionHistory: DecisionPrediction[] = [
  {
    id: 'pr-001',
    question: 'Should we pay all recommended vendor invoices early (Infosys Ltd, ₹4.2Cr)?',
    recommendation: 'Pay early to capture 2% discount (₹84K savings) using cash surplus.',
    forecastDate: 'June 15, 2026',
    status: 'Approved',
    overallAccuracy: 99,
    metrics: [
      {
        kpi: 'Net Profit Impact',
        predicted: '₹84,000',
        actual: '₹84,000',
        difference: '₹0 (0% variance)',
        status: 'Accurate',
        accuracy: 100,
        chartData: [
          { name: 'Expected Savings', Predicted: 84000, Actual: 84000 }
        ]
      },
      {
        kpi: 'Cash Balance post-payment',
        predicted: '₹3,44,00,000',
        actual: '₹3,44,00,000',
        difference: '₹0 (0% variance)',
        status: 'Accurate',
        accuracy: 100,
        chartData: [
          { name: 'Cash Balance', Predicted: 34400000, Actual: 34400000 }
        ]
      },
      {
        kpi: 'DPO (Days Payable)',
        predicted: '36 days',
        actual: '36 days',
        difference: '0 days',
        status: 'Accurate',
        accuracy: 100,
        chartData: [
          { name: 'DPO', Predicted: 36, Actual: 36 }
        ]
      }
    ],
    aiExplanation: {
      whatPredicted: 'Capturing ₹84K in discount savings with a cash reduction to exactly ₹3.44Cr, moving DPO down by 2 days.',
      whatHappened: 'The payment was processed on the due date. The 2% discount credit note was verified and applied successfully in Zoho Books.',
      whyDifference: 'No variance. Vendor payment systems and HDFC API cleared the funds with zero latency.',
      whatToImprove: 'Automate discount captures for trusted Tier-1 partners whenever the checking account holds >2x the target cash reserve.'
    }
  },
  {
    id: 'pr-002',
    question: 'Should we delay Razorpay invoice payment by 14 days?',
    recommendation: 'Delay Razorpay invoice to preserve short-term working capital.',
    forecastDate: 'June 10, 2026',
    status: 'Approved',
    overallAccuracy: 71,
    metrics: [
      {
        kpi: 'Cash Flow preserved',
        predicted: '₹18,00,000',
        actual: '₹15,50,000',
        difference: '-₹2,50,000 (−13.8%)',
        status: 'Needs Review',
        accuracy: 86,
        chartData: [
          { name: 'Preserved Cash', Predicted: 1800000, Actual: 1550000 }
        ]
      },
      {
        kpi: 'Vendor Relationship Score',
        predicted: '4.6 / 5',
        actual: '4.3 / 5',
        difference: '-0.3 pts (−6.5%)',
        status: 'Incorrect',
        accuracy: 40,
        chartData: [
          { name: 'Score', Predicted: 4.6, Actual: 4.3 }
        ]
      },
      {
        kpi: 'DPO (Days Payable)',
        predicted: '42 days',
        actual: '42 days',
        difference: '0 days',
        status: 'Accurate',
        accuracy: 100,
        chartData: [
          { name: 'DPO', Predicted: 42, Actual: 42 }
        ]
      }
    ],
    aiExplanation: {
      whatPredicted: 'Retaining ₹18L liquidity to safeguard runway, accepting a minor 0.2 dip in our vendor satisfaction rating.',
      whatHappened: 'On day 10 of delay, Razorpay triggered an automated compliance flag on our transaction gateway, temporarily limiting daily payout limits for 48 hours. This created ₹2.5L in operational friction.',
      whyDifference: 'The AI model was unaware of Razorpay’s systemic API threshold limits for late payouts on accounts with active merchant balances. The relationship rating dropped more sharply due to direct support tickets.',
      whatToImprove: 'Never delay payments to primary infrastructure or payment gateway providers whose services integrate directly with critical sales pipelines.'
    }
  },
  {
    id: 'pr-003',
    question: 'Should we run Zeta Inc early collection incentive program?',
    recommendation: 'Offer Zeta Inc a 1% discount if they settle their invoice 20 days early.',
    forecastDate: 'June 01, 2026',
    status: 'Approved',
    overallAccuracy: 93,
    metrics: [
      {
        kpi: 'Cash Flow collected',
        predicted: '₹79,20,000',
        actual: '₹91,08,000',
        difference: '+₹11,88,000 (+15.0%)',
        status: 'Needs Review',
        accuracy: 85,
        chartData: [
          { name: 'Collected Cash', Predicted: 7920000, Actual: 9108000 }
        ]
      },
      {
        kpi: 'DSO (Days Outstanding)',
        predicted: '37 days',
        actual: '35 days',
        difference: '-2 days',
        status: 'Accurate',
        accuracy: 95,
        chartData: [
          { name: 'DSO', Predicted: 37, Actual: 35 }
        ]
      },
      {
        kpi: 'Net Profit impact',
        predicted: '-₹80,000',
        actual: '-₹92,000',
        difference: '-₹12,000 (discount cost)',
        status: 'Accurate',
        accuracy: 98,
        chartData: [
          { name: 'Discount Cost', Predicted: -80000, Actual: -92000 }
        ]
      }
    ],
    aiExplanation: {
      whatPredicted: 'Securing ₹80L outstanding balance early, forfeiting ₹80K (1% discount) to accelerate DSO by 5 days.',
      whatHappened: 'Zeta Inc eagerly accepted the early payment discount and paid their current invoice along with an additional outstanding balance. Total collected cash reached ₹92L.',
      whyDifference: 'Zeta Inc’s accounts team was looking to optimize their quarterly operational expenses and deployed excess cash. This positive behavior caused them to settle wider balances early.',
      whatToImprove: 'Incentive models should analyze client-side quarterly reporting schedules to target incentives right when clients seek expense allocation.'
    }
  },
  {
    id: 'pr-004',
    question: 'Should we place ₹1.00 Crore cash surplus in Liquid Treasury Fund?',
    recommendation: 'Allocate ₹1.00 Crore checking account surplus into HDFC Debt Liquid Fund.',
    forecastDate: 'May 20, 2026',
    status: 'Approved',
    overallAccuracy: 96,
    metrics: [
      {
        kpi: 'EBITDA (Interest Income)',
        predicted: '₹45,000',
        actual: '₹42,500',
        difference: '-₹2,500 (−5.5%)',
        status: 'Accurate',
        accuracy: 94,
        chartData: [
          { name: 'Interest Yield', Predicted: 45000, Actual: 42500 }
        ]
      },
      {
        kpi: 'Liquidity Score',
        predicted: '75 / 100',
        actual: '75 / 100',
        difference: '0 pts',
        status: 'Accurate',
        accuracy: 100,
        chartData: [
          { name: 'Liquidity Score', Predicted: 75, Actual: 75 }
        ]
      }
    ],
    aiExplanation: {
      whatPredicted: 'Capturing ₹45K monthly yield at 7.2% annualized rate with a minor decline in direct checking account liquidity score.',
      whatHappened: 'The capital remained in the fund for exactly 30 days. The realized interest yield was ₹42,500 due to a mid-month yield change.',
      whyDifference: 'A slight drop in the underlying treasury yields occurred as macro inflation indicators improved, reducing the annualized return rate to 6.8%.',
      whatToImprove: 'Include real-time debt market API rates in forecast models instead of utilizing static 3-month trailing yield averages.'
    }
  }
]
