const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Company = require('../models/Company');

// Register - creates company + user
const register = async (req, res) => {
  try {
    const { email, password, companyName, companySlug } = req.body;

    // Check if email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check if company slug already exists
    const existingCompany = await Company.findBySlug(companySlug);
    if (existingCompany) {
      return res.status(400).json({ error: 'Company slug already taken' });
    }

    // Hash password (simple, 10 rounds)
    const hash = await bcrypt.hash(password, 10);

    // Create company first
    const company = await Company.create(companyName, companySlug);

    // Create user linked to company
    const user = await User.create(email, hash, company.id);

    // Simple JWT (7 day expiry)
    const token = jwt.sign(
      { userId: user.id, companyId: company.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      companySlug: company.slug,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Simple JWT (7 day expiry)
    const token = jwt.sign(
      { userId: user.id, companyId: user.company_id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      companySlug: user.company_slug,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
