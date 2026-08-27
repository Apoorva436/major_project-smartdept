import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon = <Inbox size={28} />,
  title = 'No records found',
  description = 'There are currently no items to display for this view.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`state-container ${className}`}>
      <div className="state-icon-wrapper">{icon}</div>
      <h4 className="state-title">{title}</h4>
      <p className="state-description">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
