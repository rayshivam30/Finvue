import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const StyledSelect = ({ value, onChange, options, ariaLabel, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) return undefined;

    const onDocPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const onEsc = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', onDocPointerDown);
    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('pointerdown', onDocPointerDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className={`styled-select ${isOpen ? 'open' : ''} ${className}`}>
      <button
        type="button"
        className="styled-select-btn"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected?.label ?? ''}</span>
        <ChevronDown size={16} className="styled-select-icon" />
      </button>

      {isOpen && (
        <div className="styled-select-menu" role="listbox" aria-label={ariaLabel}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`styled-select-option ${value === option.value ? 'active' : ''}`}
              role="option"
              aria-selected={value === option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
