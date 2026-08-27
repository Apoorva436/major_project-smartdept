import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  Calendar as CalendarIcon,
  UserCheck,
  Package,
  Wallet,
  FileText,
  TrendingUp,
  Bell,
  FileCode,
  Sparkles,
  Settings,
  Download,
  PlusCircle,
  Filter,
  Search,
  Check,
  X,
  MapPin,
  Clock,
  Shield,
  Layers,
  FileCheck,
  Upload,
  BarChart2,
  PieChart,
  HardDrive,
  Users,
  Sliders,
  DollarSign,
  AlertTriangle,
  QrCode,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { AreaChartWidget } from '../components/charts/AreaChartWidget';
import { BarChartWidget } from '../components/charts/BarChartWidget';
import { DonutChartWidget } from '../components/charts/DonutChartWidget';
import { ActivitiesPage } from './ActivitiesPage';
import { ApprovalsPage } from './ApprovalsPage';
import {
  UPCOMING_ACTIVITIES,
  PENDING_APPROVALS_LIST,
  MONTHLY_ACTIVITY_TREND,
  BUDGET_UTILIZATION_DATA,
  AI_INSIGHTS,
} from '../data/mockData';

export const SectionViews = ({ activeSection }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. ACTIVITIES SECTION (Full Activity Management System)
  if (activeSection === 'activities') {
    return <ActivitiesPage />;
  }

  // 2. APPROVALS SECTION (Full Workflow Automation Engine)
  if (activeSection === 'approvals') {
    return <ApprovalsPage />;
  }

  // 3. CALENDAR SECTION
  if (activeSection === 'calendar') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Department Master Calendar</h1>
            <p className="page-subtitle">Schedule grid for auditoriums, seminar halls, and smart classrooms</p>
          </div>
          <Button variant="primary" size="sm" icon={<PlusCircle size={15} />}>
            Schedule Event
          </Button>
        </div>

        <div className="dashboard-row-2col">
          <Card>
            <CardHeader title="Upcoming Bookings (Next 14 Days)" subtitle="Synchronized with room access IoT controllers" />
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {UPCOMING_ACTIVITIES.map((act) => (
                  <div
                    key={act.id}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-hover)',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{act.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        <MapPin size={11} style={{ display: 'inline' }} /> {act.venue} • {act.date}
                      </div>
                    </div>
                    <Badge status={act.status}>{act.status}</Badge>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Venue Availability Matrix" subtitle="Real-time collision detection active" />
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { venue: 'Main Auditorium A', status: 'Booked (Aug 28-29)', color: '#EF4444' },
                  { venue: 'Seminar Hall 1', status: 'Available', color: '#10B981' },
                  { venue: 'Seminar Hall 2', status: 'Available', color: '#10B981' },
                  { venue: 'Innovation Hub Arena', status: 'Booked (Sep 10)', color: '#F59E0B' },
                  { venue: 'High-Performance Computing Lab', status: 'Available', color: '#10B981' },
                ].map((v, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color-subtle)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500 }}>{v.venue}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: v.color }}>{v.status}</span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </motion.div>
    );
  }

  // 4. ATTENDANCE SECTION
  if (activeSection === 'attendance') {
    const attendanceRecords = [
      { id: 'ATT-1', session: 'AI & Robotics Keynote', date: 'Aug 24, 2026', present: 280, total: 300, rate: '93.3%', mode: 'QR Scan' },
      { id: 'ATT-2', session: 'Cloud Bootcamp Day 1', date: 'Aug 22, 2026', present: 82, total: 85, rate: '96.5%', mode: 'Biometric' },
      { id: 'ATT-3', session: 'Department Lab 4 - Networks', date: 'Aug 20, 2026', present: 58, total: 60, rate: '96.6%', mode: 'Auto RFID' },
      { id: 'ATT-4', session: 'Guest Lecture on Quantum CS', date: 'Aug 18, 2026', present: 110, total: 120, rate: '91.6%', mode: 'SmartDept App' },
    ];

    const attColumns = [
      { key: 'session', title: 'Session Name', render: (val) => <span style={{ fontWeight: 600 }}>{val}</span> },
      { key: 'date', title: 'Date' },
      { key: 'present', title: 'Attendance', render: (val, r) => `${val} / ${r.total} Students` },
      { key: 'rate', title: 'Sync Rate', render: (val) => <Badge status="completed">{val}</Badge> },
      { key: 'mode', title: 'Capture Mode' },
    ];

    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Attendance Tracking & Verification</h1>
            <p className="page-subtitle">Automated session rosters, contactless QR scans, and credit point sync</p>
          </div>
          <Button variant="primary" size="sm" icon={<QrCode size={15} />}>
            Generate Session QR
          </Button>
        </div>

        <Card>
          <CardHeader title="Recent Session Attendance Rosters" subtitle="Real-time sync from classroom sensors" />
          <CardBody style={{ padding: 0 }}>
            <Table columns={attColumns} data={attendanceRecords} />
          </CardBody>
        </Card>
      </motion.div>
    );
  }

  // 5. RESOURCES SECTION
  if (activeSection === 'resources') {
    const resources = [
      { name: 'Main Auditorium A', type: 'Venue', capacity: '500 Seats', status: 'In Use', lead: 'AV Team 1' },
      { name: 'High-Performance GPU Cluster', type: 'Compute Lab', capacity: '32 Nodes', status: 'Operational', lead: 'Dr. Sarah Jenkins' },
      { name: 'Innovation Hub Lab 2', type: 'Workshop Space', capacity: '80 Seats', status: 'Available', lead: 'Prof. David Chen' },
      { name: 'Smart Seminar Hall 1', type: 'Presentation Hall', capacity: '150 Seats', status: 'Available', lead: 'AV Team 2' },
      { name: 'Embedded Systems Testbed', type: 'Hardware Lab', capacity: '40 Benches', status: 'Under Maintenance', lead: 'Prof. Amit Rao' },
    ];

    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Department Resource Management</h1>
            <p className="page-subtitle">Auditoriums, lab benches, compute servers, and specialized equipment</p>
          </div>
          <Button variant="primary" size="sm" icon={<PlusCircle size={15} />}>
            Register Asset
          </Button>
        </div>

        <div className="dashboard-row-equal">
          {resources.map((res, i) => (
            <Card key={i}>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{res.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{res.type} • {res.capacity}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Manager: {res.lead}</div>
                  </div>
                  <Badge status={res.status === 'Available' ? 'approved' : res.status === 'In Use' ? 'ongoing' : 'pending'}>
                    {res.status}
                  </Badge>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  // 6. BUDGET SECTION
  if (activeSection === 'budget') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Budget Allocation & Expenditures</h1>
            <p className="page-subtitle">Annual fiscal allocation, expense reconciliation, and department grant tracking</p>
          </div>
          <Button variant="primary" size="sm" icon={<DollarSign size={15} />}>
            Request Allocation
          </Button>
        </div>

        <div className="dashboard-row-2col">
          <Card>
            <CardHeader title="Budget Utilization by Category" subtitle="Allocated vs Spent (YTD)" />
            <CardBody>
              <BarChartWidget
                data={BUDGET_UTILIZATION_DATA}
                xKey="category"
                bars={[
                  { key: 'allocated', name: 'Allocated ($)', color: '#4F6EF7' },
                  { key: 'spent', name: 'Spent ($)', color: '#10B981' },
                ]}
                height={260}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Fiscal Summary (Q3 2026)" subtitle="Current drawdown rate" />
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Budget Pool</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>$200,000</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Committed / Spent</div>
                  <div style={{ fontSize: '22px', fontWeight: 700, color: '#10B981' }}>$144,000 (72%)</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Remaining Reserve</div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: '#4F6EF7' }}>$56,000 (28%)</div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </motion.div>
    );
  }

  // 7. REPORTS SECTION
  if (activeSection === 'reports') {
    const reports = [
      { code: 'NBA-C4', title: 'NBA Criterion 4: Students Performance & Activity Log', type: 'Accreditation', format: 'PDF & XLSX' },
      { code: 'NAAC-3.3', title: 'NAAC Metric 3.3.2: Research Workshops & Conferences', type: 'Compliance', format: 'Official PDF' },
      { code: 'NIRF-RES', title: 'NIRF Department Research & Consultancy Output', type: 'National Ranking', format: 'Encrypted ZIP' },
      { code: 'DEPT-Q3', title: 'Q3 Comprehensive Department Performance & Finance Digest', type: 'Internal Audit', format: 'PDF Summary' },
    ];

    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Automated Compliance & Accreditation Reports</h1>
            <p className="page-subtitle">One-click exports structured for NBA, NAAC, NIRF, and internal institutional audits</p>
          </div>
          <Button variant="primary" size="sm" icon={<FileText size={15} />}>
            Generate Custom Extract
          </Button>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {reports.map((rep, idx) => (
            <Card key={idx}>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(79, 110, 247, 0.1)', color: '#4F6EF7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>{rep.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Code: {rep.code} • {rep.type} • {rep.format}</div>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" icon={<Download size={14} />} onClick={() => alert(`Downloading verified extract: ${rep.code}`)}>
                    Download Report
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  // 8. ANALYTICS SECTION
  if (activeSection === 'analytics') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Department Analytics & Telemetry</h1>
            <p className="page-subtitle">Longitudinal analysis, student participation trends, and faculty productivity metrics</p>
          </div>
        </div>

        <div className="dashboard-row-2col">
          <Card>
            <CardHeader title="12-Month Longitudinal Activity Trend" subtitle="Activity submissions vs approvals" />
            <CardBody>
              <AreaChartWidget data={MONTHLY_ACTIVITY_TREND} xKey="month" height={260} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Accreditation Readiness Index" subtitle="Self-assessed criteria scores (100 Max)" />
            <CardBody>
              <BarChartWidget
                data={[
                  { category: 'Curriculum', score: 92 },
                  { category: 'Teaching', score: 88 },
                  { category: 'Research', score: 85 },
                  { category: 'Infrastructure', score: 94 },
                  { category: 'Outcomes', score: 90 },
                ]}
                xKey="category"
                bars={[{ key: 'score', name: 'Criterion Score', color: '#8B5CF6' }]}
                height={260}
              />
            </CardBody>
          </Card>
        </div>
      </motion.div>
    );
  }

  // 9. NOTIFICATIONS SECTION
  if (activeSection === 'notifications') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Notification Center</h1>
            <p className="page-subtitle">Real-time alerts, approval requests, and automated policy notices</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {[
            { title: 'GPU Cluster Procurement Approved', desc: 'HOD Dr. Kumar approved $18,500 requisition', time: '10m ago', badge: 'approved' },
            { title: 'AI Anomaly Flagged: Venue Overlap', desc: 'Auditorium A booked twice for Sep 02 2:00 PM', time: '45m ago', badge: 'pending' },
            { title: 'New Certificate Issued', desc: 'National Hackathon winner certificates signed', time: '2h ago', badge: 'scheduled' },
          ].map((n, i) => (
            <Card key={i}>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{n.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{n.desc}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{n.time}</div>
                  </div>
                  <Badge status={n.badge}>{n.badge}</Badge>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  // 10. DOCUMENTS SECTION
  if (activeSection === 'documents') {
    const docs = [
      { name: 'SmartDept_Academic_Policy_2026.pdf', size: '3.2 MB', category: 'Policy', date: 'Aug 2026' },
      { name: 'Activity_Requisition_Template_v4.docx', size: '420 KB', category: 'Template', date: 'Jul 2026' },
      { name: 'NBA_Tier_1_Self_Assessment_Report.pdf', size: '12.4 MB', category: 'Accreditation', date: 'Aug 2026' },
      { name: 'Faculty_Workload_Guidelines_Fall26.pdf', size: '1.1 MB', category: 'Guidelines', date: 'Aug 2026' },
    ];

    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Department Document Vault</h1>
            <p className="page-subtitle">Encrypted repository for institutional policies, circulars, and approved requisitions</p>
          </div>
          <Button variant="primary" size="sm" icon={<Upload size={15} />}>
            Upload Document
          </Button>
        </div>

        <div style={{ display: 'grid', gap: '10px' }}>
          {docs.map((doc, idx) => (
            <Card key={idx}>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileCode size={20} color="#4F6EF7" />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px' }}>{doc.name}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.category} • {doc.size} • Uploaded {doc.date}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="xs" icon={<Download size={13} />} onClick={() => alert(`Downloading: ${doc.name}`)} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  // 11. AI INSIGHTS SECTION
  if (activeSection === 'ai-insights') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">SmartDept AI Intelligence Hub</h1>
            <p className="page-subtitle">Predictive models, anomaly detections, and automated workload rebalancing</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {AI_INSIGHTS.map((insight) => (
            <Card key={insight.id} className="ai-insights-card">
              <CardBody>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Sparkles size={18} color="#8B5CF6" />
                  <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{insight.title}</h3>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {insight.message}
                </p>
                <Button variant="outline" size="sm" onClick={() => alert(`AI Action: ${insight.action}`)}>
                  {insight.action}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  // 12. SETTINGS SECTION
  if (activeSection === 'settings') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="page-header">
          <div className="page-title-group">
            <h1 className="page-title">Department Settings & Policies</h1>
            <p className="page-subtitle">Approval thresholds, notification webhooks, and institutional RBAC roles</p>
          </div>
          <Button variant="primary" size="sm">
            Save Preferences
          </Button>
        </div>

        <div className="dashboard-row-equal">
          <Card>
            <CardHeader title="Approval Routing Thresholds" subtitle="Automated escalation limits" />
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Input label="Tier 1 Threshold ($)" defaultValue="2500" helperText="Requests under this amount require single-level approval" />
                <Input label="Tier 2 Threshold ($)" defaultValue="15000" helperText="Requests over this amount require direct HOD clearance" />
                <Input label="Escalation Timeout (Hours)" defaultValue="48" helperText="Unanswered requests auto-escalate to Dean after this time" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="System Notifications & AI Webhooks" subtitle="Configure automated alerting channels" />
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>AI Conflict Detection Alerts</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Notify when venue or speaker overlaps occur</div>
                  </div>
                  <span className="badge badge-approved">Enabled</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>Automated Student QR Sync</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Auto-credit activity points on scan</div>
                  </div>
                  <span className="badge badge-approved">Enabled</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>SMS Emergency Broadcast</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Send urgent schedule cancellations</div>
                  </div>
                  <span className="badge badge-draft">Disabled</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </motion.div>
    );
  }

  return null;
};
