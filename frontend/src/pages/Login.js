import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const Login = () => {
  const { isHindi } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success(isHindi ? 'सफलतापूर्वक लॉगिन हुए!' : 'Login successful!');
        navigate('/profile');
      } else {
        toast.error(result.message || (isHindi ? 'लॉगिन असफल' : 'Login failed'));
      }
    } catch (error) {
      toast.error(isHindi ? 'कुछ त्रुटि हुई है' : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <SEO title={"Vastu shakti by Sumedha chandra Login page"} description={"Transform your life with Vastu Shakti - Ancient Vastu Shastra wisdom for modern living. Book free consultation and create harmonious spaces for prosperity and happiness."} />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <div className="text-center mb-8">
            <Logo size="large" className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isHindi ? 'लॉगिन करें' : 'Login'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isHindi ? 'अपने खाते में प्रवेश करें' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  {isHindi ? 'लॉगिन हो रहा है...' : 'Logging in...'}
                </>
              ) : (
                isHindi ? 'लॉगिन करें' : 'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {isHindi ? 'खाता नहीं है?' : "Don't have an account?"}{' '}
              <a href="/register" className="text-orange-500 hover:text-orange-600">
                {isHindi ? 'रजिस्टर करें' : 'Register'}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
