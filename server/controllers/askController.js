const fetch = require('node-fetch');

/**
 * @desc    Get AI response from Hugging Face
 * @route   POST /api/ask
 * @access  Public
 */
exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string' || question.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid question'
      });
    }

    // Check if API key is configured
    if (!process.env.HF_API_KEY) {
      console.error('Hugging Face API key is not configured');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error',
        error: 'API key not configured'
      });
    }

    const response = await fetch(
      'https://api-inference.huggingface.co/models/google/flan-t5-small',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: question,
          parameters: {
            max_length: 100,
            temperature: 0.7,
            do_sample: true
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Hugging Face API error:', error);
      return res.status(response.status).json({
        success: false,
        message: 'Error from AI service',
        error: error
      });
    }

    const data = await response.json();
    
    res.status(200).json({
      success: true,
      data: {
        question,
        answer: data[0]?.generated_text || "I'm not sure how to respond to that."
      }
    });

  } catch (error) {
    console.error('Error in askAI:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
