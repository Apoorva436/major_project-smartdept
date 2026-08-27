import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Search,
  Filter,
  Check,
  X,
  Eye,
  Shield,
  Wallet,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table } from '../components/ui/Table';
import { Tabs } from '../components/ui/Tabs';
import { Input } from '../components/ui/Input';
import { StatCard } from '../components/ui/StatCard';
import { ApprovalDetailView } from '../components/workflow/ApprovalDetailView';
import { ApprovalActionModal } from '../components/workflow/ApprovalActionModal';
import { useWorkflow } from '../contexts/WorkflowContext';

export const ApprovalsPage = () => {
  const { requests, approveRequest, rejectRequest, requestChanges, evaluateActivityWorkflow } = useWorkflow();

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickActionModal, setQuickActionModal] = useState(null); // { type, request }

  // If viewing detailed approval workspace
  if (selectedRequest) {
    // Keep reference updated from state
    const current = requests.find((r) => r.id === selectedRequest.id) || selectedRequest;
    return (
      <ApprovalDetailView
        request={current}
        onBack={() => setSelectedRequest(null)}
      />
    );
  }

  const handleQuickConfirm = (type, comments) => {
    if (!quickActionModal) return;
    const reqId = quickActionModal.request.id;

    if (type === 'approve') {
      approveRequest(reqId, comments);
    } else if (type === 'reject') {
      rejectRequest(reqId, comments);
    } else if (type === 'changes') {
      requestChanges(reqId, comments);
    }
    setQuickActionModal(null);
  };

  const pendingCount = requests.filter((r) => r.status === 'Pending').length;
  const approvedCount = requests.filter((r) => r.status === 'Approved').length;
  const changesCount = requests.filter((r) => r.status === 'Changes Requested').length;
  const rejectedCount = requests.filter((r) => r.status === 'Rejected').length;

  const tabs = [
    { id: 'pending', label: 'Pending My Action', badge: `${pendingCount}` },
    { id: 'all', label: 'All Requests', badge: `${requests.length}` },
    { id: 'approved', label: 'Approved & Cleared', badge: `${approvedCount}` },
    { id: 'changes', label: 'Changes Requested', badge: `${changesCount}` },
    { id: 'rejected', label: 'Declined', badge: `${rejectedCount}` },
  ];

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'pending' && req.status === 'Pending') ||
      (activeTab === 'approved' && req.status === 'Approved') ||
      (activeTab === 'changes' && req.status === 'Changes Requested') ||
      (activeTab === 'rejected' && req.status === 'Rejected');

    return matchesSearch && matchesTab;
  });

  const columns = [
    {
      key: 'title',
      title: 'Activity & Requester',
      render: (val, r) => (
        <div>
          <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Requested by <strong>{r.requester.name}</strong> ({r.requester.department})
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
      key: 'budget',
      title: 'Budget & Risk',
      render: (val, r) => {
        const evalResult = evaluateActivityWorkflow(r);
        return (
          <div>
            <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
              ${val.toLocaleString()}
            </div>
            <div style={{ marginTop: '2px' }}>
              <Badge status={evalResult.riskLevel === 'Low' ? 'approved' : evalResult.riskLevel === 'Medium' ? 'pending' : 'rejected'}>
                {evalResult.riskLevel} Risk
              </Badge>
            </div>
          </div>
        );
      },
    },
    {
      key: 'status',
      title: 'Workflow Status',
      render: (val) => {
        if (val === 'Approved') return <Badge status="approved">Approved</Badge>;
        if (val === 'Rejected') return <Badge status="rejected">Declined</Badge>;
        if (val === 'Changes Requested') return <Badge status="rejected">Changes Requested</Badge>;
        return <Badge status="pending">Under Review</Badge>;
      },
    },
    {
      key: 'actions',
      title: 'Approver Action',
      align: 'right',
      render: (_, r) => (
        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
          {r.status === 'Pending' && (
            <>
              <Button
                variant="danger-ghost"
                size="xs"
                icon={<X size={12} />}
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickActionModal({ type: 'reject', request: r });
                }}
              >
                Reject
              </Button>

              <Button
                variant="success"
                size="xs"
                icon={<Check size={12} />}
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickActionModal({ type: 'approve', request: r });
                }}
              >
                Approve
              </Button>
            </>
          )}

          <Button
            variant="secondary"
            size="xs"
            icon={<Eye size={12} />}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRequest(r);
            }}
          >
            Review Details
          </Button>
        </div>
      ),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Approval Queue & Clearances</h1>
          <p className="page-subtitle">
            Workflow Automation Engine • Dynamic multi-tier approval routing with risk analysis and automated alerts.
          </p>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="kpi-grid-4" style={{ marginBottom: 'var(--space-6)' }}>
        <StatCard
          label="Pending Action"
          value={pendingCount}
          subtitle="Queued for your sign-off"
          icon={<Clock size={18} color="#F59E0B" />}
        />

        <StatCard
          label="Approved / Cleared"
          value={approvedCount}
          subtitle="Advanced to schedule"
          icon={<CheckCircle2 size={18} color="#10B981" />}
        />

        <StatCard
          label="Changes Requested"
          value={changesCount}
          subtitle="Awaiting faculty updates"
          icon={<AlertTriangle size={18} color="#F59E0B" />}
        />

        <StatCard
          label="Declined Proposals"
          value={rejectedCount}
          subtitle="Documented in audit log"
          icon={<XCircle size={18} color="#EF4444" />}
        />
      </div>

      {/* Main Table Card */}
      <Card>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div style={{ padding: '16px 20px', display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color-subtle)' }}>
          <Input
            placeholder="Search by activity title, coordinator name, or category..."
            icon={<Search size={15} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, marginBottom: 0 }}
          />
        </div>

        <CardBody style={{ padding: 0 }}>
          <Table
            columns={columns}
            data={filteredRequests}
            keyField="id"
            onRowClick={(row) => setSelectedRequest(row)}
            emptyMessage="No approval requests match the selected view."
          />
        </CardBody>
      </Card>

      {/* Quick Action Modal */}
      {quickActionModal && (
        <ApprovalActionModal
          isOpen={Boolean(quickActionModal)}
          onClose={() => setQuickActionModal(null)}
          actionType={quickActionModal.type}
          request={quickActionModal.request}
          onConfirm={handleQuickConfirm}
        />
      )}
    </motion.div>
  );
};
