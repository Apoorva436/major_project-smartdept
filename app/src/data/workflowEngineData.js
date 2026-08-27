// src/data/workflowEngineData.js - Configurable Workflow Automation Engine

export const INITIAL_WORKFLOW_RULES = [
  {
    id: 'RULE-001',
    name: 'Standard Department Activity (Budget <= $10,000)',
    description: 'Internal activities within standard department financial discretion',
    enabled: true,
    conditionType: 'budget_lte',
    threshold: 10000,
    field: 'budget',
    requiredApprovers: ['Faculty Coordinator', 'Head of Department (HOD)'],
    riskLevel: 'Low',
    priority: 1,
  },
  {
    id: 'RULE-002',
    name: 'High-Budget Expenditure (Budget > $10,000)',
    description: 'Capital outlays and large-scale summits requiring institutional executive review',
    enabled: true,
    conditionType: 'budget_gt',
    threshold: 10000,
    field: 'budget',
    requiredApprovers: ['Faculty Coordinator', 'Head of Department (HOD)', 'Principal / Admin', 'Finance & Accounts'],
    riskLevel: 'High',
    priority: 2,
  },
  {
    id: 'RULE-003',
    name: 'External Guest Speaker / Dignitary Protocol',
    description: 'Invited foreign or industry keynote speakers requiring administrative clearance',
    enabled: true,
    conditionType: 'boolean_flag',
    flagField: 'hasExternalSpeaker',
    requiredApprovers: ['Faculty Coordinator', 'Head of Department (HOD)', 'Principal / Admin'],
    riskLevel: 'Medium',
    priority: 3,
  },
  {
    id: 'RULE-004',
    name: 'Off-Campus / External Venue Reservation',
    description: 'Activities hosted at non-campus conference centers requiring external liability approval',
    enabled: true,
    conditionType: 'boolean_flag',
    flagField: 'isExternalVenue',
    requiredApprovers: ['Faculty Coordinator', 'Head of Department (HOD)', 'Principal / Admin'],
    riskLevel: 'Medium',
    priority: 4,
  },
  {
    id: 'RULE-005',
    name: 'Industrial Visit & Field Study Protocol',
    description: 'Off-campus student excursions requiring fleet transport and safety officer sign-off',
    enabled: true,
    conditionType: 'activity_type',
    activityType: 'Industrial Visit',
    requiredApprovers: ['Faculty Coordinator', 'Head of Department (HOD)', 'Principal / Admin', 'Transport & Safety Officer'],
    riskLevel: 'High',
    priority: 5,
  },
];

/**
 * Core Rule Engine Function
 * Dynamically evaluates activity attributes against all active workflow rules.
 */
export const evaluateWorkflow = (activity, rules = INITIAL_WORKFLOW_RULES) => {
  const triggeredRules = [];
  const approversSet = new Set(['Faculty Coordinator', 'Head of Department (HOD)']);
  const riskFactors = [];
  let calculatedRisk = 'Low';

  const activeRules = rules.filter((r) => r.enabled);

  const budget = parseFloat(activity.budget || activity.estimatedBudget || 0);
  const hasExternalSpeaker = Boolean(activity.hasExternalSpeaker);
  const isExternalVenue = Boolean(activity.isExternalVenue || (activity.venue && activity.venue.toLowerCase().includes('off-campus')));
  const isIndustrialVisit = activity.category === 'Industrial Visit' || activity.type === 'Industrial Visit';

  activeRules.forEach((rule) => {
    let triggered = false;

    if (rule.conditionType === 'budget_lte' && budget <= rule.threshold) {
      triggered = true;
    } else if (rule.conditionType === 'budget_gt' && budget > rule.threshold) {
      triggered = true;
      riskFactors.push(`Budget ($${budget.toLocaleString()}) exceeds the $${rule.threshold.toLocaleString()} threshold.`);
      if (calculatedRisk !== 'Critical') calculatedRisk = 'High';
    } else if (rule.conditionType === 'boolean_flag') {
      if (rule.flagField === 'hasExternalSpeaker' && hasExternalSpeaker) {
        triggered = true;
        riskFactors.push('External keynote speaker protocol requires institutional administration clearance.');
        if (calculatedRisk === 'Low') calculatedRisk = 'Medium';
      } else if (rule.flagField === 'isExternalVenue' && isExternalVenue) {
        triggered = true;
        riskFactors.push('External/off-campus venue requires security & liability clearance.');
        if (calculatedRisk === 'Low') calculatedRisk = 'Medium';
      }
    } else if (rule.conditionType === 'activity_type' && isIndustrialVisit) {
      triggered = true;
      riskFactors.push('Industrial Visit requires college fleet bus charter and student safety approval.');
      calculatedRisk = 'High';
    }

    if (triggered) {
      triggeredRules.push(rule);
      rule.requiredApprovers.forEach((appr) => approversSet.add(appr));
    }
  });

  // Standard ordered pipeline
  const standardOrder = [
    'Faculty Coordinator',
    'Head of Department (HOD)',
    'Transport & Safety Officer',
    'Principal / Admin',
    'Finance & Accounts',
  ];

  const sortedApprovers = standardOrder.filter((appr) => approversSet.has(appr));

  return {
    requiredApprovers: sortedApprovers,
    riskLevel: calculatedRisk,
    triggeredRules,
    riskFactors: riskFactors.length > 0 ? riskFactors : ['Standard department operational risk.'],
  };
};

export const SAMPLE_APPROVAL_REQUESTS = [
  {
    id: 'REQ-2026-801',
    activityId: 'ACT-2026-001',
    title: 'International AI & Robotics Summit 2026',
    category: 'Workshop',
    requester: {
      name: 'Dr. Sarah Jenkins',
      role: 'Associate Professor',
      department: 'Computer Science & Engineering',
      email: 'sarah.jenkins@smartdept.edu',
      avatar: 'Sarah',
    },
    budget: 18500,
    fundingSource: 'Department Innovation Grant & IEEE Chapter',
    dates: 'Sep 12 - Sep 14, 2026',
    venue: 'Main Auditorium A & Robotics Lab 3',
    hasExternalSpeaker: true,
    isExternalVenue: false,
    externalSpeakerName: 'Dr. Michael Thorne (MIT AI Lab)',
    description: 'Flagship 3-day summit featuring international keynote talks, GPU-accelerated ROS2 workshops, and student project showcases.',
    documents: [
      { name: 'AI_Robotics_Summit_Proposal_v3.pdf', size: '3.4 MB', type: 'Proposal' },
      { name: 'Auditorium_A_Reservation_Clearance.pdf', size: '1.1 MB', type: 'Venue Clearance' },
      { name: 'Speaker_Honorarium_MOU_MIT.pdf', size: '1.8 MB', type: 'Speaker Agreement' },
    ],
    status: 'Pending', // 'Pending' | 'Approved' | 'Changes Requested' | 'Rejected'
    currentStepIndex: 1, // Currently at HOD
    timeline: [
      {
        step: 1,
        role: 'Faculty Coordinator',
        approverName: 'Dr. Sarah Jenkins',
        title: 'Associate Professor (Lead)',
        status: 'Approved',
        timestamp: 'Aug 10, 2026 - 11:20 AM',
        comments: 'Curriculum alignment verified. 32 GPU workstations reserved.',
      },
      {
        step: 2,
        role: 'Head of Department (HOD)',
        approverName: 'Dr. Kumar V.',
        title: 'Professor & HOD (CSE)',
        status: 'Pending',
        timestamp: 'Awaiting Action',
        comments: '',
      },
      {
        step: 3,
        role: 'Principal / Admin',
        approverName: 'Prof. R. Radhakrishnan',
        title: 'Dean of Academic Affairs',
        status: 'Queued',
        timestamp: 'Pending HOD Clearance',
        comments: '',
      },
      {
        step: 4,
        role: 'Finance & Accounts',
        approverName: 'CA Rajesh Sharma',
        title: 'Chief Financial Officer',
        status: 'Queued',
        timestamp: 'Pending Admin Clearance',
        comments: '',
      },
    ],
  },
  {
    id: 'REQ-2026-802',
    activityId: 'ACT-2026-004',
    title: 'Industry Visit to National Supercomputing Center',
    category: 'Industrial Visit',
    requester: {
      name: 'Prof. Amit Rao',
      role: 'Faculty Coordinator',
      department: 'Computer Science & Engineering',
      email: 'amit.rao@smartdept.edu',
      avatar: 'Amit',
    },
    budget: 4200,
    fundingSource: 'Department Travel Fund',
    dates: 'Sep 24, 2026 (08:30 AM - 05:00 PM)',
    venue: 'National Supercomputing Complex (Off-Campus)',
    hasExternalSpeaker: false,
    isExternalVenue: true,
    description: 'Educational field visit for 60 final-year students to inspect petascale supercomputing racks and cryogenic quantum testbeds.',
    documents: [
      { name: 'Supercomputing_Center_Security_Pass.pdf', size: '1.2 MB', type: 'Entry Permit' },
      { name: 'Student_Consent_and_Insurance_List.pdf', size: '4.8 MB', type: 'Parent Consent' },
    ],
    status: 'Pending',
    currentStepIndex: 1,
    timeline: [
      {
        step: 1,
        role: 'Faculty Coordinator',
        approverName: 'Prof. Amit Rao',
        title: 'Faculty Coordinator',
        status: 'Approved',
        timestamp: 'Aug 21, 2026 - 02:15 PM',
        comments: 'Parent consent forms collected for all 60 students.',
      },
      {
        step: 2,
        role: 'Head of Department (HOD)',
        approverName: 'Dr. Kumar V.',
        title: 'Professor & HOD',
        status: 'Pending',
        timestamp: 'Awaiting Action',
        comments: '',
      },
      {
        step: 3,
        role: 'Transport & Safety Officer',
        approverName: 'Col. M. Singh',
        title: 'Chief Transport Officer',
        status: 'Queued',
        timestamp: 'Pending HOD Clearance',
        comments: '',
      },
      {
        step: 4,
        role: 'Principal / Admin',
        approverName: 'Prof. R. Radhakrishnan',
        title: 'Principal / Dean',
        status: 'Queued',
        timestamp: 'Pending Transport Clearance',
        comments: '',
      },
    ],
  },
  {
    id: 'REQ-2026-803',
    activityId: 'ACT-2026-002',
    title: 'Cloud Infrastructure & Kubernetes Lab Bootcamp',
    category: 'Workshop',
    requester: {
      name: 'Prof. David Chen',
      role: 'Assistant Professor',
      department: 'Computer Science & Engineering',
      email: 'david.chen@smartdept.edu',
      avatar: 'David',
    },
    budget: 3500,
    fundingSource: 'Department Innovation Pool',
    dates: 'Sep 02 - Sep 03, 2026',
    venue: 'Computer Lab 4 (Cloud Systems Lab)',
    hasExternalSpeaker: false,
    isExternalVenue: false,
    description: 'Hands-on weekend bootcamp covering microservices, containerization, and AWS cloud deployment for 85 students.',
    documents: [
      { name: 'Cloud_Lab_Syllabus_and_License_List.pdf', size: '1.4 MB', type: 'Curriculum' },
    ],
    status: 'Approved',
    currentStepIndex: 2,
    timeline: [
      {
        step: 1,
        role: 'Faculty Coordinator',
        approverName: 'Prof. David Chen',
        title: 'Assistant Professor',
        status: 'Approved',
        timestamp: 'Aug 14, 2026 - 10:00 AM',
        comments: 'Lab 4 verified with 90 working dual-monitor terminals.',
      },
      {
        step: 2,
        role: 'Head of Department (HOD)',
        approverName: 'Dr. Kumar V.',
        title: 'Professor & HOD',
        status: 'Approved',
        timestamp: 'Aug 16, 2026 - 04:30 PM',
        comments: 'Approved under Tier 1 discretionary allowance.',
      },
    ],
  },
  {
    id: 'REQ-2026-804',
    activityId: 'ACT-2026-003',
    title: 'Guest Lecture on Responsible LLMs and AI Ethics',
    category: 'Guest Lecture',
    requester: {
      name: 'Dr. Maya Patel',
      role: 'Professor',
      department: 'Computer Science & Engineering',
      email: 'maya.patel@smartdept.edu',
      avatar: 'Maya',
    },
    budget: 2500,
    fundingSource: 'ACM Student Chapter Honorarium Pool',
    dates: 'Sep 08, 2026 (02:00 PM - 04:30 PM)',
    venue: 'Seminar Hall 1',
    hasExternalSpeaker: true,
    externalSpeakerName: 'Dr. Arvind Narayanan (Princeton University)',
    isExternalVenue: false,
    description: 'Invited lecture addressing algorithmic bias, privacy-preserving AI, and watermarking technologies.',
    documents: [
      { name: 'Speaker_Invitation_Formal_Letter.pdf', size: '890 KB', type: 'Invitation' },
      { name: 'Lecture_Abstract_and_Biosketch.pdf', size: '640 KB', type: 'Abstract' },
    ],
    status: 'Changes Requested',
    currentStepIndex: 1,
    timeline: [
      {
        step: 1,
        role: 'Faculty Coordinator',
        approverName: 'Dr. Maya Patel',
        title: 'Professor (AI Lead)',
        status: 'Approved',
        timestamp: 'Aug 22, 2026 - 09:00 AM',
        comments: 'Honorarium verified with ACM student chapter treasurer.',
      },
      {
        step: 2,
        role: 'Head of Department (HOD)',
        approverName: 'Dr. Kumar V.',
        title: 'Professor & HOD',
        status: 'Changes Requested',
        timestamp: 'Aug 24, 2026 - 03:15 PM',
        comments: 'Please attach hybrid Zoom streaming link details so M.Tech students can also join.',
      },
      {
        step: 3,
        role: 'Principal / Admin',
        approverName: 'Prof. R. Radhakrishnan',
        title: 'Dean of Academic Affairs',
        status: 'Queued',
        timestamp: 'Pending HOD Clearance',
        comments: '',
      },
    ],
  },
];
