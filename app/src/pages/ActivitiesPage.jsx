import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusCircle,
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Eye,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { ActivityCreationWizard } from '../components/activities/ActivityCreationWizard';
import { ActivityDetailPage } from '../components/activities/ActivityDetailPage';
import { SAMPLE_ACTIVITIES, ACTIVITY_TYPES } from '../data/activityManagementData';

export const ActivitiesPage = () => {
  const [activities, setActivities] = useState(SAMPLE_ACTIVITIES);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateSuccess = (newActivity) => {
    setActivities((prev) => [newActivity, ...prev]);
    setIsCreating(false);
    setSelectedActivity(newActivity); // Directly show the newly created activity detail page!
  };

  const handleUpdateActivity = (updated) => {
    setActivities((prev) => prev.map((a) => (a.id === updated.id ? updated : a)));
  };

  // If in Detail Mode
  if (selectedActivity) {
    return (
      <ActivityDetailPage
        activity={selectedActivity}
        onBack={() => setSelectedActivity(null)}
        onUpdateActivity={handleUpdateActivity}
      />
    );
  }

  // If in Creation Wizard Mode
  if (isCreating) {
    return (
      <ActivityCreationWizard
        onCancel={() => setIsCreating(false)}
        onSubmitSuccess={handleCreateSuccess}
      />
    );
  }

  // Filter logic
  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.coordinator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || act.category === categoryFilter;

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'scheduled' && (act.lifecycleStage === 'scheduled' || act.status === 'Scheduled')) ||
      (activeTab === 'ongoing' && (act.lifecycleStage === 'ongoing' || act.status === 'Ongoing')) ||
      (activeTab === 'completed' && (act.lifecycleStage === 'completed' || act.lifecycleStage === 'report_generated' || act.status === 'Completed')) ||
      (activeTab === 'pending' && (act.lifecycleStage === 'submitted' || act.lifecycleStage === 'under_review' || act.status === 'Pending Approval')) ||
      (activeTab === 'draft' && (act.lifecycleStage === 'draft' || act.status === 'Draft'));

    return matchesSearch && matchesCategory && matchesTab;
  });

  const tabs = [
    { id: 'all', label: 'All Activities', badge: `${activities.length}` },
    { id: 'scheduled', label: 'Scheduled', badge: `${activities.filter(a => a.lifecycleStage === 'scheduled').length}` },
    { id: 'ongoing', label: 'Ongoing', badge: `${activities.filter(a => a.lifecycleStage === 'ongoing').length}` },
    { id: 'pending', label: 'Pending Approvals', badge: `${activities.filter(a => a.lifecycleStage === 'submitted' || a.lifecycleStage === 'under_review').length}` },
    { id: 'completed', label: 'Completed', badge: `${activities.filter(a => a.lifecycleStage === 'completed' || a.lifecycleStage === 'report_generated').length}` },
  ];

  const columns = [
    {
      key: 'title',
      title: 'Activity Name & Department',
      render: (val, r) => (
        <div>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13.5px' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {r.department} • Coordinator: <strong>{r.coordinator}</strong>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (val) => <span className="badge badge-primary">{val}</span>,
    },
    {
      key: 'date',
      title: 'Schedule & Venue',
      render: (val, r) => (
        <div>
          <div style={{ fontSize: '12.5px' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{r.venue}</div>
        </div>
      ),
    },
    {
      key: 'enrolledCount',
      title: 'Capacity',
      render: (val, r) => (
        <span style={{ fontWeight: 600, fontSize: '13px' }}>
          {val} / {r.maxParticipants}
        </span>
      ),
    },
    {
      key: 'lifecycleStage',
      title: 'Lifecycle Stage',
      render: (val, r) => {
        const stageLabel = (val || '').replace('_', ' ').toUpperCase();
        return <Badge status={r.status}>{stageLabel}</Badge>;
      },
    },
    {
      key: 'actions',
      title: 'Action',
      align: 'right',
      render: (_, r) => (
        <Button
          variant="secondary"
          size="xs"
          icon={<Eye size={12} />}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedActivity(r);
          }}
        >
          View Detail
        </Button>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Activity Management</h1>
          <p className="page-subtitle">
            Plan, propose, approve, execute, track, and generate compliance reports for departmental activities.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<PlusCircle size={15} />}
          onClick={() => setIsCreating(true)}
        >
          + Create Activity
        </Button>
      </div>

      {/* Main Table Card */}
      <Card>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Filter Controls Bar */}
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-color-subtle)',
          }}
        >
          <Input
            placeholder="Search activities by title, coordinator, or venue..."
            icon={<Search size={15} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, minWidth: '240px', marginBottom: 0 }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Type:</span>
            <select
              className="form-input"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ width: 'auto', height: '38px', fontSize: '13px' }}
            >
              <option value="all">All 14 Types</option>
              {ACTIVITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Activities Data Table */}
        <CardBody style={{ padding: 0 }}>
          <Table
            columns={columns}
            data={filteredActivities}
            keyField="id"
            onRowClick={(row) => setSelectedActivity(row)}
            emptyMessage="No activities match the selected filter criteria."
          />
        </CardBody>
      </Card>
    </motion.div>
  );
};
