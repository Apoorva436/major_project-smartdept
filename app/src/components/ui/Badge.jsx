import React from 'react';

/**
 * Activity Status Badge supporting the 8 primary enterprise statuses:
 * - Draft
 * - Pending Approval (or Pending)
 * - Approved
 * - Scheduled
 * - Ongoing
 * - Completed
 * - Rejected
 * - Cancelled
 */
export const Badge = ({ status = 'neutral', children, className = '', showDot = true, size = 'sm' }) => {
  const normalized = (status || '').toLowerCase().replace(/\s+/g, '-');

  const getStatusClass = () => {
    switch (normalized) {
      case 'draft':
        return 'badge-draft';
      case 'pending':
      case 'pending-approval':
        return 'badge-pending';
      case 'approved':
        return 'badge-approved';
      case 'scheduled':
        return 'badge-scheduled';
      case 'ongoing':
      case 'in-progress':
        return 'badge-ongoing';
      case 'completed':
        return 'badge-completed';
      case 'rejected':
        return 'badge-rejected';
      case 'cancelled':
      case 'canceled':
        return 'badge-cancelled';
      case 'primary':
        return 'badge-primary';
      default:
        return 'badge-neutral';
    }
  };

  const displayText = children || status;

  return (
    <span className={`badge ${getStatusClass()} ${className}`}>
      {showDot && <span className="badge-dot-indicator" />}
      {displayText}
    </span>
  );
};
