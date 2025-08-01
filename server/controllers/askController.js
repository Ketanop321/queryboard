const fetch = require('node-fetch');

/**
 * @desc    Get AI response from Google's Gemini
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
    if (!process.env.GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error',
        error: 'API key not configured'
      });
    }

    console.log('Sending request to Gemini API...');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{
              text: question
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('Gemini API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
      } catch (e) {
        console.error('Failed to parse error response:', e);
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
      }
      throw new Error(errorData.error?.message || 'Failed to get response from Gemini API');
    }

    const data = await response.json();
    let answer = 'No response from AI';
    
    // Handle different response formats
    if (data.candidates && data.candidates[0]?.content?.parts) {
      answer = data.candidates[0].content.parts[0]?.text || answer;
    } else if (data.choices && data.choices[0]?.message?.content) {
      answer = data.choices[0].message.content;
    } else if (data.text) {
      answer = data.text;
    }
    
    console.log('Gemini API response data:', JSON.stringify(data, null, 2));

    console.log('Gemini API response received');
    
    res.status(200).json({
      success: true,
      data: {
        question,
        answer: answer.trim(),
        model: 'gemini-pro'
      }
    });
  } catch (error) {
    console.error('Error in askAI controller:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing your request',
      error: error.message
    });
  }
};
