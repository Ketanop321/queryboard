import { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ENDPOINTS } from '../config/api';

const AskAI = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast.error('Please enter a question');
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: question,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    // Add user message to conversation
    setConversation(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch(ENDPOINTS.ASK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Remove credentials: 'include' since we're not using cookies/sessions
        // credentials: 'include',
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Server error response:', data);
        throw new Error(data.message || 'Failed to get response from AI');
      }
      
      if (!data || !data.data || !data.data.answer) {
        console.error('Unexpected response format:', data);
        throw new Error('Unexpected response from AI service');
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        text: data.data.answer,
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast.error('Failed to get response from AI. Please try again.');
      
      // Add error message to conversation
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again later.',
        isUser: false,
        isError: true,
        timestamp: new Date().toISOString(),
      };
      
      setConversation(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-6 mb-8">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
          <SparklesIcon className="h-5 w-5" />
        </div>
        <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
          Ask Me Anything
        </h2>
      </div>
      
      <div className="mb-4 h-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        {conversation.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <SparklesIcon className="h-10 w-10 mb-2 text-gray-300 dark:text-gray-600" />
            <p>Ask me anything about our service or product!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {conversation.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-900 dark:text-primary-100 rounded-br-none'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm'
                    } ${message.isError ? 'border-l-4 border-red-500' : ''}`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs opacity-50 mt-1 text-right">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
            
            {isLoading && (
              <div className="flex items-center space-x-2 p-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask me anything..."
          className="input flex-1"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="btn btn-secondary px-4"
        >
          {isLoading ? (
            '...'
          ) : (
            <>
              <PaperAirplaneIcon className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AskAI;
