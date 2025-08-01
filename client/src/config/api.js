// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://queryboard.onrender.com';

// API Endpoints
export const ENDPOINTS = {
  ASK: `${API_BASE_URL}/api/ask`,
  // Add other endpoints here as needed
};

console.log('API Base URL:', API_BASE_URL); // For debugging
