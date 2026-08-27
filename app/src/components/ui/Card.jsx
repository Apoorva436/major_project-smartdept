import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  ...props
}) => {
  return (
    <div
      className={`card ${hoverable ? 'card-hover' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ title, subtitle, action, children, className = '' }) => {
  return (
    <div className={`card-header ${className}`}>
      {(title || subtitle) ? (
        <div className="card-title-group">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      ) : null}
      {children}
      {action && <div className="card-header-action">{action}</div>}
    </div>
  );
};

export const CardBody = ({ children, className = '' }) => {
  return <div className={`card-body ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
  return <div className={`card-footer ${className}`}>{children}</div>;
};
