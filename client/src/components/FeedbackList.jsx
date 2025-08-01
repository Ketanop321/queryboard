import { useEffect, useState } from 'react';
import { ChatBubbleLeftRightIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const categoryColors = {
  feature: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  bug: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  improvement: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  other: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
};

const categoryIcons = {
  feature: <TagIcon className="h-4 w-4" />,
  bug: <TagIcon className="h-4 w-4" />,
  improvement: <TagIcon className="h-4 w-4" />,
  other: <TagIcon className="h-4 w-4" />,
};

const FeedbackList = ({ feedbacks, isLoading, error }) => {
  const [localFeedbacks, setLocalFeedbacks] = useState(feedbacks || []);

  // Update local state when props change
  useEffect(() => {
    if (feedbacks) {
      setLocalFeedbacks(feedbacks);
    }
  }, [feedbacks]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
        <p>Error loading feedback: {error}</p>
      </div>
    );
  }

  if (localFeedbacks.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No feedback yet</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Feedback
      </h2>
      
      <AnimatePresence>
        {localFeedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="card p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {feedback.title}
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                categoryColors[feedback.category] || categoryColors.other
              }`}>
                {categoryIcons[feedback.category] || categoryIcons.other}
                <span className="ml-1 capitalize">
                  {feedback.category}
                </span>
              </span>
            </div>
            
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {feedback.description}
            </p>
            
            <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="flex-shrink-0 h-4 w-4 mr-1" />
              <span>
                {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackList;
