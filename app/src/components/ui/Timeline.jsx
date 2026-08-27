import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Calendar, Sparkles } from 'lucide-react';

export const Timeline = ({ items = [], className = '' }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'approved':
      case 'completed':
        return <CheckCircle2 size={14} className="text-success" color="#10B981" />;
      case 'pending':
        return <Clock size={14} color="#F59E0B" />;
      case 'rejected':
        return <AlertCircle size={14} color="#EF4444" />;
      case 'scheduled':
        return <Calendar size={14} color="#6366F1" />;
      default:
        return <Sparkles size={14} color="#4F6EF7" />;
    }
  };

  return (
    <div className={`timeline-list ${className}`}>
      {items.map((item, idx) => (
        <div key={item.id || idx} className="timeline-item">
          <div className="timeline-track">
            <div className={`timeline-dot ${item.type === 'approved' ? 'active' : ''}`}>
              {item.icon || getIcon(item.type)}
            </div>
            <div className="timeline-line" />
          </div>

          <div className="timeline-content">
            <div className="timeline-title">{item.title}</div>
            {item.desc && <div className="timeline-desc">{item.desc}</div>}
            <div className="timeline-time">
              {item.time} {item.user && `• by ${item.user}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
