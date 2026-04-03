# FinVue - Finance Dashboard UI Assignment

FinVue is a frontend-only finance dashboard built with React + Vite.
It helps users track financial activity with summary metrics, transaction exploration, role-based UI behavior, and actionable insights.

## Links

- Live Demo: `[<Finvue>](https://finvue-mu.vercel.app/)`

## Quick Screenshots

Add 3-4 screenshots before submitting:

- `Overview (Desktop)`
- `Transactions (Desktop)`
- `Mobile View`
- `Role Switch + Add/Edit/Delete`

## Requirement Mapping

1. Dashboard overview
- Summary cards: Total Balance, Monthly Income, Monthly Expenses
- Time-based chart: Balance Trend (Area Chart)
- Categorical chart: Spending Breakdown (Pie Chart)

2. Transactions section
- Fields shown: Date, Description, Category, Type, Amount
- Features: search, type/category/date filters, sorting, group by category
- Mobile-optimized transaction card view

3. Basic role-based UI
- Role toggle: `Admin` / `Viewer`
- `Viewer`: read-only access
- `Admin`: add, edit, delete transactions

4. Insights section
- Highest spending category
- Month-over-month expense comparison
- Savings rate + average expense
- Data-driven recommendation cards
- Actionable recommendation buttons that apply filters and navigate to Transactions

5. State management
- Central state via React Context
- Managed state: transactions, filters, role, theme
- Local persistence: transactions, role, theme
- Derived selectors for filtering and totals

6. UI/UX expectations
- Responsive across desktop/tablet/mobile
- Sidebar overlay + auto-close on mobile nav selection
- Empty states for no data/no results
- Toast feedback for add/edit/delete actions
- Recommendation actions provide instant context switch to filtered transaction view

## Optional Enhancements Implemented

- Dark/light theme toggle
- LocalStorage persistence
- Export transactions as JSON/CSV
- Smooth transitions and micro-interactions
- Unit test for monthly comparison helper

## Evaluation Criteria Coverage

- Design and Creativity: modern card + chart layout with clear hierarchy
- Responsiveness: dedicated mobile layout and adaptive spacing
- Functionality: complete dashboard + RBAC simulation + interactions
- User Experience: clear navigation, action feedback, stable modals
- Technical Quality: modular components, modular context/state architecture
- State Management: separated storage/selectors/actions/constants
- Documentation: setup + requirement mapping + testing instructions
- Attention to Detail: edge-case handling and verification via lint/build/test

## Tech Stack

- React 19
- Vite 8
- Recharts
- Lucide React
- Vitest
- CSS (modularized by feature/component)

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Scripts

```bash
npm run lint
npm run test
npm run build
```

## Testing

Current unit test:
- Monthly comparison helper
- Files:
  - `src/utils/insights.js`
  - `src/utils/insights.test.js`

## Project Structure

```text
src/
  components/
    DashboardLayout.jsx
    Sidebar.jsx
    SummaryCards.jsx
    Charts.jsx
    Insights.jsx
    TransactionTable.jsx              # re-export
    transactions/
      TransactionTable.jsx            # feature container
      TransactionFilters.jsx
      TransactionDesktopTable.jsx
      TransactionMobileCards.jsx
      TransactionModal.jsx
      StyledSelect.jsx
      ToastViewport.jsx
      EmptyState.jsx
      transaction-utils.js
      transactions.css
  context/
    FinanceContext.jsx
    finance-context.js
    finance-constants.js
    finance-storage.js
    finance-selectors.js
    finance-actions.js
  utils/
    insights.js
    insights.test.js
  data/
    mockData.js
```

## Assumptions / Limitations

- Frontend-only assignment (no backend/API integration).
- RBAC is simulated on UI state only.
- Currency is displayed in USD for consistency.
