import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Blog = () => {
  const { t, isHindi } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isHindi ? 'वास्तु ब्लॉग' : 'Vastu Blog'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isHindi 
              ? 'वास्तु शास्त्र के बारे में नवीनतम टिप्स और जानकारी' 
              : 'Latest tips and insights about Vastu Shastra'
            }
          </p>
        </div>

        <div className="card">
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {isHindi 
              ? 'ब्लॉग सामग्री जल्द ही उपलब्ध होगी।' 
              : 'Blog content will be available soon.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;

