import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const companies = {
  getBySlug: (slug) => api.get(`/companies/${slug}`),
  update: (slug, data) => api.put(`/companies/${slug}`, data),
};

export const jobs = {
  list: (slug, filters) => api.get(`/companies/${slug}/jobs`, { params: filters }),
  create: (slug, data) => api.post(`/companies/${slug}/jobs`, data),
  update: (slug, id, data) => api.put(`/companies/${slug}/jobs/${id}`, data),
  delete: (slug, id) => api.delete(`/companies/${slug}/jobs/${id}`),
};

export default api;
