// In-memory storage for feedback (in a production app, use a database)
let feedbacks = [];

/**
 * @desc    Create new feedback
 * @route   POST /api/feedback
 * @access  Public
 */
exports.createFeedback = (req, res) => {
  try {
    const { title, category, description } = req.body;
    
    if (!title || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, and description'
      });
    }

    const newFeedback = {
      id: Date.now().toString(),
      title,
      category,
      description,
      createdAt: new Date().toISOString()
    };

    feedbacks.unshift(newFeedback); // Add to beginning of array

    res.status(201).json({
      success: true,
      data: newFeedback
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get all feedbacks
 * @route   GET /api/feedback
 * @access  Public
 */
exports.getFeedbacks = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (error) {
    console.error('Error getting feedbacks:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
