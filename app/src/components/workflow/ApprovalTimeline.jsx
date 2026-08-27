import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ArrowDown,
  User,
  Shield,
  Wallet,
  Building,
  Truck,
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const ApprovalTimeline = ({ timeline = [], currentStepIndex = 1 }) => {
  const getRoleIcon = (role) => {
    if (role.includes('HOD') || role.includes('Head')) return <Building size={14} />;
    if (role.includes('Principal') || role.includes('Admin') || role.includes('Dean')) return <Shield size={14} />;
    if (role.includes('Finance') || role.includes('Accounts')) return <Wallet size={14} />;
    if (role.includes('Transport') || role.includes('Safety')) return <Truck size={14} />;
    return <User size={14} />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle2 size={16} color="#10B981" />;
      case 'Pending':
        return <Clock size={16} color="#F59E0B" />;
      case 'Changes Requested':
        return <AlertCircle size={16} color="#F59E0B" />;
      case 'Rejected':
        return <XCircle size={16} color="#EF4444" />;
      default:
        return <Clock size={16} color="var(--text-muted)" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge status="approved">Approved</Badge>;
      case 'Pending':
        return <Badge status="pending">Under Review</Badge>;
      case 'Changes Requested':
        return <Badge status="rejected">Changes Requested</Badge>;
      case 'Rejected':
        return <Badge status="rejected">Declined</Badge>;
      default:
        return <span className="badge badge-draft">Queued</span>;
    }
  };

  return (
    <div className="approval-timeline-wrapper" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
        {timeline.map((step, idx) => {
          const isLast = idx === timeline.length - 1;
          const isCurrent = step.status === 'Pending' || step.status === 'Changes Requested';

          return (
            <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
              {/* Left Node & Connector Line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor:
                      step.status === 'Approved'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : isCurrent
                        ? 'rgba(245, 158, 11, 0.15)'
                        : step.status === 'Rejected'
                        ? 'rgba(239, 68, 68, 0.15)'
                        : 'var(--bg-muted)',
                    border: `2px solid ${
                      step.status === 'Approved'
                        ? '#10B981'
                        : isCurrent
                        ? '#F59E0B'
                        : step.status === 'Rejected'
                        ? '#EF4444'
                        : 'var(--border-color)'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    boxShadow: isCurrent ? '0 0 0 4px rgba(245, 158, 11, 0.15)' : 'none',
                  }}
                >
                  {getStatusIcon(step.status)}
                </div>

                {!isLast && (
                  <div
                    style={{
                      width: '2px',
                      flex: 1,
                      minHeight: '44px',
                      backgroundColor:
                        step.status === 'Approved' ? '#10B981' : 'var(--border-color)',
                      margin: '4px 0',
                    }}
                  />
                )}
              </div>

              {/* Right Content Card */}
              <div
                style={{
                  flex: 1,
                  paddingBottom: isLast ? '0px' : '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    backgroundColor: isCurrent
                      ? 'rgba(245, 158, 11, 0.05)'
                      : step.status === 'Approved'
                      ? 'var(--bg-surface-hover)'
                      : 'var(--bg-card)',
                    border: `1px solid ${isCurrent ? 'rgba(245, 158, 11, 0.3)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    boxShadow: isCurrent ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: 'var(--color-brand-primary)' }}>{getRoleIcon(step.role)}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {step.role}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {step.approverName} {step.title ? `• ${step.title}` : ''}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getStatusBadge(step.status)}
                    </div>
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    Timestamp: <strong>{step.timestamp}</strong>
                  </div>

                  {step.comments && (
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-color-subtle)',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        fontStyle: 'italic',
                        lineHeight: 1.4,
                      }}
                    >
                      "{step.comments}"
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
