import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiInstagram, 
  FiYoutube,
  FiArrowRight
} from 'react-icons/fi';

const Footer = () => {
  const { t, isHindi } = useLanguage();

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const services = [
    { label: isHindi ? 'घर के लिए वास्तु' : 'Vastu for House' },
    { label: isHindi ? 'कार्यालय के लिए वास्तु' : 'Vastu for Office' },
    { label: isHindi ? 'स्वास्थ्य के लिए वास्तु' : 'Vastu for Health' },
    { label: isHindi ? 'धन के लिए वास्तु' : 'Vastu for Wealth' },
    { label: isHindi ? 'शिक्षा के लिए वास्तु' : 'Vastu for Education' },
    { label: isHindi ? 'रिश्तों के लिए वास्तु' : 'Vastu for Relationships' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Logo size="default" />
              <div>
                <h3 className="text-xl font-bold">Vastu Shakti</h3>
                <p className="text-sm text-orange-400 font-medium">
                  {isHindi ? 'अपना जीवन बदलें' : 'Transform Your Life'}
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/vastushakti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors duration-200"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/vastushakti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors duration-200"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@VastuShakti-y71"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
              >
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {isHindi ? 'त्वरित लिंक' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                  >
                    <FiArrowRight className="w-3 h-3 mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {isHindi ? 'सेवाएं' : 'Services'}
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center cursor-pointer">
                    <FiArrowRight className="w-3 h-3 mr-2" />
                    {service.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {isHindi ? 'संपर्क जानकारी' : 'Contact Info'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400">vastu.shakti1@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400">+91 84487 50725</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMapPin className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400">
                  {isHindi ? 'भारत' : 'India'}
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                to="/book-consultation"
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('common.bookConsultation')}
                <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {isHindi ? 'नियम और शर्तें' : 'Terms & Conditions'}
              </Link>
              <Link
                to="/refund"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {isHindi ? 'रिफंड नीति' : 'Refund Policy'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
