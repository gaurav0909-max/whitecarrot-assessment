require('dotenv').config();
const db = require('../config/database');

const jobs = [
  // Engineering Jobs
  {
    title: 'Senior Full Stack Engineer',
    location: 'Berlin, Germany',
    department: 'Engineering',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '€80,000 - €120,000',
    description: 'We are looking for a Senior Full Stack Engineer to join our growing engineering team. You will work on building scalable web applications using modern technologies.'
  },
  {
    title: 'Frontend Developer',
    location: 'Remote',
    department: 'Engineering',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$90,000 - $130,000',
    description: 'Join our team as a Frontend Developer and help us build beautiful, responsive user interfaces using React, Next.js, and TypeScript.'
  },
  {
    title: 'Backend Engineer',
    location: 'San Francisco, CA',
    department: 'Engineering',
    work_policy: 'On-site',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$120,000 - $160,000',
    description: 'We need a Backend Engineer to design and implement scalable APIs and microservices. Experience with Node.js, Python, or Go required.'
  },
  {
    title: 'DevOps Engineer',
    location: 'London, UK',
    department: 'Engineering',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '£70,000 - £100,000',
    description: 'Looking for an experienced DevOps Engineer to manage our cloud infrastructure, CI/CD pipelines, and ensure high availability of our services.'
  },
  {
    title: 'Junior Software Engineer',
    location: 'Austin, TX',
    department: 'Engineering',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Junior',
    salary_range: '$70,000 - $90,000',
    description: 'Great opportunity for a Junior Software Engineer to learn and grow. You will work alongside senior engineers on real-world projects.'
  },
  {
    title: 'Mobile Developer (iOS/Android)',
    location: 'New York, NY',
    department: 'Engineering',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$110,000 - $150,000',
    description: 'We are seeking a talented Mobile Developer to build native mobile applications for iOS and Android platforms.'
  },
  {
    title: 'Data Engineer',
    location: 'Remote',
    department: 'Data',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$130,000 - $170,000',
    description: 'Join our data team to build robust data pipelines, warehouses, and analytics infrastructure. Experience with SQL, Python, and cloud platforms required.'
  },
  {
    title: 'Machine Learning Engineer',
    location: 'Seattle, WA',
    department: 'Data',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$150,000 - $200,000',
    description: 'We need an ML Engineer to develop and deploy machine learning models at scale. Strong background in Python, TensorFlow/PyTorch required.'
  },

  // Product & Design Jobs
  {
    title: 'Product Manager',
    location: 'San Francisco, CA',
    department: 'Product',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$140,000 - $180,000',
    description: 'Looking for an experienced Product Manager to define product strategy, work with engineering teams, and drive product development.'
  },
  {
    title: 'UX/UI Designer',
    location: 'Remote',
    department: 'Design',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$80,000 - $110,000',
    description: 'We are hiring a UX/UI Designer to create beautiful, intuitive user experiences. Proficiency in Figma and design systems is essential.'
  },
  {
    title: 'Product Designer',
    location: 'Amsterdam, Netherlands',
    department: 'Design',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '€60,000 - €85,000',
    description: 'Join our design team to shape the future of our products. You will work on end-to-end product design from research to visual design.'
  },

  // Marketing Jobs
  {
    title: 'Content Marketing Manager',
    location: 'Remote',
    department: 'Marketing',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$70,000 - $95,000',
    description: 'We need a Content Marketing Manager to develop and execute our content strategy, create engaging content, and drive organic growth.'
  },
  {
    title: 'Growth Marketing Lead',
    location: 'Boston, MA',
    department: 'Marketing',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$120,000 - $150,000',
    description: 'Looking for a Growth Marketing Lead to drive user acquisition, retention, and revenue growth through data-driven marketing campaigns.'
  },
  {
    title: 'Social Media Manager',
    location: 'Los Angeles, CA',
    department: 'Marketing',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Junior',
    salary_range: '$55,000 - $75,000',
    description: 'We are seeking a Social Media Manager to manage our social media presence, create engaging content, and grow our community.'
  },

  // Sales Jobs
  {
    title: 'Account Executive',
    location: 'Chicago, IL',
    department: 'Sales',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$80,000 - $120,000 + Commission',
    description: 'Join our sales team as an Account Executive. You will be responsible for prospecting, closing deals, and building relationships with customers.'
  },
  {
    title: 'Sales Development Representative',
    location: 'Remote',
    department: 'Sales',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Junior',
    salary_range: '$50,000 - $70,000 + Commission',
    description: 'Great entry-level position for someone looking to start a career in sales. You will qualify leads and set up meetings for the sales team.'
  },
  {
    title: 'Enterprise Sales Manager',
    location: 'New York, NY',
    department: 'Sales',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$150,000 - $200,000 + Commission',
    description: 'We are looking for an Enterprise Sales Manager to lead our enterprise sales efforts and close large, complex deals.'
  },

  // Customer Success & Support
  {
    title: 'Customer Success Manager',
    location: 'Remote',
    department: 'Customer Success',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$75,000 - $95,000',
    description: 'Join our Customer Success team to help customers achieve their goals, drive adoption, and ensure high satisfaction and retention.'
  },
  {
    title: 'Support Engineer',
    location: 'Denver, CO',
    department: 'Support',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Junior',
    salary_range: '$60,000 - $80,000',
    description: 'We need a Support Engineer to provide technical support to our customers, troubleshoot issues, and improve our support processes.'
  },

  // Operations & HR
  {
    title: 'Operations Manager',
    location: 'Seattle, WA',
    department: 'Operations',
    work_policy: 'On-site',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$110,000 - $140,000',
    description: 'Looking for an Operations Manager to streamline our operations, improve processes, and ensure efficient day-to-day operations.'
  },
  {
    title: 'Talent Acquisition Specialist',
    location: 'Remote',
    department: 'Human Resources',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$70,000 - $90,000',
    description: 'Join our HR team as a Talent Acquisition Specialist. You will source, screen, and hire top talent across various departments.'
  },

  // Contract & Part-time positions
  {
    title: 'Freelance Content Writer',
    location: 'Remote',
    department: 'Marketing',
    work_policy: 'Remote',
    employment_type: 'Part time',
    job_type: 'Contract',
    experience_level: 'Mid-level',
    salary_range: '$40 - $60 per hour',
    description: 'We are looking for freelance content writers to create blog posts, case studies, and marketing materials on a contract basis.'
  },
  {
    title: 'UI/UX Design Intern',
    location: 'San Francisco, CA',
    department: 'Design',
    work_policy: 'Hybrid',
    employment_type: 'Part time',
    job_type: 'Internship',
    experience_level: 'Junior',
    salary_range: '$25 - $35 per hour',
    description: 'Great internship opportunity for design students or recent graduates. You will work on real projects under the guidance of senior designers.'
  },
  {
    title: 'Software Engineering Intern',
    location: 'Austin, TX',
    department: 'Engineering',
    work_policy: 'On-site',
    employment_type: 'Part time',
    job_type: 'Internship',
    experience_level: 'Junior',
    salary_range: '$30 - $40 per hour',
    description: 'Summer internship program for computer science students. Work on meaningful projects and learn from experienced engineers.'
  },

  // More specialized roles
  {
    title: 'Security Engineer',
    location: 'Remote',
    department: 'Security',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$140,000 - $180,000',
    description: 'We need a Security Engineer to protect our infrastructure, implement security best practices, and respond to security incidents.'
  },
  {
    title: 'Business Analyst',
    location: 'Chicago, IL',
    department: 'Operations',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$85,000 - $105,000',
    description: 'Join as a Business Analyst to analyze business processes, gather requirements, and help drive data-driven decision making.'
  },
  {
    title: 'QA Engineer',
    location: 'Portland, OR',
    department: 'Engineering',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$90,000 - $115,000',
    description: 'We are hiring a QA Engineer to ensure the quality of our products through manual and automated testing.'
  },
  {
    title: 'Technical Writer',
    location: 'Remote',
    department: 'Product',
    work_policy: 'Remote',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Mid-level',
    salary_range: '$75,000 - $95,000',
    description: 'Looking for a Technical Writer to create and maintain product documentation, API docs, and help center articles.'
  },
  {
    title: 'Data Analyst',
    location: 'Boston, MA',
    department: 'Data',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Junior',
    salary_range: '$65,000 - $85,000',
    description: 'We need a Data Analyst to analyze data, create reports and dashboards, and provide insights to drive business decisions.'
  },
  {
    title: 'Engineering Manager',
    location: 'San Francisco, CA',
    department: 'Engineering',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$160,000 - $200,000',
    description: 'We are looking for an Engineering Manager to lead a team of engineers, drive technical excellence, and deliver high-quality products.'
  },
  {
    title: 'Chief Technology Officer',
    location: 'New York, NY',
    department: 'Executive',
    work_policy: 'Hybrid',
    employment_type: 'Full time',
    job_type: 'Permanent',
    experience_level: 'Senior',
    salary_range: '$250,000 - $350,000 + Equity',
    description: 'We are seeking a CTO to lead our technology strategy, build and manage engineering teams, and drive technical innovation.'
  }
];

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Create a demo company first
    const companyResult = await db.query(
      `INSERT INTO companies (name, slug, description, logo_url, banner_url, is_published)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        'TechCorp Inc',
        'techcorp',
        'We are a leading technology company building innovative products that change the world. Join our team of talented engineers, designers, and business professionals.',
        'https://via.placeholder.com/150x150?text=TechCorp',
        'https://via.placeholder.com/1200x400?text=TechCorp+Careers',
        true
      ]
    );

    const companyId = companyResult.rows[0].id;
    console.log(`Created company with ID: ${companyId}`);

    // Insert all jobs
    let insertedCount = 0;
    for (const job of jobs) {
      const slug = generateSlug(job.title);

      await db.query(
        `INSERT INTO jobs
         (company_id, title, slug, description, work_policy, location, department, employment_type, experience_level, job_type, salary_range, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          companyId,
          job.title,
          slug,
          job.description,
          job.work_policy,
          job.location,
          job.department,
          job.employment_type,
          job.experience_level,
          job.job_type,
          job.salary_range,
          true
        ]
      );

      insertedCount++;
    }

    console.log(`Successfully inserted ${insertedCount} jobs for company ${companyId}`);
    console.log('Seed completed!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
