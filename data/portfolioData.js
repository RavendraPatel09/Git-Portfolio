/**
 * Ravendra Patel — Centralized Portfolio Data Configuration
 * Source of Truth: https://github.com/RavendraPatel09
 * Strictly verified: No fabricated roles, statistics, or external claims.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Ravendra Patel",
    handle: "@RavendraPatel09",
    role: "Software Developer",
    status: {
      active: true,
      text: "Available for opportunities",
      dotColor: "#10B981" // emerald green
    },
    location: "Madhya Pradesh, India",
    email: "patelsamerth9@gmail.com",
    github: "https://github.com/RavendraPatel09",
    linkedin: "https://linkedin.com/in/ravendra-patel-3bb375338",
    tagline: "Building software, learning systems, and turning ideas into working products.",
    bio: [
      "I am a software developer driven by curiosity about how complex software systems operate under the hood. My work centers on architecting clean backends, crafting responsive frontend interfaces, and implementing rigorous data structures and algorithms.",
      "From engineering accessible career platforms with AI to designing IoT-integrated smart city architectures and healthcare delivery marketplaces, I focus on writing maintainable, typed, and well-structured code with zero unnecessary dependencies.",
      "I believe in continuous learning through hands-on building — testing hypotheses, refining architecture, and constantly sharpening my problem-solving depth across Python, TypeScript, C++, and modern cloud technologies."
    ]
  },

  now: [
    {
      category: "BUILDING",
      title: "Full-Stack & AI Platforms",
      description: "Developing accessible web solutions like Saksham-AI, healthcare delivery ecosystems with real-time communication, and intelligent utility tools.",
      tags: ["React 19", "FastAPI", "TypeScript", "Tailwind CSS"]
    },
    {
      category: "LEARNING",
      title: "Backend Architecture & Distributed Systems",
      description: "Deepening knowledge in asynchronous API design, relational data modeling, Redis caching layers, and containerized deployment workflows.",
      tags: ["PostgreSQL", "Docker", "REST APIs", "WebSockets"]
    },
    {
      category: "EXPLORING",
      title: "Algorithmic Efficiency & Micro-Interactions",
      description: "Solving competitive programming challenges in C++ & Python while studying motion design and keyboard-accessible UI systems.",
      tags: ["DSA in C++", "Python", "WCAG 2.1", "System Design"]
    }
  ],

  projects: [
    {
      id: "01",
      title: "Saksham-Ai",
      subtitle: "AI-Powered Accessible Career Platform",
      category: "Full-Stack AI",
      featured: true,
      description: "An accessibility-first career platform designed for persons with disabilities in India. Combines inclusive UI design with AI job matching, personalized skill-building recommendations, and direct pipelines to inclusive employers.",
      problem: "Traditional job portals are riddled with accessibility barriers and lack structured job matching tailored to varied physical abilities.",
      tech: ["React", "TypeScript", "Tailwind CSS", "AI Matching", "Vercel"],
      github: "https://github.com/RavendraPatel09/Saksham-Ai",
      demo: "https://saksham-aiapp.vercel.app/",
      accent: "#38BDF8"
    },
    {
      id: "02",
      title: "Medi-connect / MedicalRapidGo",
      subtitle: "Full-Stack Medicine Delivery & Marketplace Platform",
      category: "Backend & Systems",
      featured: true,
      description: "A production-grade healthcare marketplace monorepo connecting buyers and licensed sellers. Features role-based access control, WebSocket-powered live chat, and a modular architecture.",
      problem: "Fragmented distribution channels cause delays and opacity in accessing prescription and urgent medications.",
      tech: ["FastAPI", "Python", "React", "TypeScript", "PostgreSQL", "WebSockets", "Docker"],
      github: "https://github.com/RavendraPatel09/Medi-connect",
      demo: null,
      accent: "#34D399"
    },
    {
      id: "03",
      title: "Smart Bhopal Backend",
      subtitle: "IoT & Municipal Smart City Infrastructure",
      category: "Systems & IoT",
      featured: true,
      description: "Backend architecture designed for municipal IoT sensor telemetry, real-time traffic monitoring, municipal utility metering, and citizen grievance dispatching.",
      problem: "Urban infrastructure management systems often operate in silos without centralized real-time telemetry processing.",
      tech: ["Python", "Node.js", "IoT Telemetry", "Express", "Docker"],
      github: "https://github.com/RavendraPatel09/smart_bhopal_backend",
      demo: null,
      accent: "#818CF8"
    },
    {
      id: "04",
      title: "Tripmate",
      subtitle: "AI Itinerary & Comprehensive Travel Companion",
      category: "Full-Stack Web",
      featured: true,
      description: "Unified travel companion platform consolidating AI itinerary generation, multi-currency budgeting, interactive destination discovery, packing checklists, and local emergency directories.",
      problem: "Travelers are forced to juggle 5+ separate apps for planning, budgeting, discovery, and safety guidelines.",
      tech: ["TypeScript", "React", "Vite", "Tailwind CSS", "AI Engine"],
      github: "https://github.com/RavendraPatel09/Tripmate",
      demo: null,
      accent: "#F472B6"
    },
    {
      id: "05",
      title: "AI Resume Analyzer",
      subtitle: "ATS Compatibility & Resume Evaluation Engine",
      category: "AI & Tools",
      featured: false,
      description: "Intelligent career tool that scans resumes against specific job descriptions, computes Applicant Tracking System (ATS) compatibility scores, and yields structured improvement feedback.",
      problem: "Job seekers receive automated rejections without actionable insight into keyword gaps and formatting mismatches.",
      tech: ["React", "JavaScript", "Vite", "ATS Heuristics"],
      github: "https://github.com/RavendraPatel09/Ai-Resume-analyzer",
      demo: null,
      accent: "#FB923C"
    },
    {
      id: "06",
      title: "Complete DSA in C++ & Python",
      subtitle: "Algorithmic Problem-Solving & Data Structures",
      category: "Algorithms & Core",
      featured: false,
      description: "Comprehensive repository of modular data structure implementations (Trees, Graphs, Disjoint Sets, DP, Trie) and tested algorithmic solutions across competitive programming platforms.",
      problem: "Need for clean, documented, and time/space-optimized reference implementations of fundamental computer science concepts.",
      tech: ["C++", "Python", "Data Structures", "Algorithms", "Optimization"],
      github: "https://github.com/RavendraPatel09/Complete-DSA-Using-Cpp",
      demo: null,
      accent: "#A78BFA"
    },
    {
      id: "07",
      title: "Crewly",
      subtitle: "Creator & Freelancer Collaboration Network",
      category: "Frontend & UI",
      featured: false,
      description: "A specialized collaboration platform connecting video creators, streamers, and influencers with video editors, thumbnail designers, and production talent.",
      problem: "Content creators struggle to source vetted, niche-specific creative editors with transparent workflows.",
      tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/RavendraPatel09/Crewly",
      demo: null,
      accent: "#38BDF8"
    },
    {
      id: "08",
      title: "Where Is My Milk",
      subtitle: "Smart Dairy Marketplace & Ledger",
      category: "Web Application",
      featured: false,
      description: "Hyper-local dairy marketplace connecting regional milk producers with neighborhood buyers featuring digital delivery ledgers, interactive maps, and order tracking.",
      problem: "Small dairy farmers lack direct digital bookkeeping and direct consumer distribution channels.",
      tech: ["HTML5", "CSS3", "JavaScript", "Local Storage API"],
      github: "https://github.com/RavendraPatel09/Where-Is-My-Milk",
      demo: null,
      accent: "#FBBF24"
    }
  ],

  skills: [
    {
      group: "LANGUAGES",
      items: [
        { name: "Python", verified: true, note: "Backend, AI, DSA" },
        { name: "C++", verified: true, note: "Algorithms, STL, DSA" },
        { name: "C", verified: true, note: "Systems Foundations" },
        { name: "TypeScript", verified: true, note: "Type-safe Fullstack" },
        { name: "JavaScript (ES6+)", verified: true, note: "Async & Web APIs" },
        { name: "SQL", verified: true, note: "Relational Queries" }
      ]
    },
    {
      group: "BACKEND & ARCHITECTURE",
      items: [
        { name: "FastAPI", verified: true, note: "Async Python APIs" },
        { name: "Node.js", verified: true, note: "Event-driven Server" },
        { name: "Express", verified: true, note: "REST Middleware" },
        { name: "RESTful API Design", verified: true, note: "Standard HTTP Specs" },
        { name: "WebSockets", verified: true, note: "Bi-directional Comms" },
        { name: "JWT Authentication", verified: true, note: "Stateless Security" }
      ]
    },
    {
      group: "FRONTEND & UI",
      items: [
        { name: "React", verified: true, note: "Hooks & Component Architecture" },
        { name: "Vite", verified: true, note: "Next-gen Bundler" },
        { name: "Tailwind CSS", verified: true, note: "Utility-first Styling" },
        { name: "HTML5 / CSS3", verified: true, note: "Semantic & Responsive" },
        { name: "Motion & Interactions", verified: true, note: "Micro-animations" }
      ]
    },
    {
      group: "DATABASES & STORAGE",
      items: [
        { name: "PostgreSQL", verified: true, note: "Relational Schema & Indexing" },
        { name: "MySQL", verified: true, note: "ACID Transactions" },
        { name: "Data Modeling", verified: true, note: "ERDs & Normalization" }
      ]
    },
    {
      group: "TOOLS & DEVOPS",
      items: [
        { name: "Git", verified: true, note: "Branching & Collaboration" },
        { name: "GitHub", verified: true, note: "CI/CD & Open Source" },
        { name: "Docker", verified: true, note: "Containerization" },
        { name: "Linux / CLI", verified: true, note: "Bash Scripting & Env" },
        { name: "VS Code", verified: true, note: "Development Workflow" }
      ]
    },
    {
      group: "CORE CONCEPTS",
      items: [
        { name: "Data Structures", verified: true, note: "Trees, Graphs, DP" },
        { name: "Algorithms", verified: true, note: "Time & Space Complexity" },
        { name: "DBMS Principles", verified: true, note: "Concurrency & Integrity" },
        { name: "System Design Basics", verified: true, note: "Modularity & Scale" },
        { name: "Web Accessibility (WCAG)", verified: true, note: "Inclusive UI" }
      ]
    }
  ],

  journey: [
    {
      period: "FOUNDATIONS",
      title: "Data Structures & Algorithmic Problem Solving",
      details: "Built a solid groundwork in C, C++, and Python by implementing fundamental algorithms, trees, graphs, and dynamic programming from scratch."
    },
    {
      period: "FULL-STACK EXPLORATION",
      title: "Web Applications & Data Systems",
      details: "Engineered web applications and relational databases (MySQL, PostgreSQL), delivering projects like FindMyStuff, Where Is My Milk, and Library Systems."
    },
    {
      period: "SYSTEMS & REAL-TIME",
      title: "Backend APIs, WebSockets & IoT Architectures",
      details: "Expanded into scalable backend architectures with FastAPI, Node.js, and Docker; built IoT telemetry concepts in Smart Bhopal Backend and WebSocket chat in Medi-connect."
    },
    {
      period: "ACCESSIBILITY & AI",
      title: "Impact-Driven AI Platforms & Production Quality",
      details: "Launched Saksham-AI to bring accessibility-first job discovery to India, developed AI Resume Analyzer, and established rigorous code standards."
    }
  ],

  fallbackRepos: [
    {
      name: "Saksham-Ai",
      description: "Empowering every ability with AI — accessible job matching, skill-building, and inclusive hiring in India.",
      language: "TypeScript",
      html_url: "https://github.com/RavendraPatel09/Saksham-Ai",
      homepage: "https://saksham-aiapp.vercel.app/",
      stars: 0,
      updated_at: "2026-08-06"
    },
    {
      name: "Medi-connect",
      description: "Full-stack medicine delivery platform with FastAPI backend, React frontend, real-time chat, and role-based access control.",
      language: "TypeScript",
      html_url: "https://github.com/RavendraPatel09/Medi-connect",
      homepage: "",
      stars: 0,
      updated_at: "2026-07-12"
    },
    {
      name: "Tripmate",
      description: "AI-powered travel companion combining itinerary generation, budgeting, discovery, and safety guidelines into one cohesive app.",
      language: "TypeScript",
      html_url: "https://github.com/RavendraPatel09/Tripmate",
      homepage: "",
      stars: 0,
      updated_at: "2026-08-06"
    },
    {
      name: "smart_bhopal_backend",
      description: "Smart City backend for Bhopal: IoT integration, real-time traffic, utilities management, citizen services, and analytics.",
      language: "Python",
      html_url: "https://github.com/RavendraPatel09/smart_bhopal_backend",
      homepage: "",
      stars: 0,
      updated_at: "2026-07-12"
    },
    {
      name: "Complete-DSA-Using-Cpp",
      description: "Modular implementations of core Data Structures, Algorithms, and solutions to competitive programming challenges.",
      language: "C++",
      html_url: "https://github.com/RavendraPatel09/Complete-DSA-Using-Cpp",
      homepage: "",
      stars: 0,
      updated_at: "2026-07-27"
    },
    {
      name: "Ai-Resume-analyzer",
      description: "AI-powered Resume Analyzer that helps users upload resumes, analyze ATS compatibility, and match with job descriptions.",
      language: "JavaScript",
      html_url: "https://github.com/RavendraPatel09/Ai-Resume-analyzer",
      homepage: "",
      stars: 0,
      updated_at: "2026-07-12"
    }
  ]
};

// Expose globally for browser usage
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
