import React, { useState } from 'react';
import {
  LayoutDashboard,
  Activity,
  CheckCircle2,
  Calendar as CalendarIcon,
  UserCheck,
  Package,
  Wallet,
  FileText,
  TrendingUp,
  Bell,
  FileCode,
  Sparkles,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Layers,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar = () => {
  const {
    isCollapsed,
    toggleCollapse,
    isMobileOpen,
    closeMobile,
    currentRole,
    setCurrentRole,
    activeNav,
    setActiveNav,
  } = useSidebar();

  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roles = [
    { id: 'hod', label: 'HOD Portal', icon: <Layers size={14} />, color: '#4F6EF7' },
    { id: 'faculty', label: 'Faculty View', icon: <Briefcase size={14} />, color: '#8B5CF6' },
    { id: 'student', label: 'Student Space', icon: <GraduationCap size={14} />, color: '#10B981' },
    { id: 'admin', label: 'Admin Console', icon: <ShieldCheck size={14} />, color: '#F59E0B' },
  ];

  const currentRoleObj = roles.find((r) => r.id === currentRole) || roles[0];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'activities', label: 'Activities', icon: <Activity size={18} />, badge: '12' },
    { id: 'approvals', label: 'Approvals', icon: <CheckCircle2 size={18} />, badge: currentRole === 'hod' ? '4' : undefined },
    { id: 'calendar', label: 'Calendar', icon: <CalendarIcon size={18} /> },
    { id: 'attendance', label: 'Attendance', icon: <UserCheck size={18} /> },
    { id: 'resources', label: 'Resources', icon: <Package size={18} /> },
    { id: 'budget', label: 'Budget', icon: <Wallet size={18} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={18} /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: '3' },
    { id: 'documents', label: 'Documents', icon: <FileCode size={18} /> },
    { id: 'ai-insights', label: 'AI Insights', icon: <Sparkles size={18} />, highlight: true },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="drawer-overlay" onClick={closeMobile} style={{ zIndex: 'var(--z-drawer)' }} />
      )}

      <aside
        className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Sidebar Header / Brand */}
        <div className="sidebar-header">
          <a href="#" className="sidebar-brand" onClick={(e) => { e.preventDefault(); setActiveNav('dashboard'); }}>
            <div className="sidebar-brand-logo">SD</div>
            {!isCollapsed && (
              <span className="sidebar-brand-text">
                SMART<span className="sidebar-brand-accent">DEPT</span>
              </span>
            )}
          </a>

          {isMobileOpen && (
            <button className="topbar-btn" onClick={closeMobile} aria-label="Close sidebar">
              <X size={18} />
            </button>
          )}
        </div>

        {/* Role Selector Switcher */}
        {!isCollapsed && (
          <div className="sidebar-role-selector" style={{ position: 'relative' }}>
            <button
              className="role-switcher-btn"
              onClick={() => setRoleDropdownOpen((prev) => !prev)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: currentRoleObj.color }}>{currentRoleObj.icon}</span>
                <span>{currentRoleObj.label}</span>
              </div>
              <ChevronDown size={14} />
            </button>

            <AnimatePresence>
              {roleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="role-switcher-dropdown"
                >
                  {roles.map((r) => (
                    <div
                      key={r.id}
                      className={`role-option ${currentRole === r.id ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentRole(r.id);
                        setRoleDropdownOpen(false);
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{r.icon}</span>
                        <span>{r.label}</span>
                      </div>
                      {currentRole === r.id && <span style={{ fontSize: '10px' }}>✓</span>}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {!isCollapsed && <span className="sidebar-nav-group-label">Main Navigation</span>}

          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(item.id);
                  closeMobile();
                }}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="sidebar-nav-icon" style={{ color: item.highlight ? '#8B5CF6' : undefined }}>
                  {item.icon}
                </span>

                {!isCollapsed && (
                  <>
                    <span className="sidebar-nav-text">{item.label}</span>
                    {item.badge && <span className="sidebar-nav-badge">{item.badge}</span>}
                  </>
                )}
              </a>
            );
          })}
        </nav>

        {/* Sidebar Collapse Toggle Button */}
        <div className="sidebar-footer">
          <button
            className="sidebar-collapse-btn"
            onClick={toggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /> <span>Collapse Sidebar</span></>}
          </button>
        </div>
      </aside>
    </>
  );
};
