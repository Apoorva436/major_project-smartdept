import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidebarProvider, useSidebar } from './contexts/SidebarContext';
import { CommandPaletteProvider } from './contexts/CommandPaletteContext';
import { WorkflowProvider } from './contexts/WorkflowContext';
import { AppShell } from './components/layout/AppShell';
import { DashboardHOD } from './pages/DashboardHOD';
import { DashboardStudent } from './pages/DashboardStudent';
import { DashboardFaculty } from './pages/DashboardFaculty';
import { DashboardAdmin } from './pages/DashboardAdmin';
import { SectionViews } from './pages/SectionViews';

const MainContent = () => {
  const { currentRole, activeNav } = useSidebar();

  // If on a specific section (Activities, Approvals, Calendar, etc.)
  if (activeNav !== 'dashboard') {
    return <SectionViews activeSection={activeNav} />;
  }

  // Role-Specific Dashboards
  switch (currentRole) {
    case 'student':
      return <DashboardStudent />;
    case 'faculty':
      return <DashboardFaculty />;
    case 'admin':
      return <DashboardAdmin />;
    case 'hod':
    default:
      return <DashboardHOD />;
  }
};

export function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <CommandPaletteProvider>
          <WorkflowProvider>
            <AppShell>
              <MainContent />
            </AppShell>
          </WorkflowProvider>
        </CommandPaletteProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
