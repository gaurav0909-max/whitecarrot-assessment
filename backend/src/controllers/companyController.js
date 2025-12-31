const Company = require('../models/Company');

const getCompany = async (req, res) => {
  try {
    const { slug } = req.params;
    const company = await Company.findBySlug(slug);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { slug } = req.params;

    // Check ownership
    const company = await Company.findBySlug(slug);
    if (!company || company.id !== req.user.companyId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updated = await Company.update(slug, req.body);
    res.json(updated);
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
};

module.exports = { getCompany, updateCompany };
