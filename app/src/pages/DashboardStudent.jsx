import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  FileCheck,
  GraduationCap,
  Sparkles,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { DonutChartWidget } from '../components/charts/DonutChartWidget';
import {
  STUDENT_STATS,
  STUDENT_REGISTERED_ACTIVITIES,
  STUDENT_CERTIFICATES,
  STUDENT_NOTIFICATIONS,
} from '../data/mockData';

export const DashboardStudent = () => {
  const activityColumns = [
    {
      key: 'name',
      title: 'Activity',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            <MapPin size={10} style={{ display: 'inline', marginRight: '2px' }} /> {row.venue}
          </div>
        </div>
      ),
    },
    { key: 'date', title: 'Date' },
    {
      key: 'points',
      title: 'Activity Points',
      render: (val) => (
        <span style={{ fontWeight: 600, color: 'var(--color-brand-primary)' }}>+{val} pts</span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (val) => <Badge status={val}>{val}</Badge>,
    },
  ];

  const attendanceData = [
    { name: 'Attended', value: 94.5, color: '#10B981' },
    { name: 'Absent', value: 5.5, color: '#CBD5E1' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 1. Page Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Student Activity Portal</h1>
          <p className="page-subtitle">
            Welcome back, Priya Sharma • 4th Year Computer Science (ID: SD-2023-CS042)
          </p>
        </div>

        <div className="page-actions">
          <Button variant="primary" size="sm" icon={<GraduationCap size={15} />}>
            Browse Activities
          </Button>
          <Button variant="secondary" size="sm" icon={<Award size={15} />}>
            My Transcript
          </Button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="kpi-grid-4">
        <StatCard
          label="Activity Points"
          value={`${STUDENT_STATS.activityPoints} / ${STUDENT_STATS.pointsRequired}`}
          trend={14}
          trendDirection="up"
          subtitle="85% of graduation quota completed"
          icon={<Sparkles size={18} color="#8B5CF6" />}
        />

        <StatCard
          label="Certificates Earned"
          value={STUDENT_STATS.certificatesEarned}
          trend={2}
          trendDirection="up"
          subtitle="Verified on SmartDept Ledger"
          icon={<Award size={18} color="#4F6EF7" />}
        />

        <StatCard
          label="Overall Attendance"
          value={`${STUDENT_STATS.attendancePercentage}%`}
          subtitle="Eligible for Honors badge"
          icon={<CheckCircle size={18} color="#10B981" />}
        />

        <StatCard
          label="Upcoming Registered Events"
          value={STUDENT_STATS.upcomingEventsCount}
          subtitle="Next event in 4 days"
          icon={<Calendar size={18} color="#F59E0B" />}
        />
      </div>

      {/* 3. My Registered Activities & Attendance Breakdown */}
      <div className="dashboard-row-2col">
        <Card>
          <CardHeader
            title="My Activities & Events"
            subtitle="Registered technical seminars, hackathons, and certifications"
            action={<Badge status="ongoing">Active Semester</Badge>}
          />
          <CardBody style={{ padding: 0 }}>
            <Table
              columns={activityColumns}
              data={STUDENT_REGISTERED_ACTIVITIES}
              keyField="id"
            />
          </CardBody>
        </Card>

        {/* Attendance Breakdown Donut */}
        <Card>
          <CardHeader
            title="Department Attendance"
            subtitle="Calculated across all mandatory lab sessions"
          />
          <CardBody>
            <DonutChartWidget
              data={attendanceData}
              dataKey="value"
              nameKey="name"
              centerLabel="94.5%"
              centerSub="Overall Attendance"
              height={220}
            />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                <span>Attended (38 Sessions)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#CBD5E1' }} />
                <span>Excused (2 Sessions)</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 4. Certificates Vault & Notifications & Mini Calendar */}
      <div className="dashboard-row-3col">
        <Card>
          <CardHeader
            title="Issued Certificates"
            subtitle="Download digitally signed certificates"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {STUDENT_CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface-hover)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileCheck size={18} color="#10B981" />
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {cert.title}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {cert.credentialId} • {cert.issuedDate}
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="xs"
                    icon={<Download size={13} />}
                    onClick={() => alert(`Downloading certificate: ${cert.title}`)}
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Notifications list */}
        <Card>
          <CardHeader
            title="Student Notices"
            subtitle="Activity points, certificates & reminders"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {STUDENT_NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-hover)',
                    border: '1px solid var(--border-color-subtle)',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {n.desc}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {n.time}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Mini Calendar View */}
        <Card>
          <CardHeader
            title="August - September 2026"
            subtitle="Upcoming schedule & deadlines"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(79, 110, 247, 0.08)',
                  border: '1px solid rgba(79, 110, 247, 0.2)',
                }}
              >
                <div style={{ textAlign: 'center', minWidth: '40px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-brand-primary)' }}>29</div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>AUG</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>National Level Hackathon</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>09:00 AM - Main Arena</div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ textAlign: 'center', minWidth: '40px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>05</div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>SEP</div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>GraphQL Masterclass</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>02:00 PM - Online Room 4</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
};
