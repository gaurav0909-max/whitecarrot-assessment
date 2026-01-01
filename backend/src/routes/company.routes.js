const express = require('express');
const auth = require('../middleware/auth');
const { getCompany, updateCompany, updateTheme, togglePublish } = require('../controllers/companyController');

const router = express.Router();

router.get('/:slug', getCompany);
router.put('/:slug', auth, updateCompany);
router.put('/:slug/theme', auth, updateTheme);
router.put('/:slug/publish', auth, togglePublish);

module.exports = router;
