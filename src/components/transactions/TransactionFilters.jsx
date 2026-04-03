import React from 'react';
import { PlusCircle, Search, Rows, LayoutGrid, Download, FileText } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { StyledSelect } from './StyledSelect';

export const TransactionFilters = ({
  limit,
  filters,
  setFilters,
  isGrouped,
  setIsGrouped,
  exportJSON,
  exportCSV,
  onAdd,
  isAdmin
}) => {
  if (limit) return null;

  return (
    <div className="table-controls">
      <div className="search-filter">
        <div className="search-box-inner">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search transactions..."
            aria-label="Search transactions"
            value={filters.search}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                search: event.target.value
              }))
            }
          />
        </div>

        <div className="select-filters">
          <StyledSelect
            value={filters.type}
            ariaLabel="Filter by transaction type"
            className="filter-select"
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'income', label: 'Income' },
              { value: 'expense', label: 'Expense' }
            ]}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                type: value
              }))
            }
          />

          <StyledSelect
            value={filters.category}
            ariaLabel="Filter by category"
            className="filter-select"
            options={[
              { value: 'all', label: 'All Categories' },
              ...Object.entries(CATEGORIES).map(([key, category]) => ({
                value: key,
                label: category.name
              }))
            ]}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                category: value
              }))
            }
          />

          <StyledSelect
            value={filters.dateRange}
            ariaLabel="Filter by date range"
            className="filter-select"
            options={[
              { value: 'all', label: 'All Time' },
              { value: 'month', label: 'This Month' },
              { value: 'week', label: 'Last 7 Days' }
            ]}
            onChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                dateRange: value
              }))
            }
          />
        </div>

        <button
          className={`action-btn secondary group-btn ${isGrouped ? 'active' : ''}`}
          onClick={() => setIsGrouped(!isGrouped)}
          title="Group by category"
          aria-label={isGrouped ? 'Ungroup transactions' : 'Group transactions by category'}
        >
          {isGrouped ? <Rows size={18} /> : <LayoutGrid size={18} />}
          <span>{isGrouped ? 'Ungroup' : 'Group By Category'}</span>
        </button>
      </div>

      <div className="table-actions">
        <div className="export-group">
          <button className="action-btn secondary" onClick={exportJSON} title="Export JSON">
            <Download size={18} />
            <span>JSON</span>
          </button>
          <button className="action-btn secondary" onClick={exportCSV} title="Export CSV">
            <FileText size={18} />
            <span>CSV</span>
          </button>
        </div>

        {isAdmin && (
          <button className="action-btn primary" onClick={onAdd}>
            <PlusCircle size={18} />
            <span>Add New</span>
          </button>
        )}
      </div>
    </div>
  );
};
