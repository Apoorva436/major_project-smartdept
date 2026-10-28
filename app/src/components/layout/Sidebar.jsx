import React from 'react';
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
  GraduationCap,
  Briefcase,
  Layers,
  ShieldCheck,
  Users,
  Building2,
  Shield,
  Wrench,
  ClipboardList,
  X,
} from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';
import { useAuth } from '../../contexts/AuthContext';

// ── Role Indicator (read-only, no dropdown) ──────────────────────────────────

const ROLE_INDICATOR = {
  STUDENT: { emoji: '🎓', label: 'Student Portal',  color: '#10B981' },
  FACULTY: { emoji: '👨‍🏫', label: 'Faculty Portal', color: '#8B5CF6' },
  HOD:     { emoji: '🏛️',  label: 'HOD Portal',      color: '#4F6EF7' },
  ADMIN:   { emoji: '⚙️',   label: 'Admin Console',  color: '#F59E0B' },
};

// ── Centralized navigation config ─────────────────────────────────────────────
// Each role gets an array of *groups*. A group has a label and items[].
// Items without a group label are rendered without the heading.

const NAVIGATION_BY_ROLE = {

  STUDENT: [
    {
      group: 'Main Navigation',
      items: [
        { id: 'dashboard',     label: 'Dashboard',     icon: <LayoutDashboard size={18} /> },
        { id: 'activities',    label: 'Activities',    icon: <Activity size={18} />,        badge: '3' },
        { id: 'calendar',      label: 'Calendar',      icon: <CalendarIcon size={18} /> },
        { id: 'attendance',    label: 'Attendance',    icon: <UserCheck size={18} /> },
      ],
    },
    {
      group: 'Workspace',
      items: [
        { id: 'resources',     label: 'Resources',     icon: <Package size={18} /> },
        { id: 'documents',     label: 'Documents',     icon: <FileCode size={18} /> },
      ],
    },
    {
      group: 'Intelligence',
      items: [
        { id: 'ai-insights',   label: 'AI Insights',   icon: <Sparkles size={18} />, highlight: true },
      ],
    },
    {
      group: 'Personal',
      items: [
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: '3' },
        { id: 'settings',      label: 'Settings',      icon: <Settings size={18} /> },
      ],
    },
  ],

  FACULTY: [
    {
      group: 'Main Navigation',
      items: [
        { id: 'dashboard',     label: 'Dashboard',     icon: <LayoutDashboard size={18} /> },
        { id: 'activities',    label: 'Activities',    icon: <Activity size={18} />,       badge: '8' },
        { id: 'approvals',     label: 'Approvals',     icon: <CheckCircle2 size={18} />,   badge: '2' },
        { id: 'calendar',      label: 'Calendar',      icon: <CalendarIcon size={18} /> },
        { id: 'attendance',    label: 'Attendance',    icon: <UserCheck size={18} /> },
      ],
    },
    {
      group: 'Workspace',
      items: [
        { id: 'resources',     label: 'Resources',     icon: <Package size={18} /> },
        { id: 'documents',     label: 'Documents',     icon: <FileCode size={18} /> },
        { id: 'reports',       label: 'Reports',       icon: <FileText size={18} /> },
      ],
    },
    {
      group: 'Intelligence',
      items: [
        { id: 'ai-insights',   label: 'AI Insights',   icon: <Sparkles size={18} />, highlight: true },
      ],
    },
    {
      group: 'Personal',
      items: [
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: '3' },
        { id: 'settings',      label: 'Settings',      icon: <Settings size={18} /> },
      ],
    },
  ],

  HOD: [
    {
      group: 'Main Navigation',
      items: [
        { id: 'dashboard',     label: 'Dashboard',     icon: <LayoutDashboard size={18} /> },
        { id: 'activities',    label: 'Activities',    icon: <Activity size={18} />,        badge: '12' },
        { id: 'approvals',     label: 'Approvals',     icon: <CheckCircle2 size={18} />,    badge: '4' },
        { id: 'calendar',      label: 'Calendar',      icon: <CalendarIcon size={18} /> },
        { id: 'attendance',    label: 'Attendance',    icon: <UserCheck size={18} /> },
      ],
    },
    {
      group: 'Department Management',
      items: [
        { id: 'resources',     label: 'Resources',     icon: <Package size={18} /> },
        { id: 'budget',        label: 'Budget',        icon: <Wallet size={18} /> },
        { id: 'reports',       label: 'Reports',       icon: <FileText size={18} /> },
        { id: 'analytics',     label: 'Analytics',     icon: <TrendingUp size={18} /> },
      ],
    },
    {
      group: 'Intelligence',
      items: [
        { id: 'ai-insights',   label: 'AI Insights',   icon: <Sparkles size={18} />, highlight: true },
      ],
    },
    {
      group: 'Personal',
      items: [
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: '3' },
        { id: 'documents',     label: 'Documents',     icon: <FileCode size={18} /> },
        { id: 'settings',      label: 'Settings',      icon: <Settings size={18} /> },
      ],
    },
  ],

  ADMIN: [
    {
      group: 'Main Navigation',
      items: [
        { id: 'dashboard',     label: 'Dashboard',     icon: <LayoutDashboard size={18} /> },
        { id: 'activities',    label: 'Activities',    icon: <Activity size={18} />,        badge: '12' },
        { id: 'approvals',     label: 'Approvals',     icon: <CheckCircle2 size={18} />,    badge: '4' },
        { id: 'calendar',      label: 'Calendar',      icon: <CalendarIcon size={18} /> },
        { id: 'attendance',    label: 'Attendance',    icon: <UserCheck size={18} /> },
      ],
    },
    {
      group: 'Management',
      items: [
        { id: 'resources',     label: 'Resources',     icon: <Package size={18} /> },
        { id: 'budget',        label: 'Budget',        icon: <Wallet size={18} /> },
        { id: 'reports',       label: 'Reports',       icon: <FileText size={18} /> },
        { id: 'analytics',     label: 'Analytics',     icon: <TrendingUp size={18} /> },
      ],
    },
    {
      group: 'Administration',
      items: [
        { id: 'user-management',        label: 'User Management',        icon: <Users size={18} /> },
        { id: 'department-management',  label: 'Department Management',  icon: <Building2 size={18} /> },
        { id: 'role-management',        label: 'Role Management',        icon: <Shield size={18} /> },
        { id: 'system-configuration',   label: 'System Configuration',   icon: <Wrench size={18} /> },
        { id: 'audit-logs',             label: 'Audit Logs',             icon: <ClipboardList size={18} /> },
      ],
    },
    {
      group: 'Intelligence',
      items: [
        { id: 'ai-insights',   label: 'AI Insights',   icon: <Sparkles size={18} />, highlight: true },
      ],
    },
    {
      group: 'Personal',
      items: [
        { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: '3' },
        { id: 'documents',     label: 'Documents',     icon: <FileCode size={18} /> },
        { id: 'settings',      label: 'Settings',      icon: <Settings size={18} /> },
      ],
    },
  ],
};

// ── Sidebar Component ─────────────────────────────────────────────────────────

export const Sidebar = () => {
  const {
    isCollapsed,
    toggleCollapse,
    isMobileOpen,
    closeMobile,
    activeNav,
    setActiveNav,
  } = useSidebar();

  // Role always comes from AuthContext (DB-driven) — never from local state
  const { user } = useAuth();
  const dbRole = user?.role || 'STUDENT'; // safe fallback

  // Resolve role indicator & navigation groups
  const indicator = ROLE_INDICATOR[dbRole] || ROLE_INDICATOR.STUDENT;
  const navGroups = NAVIGATION_BY_ROLE[dbRole] || NAVIGATION_BY_ROLE.STUDENT;

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="drawer-overlay"
          onClick={closeMobile}
          style={{ zIndex: 'var(--z-drawer)' }}
        />
      )}

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>

        {/* ── Brand / Logo ─────────────────────────────────── */}
        <div className="sidebar-header">
          <a
            href="#"
            className="sidebar-brand"
            onClick={(e) => { e.preventDefault(); setActiveNav('dashboard'); }}
          >
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

        {/* ── Role Indicator (static, non-clickable) ────────── */}
        {!isCollapsed && (
          <div className="sidebar-role-selector">
            {/* Reuses the same wrapper class for consistent padding/border */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface-hover)',
                border: '1px solid var(--border-color-subtle)',
                userSelect: 'none',
                cursor: 'default',
              }}
            >
              <span style={{ fontSize: '16px', lineHeight: 1 }}>{indicator.emoji}</span>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: indicator.color,
                  letterSpacing: '0.01em',
                }}
              >
                {indicator.label}
              </span>
            </div>
          </div>
        )}

        {/* Collapsed role icon only */}
        {isCollapsed && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '8px 0 4px',
              fontSize: '18px',
              title: indicator.label,
            }}
            title={indicator.label}
          >
            {indicator.emoji}
          </div>
        )}

        {/* ── Navigation Groups ─────────────────────────────── */}
        <nav className="sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.group}>
              {/* Group heading (hidden when collapsed) */}
              {!isCollapsed && (
                <span className="sidebar-nav-group-label">{group.group}</span>
              )}

              {group.items.map((item) => {
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
                    <span
                      className="sidebar-nav-icon"
                      style={{ color: item.highlight ? '#8B5CF6' : undefined }}
                    >
                      {item.icon}
                    </span>

                    {!isCollapsed && (
                      <>
                        <span className="sidebar-nav-text">{item.label}</span>
                        {item.badge && (
                          <span className="sidebar-nav-badge">{item.badge}</span>
                        )}
                      </>
                    )}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        {/* ── Collapse Toggle ───────────────────────────────── */}
        <div className="sidebar-footer">
          <button
            className="sidebar-collapse-btn"
            onClick={toggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed
              ? <ChevronRight size={16} />
              : <><ChevronLeft size={16} /><span>Collapse Sidebar</span></>
            }
          </button>
        </div>
      </aside>
    </>
  );
};
