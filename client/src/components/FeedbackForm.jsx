import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';

const FeedbackForm = ({ onFeedbackSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'feature',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onFeedbackSubmit(formData);
      // Reset form on success
      setFormData({
        title: '',
        category: 'feature',
        description: ''
      });
      toast.success('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card p-6 mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Share Your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input w-full"
            placeholder="Briefly describe your feedback"
            required
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="feature">Feature Request</option>
            <option value="bug">Bug Report</option>
            <option value="improvement">Improvement</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input w-full"
            placeholder="Please provide detailed feedback..."
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <PaperAirplaneIcon className="h-5 w-5" />
                Submit Feedback
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
