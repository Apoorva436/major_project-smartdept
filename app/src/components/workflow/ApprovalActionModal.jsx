import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';

export const ApprovalActionModal = ({
  isOpen,
  onClose,
  actionType, // 'approve' | 'reject' | 'changes'
  request,
  onConfirm,
}) => {
  const [comments, setComments] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!request) return null;

  const getActionDetails = () => {
    switch (actionType) {
      case 'approve':
        return {
          title: 'Approve Activity Request',
          subtitle: 'Grant clearance and advance to the next approval stage or final schedule.',
          icon: <CheckCircle2 size={20} color="#10B981" />,
          buttonVariant: 'success',
          buttonText: 'Confirm Approval',
          commentPlaceholder: 'Optional: Add approval notes, venue confirmation, or spending remarks...',
          commentRequired: false,
        };
      case 'reject':
        return {
          title: 'Decline Activity Request',
          subtitle: 'Reject this proposal. The requester will be notified with your feedback.',
          icon: <XCircle size={20} color="#EF4444" />,
          buttonVariant: 'danger',
          buttonText: 'Decline Proposal',
          commentPlaceholder: 'Reason for rejection (Required for institutional records)...',
          commentRequired: true,
        };
      case 'changes':
      default:
        return {
          title: 'Request Revisions / Clarifications',
          subtitle: 'Send the proposal back to the coordinator for specific modifications.',
          icon: <AlertCircle size={20} color="#F59E0B" />,
          buttonVariant: 'secondary',
          buttonText: 'Submit Request for Changes',
          commentPlaceholder: 'Describe the necessary changes, budget adjustments, or document additions...',
          commentRequired: true,
        };
    }
  };

  const details = getActionDetails();

  const handleAction = () => {
    if (details.commentRequired && !comments.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(actionType, comments);
      onClose();
    }, 500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {details.icon}
          <span>{details.title}</span>
        </div>
      }
      subtitle={details.subtitle}
      maxWidth="520px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} color="#8B5CF6" /> Auto-notification will be dispatched
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant={details.buttonVariant}
              size="sm"
              onClick={handleAction}
              disabled={isProcessing || (details.commentRequired && !comments.trim())}
            >
              {isProcessing ? 'Processing...' : details.buttonText}
            </Button>
          </div>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Request Brief */}
        <div
          style={{
            padding: '12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-hover)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {request.title}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Requested by {request.requester.name} ({request.requester.department}) • Budget: ${request.budget.toLocaleString()}
          </div>
        </div>

        {/* Comment Field */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            Comments & Justification {details.commentRequired ? '*' : '(Optional)'}
          </label>
          <textarea
            className="form-input"
            rows={4}
            style={{ height: 'auto', padding: '10px 12px' }}
            placeholder={details.commentPlaceholder}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required={details.commentRequired}
            autoFocus
          />
        </div>
      </div>
    </Modal>
  );
};
