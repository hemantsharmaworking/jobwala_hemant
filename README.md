# 🚀 Jobwala - Comprehensive Job Portal & Placement Preparation Platform

A full-stack, enterprise-grade Placement & Career Acceleration Platform designed for students, freshers, and experienced software engineers to discover tech jobs, prepare with curated DSA sheets, practice core CS fundamentals, and crack company-specific hiring processes.

---

## 🌟 New Features & Enhancements

### 1. 🔐 Google Gmail Sign-In & Authentication
- Seamless Google Sign-In with OAuth pop-up simulation.
- 1-Click quick account selection or custom Gmail address login.
- User session persistence (database + client-side state).
- Dynamic navbar avatar, user greeting, and dropdown menu.

### 2. 📋 Comprehensive Candidate Profile & CV Management
Immediately upon signing in, candidates complete their placement profile:
- **Full Name**
- **Mobile Number**
- **Google Email Address**
- **Higher Qualification**: Degree, College Name, Branch/Specialization, Passing Year (2024-2027), and CGPA/%
- **LinkedIn Profile URL**
- **GitHub Profile URL**
- **CV / Resume**: File upload selector (PDF/DOC) + hosted Google Drive / Dropbox link
- **Auto-Fill**: Automatically pre-fills job application forms when applying for any opening on the platform!

### 3. ⚙️ Settings & Theme Customization
- **Theme Selection**: Dedicated Dark Mode vs. Light Mode with visual card previews.
- **Placement Alerts & Notifications**: Toggle alerts for new job postings, daily DSA streak reminders, and off-campus deadlines.
- **Account Status**: Displays signed-in Google account and Pro status.

### 4. 👑 Pro Subscription ("More Opportunities")
- Prominent top navbar **"Pro Opportunities"** pill button with glowing animation.
- Tier comparison:
  - **Free**: Access to standard Job Board, 100+ DSA Sheet, Core CS Notes.
  - **Placement Pro (₹499/mo)**: Direct HR Referrals, Priority Application Tag, Exclusive Off-Campus drive alerts 48h early, AI ATS resume review, 2 live mock technical/HR interviews.
  - **Career Bootcamp (₹1,999 one-time)**: 1-on-1 FAANG mentor assigned, unlimited mock interviews, company hidden papers, guaranteed interview callbacks.
- Interactive instant subscription activation with `PRO` badge.

### 1. 💼 Tech Job Portal
- **Rich Job Listings**: Pre-loaded with verified opportunities from Google, Microsoft, Amazon, TCS, Infosys, Flipkart, Goldman Sachs, Razorpay, Swiggy, and Accenture.
- **Search & Multi-Facet Filtering**: Filter in real-time by keyword, job role (SDE, Frontend, Backend, Fullstack, DevOps), job type (Full-time, Internship, Remote), and experience level.
- **Job Detail Modal**: Full job descriptions, salary CTC breakdown, eligibility requirements, and direct career link.
- **Interactive Application Flow**: Submit applications with custom cover notes, experience levels, and resume links.
- **Application Tracker**: "My Applications" view tracking review states (Under Review, Shortlisted, Interview Scheduled, Offered).
- **Post a Job**: Recruiter interface to publish job openings directly into the SQLite database.

---

### 2. 📚 Comprehensive Preparation Hub
- **🧮 Aptitude Preparation**:
  - Quantitative Aptitude (Percentages, Profit & Loss, Speed Distance Time, Time & Work, Interest, Alligations).
  - Logical Reasoning (Blood Relations, Clock Angles, Syllogisms, Seating Arrangement, Direction Sense).
  - Verbal Ability (Grammar rules, Subject-Verb agreement, Conditional clauses).
  - Cheatsheets & Formula Cards.
  - High-yield practice problems with revealable, step-by-step math breakdowns.
- **💻 Core Computer Science Fundamentals**:
  - **Operating Systems (OS)**: Process vs Thread, Context Switching, Deadlock Coffman Conditions, Banker's Algorithm, Paging, Virtual Memory, Thrashing.
  - **Database Management Systems (DBMS)**: ACID properties, Normalization (1NF to BCNF), B+ Tree Indexing internals, SQL Joins, SQL vs NoSQL.
  - **Computer Networks (CN)**: OSI 7 Layers, TCP/IP, TCP 3-Way Handshake, DNS resolution, HTTP vs HTTPS (TLS handshake).
  - **Object-Oriented Programming (OOP)**: 4 Core Pillars, SOLID design principles, Singleton design pattern with thread safety.
  - Top 20 interview Q&As per subject with in-depth answers.
- **🤝 HR & Behavioral Interview Preparation**:
  - **The STAR Method Guide**: Situation, Task, Action, Result breakdown.
  - **Interactive STAR Answer Builder**: Input context, challenges, personal actions, and measurable metrics to generate an articulate interview response.
  - Top 25 HR Questions with structures, Do's & Don'ts, and sample high-scoring answers.
  - Questions candidates should ask interviewers.
- **📝 Interactive Quiz Engine**:
  - Timed placement tests with instant color-coded feedback (Green/Red), step-by-step explanations, score tally, and backend attempt history.

---

### 3. 🎯 Dedicated Topic-Wise DSA Preparation Sheet
- **Topic-Wise Structure**: 13 key algorithmic topics (Arrays, Strings, Linked Lists, Stacks & Queues, Recursion & Backtracking, Binary Trees, BST, Graphs, Dynamic Programming, Greedy, Binary Search, Heaps, Bit Manipulation).
- **120+ Curated Problems**: Based on Striver SDE Sheet, NeetCode 150, and Blind 75.
- **Live Progress Tracker**:
  - Checkboxes to mark problems as Solved/Unsolved with instant progress bar calculation.
  - Solved breakdown by difficulty (Easy, Medium, Hard).
- **Optimal Solutions & Multi-Language Code**:
  - Intuition & Optimal Approach.
  - Time and Space Complexity analysis.
  - Tabbed syntax code snippets for **C++**, **Java**, **Python**, and **JavaScript** with 1-Click Copy.
- **Personal Notes & Code Drawer**: Add your own notes and custom code snippets saved per problem.
- **Practice Links**: 1-click external practice links to LeetCode and GeeksforGeeks.

---

### 4. 🏛️ Companies Hiring Process, Exam Patterns & Syllabus
- **16 Major Tech Companies**:
  - *Product / FAANG / FinTech*: Google, Microsoft, Amazon, Meta, Adobe, Uber, Goldman Sachs, Flipkart.
  - *Service / IT Giants*: TCS (Prime, Digital, Ninja), Infosys (SP, DSE, SE), Wipro (Turbo, Elite), Accenture (AAEA, ASE), Cognizant, Capgemini.
- **Comprehensive Breakdowns**:
  - Specific Cadres & CTC packages (e.g. TCS Prime 9 LPA vs Ninja 3.6 LPA; Infosys SP 9.5 LPA).
  - Online Exam Pattern (Sectional time limits, question count, test platform used, negative marking rules).
  - Complete Syllabus (Cognitive, Advanced Coding, Pseudo-code, Technical MCQs).
  - Strict Eligibility Criteria (Academic % cutoffs for 10th/12th/College, allowable active backlogs, education gap rules).
  - Selection Process Stages & Roadmap.
  - Real interview questions previously asked.
  - Insider preparation strategy and tips.
- **🔍 Instant Eligibility Checker Tool**:
  - Enter your College CGPA, 10th %, 12th %, and Active Backlogs to immediately see which companies you qualify for!

---

### 5. 📊 Candidate Placement Dashboard
- Placement Readiness composite index (0 - 100%).
- Real-time milestone tracker for DSA problem completion.
- List of submitted job applications and their active review statuses.
- Average quiz accuracy and performance history.

---

## 💻 Tech Stack & Architecture

- **Backend**: Python 3.13 + Flask + Flask-CORS
- **Database**: SQLite3 (`data/portal.db`) with relational schemas for jobs, applications, DSA progress, notes, and quiz history.
- **Frontend**: Responsive Single-Page Application (SPA) with CSS Custom Properties, Dark/Light mode theme switching, FontAwesome 6 icons, and glassmorphic UI.
- **Offline / Standalone Support**: Automatic client-side `localStorage` caching ensures full functionality even without a network connection.

---

## 🏃 Quick Start Guide

### Option 1: One-Click Startup (Recommended)
Double-click `run.bat` in the project root directory. This will start the Python server on port 5000 and automatically open your default browser to `http://localhost:5000`.

### Option 2: Command Line (PowerShell)
```powershell
# From the project directory
& "C:\Users\hemant sharma\AppData\Local\Programs\Python\Python313\python.exe" server.py
```
Then visit: `http://localhost:5000`

### Option 3: Direct File Opening
You can also open `static/index.html` directly in Google Chrome, Microsoft Edge, or Firefox. All features (DSA sheet, notes, cheatsheets, aptitude problems, company syllabi, quiz engine) work seamlessly with client-side persistence!

---

## 📂 Project Directory Structure

```
job portal website/
├── server.py                   # Flask backend with REST API & SQLite integration
├── run.bat                     # 1-click startup script
├── README.md                   # Complete documentation
├── data/
│   └── portal.db               # SQLite database (Jobs, Applications, DSA progress, Quiz attempts)
└── static/
    ├── index.html              # Main responsive web application
    ├── css/
    │   └── styles.css          # Theme system, responsive layout, glassmorphic UI
    └── js/
        ├── app.js              # Main application orchestrator & theme manager
        ├── jobs.js             # Job portal logic, filtering & application submissions
        ├── dsa.js              # DSA sheet, progress tracking & solution modal
        ├── prep.js             # Aptitude, Technical CS, HR STAR method & Quiz engine
        ├── companies.js        # Company hiring processes, syllabus & eligibility checker
        └── data/
            ├── dsaData.js      # Topic-wise DSA problems with multi-language code
            ├── companiesData.js# 16 Company hiring guides, exam patterns & syllabi
            ├── prepData.js     # Aptitude formulas, CS notes, HR Q&As & Quiz bank
            └── jobsData.js     # Initial job listings and fallback data
```

---

## 🛡️ License
Open-Source & Free for all students and engineering job seekers.
