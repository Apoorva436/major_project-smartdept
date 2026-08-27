import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Calendar,
  Users,
  Wallet,
  Package,
  FileCheck,
  Send,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Building,
  Shield,
  Layers,
  Award,
} from 'lucide-react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { ACTIVITY_TYPES } from '../../data/activityManagementData';

export const ActivityCreationWizard = ({ onCancel, onSubmitSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State covering all specified fields
  const [formData, setFormData] = useState({
    // 1. Basic Information
    title: '',
    description: '',
    category: 'Workshop',
    coordinator: 'Dr. Sarah Jenkins',
    coordinatorEmail: 'sarah.jenkins@smartdept.edu',
    coordinatorRole: 'Associate Professor',
    department: 'Computer Science & Engineering',
    academicYear: '2026-2027',
    semester: 'Semester 7 (Fall)',

    // 2. Schedule
    date: '2026-09-18 to 2026-09-19',
    startTime: '09:30 AM',
    endTime: '04:30 PM',
    venue: 'Main Auditorium A & Tech Lab 2',

    // 3. Participation
    targetStudents: '3rd & 4th Year B.Tech (CSE, ISE, AI/DS)',
    maxParticipants: 120,
    eligibility: 'Min 75% department attendance and core prerequisite clearance.',

    // 4. Budget
    estimatedBudget: 4500,
    fundingSource: 'Department Innovation Grant & Student Chapter',

    // 5. Resources
    requiredRoom: 'Main Auditorium A (Morning) + Lab 2 (Afternoon)',
    equipment: '4K Projector, Wireless Lapel Mic, 60 GPU Workstations, 1 Gbps LAN',
    transport: 'Airport pickup for keynote speaker (Car arrangement)',
    otherResources: 'Delegate kits, High tea & Snacks (120 pax), Participation Certificates',

    // 6. Documents
    proposalFile: 'Activity_Proposal_Document_v1.pdf',
    permissionLetter: 'Auditorium_A_Venue_Clearance.pdf',
    supportingDocs: 'Guest_Speaker_CV_and_Topic_Overview.pdf',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { id: 1, label: 'Basic Info', icon: <FileText size={15} /> },
    { id: 2, label: 'Schedule', icon: <Calendar size={15} /> },
    { id: 3, label: 'Participation', icon: <Users size={15} /> },
    { id: 4, label: 'Budget', icon: <Wallet size={15} /> },
    { id: 5, label: 'Resources', icon: <Package size={15} /> },
    { id: 6, label: 'Documents', icon: <FileCheck size={15} /> },
    { id: 7, label: 'Approval Workflow', icon: <Send size={15} /> },
  ];

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newActivity = {
        id: `ACT-2026-${Math.floor(100 + Math.random() * 900)}`,
        ...formData,
        lifecycleStage: 'submitted',
        status: 'Pending Approval',
        enrolledCount: 0,
        spentBudget: 0,
        createdAt: 'Just now',
        updatedAt: 'Just now',
        approvals: [
          {
            role: 'Faculty Coordinator',
            name: formData.coordinator,
            status: 'Approved',
            date: 'Just now',
            remarks: 'Submitted for department review.',
          },
          {
            role: 'Head of Department (HOD)',
            name: 'Dr. Kumar V.',
            status: 'Pending',
            date: 'Awaiting Action',
            remarks: 'Queued for HOD budget sign-off.',
          },
          {
            role: 'Dean / Principal Office',
            name: 'Prof. R. Radhakrishnan',
            status: 'Pending',
            date: 'Awaiting Action',
            remarks: 'Will route following HOD clearance.',
          },
        ],
        timeline: [
          { date: 'Today', time: 'Just now', title: 'Activity Proposal Created & Submitted', user: formData.coordinator },
        ],
        participantsList: [],
        attendanceStats: { registered: 0, presentDay1: 0, averagePercentage: 0 },
        budgetItems: [
          { category: 'Honorarium & Speaker Fee', allocated: Math.round(formData.estimatedBudget * 0.5), spent: 0, status: 'Estimated' },
          { category: 'Catering & Refreshments', allocated: Math.round(formData.estimatedBudget * 0.3), spent: 0, status: 'Estimated' },
          { category: 'Kits & Printing', allocated: Math.round(formData.estimatedBudget * 0.2), spent: 0, status: 'Estimated' },
        ],
        documents: [
          { name: formData.proposalFile, type: 'Proposal', size: '2.4 MB', date: 'Today' },
          { name: formData.permissionLetter, type: 'Permission Letter', size: '980 KB', date: 'Today' },
        ],
        feedbackScore: 0,
        feedbackResponses: 0,
        feedbackBreakdown: [],
        reportsAvailable: [],
      };

      if (onSubmitSuccess) {
        onSubmitSuccess(newActivity);
      }
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      style={{ maxWidth: '920px', margin: '0 auto' }}
    >
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-primary">Activity Management</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Step {currentStep} of 7</span>
          </div>
          <h1 className="page-title" style={{ marginTop: '4px' }}>Create New Department Activity</h1>
          <p className="page-subtitle">
            Configure metadata, timetable, resource reservation, and multi-tier approval routing.
          </p>
        </div>

        {onCancel && (
          <Button variant="secondary" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>

      {/* Progress Navigation Stepper */}
      <div
        style={{
          display: 'flex',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '8px 12px',
          marginBottom: 'var(--space-5)',
          overflowX: 'auto',
          gap: '4px',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setCurrentStep(step.id)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isCurrent
                  ? 'rgba(79, 110, 247, 0.12)'
                  : isCompleted
                  ? 'var(--bg-surface-hover)'
                  : 'transparent',
                color: isCurrent
                  ? 'var(--color-brand-primary)'
                  : isCompleted
                  ? 'var(--text-primary)'
                  : 'var(--text-muted)',
                fontWeight: isCurrent ? 700 : isCompleted ? 600 : 500,
                fontSize: '12px',
                border: isCurrent ? '1px solid rgba(79, 110, 247, 0.25)' : '1px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
              }}
            >
              <span
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  backgroundColor: isCurrent
                    ? 'var(--color-brand-primary)'
                    : isCompleted
                    ? '#10B981'
                    : 'var(--bg-muted)',
                  color: isCurrent || isCompleted ? '#FFFFFF' : 'var(--text-muted)',
                }}
              >
                {isCompleted ? '✓' : step.id}
              </span>
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Step Form Content */}
      <Card>
        <form onSubmit={handleSubmit}>
          <CardBody style={{ padding: '28px' }}>
            <AnimatePresence mode="wait">
              {/* STEP 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '12px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>1. Basic Information</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Core identity and academic classification for the activity</p>
                  </div>

                  <Input
                    label="Activity Title *"
                    placeholder="e.g. Next-Generation Cloud & Kubernetes Workshop 2026"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    required
                  />

                  <div className="form-group">
                    <label className="form-label">Activity Description & Learning Outcomes *</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      style={{ height: 'auto', padding: '10px 12px' }}
                      placeholder="Describe the objective, target curriculum alignment, and expected hands-on takeaways..."
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Activity Category (14 Types) *</label>
                      <select
                        className="form-input"
                        value={formData.category}
                        onChange={(e) => updateField('category', e.target.value)}
                      >
                        {ACTIVITY_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Department *</label>
                      <select
                        className="form-input"
                        value={formData.department}
                        onChange={(e) => updateField('department', e.target.value)}
                      >
                        <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                        <option value="Information Science & Engineering">Information Science & Engineering</option>
                        <option value="Electronics & Communication">Electronics & Communication</option>
                        <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <Input
                      label="Faculty Coordinator *"
                      value={formData.coordinator}
                      onChange={(e) => updateField('coordinator', e.target.value)}
                      required
                    />

                    <div className="form-group">
                      <label className="form-label">Academic Year *</label>
                      <select
                        className="form-input"
                        value={formData.academicYear}
                        onChange={(e) => updateField('academicYear', e.target.value)}
                      >
                        <option value="2026-2027">2026-2027</option>
                        <option value="2025-2026">2025-2026</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Semester *</label>
                      <select
                        className="form-input"
                        value={formData.semester}
                        onChange={(e) => updateField('semester', e.target.value)}
                      >
                        <option value="Semester 7 (Fall)">Semester 7 (Fall)</option>
                        <option value="Semester 5 (Fall)">Semester 5 (Fall)</option>
                        <option value="Semester 3 (Fall)">Semester 3 (Fall)</option>
                        <option value="Semester 1 (Fall)">Semester 1 (Fall)</option>
                        <option value="Even Semesters (Spring)">Even Semesters (Spring)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Schedule */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '12px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>2. Event Schedule & Venue</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Timing, dates, and physical or virtual room reservation</p>
                  </div>

                  <Input
                    label="Date / Date Range *"
                    icon={<Calendar size={14} />}
                    placeholder="e.g. 2026-09-18 to 2026-09-19"
                    value={formData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    required
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Input
                      label="Start Time *"
                      icon={<Clock size={14} />}
                      placeholder="09:30 AM"
                      value={formData.startTime}
                      onChange={(e) => updateField('startTime', e.target.value)}
                      required
                    />

                    <Input
                      label="End Time *"
                      icon={<Clock size={14} />}
                      placeholder="04:30 PM"
                      value={formData.endTime}
                      onChange={(e) => updateField('endTime', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Venue / Room Name *</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <select
                        className="form-input"
                        value={formData.venue}
                        onChange={(e) => updateField('venue', e.target.value)}
                      >
                        <option value="Main Auditorium A & Tech Lab 2">Main Auditorium A & Tech Lab 2</option>
                        <option value="Main Auditorium A (500 Cap)">Main Auditorium A (500 Cap)</option>
                        <option value="Seminar Hall 1 (150 Cap)">Seminar Hall 1 (150 Cap)</option>
                        <option value="Computer Lab 4 (Cloud Lab)">Computer Lab 4 (Cloud Lab)</option>
                        <option value="Innovation Hub Arena">Innovation Hub Arena</option>
                        <option value="Department Conference Room 1">Department Conference Room 1</option>
                        <option value="Virtual Zoom / MS Teams Room">Virtual Zoom / MS Teams Room</option>
                        <option value="Off-Campus Industry Site">Off-Campus Industry Site</option>
                      </select>
                    </div>
                    <span style={{ fontSize: '11px', color: '#10B981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={12} /> AI Conflict Detector: Venue is verified available on selected dates
                    </span>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Participation */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '12px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>3. Participant Target & Criteria</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Target batches, capacity limits, and prerequisites</p>
                  </div>

                  <Input
                    label="Target Student Groups / Batches *"
                    placeholder="e.g. 3rd & 4th Year B.Tech (CSE, ISE, AI/DS)"
                    value={formData.targetStudents}
                    onChange={(e) => updateField('targetStudents', e.target.value)}
                    required
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Input
                      label="Maximum Participants / Seat Capacity *"
                      type="number"
                      icon={<Users size={14} />}
                      placeholder="120"
                      value={formData.maxParticipants}
                      onChange={(e) => updateField('maxParticipants', parseInt(e.target.value, 10) || 0)}
                      required
                    />

                    <div className="form-group">
                      <label className="form-label">Registration Mode</label>
                      <select className="form-input">
                        <option>Open Institutional Registration (First-Come)</option>
                        <option>Curated / Shortlisted by CGPA & Prerequisite</option>
                        <option>Mandatory Department Batch</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Eligibility Criteria & Prerequisites *</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      style={{ height: 'auto', padding: '10px 12px' }}
                      placeholder="e.g. Minimum 75% attendance in semester, basic Python/Linux knowledge..."
                      value={formData.eligibility}
                      onChange={(e) => updateField('eligibility', e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Budget */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '12px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>4. Budget & Funding Source</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Financial sanction, expense heads, and sponsor allocation</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Input
                      label="Estimated Budget ($ USD) *"
                      type="number"
                      icon={<Wallet size={14} />}
                      placeholder="4500"
                      value={formData.estimatedBudget}
                      onChange={(e) => updateField('estimatedBudget', parseFloat(e.target.value) || 0)}
                      required
                    />

                    <div className="form-group">
                      <label className="form-label">Primary Funding Source *</label>
                      <select
                        className="form-input"
                        value={formData.fundingSource}
                        onChange={(e) => updateField('fundingSource', e.target.value)}
                      >
                        <option value="Department Innovation Grant & Student Chapter">Department Innovation Grant & Student Chapter</option>
                        <option value="Q3 Department Operational Fund">Q3 Department Operational Fund</option>
                        <option value="IEEE / ACM Student Chapter Sponsorship">IEEE / ACM Student Chapter Sponsorship</option>
                        <option value="Corporate Industry Sponsorship (Google / AWS)">Corporate Industry Sponsorship (Google / AWS)</option>
                        <option value="Student Registration Fee Pool">Student Registration Fee Pool</option>
                        <option value="Institutional Research & Development Grant">Institutional Research & Development Grant</option>
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(79, 110, 247, 0.06)',
                      border: '1px solid rgba(79, 110, 247, 0.2)',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-brand-primary)', marginBottom: '8px' }}>
                      Automated Approval Threshold Check
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Budget of <strong>${formData.estimatedBudget.toLocaleString()}</strong> falls under{' '}
                      <strong>{formData.estimatedBudget > 2500 ? 'Tier 2 (Requires Direct HOD Approval)' : 'Tier 1 (Single-step Approval)'}</strong>.
                      All expense ledger line items will be audited against department Q3 accounts.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Resources */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '12px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>5. Physical & IT Resources</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Room specifications, AV/Computing equipment, and logistics</p>
                  </div>

                  <Input
                    label="Required Rooms / Labs *"
                    placeholder="e.g. Main Auditorium A (Morning) + Lab 2 (Afternoon)"
                    value={formData.requiredRoom}
                    onChange={(e) => updateField('requiredRoom', e.target.value)}
                    required
                  />

                  <Input
                    label="Required Equipment & IT Infrastructure *"
                    placeholder="e.g. 4K Projector, Wireless Lapel Mic, 60 GPU Workstations, 1 Gbps LAN"
                    value={formData.equipment}
                    onChange={(e) => updateField('equipment', e.target.value)}
                    required
                  />

                  <Input
                    label="Transport Logistics"
                    placeholder="e.g. Airport pickup for keynote speaker (Car arrangement)"
                    value={formData.transport}
                    onChange={(e) => updateField('transport', e.target.value)}
                  />

                  <Input
                    label="Other Department Resources"
                    placeholder="e.g. Delegate kits, High tea & Snacks (120 pax), Participation Certificates"
                    value={formData.otherResources}
                    onChange={(e) => updateField('otherResources', e.target.value)}
                  />
                </motion.div>
              )}

              {/* STEP 6: Documents */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '12px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>6. Supporting Documents & Proposals</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Attach formal proposals, guest CVs, and venue permission requests</p>
                  </div>

                  {[
                    { label: 'Activity Proposal Document *', file: formData.proposalFile, desc: 'Detailed itinerary, curriculum goals & speaker biodata' },
                    { label: 'Venue / Hall Permission Letter *', file: formData.permissionLetter, desc: 'Auditorium / Lab booking clearance slip' },
                    { label: 'Supporting Documents & Sponsorship MOU', file: formData.supportingDocs, desc: 'IEEE grant approvals, sponsor commitments' },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      style={{
                        border: '1px dashed var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '16px',
                        backgroundColor: 'var(--bg-surface-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(79, 110, 247, 0.1)',
                            color: 'var(--color-brand-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <FileText size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.label}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.desc}</div>
                          <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-brand-primary)', marginTop: '2px' }}>
                            Attached: {doc.file}
                          </div>
                        </div>
                      </div>

                      <Button variant="secondary" size="xs" icon={<Upload size={12} />} onClick={(e) => { e.preventDefault(); alert(`Re-uploading ${doc.label}`); }}>
                        Change File
                      </Button>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* STEP 7: Approval Workflow Preview */}
              {currentStep === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '12px', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>7. Approval Workflow Routing Preview</h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Automated pipeline routing based on category, budget, and venue</p>
                  </div>

                  {/* Summary Card */}
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-hover)',
                      border: '1px solid var(--border-color)',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Activity Title</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{formData.title || 'Untitled Activity'}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Category & Department</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {formData.category} • {formData.department}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Schedule & Venue</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                        {formData.date} ({formData.startTime} - {formData.endTime}) @ {formData.venue}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Sanction Amount & Capacity</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                        ${formData.estimatedBudget.toLocaleString()} • {formData.maxParticipants} Seats
                      </div>
                    </div>
                  </div>

                  {/* Visual Route */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Automated Approval Route:
                    </div>

                    {[
                      { step: '1', role: 'Faculty Coordinator Submission', actor: formData.coordinator, status: 'Ready for Dispatch' },
                      { step: '2', role: 'Head of Department (HOD) Clearance', actor: 'Dr. Kumar V. (CSE)', status: 'Queued' },
                      { step: '3', role: 'Dean / Principal Institutional Approval', actor: 'Prof. R. Radhakrishnan', status: 'Queued' },
                    ].map((route, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '12px 16px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-card)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              backgroundColor: i === 0 ? 'var(--color-brand-primary)' : 'var(--bg-muted)',
                              color: i === 0 ? '#FFFFFF' : 'var(--text-muted)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 700,
                            }}
                          >
                            {route.step}
                          </span>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{route.role}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{route.actor}</div>
                          </div>
                        </div>

                        <Badge status={i === 0 ? 'approved' : 'pending'}>{route.status}</Badge>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardBody>

          {/* Form Actions Footer */}
          <CardFooter style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 28px' }}>
            <Button
              variant="secondary"
              size="sm"
              icon={<ChevronLeft size={15} />}
              onClick={handlePrev}
              disabled={currentStep === 1 || isSubmitting}
            >
              Previous
            </Button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {currentStep < 7 ? (
                <Button
                  variant="primary"
                  size="sm"
                  iconRight={<ChevronRight size={15} />}
                  onClick={handleNext}
                  disabled={currentStep === 1 && !formData.title}
                >
                  Continue to {steps[currentStep].label}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  icon={<Send size={15} />}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Routing Activity...' : 'Submit Activity Proposal'}
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};
