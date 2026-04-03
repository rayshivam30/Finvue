import React, { useEffect, useMemo, useState } from 'react';
import { useFinance } from '../../context/finance-context';
import { CATEGORIES } from '../../data/mockData';
import { escapeCsv } from './transaction-utils';
import { TransactionFilters } from './TransactionFilters';
import { TransactionDesktopTable } from './TransactionDesktopTable';
import { TransactionMobileCards } from './TransactionMobileCards';
import { TransactionModal } from './TransactionModal';
import { ToastViewport } from './ToastViewport';
import './transactions.css';

export const TransactionTable = ({ limit }) => {
  const {
    filteredTransactions,
    deleteTransaction,
    user,
    addTransaction,
    updateTransaction,
    filters,
    setFilters
  } = useFinance();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [isGrouped, setIsGrouped] = useState(false);
  const [formError, setFormError] = useState('');
  const [toasts, setToasts] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'FOOD',
    type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (!isModalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const pushToast = (message) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2200);
  };

  const displayTransactions = limit ? filteredTransactions.slice(0, limit) : filteredTransactions;

  const availableFormCategories = useMemo(() => {
    if (formData.type === 'income') {
      return ['INCOME'];
    }
    return Object.keys(CATEGORIES).filter((category) => category !== 'INCOME');
  }, [formData.type]);

  const sortedTransactions = useMemo(() => {
    return [...displayTransactions].sort((a, b) => {
      if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      if (sortConfig.key === 'date') {
        return sortConfig.direction === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      }
      return 0;
    });
  }, [displayTransactions, sortConfig]);

  const groupedTransactions = useMemo(() => {
    if (!isGrouped) return null;
    return sortedTransactions.reduce((acc, transaction) => {
      const existing = acc[transaction.category] ?? [];
      return { ...acc, [transaction.category]: [...existing, transaction] };
    }, {});
  }, [sortedTransactions, isGrouped]);

  const handleSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (transaction) => {
    setFormError('');
    setEditingId(transaction.id);
    setFormData({
      description: transaction.description,
      amount: Math.abs(transaction.amount).toString(),
      category: transaction.category,
      type: transaction.type,
      date: transaction.date
    });
    setModalOpen(true);
  };

  const handleAdd = () => {
    setFormError('');
    setEditingId(null);
    setFormData({
      description: '',
      amount: '',
      category: 'FOOD',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
    setModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const parsedAmount = Number.parseFloat(formData.amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setFormError('Amount must be a valid number greater than 0.');
      return;
    }

    if (!formData.description.trim()) {
      setFormError('Description is required.');
      return;
    }

    const normalizedCategory = formData.type === 'income' ? 'INCOME' : formData.category;
    const payload = {
      ...formData,
      description: formData.description.trim(),
      amount: parsedAmount,
      category: normalizedCategory
    };

    if (editingId) {
      if (user.role !== 'admin') return;
      updateTransaction(editingId, payload);
      pushToast('Transaction updated successfully.');
    } else {
      if (user.role !== 'admin') return;
      addTransaction(payload);
      pushToast('Transaction added successfully.');
    }

    setModalOpen(false);
  };

  const handleDelete = (transaction) => {
    if (user.role !== 'admin') return;
    deleteTransaction(transaction.id);
    pushToast('Transaction deleted successfully.');
  };

  const downloadFile = (content, fileName, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    const dataString = JSON.stringify(displayTransactions, null, 2);
    downloadFile(dataString, 'transactions.json', 'application/json');
  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = displayTransactions.map((transaction) => [
      transaction.date,
      transaction.description,
      CATEGORIES[transaction.category]?.name || transaction.category,
      transaction.type,
      transaction.amount
    ]);

    const csvContent = [headers, ...rows].map((row) => row.map(escapeCsv).join(',')).join('\n');
    downloadFile(csvContent, 'transactions.csv', 'text/csv');
  };

  return (
    <>
      <div className="transactions-container glass animate-fade-in">
        <TransactionFilters
          limit={limit}
          filters={filters}
          setFilters={setFilters}
          isGrouped={isGrouped}
          setIsGrouped={setIsGrouped}
          exportJSON={exportJSON}
          exportCSV={exportCSV}
          onAdd={handleAdd}
          isAdmin={user.role === 'admin'}
        />

        <TransactionDesktopTable
          sortedTransactions={sortedTransactions}
          groupedTransactions={groupedTransactions}
          isGrouped={isGrouped}
          isAdmin={user.role === 'admin'}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <TransactionMobileCards
          sortedTransactions={sortedTransactions}
          groupedTransactions={groupedTransactions}
          isGrouped={isGrouped}
          isAdmin={user.role === 'admin'}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <TransactionModal
          formData={formData}
          setFormData={setFormData}
          formError={formError}
          availableCategories={availableFormCategories}
          onSubmit={handleSubmit}
          onClose={() => setModalOpen(false)}
          isEditing={!!editingId}
        />
      )}

      <ToastViewport toasts={toasts} />
    </>
  );
};
