import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidebarProvider, useSidebar } from './contexts/SidebarContext';
import { CommandPaletteProvider } from './contexts/CommandPaletteContext';
import { WorkflowProvider } from './contexts/WorkflowContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppShell } from './components/layout/AppShell';
import { DashboardHOD } from './pages/DashboardHOD';
import { DashboardStudent } from './pages/DashboardStudent';
import { DashboardFaculty } from './pages/DashboardFaculty';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { SectionViews } from './pages/SectionViews';
import { LoginPage } from './pages/LoginPage';

// ── Dashboard router — role from AuthContext (DB-driven), never from local state ──

const MainContent = () => {
  const { activeNav } = useSidebar();
  const { user } = useAuth();

  // DB role → dashboard component map
  const roleMap = {
    STUDENT: <DashboardStudent />,
    FACULTY: <DashboardFaculty />,
    HOD:     <DashboardHOD />,
    ADMIN:   <DashboardAdmin />,
  };

  if (activeNav !== 'dashboard') {
    return <SectionViews activeSection={activeNav} />;
  }

  return roleMap[user?.role] ?? <DashboardHOD />;
};

// ── Auth Gate — blocks access until authenticated ─────────

const AuthGate = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-app)',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div style={{
          width: '40px', height: '40px',
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--color-brand-primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Loading SmartDept...
        </span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isAuthenticated) return <LoginPage />;
  return children;
};

// ── App Root ──────────────────────────────────────────────

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <CommandPaletteProvider>
            <WorkflowProvider>
              <AuthGate>
                <AppShell>
                  <MainContent />
                </AppShell>
              </AuthGate>
            </WorkflowProvider>
          </CommandPaletteProvider>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
