import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

export const AreaChartWidget = ({
  data = [],
  xKey = 'month',
  series = [
    { key: 'activities', name: 'Total Activities', color: '#4F6EF7' },
    { key: 'approved', name: 'Approved', color: '#10B981' },
  ],
  height = 240,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? '#1F293D' : '#F1F5F9';
  const textColor = isDark ? '#94A3B8' : '#64748B';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            border: `1px solid ${isDark ? '#1F293D' : '#E2E8F0'}`,
            borderRadius: '8px',
            padding: '8px 12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '12px',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '4px', color: isDark ? '#F8FAFC' : '#0F172A' }}>
            {label}
          </div>
          {payload.map((entry, index) => (
            <div
              key={`item-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: entry.color,
                marginTop: '2px',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color }} />
              <span style={{ color: isDark ? '#CBD5E1' : '#475569' }}>{entry.name}:</span>
              <span style={{ fontWeight: 600 }}>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={s.color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={s.color} stopOpacity={0.0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: textColor, fontSize: 11 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: textColor, fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${s.key})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
