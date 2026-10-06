import { assetPath } from "./assetPath";

export const SAMPLE_CONTENT = false;

export const profile = {
  name: "Aakash Kumar",
  role: "Implementation Engineer",
  tagline: "Turning technical setups into confident client handoffs.",
  headline: ["I ship integrations", "that {survive} production."],
  subhead:
    "I deploy and configure software, validate APIs, investigate system issues, and help clients get from onboarding to a working launch.",
  location: "Bengaluru, India",
  focus: "Software deployment · API testing · client onboarding",
  email: "officialaakash21140@gmail.com",
  resumeUrl: assetPath("/Aakash Kumar Resume.pdf"),
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/aakash-kumar-0226a7393" },
    { label: "GitHub", href: "https://github.com/aakash21140" },
    { label: "Email", href: "mailto:officialaakash21140@gmail.com" },
  ],
};

export const stats = [
  { value: 2, suffix: "", label: "professional roles", decimals: 0 },
  { value: 3, suffix: "", label: "implementation strengths", decimals: 0 },
  { value: 7.39, suffix: "", label: "B.Tech CGPA", decimals: 2 },
  { value: 4, suffix: " yrs", label: "studying computer science", decimals: 0 },
];

export const marqueeTop =
  "software deployment · API validation · client onboarding · system configuration · integration debugging · network security · ";

export const marqueeWarn =
  "configure with care · test the endpoint · follow the logs · make the handoff clear · ";

export const contact = {
  eyebrow: "Have a rollout in mind?",
  heading: "Let’s make the technical side feel straightforward.",
};

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  metric: string;
  period: string;
  role: string;
  setting: string;
  repositoryUrl?: string;
  tags: string[];
  accent: string;
  imageLabel: string;
  context: string;
  problem: string[];
  approach: { title: string; body: string }[];
  flow: string[];
  outcome: { value: string; label: string }[];
  stack: string[];
  learned: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "enterprise-software-implementation",
    index: "01",
    title: "From software setup to client-ready",
    summary:
      "Deploying and configuring tailored software, validating APIs, and supporting client onboarding and end-to-end system tests.",
    metric: "Deployment · API testing · onboarding",
    period: "Feb 2026 — Present",
    role: "Implementation Engineer",
    setting: "Virgio (Ameyam Enterprises Pvt. Ltd.)",
    tags: ["Software deployment", "API testing", "Client onboarding"],
    accent: "#38e1cf",
    imageLabel: "A clear path from setup to handoff",
    context:
      "At Virgio, I work on software implementation for enterprise clients—configuring solutions around operational requirements and supporting the technical work that brings them into use.",
    problem: [
      "A useful implementation has to fit the way each client operates.",
      "Endpoints and integrations need to be checked, not just assumed to work.",
      "Clients need a smooth path through onboarding, testing, and deployment.",
    ],
    approach: [
      {
        title: "Start with the operational need",
        body: "Deploy and configure software solutions to match enterprise client requirements.",
      },
      {
        title: "Check the API boundary",
        body: "Use Postman for API testing, endpoint validation, and integration debugging.",
      },
      {
        title: "Follow issues to their source",
        body: "Investigate application, server, and system logs to help resolve production issues.",
      },
      {
        title: "Stay through the handoff",
        body: "Support client onboarding, end-to-end system testing, and technical deployment activities.",
      },
    ],
    flow: ["Client requirements", "Configuration", "API validation", "System testing", "Onboarding"],
    outcome: [
      { value: "Configured", label: "for enterprise client requirements" },
      { value: "Validated", label: "APIs and integration endpoints" },
      { value: "Supported", label: "onboarding and end-to-end testing" },
    ],
    stack: ["Postman", "REST APIs", "System logs"],
    learned:
      "A launch feels smoother when the setup matches the work, the endpoints have been checked, and people know what happens next.",
  },
  {
    slug: "realtime-location-tracker",
    index: "02",
    title: "A live map for connected locations",
    summary:
      "A browser geolocation demo that streams live coordinates to a Leaflet map using Express and Socket.IO.",
    metric: "Geolocation · Socket.IO · Leaflet",
    period: "GitHub project",
    role: "Full-stack project",
    setting: "Realtime_LiveTracker",
    repositoryUrl: "https://github.com/aakash21140/Realtime_LiveTracker",
    tags: ["JavaScript", "Express", "Socket.IO", "Leaflet"],
    accent: "#7b8cff",
    imageLabel: "Live location updates on a shared map",
    context:
      "This browser-based project uses the Geolocation API to send location updates over Socket.IO, while Leaflet displays a marker for each connected client on a map.",
    problem: [
      "A live view needs to reflect location updates as they arrive.",
      "Each connected browser needs a distinct marker on the map.",
      "Markers should be removed when their client disconnects.",
    ],
    approach: [
      {
        title: "Read location in the browser",
        body: "Use the browser's Geolocation API to watch position updates, subject to the browser's permission prompt.",
      },
      {
        title: "Relay updates over sockets",
        body: "An Express server uses Socket.IO to broadcast each connected client's latest coordinates.",
      },
      {
        title: "Keep the map in sync",
        body: "Leaflet creates and updates client markers, then removes them when a socket disconnects.",
      },
    ],
    flow: ["Browser permission", "Geolocation", "Socket.IO", "Express relay", "Leaflet map"],
    outcome: [
      { value: "Live", label: "coordinate updates over sockets" },
      { value: "Per-client", label: "map markers for connected browsers" },
      { value: "Cleanup", label: "when a client disconnects" },
    ],
    stack: ["JavaScript", "Node.js", "Express", "Socket.IO", "Leaflet", "OpenStreetMap"],
    learned:
      "Location is sensitive: this prototype is for demonstrating live updates, not for tracking people without explicit consent and carefully scoped access.",
  },
  {
    slug: "checkpoint-network-security-lab",
    index: "03",
    title: "A virtual lab for practical network security",
    summary:
      "A VMware Workstation lab for exploring Check Point firewall policies, NAT, Anti-Spoofing, and service-based access controls.",
    metric: "Check Point · VMware Workstation",
    period: "Virtual lab project",
    role: "Network security lab",
    setting: "Self-directed technical project",
    tags: ["Check Point", "Network security", "Virtual lab"],
    accent: "#7b8cff",
    imageLabel: "A virtual network security lab",
    context:
      "I built a virtual network security environment in VMware Workstation to simulate an enterprise setup and configure security policies in Check Point SmartConsole.",
    problem: [
      "A virtual lab makes it possible to explore security policy configuration in a simulated environment.",
      "Network controls need clear policy rules and explicit service boundaries.",
    ],
    approach: [
      {
        title: "Build the virtual environment",
        body: "Use VMware Workstation to simulate an enterprise network setup.",
      },
      {
        title: "Configure firewall policies",
        body: "Set up management, stealth, and NAT rules in Check Point SmartConsole.",
      },
      {
        title: "Apply network protections",
        body: "Configure Anti-Spoofing and service-based access controls for HTTP, HTTPS, and DNS.",
      },
    ],
    flow: ["VMware Workstation", "Check Point SmartConsole", "Policy rules", "Anti-Spoofing", "Service controls"],
    outcome: [
      { value: "Management", label: "and stealth policy rules configured" },
      { value: "NAT", label: "included in the firewall policy" },
      { value: "HTTP · HTTPS · DNS", label: "service-based access controls" },
    ],
    stack: ["VMware Workstation", "Check Point SmartConsole", "NAT", "Anti-Spoofing"],
    learned:
      "A virtual lab makes security configuration tangible: policies, network protections, and service access can be explored together.",
  },
];

export const process = [
  {
    title: "Understand the setup",
    body: "Start with the client’s operational requirements so configuration has a clear purpose.",
  },
  {
    title: "Validate the connection",
    body: "Test APIs and endpoints, then investigate logs when an integration does not behave as expected.",
  },
  {
    title: "Test end to end",
    body: "Check the whole system flow as part of onboarding and deployment, not just one isolated component.",
  },
  {
    title: "Make the handoff clear",
    body: "Keep technical deployment connected to the people who will use and support the solution.",
  },
];

export const toolbox = [
  {
    group: "Web & API testing",
    items: ["Postman", "REST APIs", "HTML5", "CSS3", "JavaScript (ES6+)", "Node.js", "Express.js"],
  },
  {
    group: "Networking & security",
    items: ["TCP/IP", "LAN / Wi-Fi", "Check Point Firewall", "Active Directory", "DNS", "DHCP", "NAT"],
  },
  {
    group: "Systems & tools",
    items: ["Windows Server", "Windows 10 / 11", "VMware Workstation", "Git", "GitHub", "AWS basics"],
  },
];

export const timeline = [
  {
    period: "Feb 2026 — Present",
    role: "Implementation Engineer",
    org: "Virgio (Ameyam Enterprises Pvt. Ltd.) · Bengaluru",
    note: "Software deployment and configuration, API testing, integration debugging, client onboarding, and end-to-end system testing.",
  },
  {
    period: "Jan 2025 — Feb 2026",
    role: "Network Support Engineer",
    org: "Jetking Infotech · Durg",
    note: "Tier-1 desktop and network support, LAN/Wi-Fi troubleshooting, system installations, domain configuration, and software provisioning.",
  },
];

export const education = [
  {
    period: "Jan 2025 — Jun 2026",
    qualification: "Diploma in Cloud Computing & Cyber Security",
    institution: "Jetking Learning Center, Durg",
    detail: "",
  },
  {
    period: "2021 — 2025",
    qualification: "B.Tech in Computer Science & Engineering",
    institution: "Kalinga University, Raipur",
    detail: "CGPA 7.39",
  },
  {
    period: "2019 — 2021",
    qualification: "Senior Secondary (Class XII)",
    institution: "B.D. Public School, Patna",
    detail: "72%",
  },
];

export type AboutPhoto = {
  src: string;
  alt: string;
  caption?: string;
  ratio: "portrait" | "landscape" | "square";
};

export const aboutPhotos: AboutPhoto[] = [
  {
    src: "/about/aakash-portrait.webp",
    alt: "Portrait wearing a charcoal blazer in a warmly lit interior",
    caption: "A little about me",
    ratio: "portrait",
  },
  {
    src: "/about/city-portrait.webp",
    alt: "Standing on a rooftop with the city skyline behind",
    caption: "A moment in the city",
    ratio: "square",
  },
  {
    src: "/about/clouds-portrait.webp",
    alt: "Relaxing above the clouds in a white shirt",
    caption: "A change in perspective",
    ratio: "square",
  },
];

export const about = {
  heading: "A practical bridge between technology and the people using it.",
  paragraphs: [
    "I’m Aakash Kumar, an Implementation Engineer based in Bengaluru. I work across software setup, APIs, troubleshooting, and client onboarding—helping turn technical requirements into a working day-to-day system.",
    "My path runs from hands-on desktop and network support into enterprise software implementation. Along the way, I’ve built a virtual Check Point firewall lab to keep exploring network security in practice.",
    "I like the details that make a launch feel considered: a configuration that fits, an endpoint that has been checked, and a handoff that leaves people clear on what comes next.",
  ],
  ps: "Good implementation is technical work, translated clearly.",
};
