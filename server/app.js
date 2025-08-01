const express = require('express');
const cors = require('cors');
require('dotenv').config();
const feedbackRoutes = require('./routes/feedback');
const askRoutes = require('./routes/ask');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app-url.vercel.app' // Replace with your Vercel app URL
  ],
  credentials: true
}));
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
