import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FiMessageCircle, FiX, FiSend, FiMinimize2 } from 'react-icons/fi';

const ChatBot = () => {
  const { t, isHindi } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const sessionId = useRef(Date.now().toString());
  // API base (frontend/.env -> REACT_APP_API_URL). Fallback to localhost for dev.
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message when chat opens
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        message: isHindi 
          ? 'नमस्ते! मैं वास्तु शक्ति में आपकी मदद कर सकता हूं। आप कैसे मदद चाहते हैं?' 
          : 'Hello! I can help you with Vastu Shakti. How can I assist you?',
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, isHindi, messages.length]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      message: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: sessionId.current,
          language: isHindi ? 'hi' : 'en'
        })
      });

      const data = await response.json();

      const text = data?.response || (isHindi
        ? 'क्षमा करें, इस समय उत्तर उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।'
        : 'Sorry, I could not get a response. Please try again.');

      const botMessage = {
        id: Date.now() + 1,
        message: text,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        message: isHindi 
          ? 'क्षमा करें, कुछ त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें।' 
          : 'Sorry, there was an error. Please try again later.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    {
      en: 'How to book a consultation?',
      hi: 'परामर्श कैसे बुक करें?'
    },
    {
      en: 'What is Vastu Shastra?',
      hi: 'वास्तु शास्त्र क्या है?'
    },
    {
      en: 'What are the consultation fees?',
      hi: 'परामर्श शुल्क क्या है?'
    },
    {
      en: 'How to contact you?',
      hi: 'आपसे कैसे संपर्क करें?'
    },
    {
      en: 'vastu.shakti1@gmail.com',
      hi: 'vastu.shakti1@gmail.com'
    },
    {
      en: '+91 84487 50725',
      hi: '+91 84487 50725'
    }
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    sendMessage();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110"
        >
          <FiMessageCircle className="w-7 h-7" />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-96 h-16' : 'w-96 h-[28rem]'
    }`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">VS</span>
            </div>
            <div>
              <h3 className="font-semibold">{t('chat.title')}</h3>
              <p className="text-xs opacity-90">
                {isHindi ? 'वास्तु शक्ति सहायक' : 'Vastu Shakti Assistant'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
            >
              <FiMinimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {isHindi ? 'त्वरित प्रश्न:' : 'Quick questions:'}
                </p>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question[isHindi ? 'hi' : 'en'])}
                      className="w-full text-left text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-200"
                    >
                      {question[isHindi ? 'hi' : 'en']}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
