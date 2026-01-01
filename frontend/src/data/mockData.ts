import { Company, Job } from "@/types";

export const mockCompany: Company = {
  id: 1,
  name: "TechCorp Inc",
  slug: "techcorp",
  logo_url: "https://via.placeholder.com/64",
  description: "Building the future of technology, one innovation at a time. Join our team of world-class engineers and designers."
};

export const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    description: "We're looking for an experienced frontend engineer to join our team and help build amazing user interfaces. You'll work with React, TypeScript, and modern tooling.",
    location: "San Francisco, CA",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Senior",
    salary_range: "$140k - $180k",
    created_at: "2024-12-15T10:00:00Z"
  },
  {
    id: 2,
    title: "Product Designer",
    description: "Join our design team to create beautiful, intuitive user experiences. We're looking for someone passionate about design systems and user research.",
    location: "Remote",
    department: "Design",
    job_type: "Full-time",
    work_policy: "Remote",
    experience_level: "Mid Level",
    salary_range: "$100k - $140k",
    created_at: "2024-12-14T10:00:00Z"
  },
  {
    id: 3,
    title: "Backend Engineer",
    description: "Build scalable backend systems using Node.js, PostgreSQL, and cloud infrastructure. Experience with microservices is a plus.",
    location: "New York, NY",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "On-site",
    experience_level: "Mid Level",
    salary_range: "$120k - $160k",
    created_at: "2024-12-13T10:00:00Z"
  },
  {
    id: 4,
    title: "Marketing Manager",
    description: "Lead our marketing initiatives and drive brand awareness. Experience with B2B SaaS marketing preferred.",
    location: "Austin, TX",
    department: "Marketing",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Senior",
    salary_range: "$110k - $150k",
    created_at: "2024-12-12T10:00:00Z"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    description: "Manage our cloud infrastructure, CI/CD pipelines, and ensure system reliability. AWS experience required.",
    location: "Seattle, WA",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Remote",
    experience_level: "Senior",
    salary_range: "$150k - $190k",
    created_at: "2024-12-11T10:00:00Z"
  },
  {
    id: 6,
    title: "Sales Representative",
    description: "Join our sales team to help grow our customer base. We're looking for motivated individuals with excellent communication skills.",
    location: "Boston, MA",
    department: "Sales",
    job_type: "Full-time",
    work_policy: "On-site",
    experience_level: "Entry Level",
    salary_range: "$60k - $80k + Commission",
    created_at: "2024-12-10T10:00:00Z"
  },
  {
    id: 7,
    title: "Data Scientist",
    description: "Analyze large datasets to drive business decisions. Experience with Python, SQL, and machine learning required.",
    location: "Remote",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Remote",
    experience_level: "Mid Level",
    salary_range: "$130k - $170k",
    created_at: "2024-12-09T10:00:00Z"
  },
  {
    id: 8,
    title: "HR Coordinator",
    description: "Support our HR team with recruiting, onboarding, and employee relations. Great opportunity to grow in HR.",
    location: "San Francisco, CA",
    department: "HR",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Entry Level",
    salary_range: "$55k - $70k",
    created_at: "2024-12-08T10:00:00Z"
  },
  {
    id: 9,
    title: "UX Researcher",
    description: "Conduct user research to inform product decisions. Experience with qualitative and quantitative research methods.",
    location: "Los Angeles, CA",
    department: "Design",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Mid Level",
    salary_range: "$95k - $125k",
    created_at: "2024-12-07T10:00:00Z"
  },
  {
    id: 10,
    title: "Financial Analyst",
    description: "Support financial planning and analysis. Strong Excel and modeling skills required.",
    location: "New York, NY",
    department: "Finance",
    job_type: "Full-time",
    work_policy: "On-site",
    experience_level: "Mid Level",
    salary_range: "$85k - $110k",
    created_at: "2024-12-06T10:00:00Z"
  },
  {
    id: 11,
    title: "Customer Success Manager",
    description: "Build relationships with customers and ensure their success with our platform. Experience in SaaS preferred.",
    location: "Austin, TX",
    department: "Operations",
    job_type: "Full-time",
    work_policy: "Remote",
    experience_level: "Mid Level",
    salary_range: "$80k - $100k",
    created_at: "2024-12-05T10:00:00Z"
  },
  {
    id: 12,
    title: "Mobile Developer",
    description: "Build cross-platform mobile applications using React Native. iOS and Android experience preferred.",
    location: "Remote",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Remote",
    experience_level: "Senior",
    salary_range: "$140k - $175k",
    created_at: "2024-12-04T10:00:00Z"
  },
  {
    id: 13,
    title: "Content Writer",
    description: "Create engaging content for our blog, social media, and marketing materials. Strong writing skills essential.",
    location: "Remote",
    department: "Marketing",
    job_type: "Part-time",
    work_policy: "Remote",
    experience_level: "Entry Level",
    salary_range: "$40k - $55k",
    created_at: "2024-12-03T10:00:00Z"
  },
  {
    id: 14,
    title: "QA Engineer",
    description: "Ensure product quality through manual and automated testing. Experience with Selenium or Cypress preferred.",
    location: "Seattle, WA",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Mid Level",
    salary_range: "$90k - $120k",
    created_at: "2024-12-02T10:00:00Z"
  },
  {
    id: 15,
    title: "Product Manager",
    description: "Define and drive product strategy. Work closely with engineering and design to deliver impactful features.",
    location: "San Francisco, CA",
    department: "Product",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Senior",
    salary_range: "$150k - $190k",
    created_at: "2024-12-01T10:00:00Z"
  },
  {
    id: 16,
    title: "Security Engineer",
    description: "Protect our systems and data from security threats. Experience with security audits and penetration testing.",
    location: "Remote",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Remote",
    experience_level: "Senior",
    salary_range: "$160k - $200k",
    created_at: "2024-11-30T10:00:00Z"
  },
  {
    id: 17,
    title: "Account Executive",
    description: "Drive new business and manage enterprise accounts. 3+ years of B2B sales experience required.",
    location: "New York, NY",
    department: "Sales",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Mid Level",
    salary_range: "$90k - $120k + Commission",
    created_at: "2024-11-29T10:00:00Z"
  },
  {
    id: 18,
    title: "Graphic Designer",
    description: "Create visual assets for marketing and product. Proficiency in Figma and Adobe Creative Suite required.",
    location: "Los Angeles, CA",
    department: "Design",
    job_type: "Full-time",
    work_policy: "On-site",
    experience_level: "Mid Level",
    salary_range: "$75k - $95k",
    created_at: "2024-11-28T10:00:00Z"
  },
  {
    id: 19,
    title: "Engineering Intern",
    description: "Summer internship program for students interested in software engineering. Learn from experienced mentors.",
    location: "San Francisco, CA",
    department: "Engineering",
    job_type: "Internship",
    work_policy: "On-site",
    experience_level: "Entry Level",
    salary_range: "$30/hour",
    created_at: "2024-11-27T10:00:00Z"
  },
  {
    id: 20,
    title: "Technical Writer",
    description: "Write technical documentation, API guides, and user manuals. Technical background preferred.",
    location: "Remote",
    department: "Product",
    job_type: "Contract",
    work_policy: "Remote",
    experience_level: "Mid Level",
    salary_range: "$70k - $90k",
    created_at: "2024-11-26T10:00:00Z"
  },
  {
    id: 21,
    title: "Operations Manager",
    description: "Oversee daily operations and process improvements. Strong organizational and leadership skills required.",
    location: "Austin, TX",
    department: "Operations",
    job_type: "Full-time",
    work_policy: "On-site",
    experience_level: "Senior",
    salary_range: "$100k - $130k",
    created_at: "2024-11-25T10:00:00Z"
  },
  {
    id: 22,
    title: "Machine Learning Engineer",
    description: "Design and implement ML models for production systems. Experience with TensorFlow or PyTorch required.",
    location: "Seattle, WA",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Senior",
    salary_range: "$170k - $220k",
    created_at: "2024-11-24T10:00:00Z"
  },
  {
    id: 23,
    title: "Recruiter",
    description: "Source and hire top talent for our growing team. Tech recruiting experience preferred.",
    location: "Remote",
    department: "HR",
    job_type: "Full-time",
    work_policy: "Remote",
    experience_level: "Mid Level",
    salary_range: "$70k - $90k",
    created_at: "2024-11-23T10:00:00Z"
  },
  {
    id: 24,
    title: "Business Analyst",
    description: "Bridge the gap between business needs and technical solutions. SQL and data analysis skills required.",
    location: "Boston, MA",
    department: "Product",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Mid Level",
    salary_range: "$85k - $110k",
    created_at: "2024-11-22T10:00:00Z"
  },
  {
    id: 25,
    title: "Social Media Manager",
    description: "Manage our social media presence and grow our online community. Creative and data-driven approach.",
    location: "Remote",
    department: "Marketing",
    job_type: "Full-time",
    work_policy: "Remote",
    experience_level: "Entry Level",
    salary_range: "$55k - $70k",
    created_at: "2024-11-21T10:00:00Z"
  },
  {
    id: 26,
    title: "Solutions Architect",
    description: "Design technical solutions for enterprise customers. Strong communication and technical skills required.",
    location: "New York, NY",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Lead",
    salary_range: "$180k - $230k",
    created_at: "2024-11-20T10:00:00Z"
  },
  {
    id: 27,
    title: "Office Manager",
    description: "Keep our office running smoothly. Handle facilities, vendor management, and office events.",
    location: "San Francisco, CA",
    department: "Operations",
    job_type: "Full-time",
    work_policy: "On-site",
    experience_level: "Entry Level",
    salary_range: "$50k - $65k",
    created_at: "2024-11-19T10:00:00Z"
  },
  {
    id: 28,
    title: "VP of Engineering",
    description: "Lead our engineering organization and drive technical strategy. 10+ years of engineering experience required.",
    location: "San Francisco, CA",
    department: "Engineering",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Lead",
    salary_range: "$250k - $350k",
    created_at: "2024-11-18T10:00:00Z"
  },
  {
    id: 29,
    title: "Legal Counsel",
    description: "Handle contracts, compliance, and legal matters. JD and 5+ years of corporate law experience required.",
    location: "New York, NY",
    department: "Operations",
    job_type: "Full-time",
    work_policy: "Hybrid",
    experience_level: "Senior",
    salary_range: "$180k - $220k",
    created_at: "2024-11-17T10:00:00Z"
  },
  {
    id: 30,
    title: "Design Intern",
    description: "Summer internship for aspiring product designers. Learn UX/UI design in a fast-paced startup environment.",
    location: "Los Angeles, CA",
    department: "Design",
    job_type: "Internship",
    work_policy: "On-site",
    experience_level: "Entry Level",
    salary_range: "$25/hour",
    created_at: "2024-11-16T10:00:00Z"
  }
];

// Helper to get unique values for filters
export const getUniqueLocations = (): string[] => {
  return [...new Set(mockJobs.map(job => job.location))];
};

export const getUniqueDepartments = (): string[] => {
  return [...new Set(mockJobs.map(job => job.department))];
};

export const getUniqueJobTypes = (): string[] => {
  return [...new Set(mockJobs.map(job => job.job_type))];
};
