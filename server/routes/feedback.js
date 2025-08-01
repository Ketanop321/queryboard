const express = require('express');
const router = express.Router();
const {
  createFeedback,
  getFeedbacks,
} = require('../controllers/feedbackController');

/**
 * @route   POST /api/feedback
 * @desc    Create new feedback
 * @access  Public
 */
router.post('/', createFeedback);

/**
 * @route   GET /api/feedback
 * @desc    Get all feedbacks
 * @access  Public
 */
router.get('/', getFeedbacks);

module.exports = router;
