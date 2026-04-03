export const addTransactionAction = ({ userRole, setTransactions, newTransaction }) => {
  if (userRole !== 'admin') return;
  setTransactions((prev) => [{ ...newTransaction, id: Date.now().toString() }, ...prev]);
};

export const deleteTransactionAction = ({ userRole, setTransactions, id }) => {
  if (userRole !== 'admin') return;
  setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
};

export const updateTransactionAction = ({ userRole, setTransactions, id, updatedTransaction }) => {
  if (userRole !== 'admin') return;
  setTransactions((prev) =>
    prev.map((transaction) =>
      transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
    )
  );
};

export const setRoleAction = ({ setUser, role }) => {
  if (role !== 'admin' && role !== 'viewer') return;
  setUser((prev) => ({ ...prev, role }));
};

export const toggleThemeAction = ({ setTheme }) => {
  setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
};
