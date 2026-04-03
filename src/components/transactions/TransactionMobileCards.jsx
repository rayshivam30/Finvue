import React from 'react';
import { Edit3, Trash2, CircleHelp } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { CATEGORY_ICONS } from './transaction-utils';
import { EmptyStateMobile } from './EmptyState';

const renderMobileCards = (transactions, isAdmin, onEdit, onDelete) =>
  transactions.map((transaction) => {
    const IconComponent = CATEGORY_ICONS[transaction.category] ?? CircleHelp;
    return (
      <article key={transaction.id} className="mobile-card">
        <div className="mobile-card-header">
          <div className="mobile-desc">
            <div
              className="icon-badge"
              style={{
                background: `${CATEGORIES[transaction.category]?.color}15`,
                color: CATEGORIES[transaction.category]?.color
              }}
            >
              <IconComponent size={16} />
            </div>
            <div>
              <p className="mobile-title">{transaction.description}</p>
              <p className="mobile-date">
                {new Date(transaction.date).toLocaleDateString('en-US', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <span className={`mobile-amount ${transaction.type}`}>
            {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
          </span>
        </div>

        <div className="mobile-meta-row">
          <span className="cat-badge" style={{ color: CATEGORIES[transaction.category]?.color }}>
            {CATEGORIES[transaction.category]?.name}
          </span>
          {isAdmin && (
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
          )}
        </div>
      </article>
    );
  });

export const TransactionMobileCards = ({
  sortedTransactions,
  groupedTransactions,
  isGrouped,
  isAdmin,
  onEdit,
  onDelete
}) => {
  const renderMobileGroupedCards = () => {
    if (!groupedTransactions) return null;

    return Object.entries(groupedTransactions).map(([category, items]) => (
      <section key={category} className="mobile-group">
        <div className="mobile-group-header">
          <span className="group-title" style={{ color: CATEGORIES[category]?.color }}>
            {CATEGORIES[category]?.name}
          </span>
          <span className="group-count">{items.length}</span>
        </div>
        <div className="mobile-cards">{renderMobileCards(items, isAdmin, onEdit, onDelete)}</div>
      </section>
    ));
  };

  return (
    <div className="mobile-table-view">
      {!isGrouped ? (
        sortedTransactions.length > 0 ? (
          <div className="mobile-cards">{renderMobileCards(sortedTransactions, isAdmin, onEdit, onDelete)}</div>
        ) : (
          <div className="mobile-empty">
            <EmptyStateMobile />
          </div>
        )
      ) : sortedTransactions.length > 0 ? (
        renderMobileGroupedCards()
      ) : (
        <div className="mobile-empty">
          <EmptyStateMobile />
        </div>
      )}
    </div>
  );
};
