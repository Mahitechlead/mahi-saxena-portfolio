/**
 * Portfolio content — sourced from resume (Mahi Saxena).
 * Update `social` URLs and `project.links` when you publish repos / demos.
 * Place your PDF at `public/resume.pdf` for the download button.
 */

export const profile = {
  name: 'Mahi Saxena',
  /** Short professional headline */
  headline: 'Computer Science undergrad · Backend · CV · Data',
  /** Rotating hero lines (typing animation) */
  taglines: [
    'Scalable APIs & clean system design',
    'YOLOv8 pipelines & MERN dashboards',
    'Data pipelines that scale to 10k+ messages',
    'AI-driven products with measurable impact',
  ],
  location: 'Kanpur, India',
  email: 'mahi.cs.tech@gmail.com',
  phone: '+91 6387944206',
  summary:
    'B.Tech Computer Science (2027) with strong foundations in data structures, backend development, and data analysis. I build scalable REST APIs, AI-driven applications, and thoughtful dashboards—balancing efficient algorithms with maintainable system design.',
  strengths: [
    'End-to-end ownership from database schema to deployed APIs',
    'Performance-minded: vectorized pipelines, tuning, and profiling',
    'Comfortable across Python, Node.js, and modern web stacks',
  ],
  social: {
    /** Add your public profile URLs */
    linkedin: 'https://www.linkedin.com/in/mahi-saxena-9b5308329/',
    github: 'https://github.com/Mahitechlead',
    portfolio: 'https://mahi-saxena.netlify.app/',
  },
  resumePdfPath: '/resume.pdf',
} as const

export type Project = {
  id: string
  title: string
  period: string
  description: string
  highlights: string[]
  stack: string[]
  category: 'ml' | 'data' | 'fullstack' | 'ai'
  links: { label: string; href: string; external?: boolean }[]
}

export const projects: Project[] = [
  {
    id: 'tree-sense',
    title: 'Tree Sense',
    period: 'Nov 2025 – Present',
    description:
      'Aerial green-cover analysis using computer vision, with APIs and a MERN dashboard for environmental insights.',
    highlights: [
      'YOLOv8 pipeline with 85–90% detection accuracy on aerial imagery',
      '~30% faster inference via augmentation & hyperparameter tuning',
      'REST APIs with Node.js & Express for real-time processing',
      'MERN dashboard to visualize detections and insights',
    ],
    stack: [
      'YOLOv8',
      'Python',
      'Node.js',
      'Express',
      'MongoDB',
      'React',
      'Computer Vision',
    ],
    category: 'ml',
    links: [
      { label: 'GitHub', href: 'https://github.com/', external: true },
      { label: 'Live', href: '#contact', external: false },
    ],
  },
  {
    id: 'chat-analyzer',
    title: 'Chat Analyzer',
    period: 'Jan 2025 – Mar 2025',
    description:
      'Large-scale chat analytics with engineered features and a Streamlit interface for exploration.',
    highlights: [
      'Processed 10,000+ messages through optimized pipelines',
      '15+ analytical features: trends, heatmaps, behavioral signals',
      'Vectorized ops & preprocessing for faster turnaround',
      'Interactive Streamlit dashboard',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Data Analysis'],
    category: 'data',
    links: [{ label: 'GitHub', href: 'https://github.com/Mahitechlead/Chat_analyser', external: true },
      { label: 'Live', href: 'https://wp-chatanalyser.streamlit.app/', external: false },
    ],
  },
  {
    id: 'letskraack',
    title: 'LetsKraack',
    period: 'Aug 2025 – Oct 2025',
    description:
      'AI course generation and a low-latency voice interview simulator backed by PostgreSQL and REST APIs.',
    highlights: [
      'AI-driven course generation cutting content time ~40%',
      'Real-time voice AI interview simulator (500–2000 ms latency)',
      '9+ REST APIs with persistent conversation tracking',
      'Normalized PostgreSQL schema for scalable queries',
    ],
    stack: [
      'PostgreSQL',
      'REST APIs',
      'Python',
      'AI',
      'Voice',
      'Backend',
    ],
    category: 'ai',
    links: [{ label: 'GitHub', href: 'https://github.com/Mahitechlead/Let-s-Krack', external: true },
      { label: 'Live', href: 'https://www.letskraack.dev/', external: false}],
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'Java', 'C'],
    gradientClass: 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/5',
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Flask (basic)'],
    gradientClass: 'bg-gradient-to-br from-violet-400/20 to-violet-400/5',
  },
  {
    title: 'Databases',
    items: ['MySQL', 'PostgreSQL', 'MongoDB'],
    gradientClass: 'bg-gradient-to-br from-fuchsia-400/20 to-fuchsia-400/5',
  },
  {
    title: 'Libraries & frameworks',
    items: [
      'Pandas',
      'NumPy',
      'Scikit-Learn',
      'Streamlit',
      'React.js',
    ],
    gradientClass: 'bg-gradient-to-br from-cyan-400/15 to-violet-400/10',
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Docker (basic)', 'Postman'],
    gradientClass: 'bg-gradient-to-br from-slate-400/15 to-slate-400/5',
  },
  {
    title: 'Core CS',
    items: [
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
    gradientClass: 'bg-gradient-to-br from-emerald-400/15 to-emerald-400/5',
  },
] as const

export type TimelineItem = {
  id: string
  title: string
  org: string
  period: string
  detail: string
  kind: 'education' | 'project' | 'milestone'
}

export const timeline: TimelineItem[] = [
  {
    id: 'school',
    title: 'Intermediate (12th)',
    org: 'Subhash Public Senior Secondary School, Kanpur',
    period: 'May 2023',
    detail:
      'Passed — 73% with Physics, Chemistry, Maths, English, and P.E.',
    kind: 'milestone',
  },
  {
    id: 'psit',
    title: 'B.Tech — Computer Science & Engineering',
    org: 'Pranveer Singh Institute of Technology, Kanpur',
    period: 'Oct 2023 – Aug 2027 (expected)',
    detail: 'Aggregate 70.9%. Focus on algorithms, systems, and applied ML.',
    kind: 'education',
  },
  {
    id: 'chat-analyzer-t',
    title: 'Chat Analyzer',
    org: 'Personal / academic project',
    period: 'Jan 2025 – Mar 2025',
    detail:
      'Built analytics pipelines and a Streamlit dashboard over 10k+ messages.',
    kind: 'project',
  },
  {
    id: 'letskraack-t',
    title: 'LetsKraack',
    org: 'AI product & backend',
    period: 'Aug 2025 – Oct 2025',
    detail:
      'Course generation, voice interview simulator, PostgreSQL + REST APIs.',
    kind: 'project',
  },
  {
    id: 'tree-sense-t',
    title: 'Tree Sense',
    org: 'Computer vision & MERN',
    period: 'Nov 2025 – Present',
    detail:
      'YOLOv8 aerial detection, performance tuning, Express APIs, MERN dashboard.',
    kind: 'project',
  },
]

export const certifications = [
  {
    name: 'Foundations of Artificial Intelligence',
    issuer: 'Oracle',
    date: 'Sep 2025',
  },
  {
    name: 'Data Analytics Essential',
    issuer: 'Cisco',
    date: 'Mar 2026',
  },
  {
    name: 'Introduction to Data Science',
    issuer: 'Cisco',
    date: 'Feb 2026',
  },
  {
    name: 'Python for Data Science; HTML, CSS for AI',
    issuer: 'Infosys',
    date: '2024',
  },
] as const

export const awards = [
  {
    title: 'Winner — Tech Expo 2026',
    body: 'Tree Sense: AI-based green cover analysis system.',
  },
  {
    title: 'Finalist — Smart PSIT Hackathon 2025',
    body: 'Innovation around dispensing menstrual products across regions.',
  },
  {
    title: 'LeetCode',
    body: '200+ problems solved (arrays, sliding window, DP).',
  },
] as const

export const extracurricular = [
  'RIWE 2.0 workshop, PSIT',
  'Quantum Club, PSIT',
  'Hackathons — Tech Expo 2025, SPH 2025',
] as const
