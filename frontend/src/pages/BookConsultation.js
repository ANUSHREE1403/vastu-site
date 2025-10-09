import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';

const BookConsultation = () => {
  const { t, isHindi } = useLanguage();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    state: user?.state || '',
    occupation: user?.occupation || '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    consultationType: 'house'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const consultationTypes = [
    { value: 'house', label: isHindi ? 'घर के लिए वास्तु' : 'Vastu for House' },
    { value: 'office', label: isHindi ? 'कार्यालय के लिए वास्तु' : 'Vastu for Office' },
    { value: 'career', label: isHindi ? 'करियर के लिए वास्तु' : 'Vastu for Career' },
    { value: 'wealth', label: isHindi ? 'धन के लिए वास्तु' : 'Vastu for Wealth' },
    { value: 'health', label: isHindi ? 'स्वास्थ्य के लिए वास्तु' : 'Vastu for Health' },
    { value: 'marriage', label: isHindi ? 'विवाह के लिए वास्तु' : 'Vastu for Marriage' },
    { value: 'education', label: isHindi ? 'शिक्षा के लिए वास्तु' : 'Vastu for Education' },
    { value: 'relationship', label: isHindi ? 'रिश्तों के लिए वास्तु' : 'Vastu for Relationships' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultations/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${localStorage.getItem('vastu-shakti-token')}` })
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(isHindi ? 'परामर्श सफलतापूर्वक बुक हो गया!' : 'Consultation booked successfully!');
        setFormData({
          name: user?.name || '',
          email: user?.email || '',
          mobile: user?.mobile || '',
          state: user?.state || '',
          occupation: user?.occupation || '',
          preferredDate: '',
          preferredTime: '',
          message: '',
          consultationType: 'house'
        });
      } else {
        toast.error(data.message || (isHindi ? 'कुछ त्रुटि हुई है' : 'Something went wrong'));
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(isHindi ? 'कुछ त्रुटि हुई है' : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isHindi ? 'मुफ्त वास्तु परामर्श बुक करें' : 'Book Free Vastu Consultation'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {isHindi 
              ? 'हमारे विशेषज्ञों से मुफ्त परामर्श प्राप्त करें और अपने जीवन में सकारात्मक बदलाव लाएं' 
              : 'Get free consultation from our experts and bring positive changes to your life'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FiUser className="w-5 h-5 mr-2 text-blue-600" />
                    {isHindi ? 'व्यक्तिगत जानकारी' : 'Personal Information'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">
                        {isHindi ? 'नाम *' : 'Name *'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder={isHindi ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                      />
                    </div>
                    
                    <div>
                      <label className="form-label">
                        {isHindi ? 'ईमेल *' : 'Email *'}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder={isHindi ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">
                        {isHindi ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder={isHindi ? 'अपना मोबाइल नंबर दर्ज करें' : 'Enter your mobile number'}
                      />
                    </div>
                    
                    <div>
                      <label className="form-label">
                        {isHindi ? 'राज्य *' : 'State *'}
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder={isHindi ? 'अपना राज्य दर्ज करें' : 'Enter your state'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      {isHindi ? 'व्यवसाय *' : 'Occupation *'}
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder={isHindi ? 'अपना व्यवसाय दर्ज करें' : 'Enter your occupation'}
                    />
                  </div>
                </div>

                {/* Consultation Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FiCalendar className="w-5 h-5 mr-2 text-blue-600" />
                    {isHindi ? 'परामर्श विवरण' : 'Consultation Details'}
                  </h3>
                  
                  <div>
                    <label className="form-label">
                      {isHindi ? 'परामर्श प्रकार *' : 'Consultation Type *'}
                    </label>
                    <select
                      name="consultationType"
                      value={formData.consultationType}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      {consultationTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">
                        {isHindi ? 'पसंदीदा तारीख *' : 'Preferred Date *'}
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="form-input"
                      />
                    </div>
                    
                    <div>
                      <label className="form-label">
                        {isHindi ? 'पसंदीदा समय *' : 'Preferred Time *'}
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">
                          {isHindi ? 'समय चुनें' : 'Select Time'}
                        </option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="form-label">
                      {isHindi ? 'संदेश' : 'Message'}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="form-input"
                      placeholder={isHindi ? 'अपना संदेश यहाँ लिखें (वैकल्पिक)' : 'Write your message here (optional)'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isHindi ? 'बुक हो रहा है...' : 'Booking...'}
                    </>
                  ) : (
                    <>
                      <FiCalendar className="w-5 h-5 mr-2" />
                      {isHindi ? 'परामर्श बुक करें' : 'Book Consultation'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {isHindi ? 'संपर्क जानकारी' : 'Contact Information'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiPhone className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-400">+91-9739400311</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-400">vastu.shakti1@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {isHindi ? 'भारत' : 'India'}
                  </span>
                </div>
              </div>
            </div>

            {/* Process Info */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {isHindi ? 'प्रक्रिया' : 'How It Works'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isHindi 
                        ? 'अपनी पसंदीदा तारीख और समय चुनें' 
                        : 'Select your preferred date and time'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">2</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isHindi 
                        ? 'हमारी टीम आपसे संपर्क करेगी' 
                        : 'Our team will contact you'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">3</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isHindi 
                        ? 'समस्या का विश्लेषण करें और समाधान दें' 
                        : 'Analyze the problem and provide solution'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
