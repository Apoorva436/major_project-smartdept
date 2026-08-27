import React from 'react';

export const Skeleton = ({ width, height, borderRadius, className = '', style = {} }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

export const SkeletonCard = () => (
  <div className="card" style={{ padding: 'var(--space-5)' }}>
    <Skeleton height="16px" width="40%" style={{ marginBottom: '12px' }} />
    <Skeleton height="32px" width="60%" style={{ marginBottom: '16px' }} />
    <Skeleton height="12px" width="80%" />
  </div>
);

export const SkeletonTable = ({ rows = 4, cols = 4 }) => (
  <div className="table-container">
    <table className="data-table">
      <thead>
        <tr>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i}>
              <Skeleton height="14px" width="60%" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: cols }).map((_, c) => (
              <td key={c}>
                <Skeleton height="16px" width={c === 0 ? '80%' : '50%'} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
