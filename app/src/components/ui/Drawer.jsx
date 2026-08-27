import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '420px',
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="drawer-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="drawer-content"
            style={{ maxWidth }}
          >
            <div className="card-header">
              <div className="card-title-group">
                {title && <h3 className="card-title">{title}</h3>}
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
              </div>
              <Button variant="ghost" size="xs" onClick={onClose} aria-label="Close drawer">
                <X size={16} />
              </Button>
            </div>

            <div className="card-body" style={{ overflowY: 'auto', flex: 1 }}>
              {children}
            </div>

            {footer && <div className="card-footer">{footer}</div>}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
