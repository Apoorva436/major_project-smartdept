import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  PlusCircle,
  Calendar,
  CheckCircle2,
  FileText,
  Users,
  GraduationCap,
  Settings,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useCommandPalette } from '../contexts/CommandPaletteContext';
import { useSidebar } from '../contexts/SidebarContext';

export const CommandPalette = () => {
  const { isOpen, closePalette, setIsNewActivityModalOpen } = useCommandPalette();
  const { setActiveNav, setCurrentRole } = useSidebar();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commands = [
    {
      id: 'create-activity',
      title: 'Create Activity',
      group: 'Quick Actions',
      icon: <PlusCircle size={16} />,
      shortcut: 'N',
      action: () => {
        setIsNewActivityModalOpen(true);
        closePalette();
      },
    },
    {
      id: 'search-activity',
      title: 'Search Activities',
      group: 'Quick Actions',
      icon: <Search size={16} />,
      shortcut: 'S',
      action: () => {
        setActiveNav('activities');
        closePalette();
      },
    },
    {
      id: 'view-approvals',
      title: 'View Pending Approvals',
      group: 'Quick Actions',
      icon: <CheckCircle2 size={16} />,
      shortcut: 'A',
      action: () => {
        setActiveNav('approvals');
        closePalette();
      },
    },
    {
      id: 'open-calendar',
      title: 'Open Department Calendar',
      group: 'Navigation',
      icon: <Calendar size={16} />,
      shortcut: 'C',
      action: () => {
        setActiveNav('calendar');
        closePalette();
      },
    },
    {
      id: 'generate-report',
      title: 'Generate Compliance Report',
      group: 'Quick Actions',
      icon: <FileText size={16} />,
      shortcut: 'R',
      action: () => {
        setActiveNav('reports');
        closePalette();
      },
    },
    {
      id: 'search-student',
      title: 'Search Student Directory',
      group: 'Directory',
      icon: <GraduationCap size={16} />,
      shortcut: '',
      action: () => {
        setActiveNav('attendance');
        closePalette();
      },
    },
    {
      id: 'search-faculty',
      title: 'Search Faculty Workload',
      group: 'Directory',
      icon: <Users size={16} />,
      shortcut: '',
      action: () => {
        setActiveNav('analytics');
        closePalette();
      },
    },
    {
      id: 'open-ai-insights',
      title: 'View AI Insights & Anomalies',
      group: 'Intelligence',
      icon: <Sparkles size={16} />,
      shortcut: '',
      action: () => {
        setActiveNav('ai-insights');
        closePalette();
      },
    },
    {
      id: 'open-settings',
      title: 'Open Department Settings',
      group: 'Navigation',
      icon: <Settings size={16} />,
      shortcut: '',
      action: () => {
        setActiveNav('settings');
        closePalette();
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="palette-backdrop" onClick={closePalette}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="palette-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="palette-input-wrapper">
              <Search size={18} color="var(--text-muted)" />
              <input
                ref={inputRef}
                type="text"
                className="palette-input"
                placeholder="Type a command or search activities..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
              <span className="kbd">ESC</span>
            </div>

            <div className="palette-list">
              {filtered.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No commands matching "{query}"
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = selectedIndex === index;
                  return (
                    <div
                      key={item.id}
                      className={`palette-item ${isSelected ? 'active' : ''}`}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="palette-item-left">
                        <span className="palette-item-icon" style={{ display: 'flex', alignItems: 'center' }}>
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {item.shortcut && <span className="kbd">{item.shortcut}</span>}
                        {isSelected && <ArrowRight size={14} />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 16px',
                borderTop: '1px solid var(--border-color)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-surface-hover)',
              }}
            >
              <div style={{ display: 'flex', gap: '12px' }}>
                <span><kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> Navigate</span>
                <span><kbd className="kbd">↵</kbd> Select</span>
                <span><kbd className="kbd">ESC</kbd> Close</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={12} color="#8B5CF6" />
                <span>SmartDept Intelligence</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
