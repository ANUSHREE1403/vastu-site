import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const Dashboard = () => {
  const { t, isHindi } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <SEO title={"Vastu shakti by Sumedha chandra - Dashboard page"} description={"Transform your life with Vastu Shakti - Ancient Vastu Shastra wisdom for modern living. Book free consultation and create harmonious spaces for prosperity and happiness."} keywords={"Vastu, Vastu consultant, Vastu astrologer, Delhi, Gurgaon, Noida, Faridabad, Greater Noida, Delhi NCR"}/>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isHindi ? 'डैशबोर्ड' : 'Dashboard'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isHindi 
              ? 'अपने परामर्श और खाता जानकारी प्रबंधित करें' 
              : 'Manage your consultations and account information'
            }
          </p>
        </div>

        <div className="card">
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {isHindi 
              ? 'डैशबोर्ड सामग्री जल्द ही उपलब्ध होगी।' 
              : 'Dashboard content will be available soon.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

