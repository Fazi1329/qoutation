# QueueFlow AI — Sales & Customer Service Management System

A unified, professional web application designed for small and medium-sized businesses to manage customer enquiries, support tickets, sales pipelines, and AI triage workflows in one seamless SaaS interface.

---

## 🌟 Key Features Built

### 1. Customer Enquiry Submission & Unique Ticket Generation
- **Universal & Internal Modal**: Non-technical team members can submit phone, email, or WhatsApp requests quickly.
- **Customer Self-Service Portal**: Public-facing enquiry form with instant confirmation.
- **Unique Ticket ID System**: Sequential generation with standard format (e.g., `QF-1048`, `QF-1049`).
- **Data Capture**: Customer Name, Email, Phone, Preferred Contact Method (Email, Phone, WhatsApp, SMS), Enquiry Type (Sales, General Support, Complaint, Billing, Technical Support), Subject, and Detailed Message.

### 2. Queue Management
- **Categorization**: 4 Priorities (`Low`, `Medium`, `High`, `Urgent`) and 8 Statuses (`New`, `Unassigned`, `Assigned`, `In Progress`, `Waiting for Customer`, `Escalated`, `Resolved`, `Closed`).
- **Views & Subtabs**:
  - `All Tickets`
  - `My Queue` (dynamically filtered by current logged-in user)
  - `Unassigned`
  - `Urgent`
  - `Overdue` (exceeding SLA targets)
  - `Resolved / Closed`
- **Search & Filters**: Real-time keyword search, priority, department, status, and assignee filters.
- **Interactive Ticket Drawer**:
  - Live interaction timeline (customer messages, agent messages, automated logs).
  - Internal staff notes tab (isolated from customer view).
  - Status, priority, and staff re-assignment dropdowns.
  - "Convert to Sales Deal" button for sales opportunities.

### 3. Sales Pipeline (7 Stages)
- **Full 7-Stage Workflow**:
  1. `New Lead`
  2. `Contacted`
  3. `Qualified`
  4. `Meeting Scheduled`
  5. `Proposal Sent`
  6. `Negotiation`
  7. `Won` / `Lost`
- **Dual Views**:
  - Interactive **Kanban Board** with column totals and deal value aggregations.
  - Comprehensive **List View** with sorting and quick stage progression.
- **Deal Tracking**: Tracks estimated value ($ USD), next follow-up date (with "Due Today" highlight badges), sales owner, and prospect notes.

### 4. AI Copilot & Triage Workbench
- **Real-Time Classification**: Automatically categorizes enquiries, determines sentiment scores, and suggests priority and department routing.
- **Executive Summaries**: AI creates a 2-sentence crisp issue summary.
- **Recommended Next Actions**: Suggests actionable next steps (e.g. issuing credit refunds or scheduling discovery calls).
- **Urgent Complaint & Escalation Flags**: Automatically identifies high-frustration or SLA-breach tickets requiring human management intervention.
- **Editable Draft Replies**:
  - Human-in-the-loop safety: Drafts are **never dispatched automatically** without explicit human review and approval.
  - Tone Switcher: `Empathetic & Reassuring`, `Concise & Direct`, `Formal Corporate`, `Sales & Value Driven`.

### 5. Automations & Notifications
- **Notification Dropdown**: Real-time alerts for ticket assignments, urgent complaints, and sales follow-up reminders.
- **Configurable Workflow Toggles**:
  - Customer receipt confirmations
  - Employee assignment alerts
  - Manager escalation alerts for urgent/overdue tickets
  - Sales follow-up reminders
  - Automatic status change notifications
- **Outbound Dispatch Log**: Audit trace of simulated customer communications across Email, SMS, and WhatsApp.
- **Full Audit Trail**: Immutable logging of every change, assignment, and status transition with actor and timestamp.

### 6. Executive Dashboard & Reports
- **Real-Time KPIs**: Open tickets, unassigned tickets, urgent tickets, average first-response time, average resolution time, pipeline value, and won deals.
- **Visual Analytics**:
  - Performance bars: Tickets resolved per employee.
  - Sales funnel: Deal distribution across stages.
  - Priority attention table.
- **Export Summary**: Generates and downloads a `.csv` report of all key metrics with one click.

### 7. User Roles & Security
- **Role Switcher in Sidebar**:
  - `Admin (David Vance)`: Full access to all modules, team assignments, settings, and metrics.
  - `Manager (Elena Rostova)`: Queue oversight, reassignment, urgent ticket escalations, and reports.
  - `Support Agent (Liam Chen)`: Support queue focus and resolution.
  - `Sales Agent (Maya Brooks)`: Sales pipeline and lead management.
  - `Customer View`: External self-service portal.
- **Customer Isolation Security**: External customers can **only** track their own tickets by providing both their specific **Ticket ID** and matching **Email Address**.

---

## 🚀 How to Run & Test

1. **Direct Browser Launch**:
   - Double-click [index.html](file:///c:/Users/fazsa/OneDrive/Desktop/SQS/index.html) to run the application directly in any browser.
2. **Local Web Server**:
   ```powershell
   npx serve .
   ```
   or
   ```powershell
   python -m http.server 3000
   ```
3. **Reset Demo Data**:
   - Click the **"Reset Demo"** button in the top navigation bar at any time to restore pre-seeded sample data.
4. **Previous SQS Login Replica**:
   - The standalone replica of `https://sqs-project-v-1.vercel.app/login` remains available at [sqs-login.html](file:///c:/Users/fazsa/OneDrive/Desktop/SQS/sqs-login.html).
