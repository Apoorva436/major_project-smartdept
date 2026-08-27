import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Sparkles, Calendar, DollarSign, Users, MapPin } from 'lucide-react';

export const NewActivityModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: 'Computer Science',
    type: 'Workshop',
    date: '2026-09-15',
    venue: 'Auditorium A',
    budget: '3500',
    participants: '150',
    facultyLead: 'Dr. Sarah Jenkins',
    status: 'Pending Approval',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onCreated) {
        onCreated({
          ...formData,
          id: `ACT-${Math.floor(1000 + Math.random() * 9000)}`,
        });
      }
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Department Activity"
      subtitle="Define, budget, and route for automated approval"
      maxWidth="580px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <Sparkles size={13} color="#8B5CF6" />
            <span>AI conflict detection active</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSubmit} disabled={isSubmitting || !formData.title}>
              {isSubmitting ? 'Creating Activity...' : 'Submit Request'}
            </Button>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <Input
          label="Activity Title *"
          placeholder="e.g. International AI & Robotics Summit 2026"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="form-group">
            <label className="form-label">Activity Type</label>
            <select
              className="form-input"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Workshop">Hands-on Workshop</option>
              <option value="Conference">International Conference</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Guest Lecture">Guest Lecture / Seminar</option>
              <option value="Industrial Visit">Industrial Visit</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Department</label>
            <select
              className="form-input"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Information Science">Information Science</option>
              <option value="Electronics & Comm.">Electronics & Comm.</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input
            label="Date of Event"
            type="date"
            icon={<Calendar size={14} />}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <Input
            label="Venue / Hall"
            icon={<MapPin size={14} />}
            placeholder="e.g. Auditorium A"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input
            label="Estimated Budget ($)"
            icon={<DollarSign size={14} />}
            type="number"
            placeholder="3500"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />

          <Input
            label="Expected Participants"
            icon={<Users size={14} />}
            type="number"
            placeholder="150"
            value={formData.participants}
            onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Faculty Coordinator / Lead</label>
          <select
            className="form-input"
            value={formData.facultyLead}
            onChange={(e) => setFormData({ ...formData, facultyLead: e.target.value })}
          >
            <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Associate Professor)</option>
            <option value="Prof. David Chen">Prof. David Chen (Assistant Professor)</option>
            <option value="Dr. Maya Patel">Dr. Maya Patel (Professor)</option>
            <option value="Prof. Amit Rao">Prof. Amit Rao (Faculty Coordinator)</option>
          </select>
        </div>
      </form>
    </Modal>
  );
};
