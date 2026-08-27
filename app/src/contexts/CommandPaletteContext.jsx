import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSidebar } from './SidebarContext';

const CommandPaletteContext = createContext();

export const CommandPaletteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewActivityModalOpen, setIsNewActivityModalOpen] = useState(false);
  const { setActiveNav } = useSidebar();

  const openPalette = () => setIsOpen(true);
  const closePalette = () => setIsOpen(false);
  const togglePalette = () => setIsOpen(prev => !prev);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input, textarea or contenteditable element
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInputActive =
        activeTag === 'input' ||
        activeTag === 'textarea' ||
        activeTag === 'select' ||
        (document.activeElement && document.activeElement.isContentEditable);

      // Ctrl + K / Cmd + K to open Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        togglePalette();
        return;
      }

      // Escape to close open dialogs
      if (e.key === 'Escape') {
        if (isOpen) {
          e.preventDefault();
          closePalette();
        }
        if (isNewActivityModalOpen) {
          setIsNewActivityModalOpen(false);
        }
        return;
      }

      // If user is typing in form inputs, do not trigger single letter shortcuts
      if (isInputActive) return;

      // Single Key Shortcuts:
      // 'n' -> New Activity
      if (e.key.toLowerCase() === 'n' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsNewActivityModalOpen(true);
      }

      // 'a' -> Approvals
      if (e.key.toLowerCase() === 'a' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setActiveNav('approvals');
      }

      // 'c' -> Calendar
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setActiveNav('calendar');
      }

      // 'r' -> Reports
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setActiveNav('reports');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isNewActivityModalOpen, setActiveNav]);

  return (
    <CommandPaletteContext.Provider
      value={{
        isOpen,
        openPalette,
        closePalette,
        togglePalette,
        isNewActivityModalOpen,
        setIsNewActivityModalOpen,
      }}
    >
      {children}
    </CommandPaletteContext.Provider>
  );
};

export const useCommandPalette = () => useContext(CommandPaletteContext);
