const express = require('express');
const cors = require('cors');
require('dotenv').config();
const feedbackRoutes = require('./routes/feedback');
const askRoutes = require('./routes/ask');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://queryboard.onrender.com',
  'https://queryboard.vercel.app',
  'https://queryboard-ketan-kumars-projects-a5bf36ef.vercel.app',
  'https://queryboard-git-main-ketan-kumars-projects-a5bf36ef.vercel.app'
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
app.use(express.json());

// Routes
app.use('/api/feedback', feedbackRoutes);
app.use('/api/ask', askRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
