import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('smartdept-sidebar-collapsed') === 'true';
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('smartdept-role') || 'hod';
  });
  const [activeNav, setActiveNav] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('smartdept-sidebar-collapsed', isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    localStorage.setItem('smartdept-role', currentRole);
  }, [currentRole]);

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const toggleMobile = () => {
    setIsMobileOpen(prev => !prev);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        isMobileOpen,
        toggleMobile,
        closeMobile,
        currentRole,
        setCurrentRole,
        activeNav,
        setActiveNav,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
