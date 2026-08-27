import React from 'react';
import {
  FileEdit,
  Send,
  Eye,
  CheckCircle,
  Calendar,
  PlayCircle,
  Award,
  FileCheck2,
  Check,
} from 'lucide-react';
import { LIFECYCLE_STAGES } from '../../data/activityManagementData';

export const ActivityLifecycleBar = ({
  currentStage = 'scheduled',
  onStageChange,
  className = '',
}) => {
  const getStageIndex = (stageId) => {
    return LIFECYCLE_STAGES.findIndex((s) => s.id === stageId);
  };

  const currentIndex = getStageIndex(currentStage);

  const getStageIcon = (stageId, isCompleted, isCurrent) => {
    if (isCompleted) return <Check size={14} strokeWidth={3} />;

    switch (stageId) {
      case 'draft':
        return <FileEdit size={14} />;
      case 'submitted':
        return <Send size={14} />;
      case 'under_review':
        return <Eye size={14} />;
      case 'approved':
        return <CheckCircle size={14} />;
      case 'scheduled':
        return <Calendar size={14} />;
      case 'ongoing':
        return <PlayCircle size={14} />;
      case 'completed':
        return <Award size={14} />;
      case 'report_generated':
        return <FileCheck2 size={14} />;
      default:
        return <CheckCircle size={14} />;
    }
  };

  return (
    <div
      className={`activity-lifecycle-container ${className}`}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        marginBottom: 'var(--space-6)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
            Activity Lifecycle Pipeline
          </span>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
            Current Stage: <span style={{ color: 'var(--color-brand-primary)' }}>{LIFECYCLE_STAGES[currentIndex]?.label || 'Scheduled'}</span>
          </h3>
        </div>

        {onStageChange && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Simulate Stage:</span>
            <select
              value={currentStage}
              onChange={(e) => onStageChange(e.target.value)}
              className="form-input"
              style={{ height: '32px', fontSize: '12px', padding: '4px 10px', width: 'auto' }}
            >
              {LIFECYCLE_STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.step}. {s.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Stepper Track */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflowX: 'auto',
          paddingBottom: '6px',
        }}
      >
        {LIFECYCLE_STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          let stepColor = 'var(--text-muted)';
          let bgColor = 'var(--bg-surface-hover)';
          let borderColor = 'var(--border-color)';

          if (isCompleted) {
            stepColor = '#FFFFFF';
            bgColor = '#10B981';
            borderColor = '#10B981';
          } else if (isCurrent) {
            stepColor = '#FFFFFF';
            bgColor = 'var(--color-brand-primary)';
            borderColor = 'var(--color-brand-primary)';
          }

          return (
            <React.Fragment key={stage.id}>
              {/* Step Marker */}
              <div
                onClick={() => onStageChange && onStageChange(stage.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: onStageChange ? 'pointer' : 'default',
                  zIndex: 2,
                  minWidth: '70px',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    border: '2px solid',
                    color: stepColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(79, 110, 247, 0.2)' : 'none',
                  }}
                >
                  {getStageIcon(stage.id, isCompleted, isCurrent)}
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: isCurrent ? 700 : isCompleted ? 600 : 500,
                    color: isCurrent
                      ? 'var(--color-brand-primary)'
                      : isCompleted
                      ? 'var(--text-primary)'
                      : 'var(--text-muted)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stage.label}
                </span>
              </div>

              {/* Connecting Line */}
              {idx < LIFECYCLE_STAGES.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: '3px',
                    backgroundColor: idx < currentIndex ? '#10B981' : 'var(--border-color)',
                    margin: '0 4px',
                    marginTop: '-22px',
                    zIndex: 1,
                    minWidth: '24px',
                    transition: 'background-color var(--transition-normal)',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
