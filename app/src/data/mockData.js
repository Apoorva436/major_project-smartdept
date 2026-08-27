// src/data/mockData.js - Enterprise mock datasets for SMARTDEPT

export const HOD_STATS = {
  totalActivities: 284,
  totalActivitiesTrend: 12.4,
  pendingApprovals: 12,
  pendingApprovalsUrgent: 4,
  upcomingEvents: 8,
  budgetUtilization: 72,
  budgetSpent: '$144,000',
  budgetTotal: '$200,000',
  studentParticipation: 1847,
  studentParticipationTrend: 18.2,
  facultyWorkload: 34,
  facultyAverageHours: 42,
};

export const MONTHLY_ACTIVITY_TREND = [
  { month: 'Jan', activities: 18, approved: 16, budget: 12000 },
  { month: 'Feb', activities: 24, approved: 22, budget: 15500 },
  { month: 'Mar', activities: 32, approved: 28, budget: 21000 },
  { month: 'Apr', activities: 28, approved: 25, budget: 18000 },
  { month: 'May', activities: 35, approved: 30, budget: 24000 },
  { month: 'Jun', activities: 20, approved: 19, budget: 14000 },
  { month: 'Jul', activities: 15, approved: 14, budget: 9000 },
  { month: 'Aug', activities: 38, approved: 34, budget: 28000 },
  { month: 'Sep', activities: 42, approved: 38, budget: 32000 },
  { month: 'Oct', activities: 45, approved: 41, budget: 35000 },
  { month: 'Nov', activities: 39, approved: 35, budget: 26000 },
  { month: 'Dec', activities: 29, approved: 27, budget: 19000 },
];

export const BUDGET_UTILIZATION_DATA = [
  { category: 'Workshops', allocated: 50000, spent: 42000 },
  { category: 'Conferences', allocated: 60000, spent: 48000 },
  { category: 'Hackathons', allocated: 35000, spent: 26000 },
  { category: 'Guest Lectures', allocated: 25000, spent: 16000 },
  { category: 'Equipment & Labs', allocated: 30000, spent: 12000 },
];

export const UPCOMING_ACTIVITIES = [
  {
    id: 'ACT-9021',
    title: 'International AI & Robotics Symposium 2026',
    department: 'Computer Science',
    date: 'Aug 28, 2026',
    status: 'Scheduled',
    venue: 'Auditorium A',
    participants: 320,
    leadFaculty: 'Dr. Sarah Jenkins',
  },
  {
    id: 'ACT-9022',
    title: 'Hands-on Cloud Infrastructure Bootcamp',
    department: 'Information Science',
    date: 'Sep 02, 2026',
    status: 'Approved',
    venue: 'Tech Lab 4',
    participants: 85,
    leadFaculty: 'Prof. David Chen',
  },
  {
    id: 'ACT-9023',
    title: 'Annual Department Hackathon (HackSmart)',
    department: 'Computer Science',
    date: 'Sep 10, 2026',
    status: 'Ongoing',
    venue: 'Innovation Hub',
    participants: 240,
    leadFaculty: 'Dr. Maya Patel',
  },
  {
    id: 'ACT-9024',
    title: 'Industry Connect: Quantum Computing Talk',
    department: 'Electronics',
    date: 'Sep 15, 2026',
    status: 'Draft',
    venue: 'Seminar Hall 2',
    participants: 120,
    leadFaculty: 'Prof. Amit Rao',
  },
  {
    id: 'ACT-9025',
    title: 'Cybersecurity Vulnerability Assessment Lab',
    department: 'Cybersecurity',
    date: 'Sep 22, 2026',
    status: 'Scheduled',
    venue: 'Security Lab B',
    participants: 60,
    leadFaculty: 'Dr. Elena Rostova',
  },
];

export const PENDING_APPROVALS_LIST = [
  {
    id: 'REQ-1048',
    title: 'Procurement of High-Performance GPU Cluster',
    requestedBy: 'Dr. Sarah Jenkins',
    role: 'Associate Professor',
    amount: '$18,500',
    department: 'CS - AI Lab',
    date: 'Today, 09:30 AM',
    priority: 'High',
    type: 'Equipment',
  },
  {
    id: 'REQ-1049',
    title: 'Guest Honorarium: Dr. Thorne (MIT Lecture)',
    requestedBy: 'Prof. David Chen',
    role: 'Assistant Professor',
    amount: '$2,500',
    department: 'CS - Networks',
    date: 'Yesterday',
    priority: 'Medium',
    type: 'Honorarium',
  },
  {
    id: 'REQ-1050',
    title: 'Industrial Visit to National Supercomputing Center',
    requestedBy: 'Prof. Amit Rao',
    role: 'Faculty Coordinator',
    amount: '$4,200',
    department: 'Electronics',
    date: 'Aug 22, 2026',
    priority: 'High',
    type: 'Travel',
  },
  {
    id: 'REQ-1051',
    title: 'ACM Student Chapter Annual Renewal & Kit',
    requestedBy: 'Priya Sharma',
    role: 'Student Head',
    amount: '$1,200',
    department: 'Computer Science',
    date: 'Aug 21, 2026',
    priority: 'Normal',
    type: 'Club Sponsorship',
  },
];

export const FACULTY_WORKLOAD_DATA = [
  { name: 'Dr. S. Jenkins', activities: 8, hours: 48, status: 'Overloaded' },
  { name: 'Prof. D. Chen', activities: 6, hours: 44, status: 'Overloaded' },
  { name: 'Dr. M. Patel', activities: 7, hours: 46, status: 'Overloaded' },
  { name: 'Prof. A. Rao', activities: 4, hours: 36, status: 'Optimal' },
  { name: 'Dr. E. Rostova', activities: 5, hours: 38, status: 'Optimal' },
  { name: 'Prof. K. Verma', activities: 3, hours: 32, status: 'Available' },
];

export const STUDENT_PARTICIPATION_DATA = [
  { department: 'Computer Science', count: 680, target: 700 },
  { department: 'Information Science', count: 420, target: 450 },
  { department: 'Electronics & Comm.', count: 390, target: 400 },
  { department: 'Cybersecurity', count: 210, target: 200 },
  { department: 'Data Science', count: 147, target: 150 },
];

export const RECENT_ACTIVITY_TIMELINE = [
  {
    id: 1,
    title: 'Budget Allocation Approved for Q3 Research',
    desc: 'HOD approved budget request REQ-1042 ($24,000)',
    time: '12 minutes ago',
    type: 'approved',
    user: 'Dr. Kumar (HOD)',
  },
  {
    id: 2,
    title: 'New Activity Request: Web3 Security Summit',
    desc: 'Submitted by Prof. Elena Rostova awaiting clearance',
    time: '45 minutes ago',
    type: 'pending',
    user: 'Prof. Elena Rostova',
  },
  {
    id: 3,
    title: 'Attendance Report Auto-Generated',
    desc: 'Automated 100% attendance sync for Cloud Bootcamp',
    time: '2 hours ago',
    type: 'completed',
    user: 'System Automation',
  },
  {
    id: 4,
    title: 'Resource Conflict Resolved: Auditorium A',
    desc: 'AI re-allocated Seminar Hall 1 for IEEE meeting',
    time: '4 hours ago',
    type: 'scheduled',
    user: 'SmartDept AI',
  },
  {
    id: 5,
    title: 'Activity Rescheduled: Embedded Systems Demo',
    desc: 'Moved to Sep 04 due to faculty travel itinerary',
    time: 'Yesterday',
    type: 'rejected',
    user: 'Prof. Amit Rao',
  },
];

export const AI_INSIGHTS = [
  {
    id: 1,
    type: 'positive',
    title: 'Student Participation Growth',
    message: 'Student participation increased 18% this semester.',
    action: 'View Breakdown',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Faculty Workload Anomaly',
    message: '3 faculty members have significantly higher activity workload.',
    action: 'Rebalance Workload',
  },
  {
    id: 3,
    type: 'critical',
    title: 'Venue Conflict Alert',
    message: '2 venue conflicts detected next week.',
    action: 'Auto-Resolve Conflicts',
  },
  {
    id: 4,
    type: 'info',
    title: 'Budget Allocation Alert',
    message: 'Equipment & Labs budget is currently at 40% utilization with 2 months remaining in Q3.',
    action: 'Review Allocations',
  },
];

// ==========================================
// STUDENT DASHBOARD DATA
// ==========================================
export const STUDENT_STATS = {
  activityPoints: 340,
  pointsRequired: 400,
  certificatesEarned: 12,
  attendancePercentage: 94.5,
  upcomingEventsCount: 4,
};

export const STUDENT_REGISTERED_ACTIVITIES = [
  {
    id: 'SA-1',
    name: 'National Level Hackathon 2026',
    date: 'Aug 29, 2026',
    venue: 'Main Arena',
    status: 'Scheduled',
    points: 40,
    attendance: 'Registered',
  },
  {
    id: 'SA-2',
    name: 'Hands-on Kubernetes & Docker Lab',
    date: 'Aug 24, 2026',
    venue: 'Tech Lab 2',
    status: 'Completed',
    points: 30,
    attendance: 'Present (100%)',
  },
  {
    id: 'SA-3',
    name: 'AI Ethics & Responsible LLMs Panel',
    date: 'Aug 18, 2026',
    venue: 'Auditorium B',
    status: 'Completed',
    points: 20,
    attendance: 'Present (100%)',
  },
  {
    id: 'SA-4',
    name: 'Full-Stack GraphQL Masterclass',
    date: 'Sep 05, 2026',
    venue: 'Online Room 4',
    status: 'Approved',
    points: 25,
    attendance: 'Confirmed',
  },
];

export const STUDENT_CERTIFICATES = [
  { id: 'C-1', title: 'Advanced Cloud Architecture', issuedDate: 'Aug 2026', credentialId: 'SD-88910-CA' },
  { id: 'C-2', title: 'Deep Learning Specialization', issuedDate: 'Jul 2026', credentialId: 'SD-77120-DL' },
  { id: 'C-3', title: 'DevOps CI/CD Pipelines', issuedDate: 'Jun 2026', credentialId: 'SD-55201-DO' },
  { id: 'C-4', title: 'Cybersecurity Analyst Level 1', issuedDate: 'May 2026', credentialId: 'SD-33109-CS' },
];

export const STUDENT_NOTIFICATIONS = [
  { id: 1, title: 'Certificate Issued', desc: 'Your certificate for Cloud Bootcamp is ready to download', time: '10m ago' },
  { id: 2, title: 'Venue Update', desc: 'HackSmart Hackathon moved to Innovation Hub Arena', time: '1h ago' },
  { id: 3, title: 'Points Credited', desc: '+30 Activity points credited for DevOps workshop attendance', time: 'Yesterday' },
];

// ==========================================
// FACULTY DASHBOARD DATA
// ==========================================
export const FACULTY_STATS = {
  myActivities: 18,
  pendingStudentRequests: 7,
  upcomingEventsThisMonth: 5,
  weeklyWorkloadHours: 42,
  reportsGenerated: 24,
  avgStudentFeedback: 4.8,
};

export const FACULTY_MY_ACTIVITIES = [
  {
    id: 'FA-101',
    title: 'Research Methodology Workshop for Postgrads',
    date: 'Aug 30, 2026',
    participants: 45,
    status: 'Scheduled',
    budget: '$1,500',
  },
  {
    id: 'FA-102',
    title: 'Industry Mentorship: Microservices at Scale',
    date: 'Sep 04, 2026',
    participants: 90,
    status: 'Approved',
    budget: '$3,200',
  },
  {
    id: 'FA-103',
    title: 'Department Curriculum Review 2026-27',
    date: 'Sep 12, 2026',
    participants: 18,
    status: 'Draft',
    budget: '$800',
  },
  {
    id: 'FA-104',
    title: 'ACM Student Paper Presentation Session',
    date: 'Sep 18, 2026',
    participants: 60,
    status: 'Ongoing',
    budget: '$2,000',
  },
];

// ==========================================
// ADMIN DASHBOARD DATA
// ==========================================
export const ADMIN_STATS = {
  totalUsers: 2480,
  activeUsersToday: 1290,
  totalDepartments: 8,
  totalResources: 64,
  systemUptime: '99.98%',
  apiRequestsToday: '142.8k',
};

export const ADMIN_AUDIT_LOGS = [
  {
    id: 'LOG-881',
    user: 'admin_sys@smartdept.edu',
    action: 'Policy Update',
    details: 'Modified approval threshold for tier 2 budgets to $15,000',
    ip: '192.168.1.104',
    time: '2 mins ago',
    status: 'Approved',
  },
  {
    id: 'LOG-882',
    user: 'dr.kumar@smartdept.edu',
    action: 'Role Escalation',
    details: 'Granted temporary Approver rights to Dr. Sarah Jenkins',
    ip: '192.168.2.14',
    time: '18 mins ago',
    status: 'Completed',
  },
  {
    id: 'LOG-883',
    user: 'system_bot',
    action: 'Automated Backup',
    details: 'Completed encrypted snapshot backup of database (cluster 01)',
    ip: '10.0.0.2',
    time: '1 hour ago',
    status: 'Approved',
  },
  {
    id: 'LOG-884',
    user: 'faculty_chen@smartdept.edu',
    action: 'Failed Login Attempt',
    details: 'Exceeded MFA threshold (Reset link dispatched)',
    ip: '142.250.190.46',
    time: '2 hours ago',
    status: 'Rejected',
  },
  {
    id: 'LOG-885',
    user: 'admin_sys@smartdept.edu',
    action: 'Resource Created',
    details: 'Added Innovation Hub Lab 3 to scheduling pool',
    ip: '192.168.1.104',
    time: 'Yesterday',
    status: 'Completed',
  },
];

export const SYSTEM_ACTIVITY_SERIES = [
  { time: '00:00', requests: 420, activeUsers: 45 },
  { time: '03:00', requests: 180, activeUsers: 20 },
  { time: '06:00', requests: 310, activeUsers: 60 },
  { time: '09:00', requests: 2840, activeUsers: 840 },
  { time: '12:00', requests: 4120, activeUsers: 1180 },
  { time: '15:00', requests: 3950, activeUsers: 1050 },
  { time: '18:00', requests: 2100, activeUsers: 620 },
  { time: '21:00', requests: 1100, activeUsers: 290 },
];
