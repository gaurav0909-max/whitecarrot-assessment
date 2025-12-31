const Job = require('../models/Job');
const Company = require('../models/Company');

const listJobs = async (req, res) => {
  try {
    const { slug } = req.params;
    const company = await Company.findBySlug(slug);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const jobs = await Job.findByCompany(company.id, req.query);
    res.json(jobs);
  } catch (error) {
    console.error('List jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

const createJob = async (req, res) => {
  try {
    const { slug } = req.params;
    const company = await Company.findBySlug(slug);

    if (!company || company.id !== req.user.companyId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const job = await Job.create(company.id, req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.update(id, req.user.companyId, req.body);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    await Job.delete(id, req.user.companyId);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};

module.exports = { listJobs, createJob, updateJob, deleteJob };
