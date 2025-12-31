const express = require('express');
const auth = require('../middleware/auth');
const { getCompany, updateCompany } = require('../controllers/companyController');

const router = express.Router();

router.get('/:slug', getCompany);
router.put('/:slug', auth, updateCompany);

module.exports = router;
