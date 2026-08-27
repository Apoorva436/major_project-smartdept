import React from 'react';

export const Table = ({
  columns = [],
  data = [],
  keyField = 'id',
  onRowClick,
  emptyMessage = 'No records found',
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="state-container">
        <p className="state-description">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                style={{
                  width: col.width,
                  textAlign: col.align || 'left',
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr
              key={row[keyField] || rIdx}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map((col, cIdx) => (
                <td
                  key={col.key || cIdx}
                  style={{ textAlign: col.align || 'left' }}
                >
                  {col.render
                    ? col.render(row[col.key], row, rIdx)
                    : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
