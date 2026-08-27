import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

export const BarChartWidget = ({
  data = [],
  xKey = 'category',
  bars = [
    { key: 'allocated', name: 'Allocated ($)', color: '#4F6EF7' },
    { key: 'spent', name: 'Spent ($)', color: '#10B981' },
  ],
  height = 240,
  layout = 'horizontal', // 'horizontal' | 'vertical'
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
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: entry.color }} />
              <span style={{ color: isDark ? '#CBD5E1' : '#475569' }}>{entry.name}:</span>
              <span style={{ fontWeight: 600 }}>{entry.value.toLocaleString()}</span>
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
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 10, right: 10, left: layout === 'vertical' ? 10 : -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={layout === 'vertical'} horizontal={layout === 'horizontal'} stroke={gridColor} />
          {layout === 'horizontal' ? (
            <>
              <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} />
            </>
          ) : (
            <>
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} />
              <YAxis type="category" dataKey={xKey} axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} width={90} />
            </>
          )}
          <Tooltip content={<CustomTooltip />} />
          {bars.map((b) => (
            <Bar
              key={b.key}
              dataKey={b.key}
              name={b.name}
              fill={b.color}
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
