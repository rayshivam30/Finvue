import React, { useEffect, useMemo, useState } from 'react';
import { useFinance } from '../context/finance-context';
import { CATEGORIES } from '../data/mockData';
import { TrendingUp, TrendingDown, Zap, ArrowRight, Sparkles, Lightbulb } from 'lucide-react';
import { getMonthlyExpenseComparison } from '../utils/insights';
import './insights.css';

export const Insights = ({ onNavigateTab }) => {
  const { transactions, totals, setFilters } = useFinance();
  const [insightNotice, setInsightNotice] = useState('');

  const insights = useMemo(() => {
    const expenses = transactions.filter((transaction) => transaction.type === 'expense');

    const expenseCategories = expenses.reduce((acc, transaction) => {
      const currentAmount = acc[transaction.category] ?? 0;
      return { ...acc, [transaction.category]: currentAmount + transaction.amount };
    }, {});

    const sortedCategories = Object.entries(expenseCategories).sort((a, b) => b[1] - a[1]);
    const highestCategory = sortedCategories[0];

    const { currentMonthExpense, previousMonthExpense, monthlyDeltaAmount, monthlyDeltaPercent } =
      getMonthlyExpenseComparison(expenses);

    const expenseCount = expenses.length;
    const savingsRate = totals.income > 0 ? ((totals.income - totals.expenses) / totals.income) * 100 : 0;
    const averageExpense = expenseCount > 0 ? totals.expenses / expenseCount : 0;

    return {
      highestCategory: highestCategory
        ? {
            key: highestCategory[0],
            name: CATEGORIES[highestCategory[0]]?.name ?? highestCategory[0],
            amount: highestCategory[1],
            color: CATEGORIES[highestCategory[0]]?.color ?? 'var(--primary)'
          }
        : null,
      savingsRate,
      averageExpense,
      monthlyDeltaAmount,
      monthlyDeltaPercent,
      currentMonthExpense,
      previousMonthExpense
    };
  }, [transactions, totals]);

  const cards = [
    {
      title: 'Highest Spending',
      value: insights.highestCategory ? insights.highestCategory.name : 'No data',
      detail: insights.highestCategory
        ? `$${insights.highestCategory.amount.toFixed(2)} in total spend`
        : 'Add expense transactions to unlock this insight.',
      icon: TrendingUp,
      color: insights.highestCategory ? insights.highestCategory.color : 'var(--primary)',
      bg: insights.highestCategory ? `${insights.highestCategory.color}1A` : 'rgba(99, 102, 241, 0.12)'
    },
    {
      title: 'Monthly Comparison',
      value: `${insights.monthlyDeltaAmount >= 0 ? '+' : '-'}$${Math.abs(insights.monthlyDeltaAmount).toFixed(2)}`,
      detail:
        insights.previousMonthExpense > 0
          ? `${insights.monthlyDeltaPercent}% vs last month`
          : 'No previous-month data to compare yet.',
      icon: insights.monthlyDeltaAmount > 0 ? TrendingUp : TrendingDown,
      color: insights.monthlyDeltaAmount > 0 ? 'var(--danger)' : 'var(--success)',
      bg: insights.monthlyDeltaAmount > 0 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(34, 197, 94, 0.12)'
    },
    {
      title: 'Savings Rate',
      value: `${insights.savingsRate.toFixed(1)}%`,
      detail: insights.savingsRate >= 20 ? 'Strong savings habit this period.' : 'Consider reducing non-essential spend.',
      icon: Sparkles,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)'
    },
    {
      title: 'Avg. Expense',
      value: `$${insights.averageExpense.toFixed(2)}`,
      detail: 'Average value of each expense transaction.',
      icon: Zap,
      color: '#0ea5e9',
      bg: 'rgba(14, 165, 233, 0.1)'
    }
  ];

  const recommendations = [
    {
      title: 'Top category focus',
      description: insights.highestCategory
        ? `${insights.highestCategory.name} is your largest cost driver. Set a budget cap for this category.`
        : 'Track a few expenses first to identify your top category.',
      tone: 'warning',
      cta: 'Plan Budget'
    },
    {
      title: 'Month-over-month trend',
      description:
        insights.monthlyDeltaAmount > 0
          ? `Spending increased by $${Math.abs(insights.monthlyDeltaAmount).toFixed(2)} compared to last month.`
          : `Good work. Spending dropped by $${Math.abs(insights.monthlyDeltaAmount).toFixed(2)} vs last month.`,
      tone: insights.monthlyDeltaAmount > 0 ? 'danger' : 'success',
      cta: 'Review Trend'
    },
    {
      title: 'Savings guidance',
      description:
        insights.savingsRate >= 20
          ? 'Your savings rate is on track. Keep this momentum with consistent monthly targets.'
          : 'Aim for at least 20% savings rate by reducing recurring discretionary expenses.',
      tone: insights.savingsRate >= 20 ? 'success' : 'warning',
      cta: 'Improve Savings'
    }
  ];

  useEffect(() => {
    if (!insightNotice) return undefined;
    const timeout = window.setTimeout(() => setInsightNotice(''), 2400);
    return () => window.clearTimeout(timeout);
  }, [insightNotice]);

  const applyRecommendation = (type) => {
    if (type === 'category') {
      if (!insights.highestCategory?.key) {
        setInsightNotice('Add expense data to apply this recommendation.');
        return;
      }
      setFilters((prev) => ({
        ...prev,
        search: '',
        type: 'expense',
        category: insights.highestCategory.key,
        dateRange: 'month'
      }));
      setInsightNotice(`Applied filter: ${insights.highestCategory.name} (this month).`);
      if (typeof onNavigateTab === 'function') onNavigateTab('transactions');
      return;
    }

    if (type === 'monthly') {
      setFilters((prev) => ({
        ...prev,
        search: '',
        type: 'expense',
        category: 'all',
        dateRange: 'month'
      }));
      setInsightNotice('Applied filter: all expenses this month.');
      if (typeof onNavigateTab === 'function') onNavigateTab('transactions');
      return;
    }

    setFilters((prev) => ({
      ...prev,
      search: '',
      type: 'expense',
      category: 'all',
      dateRange: 'week'
    }));
    setInsightNotice('Applied filter: expenses in last 7 days.');
    if (typeof onNavigateTab === 'function') onNavigateTab('transactions');
  };

  return (
    <div className="insights-container animate-fade-in">
      <div className="insights-grid">
        {cards.map((card, index) => (
          <div key={index} className="insight-card glass" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="insight-icon" style={{ background: card.bg, color: card.color }}>
              <card.icon size={24} />
            </div>
            <div className="insight-info">
              <span className="insight-label">{card.title}</span>
              <h3 className="insight-value">{card.value}</h3>
              <p className="insight-detail">{card.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pro-insights">
        <div className="pro-header">
          <Lightbulb size={24} className="light-icon" />
          <h2>Smart Recommendations</h2>
        </div>

        {insightNotice && <p className="insight-notice">{insightNotice}</p>}

        <div className="recom-list">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="recom-item">
              <div className={`recom-dot ${recommendation.tone}`}></div>
              <div className="recom-text">
                <strong>{recommendation.title}</strong>
                <p>{recommendation.description}</p>
              </div>
              <button
                className="recom-btn"
                aria-label={recommendation.cta}
                onClick={() =>
                  applyRecommendation(
                    index === 0 ? 'category' : index === 1 ? 'monthly' : 'savings'
                  )
                }
              >
                {recommendation.cta} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
