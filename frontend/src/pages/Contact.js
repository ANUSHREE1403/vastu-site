import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { contactService } from '../services/api';
import SEO from '../components/SEO';

const Contact = () => {
  const { isHindi } = useLanguage();
  
  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Feedback form state
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comments: ''
  });

  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // Handle enquiry form submission
  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingEnquiry(true);

    try {
      await contactService.submitInquiry(enquiryForm);
      toast.success(isHindi ? 'आपकी जांच सफलतापूर्वक भेजी गई!' : 'Your inquiry submitted successfully!');
      setEnquiryForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(isHindi ? 'त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'Error occurred. Please try again.');
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingFeedback(true);

    try {
      await contactService.submitFeedback(feedbackForm);
      toast.success(isHindi ? 'आपकी प्रतिक्रिया सफलतापूर्वक भेजी गई!' : 'Your feedback submitted successfully!');
      setFeedbackForm({ name: '', email: '', rating: 5, comments: '' });
    } catch (error) {
      toast.error(isHindi ? 'त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'Error occurred. Please try again.');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <SEO title={"Vastu shakti by Sumedha chandra Contact-us page"} description={"Transform your life with Vastu Shakti - Ancient Vastu Shastra wisdom for modern living. Book free consultation and create harmonious spaces for prosperity and happiness."} keywords={"Vastu Shakti Gurgaon, Vastu consultant in Gurgaon, Vastu expert Gurgaon, Sumedha Chandra Gurgaon, best Vastu in Gurgaon, Vastu consultant, Vastu astrologer, Vastu expert, Vastu Shakti, Delhi, Gurgaon, Noida, Faridabad, Greater Noida, Delhi NCR, Vastu for home, Vastu for office, Vastu for business, Vastu consultant near me, Vastu Shakti by Sumedha Chandra"}/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isHindi ? 'संपर्क करें' : 'Contact Us'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isHindi 
              ? 'हमसे संपर्क करें और अपने सवालों के जवाब पाएं' 
              : 'Get in touch with us and get answers to your questions'
            }
          </p>
        </div>

        {/* Contact Information */}
        <motion.div 
          className="card mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
                <FiPhone className="w-6 h-6 text-orange-500 dark:text-orange-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isHindi ? 'फोन' : 'Phone'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">+91 84487 50725</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
                <FiMail className="w-6 h-6 text-orange-500 dark:text-orange-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isHindi ? 'ईमेल' : 'Email'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">vastu.shakti1@gmail.com</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
                <FiMapPin className="w-6 h-6 text-orange-500 dark:text-orange-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {isHindi ? 'स्थान' : 'Location'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {isHindi ? 'भारत' : 'India'}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enquiry Form */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {isHindi ? 'जांच भेजें' : 'Send Enquiry'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {isHindi 
                ? 'अपनी चिंताओं या प्रश्नों के बारे में हमसे संपर्क करें' 
                : 'Contact us about your concerns or questions'
              }
            </p>
            
            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isHindi ? 'नाम' : 'Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({...enquiryForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={isHindi ? 'आपका नाम' : 'Your name'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isHindi ? 'ईमेल' : 'Email'} *
                </label>
                <input
                  type="email"
                  required
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={isHindi ? 'आपका ईमेल' : 'Your email'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isHindi ? 'विषय' : 'Subject'} *
                </label>
                <input
                  type="text"
                  required
                  value={enquiryForm.subject}
                  onChange={(e) => setEnquiryForm({...enquiryForm, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={isHindi ? 'विषय' : 'Subject'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isHindi ? 'संदेश' : 'Message'} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm({...enquiryForm, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={isHindi ? 'अपना संदेश यहाँ लिखें...' : 'Write your message here...'}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmittingEnquiry}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmittingEnquiry ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FiSend className="w-5 h-5 mr-2" />
                    {isHindi ? 'जांच भेजें' : 'Send Enquiry'}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Feedback Form */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {isHindi ? 'प्रतिक्रिया दें' : 'Give Feedback'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {isHindi 
                ? 'हमारी सेवा के बारे में अपनी प्रतिक्रिया साझा करें' 
                : 'Share your feedback about our service'
              }
            </p>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isHindi ? 'नाम' : 'Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={feedbackForm.name}
                  onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={isHindi ? 'आपका नाम' : 'Your name'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isHindi ? 'ईमेल' : 'Email'} *
                </label>
                <input
                  type="email"
                  required
                  value={feedbackForm.email}
                  onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={isHindi ? 'आपका ईमेल' : 'Your email'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isHindi ? 'रेटिंग' : 'Rating'} *
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedbackForm({...feedbackForm, rating: star})}
                      className="focus:outline-none"
                    >
                      <FiStar 
                        className={`w-6 h-6 ${
                          star <= feedbackForm.rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {feedbackForm.rating}/5
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {isHindi ? 'टिप्पणियाँ' : 'Comments'} *
                </label>
                <textarea
                  required
                  rows={4}
                  value={feedbackForm.comments}
                  onChange={(e) => setFeedbackForm({...feedbackForm, comments: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder={isHindi ? 'अपनी टिप्पणियाँ यहाँ लिखें...' : 'Write your comments here...'}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmittingFeedback}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmittingFeedback ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FiStar className="w-5 h-5 mr-2" />
                    {isHindi ? 'प्रतिक्रिया भेजें' : 'Submit Feedback'}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
