import React from 'react';
import { ArrowDown, ArrowUp, Edit3, Trash2, CircleHelp } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { CATEGORY_ICONS } from './transaction-utils';
import { EmptyStateTableRow } from './EmptyState';

const renderDesktopRows = (transactions, isAdmin, onEdit, onDelete) =>
  transactions.map((transaction) => {
    const IconComponent = CATEGORY_ICONS[transaction.category] ?? CircleHelp;
    return (
      <tr key={transaction.id} className="table-row">
        <td className="date-cell">
          {new Date(transaction.date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </td>
        <td className="desc-cell">
          <div className="desc-content">
            <div
              className="icon-badge"
              style={{
                background: `${CATEGORIES[transaction.category]?.color}15`,
                color: CATEGORIES[transaction.category]?.color
              }}
            >
              <IconComponent size={16} />
            </div>
            <span className="desc-text">{transaction.description}</span>
          </div>
        </td>
        <td>
          <span className="cat-badge" style={{ color: CATEGORIES[transaction.category]?.color }}>
            {CATEGORIES[transaction.category]?.name}
          </span>
        </td>
        <td className={`amount-cell ${transaction.type}`}>
          {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </td>
        {isAdmin && (
          <td className="actions-cell">
            <div className="actions-btns">
              <button
                className="icon-btn edit"
                title="Edit"
                aria-label={`Edit transaction ${transaction.description}`}
                onClick={() => onEdit(transaction)}
              >
                <Edit3 size={16} />
              </button>
              <button
                className="icon-btn delete"
                title="Delete"
                aria-label={`Delete transaction ${transaction.description}`}
                onClick={() => onDelete(transaction)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </td>
        )}
      </tr>
    );
  });

export const TransactionDesktopTable = ({
  sortedTransactions,
  groupedTransactions,
  isGrouped,
  isAdmin,
  sortConfig,
  onSort,
  onEdit,
  onDelete
}) => (
  <div className="table-wrapper">
    <table className="transaction-table">
      <thead>
        <tr>
          <th aria-sort={sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
            <button className="th-btn" onClick={() => onSort('date')} aria-label="Sort by date">
              Date{' '}
              {sortConfig.key === 'date' &&
                (sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
            </button>
          </th>
          <th>Description</th>
          <th>Category</th>
          <th
            className="text-right"
            aria-sort={
              sortConfig.key === 'amount'
                ? sortConfig.direction === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            }
          >
            <button className="th-btn align-right" onClick={() => onSort('amount')} aria-label="Sort by amount">
              Amount{' '}
              {sortConfig.key === 'amount' &&
                (sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
            </button>
          </th>
          {isAdmin && <th className="text-right">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {!isGrouped ? (
          sortedTransactions.length > 0 ? (
            renderDesktopRows(sortedTransactions, isAdmin, onEdit, onDelete)
          ) : (
            <EmptyStateTableRow isAdmin={isAdmin} />
          )
        ) : sortedTransactions.length > 0 ? (
          Object.entries(groupedTransactions).map(([category, items]) => (
            <React.Fragment key={category}>
              <tr className="group-header">
                <td colSpan={isAdmin ? 5 : 4}>
                  <div className="group-header-content">
                    <span className="group-title" style={{ color: CATEGORIES[category]?.color }}>
                      {CATEGORIES[category]?.name}
                    </span>
                    <span className="group-count">{items.length} transactions</span>
                  </div>
                </td>
              </tr>
              {renderDesktopRows(items, isAdmin, onEdit, onDelete)}
            </React.Fragment>
          ))
        ) : (
          <EmptyStateTableRow isAdmin={isAdmin} />
        )}
      </tbody>
    </table>
  </div>
);
