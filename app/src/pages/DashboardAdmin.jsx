import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  Server,
  Building,
  Activity,
  HardDrive,
  Lock,
  RefreshCw,
  Sliders,
  FileText,
} from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { AreaChartWidget } from '../components/charts/AreaChartWidget';
import { DonutChartWidget } from '../components/charts/DonutChartWidget';
import {
  ADMIN_STATS,
  ADMIN_AUDIT_LOGS,
  SYSTEM_ACTIVITY_SERIES,
} from '../data/mockData';
import { AdminWorkflowConfigurator } from '../components/workflow/AdminWorkflowConfigurator';

export const DashboardAdmin = () => {
  const auditColumns = [
    {
      key: 'user',
      title: 'Actor / User',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>IP: {row.ip}</div>
        </div>
      ),
    },
    {
      key: 'action',
      title: 'Action Performed',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{row.details}</div>
        </div>
      ),
    },
    { key: 'time', title: 'Timestamp' },
    {
      key: 'status',
      title: 'Status',
      render: (val) => <Badge status={val}>{val}</Badge>,
    },
  ];

  const resourceData = [
    { name: 'Auditoriums', value: 8, color: '#4F6EF7' },
    { name: 'Computer Labs', value: 24, color: '#10B981' },
    { name: 'Seminar Halls', value: 16, color: '#8B5CF6' },
    { name: 'GPU Clusters', value: 12, color: '#F59E0B' },
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
          <h1 className="page-title">Enterprise System Administration</h1>
          <p className="page-subtitle">
            SmartDept Core Platform • Cluster 01 (US-East) • Security Level: High
          </p>
        </div>

        <div className="page-actions">
          <Button variant="primary" size="sm" icon={<Sliders size={15} />}>
            Manage Policies
          </Button>
          <Button variant="secondary" size="sm" icon={<RefreshCw size={15} />}>
            Flush Cache
          </Button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="kpi-grid-4">
        <StatCard
          label="Total Registered Users"
          value={ADMIN_STATS.totalUsers.toLocaleString()}
          trend={6.4}
          trendDirection="up"
          subtitle={`${ADMIN_STATS.activeUsersToday} active today`}
          icon={<Users size={18} color="#4F6EF7" />}
        />

        <StatCard
          label="Connected Departments"
          value={ADMIN_STATS.totalDepartments}
          subtitle="All policy engines synced"
          icon={<Building size={18} color="#8B5CF6" />}
        />

        <StatCard
          label="Managed Resources"
          value={ADMIN_STATS.totalResources}
          subtitle="Labs, Halls & Compute clusters"
          icon={<HardDrive size={18} color="#10B981" />}
        />

        <StatCard
          label="System Health / Uptime"
          value={ADMIN_STATS.systemUptime}
          subtitle="Zero critical downtime"
          icon={<Server size={18} color="#06B6D4" />}
        />
      </div>

      {/* 3. System Activity Traffic & Resource Allocation */}
      <div className="dashboard-row-2col">
        <Card>
          <CardHeader
            title="System Activity & Traffic Throughput"
            subtitle="API requests and concurrent active sessions over 24 hours"
            action={<Badge status="approved">Operational</Badge>}
          />
          <CardBody>
            <AreaChartWidget
              data={SYSTEM_ACTIVITY_SERIES}
              xKey="time"
              series={[
                { key: 'requests', name: 'API Requests / min', color: '#4F6EF7' },
                { key: 'activeUsers', name: 'Active Sessions', color: '#10B981' },
              ]}
              height={250}
            />
          </CardBody>
        </Card>

        {/* Resource Allocation Breakdown */}
        <Card>
          <CardHeader
            title="Resource Allocation Pool"
            subtitle="64 institutional assets currently indexed"
          />
          <CardBody>
            <DonutChartWidget
              data={resourceData}
              dataKey="value"
              nameKey="name"
              centerLabel="64 Assets"
              centerSub="Total Managed"
              height={220}
            />
          </CardBody>
        </Card>
      </div>

      {/* 4. Security Audit Logs Table */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <Card>
          <CardHeader
            title="Immutable Security & Audit Trail"
            subtitle="Real-time log of administrative escalations, threshold updates, and automated tasks"
            action={
              <Button variant="ghost" size="xs" icon={<FileText size={13} />}>
                Export CSV
              </Button>
            }
          />
          <CardBody style={{ padding: 0 }}>
            <Table
              columns={auditColumns}
              data={ADMIN_AUDIT_LOGS}
              keyField="id"
            />
          </CardBody>
        </Card>
      </div>

      {/* 5. Configuration & Department Settings Overview */}
      <div className="dashboard-row-equal">
        <Card>
          <CardHeader
            title="Automated Approval Hierarchy Rules"
            subtitle="Configured spending thresholds and escalation timeouts"
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
                    Tier 1: Up to $2,500
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Single-step approval by Faculty Coordinator or Assistant HOD
                  </div>
                </div>
                <span className="badge badge-approved">Auto-Route</span>
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
                    Tier 2: $2,500 - $15,000
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Requires Head of Department (HOD) direct sign-off
                  </div>
                </div>
                <span className="badge badge-scheduled">HOD Mandatory</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Institutional Security & Compliance"
            subtitle="SOC 2 Type II, FERPA and SSO integrations status"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color-subtle)' }}>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>SAML 2.0 / Okta SSO</span>
                <span className="badge badge-approved">Active & Verified</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-color-subtle)' }}>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>AES-256 Database Encryption</span>
                <span className="badge badge-approved">Enabled (Hardware Key)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>Automated Nightly Backup</span>
                <span className="badge badge-approved">Healthy (02:00 UTC)</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Admin Workflow Rules Configurator */}
      <div style={{ marginTop: 'var(--space-6)' }}>
        <AdminWorkflowConfigurator />
      </div>
    </motion.div>
  );
};
