export const getMonthKey = (dateValue) => {
  const date = new Date(dateValue);
  return `${date.getFullYear()}-${date.getMonth()}`;
};

export const getMonthlyExpenseComparison = (expenses, referenceDate = new Date()) => {
  const currentMonthKey = getMonthKey(referenceDate);
  const previousMonthDate = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - 1, 1);
  const previousMonthKey = getMonthKey(previousMonthDate);

  const monthlyExpenseMap = expenses.reduce((acc, transaction) => {
    const key = getMonthKey(transaction.date);
    return { ...acc, [key]: (acc[key] ?? 0) + transaction.amount };
  }, {});

  const currentMonthExpense = monthlyExpenseMap[currentMonthKey] ?? 0;
  const previousMonthExpense = monthlyExpenseMap[previousMonthKey] ?? 0;
  const monthlyDeltaAmount = currentMonthExpense - previousMonthExpense;
  const monthlyDeltaPercent =
    previousMonthExpense > 0 ? ((monthlyDeltaAmount / previousMonthExpense) * 100).toFixed(1) : '0.0';

  return {
    currentMonthExpense,
    previousMonthExpense,
    monthlyDeltaAmount,
    monthlyDeltaPercent
  };
};
