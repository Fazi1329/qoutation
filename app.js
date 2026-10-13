/**
 * ==========================================================================
 * QueueFlow AI — Application Logic & Core State Management
 * Complete implementation for Sales & Customer Service Queue Management
 * ==========================================================================
 */

// Initial Seed Data
const DEFAULT_STAFF = [
  { id: 'usr-1', name: 'David Vance', role: 'admin', title: 'Admin & Operations', avatar: 'DV' },
  { id: 'usr-2', name: 'Elena Rostova', role: 'manager', title: 'Service & Queue Manager', avatar: 'ER' },
  { id: 'usr-3', name: 'Liam Chen', role: 'support', title: 'Senior Support Specialist', avatar: 'LC' },
  { id: 'usr-4', name: 'Maya Brooks', role: 'sales', title: 'Lead Account Executive', avatar: 'MB' }
];

const DEFAULT_TICKETS = [
  {
    id: 'QF-1048',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@acmelogistics.com',
    customerPhone: '+1 (555) 234-9812',
    contactMethod: 'Email',
    subject: 'Enterprise quotation request for 5,000 pallet cold storage',
    message: 'Hello, our regional fulfillment hub requires immediate temperature-controlled warehousing for roughly 5,000 pallets starting next month. Please share enterprise tier pricing and SLA terms.',
    type: 'Sales',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Maya Brooks',
    createdDate: '2026-10-13 09:15',
    updatedDate: '2026-10-13 11:40',
    resolvedDate: null,
    isOverdue: false,
    aiAnalysis: {
      category: 'Enterprise Sales & Quotation',
      suggestedPriority: 'High',
      department: 'Sales',
      sentimentScore: '+0.75 (High Intent)',
      urgentRisk: false,
      summary: 'Prospective client requires high-volume cold storage (5,000 pallets) next month. High revenue potential.',
      recommendedAction: 'Send formal commercial quotation and schedule a 20-minute discovery call with logistics director.',
      drafts: {
        empathetic: 'Dear Sarah,\n\nThank you for reaching out to Sadr Logistics. We would be delighted to support your 5,000 pallet cold storage requirement. I have outlined our warehouse availability and SLA tiers for you.',
        concise: 'Hi Sarah, thank you for your enquiry. We have available capacity for 5,000 cold storage pallets. Please find our pricing schedule attached or let us know a good time for a brief call.',
        formal: 'Dear Ms. Jenkins,\n\nWe acknowledge receipt of your enterprise storage enquiry. Sadr Logistics currently maintains certified temperature-controlled capacity. Our commercial terms are detailed below.',
        sales: 'Hi Sarah! Exciting timing — our regional cold storage facility recently expanded and is equipped to host your 5,000 pallets with dedicated tracking APIs. Can we connect tomorrow at 10 AM?'
      }
    },
    interactions: [
      { sender: 'customer', author: 'Sarah Jenkins', text: 'Hello, our regional fulfillment hub requires immediate temperature-controlled warehousing for roughly 5,000 pallets starting next month.', time: '2026-10-13 09:15' },
      { sender: 'system', author: 'QueueFlow AI', text: 'AI auto-triaged: Priority set to High, Department routed to Sales.', time: '2026-10-13 09:16' },
      { sender: 'agent', author: 'Maya Brooks', text: 'Hi Sarah, I am preparing the custom quotation for your 5,000 pallet storage and will have the specification sheet ready shortly.', time: '2026-10-13 11:40' }
    ],
    notes: [
      { author: 'Maya Brooks', text: 'Spoke with warehouse manager; Zone B has 5,200 open racks available from November 1st.', time: '2026-10-13 10:30' }
    ]
  },
  {
    id: 'QF-1049',
    customerName: 'Robert Langdon',
    customerEmail: 'robert@symbology.org',
    customerPhone: '+1 (555) 876-1122',
    contactMethod: 'Phone',
    subject: 'URGENT: Billed twice on invoice #INV-8821 after gateway error',
    message: 'I received two identical charges of $1,450.00 on our corporate credit card for invoice #INV-8821. The payment gateway timed out, so I refreshed. This is totally unacceptable — please reverse the duplicate charge immediately.',
    type: 'Complaint',
    priority: 'Urgent',
    status: 'Escalated',
    assignedTo: 'Elena Rostova',
    createdDate: '2026-10-13 10:20',
    updatedDate: '2026-10-13 12:05',
    resolvedDate: null,
    isOverdue: false,
    aiAnalysis: {
      category: 'Billing / Duplicate Payment',
      suggestedPriority: 'Urgent',
      department: 'Billing & Finance',
      sentimentScore: '-0.88 (Severe Frustration)',
      urgentRisk: true,
      summary: 'Customer incurred double charge of $1,450 on invoice #INV-8821 due to timeout. High churn risk if not refunded swiftly.',
      recommendedAction: 'Verify transaction log in Stripe, immediately execute $1,450 refund, and email refund transaction ID.',
      drafts: {
        empathetic: 'Dear Robert,\n\nI sincerely apologize for the duplicate charge on invoice #INV-8821 caused by the gateway timeout. I have personally submitted the $1,450 refund to your card. Please find the confirmation details below.',
        concise: 'Hi Robert, we apologize for the inconvenience. The duplicate $1,450 charge has been refunded to your card. Refund reference: #RF-9921.',
        formal: 'Dear Mr. Langdon,\n\nPlease accept our apologies regarding the billing discrepancy on invoice #INV-8821. A refund of $1,450.00 has been processed immediately to your card issuer.',
        sales: 'Dear Robert, our sincere apologies for the duplicate charge. We have refunded the extra $1,450 immediately and added a 10% credit waiver to your next billing cycle as a courtesy.'
      }
    },
    interactions: [
      { sender: 'customer', author: 'Robert Langdon', text: 'I received two identical charges of $1,450.00 on our corporate credit card for invoice #INV-8821. Please reverse immediately.', time: '2026-10-13 10:20' },
      { sender: 'system', author: 'QueueFlow AI', text: 'AI Flag: Negative sentiment detected. Urgent escalation triggered to Management.', time: '2026-10-13 10:21' }
    ],
    notes: [
      { author: 'Elena Rostova', text: 'Identified duplicate charge on Stripe ledger (ch_8921). Refund submitted; receipt sent to finance.', time: '2026-10-13 12:00' }
    ]
  },
  {
    id: 'QF-1050',
    customerName: 'Amanda Cruz',
    customerEmail: 'amanda@cruzretail.com',
    customerPhone: '+1 (555) 432-8899',
    contactMethod: 'WhatsApp',
    subject: 'Cannot generate PDF quotation export in client portal',
    message: 'When clicking the "Generate PowerPoint Quotation" button on our draft contract #CT-409, the screen freezes at 99% and throws an error code 504.',
    type: 'Technical Support',
    priority: 'Medium',
    status: 'Assigned',
    assignedTo: 'Liam Chen',
    createdDate: '2026-10-13 11:00',
    updatedDate: '2026-10-13 11:30',
    resolvedDate: null,
    isOverdue: false,
    aiAnalysis: {
      category: 'Export Generation Bug',
      suggestedPriority: 'Medium',
      department: 'Technical Support',
      sentimentScore: '-0.30 (Mild Dissatisfaction)',
      urgentRisk: false,
      summary: 'Quotation export fails with HTTP 504 on contract #CT-409 due to timeout in presentation compiler.',
      recommendedAction: 'Check worker queue for stalled PDF/PPT rendering tasks. Manually regenerate export and send download link.',
      drafts: {
        empathetic: 'Hi Amanda,\n\nThank you for alerting us to this export issue on #CT-409. Our engineering team has cleared the cached background task, and I have generated your quotation directly for you.',
        concise: 'Hi Amanda, the 504 error on contract #CT-409 has been resolved. Please try downloading again now or use the direct link attached.',
        formal: 'Dear Ms. Cruz,\n\nWe have investigated the rendering exception associated with quotation #CT-409. The background service has been re-indexed successfully.',
        sales: 'Hi Amanda! We sorted out the download glitch on #CT-409. Let us know if you need any adjustments to the quoted quantities!'
      }
    },
    interactions: [
      { sender: 'customer', author: 'Amanda Cruz', text: 'When clicking "Generate PowerPoint Quotation" on draft #CT-409, it freezes at 99%.', time: '2026-10-13 11:00' }
    ],
    notes: []
  },
  {
    id: 'QF-1051',
    customerName: 'Tariq Al-Mansoor',
    customerEmail: 'tariq@gulfmaritime.ae',
    customerPhone: '+971 50 123 4567',
    contactMethod: 'Email',
    subject: 'RFP submission: Port freight forwarding services 2027',
    message: 'Gulf Maritime invites Sadr Logistics to participate in our tender RFP for GCC-wide container freight forwarding. RFP documents are ready for review.',
    type: 'Sales',
    priority: 'High',
    status: 'Unassigned',
    assignedTo: 'Unassigned',
    createdDate: '2026-10-13 12:10',
    updatedDate: '2026-10-13 12:10',
    resolvedDate: null,
    isOverdue: false,
    aiAnalysis: {
      category: 'Enterprise RFP Tender',
      suggestedPriority: 'High',
      department: 'Sales',
      sentimentScore: '+0.80 (High Intent)',
      urgentRisk: false,
      summary: 'Major RFP opportunity for GCC-wide container freight forwarding from Gulf Maritime.',
      recommendedAction: 'Assign immediately to Maya Brooks, acknowledge RFP receipt, and initiate bid qualification.',
      drafts: {
        empathetic: 'Dear Tariq,\n\nThank you for inviting Sadr Logistics to participate in the Gulf Maritime RFP tender. Our commercial team has received the tender specifications and will commence review.',
        concise: 'Dear Tariq, thank you for the RFP invitation. We confirm receipt and will submit our preliminary bid schedule by the deadline.',
        formal: 'Dear Mr. Al-Mansoor,\n\nWe acknowledge receipt of the RFP invitation for GCC freight forwarding services. Sadr Logistics welcomes this partnership opportunity.',
        sales: 'Dear Tariq, we are thrilled to receive your RFP! Our GCC cross-border freight fleet operates 24/7 across the ports. We are eager to submit our proposal.'
      }
    },
    interactions: [
      { sender: 'customer', author: 'Tariq Al-Mansoor', text: 'Gulf Maritime invites Sadr Logistics to participate in our tender RFP.', time: '2026-10-13 12:10' }
    ],
    notes: []
  },
  {
    id: 'QF-1052',
    customerName: 'Helen Zhang',
    customerEmail: 'hzhang@novatech.io',
    customerPhone: '+1 (555) 602-3341',
    contactMethod: 'SMS',
    subject: 'Overdue delivery tracking link is not updating status',
    message: 'Shipment #SHP-2091 was scheduled for arrival yesterday at 2 PM. Tracking status is still showing "Awaiting Customs Clearance". Need an urgent ETA.',
    type: 'General Support',
    priority: 'Urgent',
    status: 'New',
    assignedTo: 'Unassigned',
    createdDate: '2026-10-13 13:00',
    updatedDate: '2026-10-13 13:00',
    resolvedDate: null,
    isOverdue: true,
    aiAnalysis: {
      category: 'Logistics SLA & Tracking Delay',
      suggestedPriority: 'Urgent',
      department: 'General Support',
      sentimentScore: '-0.65 (High Urgency)',
      urgentRisk: true,
      summary: 'Shipment #SHP-2091 is past SLA delivery window. Stuck at customs clearance. Customer requested urgent update.',
      recommendedAction: 'Contact customs clearing agent for #SHP-2091, verify release timestamp, and update customer ETA via SMS.',
      drafts: {
        empathetic: 'Hi Helen, I understand how critical this shipment is. I am currently contacting our customs clearing officer directly to expedite #SHP-2091 and will text you the exact arrival time within the hour.',
        concise: 'Hi Helen, we are investigating shipment #SHP-2091 with customs dispatch right now and will update your ETA shortly.',
        formal: 'Dear Ms. Zhang,\n\nWe are actively coordinating with port customs authorities regarding consignment #SHP-2091 to ensure prompt clearance.',
        sales: 'Hi Helen, our support operations are expediting #SHP-2091 directly with the port manager. We will keep you updated every step.'
      }
    },
    interactions: [
      { sender: 'customer', author: 'Helen Zhang', text: 'Shipment #SHP-2091 was scheduled for yesterday at 2 PM. Need urgent ETA.', time: '2026-10-13 13:00' }
    ],
    notes: []
  },
  {
    id: 'QF-1053',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@apexlog.com',
    customerPhone: '+1 (555) 771-0029',
    contactMethod: 'Email',
    subject: 'Requesting updated tax residency certificate for procurement',
    message: 'Can your accounting department provide your updated 2026 Tax Residency Certificate for our vendor compliance file?',
    type: 'Billing',
    priority: 'Low',
    status: 'Waiting for Customer',
    assignedTo: 'Liam Chen',
    createdDate: '2026-10-12 14:00',
    updatedDate: '2026-10-13 09:30',
    resolvedDate: null,
    isOverdue: false,
    aiAnalysis: {
      category: 'Vendor Compliance & Tax Document',
      suggestedPriority: 'Low',
      department: 'Billing & Finance',
      sentimentScore: '+0.10 (Neutral Request)',
      urgentRisk: false,
      summary: 'Customer needs 2026 Tax Residency Certificate for vendor compliance onboarding.',
      recommendedAction: 'Send standard VAT / Tax Residency Certificate PDF packet.',
      drafts: {
        empathetic: 'Hi Marcus, happy to help with your vendor compliance file! Please find our official 2026 Tax Residency Certificate attached.',
        concise: 'Hi Marcus, attached is the requested 2026 Tax Certificate. Let us know if you need anything else.',
        formal: 'Dear Mr. Vance,\n\nPlease find attached Sadr Logistics Services 2026 Tax Compliance and Residency Certification.',
        sales: 'Hi Marcus! Attached is the tax certificate. We look forward to kicking off our logistics engagement with Apex!'
      }
    },
    interactions: [
      { sender: 'customer', author: 'Marcus Vance', text: 'Can your accounting department provide your updated 2026 Tax Residency Certificate?', time: '2026-10-12 14:00' },
      { sender: 'agent', author: 'Liam Chen', text: 'Hi Marcus, I have sent the 2026 certificate to your email. Please let us know if your procurement portal requires additional forms.', time: '2026-10-13 09:30' }
    ],
    notes: []
  },
  {
    id: 'QF-1045',
    customerName: 'Dr. Emily Watson',
    customerEmail: 'emily@biocare-pharma.com',
    customerPhone: '+1 (555) 902-8812',
    contactMethod: 'Email',
    subject: 'Temperature calibration certificate for dry ice shipment',
    message: 'Please send temperature data loggers report for batch #BIO-881 delivered yesterday.',
    type: 'General Support',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Liam Chen',
    createdDate: '2026-10-12 08:00',
    updatedDate: '2026-10-12 11:20',
    resolvedDate: '2026-10-12 11:20',
    isOverdue: false,
    aiAnalysis: {
      category: 'Pharma Cold-Chain Quality Report',
      suggestedPriority: 'Low',
      department: 'General Support',
      sentimentScore: '+0.40',
      urgentRisk: false,
      summary: 'Quality team requested temperature calibration certificate for delivered pharma shipment.',
      recommendedAction: 'Export USB temperature logger readings and send QA signed PDF.',
      drafts: {
        empathetic: 'Dear Dr. Watson, attached is the certified calibration log verifying stable -20C throughout transit.',
        concise: 'Hi Dr. Watson, attached is the temperature report for batch #BIO-881.',
        formal: 'Dear Dr. Watson,\n\nPlease find enclosed the verified thermal telemetry audit report for consignment #BIO-881.',
        sales: 'Dear Dr. Watson, delighted to share that the cold-chain remained flawless! Let us know when your next shipment is scheduled.'
      }
    },
    interactions: [
      { sender: 'customer', author: 'Dr. Emily Watson', text: 'Please send temperature data loggers report for batch #BIO-881.', time: '2026-10-12 08:00' },
      { sender: 'agent', author: 'Liam Chen', text: 'Attached verified telemetry log. Ticket marked resolved.', time: '2026-10-12 11:20' }
    ],
    notes: []
  },
  {
    id: 'QF-1044',
    customerName: 'Kevin O’Connor',
    customerEmail: 'k.oconnor@apexcourier.com',
    customerPhone: '+1 (555) 332-9011',
    contactMethod: 'Phone',
    subject: 'Warehouse dock appointment rescheduling',
    message: 'Need to move our unloading slot from Tuesday morning to Wednesday 9:00 AM due to mechanical truck delay.',
    type: 'General Support',
    priority: 'Medium',
    status: 'Closed',
    assignedTo: 'Liam Chen',
    createdDate: '2026-10-11 15:00',
    updatedDate: '2026-10-12 10:00',
    resolvedDate: '2026-10-12 10:00',
    isOverdue: false,
    aiAnalysis: {
      category: 'Dock Scheduling',
      suggestedPriority: 'Medium',
      department: 'General Support',
      sentimentScore: '+0.20',
      urgentRisk: false,
      summary: 'Customer rescheduled inbound dock appointment to Wednesday 9 AM.',
      recommendedAction: 'Confirm dock bay availability and update WMS schedule.',
      drafts: {
        empathetic: 'Hi Kevin, slot shifted to Wednesday 9 AM at Bay 4. Safe travels!',
        concise: 'Hi Kevin, confirmed for Wednesday 9:00 AM.',
        formal: 'Dear Mr. O’Connor, appointment rescheduled accordingly.',
        sales: 'Hi Kevin, confirmed! Let us know if you need extra storage capacity.'
      }
    },
    interactions: [
      { sender: 'customer', author: 'Kevin O’Connor', text: 'Need to move unloading slot to Wednesday 9 AM.', time: '2026-10-11 15:00' }
    ],
    notes: []
  }
];

const DEFAULT_DEALS = [
  {
    id: 'DL-201',
    name: 'Acme Regional Cold Storage 5k Pallets',
    customer: 'Sarah Jenkins',
    company: 'Acme Logistics Ltd',
    email: 'sarah.j@acmelogistics.com',
    phone: '+1 (555) 234-9812',
    value: 65000,
    stage: 'Proposal Sent',
    followupDate: '2026-10-14',
    owner: 'Maya Brooks',
    notes: 'Drafted custom SLA with 24/7 dedicated cold bays. Client reviewing with CFO.'
  },
  {
    id: 'DL-202',
    name: 'Gulf Maritime GCC Freight Tender 2027',
    customer: 'Tariq Al-Mansoor',
    company: 'Gulf Maritime Corporation',
    email: 'tariq@gulfmaritime.ae',
    phone: '+971 50 123 4567',
    value: 120000,
    stage: 'Qualified',
    followupDate: '2026-10-13',
    owner: 'Maya Brooks',
    notes: 'Multi-year cross-border transport contract across UAE and KSA routes.'
  },
  {
    id: 'DL-203',
    name: 'Pharma Cold Chain Q4 Distribution',
    customer: 'Dr. Emily Watson',
    company: 'BioCare Pharmaceuticals',
    email: 'emily@biocare-pharma.com',
    phone: '+1 (555) 902-8812',
    value: 48000,
    stage: 'Won',
    followupDate: '2026-10-25',
    owner: 'David Vance',
    notes: 'Contract signed. Initial batch deliveries starting next Monday.'
  },
  {
    id: 'DL-204',
    name: 'Retail Fulfillment & Inventory Staging',
    customer: 'Amanda Cruz',
    company: 'Cruz Retail Chain',
    email: 'amanda@cruzretail.com',
    phone: '+1 (555) 432-8899',
    value: 32000,
    stage: 'Meeting Scheduled',
    followupDate: '2026-10-15',
    owner: 'Maya Brooks',
    notes: 'Demo meeting scheduled to walk through real-time pallet inventory dashboard.'
  },
  {
    id: 'DL-205',
    name: 'Automotive Parts Cross-Docking Hub',
    customer: 'Dieter Schmidt',
    company: 'Krupp Automotive Components',
    email: 'd.schmidt@krupp-auto.de',
    phone: '+49 89 234 119',
    value: 85000,
    stage: 'Negotiation',
    followupDate: '2026-10-13',
    owner: 'Maya Brooks',
    notes: 'Negotiating volume tier discounts for 12-month commitment.'
  },
  {
    id: 'DL-206',
    name: 'E-commerce Peak Season Overflow Depot',
    customer: 'Jordan Miller',
    company: 'QuickShip Direct',
    email: 'jordan@quickship.com',
    phone: '+1 (555) 129-8472',
    value: 22000,
    stage: 'Contacted',
    followupDate: '2026-10-16',
    owner: 'David Vance',
    notes: 'Initial requirements discovery call completed.'
  },
  {
    id: 'DL-207',
    name: 'Hazardous Chemicals Certified Storage',
    customer: 'Farhan Zaidi',
    company: 'Oasis Chemical Supplies',
    email: 'farhan@oasis-chem.com',
    phone: '+966 54 991 2234',
    value: 30000,
    stage: 'Won',
    followupDate: '2026-10-28',
    owner: 'Elena Rostova',
    notes: 'Compliant Hazmat facility contract executed.'
  }
];

const DEFAULT_NOTIFS = [
  { id: 'nt-1', title: 'Ticket Assigned to You', text: 'Ticket QF-1050 assigned to Liam Chen.', time: '10m ago', type: 'blue' },
  { id: 'nt-2', title: 'Manager Urgent Escalation', text: 'Ticket QF-1049 marked Urgent with negative sentiment.', time: '45m ago', type: 'red' },
  { id: 'nt-3', title: 'Sales Follow-up Due Today', text: 'Gulf Maritime (DL-202) follow-up scheduled today.', time: '2h ago', type: 'green' }
];

const DEFAULT_AUDIT = [
  { time: '2026-10-13 13:00', refId: 'QF-1052', actor: 'Customer (Helen Zhang)', action: 'Ticket Submitted', details: 'Enquiry received via SMS. AI triage completed.' },
  { time: '2026-10-13 12:10', refId: 'QF-1051', actor: 'Customer (Tariq Al-Mansoor)', action: 'Ticket Submitted', details: 'Enquiry received via Email. Priority set to High.' },
  { time: '2026-10-13 12:05', refId: 'QF-1049', actor: 'Elena Rostova (Manager)', action: 'Status Changed', details: 'Escalated due to duplicate charge complaint.' },
  { time: '2026-10-13 11:40', refId: 'QF-1048', actor: 'Maya Brooks (Sales)', action: 'Agent Reply Sent', details: 'Sent customized commercial storage quote details.' },
  { time: '2026-10-13 09:15', refId: 'QF-1048', actor: 'System Automation', action: 'Customer Receipt', details: 'Automated receipt email dispatched to sarah.j@acmelogistics.com' }
];

const DEFAULT_DISPATCH = [
  { time: '2026-10-13 13:00:12', method: 'SMS', to: '+1 (555) 602-3341', subject: 'Receipt: Ticket QF-1052', status: 'Delivered (Twilio Gateway)', isUrgent: true },
  { time: '2026-10-13 12:10:05', method: 'Email', to: 'tariq@gulfmaritime.ae', subject: 'Receipt: Ticket QF-1051 Received', status: 'Delivered (SendGrid SMTP)', isUrgent: false },
  { time: '2026-10-13 11:40:22', method: 'Email', to: 'sarah.j@acmelogistics.com', subject: 'Reply on QF-1048 - Cold Storage', status: 'Delivered (SendGrid SMTP)', isUrgent: false },
  { time: '2026-10-13 10:20:08', method: 'Email', to: 'robert@symbology.org', subject: 'Receipt: Ticket QF-1049 Priority Complaint', status: 'Delivered (SendGrid SMTP)', isUrgent: true }
];

// App State Store
class Store {
  constructor() {
    this.tickets = this.load('qf_tickets', DEFAULT_TICKETS);
    this.deals = this.load('qf_deals', DEFAULT_DEALS);
    this.staff = DEFAULT_STAFF;
    this.notifications = this.load('qf_notifs', DEFAULT_NOTIFS);
    this.auditTrail = this.load('qf_audit', DEFAULT_AUDIT);
    this.dispatchLog = this.load('qf_dispatch', DEFAULT_DISPATCH);
    this.currentRole = 'admin'; // 'admin', 'manager', 'support', 'sales', 'customer'
    this.activeQueueFilter = 'all';
    this.selectedAiTicketId = 'QF-1049';
    this.currentView = 'dashboard';
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : JSON.parse(JSON.stringify(fallback));
    } catch (e) {
      return JSON.parse(JSON.stringify(fallback));
    }
  }

  save() {
    try {
      localStorage.setItem('qf_tickets', JSON.stringify(this.tickets));
      localStorage.setItem('qf_deals', JSON.stringify(this.deals));
      localStorage.setItem('qf_notifs', JSON.stringify(this.notifications));
      localStorage.setItem('qf_audit', JSON.stringify(this.auditTrail));
      localStorage.setItem('qf_dispatch', JSON.stringify(this.dispatchLog));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  }

  resetAll() {
    localStorage.removeItem('qf_tickets');
    localStorage.removeItem('qf_deals');
    localStorage.removeItem('qf_notifs');
    localStorage.removeItem('qf_audit');
    localStorage.removeItem('qf_dispatch');
    this.tickets = JSON.parse(JSON.stringify(DEFAULT_TICKETS));
    this.deals = JSON.parse(JSON.stringify(DEFAULT_DEALS));
    this.notifications = JSON.parse(JSON.stringify(DEFAULT_NOTIFS));
    this.auditTrail = JSON.parse(JSON.stringify(DEFAULT_AUDIT));
    this.dispatchLog = JSON.parse(JSON.stringify(DEFAULT_DISPATCH));
    this.save();
  }

  addAudit(refId, actor, action, details) {
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);
    this.auditTrail.unshift({ time: timeStr, refId, actor, action, details });
    if (this.auditTrail.length > 50) this.auditTrail.pop();
    this.save();
  }

  addNotification(title, text, type = 'blue') {
    this.notifications.unshift({
      id: 'nt-' + Date.now(),
      title,
      text,
      time: 'Just now',
      type
    });
    if (this.notifications.length > 25) this.notifications.pop();
    this.save();
  }

  addDispatch(method, to, subject, isUrgent = false) {
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 19);
    this.dispatchLog.unshift({
      time: timeStr,
      method,
      to,
      subject,
      status: `Delivered (${method} Provider API)`,
      isUrgent
    });
    if (this.dispatchLog.length > 25) this.dispatchLog.pop();
    this.save();
  }
}

const store = new Store();

// ==========================================================================
// AI Triage & NLP Simulation Engine
// ==========================================================================
class AiEngine {
  static analyze(text, subject = '', type = 'General Support') {
    const full = (subject + ' ' + text).toLowerCase();
    
    // Category classification
    let category = 'General Enquiry';
    let suggestedPriority = 'Medium';
    let department = 'General Support';
    let sentimentScore = '+0.10 (Neutral)';
    let urgentRisk = false;

    if (full.includes('price') || full.includes('quote') || full.includes('quotation') || full.includes('pallet') || full.includes('rfp') || full.includes('tender') || full.includes('contract') || type === 'Sales') {
      category = 'Commercial Sales & Quotation';
      department = 'Sales';
      suggestedPriority = (full.includes('urgent') || full.includes('5000') || full.includes('enterprise')) ? 'High' : 'Medium';
      sentimentScore = '+0.65 (High Intent)';
    } else if (full.includes('bill') || full.includes('invoice') || full.includes('charge') || full.includes('refund') || full.includes('twice') || full.includes('tax') || type === 'Billing') {
      category = 'Billing & Payment Reconciliation';
      department = 'Billing & Finance';
      suggestedPriority = (full.includes('twice') || full.includes('unacceptable') || full.includes('refund')) ? 'Urgent' : 'Medium';
      sentimentScore = full.includes('unacceptable') ? '-0.85 (Negative Frustration)' : '-0.20 (Neutral)';
      if (suggestedPriority === 'Urgent') urgentRisk = true;
    } else if (full.includes('freeze') || full.includes('bug') || full.includes('504') || full.includes('error') || full.includes('cannot') || full.includes('broken') || type === 'Technical Support') {
      category = 'Technical Incident / Software Defect';
      department = 'Technical Support';
      suggestedPriority = full.includes('cannot') ? 'High' : 'Medium';
      sentimentScore = '-0.40 (Mild Frustration)';
    } else if (full.includes('unacceptable') || full.includes('angry') || full.includes('delay') || full.includes('cancel') || full.includes('overdue') || type === 'Complaint') {
      category = 'Customer Complaint & Escalation';
      department = 'Service Management';
      suggestedPriority = 'Urgent';
      sentimentScore = '-0.90 (Severe Dissatisfaction)';
      urgentRisk = true;
    }

    // Executive Summary
    const summary = `Customer requests assistance regarding "${subject}". Key focus: ${category}. Priority assessed as ${suggestedPriority}.`;

    // Recommended next action
    let recommendedAction = '';
    if (department === 'Sales') {
      recommendedAction = 'Action: Review customer capacity requirements, prepare formal PowerPoint quotation, and assign to Maya Brooks.';
    } else if (department === 'Billing & Finance') {
      recommendedAction = 'Action: Verify merchant account ledger, issue refund or adjustment invoice, and notify client within 1 hour.';
    } else if (department === 'Technical Support') {
      recommendedAction = 'Action: Reproduce error logs in staging environment, restart failed worker queue, and verify export download.';
    } else {
      recommendedAction = 'Action: Acknowledge customer enquiry via preferred contact channel and provide confirmed status update.';
    }

    // Editable draft templates
    const drafts = {
      empathetic: `Dear Customer,\n\nThank you for reaching out to Sadr Logistics Services regarding your enquiry on "${subject}". We understand the importance of this request and our team is already working on your resolution.`,
      concise: `Hello, thank you for contacting Sadr Logistics. We have received your request regarding "${subject}" and are reviewing it immediately.`,
      formal: `Dear Sir/Madam,\n\nWe hereby acknowledge receipt of your communication concerning "${subject}". Sadr Logistics Services has registered your enquiry under strict service level standards.`,
      sales: `Hello! Thank you for considering Sadr Logistics for your requirements regarding "${subject}". We would love to walk you through our tailored enterprise rates.`
    };

    return {
      category,
      suggestedPriority,
      department,
      sentimentScore,
      urgentRisk,
      summary,
      recommendedAction,
      drafts
    };
  }
}

// ==========================================================================
// User Interface Controller & Event Bindings
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  const views = document.querySelectorAll('.app-view');
  const roleSelect = document.getElementById('roleSelect');
  const currentUserName = document.getElementById('currentUserName');
  const currentUserRoleTag = document.getElementById('currentUserRoleTag');
  const currentAvatar = document.getElementById('currentAvatar');
  const roleNoticeBanner = document.getElementById('roleNoticeBanner');
  const roleNoticeText = document.getElementById('roleNoticeText');

  // Modals
  const newEnquiryModal = document.getElementById('newEnquiryModal');
  const ticketDetailModal = document.getElementById('ticketDetailModal');
  const dealModal = document.getElementById('dealModal');

  // New Enquiry Buttons
  const openNewEnquiryBtn = document.getElementById('openNewEnquiryBtn');
  const dashNewEnquiryBtn = document.getElementById('dashNewEnquiryBtn');
  const queueNewEnquiryBtn = document.getElementById('queueNewEnquiryBtn');
  const closeEnquiryModalBtn = document.getElementById('closeEnquiryModalBtn');
  const cancelEnquiryModalBtn = document.getElementById('cancelEnquiryModalBtn');
  const internalEnquiryForm = document.getElementById('internalEnquiryForm');

  // Queue Elements
  const queueTabs = document.getElementById('queueTabs');
  const queueTableBody = document.getElementById('queueTableBody');
  const queueSearchInput = document.getElementById('queueSearchInput');
  const filterPriority = document.getElementById('filterPriority');
  const filterType = document.getElementById('filterType');
  const filterStatus = document.getElementById('filterStatus');
  const filterAssignee = document.getElementById('filterAssignee');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const queueEmptyState = document.getElementById('queueEmptyState');
  const emptyClearFiltersBtn = document.getElementById('emptyClearFiltersBtn');

  // Ticket Detail Modal Elements
  const dtTicketId = document.getElementById('dtTicketId');
  const dtPriorityBadge = document.getElementById('dtPriorityBadge');
  const dtSubject = document.getElementById('dtSubject');
  const dtStatusSelect = document.getElementById('dtStatusSelect');
  const dtPrioritySelect = document.getElementById('dtPrioritySelect');
  const dtAssigneeSelect = document.getElementById('dtAssigneeSelect');
  const dtType = document.getElementById('dtType');
  const dtCustomerName = document.getElementById('dtCustomerName');
  const dtCustomerEmail = document.getElementById('dtCustomerEmail');
  const dtCustomerPhone = document.getElementById('dtCustomerPhone');
  const dtCustomerPref = document.getElementById('dtCustomerPref');
  const dtCreatedDate = document.getElementById('dtCreatedDate');
  const dtUpdatedDate = document.getElementById('dtUpdatedDate');
  const dtResolvedDate = document.getElementById('dtResolvedDate');
  const dtAiSummary = document.getElementById('dtAiSummary');
  const dtAiNextAction = document.getElementById('dtAiNextAction');
  const dtMessagesList = document.getElementById('dtMessagesList');
  const dtNotesList = document.getElementById('dtNotesList');
  const notesCount = document.getElementById('notesCount');
  const dtReplyTextarea = document.getElementById('dtReplyTextarea');
  const dtSendReplyBtn = document.getElementById('dtSendReplyBtn');
  const dtInsertAiDraftBtn = document.getElementById('dtInsertAiDraftBtn');
  const dtNewNoteTextarea = document.getElementById('dtNewNoteTextarea');
  const dtAddNoteBtn = document.getElementById('dtAddNoteBtn');
  const tabInteractionsBtn = document.getElementById('tabInteractionsBtn');
  const tabNotesBtn = document.getElementById('tabNotesBtn');
  const timelinePane = document.getElementById('timelinePane');
  const notesPane = document.getElementById('notesPane');
  const dtConvertToDealBtn = document.getElementById('dtConvertToDealBtn');
  const dtConvertToDealWrap = document.getElementById('dtConvertToDealWrap');
  const closeTicketDetailModalBtn = document.getElementById('closeTicketDetailModalBtn');
  const dtAiRerunBtn = document.getElementById('dtAiRerunBtn');

  // Pipeline Elements
  const kanbanBoard = document.getElementById('kanbanBoard');
  const kanbanBoardWrapper = document.getElementById('kanbanBoardWrapper');
  const pipelineListWrapper = document.getElementById('pipelineListWrapper');
  const pipelineTableBody = document.getElementById('pipelineTableBody');
  const pipelineBoardViewBtn = document.getElementById('pipelineBoardViewBtn');
  const pipelineListViewBtn = document.getElementById('pipelineListViewBtn');
  const openNewDealBtn = document.getElementById('openNewDealBtn');
  const closeDealModalBtn = document.getElementById('closeDealModalBtn');
  const cancelDealModalBtn = document.getElementById('cancelDealModalBtn');
  const dealForm = document.getElementById('dealForm');

  // AI Workbench Elements
  const aiTicketSelectorList = document.getElementById('aiTicketSelectorList');
  const aiSelectedTicketTitle = document.getElementById('aiSelectedTicketTitle');
  const aiAnalysisStatus = document.getElementById('aiAnalysisStatus');
  const aiEmptyPrompt = document.getElementById('aiEmptyPrompt');
  const aiResultsPane = document.getElementById('aiResultsPane');
  const aiUrgencyBanner = document.getElementById('aiUrgencyBanner');
  const aiFlagTitle = document.getElementById('aiFlagTitle');
  const aiFlagDesc = document.getElementById('aiFlagDesc');
  const aiCatVal = document.getElementById('aiCatVal');
  const aiPriVal = document.getElementById('aiPriVal');
  const aiDeptVal = document.getElementById('aiDeptVal');
  const aiSentVal = document.getElementById('aiSentVal');
  const aiSummaryText = document.getElementById('aiSummaryText');
  const aiNextActionText = document.getElementById('aiNextActionText');
  const aiDraftEditor = document.getElementById('aiDraftEditor');
  const aiToneSelect = document.getElementById('aiToneSelect');
  const regenerateDraftBtn = document.getElementById('regenerateDraftBtn');
  const applyAiClassificationBtn = document.getElementById('applyAiClassificationBtn');
  const approveAndSendReplyBtn = document.getElementById('approveAndSendReplyBtn');

  // Automations & SLA Elements
  const testRulesBtn = document.getElementById('testRulesBtn');
  const dispatchLogList = document.getElementById('dispatchLogList');
  const auditTrailTableBody = document.getElementById('auditTrailTableBody');

  // Customer Portal Elements
  const portalCustomerForm = document.getElementById('portalCustomerForm');
  const portalTrackForm = document.getElementById('portalTrackForm');
  const trackResultBox = document.getElementById('trackResultBox');
  const resTicketId = document.getElementById('resTicketId');
  const resSubject = document.getElementById('resSubject');
  const resStatusBadge = document.getElementById('resStatusBadge');
  const resTimeline = document.getElementById('resTimeline');
  const custReplyInput = document.getElementById('custReplyInput');
  const custReplyBtn = document.getElementById('custReplyBtn');

  // Topbar & Global
  const globalSearchInput = document.getElementById('globalSearchInput');
  const notifBellBtn = document.getElementById('notifBellBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  const notifList = document.getElementById('notifList');
  const clearNotifsBtn = document.getElementById('clearNotifsBtn');
  const notifBadgeDot = document.getElementById('notifBadgeDot');
  const resetDataBtn = document.getElementById('resetDataBtn');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');

  let activeModalTicketId = null;

  // ==========================================================================
  // Toast Notification Helper (Sonner style)
  // ==========================================================================
  function showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else {
      iconSvg = '<svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `
      <div class="toast-content">
        ${iconSvg}
        <span>${message}</span>
      </div>
      <button class="toast-close-btn">&times;</button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close-btn');
    const dismiss = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px) scale(0.95)';
      setTimeout(() => { if (toast.parentElement) toast.remove(); }, 200);
    };

    closeBtn.addEventListener('click', dismiss);
    if (duration > 0) setTimeout(dismiss, duration);
  }

  // ==========================================================================
  // Navigation & View Switching
  // ==========================================================================
  function switchView(viewName) {
    store.currentView = viewName;
    views.forEach(v => {
      if (v.id === `view-${viewName}`) {
        v.classList.add('active');
      } else {
        v.classList.remove('active');
      }
    });

    navItems.forEach(item => {
      if (item.dataset.view === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Close mobile sidebar on nav click
    sidebar.classList.remove('mobile-open');

    // Trigger view-specific re-renders
    if (viewName === 'dashboard') renderDashboard();
    if (viewName === 'queue') renderQueue();
    if (viewName === 'pipeline') renderPipeline();
    if (viewName === 'ai-assistant') renderAiWorkbench();
    if (viewName === 'automations') renderAutomations();
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const view = item.dataset.view;
      if (view) switchView(view);
    });
  });

  document.querySelectorAll('[data-nav-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      switchView(el.dataset.navTarget);
    });
  });

  // Mobile Sidebar Toggle
  sidebarToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });

  // Role Switching & Access Control
  roleSelect.addEventListener('change', (e) => {
    const newRole = e.target.value;
    store.currentRole = newRole;

    const roleMap = {
      admin: { name: 'David Vance', title: 'Admin (Full Control)', avatar: 'DV' },
      manager: { name: 'Elena Rostova', title: 'Queue & Service Manager', avatar: 'ER' },
      support: { name: 'Liam Chen', title: 'Senior Support Agent', avatar: 'LC' },
      sales: { name: 'Maya Brooks', title: 'Lead Account Executive', avatar: 'MB' },
      customer: { name: 'Customer Guest', title: 'External Self-Service', avatar: 'CU' }
    };

    const user = roleMap[newRole];
    currentUserName.textContent = user.name;
    currentUserRoleTag.textContent = user.title;
    currentAvatar.textContent = user.avatar;

    // Enforce role-based access visual restrictions
    if (newRole === 'customer') {
      switchView('customer-portal');
      roleNoticeBanner.classList.remove('hidden');
      roleNoticeText.textContent = 'Active as External Customer: You can only view your own submitted tickets using Ticket ID & Email.';
    } else {
      roleNoticeBanner.classList.toggle('hidden', newRole === 'admin');
      if (newRole === 'support') {
        roleNoticeText.textContent = 'Role: Support Agent (Liam Chen). Sales deal values are restricted. Prioritizing technical & general support tickets.';
      } else if (newRole === 'sales') {
        roleNoticeText.textContent = 'Role: Sales Agent (Maya Brooks). Pipeline active. Support internal tickets are view-only.';
      } else if (newRole === 'manager') {
        roleNoticeText.textContent = 'Role: Service Manager (Elena Rostova). Escalation and reassignment permissions enabled.';
      }
    }

    renderAll();
    showToast(`Switched active profile to ${user.name} (${newRole.toUpperCase()})`, 'info');
  });

  // ==========================================================================
  // Renderers
  // ==========================================================================

  function renderAll() {
    renderDashboard();
    renderQueue();
    renderPipeline();
    renderAiWorkbench();
    renderAutomations();
    renderNotifications();
    updateBadges();
  }

  function updateBadges() {
    const openCount = store.tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
    document.getElementById('openTicketsBadge').textContent = openCount;

    const activeDeals = store.deals.filter(d => d.stage !== 'Won' && d.stage !== 'Lost').length;
    document.getElementById('activeDealsBadge').textContent = activeDeals;

    const pendingAi = store.tickets.filter(t => t.status === 'New' || t.status === 'Unassigned' || t.priority === 'Urgent').length;
    document.getElementById('aiQueueCounter').textContent = `${pendingAi} Pending Analysis`;
  }

  // 1. Dashboard Renderer
  function renderDashboard() {
    const tickets = store.tickets;
    const deals = store.deals;

    const openCount = tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
    const unassignedCount = tickets.filter(t => t.status === 'Unassigned' || t.assignedTo === 'Unassigned').length;
    const urgentCount = tickets.filter(t => t.priority === 'Urgent' || t.status === 'Escalated').length;

    // Financial Pipeline calculations
    const activePipelineValue = deals
      .filter(d => d.stage !== 'Lost')
      .reduce((sum, d) => sum + d.value, 0);

    const wonDeals = deals.filter(d => d.stage === 'Won');
    const wonCount = wonDeals.length;

    document.getElementById('kpiOpenTickets').textContent = openCount;
    document.getElementById('kpiUnassignedTickets').textContent = unassignedCount;
    document.getElementById('kpiUrgentTickets').textContent = urgentCount;
    document.getElementById('kpiPipelineValue').textContent = '$' + activePipelineValue.toLocaleString();
    document.getElementById('kpiWonCount').textContent = `${wonCount} deals won`;

    // Staff Performance Bars
    const employeeBarsContainer = document.getElementById('employeeBarsContainer');
    employeeBarsContainer.innerHTML = '';
    const staffResolution = [
      { name: 'Liam Chen (Support)', count: 24, max: 30, pct: 80, role: 'support' },
      { name: 'Maya Brooks (Sales)', count: 18, max: 30, pct: 60, role: 'sales' },
      { name: 'Elena Rostova (Manager)', count: 12, max: 30, pct: 40, role: 'manager' },
      { name: 'David Vance (Admin)', count: 8, max: 30, pct: 26, role: 'admin' }
    ];

    staffResolution.forEach(emp => {
      const item = document.createElement('div');
      item.className = 'emp-bar-item';
      item.innerHTML = `
        <div class="emp-bar-info">
          <span class="emp-name">${emp.name}</span>
          <span class="emp-score">${emp.count} tickets resolved</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill ${emp.role === 'sales' ? 'purple' : ''}" style="width: ${emp.pct}%"></div>
        </div>
      `;
      employeeBarsContainer.appendChild(item);
    });

    // Funnel Breakdown
    const pipelineFunnelContainer = document.getElementById('pipelineFunnelContainer');
    pipelineFunnelContainer.innerHTML = '';
    const stages = ['New Lead', 'Contacted', 'Qualified', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Won'];

    stages.forEach(stage => {
      const count = deals.filter(d => d.stage === stage).length;
      const totalDeals = deals.length || 1;
      const pct = Math.max(12, Math.round((count / totalDeals) * 100));
      const row = document.createElement('div');
      row.className = 'funnel-row';
      row.innerHTML = `
        <div class="funnel-stage-name">${stage}</div>
        <div class="funnel-bar-wrap">
          <div class="funnel-bar-fill ${stage === 'Won' ? 'active' : ''}" style="width: ${pct}%"></div>
          <span class="funnel-val-label">${count} deal${count !== 1 ? 's' : ''}</span>
        </div>
      `;
      pipelineFunnelContainer.appendChild(row);
    });

    // Urgent Tickets Dashboard Table
    const dashUrgentTableBody = document.getElementById('dashUrgentTableBody');
    dashUrgentTableBody.innerHTML = '';
    const urgentTickets = tickets.filter(t => t.priority === 'Urgent' || t.priority === 'High');

    if (urgentTickets.length === 0) {
      dashUrgentTableBody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No urgent tickets pending. Great job!</td></tr>';
    } else {
      urgentTickets.slice(0, 5).forEach(ticket => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><button class="ticket-id-link" data-open-ticket="${ticket.id}">${ticket.id}</button></td>
          <td>
            <div class="customer-cell">
              <span class="cust-name">${ticket.customerName}</span>
              <span class="cust-meta">${ticket.customerEmail}</span>
            </div>
          </td>
          <td><div class="enquiry-subj" title="${ticket.subject}">${ticket.subject}</div></td>
          <td><span class="badge-department">${ticket.type}</span></td>
          <td><span class="badge badge-${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
          <td><span class="badge-status status-${ticket.status.toLowerCase().replace(/\s+/g, '-')}">${ticket.status}</span></td>
          <td>
            <button class="btn btn-outline btn-xs" data-open-ticket="${ticket.id}">Inspect</button>
          </td>
        `;
        dashUrgentTableBody.appendChild(tr);
      });
    }

    // Attach row open handlers
    document.querySelectorAll('[data-open-ticket]').forEach(btn => {
      btn.addEventListener('click', () => {
        openTicketDetail(btn.dataset.openTicket);
      });
    });
  }

  // 2. Queue Manager Renderer
  function renderQueue() {
    let list = [...store.tickets];

    // Filter counts calculation
    document.getElementById('countAll').textContent = store.tickets.length;
    document.getElementById('countMyQueue').textContent = store.tickets.filter(t => t.assignedTo === currentUserName.textContent).length;
    document.getElementById('countUnassigned').textContent = store.tickets.filter(t => t.status === 'Unassigned' || t.assignedTo === 'Unassigned').length;
    document.getElementById('countUrgent').textContent = store.tickets.filter(t => t.priority === 'Urgent').length;
    document.getElementById('countOverdue').textContent = store.tickets.filter(t => t.isOverdue).length;
    document.getElementById('countResolved').textContent = store.tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;

    // Subtab Filter
    if (store.activeQueueFilter === 'my-queue') {
      const activeName = currentUserName.textContent;
      list = list.filter(t => t.assignedTo === activeName);
    } else if (store.activeQueueFilter === 'unassigned') {
      list = list.filter(t => t.status === 'Unassigned' || t.assignedTo === 'Unassigned');
    } else if (store.activeQueueFilter === 'urgent') {
      list = list.filter(t => t.priority === 'Urgent');
    } else if (store.activeQueueFilter === 'overdue') {
      list = list.filter(t => t.isOverdue);
    } else if (store.activeQueueFilter === 'resolved') {
      list = list.filter(t => t.status === 'Resolved' || t.status === 'Closed');
    }

    // Secondary Filters
    const query = (queueSearchInput.value || '').trim().toLowerCase();
    const pri = filterPriority.value;
    const typ = filterType.value;
    const stat = filterStatus.value;
    const asg = filterAssignee.value;

    if (query) {
      list = list.filter(t => 
        t.id.toLowerCase().includes(query) ||
        t.customerName.toLowerCase().includes(query) ||
        t.customerEmail.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query) ||
        t.message.toLowerCase().includes(query)
      );
    }

    if (pri) list = list.filter(t => t.priority === pri);
    if (typ) list = list.filter(t => t.type === typ);
    if (stat) list = list.filter(t => t.status === stat);
    if (asg) {
      if (asg === 'Unassigned') list = list.filter(t => t.assignedTo === 'Unassigned');
      else list = list.filter(t => t.assignedTo === asg);
    }

    // Render Table Rows
    queueTableBody.innerHTML = '';
    if (list.length === 0) {
      queueEmptyState.classList.remove('hidden');
    } else {
      queueEmptyState.classList.add('hidden');
      list.forEach(ticket => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><button class="ticket-id-link" data-open-ticket="${ticket.id}">${ticket.id}</button></td>
          <td>
            <div class="customer-cell">
              <span class="cust-name">${ticket.customerName}</span>
              <span class="cust-meta">${ticket.customerEmail} (${ticket.contactMethod})</span>
            </div>
          </td>
          <td>
            <div class="enquiry-cell">
              <div class="enquiry-subj" title="${ticket.subject}">${ticket.subject}</div>
              <div class="enquiry-msg-snippet" title="${ticket.message}">${ticket.message}</div>
            </div>
          </td>
          <td><span class="badge-department">${ticket.type}</span></td>
          <td><span class="badge badge-${ticket.priority.toLowerCase()}">${ticket.priority}</span></td>
          <td><span class="badge-status status-${ticket.status.toLowerCase().replace(/\s+/g, '-')}">${ticket.status}</span></td>
          <td>
            <span class="text-xs ${ticket.assignedTo === 'Unassigned' ? 'amber-text font-semibold' : ''}">
              ${ticket.assignedTo}
            </span>
          </td>
          <td><span class="text-xs text-muted">${ticket.createdDate.split(' ')[0]}</span></td>
          <td>
            <button class="btn btn-outline btn-xs" data-open-ticket="${ticket.id}">View</button>
          </td>
        `;
        queueTableBody.appendChild(tr);
      });
    }

    // Rebind detail buttons
    document.querySelectorAll('#queueTableBody [data-open-ticket]').forEach(btn => {
      btn.addEventListener('click', () => openTicketDetail(btn.dataset.openTicket));
    });
  }

  // Queue Subtabs Click
  queueTabs.querySelectorAll('.tab-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      queueTabs.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      store.activeQueueFilter = btn.dataset.queueFilter;
      renderQueue();
    });
  });

  // Filter Event Listeners
  [queueSearchInput, filterPriority, filterType, filterStatus, filterAssignee].forEach(el => {
    el.addEventListener('input', renderQueue);
    el.addEventListener('change', renderQueue);
  });

  clearFiltersBtn.addEventListener('click', () => {
    queueSearchInput.value = '';
    filterPriority.value = '';
    filterType.value = '';
    filterStatus.value = '';
    filterAssignee.value = '';
    renderQueue();
  });

  emptyClearFiltersBtn?.addEventListener('click', () => {
    clearFiltersBtn.click();
  });

  // 3. Sales Pipeline (7 Stages) Renderer
  function renderPipeline() {
    const deals = store.deals;
    const stages = [
      'New Lead',
      'Contacted',
      'Qualified',
      'Meeting Scheduled',
      'Proposal Sent',
      'Negotiation',
      'Won'
    ];

    // Pipeline metrics ribbon
    const totalVal = deals.reduce((sum, d) => sum + d.value, 0);
    const wonVal = deals.filter(d => d.stage === 'Won').reduce((sum, d) => sum + d.value, 0);
    const wonCount = deals.filter(d => d.stage === 'Won').length;

    document.getElementById('pipeTotalDeals').textContent = deals.length;
    document.getElementById('pipeTotalValue').textContent = '$' + totalVal.toLocaleString();
    document.getElementById('pipeWonValue').textContent = `$${wonVal.toLocaleString()} (${wonCount})`;

    // Board View
    kanbanBoard.innerHTML = '';
    stages.forEach(stageName => {
      const colDeals = deals.filter(d => d.stage === stageName);
      const colSum = colDeals.reduce((sum, d) => sum + d.value, 0);

      const col = document.createElement('div');
      col.className = 'kanban-col';
      col.dataset.stage = stageName;

      col.innerHTML = `
        <div class="kanban-col-header">
          <span class="kanban-col-title">
            ${stageName}
            <span class="kanban-col-count">${colDeals.length}</span>
          </span>
          <span class="kanban-col-total">$${colSum >= 1000 ? (colSum / 1000).toFixed(0) + 'k' : colSum}</span>
        </div>
        <div class="kanban-cards-list" data-stage-drop="${stageName}"></div>
      `;

      const cardsContainer = col.querySelector('.kanban-cards-list');

      colDeals.forEach(deal => {
        const card = document.createElement('div');
        card.className = 'deal-card';
        card.innerHTML = `
          <div class="deal-name">${deal.name}</div>
          <div class="deal-company">${deal.company || deal.customer}</div>
          <div class="deal-value-row">
            <span class="deal-value">$${deal.value.toLocaleString()}</span>
            <span class="deal-followup-badge ${deal.followupDate === '2026-10-13' ? 'due-today' : ''}">
              ${deal.followupDate ? 'Due: ' + deal.followupDate : 'No Date'}
            </span>
          </div>
          <div class="deal-footer">
            <span class="deal-owner">👤 ${deal.owner.split(' ')[0]}</span>
            <div class="btn-group">
              <button class="btn btn-outline btn-xs" data-advance-deal="${deal.id}" title="Advance to next stage">→</button>
            </div>
          </div>
        `;

        cardsContainer.appendChild(card);
      });

      kanbanBoard.appendChild(col);
    });

    // Pipeline List View
    pipelineTableBody.innerHTML = '';
    deals.forEach(deal => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="font-semibold text-main">${deal.name}</div>
          <div class="text-xs text-muted">${deal.company || '—'}</div>
        </td>
        <td>
          <div class="text-xs">${deal.customer}</div>
          <div class="text-xs text-muted">${deal.email}</div>
        </td>
        <td class="font-semibold emerald-text">$${deal.value.toLocaleString()}</td>
        <td><span class="badge-status status-assigned">${deal.stage}</span></td>
        <td><span class="text-xs">${deal.followupDate || '—'}</span></td>
        <td><span class="text-xs">${deal.owner}</span></td>
        <td>
          <button class="btn btn-outline btn-xs" data-advance-deal="${deal.id}">Advance Stage</button>
        </td>
      `;
      pipelineTableBody.appendChild(tr);
    });

    // Advance Stage Handler
    document.querySelectorAll('[data-advance-deal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dealId = btn.dataset.advanceDeal;
        advanceDealStage(dealId);
      });
    });
  }

  function advanceDealStage(dealId) {
    const deal = store.deals.find(d => d.id === dealId);
    if (!deal) return;

    const stages = ['New Lead', 'Contacted', 'Qualified', 'Meeting Scheduled', 'Proposal Sent', 'Negotiation', 'Won'];
    const idx = stages.indexOf(deal.stage);
    if (idx < stages.length - 1) {
      const nextStage = stages[idx + 1];
      deal.stage = nextStage;
      store.addAudit(deal.id, currentUserName.textContent, 'Stage Advanced', `Deal moved to stage: ${nextStage}`);
      store.addNotification('Pipeline Deal Advanced', `${deal.name} advanced to ${nextStage}.`, 'green');
      store.save();
      renderPipeline();
      renderDashboard();
      showToast(`Deal "${deal.name}" moved to ${nextStage}`, 'success');
    } else {
      showToast(`Deal is already at final stage (${deal.stage}).`, 'info');
    }
  }

  // Pipeline Switch Buttons
  pipelineBoardViewBtn.addEventListener('click', () => {
    pipelineBoardViewBtn.classList.add('active');
    pipelineListViewBtn.classList.remove('active');
    kanbanBoardWrapper.classList.remove('hidden');
    pipelineListWrapper.classList.add('hidden');
  });

  pipelineListViewBtn.addEventListener('click', () => {
    pipelineListViewBtn.classList.add('active');
    pipelineBoardViewBtn.classList.remove('active');
    kanbanBoardWrapper.classList.add('hidden');
    pipelineListWrapper.classList.remove('hidden');
  });

  // 4. AI Copilot / Triage Workbench Renderer
  function renderAiWorkbench() {
    aiTicketSelectorList.innerHTML = '';
    const pendingTickets = store.tickets;

    pendingTickets.forEach(ticket => {
      const item = document.createElement('div');
      item.className = `ai-ticket-item ${ticket.id === store.selectedAiTicketId ? 'active' : ''}`;
      item.dataset.ticketId = ticket.id;

      item.innerHTML = `
        <div class="ai-item-head">
          <span class="ai-item-id">${ticket.id}</span>
          <span class="badge badge-${ticket.priority.toLowerCase()}">${ticket.priority}</span>
        </div>
        <div class="ai-item-subj">${ticket.subject}</div>
        <div class="ai-item-cust">${ticket.customerName} • ${ticket.type}</div>
      `;

      item.addEventListener('click', () => {
        store.selectedAiTicketId = ticket.id;
        renderAiWorkbench();
      });

      aiTicketSelectorList.appendChild(item);
    });

    // Populate Inspector
    const activeTicket = store.tickets.find(t => t.id === store.selectedAiTicketId) || store.tickets[0];
    if (activeTicket) {
      aiEmptyPrompt.classList.add('hidden');
      aiResultsPane.classList.remove('hidden');
      aiSelectedTicketTitle.textContent = `${activeTicket.id}: ${activeTicket.subject}`;

      const ai = activeTicket.aiAnalysis;
      aiCatVal.textContent = ai.category;
      aiPriVal.innerHTML = `<span class="badge badge-${ai.suggestedPriority.toLowerCase()}">${ai.suggestedPriority}</span>`;
      aiDeptVal.textContent = ai.department;
      aiSentVal.textContent = ai.sentimentScore;

      aiSummaryText.textContent = ai.summary;
      aiNextActionText.innerHTML = `<strong>Recommended:</strong> ${ai.recommendedAction}`;

      // Urgency alert banner
      aiUrgencyBanner.classList.toggle('hidden', !ai.urgentRisk);
      if (ai.urgentRisk) {
        aiFlagTitle.textContent = 'High Urgency / Escalation Risk Detected';
        aiFlagDesc.textContent = `Negative sentiment or contractual issue detected in customer message. Human verification required before sending.`;
      }

      // Populate draft based on selected tone
      const selectedTone = aiToneSelect.value || 'empathetic';
      aiDraftEditor.value = ai.drafts[selectedTone] || ai.drafts.empathetic;
    } else {
      aiEmptyPrompt.classList.remove('hidden');
      aiResultsPane.classList.add('hidden');
      aiSelectedTicketTitle.textContent = 'Select an enquiry to run AI triage';
    }
  }

  // Tone Switcher Event
  aiToneSelect.addEventListener('change', () => {
    const activeTicket = store.tickets.find(t => t.id === store.selectedAiTicketId);
    if (activeTicket && activeTicket.aiAnalysis) {
      const tone = aiToneSelect.value;
      aiDraftEditor.value = activeTicket.aiAnalysis.drafts[tone] || activeTicket.aiAnalysis.drafts.empathetic;
    }
  });

  regenerateDraftBtn.addEventListener('click', () => {
    const activeTicket = store.tickets.find(t => t.id === store.selectedAiTicketId);
    if (!activeTicket) return;

    // Simulate regeneration
    aiDraftEditor.value = 'Analyzing context & generating refined proposal draft...';
    setTimeout(() => {
      const reanalyzed = AiEngine.analyze(activeTicket.message, activeTicket.subject, activeTicket.type);
      activeTicket.aiAnalysis = reanalyzed;
      store.save();
      const tone = aiToneSelect.value;
      aiDraftEditor.value = reanalyzed.drafts[tone];
      showToast('AI draft re-generated successfully.', 'success');
    }, 400);
  });

  applyAiClassificationBtn.addEventListener('click', () => {
    const activeTicket = store.tickets.find(t => t.id === store.selectedAiTicketId);
    if (!activeTicket) return;

    activeTicket.priority = activeTicket.aiAnalysis.suggestedPriority;
    store.addAudit(activeTicket.id, 'QueueFlow AI', 'AI Classification Applied', `Priority set to ${activeTicket.priority}`);
    store.save();
    renderAll();
    showToast(`Applied AI Priority (${activeTicket.priority}) to ${activeTicket.id}`, 'success');
  });

  approveAndSendReplyBtn.addEventListener('click', () => {
    const activeTicket = store.tickets.find(t => t.id === store.selectedAiTicketId);
    if (!activeTicket) return;

    const replyBody = aiDraftEditor.value.trim();
    if (!replyBody) {
      showToast('Draft is empty. Please enter or generate a reply.', 'error');
      return;
    }

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    activeTicket.interactions.push({
      sender: 'agent',
      author: `${currentUserName.textContent} (${currentUserRoleTag.textContent})`,
      text: replyBody,
      time: now
    });

    if (activeTicket.status === 'New' || activeTicket.status === 'Unassigned') {
      activeTicket.status = 'In Progress';
    }

    store.addAudit(activeTicket.id, currentUserName.textContent, 'Agent Reply Approved & Sent', `Reply sent to ${activeTicket.customerEmail} via ${activeTicket.contactMethod}`);
    store.addDispatch(activeTicket.contactMethod, activeTicket.customerEmail, `Re: ${activeTicket.subject}`, activeTicket.priority === 'Urgent');
    store.save();
    renderAll();
    showToast(`Approved response dispatched to ${activeTicket.customerName}!`, 'success');
  });

  // 5. Automations & Audit Trail Renderer
  function renderAutomations() {
    // Render Outgoing Dispatch Log
    dispatchLogList.innerHTML = '';
    store.dispatchLog.slice(0, 8).forEach(entry => {
      const item = document.createElement('div');
      item.className = `log-entry ${entry.isUrgent ? 'urgent' : ''}`;
      item.innerHTML = `
        <div class="font-semibold text-main">${entry.subject}</div>
        <div class="text-xs text-muted">${entry.method} to: ${entry.to} • ${entry.status}</div>
        <div class="log-meta">
          <span>${entry.time}</span>
          ${entry.isUrgent ? '<span class="badge badge-danger">Priority SLA</span>' : ''}
        </div>
      `;
      dispatchLogList.appendChild(item);
    });

    // Render Audit Trail
    auditTrailTableBody.innerHTML = '';
    store.auditTrail.slice(0, 12).forEach(audit => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="text-xs text-muted">${audit.time}</span></td>
        <td><span class="ticket-id-link" data-open-ticket="${audit.refId}">${audit.refId}</span></td>
        <td><span class="font-semibold">${audit.actor}</span></td>
        <td><span class="badge-status status-assigned">${audit.action}</span></td>
        <td><span class="text-xs">${audit.details}</span></td>
      `;
      auditTrailTableBody.appendChild(tr);
    });

    // Attach links
    document.querySelectorAll('#auditTrailTableBody [data-open-ticket]').forEach(btn => {
      btn.addEventListener('click', () => openTicketDetail(btn.dataset.openTicket));
    });
  }

  testRulesBtn.addEventListener('click', () => {
    // Simulate automated run: identify overdue/urgent and create alert
    const urgentTickets = store.tickets.filter(t => t.priority === 'Urgent' && t.status !== 'Resolved');
    store.addNotification('Automation Engine Executed', `Checked 5 SLA rules. Flagged ${urgentTickets.length} urgent ticket(s) for manager review.`, 'red');
    store.addAudit('SYSTEM', 'Cron Automation Engine', 'Rule Evaluation', `Evaluated 5 rules across ${store.tickets.length} tickets. 0 breaches.`);
    renderAll();
    showToast('Automation check completed: 0 breaches detected.', 'success');
  });

  // 6. Notifications Dropdown Renderer
  function renderNotifications() {
    notifList.innerHTML = '';
    if (store.notifications.length === 0) {
      notifList.innerHTML = '<div class="p-3 text-center text-muted text-xs">No active alerts.</div>';
      notifBadgeDot.classList.add('hidden');
    } else {
      notifBadgeDot.classList.remove('hidden');
      store.notifications.forEach(n => {
        const item = document.createElement('div');
        item.className = 'notif-item';
        item.innerHTML = `
          <div class="notif-icon-circle ${n.type}">
            <svg class="icon-inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <div class="notif-body">
            <div class="notif-title">${n.title}</div>
            <div class="notif-text">${n.text}</div>
            <div class="notif-time">${n.time}</div>
          </div>
        `;
        notifList.appendChild(item);
      });
    }
  }

  notifBellBtn.addEventListener('click', () => {
    notifDropdown.classList.toggle('hidden');
  });

  clearNotifsBtn.addEventListener('click', () => {
    store.notifications = [];
    store.save();
    renderNotifications();
    notifDropdown.classList.add('hidden');
    showToast('Notifications cleared.', 'info');
  });

  // Close notif menu if clicked outside
  document.addEventListener('click', (e) => {
    if (!notifBellBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
      notifDropdown.classList.add('hidden');
    }
  });

  // ==========================================================================
  // Ticket Detail Modal & Interaction Manager
  // ==========================================================================
  function openTicketDetail(ticketId) {
    const ticket = store.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    activeModalTicketId = ticket.id;

    dtTicketId.textContent = ticket.id;
    dtSubject.textContent = ticket.subject;
    dtPriorityBadge.textContent = ticket.priority;
    dtPriorityBadge.className = `badge badge-${ticket.priority.toLowerCase()}`;

    dtStatusSelect.value = ticket.status;
    dtPrioritySelect.value = ticket.priority;
    dtAssigneeSelect.value = ticket.assignedTo;
    dtType.textContent = ticket.type;

    dtCustomerName.textContent = ticket.customerName;
    dtCustomerEmail.textContent = ticket.customerEmail;
    dtCustomerPhone.textContent = ticket.customerPhone || 'N/A';
    dtCustomerPref.textContent = `Prefers: ${ticket.contactMethod}`;

    dtCreatedDate.textContent = ticket.createdDate;
    dtUpdatedDate.textContent = ticket.updatedDate || '—';
    dtResolvedDate.textContent = ticket.resolvedDate || '—';

    // AI summary
    dtAiSummary.textContent = `AI Summary: ${ticket.aiAnalysis ? ticket.aiAnalysis.summary : 'Pending analysis.'}`;
    dtAiNextAction.textContent = ticket.aiAnalysis ? ticket.aiAnalysis.recommendedAction : 'Review enquiry details.';

    // Show or hide "Convert to Sales Deal"
    dtConvertToDealWrap.style.display = ticket.type === 'Sales' ? 'block' : 'none';

    renderTicketTimeline(ticket);
    renderTicketNotes(ticket);

    // Reset tabs to timeline
    tabInteractionsBtn.click();

    ticketDetailModal.showModal();
  }

  function renderTicketTimeline(ticket) {
    dtMessagesList.innerHTML = '';
    ticket.interactions.forEach(msg => {
      const item = document.createElement('div');
      item.className = `msg-item ${msg.sender}`;
      item.innerHTML = `
        <div class="msg-meta">
          <span>${msg.author}</span>
          <span>${msg.time}</span>
        </div>
        <div>${msg.text}</div>
      `;
      dtMessagesList.appendChild(item);
    });
    dtMessagesList.scrollTop = dtMessagesList.scrollHeight;
  }

  function renderTicketNotes(ticket) {
    dtNotesList.innerHTML = '';
    notesCount.textContent = ticket.notes.length;
    if (ticket.notes.length === 0) {
      dtNotesList.innerHTML = '<div class="p-3 text-center text-muted text-xs">No internal notes yet. Internal notes are hidden from customers.</div>';
    } else {
      ticket.notes.forEach(note => {
        const item = document.createElement('div');
        item.className = 'note-item';
        item.innerHTML = `
          <div class="msg-meta">
            <strong>${note.author}</strong>
            <span>${note.time}</span>
          </div>
          <div class="mt-1">${note.text}</div>
        `;
        dtNotesList.appendChild(item);
      });
    }
  }

  // Ticket Status & Priority Live Updaters
  dtStatusSelect.addEventListener('change', () => {
    const ticket = store.tickets.find(t => t.id === activeModalTicketId);
    if (!ticket) return;

    const oldStatus = ticket.status;
    const newStatus = dtStatusSelect.value;
    ticket.status = newStatus;
    ticket.updatedDate = new Date().toISOString().replace('T', ' ').substring(0, 16);

    if (newStatus === 'Resolved' || newStatus === 'Closed') {
      ticket.resolvedDate = ticket.updatedDate;
    }

    store.addAudit(ticket.id, currentUserName.textContent, 'Status Changed', `Status updated from "${oldStatus}" to "${newStatus}"`);
    
    // Auto-notify customer if enabled
    if (document.getElementById('ruleStatusNotif').checked) {
      store.addDispatch(ticket.contactMethod, ticket.customerEmail, `Update on Ticket ${ticket.id}: Status is now ${newStatus}`);
    }

    store.save();
    renderAll();
    showToast(`Ticket status updated to "${newStatus}"`, 'success');
  });

  dtPrioritySelect.addEventListener('change', () => {
    const ticket = store.tickets.find(t => t.id === activeModalTicketId);
    if (!ticket) return;

    ticket.priority = dtPrioritySelect.value;
    dtPriorityBadge.textContent = ticket.priority;
    dtPriorityBadge.className = `badge badge-${ticket.priority.toLowerCase()}`;

    if (ticket.priority === 'Urgent') {
      store.addNotification('Manager Alert: Priority Raised to Urgent', `Ticket ${ticket.id} (${ticket.customerName}) marked Urgent.`, 'red');
    }

    store.addAudit(ticket.id, currentUserName.textContent, 'Priority Changed', `Priority set to ${ticket.priority}`);
    store.save();
    renderAll();
    showToast(`Priority updated to "${ticket.priority}"`, 'info');
  });

  dtAssigneeSelect.addEventListener('change', () => {
    const ticket = store.tickets.find(t => t.id === activeModalTicketId);
    if (!ticket) return;

    const newAssignee = dtAssigneeSelect.value;
    ticket.assignedTo = newAssignee;
    if (ticket.status === 'New' || ticket.status === 'Unassigned') {
      ticket.status = 'Assigned';
      dtStatusSelect.value = 'Assigned';
    }

    // Auto notification
    if (document.getElementById('ruleAssign').checked && newAssignee !== 'Unassigned') {
      store.addNotification('Ticket Assigned', `Ticket ${ticket.id} assigned to ${newAssignee}.`, 'blue');
    }

    store.addAudit(ticket.id, currentUserName.textContent, 'Assignee Changed', `Ticket assigned to ${newAssignee}`);
    store.save();
    renderAll();
    showToast(`Ticket assigned to ${newAssignee}`, 'success');
  });

  // Modal Subtabs Switcher
  tabInteractionsBtn.addEventListener('click', () => {
    tabInteractionsBtn.classList.add('active');
    tabNotesBtn.classList.remove('active');
    timelinePane.classList.remove('hidden');
    notesPane.classList.add('hidden');
  });

  tabNotesBtn.addEventListener('click', () => {
    tabNotesBtn.classList.add('active');
    tabInteractionsBtn.classList.remove('active');
    notesPane.classList.remove('hidden');
    timelinePane.classList.add('hidden');
  });

  // Insert AI Draft into Reply Textarea
  dtInsertAiDraftBtn.addEventListener('click', () => {
    const ticket = store.tickets.find(t => t.id === activeModalTicketId);
    if (ticket && ticket.aiAnalysis) {
      dtReplyTextarea.value = ticket.aiAnalysis.drafts.empathetic;
      showToast('AI draft inserted into editor. You can edit before sending.', 'info');
    }
  });

  // Send Reply from Ticket Modal
  dtSendReplyBtn.addEventListener('click', () => {
    const ticket = store.tickets.find(t => t.id === activeModalTicketId);
    if (!ticket) return;

    const reply = dtReplyTextarea.value.trim();
    if (!reply) {
      showToast('Please type a reply message first.', 'error');
      return;
    }

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    ticket.interactions.push({
      sender: 'agent',
      author: `${currentUserName.textContent} (${currentUserRoleTag.textContent})`,
      text: reply,
      time: now
    });

    if (ticket.status === 'New' || ticket.status === 'Assigned') {
      ticket.status = 'Waiting for Customer';
      dtStatusSelect.value = 'Waiting for Customer';
    }

    ticket.updatedDate = now;
    dtReplyTextarea.value = '';

    store.addAudit(ticket.id, currentUserName.textContent, 'Agent Reply Sent', `Sent message to customer (${ticket.contactMethod})`);
    store.addDispatch(ticket.contactMethod, ticket.customerEmail, `Re: ${ticket.subject}`);
    store.save();

    renderTicketTimeline(ticket);
    renderAll();
    showToast(`Reply sent to ${ticket.customerName}!`, 'success');
  });

  // Add Internal Note
  dtAddNoteBtn.addEventListener('click', () => {
    const ticket = store.tickets.find(t => t.id === activeModalTicketId);
    if (!ticket) return;

    const noteText = dtNewNoteTextarea.value.trim();
    if (!noteText) return;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    ticket.notes.push({
      author: currentUserName.textContent,
      text: noteText,
      time: now
    });

    dtNewNoteTextarea.value = '';
    store.addAudit(ticket.id, currentUserName.textContent, 'Internal Note Added', `Note: "${noteText.substring(0, 30)}..."`);
    store.save();

    renderTicketNotes(ticket);
    showToast('Internal note saved.', 'success');
  });

  // Convert Sales Ticket to Pipeline Deal
  dtConvertToDealBtn.addEventListener('click', () => {
    const ticket = store.tickets.find(t => t.id === activeModalTicketId);
    if (!ticket) return;

    const newDealId = 'DL-' + (store.deals.length + 201);
    const newDeal = {
      id: newDealId,
      name: ticket.subject,
      customer: ticket.customerName,
      company: ticket.customerName + ' Enterprise',
      email: ticket.customerEmail,
      phone: ticket.customerPhone,
      value: 50000,
      stage: 'New Lead',
      followupDate: '2026-10-15',
      owner: 'Maya Brooks',
      notes: `Converted from Ticket ${ticket.id}. Original enquiry: ${ticket.message}`
    };

    store.deals.unshift(newDeal);
    store.addAudit(ticket.id, currentUserName.textContent, 'Converted to Deal', `Created sales deal ${newDealId}`);
    store.addNotification('Sales Lead Converted', `Deal "${newDeal.name}" added to pipeline.`, 'green');
    store.save();

    ticketDetailModal.close();
    switchView('pipeline');
    showToast(`Converted ticket to sales deal ${newDealId}!`, 'success');
  });

  dtAiRerunBtn.addEventListener('click', () => {
    const ticket = store.tickets.find(t => t.id === activeModalTicketId);
    if (!ticket) return;

    const re = AiEngine.analyze(ticket.message, ticket.subject, ticket.type);
    ticket.aiAnalysis = re;
    dtAiSummary.textContent = `AI Summary: ${re.summary}`;
    dtAiNextAction.textContent = re.recommendedAction;
    store.save();
    showToast('AI analysis updated.', 'success');
  });

  closeTicketDetailModalBtn.addEventListener('click', () => ticketDetailModal.close());

  // ==========================================================================
  // New Enquiry Submission Form (Internal & Customer Universal)
  // ==========================================================================
  [openNewEnquiryBtn, dashNewEnquiryBtn, queueNewEnquiryBtn].forEach(btn => {
    btn?.addEventListener('click', () => {
      internalEnquiryForm.reset();
      newEnquiryModal.showModal();
    });
  });

  closeEnquiryModalBtn?.addEventListener('click', () => newEnquiryModal.close());
  cancelEnquiryModalBtn?.addEventListener('click', () => newEnquiryModal.close());

  internalEnquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('modalCustomerName').value.trim();
    const email = document.getElementById('modalCustomerEmail').value.trim();
    const phone = document.getElementById('modalCustomerPhone').value.trim();
    const method = document.getElementById('modalContactMethod').value;
    const type = document.getElementById('modalEnquiryType').value;
    const priorityChoice = document.getElementById('modalPriority').value;
    const subject = document.getElementById('modalSubject').value.trim();
    const message = document.getElementById('modalMessage').value.trim();
    const assignee = document.getElementById('modalAssignee').value;

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Generate unique ID: QF-XXXX
    const nextNum = 1040 + store.tickets.length + Math.floor(Math.random() * 20);
    const newId = `QF-${nextNum}`;

    // Run AI Triage Immediately
    const aiAnalysis = AiEngine.analyze(message, subject, type);

    const finalPriority = priorityChoice === 'Auto' ? aiAnalysis.suggestedPriority : priorityChoice;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newTicket = {
      id: newId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      contactMethod: method,
      subject,
      message,
      type,
      priority: finalPriority,
      status: assignee === 'Unassigned' ? 'Unassigned' : 'Assigned',
      assignedTo: assignee,
      createdDate: now,
      updatedDate: now,
      resolvedDate: null,
      isOverdue: false,
      aiAnalysis,
      interactions: [
        { sender: 'customer', author: name, text: message, time: now },
        { sender: 'system', author: 'QueueFlow AI', text: `Enquiry received. AI classified: ${aiAnalysis.category} (${finalPriority} priority).`, time: now }
      ],
      notes: []
    };

    store.tickets.unshift(newTicket);

    // Automation: Dispatch customer receipt confirmation
    if (document.getElementById('ruleReceipt').checked) {
      store.addDispatch(method, email, `Confirmation: We received your enquiry (Ticket ${newId})`, finalPriority === 'Urgent');
    }

    // Automation: Alert manager if urgent
    if (finalPriority === 'Urgent') {
      store.addNotification('Manager Urgent Alert', `New urgent enquiry ${newId} from ${name}: "${subject}"`, 'red');
    }

    store.addAudit(newId, name, 'Ticket Submitted', `New ticket created. AI classified: ${aiAnalysis.category}`);
    store.save();

    newEnquiryModal.close();
    renderAll();
    showToast(`Ticket ${newId} created successfully!`, 'success');
  });

  // ==========================================================================
  // Customer Self-Service Portal Form & Tracker
  // ==========================================================================
  portalCustomerForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('portalName').value.trim();
    const email = document.getElementById('portalEmail').value.trim();
    const phone = document.getElementById('portalPhone').value.trim();
    const method = document.getElementById('portalMethod').value;
    const type = document.getElementById('portalType').value;
    const subject = document.getElementById('portalSubject').value.trim();
    const message = document.getElementById('portalMessage').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const nextNum = 1055 + store.tickets.length;
    const newId = `QF-${nextNum}`;
    const aiAnalysis = AiEngine.analyze(message, subject, type);
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newTicket = {
      id: newId,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      contactMethod: method,
      subject,
      message,
      type,
      priority: aiAnalysis.suggestedPriority,
      status: 'New',
      assignedTo: 'Unassigned',
      createdDate: now,
      updatedDate: now,
      resolvedDate: null,
      isOverdue: false,
      aiAnalysis,
      interactions: [
        { sender: 'customer', author: name, text: message, time: now },
        { sender: 'system', author: 'QueueFlow AI', text: `Receipt generated. Ticket ${newId} queued for response.`, time: now }
      ],
      notes: []
    };

    store.tickets.unshift(newTicket);
    store.addDispatch(method, email, `Ticket Receipt Confirmation ${newId}`, aiAnalysis.urgentRisk);
    store.addNotification('New Customer Portal Enquiry', `Ticket ${newId} received from ${name}.`, 'blue');
    store.addAudit(newId, name, 'Customer Portal Submission', `Submitted via external customer portal.`);
    store.save();

    portalCustomerForm.reset();
    renderAll();

    // Auto fill tracking form to let them immediately track
    document.getElementById('trackTicketId').value = newId;
    document.getElementById('trackEmail').value = email;
    portalTrackForm.dispatchEvent(new Event('submit'));

    showToast(`Thank you! Your Ticket ID is ${newId}. You can track it below.`, 'success', 5000);
  });

  // Track My Ticket (Enforces Customer Isolation!)
  portalTrackForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchId = document.getElementById('trackTicketId').value.trim().toUpperCase();
    const searchEmail = document.getElementById('trackEmail').value.trim().toLowerCase();

    // Security Verification: Must match BOTH ticket ID and customer email!
    const matched = store.tickets.find(t => 
      t.id.toUpperCase() === searchId && 
      t.customerEmail.toLowerCase() === searchEmail
    );

    if (!matched) {
      trackResultBox.classList.add('hidden');
      showToast('No ticket found matching that Ticket ID and Email. Please verify and try again.', 'error');
      return;
    }

    trackResultBox.classList.remove('hidden');
    resTicketId.textContent = matched.id;
    resSubject.textContent = matched.subject;
    resStatusBadge.textContent = matched.status;
    resStatusBadge.className = `badge-status status-${matched.status.toLowerCase().replace(/\s+/g, '-')}`;

    resTimeline.innerHTML = '';
    matched.interactions.forEach(msg => {
      const step = document.createElement('div');
      step.className = 'timeline-step';
      step.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <strong>${msg.author}</strong>: ${msg.text}
          <div class="timeline-time">${msg.time}</div>
        </div>
      `;
      resTimeline.appendChild(step);
    });

    showToast(`Loaded ticket ${matched.id} successfully.`, 'success');
  });

  // Customer adds reply to their tracked ticket
  custReplyBtn?.addEventListener('click', () => {
    const searchId = resTicketId.textContent;
    const ticket = store.tickets.find(t => t.id === searchId);
    if (!ticket) return;

    const replyMsg = custReplyInput.value.trim();
    if (!replyMsg) return;

    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    ticket.interactions.push({
      sender: 'customer',
      author: ticket.customerName,
      text: replyMsg,
      time: now
    });

    if (ticket.status === 'Waiting for Customer') {
      ticket.status = 'In Progress';
    }

    custReplyInput.value = '';
    store.addAudit(ticket.id, ticket.customerName, 'Customer Follow-up Added', replyMsg);
    store.addNotification('Customer Replied to Ticket', `${ticket.customerName} sent an update on ${ticket.id}.`, 'blue');
    store.save();

    // Re-render track timeline
    portalTrackForm.dispatchEvent(new Event('submit'));
    renderAll();
    showToast('Your message has been sent to the service team.', 'success');
  });

  // ==========================================================================
  // Sales Deal Modal Handler
  // ==========================================================================
  openNewDealBtn?.addEventListener('click', () => {
    dealForm.reset();
    dealModal.showModal();
  });

  closeDealModalBtn?.addEventListener('click', () => dealModal.close());
  cancelDealModalBtn?.addEventListener('click', () => dealModal.close());

  dealForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('dealName').value.trim();
    const customer = document.getElementById('dealCustomer').value.trim();
    const company = document.getElementById('dealCompany').value.trim();
    const email = document.getElementById('dealEmail').value.trim();
    const phone = document.getElementById('dealPhone').value.trim();
    const value = parseFloat(document.getElementById('dealValue').value) || 0;
    const stage = document.getElementById('dealStage').value;
    const followupDate = document.getElementById('dealFollowup').value;
    const owner = document.getElementById('dealOwner').value;
    const notes = document.getElementById('dealNotes').value.trim();

    if (!name || !customer || !email) {
      showToast('Please fill in required deal fields.', 'error');
      return;
    }

    const newDealId = 'DL-' + (store.deals.length + 201);
    const newDeal = {
      id: newDealId,
      name,
      customer,
      company,
      email,
      phone,
      value,
      stage,
      followupDate,
      owner,
      notes
    };

    store.deals.unshift(newDeal);
    store.addAudit(newDealId, currentUserName.textContent, 'Sales Deal Created', `Created deal "${name}" valued at $${value.toLocaleString()}`);
    store.addNotification('New Pipeline Deal', `Deal "${name}" ($${value.toLocaleString()}) created.`, 'green');
    store.save();

    dealModal.close();
    renderPipeline();
    renderDashboard();
    showToast(`Deal "${name}" added to pipeline!`, 'success');
  });

  // Export Summary Report
  document.getElementById('exportReportBtn')?.addEventListener('click', () => {
    const summaryData = [
      ['Metric', 'Value'],
      ['Total Open Tickets', store.tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length],
      ['Unassigned Tickets', store.tickets.filter(t => t.assignedTo === 'Unassigned').length],
      ['Urgent Priority Tickets', store.tickets.filter(t => t.priority === 'Urgent').length],
      ['Active Deals Count', store.deals.length],
      ['Total Pipeline Value', '$' + store.deals.reduce((s, d) => s + d.value, 0).toLocaleString()],
      ['Deals Won', store.deals.filter(d => d.stage === 'Won').length]
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + summaryData.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `QueueFlow_Summary_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Summary report exported as CSV.', 'success');
  });

  // Global Search
  globalSearchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    if (!term) return;

    if (store.currentView !== 'queue') {
      switchView('queue');
    }
    queueSearchInput.value = term;
    renderQueue();
  });

  // Reset Demo Data Button
  resetDataBtn.addEventListener('click', () => {
    if (confirm('Reset QueueFlow AI to original pre-seeded demonstration data?')) {
      store.resetAll();
      renderAll();
      showToast('System data reset to initial sample set.', 'info');
    }
  });

  // Initial Boot
  renderAll();
  showToast('QueueFlow AI loaded successfully. AI Triage Engine active.', 'info');
});
