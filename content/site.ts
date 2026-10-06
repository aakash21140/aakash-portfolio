/* ============================================================================
 * SAMPLE CONTENT — PLACEHOLDER ONLY
 * ----------------------------------------------------------------------------
 * Every string, number, metric, logo and client name in this file is invented
 * for layout purposes. Nothing here has been verified against Aakash Kumar's
 * real experience. Replace the values below with real content, then flip
 * `SAMPLE_CONTENT` to `false` to hide the site-wide "sample content" banner
 * and the placeholder labels on image slots.
 * ==========================================================================*/

const assetBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string) {
  return `${assetBasePath}${path}`;
}

export const SAMPLE_CONTENT = true;

export const profile = {
  name: "Aakash Kumar",
  role: "Integration & Implementation Engineer",
  tagline: "I make other people's systems agree with each other.",
  headline: ["I ship integrations", "that {survive} production."],
  subhead:
    "Integration and implementation engineer. APIs, middleware, data contracts, and the unglamorous go-live work that decides whether a rollout lands.",
  location: "Bengaluru, IN",
  available: "Open to implementation & platform integration roles",
  email: "aakash@example.com", // SAMPLE
  resumeUrl: assetPath("/Virgio_resume copy.pdf"), // Place this file at public/Virgio_resume copy.pdf
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/example" }, // SAMPLE
    { label: "GitHub", href: "https://github.com/example" }, // SAMPLE
    { label: "Email", href: "mailto:aakash@example.com" }, // SAMPLE
  ],
};

export const stats = [
  { value: 120, suffix: "+", label: "integrations shipped", decimals: 0 },
  { value: 42, suffix: "", label: "enterprise go-lives", decimals: 0 },
  { value: 99.98, suffix: "%", label: "pipeline uptime held", decimals: 2 },
  { value: 6, suffix: "yrs", label: "in the middle layer", decimals: 0 },
];

export const marqueeTop =
  "REST · SOAP · webhooks · SFTP batch · Kafka · OAuth2 · mTLS · idempotency keys · dead-letter queues · retries with backoff · ";

export const marqueeWarn =
  "never trust an upstream payload · never trust an upstream payload · log the correlation id · log the correlation id · ";

export const contact = {
  eyebrow: "Next system",
  heading: "Got two systems that refuse to talk?",
};

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  metric: string;
  year: string;
  role: string;
  duration: string;
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
    slug: "order-sync",
    index: "01",
    title: "Rebuilding Order Sync Between ERP and Storefront",
    summary:
      "A nightly batch that silently dropped orders became an event-driven pipeline with replay, reconciliation, and a dashboard ops could actually read.",
    metric: "−93% order discrepancies",
    year: "2025",
    role: "Lead integration engineer",
    duration: "14 weeks",
    tags: ["Kafka", "ERP", "Reconciliation"],
    accent: "#38e1cf",
    imageLabel: "Pipeline topology diagram",
    context:
      "SAMPLE: A mid-market retailer ran order sync as a nightly SFTP batch between the storefront and a legacy ERP. When a file failed, nobody found out until a customer called.",
    problem: [
      "Batch window could not keep up with same-day fulfilment promises.",
      "Partial file failures were invisible — no per-record status, no replay.",
      "Finance reconciled by hand every Monday against two sources of truth.",
    ],
    approach: [
      {
        title: "Map the contract before writing code",
        body: "Catalogued every field both systems claimed to own, then wrote one canonical order schema with explicit ownership per field. Disagreements got resolved in a document, not in production.",
      },
      {
        title: "Events first, batch as fallback",
        body: "Storefront publishes order events to Kafka; a transform service projects them to the ERP's IDoc format. The old batch stayed live as a shadow path for six weeks so we could diff outputs.",
      },
      {
        title: "Make failure a first-class state",
        body: "Every message carries a correlation id. Failures land in a dead-letter topic with the original payload and the rejecting system's error, replayable from an ops screen without an engineer.",
      },
      {
        title: "Reconcile automatically",
        body: "A daily job compares both ledgers and files discrepancies as tickets with the diff attached, so finance stopped doing it in a spreadsheet.",
      },
    ],
    flow: ["Storefront", "Event bus", "Transform + validate", "ERP adapter", "Reconcile & alert"],
    outcome: [
      { value: "−93%", label: "order discrepancies" },
      { value: "4 hrs → 40 s", label: "end-to-end latency" },
      { value: "0", label: "manual replays per week" },
    ],
    stack: ["Kafka", "Java", "SAP IDoc", "Postgres", "Grafana", "PagerDuty"],
    learned:
      "SAMPLE: Shadow-running the old path was the whole project. Nobody approves a cutover on a diagram; they approve it on two weeks of identical output.",
  },
  {
    slug: "payments-onboarding",
    index: "02",
    title: "Cutting Partner Payment Onboarding From Weeks to Days",
    summary:
      "Turned a bespoke, engineer-attended integration into a self-serve sandbox with a certification suite partners run themselves.",
    metric: "18 days → 3 days median",
    year: "2024",
    role: "Implementation engineer",
    duration: "2 quarters",
    tags: ["Payments", "Sandbox", "Developer experience"],
    accent: "#7b8cff",
    imageLabel: "Partner certification console",
    context:
      "SAMPLE: Every new payment partner needed an engineer on calls for three weeks. Onboarding was the bottleneck on a revenue target.",
    problem: [
      "Each partner interpreted the webhook spec differently; nobody failed loudly.",
      "Credential and mTLS setup was a manual ticket chain across three teams.",
      "No way to prove a partner was ready except to turn on live traffic.",
    ],
    approach: [
      {
        title: "Write the spec as executable tests",
        body: "Converted the integration guide into a 34-case certification suite covering signature verification, idempotent retries, and out-of-order webhooks. Pass the suite, get the production key.",
      },
      {
        title: "Sandbox with deliberate chaos",
        body: "The sandbox replays duplicates, delays callbacks, and returns 5xx on demand, so partners discover their retry bugs before go-live instead of after.",
      },
      {
        title: "Automate the credential chain",
        body: "Self-serve certificate issuance and scoped API keys replaced the three-team ticket relay.",
      },
      {
        title: "Instrument the funnel",
        body: "Tracked where partners stalled per step, then rewrote the two doc sections where 60% of them stopped.",
      },
    ],
    flow: ["Partner signup", "Sandbox keys", "Certification suite", "Review gate", "Live traffic"],
    outcome: [
      { value: "18 → 3 days", label: "median onboarding" },
      { value: "−71%", label: "engineer hours per partner" },
      { value: "0 P1s", label: "from newly onboarded partners" },
    ],
    stack: ["Node.js", "OpenAPI", "mTLS", "Terraform", "Datadog"],
    learned:
      "SAMPLE: Documentation that cannot fail a build is a suggestion. The certification suite did more for quality than any rewrite of the guide.",
  },
  {
    slug: "clinical-data-bridge",
    index: "03",
    title: "Bridging a Legacy HL7 Feed Into a Modern FHIR API",
    summary:
      "A translation layer that kept twenty-year-old hospital interfaces alive while new services consumed clean, versioned FHIR resources.",
    metric: "11 sites migrated, zero downtime",
    year: "2024",
    role: "Integration engineer",
    duration: "9 months",
    tags: ["HL7 v2", "FHIR", "Healthcare"],
    accent: "#ffcf5c",
    imageLabel: "Message mapping worksheet",
    context:
      "SAMPLE: Eleven hospital sites emitted HL7 v2 messages with site-specific quirks. A new patient-facing product needed FHIR, and the sites could not be touched.",
    problem: [
      "Each site had drifted from the standard in different, undocumented ways.",
      "Patient identity differed per site; merging naively would cross records.",
      "Clinical data cannot be dropped, deferred, or guessed at.",
    ],
    approach: [
      {
        title: "Quirk registry per site",
        body: "Instead of one tolerant parser, each site got a declarative quirk profile. New site onboarding became config plus a test fixture, not a code change.",
      },
      {
        title: "Identity before mapping",
        body: "Built a deterministic matching step with an explicit human-review queue. Anything below the confidence threshold waits for a person — never auto-merged.",
      },
      {
        title: "Validate at the boundary",
        body: "Every produced FHIR resource is validated against the profile before publish; rejects are quarantined with the source message attached.",
      },
      {
        title: "Migrate one site at a time",
        body: "Dual-write, compare, then cut. Each site had a rollback that was a single config flag.",
      },
    ],
    flow: ["Site HL7 feed", "Quirk profile", "Identity resolution", "FHIR mapper", "Validation gate"],
    outcome: [
      { value: "11 sites", label: "migrated, zero downtime" },
      { value: "100%", label: "messages accounted for or quarantined" },
      { value: "2 days", label: "to onboard site #12" },
    ],
    stack: ["HL7 v2", "FHIR R4", "Python", "Mirth", "Redis", "Kubernetes"],
    learned:
      "SAMPLE: In regulated data, 'drop the malformed ones' is never an option. A quarantine with a review queue beats a tolerant parser every time.",
  },
  {
    slug: "ipaas-migration",
    index: "04",
    title: "Moving 60 Legacy Flows Off a Sunsetting iPaaS",
    summary:
      "A forced platform migration used as an excuse to delete a third of the flows and put the rest under version control and CI.",
    metric: "60 flows, 21 retired",
    year: "2023",
    role: "Implementation lead",
    duration: "7 months",
    tags: ["Migration", "CI/CD", "Governance"],
    accent: "#38e1cf",
    imageLabel: "Flow inventory board",
    context:
      "SAMPLE: The vendor announced end-of-life with twelve months' notice. Sixty flows existed; nobody had a list of which ones still mattered.",
    problem: [
      "Flows were edited in a browser with no diff, review, or history.",
      "Ownership was unknown for roughly half the inventory.",
      "A hard vendor deadline with no option to slip.",
    ],
    approach: [
      {
        title: "Inventory and traffic-rank everything",
        body: "Instrumented every flow for 30 days. Twenty-one had not fired once; they were retired with sign-off instead of migrated.",
      },
      {
        title: "Code, not canvas",
        body: "Rebuilt the survivors as versioned services with contract tests in CI. A flow change now goes through review like any other code.",
      },
      {
        title: "Strangler cutover",
        body: "Routed per-flow through a facade so each one could move independently, with rollback measured in minutes.",
      },
      {
        title: "Leave a runbook behind",
        body: "Every migrated flow shipped with an owner, an alert, and a one-page runbook. No flow goes live without all three.",
      },
    ],
    flow: ["Inventory", "Traffic ranking", "Rebuild + tests", "Facade routing", "Decommission"],
    outcome: [
      { value: "39", label: "flows migrated on schedule" },
      { value: "21", label: "flows retired, not rebuilt" },
      { value: "−34%", label: "platform spend after cutover" },
    ],
    stack: ["Azure Functions", "Service Bus", "GitHub Actions", "Bicep", "App Insights"],
    learned:
      "SAMPLE: The cheapest migration is the one you do not do. Measuring usage first saved more time than any tooling decision.",
  },
];

export const process = [
  {
    title: "Read the contract, not the diagram",
    body: "Architecture slides lie by omission. The payload, the error codes, and the retry semantics are the real interface.",
  },
  {
    title: "Assume every upstream will misbehave",
    body: "Duplicates, out-of-order delivery, and nulls in required fields are normal traffic. Design for them on day one.",
  },
  {
    title: "Observability before go-live",
    body: "Correlation ids, per-step metrics, and a replay path. If support can't answer 'where is my order?', it isn't shipped.",
  },
  {
    title: "Cut over boringly",
    body: "Shadow run, diff, flip a flag, keep the rollback within reach. Exciting go-lives are a planning failure.",
  },
];

export const toolbox = [
  { group: "Integration", items: ["REST", "SOAP", "GraphQL", "Webhooks", "gRPC", "EDI / SFTP"] },
  { group: "Messaging", items: ["Kafka", "RabbitMQ", "Azure Service Bus", "SQS / SNS"] },
  { group: "Platforms", items: ["MuleSoft", "Boomi", "Mirth", "Workato", "Azure Functions"] },
  { group: "Languages", items: ["Java", "Python", "TypeScript", "SQL", "Bash"] },
  { group: "Ops", items: ["Kubernetes", "Terraform", "GitHub Actions", "Datadog", "Grafana"] },
  { group: "Security", items: ["OAuth2", "mTLS", "JWT", "HMAC signing", "Secret rotation"] },
];

export const timeline = [
  {
    period: "2023 — now",
    role: "Senior Integration Engineer",
    org: "SAMPLE Company A",
    note: "Owns the partner integration platform and the on-call rotation that comes with it.",
  },
  {
    period: "2021 — 2023",
    role: "Implementation Engineer",
    org: "SAMPLE Company B",
    note: "Enterprise rollouts: discovery, data migration, UAT, go-live, hypercare.",
  },
  {
    period: "2019 — 2021",
    role: "Systems Analyst",
    org: "SAMPLE Company C",
    note: "Middleware support, batch jobs, and the first taste of 3am pager duty.",
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
    src: assetPath("/about/aakash-portrait.webp"),
    alt: "Portrait wearing a charcoal blazer in a warmly lit interior",
    caption: "A little about me",
    ratio: "portrait",
  },
  {
    src: assetPath("/about/city-portrait.webp"),
    alt: "Standing on a rooftop with the city skyline behind",
    caption: "A moment in the city",
    ratio: "square",
  },
  {
    src: assetPath("/about/clouds-portrait.webp"),
    alt: "Relaxing above the clouds in a white shirt",
    caption: "A change in perspective",
    ratio: "square",
  },
];

export const about = {
  heading: "Systems-minded, detail-obsessed, allergic to surprise go-lives.",
  paragraphs: [
    "SAMPLE: I'm Aakash Kumar. I work in the layer between systems — the adapters, contracts and cutover plans that decide whether a shiny roadmap actually reaches production.",
    "Most of my work is unglamorous on purpose: mapping fields, arguing about idempotency, running the shadow comparison for one more week. The result is a go-live where nothing interesting happens.",
    "Outside the day job I take apart APIs for fun and keep a growing collection of other people's error codes.",
  ],
  ps: "ps: if the dashboard is boring, I did my job.",
};
