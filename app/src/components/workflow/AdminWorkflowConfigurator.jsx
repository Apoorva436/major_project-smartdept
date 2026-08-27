import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sliders,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  Shield,
  Sparkles,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { useWorkflow } from '../../contexts/WorkflowContext';

export const AdminWorkflowConfigurator = () => {
  const { rules, toggleRule, addRule, deleteRule, resetRules, evaluateActivityWorkflow } = useWorkflow();

  const [newRuleModalOpen, setNewRuleModalOpen] = useState(false);
  const [newRuleForm, setNewRuleForm] = useState({
    name: '',
    description: '',
    conditionType: 'budget_gt',
    threshold: 10000,
    flagField: 'hasExternalSpeaker',
    activityType: 'Workshop',
    requiredApprovers: ['Faculty Coordinator', 'Head of Department (HOD)', 'Principal / Admin'],
    riskLevel: 'Medium',
  });

  // Sandbox / Live Rule Simulator State
  const [simActivity, setSimActivity] = useState({
    title: 'Test Department Activity',
    category: 'Workshop',
    budget: 15000,
    hasExternalSpeaker: true,
    isExternalVenue: false,
  });

  const simResult = evaluateActivityWorkflow(simActivity);

  const handleCreateRule = (e) => {
    e.preventDefault();
    if (!newRuleForm.name) return;

    addRule(newRuleForm);
    setNewRuleModalOpen(false);
    setNewRuleForm({
      name: '',
      description: '',
      conditionType: 'budget_gt',
      threshold: 10000,
      flagField: 'hasExternalSpeaker',
      activityType: 'Workshop',
      requiredApprovers: ['Faculty Coordinator', 'Head of Department (HOD)', 'Principal / Admin'],
      riskLevel: 'Medium',
    });
  };

  const toggleApproverInNewRule = (approver) => {
    const list = newRuleForm.requiredApprovers;
    if (list.includes(approver)) {
      setNewRuleForm({ ...newRuleForm, requiredApprovers: list.filter((a) => a !== approver) });
    } else {
      setNewRuleForm({ ...newRuleForm, requiredApprovers: [...list, approver] });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header with Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Configurable Workflow Automation Rules
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Define conditional triggers for automated approval routing, risk grading, and finance oversight.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" size="sm" icon={<RefreshCw size={13} />} onClick={resetRules}>
            Reset to Defaults
          </Button>
          <Button variant="primary" size="sm" icon={<PlusCircle size={14} />} onClick={() => setNewRuleModalOpen(true)}>
            + Add New Rule
          </Button>
        </div>
      </div>

      {/* 1. Active Rule Cards Grid */}
      <div style={{ display: 'grid', gap: '12px' }}>
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardBody style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {rule.name}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>({rule.id})</span>
                    <Badge status={rule.riskLevel === 'Low' ? 'approved' : rule.riskLevel === 'Medium' ? 'pending' : 'rejected'}>
                      {rule.riskLevel} Risk
                    </Badge>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    {rule.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      Required Approvers:
                    </span>
                    {rule.requiredApprovers.map((appr, idx) => (
                      <span key={idx} className="badge badge-neutral" style={{ fontSize: '11px' }}>
                        {idx + 1}. {appr}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Toggle & Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => toggleRule(rule.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: rule.enabled ? '#10B981' : 'var(--text-muted)',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {rule.enabled ? <ToggleRight size={28} color="#10B981" /> : <ToggleLeft size={28} color="var(--text-muted)" />}
                    <span>{rule.enabled ? 'Active' : 'Disabled'}</span>
                  </button>

                  <Button variant="ghost" size="xs" icon={<Trash2 size={13} color="#EF4444" />} onClick={() => deleteRule(rule.id)} />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* 2. Interactive Live Rule Simulator / Sandbox */}
      <Card style={{ border: '1px solid rgba(79, 110, 247, 0.3)' }}>
        <CardHeader
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Play size={16} color="var(--color-brand-primary)" />
              <span>Live Workflow Rule Simulator & Sandbox</span>
              <span className="badge badge-primary">Interactive Engine</span>
            </div>
          }
          subtitle="Test how hypothetical activities trigger workflow rules in real-time"
        />
        <CardBody style={{ padding: '20px' }}>
          <div className="dashboard-row-2col">
            {/* Input Parameters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                1. Test Activity Parameters:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <Input
                  label="Estimated Budget ($)"
                  type="number"
                  value={simActivity.budget}
                  onChange={(e) => setSimActivity({ ...simActivity, budget: parseFloat(e.target.value) || 0 })}
                />

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={simActivity.category}
                    onChange={(e) => setSimActivity({ ...simActivity, category: e.target.value })}
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Industrial Visit">Industrial Visit</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Guest Lecture">Guest Lecture</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={simActivity.hasExternalSpeaker}
                    onChange={(e) => setSimActivity({ ...simActivity, hasExternalSpeaker: e.target.checked })}
                  />
                  <span>Has External Guest Speaker</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={simActivity.isExternalVenue}
                    onChange={(e) => setSimActivity({ ...simActivity, isExternalVenue: e.target.checked })}
                  />
                  <span>Is External / Off-Campus Venue</span>
                </label>
              </div>
            </div>

            {/* Computed Results */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface-hover)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  2. Computed Approval Chain:
                </div>
                <Badge status={simResult.riskLevel === 'Low' ? 'approved' : simResult.riskLevel === 'Medium' ? 'pending' : 'rejected'}>
                  {simResult.riskLevel} Risk
                </Badge>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {simResult.requiredApprovers.map((appr, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 10px',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ color: 'var(--color-brand-primary)' }}>Step {idx + 1}:</span>
                    <span>{appr}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <strong>Triggered Policies ({simResult.triggeredRules.length}):</strong>{' '}
                {simResult.triggeredRules.map((r) => r.name).join(' • ')}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Add New Rule Modal */}
      {newRuleModalOpen && (
        <Modal
          isOpen={newRuleModalOpen}
          onClose={() => setNewRuleModalOpen(false)}
          title="Create Workflow Automation Rule"
          subtitle="Define conditional criteria to require additional approvals or adjust risk levels"
          maxWidth="560px"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
              <Button variant="secondary" size="sm" onClick={() => setNewRuleModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleCreateRule}>
                Save Rule
              </Button>
            </div>
          }
        >
          <form onSubmit={handleCreateRule} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input
              label="Rule Name *"
              placeholder="e.g. VIP International Guest Protocol"
              value={newRuleForm.name}
              onChange={(e) => setNewRuleForm({ ...newRuleForm, name: e.target.value })}
              required
            />

            <Input
              label="Description"
              placeholder="Brief explanation of policy justification..."
              value={newRuleForm.description}
              onChange={(e) => setNewRuleForm({ ...newRuleForm, description: e.target.value })}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Condition Trigger Type</label>
                <select
                  className="form-input"
                  value={newRuleForm.conditionType}
                  onChange={(e) => setNewRuleForm({ ...newRuleForm, conditionType: e.target.value })}
                >
                  <option value="budget_gt">Budget Greater Than (&gt;)</option>
                  <option value="budget_lte">Budget Less Than / Equal (&le;)</option>
                  <option value="boolean_flag">Special Flag (Speaker / Venue)</option>
                  <option value="activity_type">Specific Activity Type</option>
                </select>
              </div>

              {newRuleForm.conditionType.includes('budget') ? (
                <Input
                  label="Threshold Amount ($)"
                  type="number"
                  value={newRuleForm.threshold}
                  onChange={(e) => setNewRuleForm({ ...newRuleForm, threshold: parseFloat(e.target.value) || 0 })}
                />
              ) : (
                <div className="form-group">
                  <label className="form-label">Risk Level Tag</label>
                  <select
                    className="form-input"
                    value={newRuleForm.riskLevel}
                    onChange={(e) => setNewRuleForm({ ...newRuleForm, riskLevel: e.target.value })}
                  >
                    <option value="Low">Low Risk</option>
                    <option value="Medium">Medium Risk</option>
                    <option value="High">High Risk</option>
                    <option value="Critical">Critical Risk</option>
                  </select>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Required Approver Chain</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                {[
                  'Faculty Coordinator',
                  'Head of Department (HOD)',
                  'Principal / Admin',
                  'Finance & Accounts',
                  'Transport & Safety Officer',
                ].map((appr) => (
                  <label
                    key={appr}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: newRuleForm.requiredApprovers.includes(appr) ? 'rgba(79, 110, 247, 0.1)' : 'var(--bg-surface-hover)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={newRuleForm.requiredApprovers.includes(appr)}
                      onChange={() => toggleApproverInNewRule(appr)}
                    />
                    <span>{appr}</span>
                  </label>
                ))}
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
