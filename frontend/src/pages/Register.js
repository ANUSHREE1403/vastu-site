import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const Register = () => {
  const { isHindi } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    state: '',
    occupation: '',
    language: 'en'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        toast.success(isHindi ? 'सफलतापूर्वक रजिस्टर हुए!' : 'Registration successful!');
        navigate('/profile');
      } else {
        toast.error(result.message || (isHindi ? 'रजिस्ट्रेशन असफल' : 'Registration failed'));
      }
    } catch (error) {
      toast.error(isHindi ? 'कुछ त्रुटि हुई है' : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <SEO title={"Vastu shakti by Sumedha chandra - Register page"} description={"Transform your life with Vastu Shakti - Ancient Vastu Shastra wisdom for modern living. Book free consultation and create harmonious spaces for prosperity and happiness."} />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <div className="text-center mb-8">
            <Logo size="large" className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isHindi ? 'रजिस्टर करें' : 'Register'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isHindi ? 'एक नया खाता बनाएं' : 'Create a new account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="form-label">
                {isHindi ? 'नाम' : 'Name'}
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
                {isHindi ? 'ईमेल' : 'Email'}
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

            <div>
              <label className="form-label">
                {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'}
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
                {isHindi ? 'पासवर्ड' : 'Password'}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder={isHindi ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {isHindi ? 'रजिस्टर हो रहा है...' : 'Registering...'}
                </>
              ) : (
                isHindi ? 'रजिस्टर करें' : 'Register'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {isHindi ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
              <a href="/login" className="text-orange-500 hover:text-orange-600">
                {isHindi ? 'लॉगिन करें' : 'Login'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
