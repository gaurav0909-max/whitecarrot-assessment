-- Companies table
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  banner_url VARCHAR(500),
  theme JSONB DEFAULT '{"primary_color": "#3B82F6", "secondary_color": "#1F2937"}',
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table (recruiters)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  work_policy VARCHAR(50),
  location VARCHAR(255),
  department VARCHAR(100),
  employment_type VARCHAR(50),
  experience_level VARCHAR(50),
  job_type VARCHAR(50),
  salary_range VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  posted_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(company_id, slug)
);

-- Indexes for performance
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_job_type ON jobs(job_type);
CREATE INDEX idx_jobs_is_active ON jobs(is_active);
