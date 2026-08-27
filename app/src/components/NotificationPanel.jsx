import React from 'react';
import { Drawer } from './ui/Drawer';
import { Button } from './ui/Button';
import { Bell, Check, Sparkles, Calendar, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useWorkflow } from '../contexts/WorkflowContext';

export const NotificationPanel = ({ isOpen, onClose }) => {
  const { workflowNotifications } = useWorkflow();

  const defaultNotifications = [
    {
      id: 'd1',
      title: 'Workflow Engine Rule Triggered',
      message: 'REQ-2026-801 ($18,500) routed to HOD, Dean & Finance per Rule-002',
      time: '5m ago',
      type: 'info',
    },
    {
      id: 'd2',
      title: 'High Priority Approval Required',
      message: 'Dr. Sarah Jenkins submitted GPU Cluster Procurement request ($18,500)',
      time: '10m ago',
      type: 'warning',
    },
    {
      id: 'd3',
      title: 'AI Insight Alert: Venue Conflict',
      message: 'Auditorium A has overlapping bookings on Sep 02, 2:00 PM',
      time: '45m ago',
      type: 'warning',
    },
    {
      id: 'd4',
      title: 'Event Scheduled Successfully',
      message: 'International AI & Robotics Symposium scheduled for Aug 28',
      time: '2h ago',
      type: 'success',
    },
  ];

  const allNotifications = [...workflowNotifications, ...defaultNotifications];

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} color="#10B981" />;
      case 'danger':
        return <XCircle size={16} color="#EF4444" />;
      case 'warning':
        return <AlertTriangle size={16} color="#F59E0B" />;
      case 'info':
      default:
        return <Sparkles size={16} color="#4F6EF7" />;
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Notification Center"
      subtitle={`${allNotifications.length} automated alerts & workflow updates`}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button variant="ghost" size="xs">
            Mark all as read
          </Button>
          <Button variant="secondary" size="xs" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {allNotifications.map((n) => (
          <div
            key={n.id}
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface-hover)',
              border: '1px solid var(--border-color-subtle)',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {getIcon(n.type)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                {n.title}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '6px' }}>
                {n.message || n.desc}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};
