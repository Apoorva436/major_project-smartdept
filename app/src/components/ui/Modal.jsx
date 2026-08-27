import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '540px',
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
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="modal-content"
            style={{ maxWidth }}
            onClick={(e) => e.stopPropagation()}
          >
            {(title || onClose) && (
              <div className="card-header">
                <div className="card-title-group">
                  {title && <h3 className="card-title">{title}</h3>}
                  {subtitle && <p className="card-subtitle">{subtitle}</p>}
                </div>
                {onClose && (
                  <Button variant="ghost" size="xs" onClick={onClose} aria-label="Close modal">
                    <X size={16} />
                  </Button>
                )}
              </div>
            )}

            <div className="card-body">{children}</div>

            {footer && <div className="card-footer">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
