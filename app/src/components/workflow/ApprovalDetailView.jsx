import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  User,
  Wallet,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Check,
  X,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ApprovalTimeline } from './ApprovalTimeline';
import { ApprovalActionModal } from './ApprovalActionModal';
import { useWorkflow } from '../../contexts/WorkflowContext';

export const ApprovalDetailView = ({ request, onBack }) => {
  const { rules, approveRequest, rejectRequest, requestChanges, evaluateActivityWorkflow } = useWorkflow();
  const [modalAction, setModalAction] = useState(null); // 'approve' | 'reject' | 'changes' | null

  // Dynamically evaluate workflow rules on this request
  const evaluation = evaluateActivityWorkflow(request);

  const handleActionConfirm = (type, comments) => {
    if (type === 'approve') {
      approveRequest(request.id, comments);
    } else if (type === 'reject') {
      rejectRequest(request.id, comments);
    } else if (type === 'changes') {
      requestChanges(request.id, comments);
    }
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'Critical':
        return <span className="badge badge-rejected" style={{ fontSize: '12px' }}>Critical Risk</span>;
      case 'High':
        return <span className="badge badge-rejected" style={{ fontSize: '12px' }}>High Risk</span>;
      case 'Medium':
        return <span className="badge badge-pending" style={{ fontSize: '12px' }}>Medium Risk</span>;
      case 'Low':
      default:
        return <span className="badge badge-approved" style={{ fontSize: '12px' }}>Low Operational Risk</span>;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      {/* Top Bar Navigation */}
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
          <span>Back to Approvals Queue</span>
        </button>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Badge status={request.status === 'Approved' ? 'approved' : request.status === 'Rejected' ? 'rejected' : 'pending'}>
            {request.status}
          </Badge>
        </div>
      </div>

      {/* Hero Card */}
      <Card style={{ marginBottom: 'var(--space-5)' }}>
        <CardBody style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-primary">{request.category}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {request.id}</span>
                {getRiskBadge(evaluation.riskLevel)}
              </div>

              <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {request.title}
              </h1>

              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                {request.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={14} color="var(--color-brand-primary)" />
                  <span>{request.dates}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <MapPin size={14} color="var(--color-brand-primary)" />
                  <span>{request.venue}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Wallet size={14} color="#10B981" />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    ${request.budget.toLocaleString()} ({request.fundingSource})
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Box */}
            {request.status !== 'Approved' && request.status !== 'Rejected' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  backgroundColor: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  minWidth: '200px',
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Approver Actions
                </div>
                <Button
                  variant="success"
                  size="sm"
                  icon={<Check size={14} />}
                  onClick={() => setModalAction('approve')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Approve Request
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  icon={<AlertTriangle size={14} />}
                  onClick={() => setModalAction('changes')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Request Changes
                </Button>

                <Button
                  variant="danger-ghost"
                  size="sm"
                  icon={<X size={14} />}
                  onClick={() => setModalAction('reject')}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Reject Proposal
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {/* Main Grid: Left Details & Right Approval Timeline */}
      <div className="dashboard-row-2col">
        {/* Left Column: Requester, Risk Assessment & Documents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Requester Profile Card */}
          <Card>
            <CardHeader title="Requester Information" subtitle="Faculty initiator & department affiliation" />
            <CardBody>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-brand-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '16px',
                  }}
                >
                  {request.requester.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {request.requester.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {request.requester.role} • {request.requester.department}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-brand-primary)', marginTop: '2px' }}>
                    {request.requester.email}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Automated Risk Assessment & Rule Trigger Breakdown */}
          <Card>
            <CardHeader
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={16} color={evaluation.riskLevel === 'Low' ? '#10B981' : '#F59E0B'} />
                  <span>Automated Risk Assessment</span>
                </div>
              }
              subtitle="Calculated by the Workflow Automation Engine"
            />
            <CardBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Calculated Risk Rating:</span>
                  {getRiskBadge(evaluation.riskLevel)}
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-hover)',
                    border: '1px solid var(--border-color-subtle)',
                  }}
                >
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Triggered Risk & Compliance Factors:
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {evaluation.riskFactors.map((factor, i) => (
                      <li key={i}>{factor}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} color="#8B5CF6" />
                  <span>{evaluation.triggeredRules.length} workflow rules evaluated against active institutional policies</span>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Attached Supporting Documents */}
          <Card>
            <CardHeader title="Attached Documents" subtitle="Verified proposals, quotations & venue permits" />
            <CardBody style={{ padding: '0 20px 16px 20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(request.documents || []).map((doc, i) => (
                  <div
                    key={i}
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
                      <FileText size={16} color="var(--color-brand-primary)" />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{doc.type} • {doc.size}</div>
                      </div>
                    </div>

                    <Button variant="ghost" size="xs" icon={<Download size={13} />} onClick={() => alert(`Downloading: ${doc.name}`)} />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Dynamic Vertical Approval Timeline */}
        <div>
          <Card>
            <CardHeader
              title="Approval Timeline & Sign-offs"
              subtitle="Sequential verification trail: Faculty ↓ HOD ↓ Admin ↓ Finance"
              action={<Badge status="approved">Chain Validated</Badge>}
            />
            <CardBody>
              <ApprovalTimeline timeline={request.timeline} currentStepIndex={request.currentStepIndex} />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Action Modal */}
      {modalAction && (
        <ApprovalActionModal
          isOpen={Boolean(modalAction)}
          onClose={() => setModalAction(null)}
          actionType={modalAction}
          request={request}
          onConfirm={handleActionConfirm}
        />
      )}
    </motion.div>
  );
};
