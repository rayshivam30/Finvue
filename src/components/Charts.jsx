import React, { useMemo } from 'react';
import { useFinance } from '../context/finance-context';
import { CATEGORIES } from '../data/mockData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import './charts.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        <p className="value">${payload[0].value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
};

export const Charts = () => {
  const { transactions } = useFinance();

  const trendData = useMemo(() => {
    const dailyData = transactions.reduce((acc, transaction) => {
      const date = transaction.date;
      const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
      const current = acc[date] ?? { date, delta: 0 };

      return {
        ...acc,
        [date]: {
          ...current,
          delta: current.delta + amount
        }
      };
    }, {});

    const sortedDays = Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date));

    const result = sortedDays.reduce(
      (acc, day) => {
        const nextBalance = acc.runningBalance + day.delta;
        return {
          runningBalance: nextBalance,
          series: [
            ...acc.series,
            {
              date: day.date,
              balance: nextBalance,
              displayDate: new Date(day.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })
            }
          ]
        };
      },
      { runningBalance: 0, series: [] }
    );

    return result.series;
  }, [transactions]);

  const breakdownData = useMemo(() => {
    const expenseCategories = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, transaction) => {
        const category = transaction.category;
        const currentAmount = acc[category] ?? 0;
        return { ...acc, [category]: currentAmount + transaction.amount };
      }, {});

    return Object.entries(expenseCategories).map(([category, amount]) => ({
      name: CATEGORIES[category]?.name || category,
      value: amount,
      color: CATEGORIES[category]?.color || '#94a3af'
    }));
  }, [transactions]);

  return (
    <div className="charts-grid container">
      <div className="chart-card glass animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="chart-title">Balance Trend</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="displayDate" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: 'var(--text-muted)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="balance" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card glass animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <h2 className="chart-title">Spending Breakdown</h2>
        <div className="chart-wrapper pie-chart-wrapper">
          {breakdownData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={breakdownData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="chart-empty">No expense data yet. Add expenses to see category breakdown.</p>
          )}
        </div>
      </div>
    </div>
  );
};
