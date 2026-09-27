// Companies Hiring Process, Exam Pattern, Syllabus & Eligibility Database

const COMPANIES_DATA = [
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    category: "Service / IT Giant",
    roles: [
      { title: "TCS Prime", ctc: "₹9.0 - 9.2 LPA", desc: "Top tier tech role working on AI, Cloud, Microservices, and Architecture" },
      { title: "TCS Digital", ctc: "₹7.0 - 7.5 LPA", desc: "Digital technologies, modern full-stack web, IoT, and data engineering" },
      { title: "TCS Ninja", ctc: "₹3.36 - 3.6 LPA", desc: "Foundational software engineering, development, and application maintenance" }
    ],
    examPlatform: "TCS iON",
    examDuration: "165 Minutes (Foundation + Advanced)",
    negativeMarking: "No negative marking",
    eligibility: {
      degree: "B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc",
      branches: "All Engineering Branches eligible",
      cutoff: "Minimum 60% or 6.0 CGPA throughout (10th, 12th, Diploma, Undergraduation)",
      backlogs: "Maximum 1 active backlog allowed at time of exam; all cleared before joining",
      gap: "Maximum 24 months academic gap permitted with valid justification"
    },
    examPattern: [
      { section: "Foundation - Numerical Ability", questions: 20, time: "25 mins", focus: "Percentages, P&L, Speed & Distance, Geometry, Algebra" },
      { section: "Foundation - Verbal Ability", questions: 25, time: "25 mins", focus: "Reading Comprehension, Error Spotting, Sentence Completion" },
      { section: "Foundation - Reasoning Ability", questions: 20, time: "25 mins", focus: "Data Sufficiency, Syllogisms, Seating Arrangement, Clocks" },
      { section: "Advanced - Quantitative Ability", questions: 10, time: "15 mins", focus: "Higher Math, Statistics, Advanced Geometry, Permutations" },
      { section: "Advanced - Reasoning Ability", questions: 10, time: "15 mins", focus: "Puzzles, Input-Output machines, Critical logical reasoning" },
      { section: "Hands-on Coding (2 Questions)", questions: 2, time: "60 mins", focus: "Q1 Easy-Medium (Arrays/Strings), Q2 Medium-Hard (DP/Graphs/Math)" }
    ],
    syllabus: {
      aptitude: ["Numbers & Divisibility", "Work & Time", "Speed & Distance", "Profit, Loss & Discount", "Permutations & Probability", "Data Interpretation"],
      reasoning: ["Blood Relations", "Directional Sense", "Statement & Assumptions", "Coding-Decoding", "Visual/Pattern Series"],
      coding: ["Arrays Manipulation & Hashing", "String Parsing & Anagrams", "Matrix Rotations", "Recursion & Backtracking", "Dynamic Programming Basics"],
      technical: ["OOP Concepts (Inheritance, Polymorphism)", "DBMS SQL queries & Normalization", "OS Process Lifecycle & Deadlocks", "Basic Networking"]
    },
    rounds: [
      { step: "Round 1: Online Assessment", desc: "TCS iON NQT test (Foundation + Advanced Cognitive & Coding)" },
      { step: "Round 2: Technical Interview", desc: "Deep dive into your project, DSA, SQL queries, language fundamentals (C/C++/Java/Python)" },
      { step: "Round 3: Managerial Interview", desc: "Situational questions, conflict management, team dynamics, adaptability" },
      { step: "Round 4: HR Interview", desc: "Background check, relocation willingness, shifts agreement, communication skills" }
    ],
    sampleQuestions: [
      "Find the count of pairs in an array having difference equal to K.",
      "Check if a matrix is a Toeplitz matrix.",
      "Explain the difference between Abstract Class and Interface in Java with code.",
      "Write a SQL query to find the 2nd highest salary from an Employee table without using LIMIT.",
      "What is normalisation and why do we prefer BCNF over 3NF?"
    ],
    tips: [
      "Aim for the Advanced Coding section! Passing both coding questions guarantees a Prime or Digital interview call.",
      "There is sectional timing in TCS iON; you cannot jump between sections once started.",
      "Be prepared with two well-documented academic projects for the Technical Interview."
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    category: "Service / IT Giant",
    roles: [
      { title: "Specialist Programmer (SP)", ctc: "₹9.5 - 11.5 LPA", desc: "Elite coding cadre focused on high-performance engineering & architectures" },
      { title: "Digital Specialist Engineer (DSE)", ctc: "₹6.25 - 6.5 LPA", desc: "Full-stack cloud application developers, DevOps, and microservices" },
      { title: "Systems Engineer (SE)", ctc: "₹3.6 - 4.0 LPA", desc: "Core software engineering, maintenance, and enterprise client software" }
    ],
    examPlatform: "Infosys Platform / HackerEarth",
    examDuration: "100 - 180 Minutes (depending on track)",
    negativeMarking: "No negative marking",
    eligibility: {
      degree: "B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc",
      branches: "All branches (CS/IT/ECE preferred for SP/DSE)",
      cutoff: "65% or 6.5 CGPA in 10th, 12th, and Undergrad",
      backlogs: "Zero active backlogs at time of evaluation",
      gap: "Max 1 year between 12th and college; no gap during graduation"
    },
    examPattern: [
      { section: "Mathematical Thinking", questions: 10, time: "35 mins", focus: "Cryptography, Number Series, Modular Arithmetic, Coordinate Geometry" },
      { section: "Critical Thinking", questions: 15, time: "25 mins", focus: "Puzzles, Syllogisms, Data Sufficiency, Logical Deductions" },
      { section: "Verbal Ability", questions: 20, time: "20 mins", focus: "Grammar, Reading comprehension, Vocabulary in context" },
      { section: "Pseudo Code / Technical MCQs", questions: 5, time: "10 mins", focus: "Output prediction, Time Complexity of nested loops, Recursion traces" },
      { section: "Coding (SP/DSE track / HackWithInfy)", questions: 3, time: "180 mins", focus: "1 Medium (Strings/Arrays), 1 Hard (Trees/Graphs), 1 Extreme (DP/Segment Trees)" }
    ],
    syllabus: {
      aptitude: ["Modular Math", "Permutations & Combinations", "Mixtures & Alligations", "Logarithms", "Probability"],
      reasoning: ["Floor Puzzles", "Family Trees", "Data Interpretation sets", "Coding by Shift"],
      coding: ["Greedy Algorithms", "Dynamic Programming on Trees/Grid", "Graph Shortest Path (Dijkstra)", "Trie & String Hashing"],
      technical: ["C++/Java syntax nuances", "Recursion stack depth", "Pointer arithmetic", "Relational Algebra"]
    },
    rounds: [
      { step: "Round 1: Online Assessment / HackWithInfy", desc: "Cognitive assessment or 3-problem competitive programming contest" },
      { step: "Round 2: Technical Interview", desc: "Detailed discussion on assessment code, DSA problems on whiteboard, OOP design" },
      { step: "Round 3: HR Interview", desc: "Why Infosys, willingness to relocate to Mysuru campus for training, shift flexibility" }
    ],
    sampleQuestions: [
      "Given an array, partition it into two subsets such that the absolute difference between their sums is minimized.",
      "Find the number of ways to color a graph with K colors.",
      "Explain the difference between Process and Thread; how does context switching happen?",
      "Design an LRU cache or explain its internal implementation."
    ],
    tips: [
      "Participating in HackWithInfy is the fastest route to grab the 9.5 LPA Specialist Programmer offer.",
      "The Infy cognitive test has very tricky mathematical thinking puzzles (e.g. cryptarithmetic); practice cryptarithmetic problems beforehand."
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    category: "Product / FAANG Giant",
    roles: [
      { title: "Software Development Engineer I (SDE-1)", ctc: "₹18 - 28 LPA", desc: "End-to-end design, implementation, and operations of scalable cloud applications" },
      { title: "SDE Intern (6 Months)", ctc: "₹80,000 - 1,10,000 / month", desc: "Hands-on real feature ownership with strong Pre-Placement Offer (PPO) conversion" }
    ],
    examPlatform: "HackerRank / Mettle",
    examDuration: "120 - 150 Minutes",
    negativeMarking: "No negative marking",
    eligibility: {
      degree: "B.Tech / B.E. / M.Tech / MCA",
      branches: "CS, IT, ECE, EEE, Math & Computing or related technical fields",
      cutoff: "6.5+ CGPA or 65% with no backlogs",
      backlogs: "No active backlogs allowed",
      gap: "Reasonable gaps allowed with valid explanation"
    },
    examPattern: [
      { section: "Coding Round", questions: 2, time: "70 mins", focus: "Medium-to-Hard DSA (Trees, Graphs, DP, Arrays, Hash Tables)" },
      { section: "Work Style Assessment", questions: 50, time: "20 mins", focus: "16 Amazon Leadership Principles alignment scenarios" },
      { section: "System Design & Technical MCQ (Occasionally)", questions: 10, time: "15 mins", focus: "OS, Multi-threading, Time complexity, DB indexing" }
    ],
    syllabus: {
      aptitude: ["Amazon does NOT ask traditional aptitude; focuses entirely on DSA & LP scenarios"],
      reasoning: ["Algorithmic logic, edge case handling, space/time trade-offs"],
      coding: ["Binary Trees & BSTs (LCA, Path Sum, Traversal)", "Graphs (BFS, DFS, Dijkstra)", "Heap/Priority Queue (Top K)", "Two Pointers & Sliding Window", "Interval Merging"],
      technical: ["Amazon 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action, Dive Deep)", "Object-Oriented Design (LLD)", "REST APIs & Scalability basics"]
    },
    rounds: [
      { step: "Round 1: Online Assessment (OA)", desc: "2 DSA Coding Problems + Work Style Assessment (LP questionnaire)" },
      { step: "Round 2: Technical Interview 1", desc: "Data Structures & Algorithms problem solving (whiteboarding + live code) + 1-2 LP questions" },
      { step: "Round 3: Technical Interview 2", desc: "Hard DSA problem + Low Level Design (OOP / Class diagrams) + LP scenarios" },
      { step: "Round 4: Bar Raiser Interview", desc: "Cross-functional Amazon Bar Raiser evaluating cultural bar, scale, and deep LP alignment" }
    ],
    sampleQuestions: [
      "Top K Frequent Elements in an streaming array.",
      "Word Break problem using Trie and Dynamic Programming.",
      "Design an Amazon Locker management system using OOP design principles.",
      "Tell me about a time you had a disagreement with your team member and how you resolved it (Leadership Principle: Disagree & Commit).",
      "Explain how a hash map resolves collisions and how resizing works internally."
    ],
    tips: [
      "Master the STAR method (Situation, Task, Action, Result) for all Amazon Leadership Principle questions. 50% of your interview score depends on LP!",
      "Always state brute-force first, discuss time/space complexities, write clean modular code, and dry-run with test cases before saying you are done."
    ]
  },
  {
    id: "google",
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    category: "Product / FAANG Giant",
    roles: [
      { title: "Software Engineer (L3)", ctc: "₹30 - 45 LPA", desc: "Engineering distributed systems, search indexers, Android, cloud infra, and ML models" },
      { title: "STEP Intern / SWE Intern", ctc: "₹1,20,000 - 1,50,000 / month", desc: "Prestigious mentorship, open-ended innovation projects, high PPO conversion" }
    ],
    examPlatform: "Google Interview Platform / HackerEarth",
    examDuration: "45 Minutes per Interview Round",
    negativeMarking: "N/A",
    eligibility: {
      degree: "B.Tech / M.Tech / Dual Degree / PhD",
      branches: "Computer Science, Mathematics, Electrical, or self-taught strong programmers",
      cutoff: "No rigid CGPA cutoff (7.0+ recommended), strong problem solving is paramount",
      backlogs: "No active backlogs at graduation",
      gap: "Gaps are acceptable if substantiated with skill acquisition"
    },
    examPattern: [
      { section: "Online Coding Challenge (if on-campus or referral)", questions: 2, time: "60 mins", focus: "Graph Algorithms, Advanced DP, Geometry, Combinatorics" },
      { section: "45-Min Technical Interview 1", questions: 1, time: "45 mins", focus: "Complex algorithmic problem with follow-ups" },
      { section: "45-Min Technical Interview 2", questions: 1, time: "45 mins", focus: "Data Structures & optimization under strict constraints" },
      { section: "45-Min Technical Interview 3", questions: 1, time: "45 mins", focus: "Graph traversal / Tree algorithms with scale constraints" },
      { section: "Googliness & Leadership", questions: 5, time: "45 mins", focus: "Navigating ambiguity, ethical dilemmas, teamwork, intellectual humility" }
    ],
    syllabus: {
      aptitude: ["Discrete Math", "Combinatorics", "Graph Theory", "Probability & Expectation"],
      reasoning: ["Mathematical proofs, invariant analysis, recursive thinking"],
      coding: ["Graph Algorithms (Topological Sort, Tarjan, SCC)", "Segment Trees / Fenwick Trees", "Dynamic Programming with Bitmasking", "Trie & Suffix Automaton", "Shortest Path & MST"],
      technical: ["Deep understanding of Big-O asymptotic limits", "System calls, concurrency, memory cache locality", "Clean, maintainable idiomatic code"]
    },
    rounds: [
      { step: "Round 1: Screening Assessment / Phone Screen", desc: "1-2 medium-hard algorithmic questions on Google Docs / CoderPad" },
      { step: "Round 2-4: Onsite / Virtual Onsite (3 Tech Rounds)", desc: "45-minute intense DSA rounds with high focus on edge cases and clean code" },
      { step: "Round 5: Googliness & Leadership", desc: "Assessing culture fit, empathy, handling failure, and collaborating in diversity" },
      { step: "Hiring Committee (HC) Review", desc: "Packets sent to independent committee for final offer decision" }
    ],
    sampleQuestions: [
      "Given a 2D matrix of words, find the longest snake path where adjacent cells differ by at most 1 in ASCII value.",
      "Design an algorithm to find the median of a continuous stream of billions of numbers.",
      "Implement autocomplete search with ranking and character prefixes using Trie.",
      "Tell me about a time you worked on a project with vague requirements. How did you structure your work?"
    ],
    tips: [
      "Do NOT jump directly into coding. Spend the first 5-8 minutes clarifying assumptions, asking questions, and discussing approach.",
      "Google interviewers evaluate four pillars: General Cognitive Ability, Role-Related Knowledge, Leadership, and Googliness."
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    category: "Product / FAANG Giant",
    roles: [
      { title: "Software Engineer (Level 59/60)", ctc: "₹24 - 36 LPA", desc: "Build Azure cloud services, Teams, Office 365, Windows internals, and AI copilots" },
      { title: "SWE Intern", ctc: "₹90,000 - 1,25,000 / month", desc: "Summer internship with direct PPO opportunity" }
    ],
    examPlatform: "Codility / Mettle",
    examDuration: "90 - 100 Minutes",
    negativeMarking: "No negative marking",
    eligibility: {
      degree: "B.Tech / M.Tech / MS / MCA",
      branches: "CS, IT, Software, Electronics",
      cutoff: "7.0+ CGPA or 70% in graduation",
      backlogs: "No active backlogs allowed",
      gap: "Max 1 year allowed"
    },
    examPattern: [
      { section: "Codility Online Coding Test", questions: 3, time: "90 mins", focus: "Medium DSA (Arrays, Strings, LinkedList, Tree, Graphs)" },
      { section: "Technical Round 1", questions: 1, time: "45 mins", focus: "DSA whiteboard problem + debugging live" },
      { section: "Technical Round 2", questions: 2, time: "45 mins", focus: "System fundamentals (OS/Concurrency/DB) + DSA" },
      { section: "Technical + Managerial (AA Round)", questions: 1, time: "45 mins", focus: "As Appropriate (AA) bar raiser interview: Cultural alignment, career vision" }
    ],
    syllabus: {
      aptitude: ["Logical thinking, edge case detection"],
      reasoning: ["Algorithm design, recursive state modeling"],
      coding: ["Linked List manipulation (reversal, intersection, LRU)", "Binary Trees (traversals, serialization)", "Dynamic Programming (Knapsack, LCS)", "Bit manipulation"],
      technical: ["OS (Threads, Mutex, Semaphores, Memory virtualisation)", "DBMS (Transaction isolation levels, Index structures)", "Cloud & Distributed architecture"]
    },
    rounds: [
      { step: "Round 1: Codility Coding Assessment", desc: "3 algorithmic coding tasks with strict runtime efficiency scoring" },
      { step: "Round 2: Technical Interview 1", desc: "Data structures, pointer arithmetic, boundary case handling" },
      { step: "Round 3: Technical Interview 2", desc: "Core computer science fundamentals (OS, DBMS, CN) and live coding" },
      { step: "Round 4: AA (As Appropriate) Round", desc: "Senior Principal/Partner Engineer interview evaluating mindset, growth, and team culture" }
    ],
    sampleQuestions: [
      "Clone a Linked List with Random Pointers in O(1) auxiliary space.",
      "Serialize and Deserialize a Binary Tree.",
      "Explain Deadlock: 4 necessary conditions and how Banker's algorithm prevents it.",
      "Design a scalable URL Shortener service (like TinyURL)."
    ],
    tips: [
      "Codility checks both correctness AND performance. O(N^2) solution will fail hidden scale test cases.",
      "Microsoft places heavy emphasis on CS core subjects: OS and Multi-threading questions are very common!"
    ]
  },
  {
    id: "accenture",
    name: "Accenture",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
    category: "Service / IT Giant",
    roles: [
      { title: "Advanced Application Engineering Analyst (AAEA)", ctc: "₹6.5 - 7.0 LPA", desc: "Advanced cloud architecture, modern full-stack development, and data pipelines" },
      { title: "Associate Software Engineer (ASE)", ctc: "₹4.5 - 4.6 LPA", desc: "Application development, enterprise cloud migration, quality engineering" }
    ],
    examPlatform: "Aon CoCubes",
    examDuration: "90 Minutes Cognitive + 45 Minutes Coding",
    negativeMarking: "No negative marking",
    eligibility: {
      degree: "B.E. / B.Tech / M.E. / M.Tech / MCA",
      branches: "All streams are eligible",
      cutoff: "Minimum 65% or 6.5 CGPA in graduation with no active backlogs",
      backlogs: "Zero active backlogs at time of selection",
      gap: "Maximum 1 year educational gap allowed"
    },
    examPattern: [
      { section: "Cognitive Assessment", questions: 50, time: "50 mins", focus: "English Ability, Critical Thinking, Abstract Reasoning" },
      { section: "Technical Assessment", questions: 40, time: "40 mins", focus: "Common Applications & MS Office, Pseudocode, Networking & Cloud basics" },
      { section: "Coding Assessment (Instant Elimination)", questions: 2, time: "45 mins", focus: "Q1 Easy Array/String, Q2 Medium Mathematical/Matrix" },
      { section: "Communication Assessment", questions: 60, time: "20 mins", focus: "Reading, Listening, Retelling stories, Impromptu speaking" }
    ],
    syllabus: {
      aptitude: ["Sentence Correction & Prepositions", "Arrangements & Syllogisms", "Visual Analogy", "Flowcharts"],
      reasoning: ["Coding-Decoding", "Symbol substitution", "Pattern recognition"],
      coding: ["Array sums and differences", "Binary string operations", "Divisibility rules", "String reversals and palindrome queries"],
      technical: ["Pseudocode execution traces", "MS Office shortcuts & cloud terminology", "Basic SQL and HTML"]
    },
    rounds: [
      { step: "Stage 1: Cognitive & Technical Assessment", desc: "Combined 90 questions; score determines if you unlock the Coding round immediately" },
      { step: "Stage 2: Coding Round", desc: "2 programming problems (C, C++, Java, Python, .NET)" },
      { step: "Stage 3: Communication Assessment", desc: "AI-based speech evaluation checking pronunciation, fluency, and sentence mastery" },
      { step: "Stage 4: Virtual Interview", desc: "Personal interview touching technical projects, scenario questions, and culture fit" }
    ],
    sampleQuestions: [
      "Perform bitwise operations (AND, OR, XOR) on binary string sequence.",
      "Calculate maximum sum of two elements such that product of elements is divisible by 3.",
      "Explain your final year college project architecture.",
      "Tell me about a time you had to adapt to a sudden change in plans."
    ],
    tips: [
      "The Pseudocode section is the biggest elimination hurdle in Accenture! Practice tracing loop variables and conditional branches accurately.",
      "Communication test requires a quiet room, clear headset microphone, and articulate pace."
    ]
  },
  {
    id: "wipro",
    name: "Wipro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Logo.svg",
    category: "Service / IT Giant",
    roles: [
      { title: "Wipro Turbo", ctc: "₹6.5 - 7.0 LPA", desc: "Specialist software developer working on cloud apps, cyber security, and automation" },
      { title: "Wipro Elite (NTH)", ctc: "₹3.5 - 3.8 LPA", desc: "Project engineer role across application support, automation, and enterprise solutions" }
    ],
    examPlatform: "AMCAT",
    examDuration: "128 Minutes",
    negativeMarking: "No negative marking",
    eligibility: {
      degree: "B.E. / B.Tech / M.E. / M.Tech / 5-Year Integrated-M.Tech",
      branches: "All branches except fashion, food, textile, agriculture",
      cutoff: "60% or 6.0 CGPA in 10th, 12th, and Undergrad",
      backlogs: "Max 1 active backlog permitted at test time; 0 backlogs at joining",
      gap: "Max 3 years gap permitted between 10th and graduation"
    },
    examPattern: [
      { section: "Quantitative Aptitude", questions: 16, time: "16 mins", focus: "Basic Math, LCM/HCF, Logarithms, Permutations" },
      { section: "Logical Reasoning", questions: 14, time: "14 mins", focus: "Deductive, Inductive reasoning, Coding Patterns" },
      { section: "Verbal English", questions: 22, time: "18 mins", focus: "Synonyms, Antonyms, Cloze passages, Error identification" },
      { section: "Written Communication (Essay)", questions: 1, time: "20 mins", focus: "200-400 words argumentative/reflective essay on contemporary topics" },
      { section: "Coding Round", questions: 2, time: "60 mins", focus: "1 Easy problem, 1 Medium problem (Arrays, Strings, Recursion)" }
    ],
    syllabus: {
      aptitude: ["Numbers & HCF/LCM", "Time & Work", "Profit and Loss", "Simple Interest & Compound Interest"],
      reasoning: ["Direction Sense", "Blood Relations", "Analogy", "Seating Plan"],
      coding: ["String manipulation", "Prime numbers and sieve", "Sorting and Searching", "Basic Matrix operations"],
      technical: ["C/C++/Java basic syntax", "Functions and scope", "Pointers and reference types"]
    },
    rounds: [
      { step: "Round 1: AMCAT Online Assessment", desc: "Aptitude + Essay Writing + 2 Coding Problems" },
      { step: "Round 2: Technical Interview", desc: "Basic programming, oops concepts, SQL basics, and college project discussion" },
      { step: "Round 3: HR Interview", desc: "Verification of documents, service agreement discussion, shift timings, relocation agreement" }
    ],
    sampleQuestions: [
      "Find whether a number is a neon number or strong number.",
      "Sort elements of an array by frequency.",
      "What are the ACID properties in database management?",
      "Essay Topic: Impact of Artificial Intelligence on Future Employment Opportunities."
    ],
    tips: [
      "Do NOT make grammar or spelling mistakes in the Essay Writing section! It is evaluated by an automated NLP scoring engine (AMCAT WriteX).",
      "Solve at least 1 coding question with 100% test cases to qualify for the interview round."
    ]
  },
  {
    id: "goldman-sachs",
    name: "Goldman Sachs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg",
    category: "FinTech / Investment Banking",
    roles: [
      { title: "New Analyst - Engineering", ctc: "₹24 - 30 LPA", desc: "Build ultra-low latency trading systems, high-throughput financial distributed ledgers, and quantitative risk engines" },
      { title: "Summer Analyst Intern", ctc: "₹1,00,000 / month", desc: "Intensive 2-month summer internship with high conversion rates" }
    ],
    examPlatform: "HackerRank",
    examDuration: "135 Minutes",
    negativeMarking: "Negative marking for MCQs (+5, -2)",
    eligibility: {
      degree: "B.Tech / B.E. / M.Tech / Dual Degree",
      branches: "All branches eligible (CS/IT/Circuital preferred)",
      cutoff: "7.0+ CGPA with no active backlogs",
      backlogs: "Zero active backlogs",
      gap: "Standard academic gaps allowed"
    },
    examPattern: [
      { section: "Numerical Computation (Math)", questions: 8, time: "25 mins", focus: "Probability, Permutations, Statistics, Combinatorics, Linear Algebra" },
      { section: "Programming (Coding)", questions: 2, time: "45 mins", focus: "1 Medium, 1 Hard (Dynamic Programming, Graph Shortest Path, Trees)" },
      { section: "Computer Science MCQs", questions: 7, time: "20 mins", focus: "OS, DBMS, CN, Data Structures" },
      { section: "Advanced Coding / Math Subjective", questions: 1, time: "45 mins", focus: "Complex algorithmic problem or math proof" }
    ],
    syllabus: {
      aptitude: ["Bayes Theorem & Conditional Probability", "Expectation & Variance", "Matrix determinants & Eigenvalues", "Number Theory"],
      reasoning: ["Analytical puzzles, game theory, minimax"],
      coding: ["Dynamic Programming (Coin change variations, Grid DP)", "Graphs (DFS, Cycle detection, Topological sort)", "Interval Scheduling", "Bit manipulations"],
      technical: ["Memory management, C++ virtual tables, Cache coherence", "Database normalization and Indexing internals", "TCP vs UDP tradeoffs for low-latency"]
    },
    rounds: [
      { step: "Round 1: HackerRank Assessment", desc: "Rigorous test testing Math + CS MCQs + 2-3 Coding questions with negative marking" },
      { step: "Round 2: Technical Interview 1", desc: "Data structures, algorithmic complexity optimization, and mathematical puzzles" },
      { step: "Round 3: Technical Interview 2", desc: "System architecture, multi-threading, concurrency locks, and database design" },
      { step: "Round 4: Technical Interview 3", desc: "Code quality, edge case handling, and core computer science deep dive" },
      { step: "Round 5: HR / Culture Fit", desc: "Passion for finance, integrity, resilience under pressure, and teamwork" }
    ],
    sampleQuestions: [
      "Find the length of the longest subarray with sum divisible by K.",
      "Calculate the probability of drawing 3 cards of the same suit given conditional constraints.",
      "Explain how memory allocation happens in C++ (stack vs heap) and what memory fragmentation is.",
      "How would you detect a deadlock in an operating system?"
    ],
    tips: [
      "Goldman Sachs places extremely high weightage on Probability, Combinatorics, and Discrete Mathematics!",
      "Beware of negative marking in the HackerRank assessment; do not guess MCQs randomly."
    ]
  }
];

if (typeof module !== 'undefined') {
  module.exports = { COMPANIES_DATA };
}
