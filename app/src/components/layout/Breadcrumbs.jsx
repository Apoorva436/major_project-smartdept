import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';

export const Breadcrumbs = () => {
  const { currentRole, activeNav, setActiveNav } = useSidebar();

  const getRoleLabel = () => {
    switch (currentRole) {
      case 'student': return 'Student Portal';
      case 'faculty': return 'Faculty Portal';
      case 'admin': return 'System Administration';
      case 'hod':
      default: return 'Department of Computer Science';
    }
  };

  const getNavLabel = () => {
    switch (activeNav) {
      case 'activities': return 'Activities & Events';
      case 'approvals': return 'Approval Requests';
      case 'calendar': return 'Department Calendar';
      case 'attendance': return 'Attendance & Tracking';
      case 'resources': return 'Resource Allocation';
      case 'budget': return 'Budget & Utilization';
      case 'reports': return 'Reports & Compliance';
      case 'analytics': return 'Analytics & Insights';
      case 'notifications': return 'System Notifications';
      case 'documents': return 'Document Vault';
      case 'ai-insights': return 'AI Intelligence Hub';
      case 'settings': return 'Department Settings';
      case 'dashboard':
      default: return 'Dashboard Overview';
    }
  };

  return (
    <div className="breadcrumbs-bar">
      <a
        href="#home"
        className="breadcrumb-item"
        onClick={(e) => { e.preventDefault(); setActiveNav('dashboard'); }}
      >
        <Home size={13} />
        <span>{getRoleLabel()}</span>
      </a>

      <ChevronRight size={12} color="var(--text-muted)" />

      <span className="breadcrumb-item current">{getNavLabel()}</span>
    </div>
  );
};
