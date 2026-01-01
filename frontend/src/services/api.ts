import axios from "axios";
import { AuthResponse, Company, Job, JobInput, LoginCredentials, RegisterCredentials } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("companySlug");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ===== AUTH API =====
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", credentials);
    return response.data;
  },

  me: async (): Promise<{ company: Company }> => {
    const response = await api.get<{ company: Company }>("/auth/me");
    return response.data;
  },
};

// ===== COMPANY API =====
export const companyApi = {
  getBySlug: async (slug: string): Promise<Company> => {
    const response = await api.get<Company>(`/company/${slug}`);
    return response.data;
  },
};

// ===== JOBS API =====
export const jobsApi = {
  getByCompanySlug: async (slug: string): Promise<Job[]> => {
    const response = await api.get<Job[]>(`/jobs/${slug}`);
    return response.data;
  },

  create: async (jobInput: JobInput): Promise<Job> => {
    const response = await api.post<Job>(`/jobs`, jobInput);
    return response.data;
  },

  update: async (id: number, jobInput: JobInput): Promise<Job> => {
    const response = await api.put<Job>(`/jobs/${id}`, jobInput);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/jobs/${id}`);
  },
};

export default api;
