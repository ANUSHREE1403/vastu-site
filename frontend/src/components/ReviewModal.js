import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiX, FiSend, FiUser, FiMapPin, FiCalendar } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';
import { contactService } from '../services/api';

const ReviewModal = ({ isOpen, onClose }) => {
  const { isHindi } = useLanguage();
  
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'read'
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    service: '',
    comments: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Mock reviews data (in production, this would come from API)
  const allReviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: isHindi 
        ? 'वास्तु शक्ति ने मेरे घर में अद्भुत बदलाव लाए हैं। अब मेरा परिवार अधिक खुश और समृद्ध है। विशेषज्ञों का मार्गदर्शन बहुत अच्छा था।'
        : 'Vastu Shakti brought amazing changes to my home. My family is now happier and more prosperous. The expert guidance was excellent.',
      service: isHindi ? 'घर वास्तु' : 'Home Vastu',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      comment: isHindi 
        ? 'मेरे कार्यालय का वास्तु सुधार के बाद व्यापार में 40% वृद्धि हुई है। बहुत आभारी हूं। सभी सुझाव व्यावहारिक थे।'
        : 'After Vastu correction of my office, business increased by 40%. Very grateful for the guidance. All suggestions were practical.',
      service: isHindi ? 'कार्यालय वास्तु' : 'Office Vastu',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 3,
      name: 'Sunita Patel',
      location: 'Ahmedabad',
      rating: 5,
      comment: isHindi 
        ? 'मुफ्त परामर्श से शुरुआत की और अब मेरे जीवन में इतने सकारात्मक बदलाव आए हैं। स्वास्थ्य और रिश्तों में सुधार हुआ है।'
        : 'Started with free consultation and now there are so many positive changes in my life. Health and relationships have improved.',
      service: isHindi ? 'जीवन वास्तु' : 'Life Vastu',
      date: '2024-01-08',
      verified: true
    },
    {
      id: 4,
      name: 'Amit Singh',
      location: 'Bangalore',
      rating: 5,
      comment: isHindi 
        ? 'विशेषज्ञों का ज्ञान और मार्गदर्शन अद्वितीय है। हर सवाल का विस्तृत जवाब मिलता है। सेवा बहुत अच्छी है।'
        : 'The expertise and guidance of specialists is unique. Every question gets detailed answers. Service is excellent.',
      service: isHindi ? 'परामर्श' : 'Consultation',
      date: '2024-01-05',
      verified: true
    },
    {
      id: 5,
      name: 'Meera Joshi',
      location: 'Pune',
      rating: 5,
      comment: isHindi 
        ? 'वास्तु शक्ति के समाधानों ने मेरे स्वास्थ्य और रिश्तों में सुधार लाया है। घर का वातावरण अब शांतिपूर्ण है।'
        : 'Vastu Shakti solutions improved my health and relationships significantly. Home environment is now peaceful.',
      service: isHindi ? 'स्वास्थ्य वास्तु' : 'Health Vastu',
      date: '2024-01-03',
      verified: true
    },
    {
      id: 6,
      name: 'Vikram Gupta',
      location: 'Chennai',
      rating: 5,
      comment: isHindi 
        ? 'धन वास्तु के लिए परामर्श लिया था। अब व्यापार में स्थिरता आई है और आय में वृद्धि हुई है।'
        : 'Took consultation for wealth Vastu. Now business has stability and income has increased.',
      service: isHindi ? 'धन वास्तु' : 'Wealth Vastu',
      date: '2024-01-01',
      verified: true
    }
  ];

  const serviceOptions = [
    { value: 'home', label: isHindi ? 'घर वास्तु' : 'Home Vastu' },
    { value: 'office', label: isHindi ? 'कार्यालय वास्तु' : 'Office Vastu' },
    { value: 'health', label: isHindi ? 'स्वास्थ्य वास्तु' : 'Health Vastu' },
    { value: 'wealth', label: isHindi ? 'धन वास्तु' : 'Wealth Vastu' },
    { value: 'education', label: isHindi ? 'शिक्षा वास्तु' : 'Education Vastu' },
    { value: 'relationship', label: isHindi ? 'रिश्ते वास्तु' : 'Relationship Vastu' },
    { value: 'consultation', label: isHindi ? 'परामर्श' : 'Consultation' }
  ];

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    try {
      await contactService.submitFeedback(reviewForm);
      toast.success(isHindi ? 'आपकी समीक्षा सफलतापूर्वक भेजी गई!' : 'Your review submitted successfully!');
      setReviewForm({ name: '', email: '', rating: 5, service: '', comments: '' });
      setActiveTab('read'); // Switch to read tab after submission
    } catch (error) {
      toast.error(isHindi ? 'त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'Error occurred. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isHindi ? 'hi-IN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAverageRating = () => {
    const total = allReviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / allReviews.length).toFixed(1);
  };

  const getRatingCounts = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    allReviews.forEach(review => {
      counts[review.rating]++;
    });
    return counts;
  };

  const ratingCounts = getRatingCounts();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {isHindi ? 'ग्राहक समीक्षाएं' : 'Customer Reviews'}
                </h2>
                <div className="flex items-center mt-2">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getAverageRating()}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    ({allReviews.length} {isHindi ? 'समीक्षाएं' : 'reviews'})
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <FiX className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('write')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'write'
                    ? 'text-orange-500 dark:text-orange-300 border-b-2 border-orange-500 dark:border-orange-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {isHindi ? 'समीक्षा लिखें' : 'Write Review'}
              </button>
              <button
                onClick={() => setActiveTab('read')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'read'
                    ? 'text-orange-500 dark:text-orange-300 border-b-2 border-orange-500 dark:border-orange-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {isHindi ? 'समीक्षाएं पढ़ें' : 'Read Reviews'}
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {activeTab === 'write' ? (
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {isHindi ? 'नाम' : 'Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({...reviewForm, name: e.target.value})}
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
                        value={reviewForm.email}
                        onChange={(e) => setReviewForm({...reviewForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder={isHindi ? 'आपका ईमेल' : 'Your email'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isHindi ? 'सेवा' : 'Service'} *
                    </label>
                    <select
                      required
                      value={reviewForm.service}
                      onChange={(e) => setReviewForm({...reviewForm, service: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">{isHindi ? 'सेवा चुनें' : 'Select Service'}</option>
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
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
                          onClick={() => setReviewForm({...reviewForm, rating: star})}
                          className="focus:outline-none"
                        >
                          <FiStar 
                            className={`w-8 h-8 ${
                              star <= reviewForm.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300 dark:text-gray-600'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                        {reviewForm.rating}/5
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
                      value={reviewForm.comments}
                      onChange={(e) => setReviewForm({...reviewForm, comments: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder={isHindi ? 'अपनी टिप्पणियाँ यहाँ लिखें...' : 'Write your comments here...'}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmittingReview ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <FiStar className="w-5 h-5 mr-2" />
                        {isHindi ? 'समीक्षा भेजें' : 'Submit Review'}
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  {/* Rating Summary */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      {isHindi ? 'रेटिंग सारांश' : 'Rating Summary'}
                    </h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-8">
                            {rating}
                          </span>
                          <FiStar className="w-4 h-4 text-yellow-400 fill-current mx-2" />
                          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mx-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${(ratingCounts[rating] / allReviews.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                            {ratingCounts[rating]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {allReviews.map((review) => (
                      <div key={review.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3">
                              <FiUser className="w-5 h-5 text-orange-500 dark:text-orange-300" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {review.name}
                                {review.verified && (
                                  <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                                    {isHindi ? 'सत्यापित' : 'Verified'}
                                  </span>
                                )}
                              </h4>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <FiMapPin className="w-4 h-4 mr-1" />
                                {review.location}
                                <FiCalendar className="w-4 h-4 ml-3 mr-1" />
                                {formatDate(review.date)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="flex text-yellow-400 mr-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <FiStar key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                            <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
                              {review.service}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
