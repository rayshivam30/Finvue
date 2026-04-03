import React from 'react';
import { createPortal } from 'react-dom';

export const ToastViewport = ({ toasts }) =>
  createPortal(
    <div className="toast-wrap" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          {toast.message}
        </div>
      ))}
    </div>,
    document.body
  );
