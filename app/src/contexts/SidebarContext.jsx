import React, { createContext, useContext, useState, useEffect } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('smartdept-sidebar-collapsed') === 'true';
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('smartdept-sidebar-collapsed', isCollapsed);
  }, [isCollapsed]);

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  const toggleMobile   = () => setIsMobileOpen((prev) => !prev);
  const closeMobile    = () => setIsMobileOpen(false);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapse,
        isMobileOpen,
        toggleMobile,
        closeMobile,
        activeNav,
        setActiveNav,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
