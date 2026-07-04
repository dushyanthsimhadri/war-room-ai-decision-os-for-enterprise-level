# ⚔️ WAR ROOM — AI Decision Operating System (Finance Edition)

> **"One Question. Multiple AI Minds. One Confident Decision."**

WAR ROOM is a premium, enterprise-grade AI decision-making console tailored for Finance Leaders. It demonstrates how autonomous AI employees can replace hours of finance meetings by collaborating, debating, and forecasting outcomes to generate decision intelligence in real time.

---

## 🌟 Key Features

### 1. **Executive Command Center (Finance Dashboard)**
A command dashboard showing real-time Indian SaaS metrics, cash position, payables/receivables, invoice approval queue, and month-end close progress.
* **AI Alerts System**: Flags fraud risks, input tax credit mismatches, and treasury optimization opportunities.
* **Circular Dial Business Health Score**: Dynamic visualization of overall corporate health.

### 2. **AI Finance Board (11 Specialized AI Employees)**
Each AI Employee possesses distinct domains of expertise, avatars, status indicators, and current action focus areas:
* **Arjun Mehta (CFO)** — Strategic Finance & Board Reporting
* **Priya Sharma (Controller)** — GAAP Reporting & Reconciliation
* **Vikram Nair (Treasury)** — Cash Management & Forex
* **Sneha Kulkarni (AP Manager)** — Vendor Payments & PO Matching
* **Rohan Desai (AR Manager)** — Collections & DSO Reduction
* **Kavitha Menon (Compliance)** — GST & FEMA Compliance
* **Suresh Iyer (Tax)** — Corporate Tax Planning & TDS
* **Ananya Bose (Auditor)** — Controls Testing & Fraud Audit
* **Dev Kapoor (Procurement)** — Contract Renewal & cost optimization
* **Meera Rajan (FP&A)** — Variance Analysis & Forecast Modeling
* **Rajesh Kumar (Risk)** — Concentration Risk & FX Exposure

### 3. **Executive Decision Brief ("Explain Like a CFO")**
Every key decision recommended by the AI contains an **"Explain Like a CFO"** briefing. When clicked, WAR ROOM generates a boardroom-ready memorandum structured across 10 corporate sections:
1. **Executive Summary**: One-paragraph strategic synthesis
2. **Why This Decision**: Primary factors ranked by business impact
3. **Data Used**: Granular data lineage with source attribution
4. **KPI Impact**: Detailed 18-KPI before vs. after forecast table
5. **Trade-Off Analysis**: Benefits vs. sacrifices balanced clearly
6. **Alternatives Considered**: Status of options accepted/rejected
7. **Future Forecast**: 12-month projections
8. **Business Impact Score**: Strategic risk vs. value radar mapping
9. **Next Actions**: Owner assignment and deadline timelines
10. **Boardroom Summary**: Print/PDF export utility

### 4. **Prediction Review & Auditing**
* Displays historical validation logs comparing predicted vs. actual metrics (Revenue, Cash Flow, Retention).
* Simple validation indicators: `✓ Accurate`, `⚠ Needs Review`, `✗ Incorrect`.
* **"Review Decision" Panel**: Explains model variance reasons, actual outcomes, and next-generation model improvement goals.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **Language** | TypeScript |
| **Styling** | TailwindCSS v4 + CSS Custom Variables |
| **Animations** | Framer Motion (page transitions, dials, counters) |
| **Visualizations** | Recharts (Area, Bar, Radar) |
| **State** | Zustand (global state store) |
| **Routing** | React Router v7 |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* npm

### Installation
1. Clone the workspace files.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the development server with HMR:
```bash
npm run dev
```

The application will run at **http://localhost:3000** (or next available port).

### Build for Production
To compile and check types:
```bash
npm run build
```
The output will compile cleanly into static assets in the `/dist` directory.
