import React from 'react';
import { Search } from 'lucide-react';

export const EmptyStateTableRow = ({ isAdmin }) => (
  <tr>
    <td colSpan={isAdmin ? 5 : 4} className="empty-state">
      <div className="empty-content">
        <div className="empty-icon">
          <Search size={48} />
        </div>
        <h3>No transactions found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    </td>
  </tr>
);

export const EmptyStateMobile = () => (
  <div className="empty-content">
    <div className="empty-icon">
      <Search size={40} />
    </div>
    <h3>No transactions found</h3>
    <p>Try adjusting your search or filters.</p>
  </div>
);
