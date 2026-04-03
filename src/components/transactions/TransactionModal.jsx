import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { StyledSelect } from './StyledSelect';

export const TransactionModal = ({
  formData,
  setFormData,
  onSubmit,
  onClose,
  isEditing,
  formError,
  availableCategories
}) => {
  const modal = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button onClick={onClose} className="close-btn" aria-label="Close transaction form">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="transaction-description">Description</label>
            <input
              id="transaction-description"
              required
              type="text"
              placeholder="e.g. Cinema tickets"
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="transaction-amount">Amount ($)</label>
              <input
                id="transaction-amount"
                required
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(event) => setFormData({ ...formData, amount: event.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="transaction-date">Date</label>
              <input
                id="transaction-date"
                required
                type="date"
                value={formData.date}
                onChange={(event) => setFormData({ ...formData, date: event.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <StyledSelect
                value={formData.type}
                ariaLabel="Transaction type"
                options={[
                  { value: 'expense', label: 'Expense' },
                  { value: 'income', label: 'Income' }
                ]}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    type: value,
                    category: value === 'income' ? 'INCOME' : 'FOOD'
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <StyledSelect
                value={formData.category}
                ariaLabel="Transaction category"
                options={availableCategories.map((categoryKey) => ({
                  value: categoryKey,
                  label: CATEGORIES[categoryKey].name
                }))}
                onChange={(value) => setFormData({ ...formData, category: value })}
              />
            </div>
          </div>

          {formError && <p className="form-error">{formError}</p>}

          <button type="submit" className="submit-btn primary">
            {isEditing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};
