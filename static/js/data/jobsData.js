// Fallback & Initial Jobs Dataset for Offline & Direct View Support

const INITIAL_JOBS = [
  {
    id: 1,
    title: "Software Development Engineer I (SDE-1)",
    company: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    location: "Bengaluru / Hyderabad (Hybrid)",
    type: "Full-time",
    experience: "Freshers - 1 yr",
    salary: "₹24 - 32 LPA",
    category: "SDE",
    tags: ["DSA", "Algorithms", "C++", "Java", "Python", "System Design"],
    description: "Google is looking for passionate Software Engineers to develop next-generation technologies that change how millions of users interact with computing. You will work on massive-scale distributed systems, machine learning pipelines, and cloud services.",
    requirements: [
      "B.Tech/B.E. or MCA in Computer Science or equivalent practical experience",
      "Strong foundation in Data Structures, Algorithms, and Complexity Analysis",
      "Proficiency in one or more languages: C++, Java, Python, or Go",
      "Familiarity with Object-Oriented Design and distributed systems fundamentals",
      "Minimum 7.0 CGPA with no active backlogs"
    ],
    eligibility: "2024 / 2025 / 2026 Batch Graduates, 70% or 7.0+ CGPA",
    apply_url: "https://careers.google.com",
    deadline: "2026-11-30"
  },
  {
    id: 2,
    title: "Software Engineer - Cloud & AI Platform",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    location: "Hyderabad / Noida / Bengaluru",
    type: "Full-time",
    experience: "0 - 2 yrs",
    salary: "₹18 - 26 LPA",
    category: "Backend",
    tags: ["Azure", "C#", ".NET", "Cloud", "Distributed Systems", "REST API"],
    description: "Join Microsoft Azure Core Engineering. Build high-availability cloud platforms that power enterprises worldwide. Collaborate with global teams on microservices, automated scaling, and security.",
    requirements: [
      "Solid knowledge of computer science fundamentals and data structures",
      "Strong problem-solving and debugging skills",
      "Experience with cloud services or containerization (Docker, Kubernetes) is a plus",
      "Excellent collaboration and verbal/written communication skills"
    ],
    eligibility: "B.Tech / M.Tech in CS/IT/ECE with 7.5+ CGPA",
    apply_url: "https://careers.microsoft.com",
    deadline: "2026-10-15"
  },
  {
    id: 3,
    title: "Associate Software Engineer",
    company: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    location: "Bengaluru / Chennai / Hyderabad",
    type: "Full-time",
    experience: "Freshers",
    salary: "₹16 - 22 LPA",
    category: "SDE",
    tags: ["Java", "AWS", "Microservices", "Data Structures", "OOP"],
    description: "Amazon is seeking innovative Software Engineers to deliver solutions for Amazon Retail and AWS. You will own end-to-end features, optimize latency, and design scalable architectures following Amazon Leadership Principles.",
    requirements: [
      "Bachelor's degree in Computer Science, Engineering or related technical field",
      "Deep understanding of OOPs, multi-threading, concurrency, and databases",
      "Demonstrated ability to write clean, maintainable, production-ready code",
      "Ability to thrive in an agile, customer-centric fast-paced environment"
    ],
    eligibility: "All B.Tech/BE branches with 6.5+ CGPA, 2024-2026 batches",
    apply_url: "https://amazon.jobs",
    deadline: "2026-10-25"
  },
  {
    id: 4,
    title: "Digital Innovator / Prime Cadre (TCS NQT)",
    company: "Tata Consultancy Services (TCS)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    location: "Pan India (Multiple Locations)",
    type: "Full-time",
    experience: "Freshers",
    salary: "₹7.0 - 9.2 LPA",
    category: "SDE",
    tags: ["TCS NQT", "Prime", "Python", "Fullstack", "Cloud", "GenAI"],
    description: "TCS is inviting applications for the Prime and Digital cadres via TCS National Qualifier Test (NQT). Candidates will work on cutting-edge Digital Transformation projects, AI integration, and core banking platforms.",
    requirements: [
      "Top percentile in TCS NQT Advanced Section (Coding + Cognitive)",
      "Knowledge of Modern Web Frameworks (React/Angular) or Cloud/DevOps",
      "Strong verbal aptitude and logical reasoning",
      "Highest consistency in 10th, 12th, and Graduation (60%+ throughout)"
    ],
    eligibility: "60% throughout in 10th, 12th, and Undergrad; Max 1 active backlog",
    apply_url: "https://nextstep.tcs.com",
    deadline: "2026-10-20"
  },
  {
    id: 5,
    title: "Specialist Programmer (Power Programmer)",
    company: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    location: "Bengaluru / Mysuru / Pune",
    type: "Full-time",
    experience: "Freshers",
    salary: "₹9.5 - 11.5 LPA",
    category: "SDE",
    tags: ["Competitive Programming", "InfyTQ", "HackWithInfy", "Java", "DSA"],
    description: "Specialist Programmer role at Infosys is designed for exceptional coders and problem-solvers. You will be placed directly in high-impact R&D teams and open-source architecture pods.",
    requirements: [
      "Qualification through HackWithInfy or Top Tier InfyTQ score",
      "Mastery in Dynamic Programming, Graphs, and Advanced Algorithms",
      "Ability to design robust system components with clean code",
      "Passion for learning emerging technologies like AI/ML and Blockchain"
    ],
    eligibility: "BE/B.Tech/ME/M.Tech with 65%+ or 6.5+ CGPA",
    apply_url: "https://infy.com/careers",
    deadline: "2026-11-05"
  },
  {
    id: 6,
    title: "Frontend Engineer - UI/UX & Web Performance",
    company: "Flipkart",
    logo: "https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg",
    location: "Bengaluru (Hybrid)",
    type: "Full-time",
    experience: "1 - 3 yrs",
    salary: "₹16 - 24 LPA",
    category: "Frontend",
    tags: ["React", "JavaScript", "TypeScript", "Next.js", "Web Vitals", "CSS3"],
    description: "Flipkart is looking for an enthusiastic Frontend Engineer to craft smooth, accessible, and high-performance web experiences for over 300 million Indian shoppers across desktop and mobile browsers.",
    requirements: [
      "Deep mastery of JavaScript (ES6+), React.js, and browser internals",
      "Experience with State Management (Redux/Zustand), Responsive UI, and Webpack/Vite",
      "Understanding of Core Web Vitals, SSR, and web performance optimization",
      "Hands-on experience with modern CSS, Tailwind, or styled-components"
    ],
    eligibility: "B.Tech/BE/BCA/MCA with proven personal portfolio / live projects",
    apply_url: "https://flipkartcareers.com",
    deadline: "2026-10-31"
  },
  {
    id: 7,
    title: "Full Stack Web Developer Intern",
    company: "Razorpay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
    location: "Bengaluru / Remote",
    type: "Internship",
    experience: "Freshers / College Students",
    salary: "₹45,000 / month Stipend (PPO: 16 LPA)",
    category: "Fullstack",
    tags: ["Node.js", "React", "REST API", "PostgreSQL", "FinTech"],
    description: "Build payment gateways and checkout experiences powering millions of transactions across India. Excellent mentorship, high-ownership environment, and high probability of Pre-Placement Offer (PPO).",
    requirements: [
      "Proficiency with Node.js/Express, Python, or Go for backend APIs",
      "Hands-on experience building web apps with React or Vue",
      "Familiarity with SQL databases (PostgreSQL/MySQL) and RESTful API design",
      "Git workflow, CI/CD knowledge is a plus"
    ],
    eligibility: "Pre-final & Final year students (2025/2026 batch)",
    apply_url: "https://razorpay.com/jobs",
    deadline: "2026-10-18"
  },
  {
    id: 8,
    title: "Graduate Analyst - Technology Division",
    company: "Goldman Sachs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg",
    location: "Bengaluru / Hyderabad",
    type: "Full-time",
    experience: "Freshers",
    salary: "₹22 - 28 LPA",
    category: "SDE",
    tags: ["FinTech", "Quantitative", "C++", "Java", "Data Structures", "Algorithms"],
    description: "Work at the intersection of Finance and Cutting-edge Computing. Build ultra-low latency trading systems, risk engines, and financial cloud infrastructure using state-of-the-art algorithms.",
    requirements: [
      "Strong quantitative aptitude, discrete mathematics, and algorithmic problem solving",
      "Expertise in C++ or Java with memory management and concurrency",
      "Keen interest in financial markets, distributed databases, and high-throughput systems",
      "Consistent academic track record"
    ],
    eligibility: "Engineering graduates with 7.0+ CGPA",
    apply_url: "https://goldmansachs.com/careers",
    deadline: "2026-11-15"
  }
];

if (typeof module !== 'undefined') {
  module.exports = { INITIAL_JOBS };
}
