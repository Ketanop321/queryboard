import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import AskAI from './components/AskAI';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch feedbacks on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://queryboard.onrender.com/api/feedback');
        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        const data = await response.json();
        setFeedbacks(data.data || []);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle new feedback submission
  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const response = await fetch('https://queryboard.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const data = await response.json();
      setFeedbacks(prev => [data.data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            QueryBoard
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Feedback Form */}
          <div className="lg:col-span-1 space-y-8">
            <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
            
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                About QueryBoard
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Share your feedback or ask questions about our product. We value your input!
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">How it works:</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-disc list-inside">
                  <li>Submit feedback using the form</li>
                  <li>Ask questions to our AI assistant</li>
                  <li>View and manage all feedback in one place</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - AI Chat and Feedback List */}
          <div className="lg:col-span-2 space-y-8">
            <AskAI />
            <FeedbackList 
              feedbacks={feedbacks} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} QueryBoard. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            padding: '12px 16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-primary-500)',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-red-500)',
              secondary: 'white',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
