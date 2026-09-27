"""
Job Portal & Prep Platform - Backend Server
Powered by Python & Flask with SQLite Database
"""

import os
import json
import sqlite3
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

APP_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(APP_DIR, 'static')
DB_PATH = os.path.join(APP_DIR, 'data', 'portal.db')

app = Flask(__name__, static_folder=STATIC_DIR)
CORS(app)


def get_db_connection():
    os.makedirs(os.path.join(APP_DIR, 'data'), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Jobs Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        logo TEXT,
        location TEXT NOT NULL,
        type TEXT NOT NULL, -- Full-time, Internship, Contract, Remote
        experience TEXT NOT NULL, -- Freshers, 0-1 yrs, 1-3 yrs, 3+ yrs
        salary TEXT NOT NULL,
        category TEXT NOT NULL, -- SDE, Frontend, Backend, Data Science, DevOps
        tags TEXT, -- JSON array of tags
        description TEXT NOT NULL,
        requirements TEXT, -- JSON array of bullets
        eligibility TEXT,
        apply_url TEXT,
        deadline TEXT,
        posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Applications Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_id INTEGER,
        applicant_name TEXT NOT NULL,
        applicant_email TEXT NOT NULL,
        applicant_phone TEXT,
        experience_level TEXT,
        resume_link TEXT,
        cover_note TEXT,
        status TEXT DEFAULT 'Under Review', -- Applied, Under Review, Shortlisted, Interview Scheduled, Rejected, Offered
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES jobs (id)
    )
    ''')

    # DSA User Progress Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS dsa_progress (
        problem_id TEXT PRIMARY KEY,
        status TEXT DEFAULT 'unsolved', -- solved, revision, unsolved
        is_bookmarked INTEGER DEFAULT 0,
        user_notes TEXT,
        user_code TEXT,
        completed_at TIMESTAMP
    )
    ''')

    # Quiz Attempts Table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS quiz_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        percentage REAL NOT NULL,
        time_taken_seconds INTEGER,
        attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Users Table (Google Sign-In & Detailed Candidate Profile)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        avatar TEXT,
        mobile TEXT,
        higher_qualification TEXT,
        college TEXT,
        branch TEXT,
        passing_year TEXT,
        cgpa TEXT,
        linkedin_profile TEXT,
        github_profile TEXT,
        cv_link TEXT,
        cv_name TEXT,
        is_pro INTEGER DEFAULT 0,
        pro_plan TEXT,
        pro_expiry TEXT,
        profile_completed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    conn.commit()
    conn.close()


# Static file serving
@app.route('/')
def index():
    return send_from_directory(STATIC_DIR, 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(STATIC_DIR, path)):
        return send_from_directory(STATIC_DIR, path)
    return send_from_directory(STATIC_DIR, 'index.html')


# ==========================================
# AUTH & USER PROFILE API
# ==========================================
@app.route('/api/auth/google', methods=['POST'])
def google_auth():
    data = request.json or {}
    email = data.get('email', '').strip().lower()
    full_name = data.get('name', 'Jobwala User').strip()
    avatar = data.get('avatar', f"https://ui-avatars.com/api/?name={full_name}&background=3b82f6&color=fff")

    if not email:
        return jsonify({"success": False, "error": "Email is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if not user:
        cursor.execute('''
        INSERT INTO users (email, full_name, avatar, profile_completed)
        VALUES (?, ?, ?, 0)
        ''', (email, full_name, avatar))
        conn.commit()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()

    user_dict = dict(user)
    conn.close()

    return jsonify({
        "success": True,
        "message": "Authenticated successfully with Google",
        "user": user_dict
    })


@app.route('/api/profile', methods=['GET'])
def get_profile():
    email = request.args.get('email', '').strip().lower()
    if not email:
        return jsonify({"success": False, "error": "Email required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if not user:
        return jsonify({"success": False, "error": "User not found"}), 404

    return jsonify({"success": True, "user": dict(user)})


@app.route('/api/profile', methods=['PUT', 'POST'])
def update_profile():
    data = request.json or {}
    email = data.get('email', '').strip().lower()
    if not email:
        return jsonify({"success": False, "error": "Email required"}), 400

    full_name = data.get('full_name', '').strip()
    mobile = data.get('mobile', '').strip()
    higher_qualification = data.get('higher_qualification', '').strip()
    college = data.get('college', '').strip()
    branch = data.get('branch', '').strip()
    passing_year = data.get('passing_year', '').strip()
    cgpa = data.get('cgpa', '').strip()
    linkedin_profile = data.get('linkedin_profile', '').strip()
    github_profile = data.get('github_profile', '').strip()
    cv_link = data.get('cv_link', '').strip()
    cv_name = data.get('cv_name', 'Resume.pdf').strip()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    UPDATE users SET
        full_name = COALESCE(NULLIF(?, ''), full_name),
        mobile = ?,
        higher_qualification = ?,
        college = ?,
        branch = ?,
        passing_year = ?,
        cgpa = ?,
        linkedin_profile = ?,
        github_profile = ?,
        cv_link = ?,
        cv_name = ?,
        profile_completed = 1
    WHERE email = ?
    ''', (full_name, mobile, higher_qualification, college, branch, passing_year, cgpa,
          linkedin_profile, github_profile, cv_link, cv_name, email))

    conn.commit()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    updated_user = cursor.fetchone()
    conn.close()

    if not updated_user:
        return jsonify({"success": False, "error": "User not found"}), 404

    return jsonify({
        "success": True,
        "message": "Profile updated successfully!",
        "user": dict(updated_user)
    })


@app.route('/api/subscribe', methods=['POST'])
def subscribe_pro():
    data = request.json or {}
    email = data.get('email', '').strip().lower()
    plan = data.get('plan', 'Pro Monthly')

    if not email:
        return jsonify({"success": False, "error": "Email required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    UPDATE users SET
        is_pro = 1,
        pro_plan = ?,
        pro_expiry = datetime('now', '+30 days')
    WHERE email = ?
    ''', (plan, email))

    conn.commit()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    return jsonify({
        "success": True,
        "message": f"Congratulations! Upgraded to {plan}!",
        "user": dict(user) if user else None
    })


# ==========================================
# JOBS API
# ==========================================
@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    search = request.args.get('search', '').strip().lower()
    job_type = request.args.get('type', '').strip()
    category = request.args.get('category', '').strip()
    experience = request.args.get('experience', '').strip()
    location = request.args.get('location', '').strip().lower()

    conn = get_db_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM jobs WHERE 1=1"
    params = []

    if search:
        query += " AND (LOWER(title) LIKE ? OR LOWER(company) LIKE ? OR LOWER(description) LIKE ?)"
        term = f"%{search}%"
        params.extend([term, term, term])

    if job_type and job_type != 'All':
        query += " AND type = ?"
        params.append(job_type)

    if category and category != 'All':
        query += " AND category = ?"
        params.append(category)

    if experience and experience != 'All':
        query += " AND experience = ?"
        params.append(experience)

    if location and location != 'all':
        query += " AND LOWER(location) LIKE ?"
        params.append(f"%{location}%")

    query += " ORDER BY id DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()

    jobs = []
    for r in rows:
        item = dict(r)
        try:
            item['tags'] = json.loads(item['tags']) if item['tags'] else []
        except Exception:
            item['tags'] = []
        try:
            item['requirements'] = json.loads(item['requirements']) if item['requirements'] else []
        except Exception:
            item['requirements'] = []
        jobs.append(item)

    return jsonify({"success": True, "count": len(jobs), "jobs": jobs})


@app.route('/api/jobs/<int:job_id>', methods=['GET'])
def get_job(job_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM jobs WHERE id = ?", (job_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({"success": False, "error": "Job not found"}), 404

    item = dict(row)
    item['tags'] = json.loads(item['tags']) if item['tags'] else []
    item['requirements'] = json.loads(item['requirements']) if item['requirements'] else []
    return jsonify({"success": True, "job": item})


@app.route('/api/jobs', methods=['POST'])
def create_job():
    data = request.json or {}
    title = data.get('title')
    company = data.get('company')
    location = data.get('location', 'Remote')
    job_type = data.get('type', 'Full-time')
    experience = data.get('experience', 'Freshers')
    salary = data.get('salary', 'Best in Industry')
    category = data.get('category', 'SDE')
    description = data.get('description', '')
    tags = json.dumps(data.get('tags', []))
    requirements = json.dumps(data.get('requirements', []))
    eligibility = data.get('eligibility', 'B.Tech/BE/MCA in CS/IT or related field')
    apply_url = data.get('apply_url', '')
    deadline = data.get('deadline', 'Open Until Filled')
    logo = data.get('logo', f"https://ui-avatars.com/api/?name={company}&background=0D8ABC&color=fff")

    if not title or not company or not description:
        return jsonify({"success": False, "error": "Title, company, and description are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO jobs (title, company, logo, location, type, experience, salary, category, tags, description, requirements, eligibility, apply_url, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (title, company, logo, location, job_type, experience, salary, category, tags, description, requirements, eligibility, apply_url, deadline))
    job_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Job posted successfully!", "job_id": job_id}), 201


# ==========================================
# APPLICATIONS API
# ==========================================
@app.route('/api/applications', methods=['GET'])
def get_applications():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    SELECT a.*, j.title as job_title, j.company as job_company, j.location as job_location
    FROM applications a
    LEFT JOIN jobs j ON a.job_id = j.id
    ORDER BY a.applied_at DESC
    ''')
    rows = cursor.fetchall()
    conn.close()

    apps = [dict(r) for r in rows]
    return jsonify({"success": True, "count": len(apps), "applications": apps})


@app.route('/api/applications', methods=['POST'])
def submit_application():
    data = request.json or {}
    job_id = data.get('job_id')
    name = data.get('applicant_name')
    email = data.get('applicant_email')
    phone = data.get('applicant_phone', '')
    experience = data.get('experience_level', 'Freshers')
    resume_link = data.get('resume_link', '')
    cover_note = data.get('cover_note', '')

    if not name or not email or not job_id:
        return jsonify({"success": False, "error": "Name, email, and job ID are required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO applications (job_id, applicant_name, applicant_email, applicant_phone, experience_level, resume_link, cover_note, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'Under Review')
    ''', (job_id, name, email, phone, experience, resume_link, cover_note))
    app_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Application submitted successfully!", "application_id": app_id}), 201


@app.route('/api/applications/<int:app_id>/status', methods=['PATCH'])
def update_application_status(app_id):
    data = request.json or {}
    status = data.get('status')
    if not status:
        return jsonify({"success": False, "error": "Status required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE applications SET status = ? WHERE id = ?", (status, app_id))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Status updated successfully"})


# ==========================================
# DSA PROGRESS & NOTES API
# ==========================================
@app.route('/api/dsa/progress', methods=['GET'])
def get_dsa_progress():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM dsa_progress")
    rows = cursor.fetchall()
    conn.close()

    progress = {r['problem_id']: dict(r) for r in rows}
    return jsonify({"success": True, "progress": progress})


@app.route('/api/dsa/progress/<problem_id>', methods=['POST', 'PUT'])
def update_dsa_progress(problem_id):
    data = request.json or {}
    status = data.get('status', 'unsolved')
    is_bookmarked = 1 if data.get('is_bookmarked') else 0
    user_notes = data.get('user_notes')
    user_code = data.get('user_code')
    completed_at = datetime.now().isoformat() if status == 'solved' else None

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT problem_id, user_notes, user_code FROM dsa_progress WHERE problem_id = ?", (problem_id,))
    existing = cursor.fetchone()

    if existing:
        final_notes = user_notes if user_notes is not None else existing['user_notes']
        final_code = user_code if user_code is not None else existing['user_code']
        cursor.execute('''
        UPDATE dsa_progress 
        SET status = ?, is_bookmarked = ?, user_notes = ?, user_code = ?, completed_at = COALESCE(?, completed_at)
        WHERE problem_id = ?
        ''', (status, is_bookmarked, final_notes, final_code, completed_at, problem_id))
    else:
        cursor.execute('''
        INSERT INTO dsa_progress (problem_id, status, is_bookmarked, user_notes, user_code, completed_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', (problem_id, status, is_bookmarked, user_notes or '', user_code or '', completed_at))

    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "DSA progress updated"})


# ==========================================
# QUIZ ATTEMPTS API
# ==========================================
@app.route('/api/quiz/attempt', methods=['POST'])
def record_quiz_attempt():
    data = request.json or {}
    category = data.get('category', 'General')
    score = data.get('score', 0)
    total = data.get('total_questions', 10)
    time_taken = data.get('time_taken_seconds', 0)
    percentage = round((score / total) * 100, 1) if total > 0 else 0

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO quiz_attempts (category, score, total_questions, percentage, time_taken_seconds)
    VALUES (?, ?, ?, ?, ?)
    ''', (category, score, total, percentage, time_taken))
    attempt_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Quiz attempt recorded", "attempt_id": attempt_id})


@app.route('/api/quiz/history', methods=['GET'])
def get_quiz_history():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM quiz_attempts ORDER BY attempted_at DESC LIMIT 20")
    rows = cursor.fetchall()
    conn.close()

    return jsonify({"success": True, "history": [dict(r) for r in rows]})


# ==========================================
# OVERALL PLATFORM STATS API
# ==========================================
@app.route('/api/stats', methods=['GET'])
def get_platform_stats():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM jobs")
    total_jobs = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM applications")
    total_applications = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM dsa_progress WHERE status = 'solved'")
    solved_dsa = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM dsa_progress WHERE is_bookmarked = 1")
    bookmarked_dsa = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*), AVG(percentage) FROM quiz_attempts")
    quiz_stats = cursor.fetchone()
    total_quizzes = quiz_stats[0] or 0
    avg_score = round(quiz_stats[1] or 0, 1)

    conn.close()

    return jsonify({
        "success": True,
        "stats": {
            "total_jobs": total_jobs,
            "total_applications": total_applications,
            "solved_dsa": solved_dsa,
            "bookmarked_dsa": bookmarked_dsa,
            "total_quizzes": total_quizzes,
            "avg_quiz_score": avg_score
        }
    })


# ==========================================
# SEED INITIAL DATA
# ==========================================
def seed_jobs_if_empty():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM jobs")
    count = cursor.fetchone()[0]

    if count == 0:
        sample_jobs = [
            (
                "Software Development Engineer I (SDE-1)",
                "Google",
                "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                "Bengaluru / Hyderabad (Hybrid)",
                "Full-time",
                "Freshers - 1 yr",
                "₹24 - 32 LPA",
                "SDE",
                json.dumps(["DSA", "Algorithms", "C++", "Java", "Python", "System Design"]),
                "Google is looking for passionate Software Engineers to develop next-generation technologies that change how millions of users interact with computing. You will work on massive-scale distributed systems, machine learning pipelines, and cloud services.",
                json.dumps([
                    "B.Tech/B.E. or MCA in Computer Science or equivalent practical experience",
                    "Strong foundation in Data Structures, Algorithms, and Complexity Analysis",
                    "Proficiency in one or more languages: C++, Java, Python, or Go",
                    "Familiarity with Object-Oriented Design and distributed systems fundamentals",
                    "Minimum 7.0 CGPA with no active backlogs"
                ]),
                "2024 / 2025 / 2026 Batch Graduates, 70% or 7.0+ CGPA",
                "https://careers.google.com",
                "2026-11-30"
            ),
            (
                "Software Engineer - Cloud & AI Platform",
                "Microsoft",
                "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
                "Hyderabad / Noida / Bengaluru",
                "Full-time",
                "0 - 2 yrs",
                "₹18 - 26 LPA",
                "Backend",
                json.dumps(["Azure", "C#", ".NET", "Cloud", "Distributed Systems", "REST API"]),
                "Join Microsoft Azure Core Engineering. Build high-availability cloud platforms that power enterprises worldwide. Collaborate with global teams on microservices, automated scaling, and security.",
                json.dumps([
                    "Solid knowledge of computer science fundamentals and data structures",
                    "Strong problem-solving and debugging skills",
                    "Experience with cloud services or containerization (Docker, Kubernetes) is a plus",
                    "Excellent collaboration and verbal/written communication skills"
                ]),
                "B.Tech / M.Tech in CS/IT/ECE with 7.5+ CGPA",
                "https://careers.microsoft.com",
                "2026-10-15"
            ),
            (
                "Associate Software Engineer",
                "Amazon",
                "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
                "Bengaluru / Chennai / Hyderabad",
                "Full-time",
                "Freshers",
                "₹16 - 22 LPA",
                "SDE",
                json.dumps(["Java", "AWS", "Microservices", "Data Structures", "OOP"]),
                "Amazon is seeking innovative Software Engineers to deliver solutions for Amazon Retail and AWS. You will own end-to-end features, optimize latency, and design scalable architectures following Amazon Leadership Principles.",
                json.dumps([
                    "Bachelor's degree in Computer Science, Engineering or related technical field",
                    "Deep understanding of OOPs, multi-threading, concurrency, and databases",
                    "Demonstrated ability to write clean, maintainable, production-ready code",
                    "Ability to thrive in an agile, customer-centric fast-paced environment"
                ]),
                "All B.Tech/BE branches with 6.5+ CGPA, 2024-2026 batches",
                "https://amazon.jobs",
                "2026-10-25"
            ),
            (
                "Digital Innovator / Prime Cadre (TCS NQT)",
                "Tata Consultancy Services (TCS)",
                "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
                "Pan India (Multiple Locations)",
                "Full-time",
                "Freshers",
                "₹7.0 - 9.2 LPA",
                "SDE",
                json.dumps(["TCS NQT", "Prime", "Python", "Fullstack", "Cloud", "GenAI"]),
                "TCS is inviting applications for the Prime and Digital cadres via TCS National Qualifier Test (NQT). Candidates will work on cutting-edge Digital Transformation projects, AI integration, and core banking platforms.",
                json.dumps([
                    "Top percentile in TCS NQT Advanced Section (Coding + Cognitive)",
                    "Knowledge of Modern Web Frameworks (React/Angular) or Cloud/DevOps",
                    "Strong verbal aptitude and logical reasoning",
                    "Highest consistency in 10th, 12th, and Graduation (60%+ throughout)"
                ]),
                "60% throughout in 10th, 12th, and Undergrad; Max 1 active backlog",
                "https://nextstep.tcs.com",
                "2026-10-20"
            ),
            (
                "Specialist Programmer (Power Programmer)",
                "Infosys",
                "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
                "Bengaluru / Mysuru / Pune",
                "Full-time",
                "Freshers",
                "₹9.5 - 11.5 LPA",
                "SDE",
                json.dumps(["Competitive Programming", "InfyTQ", "HackWithInfy", "Java", "DSA"]),
                "Specialist Programmer role at Infosys is designed for exceptional coders and problem-solvers. You will be placed directly in high-impact R&D teams and open-source architecture pods.",
                json.dumps([
                    "Qualification through HackWithInfy or Top Tier InfyTQ score",
                    "Mastery in Dynamic Programming, Graphs, and Advanced Algorithms",
                    "Ability to design robust system components with clean code",
                    "Passion for learning emerging technologies like AI/ML and Blockchain"
                ]),
                "BE/B.Tech/ME/M.Tech with 65%+ or 6.5+ CGPA",
                "https://infy.com/careers",
                "2026-11-05"
            ),
            (
                "Frontend Engineer - UI/UX & Web Performance",
                "Flipkart",
                "https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg",
                "Bengaluru (Hybrid)",
                "Full-time",
                "1 - 3 yrs",
                "₹16 - 24 LPA",
                "Frontend",
                json.dumps(["React", "JavaScript", "TypeScript", "Next.js", "Web Vitals", "CSS3"]),
                "Flipkart is looking for an enthusiastic Frontend Engineer to craft smooth, accessible, and high-performance web experiences for over 300 million Indian shoppers across desktop and mobile browsers.",
                json.dumps([
                    "Deep mastery of JavaScript (ES6+), React.js, and browser internals",
                    "Experience with State Management (Redux/Zustand), Responsive UI, and Webpack/Vite",
                    "Understanding of Core Web Vitals, SSR, and web performance optimization",
                    "Hands-on experience with modern CSS, Tailwind, or styled-components"
                ]),
                "B.Tech/BE/BCA/MCA with proven personal portfolio / live projects",
                "https://flipkartcareers.com",
                "2026-10-31"
            ),
            (
                "Graduate Analyst - Technology Division",
                "Goldman Sachs",
                "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg",
                "Bengaluru / Hyderabad",
                "Full-time",
                "Freshers",
                "₹22 - 28 LPA",
                "SDE",
                json.dumps(["FinTech", "Quantitative", "C++", "Java", "Data Structures", "Algorithms"]),
                "Work at the intersection of Finance and Cutting-edge Computing. Build ultra-low latency trading systems, risk engines, and financial cloud infrastructure using state-of-the-art algorithms.",
                json.dumps([
                    "Strong quantitative aptitude, discrete mathematics, and algorithmic problem solving",
                    "Expertise in C++ or Java with memory management and concurrency",
                    "Keen interest in financial markets, distributed databases, and high-throughput systems",
                    "Consistent academic track record"
                ]),
                "Engineering graduates with 7.0+ CGPA",
                "https://goldmansachs.com/careers",
                "2026-11-15"
            ),
            (
                "Full Stack Web Developer Intern",
                "Razorpay",
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
                "Bengaluru / Remote",
                "Internship",
                "Freshers / College Students",
                "₹45,000 / month Stipend (PPO: 16 LPA)",
                "Fullstack",
                json.dumps(["Node.js", "React", "REST API", "PostgreSQL", "FinTech"]),
                "Build payment gateways and checkout experiences powering millions of transactions across India. Excellent mentorship, high-ownership environment, and high probability of Pre-Placement Offer (PPO).",
                json.dumps([
                    "Proficiency with Node.js/Express, Python, or Go for backend APIs",
                    "Hands-on experience building web apps with React or Vue",
                    "Familiarity with SQL databases (PostgreSQL/MySQL) and RESTful API design",
                    "Git workflow, CI/CD knowledge is a plus"
                ]),
                "Pre-final & Final year students (2025/2026 batch)",
                "https://razorpay.com/jobs",
                "2026-10-18"
            ),
            (
                "DevOps & Site Reliability Engineer",
                "Swiggy",
                "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg",
                "Bengaluru",
                "Full-time",
                "1 - 3 yrs",
                "₹14 - 20 LPA",
                "DevOps",
                json.dumps(["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD", "Prometheus"]),
                "Maintain 99.99% reliability during peak dinner and match surges! Automate cloud infrastructure, optimize Kubernetes clusters, and build self-healing observability pipelines.",
                json.dumps([
                    "Experience managing Linux environments and container orchestrators (K8s)",
                    "Infrastructure as Code using Terraform or CloudFormation",
                    "Monitoring and telemetry using Prometheus, Grafana, ELK stack",
                    "Scripting in Python, Bash, or Go"
                ]),
                "B.Tech/BE in CS/IT/ECE",
                "https://careers.swiggy.com",
                "2026-11-10"
            ),
            (
                "Associate Software Engineer (ASE)",
                "Accenture",
                "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
                "Pan India",
                "Full-time",
                "Freshers",
                "₹4.5 - 6.5 LPA",
                "SDE",
                json.dumps(["Accenture Assessment", "Cognitive", "Pseudo Code", "Java", "Python"]),
                "Launch your technology career with Accenture. As an Associate Software Engineer, you will be trained on cloud, full-stack technologies, enterprise applications, and test automation.",
                json.dumps([
                    "B.E./B.Tech/MCA/M.Sc (CS/IT) graduates",
                    "No active backlogs at the time of joining",
                    "Good analytical and problem-solving skills",
                    "Basic coding proficiency in any mainstream language"
                ]),
                "65% or 6.5 CGPA in graduation with no backlogs",
                "https://accenture.com/careers",
                "2026-10-28"
            )
        ]

        for j in sample_jobs:
            cursor.execute('''
            INSERT INTO jobs (title, company, logo, location, type, experience, salary, category, tags, description, requirements, eligibility, apply_url, deadline)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', j)

        conn.commit()

    conn.close()


if __name__ == '__main__':
    init_db()
    seed_jobs_if_empty()
    print("=" * 60)
    print(" Job Portal & Prep Website Server Running!")
    print(" Open your browser at: http://localhost:5000")
    print("=" * 60)
    app.run(host='0.0.0.0', port=5000, debug=True)
