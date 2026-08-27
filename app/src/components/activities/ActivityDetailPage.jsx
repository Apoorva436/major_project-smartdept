import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  CheckCircle2,
  Users,
  UserCheck,
  Wallet,
  FileCode,
  Sparkles,
  Award,
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Mail,
  Download,
  Check,
  X,
  QrCode,
  Share2,
  Edit,
  PlusCircle,
  FileSpreadsheet,
  AlertCircle,
  Printer,
  ChevronRight,
  Star,
  ExternalLink,
} from 'lucide-react';
import { ActivityLifecycleBar } from './ActivityLifecycleBar';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Table } from '../ui/Table';
import { Tabs } from '../ui/Tabs';
import { DonutChartWidget } from '../charts/DonutChartWidget';
import { BarChartWidget } from '../charts/BarChartWidget';

export const ActivityDetailPage = ({ activity, onBack, onUpdateActivity }) => {
  const [currentActivity, setCurrentActivity] = useState(activity);
  const [activeTab, setActiveTab] = useState('overview');
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [participants, setParticipants] = useState(currentActivity.participantsList || []);
  const [approvals, setApprovals] = useState(currentActivity.approvals || []);

  const handleStageChange = (newStage) => {
    let newStatus = 'Scheduled';
    if (newStage === 'draft') newStatus = 'Draft';
    if (newStage === 'submitted' || newStage === 'under_review') newStatus = 'Pending Approval';
    if (newStage === 'approved') newStatus = 'Approved';
    if (newStage === 'ongoing') newStatus = 'Ongoing';
    if (newStage === 'completed' || newStage === 'report_generated') newStatus = 'Completed';

    const updated = {
      ...currentActivity,
      lifecycleStage: newStage,
      status: newStatus,
    };
    setCurrentActivity(updated);
    if (onUpdateActivity) onUpdateActivity(updated);
  };

  const handleApproveStep = (idx) => {
    const updatedApprovals = [...approvals];
    updatedApprovals[idx] = {
      ...updatedApprovals[idx],
      status: 'Approved',
      date: 'Just now (Approved by Dr. Kumar V.)',
      remarks: 'Sanctioned and verified by Department Head.',
    };
    setApprovals(updatedApprovals);
    handleStageChange('approved');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FileText size={14} /> },
    { id: 'timeline', label: 'Timeline', icon: <Clock size={14} /> },
    { id: 'approvals', label: 'Approvals', icon: <CheckCircle2 size={14} />, badge: approvals.filter(a => a.status === 'Pending').length || undefined },
    { id: 'participants', label: 'Participants', icon: <Users size={14} />, badge: `${participants.length}` },
    { id: 'attendance', label: 'Attendance', icon: <UserCheck size={14} /> },
    { id: 'budget', label: 'Budget', icon: <Wallet size={14} /> },
    { id: 'documents', label: 'Documents', icon: <FileCode size={14} />, badge: `${currentActivity.documents?.length || 0}` },
    { id: 'feedback', label: 'Feedback', icon: <Star size={14} /> },
    { id: 'reports', label: 'Reports', icon: <Award size={14} /> },
  ];

  const participantColumns = [
    {
      key: 'name',
      title: 'Student Name',
      render: (val, r) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{r.email}</div>
        </div>
      ),
    },
    { key: 'usn', title: 'Roll / USN' },
    { key: 'branch', title: 'Branch & Sem', render: (val, r) => `${val} (${r.sem})` },
    { key: 'date', title: 'Registration Date' },
    {
      key: 'status',
      title: 'Status',
      render: (val) => <Badge status={val === 'Confirmed' || val === 'Checked In' || val === 'Attended' ? 'approved' : 'pending'}>{val}</Badge>,
    },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {/* Top Navigation & Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '12px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            background: 'transparent',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Activities</span>
        </button>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Button variant="secondary" size="sm" icon={<Share2 size={14} />} onClick={() => alert('Shareable link copied to clipboard.')}>
            Share Link
          </Button>

          <Button variant="secondary" size="sm" icon={<Printer size={14} />} onClick={() => window.print()}>
            Print Brief
          </Button>

          <Button variant="primary" size="sm" icon={<QrCode size={14} />} onClick={() => setQrModalOpen(true)}>
            Attendance QR
          </Button>
        </div>
      </div>

      {/* Activity Hero Banner */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          marginBottom: 'var(--space-5)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{currentActivity.category}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {currentActivity.id}</span>
              <Badge status={currentActivity.status}>{currentActivity.status}</Badge>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              {currentActivity.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={15} color="var(--color-brand-primary)" />
                <span>{currentActivity.date} ({currentActivity.startTime} - {currentActivity.endTime})</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <MapPin size={15} color="var(--color-brand-primary)" />
                <span>{currentActivity.venue}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Building size={15} color="var(--color-brand-primary)" />
                <span>{currentActivity.department}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '20px', borderLeft: '1px solid var(--border-color)', paddingLeft: '24px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Enrollment</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {currentActivity.enrolledCount} <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>/ {currentActivity.maxParticipants}</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Budget Sanction</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--color-brand-primary)' }}>
                ${(currentActivity.estimatedBudget || 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Lifecycle Stepper Pipeline */}
      <ActivityLifecycleBar
        currentStage={currentActivity.lifecycleStage || 'scheduled'}
        onStageChange={handleStageChange}
      />

      {/* 9 Tabs Navigation */}
      <Card style={{ marginBottom: 'var(--space-6)' }}>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <CardBody style={{ padding: '24px' }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  About this Activity
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {currentActivity.description}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Coordinator In-Charge</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{currentActivity.coordinator}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{currentActivity.coordinatorRole}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-brand-primary)', marginTop: '4px' }}>{currentActivity.coordinatorEmail}</div>
                </div>

                <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Target Audience & Eligibility</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{currentActivity.targetStudents}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{currentActivity.eligibility}</div>
                </div>

                <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Resources & Infrastructure</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}><strong>Rooms:</strong> {currentActivity.requiredRoom}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}><strong>IT:</strong> {currentActivity.equipment}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}><strong>Logistics:</strong> {currentActivity.otherResources}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINE */}
          {activeTab === 'timeline' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Activity Event History & Lifecycle Milestones</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Immutable log of creation, review sign-offs, and live session updates</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {(currentActivity.timeline || []).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(79, 110, 247, 0.1)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <div style={{ flex: 1, paddingBottom: '14px', borderBottom: '1px solid var(--border-color-subtle)' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.date} at {item.time} • Recorded by <strong>{item.user}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: APPROVALS */}
          {activeTab === 'approvals' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Multi-Tier Approval Hierarchy</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Faculty Coordinator → Head of Department → Dean Academic Clearance</p>
                </div>
                <span className="badge badge-approved">Policy Rule: Tier 2 Active</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {approvals.map((appr, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: appr.status === 'Approved' ? 'rgba(16, 185, 129, 0.04)' : 'var(--bg-surface-hover)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{appr.role}</span>
                        <Badge status={appr.status === 'Approved' ? 'approved' : 'pending'}>{appr.status}</Badge>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {appr.name} • {appr.date}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', fontStyle: 'italic' }}>
                        "{appr.remarks}"
                      </div>
                    </div>

                    {appr.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Button variant="danger-ghost" size="xs">
                          Reject
                        </Button>
                        <Button variant="success" size="xs" icon={<Check size={12} />} onClick={() => handleApproveStep(idx)}>
                          Approve Sign-off
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PARTICIPANTS */}
          {activeTab === 'participants' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Enrolled Students Roster</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{participants.length} students confirmed for this event</p>
                </div>
                <Button variant="secondary" size="xs" icon={<FileSpreadsheet size={13} />} onClick={() => alert('Exporting participant CSV...')}>
                  Export CSV
                </Button>
              </div>

              <Table columns={participantColumns} data={participants} keyField="id" />
            </div>
          )}

          {/* TAB 5: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Live Attendance & QR Sync</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Contactless check-in with geo-fenced token verification</p>
                </div>
                <Button variant="primary" size="sm" icon={<QrCode size={14} />} onClick={() => setQrModalOpen(true)}>
                  Show Active QR Code
                </Button>
              </div>

              <div className="dashboard-row-2col">
                <Card>
                  <CardHeader title="Attendance Distribution" subtitle="Calculated from scan checkpoints" />
                  <CardBody>
                    <DonutChartWidget
                      data={[
                        { name: 'Present (Day 1)', value: currentActivity.attendanceStats?.presentDay1 || 0, color: '#10B981' },
                        { name: 'Absent / Excused', value: (currentActivity.enrolledCount || 10) - (currentActivity.attendanceStats?.presentDay1 || 0), color: '#CBD5E1' },
                      ]}
                      centerLabel={`${currentActivity.attendanceStats?.averagePercentage || 96}%`}
                      centerSub="Sync Rate"
                      height={200}
                    />
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader title="Session Checkpoints" subtitle="Individual day attendance tallies" />
                  <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color-subtle)' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13px' }}>Session Day 1 (Morning Keynote)</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>09:30 AM - Verified via QR Scanner</div>
                        </div>
                        <span className="badge badge-approved">298 Checked In</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color-subtle)' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '13px' }}>Session Day 2 (Lab Hands-on)</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>02:00 PM - Verified via SmartDept RFID</div>
                        </div>
                        <span className="badge badge-approved">294 Checked In</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 6: BUDGET */}
          {activeTab === 'budget' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Financial Breakdown & Expense Ledger</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Sanctioned: <strong>${(currentActivity.estimatedBudget || 0).toLocaleString()}</strong> • Committed: <strong>${(currentActivity.spentBudget || 0).toLocaleString()}</strong>
                  </p>
                </div>
                <Button variant="secondary" size="xs" icon={<PlusCircle size={13} />} onClick={() => alert('Add expense line item')}>
                  Add Expense Claim
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(currentActivity.budgetItems || []).map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-hover)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.category}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status: {item.status}</div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>${item.allocated.toLocaleString()}</div>
                      <div style={{ fontSize: '11px', color: 'var(--color-brand-primary)' }}>Spent: ${item.spent.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Attached Documents & Permission Slips</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Proposals, room booking clearances, and sponsorship MOUs</p>
                </div>
                <Button variant="primary" size="xs" icon={<PlusCircle size={13} />} onClick={() => alert('Upload supporting file')}>
                  Upload Document
                </Button>
              </div>

              <div style={{ display: 'grid', gap: '10px' }}>
                {(currentActivity.documents || []).map((doc, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-surface-hover)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileCode size={20} color="var(--color-brand-primary)" />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.type} • {doc.size} • Uploaded {doc.date}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="xs" icon={<Download size={14} />} onClick={() => alert(`Downloading ${doc.name}`)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: FEEDBACK */}
          {activeTab === 'feedback' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Student & Participant Feedback Score</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Automated feedback surveys dispatched at session completion</p>
              </div>

              <div className="dashboard-row-2col">
                <Card>
                  <CardHeader title="Overall Satisfaction Rating" subtitle="Calculated from survey responses" />
                  <CardBody style={{ textAlign: 'center', padding: '24px' }}>
                    <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-brand-primary)', lineHeight: 1 }}>
                      {currentActivity.feedbackScore || '4.88'}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '8px 0' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={18} fill="#F59E0B" color="#F59E0B" />
                      ))}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Based on {currentActivity.feedbackResponses || 274} verified student reviews
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardHeader title="Rating Breakdown" subtitle="Percentage distribution" />
                  <CardBody>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(currentActivity.feedbackBreakdown || [
                        { rating: '5 Stars', percentage: 85 },
                        { rating: '4 Stars', percentage: 12 },
                        { rating: '3 Stars', percentage: 3 },
                      ]).map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                          <span style={{ width: '50px', color: 'var(--text-muted)' }}>{item.rating}</span>
                          <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${item.percentage}%`, height: '100%', backgroundColor: '#10B981', borderRadius: '4px' }} />
                          </div>
                          <span style={{ width: '35px', textAlign: 'right', fontWeight: 600 }}>{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          )}

          {/* TAB 9: REPORTS */}
          {activeTab === 'reports' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Accreditation Extracts & Verification Reports</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>One-click generation for NBA, NAAC, and NIRF criteria filing</p>
                </div>
                <Button variant="primary" size="xs" icon={<Download size={13} />} onClick={() => alert('Generating complete activity dossier ZIP...')}>
                  Export Dossier (ZIP)
                </Button>
              </div>

              <div style={{ display: 'grid', gap: '10px' }}>
                {(currentActivity.reportsAvailable || [
                  { title: 'NBA Criteria 4 Activity Digest', code: 'NBA-C4-AUTO', size: '2.1 MB PDF' },
                  { title: 'NAAC Metric 3.3.2 Research Filing', code: 'NAAC-3.3-AUTO', size: '1.6 MB PDF' },
                ]).map((rep, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-surface-hover)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{rep.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Code: {rep.code} • {rep.size}</div>
                    </div>
                    <Button variant="secondary" size="xs" icon={<Download size={13} />} onClick={() => alert(`Downloading verified extract: ${rep.code}`)}>
                      Download Report
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* QR Code Modal for Real-time Attendance Check-in */}
      {qrModalOpen && (
        <div className="modal-backdrop" onClick={() => setQrModalOpen(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: '400px', textAlign: 'center', padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Attendance Check-in QR</h3>
              <Button variant="ghost" size="xs" onClick={() => setQrModalOpen(false)}>
                <X size={16} />
              </Button>
            </div>

            <div
              style={{
                width: '200px',
                height: '200px',
                margin: '0 auto 16px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Scalable SVG QR Code Representation */}
              <svg width="168" height="168" viewBox="0 0 100 100" fill="#0F172A">
                <rect x="10" y="10" width="25" height="25" fill="#0F172A" />
                <rect x="15" y="15" width="15" height="15" fill="#FFFFFF" />
                <rect x="18" y="18" width="9" height="9" fill="#0F172A" />
                <rect x="65" y="10" width="25" height="25" fill="#0F172A" />
                <rect x="70" y="15" width="15" height="15" fill="#FFFFFF" />
                <rect x="73" y="18" width="9" height="9" fill="#0F172A" />
                <rect x="10" y="65" width="25" height="25" fill="#0F172A" />
                <rect x="15" y="70" width="15" height="15" fill="#FFFFFF" />
                <rect x="18" y="73" width="9" height="9" fill="#0F172A" />
                <rect x="42" y="12" width="6" height="20" fill="#0F172A" />
                <rect x="12" y="42" width="20" height="6" fill="#0F172A" />
                <rect x="45" y="45" width="12" height="12" fill="#4F6EF7" />
                <rect x="65" y="45" width="25" height="8" fill="#0F172A" />
                <rect x="45" y="65" width="8" height="25" fill="#0F172A" />
                <rect x="65" y="65" width="25" height="25" fill="#0F172A" />
              </svg>
            </div>

            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {currentActivity.title}
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Scan via SmartDept Student Mobile App to claim attendance and activity points.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
