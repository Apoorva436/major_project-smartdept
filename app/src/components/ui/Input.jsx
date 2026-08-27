import React from 'react';

export const Input = ({
  label,
  icon,
  error,
  helperText,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <div className="form-input-wrapper">
        {icon && <span className="form-input-icon">{icon}</span>}
        <input
          id={inputId}
          className={`form-input ${icon ? 'form-input-with-icon' : ''} ${error ? 'border-danger' : ''}`}
          {...props}
        />
      </div>
      {error && <span style={{ fontSize: '11px', color: '#EF4444', marginTop: '2px' }}>{error}</span>}
      {!error && helperText && (
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{helperText}</span>
      )}
    </div>
  );
};
