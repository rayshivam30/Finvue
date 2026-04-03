import { describe, expect, it } from 'vitest';
import { getMonthlyExpenseComparison } from './insights';

describe('getMonthlyExpenseComparison', () => {
  it('computes current vs previous month expense delta and percent', () => {
    const expenses = [
      { date: '2026-04-02', amount: 120, type: 'expense' },
      { date: '2026-04-05', amount: 80, type: 'expense' },
      { date: '2026-03-12', amount: 150, type: 'expense' },
      { date: '2026-03-22', amount: 50, type: 'expense' },
      { date: '2026-02-10', amount: 999, type: 'expense' }
    ];

    const result = getMonthlyExpenseComparison(expenses, new Date('2026-04-18'));

    expect(result.currentMonthExpense).toBe(200);
    expect(result.previousMonthExpense).toBe(200);
    expect(result.monthlyDeltaAmount).toBe(0);
    expect(result.monthlyDeltaPercent).toBe('0.0');
  });
});
