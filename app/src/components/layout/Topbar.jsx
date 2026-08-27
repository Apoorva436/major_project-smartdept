import React, { useState } from 'react';
import {
  Search,
  Bell,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  ChevronDown,
  Sparkles,
  LogOut,
  User,
  Shield,
  Layers,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { useCommandPalette } from '../../contexts/CommandPaletteContext';
import { Avatar } from '../ui/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

export const Topbar = ({ onOpenNotifications, onOpenHelp }) => {
  const { theme, toggleTheme } = useTheme();
  const { toggleMobile, currentRole, setCurrentRole } = useSidebar();
  const { openPalette } = useCommandPalette();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const getRoleUser = () => {
    switch (currentRole) {
      case 'student':
        return { name: 'Priya Sharma', role: 'Student (CS-2026)', avatar: 'Priya' };
      case 'faculty':
        return { name: 'Prof. David Chen', role: 'Associate Professor', avatar: 'David' };
      case 'admin':
        return { name: 'Admin Console', role: 'System Administrator', avatar: 'Admin' };
      case 'hod':
      default:
        return { name: 'Dr. Kumar V.', role: 'Head of Department', avatar: 'Kumar' };
    }
  };

  const user = getRoleUser();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="topbar-mobile-toggle"
          onClick={toggleMobile}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Global Search & Command Palette trigger */}
        <button
          type="button"
          className="search-trigger-btn"
          onClick={openPalette}
          title="Open Command Palette (Ctrl+K)"
        >
          <div className="search-trigger-left">
            <Search size={15} />
            <span>Search activity, student, faculty, reports...</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="kbd">Ctrl</span>
            <span className="kbd">K</span>
          </div>
        </button>
      </div>

      <div className="topbar-right">
        {/* AI Quick assist button */}
        <button
          className="topbar-btn"
          onClick={openPalette}
          title="Ask AI Assistant"
          style={{ color: '#8B5CF6' }}
        >
          <Sparkles size={18} />
        </button>

        {/* Notifications */}
        <button
          className="topbar-btn"
          onClick={onOpenNotifications}
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="topbar-badge-dot" />
        </button>

        {/* Help & Documentation */}
        <button
          className="topbar-btn"
          onClick={onOpenHelp}
          title="Help & Support"
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>

        {/* Theme Toggle (Sun / Moon) */}
        <button
          className="topbar-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle theme"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} color="#FBBF24" />}
          </motion.div>
        </button>

        {/* User Profile Menu */}
        <div style={{ position: 'relative' }}>
          <div
            className="user-profile-menu"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
          >
            <Avatar name={user.name} size="sm" status="online" />
            <div className="user-info-text">
              <span className="user-name">{user.name}</span>
              <span className="user-role-label">{user.role}</span>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" style={{ marginRight: '4px' }} />
          </div>

          <AnimatePresence>
            {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '240px',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  zIndex: 'var(--z-dropdown)',
                  padding: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color-subtle)', marginBottom: '4px' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{user.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user.role}</div>
                </div>

                <div style={{ padding: '4px 10px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Switch Role View
                </div>

                <button
                  className="role-option"
                  style={{ width: '100%', textAlign: 'left', background: 'transparent' }}
                  onClick={() => { setCurrentRole('hod'); setProfileMenuOpen(false); }}
                >
                  <Layers size={14} /> HOD Portal
                </button>
                <button
                  className="role-option"
                  style={{ width: '100%', textAlign: 'left', background: 'transparent' }}
                  onClick={() => { setCurrentRole('faculty'); setProfileMenuOpen(false); }}
                >
                  <User size={14} /> Faculty Portal
                </button>
                <button
                  className="role-option"
                  style={{ width: '100%', textAlign: 'left', background: 'transparent' }}
                  onClick={() => { setCurrentRole('student'); setProfileMenuOpen(false); }}
                >
                  <User size={14} /> Student Portal
                </button>
                <button
                  className="role-option"
                  style={{ width: '100%', textAlign: 'left', background: 'transparent' }}
                  onClick={() => { setCurrentRole('admin'); setProfileMenuOpen(false); }}
                >
                  <Shield size={14} /> Admin Console
                </button>

                <div style={{ borderTop: '1px solid var(--border-color-subtle)', marginTop: '4px', paddingTop: '4px' }}>
                  <button
                    className="role-option"
                    style={{ width: '100%', textAlign: 'left', color: '#EF4444', background: 'transparent' }}
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
