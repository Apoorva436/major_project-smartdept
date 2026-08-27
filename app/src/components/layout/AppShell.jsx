import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Breadcrumbs } from './Breadcrumbs';
import { CommandPalette } from '../CommandPalette';
import { NotificationPanel } from '../NotificationPanel';
import { NewActivityModal } from '../NewActivityModal';
import { useCommandPalette } from '../../contexts/CommandPaletteContext';

export const AppShell = ({ children }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { isNewActivityModalOpen, setIsNewActivityModalOpen } = useCommandPalette();

  return (
    <div className="app-shell">
      {/* Expandable/Collapsible/Mobile Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="main-wrapper">
        <Topbar
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenHelp={() => alert('SMARTDEPT Help & Documentation: Contact support@smartdept.edu or visit the Docs page.')}
        />

        <Breadcrumbs />

        <main className="page-container">{children}</main>
      </div>

      {/* Linear-style Command Palette (Ctrl+K) */}
      <CommandPalette />

      {/* Notifications Drawer */}
      <NotificationPanel
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      {/* New Activity Modal (Shortcut: N) */}
      <NewActivityModal
        isOpen={isNewActivityModalOpen}
        onClose={() => setIsNewActivityModalOpen(false)}
      />
    </div>
  );
};
