import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  Calendar as CalendarIcon,
  Wallet,
  GraduationCap,
  Users,
  PlusCircle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Check,
  X,
  Filter,
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { Timeline } from '../components/ui/Timeline';
import { AreaChartWidget } from '../components/charts/AreaChartWidget';
import { BarChartWidget } from '../components/charts/BarChartWidget';
import { useCommandPalette } from '../contexts/CommandPaletteContext';
import {
  HOD_STATS,
  MONTHLY_ACTIVITY_TREND,
  BUDGET_UTILIZATION_DATA,
  UPCOMING_ACTIVITIES,
  PENDING_APPROVALS_LIST,
  FACULTY_WORKLOAD_DATA,
  STUDENT_PARTICIPATION_DATA,
  RECENT_ACTIVITY_TIMELINE,
  AI_INSIGHTS,
} from '../data/mockData';

export const DashboardHOD = () => {
  const { setIsNewActivityModalOpen } = useCommandPalette();
  const [approvals, setApprovals] = useState(PENDING_APPROVALS_LIST);
  const [activitiesList, setActivitiesList] = useState(UPCOMING_ACTIVITIES);
  const [activeInsightIndex, setActiveInsightIndex] = useState(0);

  // Optimistic UI for approving a request
  const handleApprove = (id) => {
    setApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  // Optimistic UI for rejecting a request
  const handleReject = (id) => {
    setApprovals((prev) => prev.filter((item) => item.id !== id));
  };

  const activityColumns = [
    {
      key: 'title',
      title: 'Activity Name',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {row.department} • Lead: {row.leadFaculty}
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      title: 'Date & Venue',
      render: (val, row) => (
        <div>
          <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{row.venue}</div>
        </div>
      ),
    },
    {
      key: 'participants',
      title: 'Participants',
      render: (val) => <span style={{ fontWeight: 500 }}>{val} attendees</span>,
    },
    {
      key: 'status',
      title: 'Status',
      render: (val) => <Badge status={val}>{val}</Badge>,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* 1. Page Header & Quick Actions */}
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Head of Department Dashboard</h1>
          <p className="page-subtitle">
            Welcome back, Dr. Kumar • Computer Science & Engineering Department Overview
          </p>
        </div>

        <div className="page-actions">
          <Button
            variant="primary"
            size="sm"
            icon={<PlusCircle size={15} />}
            onClick={() => setIsNewActivityModalOpen(true)}
          >
            Create Activity
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={<CheckCircle2 size={15} />}
            onClick={() => alert('Routing all pending approvals in one click...')}
          >
            Approve Requests
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={<FileText size={15} />}
            onClick={() => alert('Generating Q3 Comprehensive Department Report...')}
          >
            Generate Report
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={<CalendarIcon size={15} />}
            onClick={() => alert('Opening Department Event Scheduling Wizard...')}
          >
            Schedule Event
          </Button>
        </div>
      </div>

      {/* 2. Top 6 KPI Cards */}
      <div className="kpi-grid-6">
        <StatCard
          label="Total Activities"
          value={HOD_STATS.totalActivities}
          trend={HOD_STATS.totalActivitiesTrend}
          trendDirection="up"
          subtitle="28 scheduled this quarter"
          icon={<Activity size={18} />}
        />

        <StatCard
          label="Pending Approvals"
          value={approvals.length}
          trend={4}
          trendDirection="down"
          subtitle="4 flagged high-priority"
          icon={<CheckCircle2 size={18} color="#F59E0B" />}
        />

        <StatCard
          label="Upcoming Events"
          value={HOD_STATS.upcomingEvents}
          subtitle="Next 14 days"
          icon={<CalendarIcon size={18} color="#6366F1" />}
        />

        <StatCard
          label="Budget Utilization"
          value={`${HOD_STATS.budgetUtilization}%`}
          subtitle={`${HOD_STATS.budgetSpent} of ${HOD_STATS.budgetTotal}`}
          icon={<Wallet size={18} color="#10B981" />}
        />

        <StatCard
          label="Student Participation"
          value={HOD_STATS.studentParticipation.toLocaleString()}
          trend={HOD_STATS.studentParticipationTrend}
          trendDirection="up"
          subtitle="Across 5 sub-departments"
          icon={<GraduationCap size={18} color="#06B6D4" />}
        />

        <StatCard
          label="Faculty Workload"
          value={`${HOD_STATS.facultyWorkload} Active`}
          subtitle={`Avg ${HOD_STATS.facultyAverageHours} hrs/week`}
          icon={<Users size={18} color="#8B5CF6" />}
        />
      </div>

      {/* 3. AI Insights Special Panel */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <Card className="ai-insights-card">
          <CardHeader
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="#8B5CF6" />
                <span>Department AI Insights & Recommendations</span>
                <span className="badge badge-primary">Active Engine</span>
              </div>
            }
            subtitle="Automated pattern detection, bottleneck analysis, and resource optimization"
          />
          <CardBody>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px',
              }}
            >
              {AI_INSIGHTS.map((insight) => (
                <div key={insight.id} className="ai-insight-item">
                  <div
                    className="ai-insight-icon"
                    style={{
                      backgroundColor:
                        insight.type === 'positive'
                          ? 'rgba(16, 185, 129, 0.15)'
                          : insight.type === 'warning'
                          ? 'rgba(245, 158, 11, 0.15)'
                          : insight.type === 'critical'
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'rgba(79, 110, 247, 0.15)',
                      color:
                        insight.type === 'positive'
                          ? '#10B981'
                          : insight.type === 'warning'
                          ? '#F59E0B'
                          : insight.type === 'critical'
                          ? '#EF4444'
                          : '#4F6EF7',
                    }}
                  >
                    {insight.type === 'positive' && <Sparkles size={15} />}
                    {insight.type === 'warning' && <AlertTriangle size={15} />}
                    {insight.type === 'critical' && <Clock size={15} />}
                    {insight.type === 'info' && <Wallet size={15} />}
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>
                      {insight.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '6px' }}>
                      {insight.message}
                    </div>
                    <button
                      type="button"
                      style={{
                        background: 'transparent',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--color-brand-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      onClick={() => alert(`Action: ${insight.action}`)}
                    >
                      <span>{insight.action}</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* 4. Charts Row: Monthly Trend & Budget Utilization */}
      <div className="dashboard-row-2col">
        <Card>
          <CardHeader
            title="Monthly Activity Trend"
            subtitle="Total proposed vs approved activities over 12 months"
            action={<Badge status="ongoing">Live Sync</Badge>}
          />
          <CardBody>
            <AreaChartWidget
              data={MONTHLY_ACTIVITY_TREND}
              xKey="month"
              series={[
                { key: 'activities', name: 'Total Activities', color: '#4F6EF7' },
                { key: 'approved', name: 'Approved & Conducted', color: '#10B981' },
              ]}
              height={260}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Budget Utilization by Category"
            subtitle="Allocated funds vs expenditures (YTD)"
          />
          <CardBody>
            <BarChartWidget
              data={BUDGET_UTILIZATION_DATA}
              xKey="category"
              bars={[
                { key: 'allocated', name: 'Allocated', color: '#4F6EF7' },
                { key: 'spent', name: 'Spent', color: '#10B981' },
              ]}
              height={260}
            />
          </CardBody>
        </Card>
      </div>

      {/* 5. Activities Table & Pending Approvals Queue */}
      <div className="dashboard-row-2col">
        <Card>
          <CardHeader
            title="Upcoming Department Activities"
            subtitle="Scheduled conferences, workshops, and student hackathons"
            action={
              <Button variant="ghost" size="xs" onClick={() => setIsNewActivityModalOpen(true)}>
                + New
              </Button>
            }
          />
          <CardBody style={{ padding: 0 }}>
            <Table
              columns={activityColumns}
              data={activitiesList}
              keyField="id"
            />
          </CardBody>
        </Card>

        {/* Pending Approvals Card with one-click optimistic UI */}
        <Card>
          <CardHeader
            title={`Pending Approvals (${approvals.length})`}
            subtitle="Review requisition & honorarium requests"
          />
          <CardBody>
            {approvals.length === 0 ? (
              <div className="state-container" style={{ padding: '24px 0' }}>
                <CheckCircle2 size={32} color="#10B981" />
                <div style={{ fontWeight: 600, marginTop: '8px' }}>All caught up!</div>
                <p className="state-description">Zero pending requests in department queue.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {approvals.map((req) => (
                  <div
                    key={req.id}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-surface-hover)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {req.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          By {req.requestedBy} • {req.department}
                        </div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                        {req.amount}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4px' }}>
                      <span className="badge badge-pending">{req.type}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <Button
                          variant="danger-ghost"
                          size="xs"
                          icon={<X size={12} />}
                          onClick={() => handleReject(req.id)}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="success"
                          size="xs"
                          icon={<Check size={12} />}
                          onClick={() => handleApprove(req.id)}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* 6. Faculty Workload & Student Participation & Timeline */}
      <div className="dashboard-row-3col">
        <Card>
          <CardHeader
            title="Faculty Workload"
            subtitle="Active coordinators & assigned hours"
          />
          <CardBody>
            <BarChartWidget
              data={FACULTY_WORKLOAD_DATA}
              xKey="name"
              layout="vertical"
              bars={[{ key: 'hours', name: 'Weekly Hours', color: '#8B5CF6' }]}
              height={240}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Student Participation"
            subtitle="Enrollments by sub-discipline"
          />
          <CardBody>
            <BarChartWidget
              data={STUDENT_PARTICIPATION_DATA}
              xKey="department"
              layout="vertical"
              bars={[{ key: 'count', name: 'Students Enrolled', color: '#06B6D4' }]}
              height={240}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Recent Activity Timeline"
            subtitle="Automated audit trail"
          />
          <CardBody style={{ overflowY: 'auto', maxHeight: '280px' }}>
            <Timeline items={RECENT_ACTIVITY_TIMELINE} />
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
};
