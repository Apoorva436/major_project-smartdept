import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export const ErrorState = ({
  title = 'Failed to load data',
  description = 'An unexpected error occurred while fetching information. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`state-container ${className}`}>
      <div className="state-icon-wrapper" style={{ color: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
        <AlertTriangle size={28} />
      </div>
      <h4 className="state-title">{title}</h4>
      <p className="state-description">{description}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={<RotateCcw size={14} />} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
