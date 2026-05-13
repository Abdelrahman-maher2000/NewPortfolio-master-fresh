export const about = {
  name: "Alex Johnson",
  title: "Product Strategist & Technologist",
  tagline:
    "I design and ship digital products that blend thoughtful strategy with modern engineering.",
  bio: "With a decade of experience across strategy, design systems, and web engineering, I help teams move from idea to launch with clarity. I enjoy collaborating with product, engineering, and stakeholders to translate complex problems into elegant, reliable solutions.",
  highlights: [
    "10+ years leading cross-functional product initiatives",
    "Strong focus on accessibility, performance, and maintainability",
    "Comfortable owning roadmaps, delivery, and stakeholder communication",
    "Hands-on with design systems, component libraries, and modern tooling",
  ],
  profileImage:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
  email: "alex.johnson@example.com",
  linkedin: "https://www.linkedin.com/in/alex-johnson",
  github: "https://github.com/alexjohnson",
  cvUrl: "https://example.com/cv.pdf",
};

export const skills = [
  { id: "sk-plan-1", name: "Strategic Planning", category: "Planning", order: 1 },
  { id: "sk-plan-2", name: "Roadmapping", category: "Planning", order: 2 },
  { id: "sk-plan-3", name: "Stakeholder Alignment", category: "Planning", order: 3 },
  { id: "sk-plan-4", name: "Discovery Workshops", category: "Planning", order: 4 },
  { id: "sk-web-1", name: "React", category: "Web/Tech", order: 1 },
  { id: "sk-web-2", name: "Next.js", category: "Web/Tech", order: 2 },
  { id: "sk-web-3", name: "Node.js", category: "Web/Tech", order: 3 },
  { id: "sk-web-4", name: "Tailwind CSS", category: "Web/Tech", order: 4 },
  { id: "sk-web-5", name: "GraphQL", category: "Web/Tech", order: 5 },
  { id: "sk-ai-1", name: "Prompt Design", category: "AI/Automation", order: 1 },
  { id: "sk-ai-2", name: "Workflow Automation", category: "AI/Automation", order: 2 },
  { id: "sk-ai-3", name: "Data Pipelines", category: "AI/Automation", order: 3 },
  { id: "sk-tools-1", name: "Figma", category: "Tools", order: 1 },
  { id: "sk-tools-2", name: "Jira / Linear", category: "Tools", order: 2 },
  { id: "sk-tools-3", name: "Notion", category: "Tools", order: 3 },
  { id: "sk-tools-4", name: "Git & GitHub", category: "Tools", order: 4 },
];

export const projects = [
  {
    id: "proj-analytics",
    title: "Analytics Experience",
    slug: "analytics-experience",
    description: "Reimagined the analytics dashboard for faster insights across web and mobile.",
    problem:
      "Teams lacked a single source of truth for product metrics, leading to slow decision-making and fragmented reporting.",
    role: "Product Strategy, UX Architecture, Frontend Lead",
    solution:
      "Partnered with stakeholders to consolidate KPIs, designed a modular dashboard, and built reusable charting components for consistency.",
    tools: ["Product briefs", "User journeys", "Component library"],
    techStack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    coverImage:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    ],
    liveUrl: "https://example.com/analytics",
    githubUrl: "https://github.com/alexjohnson/analytics-experience",
    featured: true,
    published: true,
    order: 1,
  },
  {
    id: "proj-onboarding",
    title: "Onboarding Revamp",
    slug: "onboarding-revamp",
    description: "Reduced onboarding drop-off by designing a guided, personalized flow.",
    problem:
      "New users felt overwhelmed by choices and unclear setup steps, causing a high abandonment rate.",
    role: "Product Design, Frontend Development",
    solution:
      "Introduced a progressive profiling wizard, contextual tips, and better defaults informed by research.",
    tools: ["User interviews", "Flow mapping", "Usability testing"],
    techStack: ["React", "Next.js", "Tailwind CSS"],
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
    ],
    liveUrl: "https://example.com/onboarding",
    githubUrl: "https://github.com/alexjohnson/onboarding-revamp",
    featured: true,
    published: true,
    order: 2,
  },
  {
    id: "proj-design-system",
    title: "Design System Rollout",
    slug: "design-system",
    description: "Built a scalable design system adopted by multiple product squads.",
    problem:
      "Inconsistent UI patterns slowed delivery and created accessibility issues across surfaces.",
    role: "Design System Lead, Frontend Architecture",
    solution:
      "Created a token-driven system, documented usage guidelines, and shipped a React component library with automated visual regression tests.",
    tools: ["Design tokens", "Storybook", "ARIA reviews"],
    techStack: ["React", "Tailwind CSS", "Storybook"],
    coverImage:
      "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503389152951-9f343605f61e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
    ],
    liveUrl: "https://example.com/design-system",
    githubUrl: "https://github.com/alexjohnson/design-system",
    featured: false,
    published: true,
    order: 3,
  },
];

export const certificates = [
  {
    id: "cert-pm",
    title: "Product Management",
    issuer: "General Assembly",
    date: "2023-05-10",
    credentialUrl: "https://example.com/certificates/pm",
    order: 1,
  },
  {
    id: "cert-aws",
    title: "AWS Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "2022-11-02",
    credentialUrl: "https://aws.amazon.com/certification",
    order: 2,
  },
];

export const initialData = {
  about,
  skills,
  projects,
  certificates,
};

