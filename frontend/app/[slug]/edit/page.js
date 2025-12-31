'use client';
import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const EMPTY_JOB = {
  title: '',
  description: '',
  location: '',
  department: '',
  work_policy: 'On-site',
  employment_type: 'Full time',
  experience_level: 'Mid-level',
  job_type: 'Permanent',
  salary_range: ''
};

export default function EditPage({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('company');
  const [saving, setSaving] = useState(false);

  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState(EMPTY_JOB);
  const [jobSaving, setJobSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchData();
  }, [slug]);

  async function fetchData() {
    try {
      const token = localStorage.getItem('token');
      const [companyRes, jobsRes] = await Promise.all([
        axios.get(`${API_URL}/companies/${slug}`),
        axios.get(`${API_URL}/companies/${slug}/jobs`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setCompany(companyRes.data);
      setJobs(jobsRes.data);
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }

  async function saveCompany() {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/companies/${slug}`, company, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Company updated successfully!');
    } catch (error) {
      alert('Failed to update company');
    } finally {
      setSaving(false);
    }
  }

  function openJobModal(job = null) {
    if (job) {
      setEditingJob(job);
      setJobForm({ ...job });
    } else {
      setEditingJob(null);
      setJobForm(EMPTY_JOB);
    }
    setShowJobModal(true);
  }

  function closeJobModal() {
    setShowJobModal(false);
    setEditingJob(null);
    setJobForm(EMPTY_JOB);
  }

  async function saveJob() {
    setJobSaving(true);
    try {
      const token = localStorage.getItem('token');

      if (editingJob) {
        await axios.put(
          `${API_URL}/companies/${slug}/jobs/${editingJob.id}`,
          jobForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobs(jobs.map(j => j.id === editingJob.id ? { ...editingJob, ...jobForm } : j));
        alert('Job updated successfully!');
      } else {
        const res = await axios.post(
          `${API_URL}/companies/${slug}/jobs`,
          jobForm,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobs([...jobs, res.data]);
        alert('Job created successfully!');
      }

      closeJobModal();
    } catch (error) {
      alert('Failed to save job');
    } finally {
      setJobSaving(false);
    }
  }

  async function deleteJob(jobId) {
    if (!confirm('Delete this job?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/companies/${slug}/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(jobs.filter(j => j.id !== jobId));
    } catch (error) {
      alert('Failed to delete job');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Edit Careers Page</h1>
            <div className="flex gap-4">
              <a
                href={`/${slug}/careers`}
                target="_blank"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                👁️ View Public Page
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('companySlug');
                  router.push('/login');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b flex">
            <button
              onClick={() => setActiveTab('company')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'company'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏢 Company Info
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'jobs'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💼 Jobs ({jobs.length})
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'company' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows="4"
                    value={company.description || ''}
                    onChange={(e) => setCompany({ ...company, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell candidates about your company..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
                    <input
                      type="url"
                      value={company.logo_url || ''}
                      onChange={(e) => setCompany({ ...company, logo_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banner URL</label>
                    <input
                      type="url"
                      value={company.banner_url || ''}
                      onChange={(e) => setCompany({ ...company, banner_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/banner.png"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={company.theme?.primary_color || '#3B82F6'}
                        onChange={(e) => setCompany({
                          ...company,
                          theme: { ...company.theme, primary_color: e.target.value }
                        })}
                        className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={company.theme?.primary_color || '#3B82F6'}
                        onChange={(e) => setCompany({
                          ...company,
                          theme: { ...company.theme, primary_color: e.target.value }
                        })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={company.theme?.secondary_color || '#1F2937'}
                        onChange={(e) => setCompany({
                          ...company,
                          theme: { ...company.theme, secondary_color: e.target.value }
                        })}
                        className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={company.theme?.secondary_color || '#1F2937'}
                        onChange={(e) => setCompany({
                          ...company,
                          theme: { ...company.theme, secondary_color: e.target.value }
                        })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={saveCompany}
                    disabled={saving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
                  >
                    {saving ? 'Saving...' : '💾 Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    Manage your job listings below. Create, edit, or delete jobs.
                  </p>
                  <button
                    onClick={() => openJobModal()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    ➕ Create Job
                  </button>
                </div>

                {jobs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 mb-4">No jobs yet. Create one to get started!</p>
                    <button
                      onClick={() => openJobModal()}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      ➕ Create Your First Job
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {jobs.map(job => (
                      <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                              <span>📍 {job.location}</span>
                              <span>💼 {job.job_type}</span>
                              <span>👥 {job.experience_level}</span>
                              {job.salary_range && <span>💰 {job.salary_range}</span>}
                            </div>
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{job.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => openJobModal(job)}
                              className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm font-medium"
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => deleteJob(job.id)}
                              className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm font-medium"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {editingJob ? '✏️ Edit Job' : '➕ Create New Job'}
              </h2>
              <button
                onClick={closeJobModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  rows="4"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., San Francisco, CA or Remote"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Engineering"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Policy</label>
                  <select
                    value={jobForm.work_policy}
                    onChange={(e) => setJobForm({ ...jobForm, work_policy: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>On-site</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                  <select
                    value={jobForm.employment_type}
                    onChange={(e) => setJobForm({ ...jobForm, employment_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Full time</option>
                    <option>Part time</option>
                    <option>Contract</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    value={jobForm.experience_level}
                    onChange={(e) => setJobForm({ ...jobForm, experience_level: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Junior</option>
                    <option>Mid-level</option>
                    <option>Senior</option>
                    <option>Lead</option>
                    <option>Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select
                    value={jobForm.job_type}
                    onChange={(e) => setJobForm({ ...jobForm, job_type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Permanent</option>
                    <option>Contract</option>
                    <option>Internship</option>
                    <option>Temporary</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <input
                  type="text"
                  value={jobForm.salary_range}
                  onChange={(e) => setJobForm({ ...jobForm, salary_range: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., $80,000 - $120,000"
                />
              </div>
            </div>

            <div className="p-6 border-t flex justify-end gap-3 sticky bottom-0 bg-white">
              <button
                onClick={closeJobModal}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveJob}
                disabled={jobSaving || !jobForm.title || !jobForm.description || !jobForm.location}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
              >
                {jobSaving ? 'Saving...' : editingJob ? '💾 Update Job' : '➕ Create Job'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
