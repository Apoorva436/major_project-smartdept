import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  PlusCircle,
  TrendingUp,
  Users,
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { AreaChartWidget } from '../components/charts/AreaChartWidget';
import { useCommandPalette } from '../contexts/CommandPaletteContext';
import { FACULTY_STATS, FACULTY_MY_ACTIVITIES } from '../data/mockData';

export const DashboardFaculty = () => {
  const { setIsNewActivityModalOpen } = useCommandPalette();

  const activityColumns = [
    {
      key: 'title',
      title: 'Activity Title',
      render: (val) => (
        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
      ),
    },
    { key: 'date', title: 'Schedule' },
    {
      key: 'participants',
      title: 'Enrollment',
      render: (val) => <span>{val} Students</span>,
    },
    {
      key: 'budget',
      title: 'Budget',
      render: (val) => <span style={{ fontWeight: 600 }}>{val}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      render: (val) => <Badge status={val}>{val}</Badge>,
    },
  ];

  const workloadTrend = [
    { month: 'W1', hours: 38 },
    { month: 'W2', hours: 44 },
    { month: 'W3', hours: 48 },
    { month: 'W4', hours: 42 },
    { month: 'W5', hours: 40 },
    { month: 'W6', hours: 45 },
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
          <h1 className="page-title">Faculty Activity Hub</h1>
          <p className="page-subtitle">
            Welcome, Prof. David Chen • Department of Computer Science (Coordinator: Systems Lab)
          </p>
        </div>

        <div className="page-actions">
          <Button
            variant="primary"
            size="sm"
            icon={<PlusCircle size={15} />}
            onClick={() => setIsNewActivityModalOpen(true)}
          >
            Submit Activity Proposal
          </Button>
          <Button variant="secondary" size="sm" icon={<FileSpreadsheet size={15} />}>
            Export Attendance Roll
          </Button>
        </div>
      </div>

      {/* 2. KPI Cards */}
      <div className="kpi-grid-4">
        <StatCard
          label="My Activities"
          value={FACULTY_STATS.myActivities}
          trend={8}
          trendDirection="up"
          subtitle="4 active this term"
          icon={<Briefcase size={18} color="#4F6EF7" />}
        />

        <StatCard
          label="Pending Student Requests"
          value={FACULTY_STATS.pendingStudentRequests}
          subtitle="Attendance excusal & certificates"
          icon={<CheckCircle2 size={18} color="#F59E0B" />}
        />

        <StatCard
          label="Weekly Workload"
          value={`${FACULTY_STATS.weeklyWorkloadHours}h / wk`}
          subtitle="Within optimal allocation"
          icon={<Clock size={18} color="#8B5CF6" />}
        />

        <StatCard
          label="Reports Generated"
          value={FACULTY_STATS.reportsGenerated}
          subtitle="All compliance files current"
          icon={<FileSpreadsheet size={18} color="#10B981" />}
        />
      </div>

      {/* 3. My Activities Table & Workload Hours Trend */}
      <div className="dashboard-row-2col">
        <Card>
          <CardHeader
            title="My Assigned Activities & Proposals"
            subtitle="Workshops, conferences, and student development programs"
            action={
              <Button variant="ghost" size="xs" onClick={() => setIsNewActivityModalOpen(true)}>
                + New Proposal
              </Button>
            }
          />
          <CardBody style={{ padding: 0 }}>
            <Table
              columns={activityColumns}
              data={FACULTY_MY_ACTIVITIES}
              keyField="id"
            />
          </CardBody>
        </Card>

        {/* Workload Hours Trend */}
        <Card>
          <CardHeader
            title="Weekly Workload Distribution"
            subtitle="Classroom instruction, mentoring & event supervision"
          />
          <CardBody>
            <AreaChartWidget
              data={workloadTrend}
              xKey="month"
              series={[{ key: 'hours', name: 'Workload Hours', color: '#8B5CF6' }]}
              height={220}
            />
          </CardBody>
        </Card>
      </div>

      {/* 4. Pending Student Requests & Reports Generated */}
      <div className="dashboard-row-equal">
        <Card>
          <CardHeader
            title="Student Activity Approvals"
            subtitle="Verify attendance claims and event point allocations"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div
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
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Priya Sharma (SD-2023-CS042)
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Requested +40 pts for National Hackathon Participation
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Button variant="danger-ghost" size="xs">Reject</Button>
                  <Button variant="success" size="xs">Verify</Button>
                </div>
              </div>

              <div
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
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Arjun Nair (SD-2023-CS109)
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Medical Excusal Request for Robotics Lab (Aug 22)
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <Button variant="danger-ghost" size="xs">Reject</Button>
                  <Button variant="success" size="xs">Verify</Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Generated Accreditation Reports"
            subtitle="NBA, NAAC, and NIRF automated data extracts"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { title: 'NBA Criteria 4 - Student Activity Extract 2026', size: '2.4 MB PDF' },
                { title: 'NAAC Metric 3.3.2 - Workshops Conducted (YTD)', size: '1.8 MB XLSX' },
                { title: 'Department Faculty Activity Load Index (Fall 26)', size: '890 KB CSV' },
              ].map((rep, idx) => (
                <div
                  key={idx}
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
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{rep.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{rep.size}</div>
                  </div>
                  <Button variant="ghost" size="xs" icon={<Download size={13} />} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
};
