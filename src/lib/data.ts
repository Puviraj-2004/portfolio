export const profile = {
  fullName: "Pirabakaran Puviraj",
  displayName: "Puvi",
  headline: "Building end-to-end web systems with clean backend architecture and modern UI design",
  shortBio:
    "I’m a software engineer focused on building full-stack web systems using ASP.NET Core and Next.js. I specialize in designing scalable backend architectures with clean separation of concerns and integrating them with modern, responsive user interfaces. My goal is to develop production-grade applications and grow into a system-focused engineer working on complex, real-world platforms.",
  email: "pirabakaranpuviraj456@gmail.com",
  linkedIn: "https://www.linkedin.com/in/pirabakaran-puviraj-9993553b0",
  location: {
    city: "Point Pedro",
    region: "Jaffna",
    country: "Sri Lanka",
    timezone: "Asia/Colombo"
  },
  availability: {
    workHours: "09:00 - 17:00",
    remote: true,
    office: true
  },
  profileImage: "/profile.png" // place uploaded image at public/profile.png
};

// SVG Diagram Type Definitions
export type DiagramNode = {
  id: string;
  label: string;
  tech: string;
  description: string;
  x: number;
  y: number;
};

export type DiagramLink = {
  from: string;
  to: string;
  animated?: boolean;
};

export type DiagramData = {
  nodes: DiagramNode[];
  links: DiagramLink[];
};

export type Project = {
  id: string;
  title: string;
  role: string;
  summary: string;
  problem: string;
  constraints: string[];
  approach: string[];
  outcomes: string[];
  demoUrl?: string | null;
  repoUrl?: string | null;
  images?: string[]; // paths under /public/projects/...
  slug: string;
  whatChange?: string;
  diagram?: DiagramData; // Added Diagram support
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Scalable Orders API",
    role: "Backend lead (ASP.NET Core)",
    summary: "High-throughput orders API for an e‑commerce prototype",
    problem:
      "Existing order processing was slow and unreliable under load; needed a resilient API to handle spikes and ensure data consistency.",
    constraints: ["2-week deadline", "single backend engineer", "Postgres hosted on managed DB"],
    approach: [
      "Domain-driven design with clear separation of concerns",
      "CQRS for read/write separation",
      "Background worker for order fulfillment using RabbitMQ",
      "Unit and integration tests; CI pipeline"
    ],
    outcomes: [
      "Reduced average order processing time from 1.8s to 0.6s",
      "Handled 3x traffic spikes in load tests without errors",
      "Clear API docs and Postman collection"
    ],
    demoUrl: null,
    repoUrl: null,
    images: ["/projects/orders-1.png"],
    slug: "scalable-orders-api",
    whatChange: "Add observability (OpenTelemetry) and horizontal worker autoscaling.",
    diagram: {
      nodes: [
        { id: "client", label: "Client UI", tech: "Next.js App", description: "Dispatches HTTP POST order transactions.", x: 50, y: 50 },
        { id: "api", label: "Orders API", tech: "ASP.NET Core", description: "Processes read commands directly; dispatches writes to RabbitMQ.", x: 180, y: 50 },
        { id: "queue", label: "RabbitMQ", tech: "Broker Queue", description: "Buffers write loads safely, preventing database deadlocks.", x: 310, y: 50 },
        { id: "worker", label: "Order Worker", tech: ".NET Service", description: "Asynchronously processes incoming queue packets.", x: 440, y: 50 },
        { id: "db", label: "PostgreSQL", tech: "Managed Database", description: "Primary relational storage engine for orders data.", x: 440, y: 150 },
      ],
      links: [
        { from: "client", to: "api", animated: true },
        { from: "api", to: "queue", animated: true },
        { from: "queue", to: "worker", animated: true },
        { from: "worker", to: "db", animated: true },
      ]
    }
  },
  {
    id: "p2",
    title: "Next.js Admin Dashboard",
    role: "Full‑stack developer",
    summary: "Admin dashboard for monitoring system health and user metrics",
    problem:
      "Stakeholders needed a single place to view metrics, user activity, and quick actions for support tasks.",
    constraints: ["Must be mobile friendly", "integrate with existing APIs"],
    approach: [
      "Next.js App Router with server components for fast SSR",
      "TypeScript + Tailwind for consistent UI",
      "Charts with Recharts; server-side pagination for large datasets"
    ],
    outcomes: [
      "Dashboard load time under 1s for key pages",
      "Support team reduced average resolution time by 20%",
      "Accessible components with keyboard navigation"
    ],
    demoUrl: null,
    repoUrl: null,
    images: ["/projects/dashboard-1.png"],
    slug: "nextjs-admin-dashboard",
    whatChange: "Add role-based access control and audit logs.",
    diagram: {
      nodes: [
        { id: "admin", label: "Admin Browser", tech: "Dashboard UI", description: "Secure client session requesting server-side analytics.", x: 50, y: 50 },
        { id: "ssr", label: "Next.js App", tech: "React Server Comps", description: "Executes lightweight pre-fetching for direct HTML load.", x: 180, y: 50 },
        { id: "api", label: "Internal APIs", tech: "REST Services", description: "Securely acts on metrics payload from audit databases.", x: 310, y: 50 },
        { id: "recharts", label: "Recharts Engine", tech: "Client Analytics", description: "Formats datasets dynamically into vector charts.", x: 440, y: 50 },
      ],
      links: [
        { from: "admin", to: "ssr", animated: true },
        { from: "ssr", to: "api", animated: true },
        { from: "api", to: "recharts", animated: true },
      ]
    }
  },
  {
    id: "p3",
    title: "Realtime Chat Service",
    role: "Full‑stack (backend + frontend)",
    summary: "Lightweight realtime chat for internal collaboration",
    problem:
      "Teams needed a low-latency chat integrated into the product without relying on third-party SaaS.",
    constraints: ["Low latency", "simple moderation", "persist messages"],
    approach: [
      "WebSocket-based service with Redis pub/sub",
      "Message persistence in Postgres",
      "Optimistic UI updates and reconnection strategy"
    ],
    outcomes: [
      "Median message latency 120ms in regional tests",
      "Simple moderation tools reduced spam incidents",
      "Reusable chat component for other apps"
    ],
    demoUrl: null,
    repoUrl: null,
    images: ["/projects/chat-1.png"],
    slug: "realtime-chat-service",
    whatChange: "Add end-to-end encryption option and message search.",
    diagram: {
      nodes: [
        { id: "client", label: "Chat Client", tech: "React / WebSocket", description: "Performs instant duplex socket communication.", x: 50, y: 50 },
        { id: "ws", label: "WS Gateway", tech: "Socket Server", description: "Keeps handshakes warm and dispatches JSON socket payloads.", x: 180, y: 50 },
        { id: "pubsub", label: "Redis Broker", tech: "In-Memory Pub/Sub", description: "Syncs messaging operations across multiple gateway processes.", x: 310, y: 50 },
        { id: "db", label: "Postgres", tech: "Relational DB", description: "Stores persistent communication histories securely.", x: 440, y: 50 },
      ],
      links: [
        { from: "client", to: "ws", animated: true },
        { from: "ws", to: "pubsub", animated: true },
        { from: "pubsub", to: "db", animated: true },
      ]
    }
  }
];

export const resumePlaceholder = {
  education: [
    {
      institution: "University / Bootcamp Name",
      degree: "BSc in Computer Science",
      period: "YYYY - YYYY",
      details: ["Relevant coursework or honors"]
    }
  ],
  experience: [
    {
      company: "Company Name",
      role: "Senior Software Engineer",
      period: "YYYY - Present",
      bullets: [
        "Built and maintained backend services using ASP.NET Core",
        "Integrated Next.js frontends with REST and GraphQL APIs",
        "Led code reviews and mentored junior engineers"
      ]
    }
  ],
  skills: [
    "Languages: C#, TypeScript, SQL",
    "Frameworks: ASP.NET Core, Next.js",
    "Databases: Postgres, Redis",
    "Tools: Docker, GitHub Actions, Vercel"
  ],
  certifications: []
};