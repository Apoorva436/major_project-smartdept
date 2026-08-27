import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_WORKFLOW_RULES,
  SAMPLE_APPROVAL_REQUESTS,
  evaluateWorkflow,
} from '../data/workflowEngineData';

const WorkflowContext = createContext();

export const WorkflowProvider = ({ children }) => {
  // Rules state
  const [rules, setRules] = useState(() => {
    const saved = localStorage.getItem('smartdept-workflow-rules');
    return saved ? JSON.parse(saved) : INITIAL_WORKFLOW_RULES;
  });

  // Approval Requests state
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('smartdept-approval-requests');
    return saved ? JSON.parse(saved) : SAMPLE_APPROVAL_REQUESTS;
  });

  // Automated Notifications state
  const [workflowNotifications, setWorkflowNotifications] = useState([]);

  useEffect(() => {
    localStorage.setItem('smartdept-workflow-rules', JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    localStorage.setItem('smartdept-approval-requests', JSON.stringify(requests));
  }, [requests]);

  // Rule management functions
  const toggleRule = (ruleId) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const addRule = (newRule) => {
    const rule = {
      id: `RULE-${Math.floor(100 + Math.random() * 900)}`,
      enabled: true,
      priority: rules.length + 1,
      ...newRule,
    };
    setRules((prev) => [rule, ...prev]);
    dispatchNotification({
      title: 'Workflow Rule Added',
      message: `New rule "${rule.name}" activated across department workflows.`,
      type: 'info',
    });
  };

  const updateRule = (updatedRule) => {
    setRules((prev) => prev.map((r) => (r.id === updatedRule.id ? updatedRule : r)));
  };

  const deleteRule = (ruleId) => {
    setRules((prev) => prev.filter((r) => r.id !== ruleId));
  };

  const resetRules = () => {
    setRules(INITIAL_WORKFLOW_RULES);
  };

  // Automated Notification Dispatcher
  const dispatchNotification = ({ title, message, type = 'info', recipient }) => {
    const notif = {
      id: Date.now(),
      title,
      message,
      type,
      recipient: recipient || 'All Relevant Stakeholders',
      time: 'Just now',
    };
    setWorkflowNotifications((prev) => [notif, ...prev]);
  };

  // Approver Action: Approve
  const approveRequest = (requestId, comments = '', approverName = 'Dr. Kumar V. (HOD)') => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;

        const updatedTimeline = [...req.timeline];
        const nextStepIdx = req.currentStepIndex + 1;
        const isFullyApproved = nextStepIdx >= req.timeline.length;

        // Update current step
        if (updatedTimeline[req.currentStepIndex]) {
          updatedTimeline[req.currentStepIndex] = {
            ...updatedTimeline[req.currentStepIndex],
            status: 'Approved',
            approverName,
            timestamp: 'Just now',
            comments: comments || 'Approved without additional reservations.',
          };
        }

        // Advance next step if available
        if (!isFullyApproved && updatedTimeline[nextStepIdx]) {
          updatedTimeline[nextStepIdx] = {
            ...updatedTimeline[nextStepIdx],
            status: 'Pending',
            timestamp: 'Awaiting Action',
          };
        }

        const newStatus = isFullyApproved ? 'Approved' : 'Pending';

        dispatchNotification({
          title: isFullyApproved ? 'Activity Fully Approved!' : 'Approval Stage Cleared',
          message: isFullyApproved
            ? `"${req.title}" has received all required clearances and is now Scheduled.`
            : `"${req.title}" approved by ${approverName} and routed to ${updatedTimeline[nextStepIdx]?.role || 'Next Approver'}.`,
          type: 'success',
          recipient: req.requester.name,
        });

        return {
          ...req,
          status: newStatus,
          currentStepIndex: nextStepIdx,
          timeline: updatedTimeline,
        };
      })
    );
  };

  // Approver Action: Reject
  const rejectRequest = (requestId, comments = 'Declined during review.', approverName = 'Dr. Kumar V. (HOD)') => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;

        const updatedTimeline = [...req.timeline];
        if (updatedTimeline[req.currentStepIndex]) {
          updatedTimeline[req.currentStepIndex] = {
            ...updatedTimeline[req.currentStepIndex],
            status: 'Rejected',
            approverName,
            timestamp: 'Just now',
            comments: comments || 'Request rejected.',
          };
        }

        dispatchNotification({
          title: 'Activity Request Rejected',
          message: `"${req.title}" was declined by ${approverName}. Reason: "${comments}"`,
          type: 'danger',
          recipient: req.requester.name,
        });

        return {
          ...req,
          status: 'Rejected',
          timeline: updatedTimeline,
        };
      })
    );
  };

  // Approver Action: Request Changes
  const requestChanges = (requestId, comments, approverName = 'Dr. Kumar V. (HOD)') => {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;

        const updatedTimeline = [...req.timeline];
        if (updatedTimeline[req.currentStepIndex]) {
          updatedTimeline[req.currentStepIndex] = {
            ...updatedTimeline[req.currentStepIndex],
            status: 'Changes Requested',
            approverName,
            timestamp: 'Just now',
            comments: comments || 'Modifications requested by approver.',
          };
        }

        dispatchNotification({
          title: 'Modifications Requested',
          message: `${approverName} requested revisions on "${req.title}". Remarks: "${comments}"`,
          type: 'warning',
          recipient: req.requester.name,
        });

        return {
          ...req,
          status: 'Changes Requested',
          timeline: updatedTimeline,
        };
      })
    );
  };

  return (
    <WorkflowContext.Provider
      value={{
        rules,
        toggleRule,
        addRule,
        updateRule,
        deleteRule,
        resetRules,
        requests,
        approveRequest,
        rejectRequest,
        requestChanges,
        workflowNotifications,
        evaluateActivityWorkflow: (activity) => evaluateWorkflow(activity, rules),
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => useContext(WorkflowContext);
