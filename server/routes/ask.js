const express = require('express');
const router = express.Router();
const { askAI } = require('../controllers/askController');

/**
 * @route   POST /api/ask
 * @desc    Get AI response for a question
 * @access  Public
 */
router.post('/', askAI);

module.exports = router;
