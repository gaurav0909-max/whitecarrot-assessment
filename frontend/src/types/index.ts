export interface Company {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  department: string;
  job_type: string;
  work_policy?: string;
  experience_level?: string;
  salary_range?: string;
  created_at: string;
}

export interface JobInput {
  title: string;
  description: string;
  department: string;
  location: string;
  job_type: string;
  work_policy?: string;
  experience_level?: string;
  salary_range?: string;
}

export interface AuthResponse {
  token: string;
  company: Company;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  companyName: string;
  companySlug: string;
}
