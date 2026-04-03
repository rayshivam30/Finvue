import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { DashboardLayout } from './components/DashboardLayout';
import './index.css';

function App() {
  return (
    <FinanceProvider>
      <DashboardLayout />
    </FinanceProvider>
  );
}

export default App;
