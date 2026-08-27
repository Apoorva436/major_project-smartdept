import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'outline': return 'btn-outline';
      case 'ghost': return 'btn-ghost';
      case 'danger': return 'btn-danger';
      case 'danger-ghost': return 'btn-danger-ghost';
      case 'success': return 'btn-success';
      case 'icon': return 'btn-ghost btn-icon-only';
      default: return 'btn-primary';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'btn-xs';
      case 'sm': return 'btn-sm';
      case 'md': return 'btn-md';
      case 'lg': return 'btn-lg';
      default: return 'btn-md';
    }
  };

  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`btn ${getVariantClass()} ${getSizeClass()} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
      {iconRight && <span className="btn-icon-right">{iconRight}</span>}
    </motion.button>
  );
};
