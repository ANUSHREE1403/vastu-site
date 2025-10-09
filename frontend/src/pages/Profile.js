import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar, 
  FiClock,
  FiEdit2,
  FiSave,
  FiX
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Profile = () => {
  const { isHindi } = useLanguage();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    dateOfBirth: '',
    timeOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    occupation: ''
  });

  useEffect(() => {
    // Load user profile data
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        dateOfBirth: user.dateOfBirth || '',
        timeOfBirth: user.timeOfBirth || '',
        gender: user.gender || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        occupation: user.occupation || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // TODO: API call to update profile
      // await userService.updateProfile(profileData);
      
      // Mock success for now
      setTimeout(() => {
        toast.success(isHindi ? 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!' : 'Profile updated successfully!');
        setIsEditing(false);
        setIsSaving(false);
      }, 1000);
    } catch (error) {
      toast.error(isHindi ? 'त्रुटि हुई। कृपया पुनः प्रयास करें।' : 'Error occurred. Please try again.');
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to original user data
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        dateOfBirth: user.dateOfBirth || '',
        timeOfBirth: user.timeOfBirth || '',
        gender: user.gender || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        occupation: user.occupation || ''
      });
    }
    setIsEditing(false);
  };

  const genderOptions = [
    { value: '', label: isHindi ? 'लिंग चुनें' : 'Select Gender' },
    { value: 'male', label: isHindi ? 'पुरुष' : 'Male' },
    { value: 'female', label: isHindi ? 'महिला' : 'Female' },
    { value: 'other', label: isHindi ? 'अन्य' : 'Other' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {isHindi ? 'मेरी प्रोफ़ाइल' : 'My Profile'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isHindi 
              ? 'अपनी व्यक्तिगत जानकारी प्रबंधित करें' 
              : 'Manage your personal information'
            }
          </p>
        </motion.div>

        {/* Profile Form */}
        <motion.div 
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Edit/Save Buttons */}
          <div className="flex justify-end mb-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
              >
                <FiEdit2 className="w-4 h-4" />
                <span>{isHindi ? 'संपादित करें' : 'Edit Profile'}</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                >
                  <FiX className="w-4 h-4" />
                  <span>{isHindi ? 'रद्द करें' : 'Cancel'}</span>
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <FiSave className="w-4 h-4" />
                  )}
                  <span>{isHindi ? 'सहेजें' : 'Save'}</span>
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiUser className="w-5 h-5 mr-2 text-orange-600" />
                {isHindi ? 'बुनियादी जानकारी' : 'Basic Information'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isHindi ? 'पूरा नाम' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiMail className="w-4 h-4 inline mr-1" />
                    {isHindi ? 'ईमेल' : 'Email'} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={true}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {isHindi ? 'ईमेल बदला नहीं जा सकता' : 'Email cannot be changed'}
                  </p>
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiPhone className="w-4 h-4 inline mr-1" />
                    {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'} *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={profileData.mobile}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isHindi ? 'व्यवसाय' : 'Occupation'}
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={profileData.occupation}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder={isHindi ? 'आपका व्यवसाय' : 'Your occupation'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Birth Details */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiCalendar className="w-5 h-5 mr-2 text-orange-600" />
                {isHindi ? 'जन्म विवरण' : 'Birth Details'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isHindi ? 'जन्म तिथि' : 'Date of Birth'}
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Time of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FiClock className="w-4 h-4 inline mr-1" />
                    {isHindi ? 'जन्म समय' : 'Time of Birth'}
                  </label>
                  <input
                    type="time"
                    name="timeOfBirth"
                    value={profileData.timeOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isHindi ? 'लिंग' : 'Gender'}
                  </label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  >
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiMapPin className="w-5 h-5 mr-2 text-orange-600" />
                {isHindi ? 'पता जानकारी' : 'Address Information'}
              </h3>
              <div className="space-y-4">
                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {isHindi ? 'पता' : 'Address'}
                  </label>
                  <textarea
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={2}
                    placeholder={isHindi ? 'घर का पता' : 'Street address'}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isHindi ? 'शहर' : 'City'}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isHindi ? 'शहर' : 'City'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isHindi ? 'राज्य' : 'State'}
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={profileData.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isHindi ? 'राज्य' : 'State'}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {isHindi ? 'पिन कोड' : 'Pincode'}
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={profileData.pincode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isHindi ? 'पिन कोड' : 'Pincode'}
                      maxLength={6}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>

        {/* Info Card */}
        <motion.div 
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-sm text-blue-800 dark:text-blue-300">
            {isHindi 
              ? '💡 जन्म विवरण (तिथि, समय) और पता वास्तु परामर्श के लिए महत्वपूर्ण हैं।' 
              : '💡 Birth details (date, time) and address are important for accurate Vastu consultation.'
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

