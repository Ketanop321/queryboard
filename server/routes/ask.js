const express = require('express');
const router = express.Router();
const { askAI, healthCheck } = require('../controllers/askController');

/**
 * @route   POST /api/ask
 * @desc    Get AI response for a question using Google Gemini
 * @access  Public
 */
router.post('/', askAI);

module.exports = router;