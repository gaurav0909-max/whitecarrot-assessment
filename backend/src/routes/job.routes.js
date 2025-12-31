const express = require('express');
const auth = require('../middleware/auth');
const { listJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.get('/:slug/jobs', listJobs);
router.post('/:slug/jobs', auth, createJob);
router.put('/:slug/jobs/:id', auth, updateJob);
router.delete('/:slug/jobs/:id', auth, deleteJob);

module.exports = router;
