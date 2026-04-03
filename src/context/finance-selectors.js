export const getFilteredTransactions = (transactions, filters) =>
  transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'all' || transaction.type === filters.type;
      const matchesCategory = filters.category === 'all' || transaction.category === filters.category;

      let matchesDate = true;
      const transactionDate = new Date(transaction.date);
      const now = new Date();

      if (filters.dateRange === 'month') {
        matchesDate =
          transactionDate.getMonth() === now.getMonth() &&
          transactionDate.getFullYear() === now.getFullYear();
      } else if (filters.dateRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        matchesDate = transactionDate >= weekAgo;
      }

      return matchesSearch && matchesType && matchesCategory && matchesDate;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getTotals = (transactions) =>
  transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
        acc.balance += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
        acc.balance -= transaction.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 }
  );
