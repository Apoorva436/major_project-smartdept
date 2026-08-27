import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard = ({
  label,
  value,
  subtitle,
  trend,
  trendDirection = 'up',
  icon,
  className = '',
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`stat-card ${className}`}
      onClick={onClick}
    >
      <div className="stat-card-top">
        <span className="stat-card-label">{label}</span>
        {icon && <div className="stat-card-icon">{icon}</div>}
      </div>

      <div className="stat-card-value-group">
        <span className="stat-card-value">{value}</span>
        {trend !== undefined && (
          <span className={`stat-card-trend ${trendDirection}`}>
            {trendDirection === 'up' && <TrendingUp size={12} />}
            {trendDirection === 'down' && <TrendingDown size={12} />}
            {trendDirection === 'neutral' && <Minus size={12} />}
            {trend > 0 ? `+${trend}%` : `${trend}%`}
          </span>
        )}
      </div>

      {subtitle && <span className="stat-card-subtitle">{subtitle}</span>}
    </motion.div>
  );
};
