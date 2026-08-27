import React from 'react';

export const Avatar = ({
  name = 'User',
  src,
  size = 'md',
  status, // 'online' | 'busy' | 'away'
  className = '',
}) => {
  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'avatar-xs';
      case 'sm': return 'avatar-sm';
      case 'lg': return 'avatar-lg';
      case 'md':
      default: return 'avatar-md';
    }
  };

  return (
    <div className={`avatar ${getSizeClass()} ${className}`}>
      {src ? (
        <img src={src} alt={name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
      ) : (
        <span>{getInitials(name)}</span>
      )}
      {status && <span className={`avatar-status-dot ${status}`} />}
    </div>
  );
};
