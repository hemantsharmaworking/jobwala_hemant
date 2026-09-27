// Preparation Hub Data: Aptitude, Technical (OS, DBMS, CN, OOPs), HR Interview & Quizzes

const PREP_DATA = {
  // ========================================================
  // APTITUDE MODULE
  // ========================================================
  aptitude: {
    topics: [
      {
        id: "quant-percentages",
        name: "Percentages & Profit-Loss",
        category: "Quantitative",
        formulas: [
          { name: "Percentage Increase/Decrease", formula: "[(Final Value - Initial Value) / Initial Value] × 100%" },
          { name: "Profit %", formula: "[(Selling Price - Cost Price) / Cost Price] × 100%" },
          { name: "Loss %", formula: "[(Cost Price - Selling Price) / Cost Price] × 100%" },
          { name: "Discount %", formula: "[(Marked Price - Selling Price) / Marked Price] × 100%" },
          { name: "Successive Percentage Change", formula: "Effective Change = [a + b + (ab / 100)]%" }
        ],
        notes: `
• When value increases by x% and then decreases by x%, there is always a net loss of (x/10)% squared = (x² / 100)%.
• If A is r% more than B, then B is [r / (100 + r)] × 100% less than A.
• If A is r% less than B, then B is [r / (100 - r)] × 100% more than A.
• Marked Price (MP) = CP × (100 + Markup%) / 100.
• Selling Price (SP) = MP × (100 - Discount%) / 100.
        `
      },
      {
        id: "quant-speed-time",
        name: "Time, Speed & Distance",
        category: "Quantitative",
        formulas: [
          { name: "Speed Formula", formula: "Speed = Distance / Time" },
          { name: "km/h to m/s conversion", formula: "Speed (m/s) = Speed (km/h) × (5 / 18)" },
          { name: "m/s to km/h conversion", formula: "Speed (km/h) = Speed (m/s) × (18 / 5)" },
          { name: "Average Speed (Equal Distances)", formula: "Avg Speed = (2 × u × v) / (u + v) where u and v are speeds" },
          { name: "Relative Speed (Opposite Direction)", formula: "Relative Speed = Speed₁ + Speed₂" },
          { name: "Relative Speed (Same Direction)", formula: "Relative Speed = |Speed₁ - Speed₂|" }
        ],
        notes: `
• Trains crossing a pole/person: Distance covered = Length of the train.
• Train crossing a platform/bridge: Distance covered = Length of train + Length of platform.
• Boats and Streams:
  - Downstream speed (with current) = Boat Speed + Stream Speed (u + v).
  - Upstream speed (against current) = Boat Speed - Stream Speed (u - v).
  - Speed of boat in still water = (Downstream + Upstream) / 2.
  - Speed of stream = (Downstream - Upstream) / 2.
        `
      },
      {
        id: "quant-time-work",
        name: "Time & Work / Pipes & Cisterns",
        category: "Quantitative",
        formulas: [
          { name: "Work Rate", formula: "If A can do a job in n days, A's 1 day work = 1 / n" },
          { name: "Combined Work (A and B)", formula: "Days taken together = (A × B) / (A + B)" },
          { name: "Man-Days Formula", formula: "(M₁ × D₁ × H₁) / W₁ = (M₂ × D₂ × H₂) / W₂" }
        ],
        notes: `
• Total Work concept: Assume total work = LCM of days taken by individuals. This converts fractional math to simple integers!
• Efficiency is inversely proportional to time taken. If Ratio of time is 2:3, Ratio of efficiency is 3:2.
• For pipes: Inlets do positive work (+ rate), Outlets/leaks do negative work (- rate).
        `
      },
      {
        id: "logical-reasoning",
        name: "Logical Reasoning & Deductions",
        category: "Logical",
        formulas: [
          { name: "Blood Relations", formula: "Male = (+), Female = (-), Married = (=), Siblings = (-), Parent-Child = (|)" },
          { name: "Clock Angle Formula", formula: "Angle = |(30 × H) - (11/2 × M)| degrees" },
          { name: "Seating Arrangement", formula: "Circular (Facing center): Right = Anti-Clockwise, Left = Clockwise" }
        ],
        notes: `
• Syllogisms: Use Venn diagram method. Check conclusions against all possible valid diagrams.
• Coding-Decoding: Check alphabet positions (A=1, Z=26) and reverse positions (EJOTY rule: 5, 10, 15, 20, 25).
• Direction Sense: Always draw standard compass (North up, East right, South down, West left). Turn 90° for standard left/right turns.
        `
      },
      {
        id: "verbal-ability",
        name: "Verbal Ability & Grammar Essentials",
        category: "Verbal",
        formulas: [
          { name: "Subject-Verb Agreement", formula: "Singular Subject → Singular Verb ('Either/Neither' + singular verb)" },
          { name: "Conditional Sentences", formula: "If + had + V3, then would have + V3" }
        ],
        notes: `
• 'Neither of', 'Either of', 'Each of', 'One of' are followed by a Plural Noun but a SINGULAR Verb. (e.g. "Each of the candidates is qualified").
• 'Scarcely / Hardly' is always followed by 'when', never 'than'.
• 'No sooner' is always followed by 'than'.
• Parallelism: Items in a list must be in the same grammatical format (e.g., "running, swimming, and biking").
        `
      }
    ],
    practiceProblems: [
      {
        id: "ap-1",
        category: "Quantitative",
        topic: "Percentages & Profit-Loss",
        question: "A merchant marks his goods 25% above the cost price and allows a discount of 10% on the marked price. What is his profit percentage?",
        options: ["12.5%", "15%", "10%", "17.5%"],
        answer: 0,
        explanation: "Let Cost Price (CP) = 100.\nMarked Price (MP) = 100 + 25 = 125.\nDiscount = 10% of 125 = 12.5.\nSelling Price (SP) = 125 - 12.5 = 112.5.\nProfit = SP - CP = 112.5 - 100 = 12.5%."
      },
      {
        id: "ap-2",
        category: "Quantitative",
        topic: "Time, Speed & Distance",
        question: "A train 180 meters long is travelling at 54 km/h. How many seconds will it take to pass a telegraph post?",
        options: ["10 seconds", "12 seconds", "15 seconds", "18 seconds"],
        answer: 1,
        explanation: "Speed in m/s = 54 × (5 / 18) = 15 m/s.\nDistance to cross post = Length of train = 180 m.\nTime = Distance / Speed = 180 / 15 = 12 seconds."
      },
      {
        id: "ap-3",
        category: "Quantitative",
        topic: "Time & Work",
        question: "A can complete a project in 12 days and B can complete it in 24 days. If they work together, in how many days will the project be completed?",
        options: ["6 days", "8 days", "9 days", "10 days"],
        answer: 1,
        explanation: "Formula: (A × B) / (A + B) = (12 × 24) / (12 + 24) = 288 / 36 = 8 days.\nAlternatively: Total work = LCM(12, 24) = 24 units.\nEfficiency of A = 2 units/day, B = 1 unit/day. Combined = 3 units/day.\nDays = 24 / 3 = 8 days."
      },
      {
        id: "ap-4",
        category: "Logical",
        topic: "Clock Angles",
        question: "What is the angle between the hour hand and minute hand at 3:30?",
        options: ["70°", "75°", "80°", "85°"],
        answer: 1,
        explanation: "Angle Formula: |(30 × H) - (11/2 × M)|\nAt 3:30: H = 3, M = 30.\nAngle = |(30 × 3) - (11/2 × 30)| = |90 - 165| = |-75| = 75°."
      },
      {
        id: "ap-5",
        category: "Verbal",
        topic: "Subject-Verb Agreement",
        question: "Choose the grammatically correct sentence:",
        options: [
          "Neither of the boys were present yesterday.",
          "Neither of the boys was present yesterday.",
          "Neither of the boys are present yesterday.",
          "Neither of the boy was present yesterday."
        ],
        answer: 1,
        explanation: "'Neither of' takes a plural noun ('boys') followed by a singular verb ('was'). Therefore, 'Neither of the boys was present yesterday' is correct."
      }
    ]
  },

  // ========================================================
  // TECHNICAL CORE SUBJECTS MODULE
  // ========================================================
  technical: {
    subjects: [
      {
        id: "os",
        name: "Operating Systems (OS)",
        icon: "fa-microchip",
        description: "Processes, Threads, CPU Scheduling, Deadlocks, Paging, Virtual Memory",
        notes: [
          {
            title: "Process vs Thread",
            content: `
• **Process**: An executing instance of a program. Has its own separate virtual address space, memory pages, file descriptors, and registers. Heavyweight context switching.
• **Thread**: Light-weight process (LWP). Entity within a process that can be scheduled for execution. All threads of a process share the same Code, Data, and Heap segment, but have their OWN Program Counter (PC), Register set, and Stack space.
• **Context Switch**: Saving the state of the currently running process/thread and loading the state of the next ready process/thread into CPU registers. Process context switch requires flushing the TLB (Translation Lookaside Buffer), which is expensive; thread context switch is faster because memory mappings remain identical.`
          },
          {
            title: "Deadlock: Conditions & Handling",
            content: `
• **Deadlock**: A situation where a set of processes are blocked because each process holds a resource and waits for another resource held by another process.
• **4 Coffman Necessary Conditions for Deadlock**:
  1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
  2. **Hold and Wait**: A process is holding at least one resource and waiting to acquire additional resources held by others.
  3. **No Preemption**: Resources cannot be preempted; they are released only voluntarily.
  4. **Circular Wait**: A closed chain of processes exists such that each holds a resource needed by the next.
• **Deadlock Prevention**: Invalidate at least one of the 4 Coffman conditions (e.g. impose total ordering on all resources to prevent Circular Wait).
• **Deadlock Avoidance**: Banker's Algorithm (checks if state is Safe before allocating resources).`
          },
          {
            title: "Virtual Memory & Paging",
            content: `
• **Paging**: Memory management scheme that eliminates the need for contiguous physical memory. The logical address space is divided into fixed-size blocks called **Pages**. Physical memory is divided into same-sized blocks called **Frames**.
• **Page Table**: Translates Logical Address (Page Number + Offset) to Physical Address (Frame Number + Offset).
• **Page Fault**: Occurs when a program accesses a page that is mapped in the virtual address space but not currently loaded into physical RAM. The OS halts the process, fetches the page from disk swap space into an empty physical frame, updates the Page Table, and restarts the instruction.
• **Thrashing**: Occurs when the system spends more time swapping pages in and out of secondary storage than executing instructions, caused by insufficient physical memory allocation.`
          }
        ],
        qa: [
          {
            q: "What is a Race Condition and how can it be prevented?",
            a: "A race condition occurs in concurrent programming when two or more threads attempt to read and write shared data at the same time, and the final outcome depends on the timing of thread scheduling. It is prevented using synchronization primitives such as Mutexes, Semaphores, Atomic Operations, or Monitors."
          },
          {
            q: "What is the difference between Mutex and Semaphore?",
            a: "A Mutex (Mutual Exclusion) is a locking mechanism with ownership: only the thread that acquired the mutex can release it. A Semaphore is a signaling mechanism: a counting integer variable that allows multiple threads (up to N) to access a resource concurrently; any thread can signal/post a semaphore."
          },
          {
            q: "Explain CPU Scheduling algorithms (FCFS, SJF, Round Robin).",
            a: "1. FCFS (First-Come First-Served): Simple, non-preemptive, suffers from the Convoy Effect (short jobs wait behind long jobs).\n2. SJF (Shortest Job First): Optimal average turnaround/waiting time, but impossible to know exact future burst times, risk of starvation.\n3. Round Robin (RR): Preemptive, each process gets a fixed CPU time quantum. Ideal for time-sharing systems; performance depends on optimal choice of quantum."
          }
        ]
      },
      {
        id: "dbms",
        name: "Database Management Systems (DBMS)",
        icon: "fa-database",
        description: "ACID Properties, Normalization (1NF-BCNF), Indexing, SQL Joins, Transactions",
        notes: [
          {
            title: "ACID Properties in Transactions",
            content: `
• **A - Atomicity**: "All or Nothing". All operations in a transaction must execute successfully; if any step fails, the entire transaction is rolled back to its initial state.
• **C - Consistency**: A transaction brings the database from one valid state to another valid state, preserving all integrity constraints, foreign keys, and rules.
• **I - Isolation**: Concurrent execution of transactions yields the same result as if they executed serially. Intermediate states are hidden from other transactions (Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable).
• **D - Durability**: Once a transaction is committed, its changes are permanently stored in non-volatile memory even in the event of a system crash (enforced via Write-Ahead Logging / WAL).`
          },
          {
            title: "Database Normalization (1NF to BCNF)",
            content: `
• **Purpose**: Minimize redundancy and prevent Insertion, Deletion, and Updation anomalies.
• **1NF (First Normal Form)**: Each column must contain atomic (indivisible) values, no repeating groups.
• **2NF (Second Normal Form)**: Must be in 1NF and eliminate Partial Dependency (every non-prime attribute must be fully functionally dependent on the entire Primary Key).
• **3NF (Third Normal Form)**: Must be in 2NF and eliminate Transitive Dependency (no non-prime attribute should depend on another non-prime attribute: if X → Y, then X is a Super Key or Y is a Prime Attribute).
• **BCNF (Boyce-Codd Normal Form)**: Stricter version of 3NF. For every non-trivial functional dependency X → Y, X MUST be a Super Key.`
          },
          {
            title: "Indexing Internals (B-Tree vs B+ Tree)",
            content: `
• **Indexing**: Data structure (usually B+ Tree) that accelerates record retrieval without scanning the entire table.
• **Clustered Index**: Determines the physical order of data on disk. Only ONE clustered index can exist per table (by default, Primary Key).
• **Non-Clustered Index**: Separate structure storing sorted index keys with pointers (Row IDs) pointing to actual data rows. Multiple non-clustered indexes are allowed.
• **Why B+ Trees over B-Trees?**: B+ Tree stores all data pointers only in leaf nodes, linked sequentially as a Doubly Linked List. This provides superior range-scan queries (e.g. \`BETWEEN X AND Y\`) and allows internal nodes to hold more keys per disk block, resulting in lower tree height.`
          }
        ],
        qa: [
          {
            q: "What is the difference between WHERE and HAVING clause in SQL?",
            a: "WHERE filters individual rows BEFORE any aggregation (GROUP BY) takes place; it cannot contain aggregate functions like SUM() or COUNT(). HAVING filters grouped records AFTER the GROUP BY operation and is specifically designed to filter on aggregate results."
          },
          {
            q: "Explain SQL Joins with use cases.",
            a: "• INNER JOIN: Returns only rows that match in both tables.\n• LEFT (OUTER) JOIN: Returns all rows from left table and matched rows from right; nulls if no match.\n• RIGHT JOIN: Returns all rows from right table and matched rows from left.\n• FULL OUTER JOIN: Returns all rows when there is a match in either left or right table.\n• CROSS JOIN: Cartesian product of all rows."
          },
          {
            q: "SQL vs NoSQL: When should you choose which?",
            a: "Choose SQL (Relational: PostgreSQL, MySQL) when data is structured, schema is stable, and strict ACID transaction compliance is required (e.g. banking, e-commerce orders). Choose NoSQL (MongoDB, DynamoDB, Cassandra) for unstructured/semi-structured data, dynamic schemas, horizontal auto-scaling, and high write throughput."
          }
        ]
      },
      {
        id: "cn",
        name: "Computer Networks (CN)",
        icon: "fa-network-wired",
        description: "OSI 7 Layers, TCP/IP, 3-Way Handshake, DNS, HTTP/HTTPS, Subnetting",
        notes: [
          {
            title: "OSI vs TCP/IP Architecture",
            content: `
• **OSI 7 Layers (Top to Bottom)**:
  7. **Application**: HTTP, HTTPS, FTP, SMTP, DNS
  6. **Presentation**: Data formatting, Encryption (TLS), Compression
  5. **Session**: Session establishment, checkpoints
  4. **Transport**: Segment level. End-to-end communication, flow control, error checking (TCP, UDP)
  3. **Network**: Packet level. Logical addressing, routing across networks (IP, ICMP, ARP)
  2. **Data Link**: Frame level. Physical MAC addressing, error detection (Ethernet, Wi-Fi)
  1. **Physical**: Bits level. Cables, radio waves, electrical signals.`
          },
          {
            title: "TCP vs UDP & 3-Way Handshake",
            content: `
• **TCP (Transmission Control Protocol)**: Connection-oriented, reliable, guaranteed ordered delivery, flow control (sliding window), congestion control. Used in HTTP, SSH, FTP, Email.
• **UDP (User Datagram Protocol)**: Connectionless, lightweight, unreliable, no ordering, low latency. Used in Video Streaming, Gaming, VoIP, DNS queries.
• **TCP 3-Way Handshake (Connection Establishment)**:
  1. Client sends **SYN** (Synchronize) packet with initial sequence number (ISN_c).
  2. Server responds with **SYN-ACK** (acknowledging ISN_c + 1, and sending server's ISN_s).
  3. Client sends **ACK** (acknowledging ISN_s + 1). Connection is established.`
          },
          {
            title: "What happens when you type a URL into a browser?",
            content: `
1. **DNS Lookup**: Browser checks cache (Browser → OS → Router → ISP). If not found, queries Root DNS Server → TLD Server (.com) → Authoritative Name Server to resolve Domain Name to IP address.
2. **TCP Connection**: Client initiates TCP 3-Way Handshake with server IP on port 80/443.
3. **TLS/SSL Handshake (for HTTPS)**: Client and server negotiate cipher suites, authenticate server via SSL certificate, and generate symmetric session keys.
4. **HTTP Request**: Browser sends \`GET / HTTP/1.1\` request with headers.
5. **Server Processing & Response**: Web server processes request and returns HTTP response (status 200 OK + HTML/CSS/JS payload).
6. **Browser Rendering**: Browser parses HTML into DOM, CSS into CSSOM, combines them into Render Tree, computes layout, and paints pixels on screen.`
          }
        ],
        qa: [
          {
            q: "What is the difference between HTTP and HTTPS?",
            a: "HTTP transmits data in plaintext over port 80, making it vulnerable to packet sniffing and man-in-the-middle attacks. HTTPS transmits data encrypted over port 443 using TLS/SSL protocols, ensuring privacy, data integrity, and server authentication via digital certificates."
          },
          {
            q: "What is the role of ARP (Address Resolution Protocol)?",
            a: "ARP translates a known 32-bit Logical IP Address (Network Layer) into a 48-bit Physical MAC Address (Data Link Layer) within a local area network by broadcasting an ARP Request frame."
          }
        ]
      },
      {
        id: "oops",
        name: "Object-Oriented Programming (OOP)",
        icon: "fa-shapes",
        description: "4 Pillars, SOLID Principles, Design Patterns, Abstract Class vs Interface",
        notes: [
          {
            title: "The 4 Core Pillars of OOP",
            content: `
1. **Encapsulation**: Bundling of data (fields) and methods that operate on that data into a single unit (Class), and restricting direct access to internal state using access modifiers (private, protected).
2. **Abstraction**: Hiding internal implementation details and exposing only the essential interface to the outside world (achieved via Abstract Classes and Interfaces).
3. **Inheritance**: Mechanism where a child/derived class inherits properties and behaviors from a parent/base class, promoting code reusability (IS-A relationship).
4. **Polymorphism**: Ability of a message or method call to be processed in different ways.
   - **Compile-Time (Static)**: Method Overloading (same name, different parameter signature) & Operator Overloading.
   - **Runtime (Dynamic)**: Method Overriding (subclass provides specific implementation of a virtual method defined in superclass). Resolved via Virtual Method Table (vtable).`
          },
          {
            title: "SOLID Design Principles",
            content: `
• **S - Single Responsibility Principle (SRP)**: A class should have one, and only one, reason to change.
• **O - Open/Closed Principle (OCP)**: Software entities should be open for extension, but closed for modification.
• **L - Liskov Substitution Principle (LSP)**: Objects of a superclass should be replaceable with objects of its subclasses without breaking program correctness.
• **I - Interface Segregation Principle (ISP)**: Clients should not be forced to depend upon interfaces they do not use (prefer small, role-specific interfaces over fat ones).
• **D - Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules; both should depend on abstractions.`
          }
        ],
        qa: [
          {
            q: "What is the difference between Abstract Class and Interface?",
            a: "An Abstract Class can have state (instance variables), constructors, and concrete method implementations; a class can only inherit from one abstract class (single inheritance). An Interface defines a pure contract (behavioral blueprint); a class can implement multiple interfaces (multiple inheritance)."
          },
          {
            q: "Explain the Singleton Design Pattern and how to make it thread-safe.",
            a: "Singleton ensures a class has only one instance and provides a global access point to it. To make it thread-safe in Java/C++, use Double-Checked Locking with a volatile instance variable, or use an Initialization-on-demand Holder Idiom."
          }
        ]
      }
    ]
  },

  // ========================================================
  // HR INTERVIEW PREPARATION MODULE
  // ========================================================
  hr: {
    starFramework: {
      title: "The STAR Interview Technique",
      description: "Use this 4-step framework to deliver structured, high-impact behavioral answers that impress recruiters and senior engineering managers:",
      steps: [
        { letter: "S", name: "Situation", desc: "Set the context and background. Where were you working/studying, what was the project, and what was the situation?" },
        { letter: "T", name: "Task", desc: "What was your specific responsibility or challenge? What goal were you tasked to achieve?" },
        { letter: "A", name: "Action", desc: "Explain the specific steps YOU took. Emphasize your contributions, technical decisions, and collaboration." },
        { letter: "R", name: "Result", desc: "Share measurable outcomes, impact, metrics, and what you learned from the experience." }
      ]
    },
    topQuestions: [
      {
        id: "hr-1",
        question: "Tell me about yourself (Walk me through your resume).",
        category: "Introductory",
        structure: "Past (Background/Degree) → Present (Recent projects/skills) → Future (Why this specific company & role)",
        sampleAnswer: "I am a Final Year Computer Science student passionate about building scalable web systems and algorithmic problem solving. Over the last two years, I have solved 350+ DSA problems and built full-stack projects including an e-commerce platform and real-time collaboration tool using React and Node.js. In my recent internship, I optimized database queries that reduced API latency by 32%. I've followed your company's work on cloud infrastructure, and I am excited about the opportunity to contribute my problem-solving and software engineering skills to your engineering team.",
        dos: ["Keep it within 90-120 seconds", "Highlight quantifiable achievements", "Connect your background directly to this job"],
        donts: ["Don't recite your entire life story or high school marks", "Don't just read line-by-line from your resume", "Don't mention personal family details"]
      },
      {
        id: "hr-2",
        question: "Why do you want to join our company?",
        category: "Company Knowledge",
        structure: "Specific company achievement/product → Culture & engineering values → How your goals align",
        sampleAnswer: "I have closely tracked your technological innovations, especially how your engineering platform scales to serve millions of transactions with 99.99% uptime. Furthermore, reading your engineering blogs and employee stories revealed a culture of high ownership, blameless post-mortems, and continuous mentorship. At this stage of my career, I want to be in an environment where I can learn from world-class engineers, work on distributed scale challenges, and build products that touch millions of lives.",
        dos: ["Mention specific recent products, acquisitions, or tech blogs of the company", "Show genuine excitement for their mission"],
        donts: ["Never say 'Because of the high salary/brand name'", "Never give a generic answer that could apply to any company"]
      },
      {
        id: "hr-3",
        question: "What are your greatest strengths and weaknesses?",
        category: "Self-Awareness",
        structure: "Strength + Real example | Genuine weakness + Active remediation steps",
        sampleAnswer: "My greatest strength is rapid problem-solving and perseverance. When working on a complex distributed caching bug in my capstone project, I spent two days profiling memory leaks until I resolved the bottleneck. Regarding weakness: early on, I used to hesitate before delegating tasks or asking for guidance when stuck, which sometimes prolonged my learning curve. I recognized this, and now I follow a strict 45-minute rule: if I am stuck on a problem after thorough debugging and documentation review, I reach out to a senior or teammate for perspective, which has boosted my productivity significantly.",
        dos: ["Pick a genuine weakness that isn't a core fatal flaw for the role", "Always explain the concrete steps you are taking to improve"],
        donts: ["Don't say cliché pseudo-weaknesses like 'I am a perfectionist' or 'I work too hard'", "Don't claim you have no weaknesses"]
      },
      {
        id: "hr-4",
        question: "Tell me about a time you faced a conflict in a team and how you handled it.",
        category: "Behavioral (STAR)",
        structure: "STAR Method: Focus on empathy, objective data, and collaborative alignment",
        sampleAnswer: "During our final semester group project, my teammate and I disagreed on whether to use MongoDB or PostgreSQL for our database. My teammate wanted Mongo for flexibility, whereas our schema involved deeply relational transactions. Rather than arguing, I suggested we evaluate both against objective metrics: schema consistency, query complexity, and our project timeline. We benchmarked our primary user transaction flow and realized relational integrity was crucial to prevent duplicate bookings. We agreed on PostgreSQL, divided the schema design, and delivered the project on time with an 'A' grade.",
        dos: ["Show emotional maturity and focus on team success over personal ego", "Use data and facts to resolve differences"],
        donts: ["Don't criticize or badmouth teammates", "Don't pretend you've never had a disagreement"]
      },
      {
        id: "hr-5",
        question: "Where do you see yourself in 3 to 5 years?",
        category: "Career Vision",
        structure: "Mastery of current role → Ownership & Mentorship → Technical impact",
        sampleAnswer: "In the first 1-2 years, my primary goal is to become deeply proficient in your tech stack, write clean and reliable production code, and gain end-to-end domain expertise in our systems. By years 3 to 5, I see myself taking ownership of system architecture modules, contributing to technical design discussions, and mentoring new junior engineers while continuing to grow into a senior engineering contributor.",
        dos: ["Emphasize continuous learning and increasing ownership", "Align your trajectory with the company's growth"],
        donts: ["Don't say 'In your chair/as your manager'", "Don't say 'I want to pursue higher studies abroad' if applying for a full-time role"]
      }
    ],
    interviewerQuestions: [
      "What does a typical day or sprint look like for a software engineer on this specific team?",
      "What are the most challenging technical engineering problems this team is currently tackling?",
      "How does the engineering team measure success and foster mentorship for new freshers?",
      "What opportunities exist for engineers to contribute to architecture and technology selection?"
    ]
  },

  // ========================================================
  // COMPREHENSIVE QUIZ ENGINE DATA
  // ========================================================
  quizzes: [
    {
      id: "q-1",
      category: "Aptitude",
      question: "If a sum of money doubles itself in 5 years at simple interest, what is the rate of interest per annum?",
      options: ["10%", "15%", "20%", "25%"],
      correct: 2,
      explanation: "Let Principal = P. Amount = 2P, so Simple Interest (SI) = P.\nSI = (P × R × T) / 100\nP = (P × R × 5) / 100 => 5R = 100 => R = 20% per annum."
    },
    {
      id: "q-2",
      category: "Aptitude",
      question: "In how many different ways can the letters of the word 'LEADING' be arranged so that the vowels always come together?",
      options: ["360", "480", "720", "5040"],
      correct: 2,
      explanation: "The word 'LEADING' has 7 letters: Vowels are E, A, I (3 vowels), Consonants are L, D, N, G (4 consonants).\nTreat (E, A, I) as 1 unit. Total entities to arrange = 4 consonants + 1 unit = 5 units.\nNumber of ways to arrange 5 units = 5! = 120.\nThe 3 vowels among themselves can be arranged in 3! = 6 ways.\nTotal ways = 120 × 6 = 720."
    },
    {
      id: "q-3",
      category: "OS",
      question: "Which of the following is NOT a necessary condition for a deadlock to occur?",
      options: ["Mutual Exclusion", "Circular Wait", "Preemption of resources", "Hold and Wait"],
      correct: 2,
      explanation: "The 4 necessary conditions are Mutual Exclusion, Hold and Wait, NO Preemption, and Circular Wait. 'Preemption of resources' breaks deadlock, it does not cause it."
    },
    {
      id: "q-4",
      category: "DBMS",
      question: "Which normal form is based on the concept of 'Full Functional Dependency' and eliminates partial dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      correct: 1,
      explanation: "Second Normal Form (2NF) requires that the table is in 1NF and all non-key attributes are fully functionally dependent on the primary key, thereby eliminating partial dependency."
    },
    {
      id: "q-5",
      category: "CN",
      question: "In the TCP 3-way handshake, what is the correct sequence of packet flags exchanged?",
      options: ["SYN -> ACK -> SYN-ACK", "SYN -> SYN-ACK -> ACK", "ACK -> SYN -> SYN-ACK", "SYN-ACK -> SYN -> ACK"],
      correct: 1,
      explanation: "The client first sends SYN, the server replies with SYN-ACK, and finally the client acknowledges with ACK."
    },
    {
      id: "q-6",
      category: "OOPs",
      question: "Which principle of SOLID states that 'high-level modules should not depend on low-level modules, both should depend on abstractions'?",
      options: ["Single Responsibility", "Open-Closed", "Liskov Substitution", "Dependency Inversion"],
      correct: 3,
      explanation: "The Dependency Inversion Principle (D in SOLID) states that high-level modules should depend on abstractions, not concrete implementations."
    },
    {
      id: "q-7",
      category: "Aptitude",
      question: "Pointing to a photograph, a man said, 'I have no brother or sister, but that man's father is my father's son.' Whose photograph was it?",
      options: ["His nephew", "His father", "His son", "His own"],
      correct: 2,
      explanation: "Since the speaker has no brother or sister, 'my father's son' must be the speaker himself. Thus, 'that man's father is myself'. Therefore, the photograph is of his SON."
    },
    {
      id: "q-8",
      category: "OS",
      question: "What is the phenomenon where the page-fault rate increases as the number of allocated frame buffers increases in FIFO page replacement?",
      options: ["Thrashing", "Belady's Anomaly", "Convoy Effect", "Starvation"],
      correct: 1,
      explanation: "Belady's Anomaly occurs in FIFO page replacement where giving more memory frames to a process actually increases page faults."
    },
    {
      id: "q-9",
      category: "DBMS",
      question: "Which isolation level prevents Dirty Reads but still allows Non-Repeatable Reads?",
      options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      correct: 1,
      explanation: "Read Committed guarantees that any data read is committed at the moment it is read, preventing Dirty Reads, but does not prevent non-repeatable reads."
    },
    {
      id: "q-10",
      category: "HR",
      question: "When answering a behavioral question using the STAR method, what does the letter 'A' stand for?",
      options: ["Attitude", "Action", "Achievement", "Assessment"],
      correct: 1,
      explanation: "STAR stands for Situation, Task, Action (the specific steps you took), and Result (the measurable outcome)."
    }
  ]
};

if (typeof module !== 'undefined') {
  module.exports = { PREP_DATA };
}
