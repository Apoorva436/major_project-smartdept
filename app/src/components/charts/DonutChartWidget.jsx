import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

export const DonutChartWidget = ({
  data = [],
  dataKey = 'value',
  nameKey = 'name',
  colors = ['#10B981', '#4F6EF7', '#F59E0B', '#EF4444', '#8B5CF6'],
  innerRadius = 60,
  outerRadius = 80,
  centerLabel,
  centerSub,
  height = 220,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      return (
        <div
          style={{
            backgroundColor: isDark ? '#111827' : '#FFFFFF',
            border: `1px solid ${isDark ? '#1F293D' : '#E2E8F0'}`,
            borderRadius: '8px',
            padding: '6px 10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.payload.fill }} />
            <span style={{ color: isDark ? '#CBD5E1' : '#475569' }}>{entry.name}:</span>
            <span style={{ fontWeight: 600, color: isDark ? '#F8FAFC' : '#0F172A' }}>{entry.value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={3}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || colors[index % colors.length]} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {(centerLabel || centerSub) && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          {centerLabel && (
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {centerLabel}
            </div>
          )}
          {centerSub && (
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {centerSub}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
