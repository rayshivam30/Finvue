import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FinanceContext } from './finance-context';
import { DEFAULT_FILTERS } from './finance-constants';
import {
  loadTransactions,
  loadUser,
  loadTheme,
  persistTransactions,
  persistUser,
  persistTheme
} from './finance-storage';
import { getFilteredTransactions, getTotals } from './finance-selectors';
import {
  addTransactionAction,
  deleteTransactionAction,
  updateTransactionAction,
  setRoleAction,
  toggleThemeAction
} from './finance-actions';

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [user, setUser] = useState(loadUser);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [theme, setTheme] = useState(loadTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    persistTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    persistUser(user);
  }, [user]);

  const filteredTransactions = useMemo(
    () => getFilteredTransactions(transactions, filters),
    [transactions, filters]
  );

  const totals = useMemo(() => getTotals(transactions), [transactions]);

  const addTransaction = useCallback(
    (newTransaction) => {
      addTransactionAction({
        userRole: user.role,
        setTransactions,
        newTransaction
      });
    },
    [user.role]
  );

  const deleteTransaction = useCallback(
    (id) => {
      deleteTransactionAction({
        userRole: user.role,
        setTransactions,
        id
      });
    },
    [user.role]
  );

  const updateTransaction = useCallback(
    (id, updatedTransaction) => {
      updateTransactionAction({
        userRole: user.role,
        setTransactions,
        id,
        updatedTransaction
      });
    },
    [user.role]
  );

  const setRole = useCallback(
    (role) => {
      setRoleAction({ setUser, role });
    },
    [setUser]
  );

  const toggleTheme = useCallback(() => {
    toggleThemeAction({ setTheme });
  }, []);

  const value = useMemo(
    () => ({
      transactions,
      filteredTransactions,
      totals,
      filters,
      setFilters,
      user,
      setRole,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      theme,
      toggleTheme
    }),
    [
      transactions,
      filteredTransactions,
      totals,
      filters,
      user,
      setRole,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      theme,
      toggleTheme
    ]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
};
