require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
const authRoutes = require('./routes/auth.routes');
const companyRoutes = require('./routes/company.routes');
const jobRoutes = require('./routes/job.routes');

app.use('/api/auth', authRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/companies', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
