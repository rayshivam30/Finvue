import React from 'react';
import { useFinance } from '../context/finance-context';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import './summary-cards.css';

export const SummaryCards = () => {
  const { totals } = useFinance();

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);

  const cards = [
    {
      label: 'Total Balance',
      value: totals.balance,
      icon: Wallet,
      color: 'var(--primary)',
      trend: '+12.5%',
      isPositive: true
    },
    {
      label: 'Monthly Income',
      value: totals.income,
      icon: TrendingUp,
      color: 'var(--success)',
      trend: '+3.2%',
      isPositive: true
    },
    {
      label: 'Monthly Expenses',
      value: totals.expenses,
      icon: TrendingDown,
      color: 'var(--danger)',
      trend: '-5.1%',
      isPositive: false
    }
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <div key={card.label} className="card glass animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="card-top">
            <div className="icon-wrapper" style={{ background: `${card.color}15`, color: card.color }}>
              <card.icon size={22} />
            </div>
            <div className={`trend-badge ${card.isPositive ? 'positive' : 'negative'}`}>{card.trend}</div>
          </div>

          <div className="card-body">
            <span className="card-label">{card.label}</span>
            <h3 className="card-value">{formatCurrency(card.value)}</h3>
          </div>

          <div className="card-footer">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '70%', background: card.color }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
