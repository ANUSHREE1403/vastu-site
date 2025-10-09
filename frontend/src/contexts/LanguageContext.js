import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('vastu-shakti-language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('vastu-shakti-language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'hi' : 'en');
  };

  const t = (key) => {
    const translations = {
      // Navigation
      'nav.home': { en: 'Home', hi: 'होम' },
      'nav.about': { en: 'About', hi: 'के बारे में' },
      'nav.services': { en: 'Services', hi: 'सेवाएं' },
      'nav.blog': { en: 'Blog', hi: 'ब्लॉग' },
      'nav.contact': { en: 'Contact', hi: 'संपर्क' },
      'nav.login': { en: 'Login', hi: 'लॉगिन' },
      'nav.register': { en: 'Register', hi: 'रजिस्टर' },
      'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड' },
      
      // Common
      'common.bookConsultation': { en: 'Book Consultation', hi: 'परामर्श बुक करें' },
      'common.learnMore': { en: 'Learn More', hi: 'और जानें' },
      'common.readMore': { en: 'Read More', hi: 'और पढ़ें' },
      'common.submit': { en: 'Submit', hi: 'जमा करें' },
      'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
      'common.save': { en: 'Save', hi: 'सेव करें' },
      'common.edit': { en: 'Edit', hi: 'संपादित करें' },
      'common.delete': { en: 'Delete', hi: 'हटाएं' },
      
      // Home page
      'home.hero.title': { en: 'Transform Your Life with Sumedha Chandra and Vastu Shakti', hi: 'सुमेधा चंद्रा और वास्तु शक्ति से अपना जीवन बदलें' },
      'home.hero.subtitle': { en: 'Discover the ancient wisdom of Vastu Shastra and create harmonious living spaces that bring prosperity, health, and happiness to your life.', hi: 'वास्तु शास्त्र के प्राचीन ज्ञान की खोज करें और सामंजस्यपूर्ण रहने की जगह बनाएं जो आपके जीवन में समृद्धि, स्वास्थ्य और खुशी लाती है।' },
      'home.features.title': { en: 'Why Choose Vastu Shakti?', hi: 'वास्तु शक्ति क्यों चुनें?' },
      
      // Footer
      'footer.copyright': { en: '© 2024 Vastu Shakti. All rights reserved.', hi: '© 2024 वास्तु शक्ति। सभी अधिकार सुरक्षित।' },
      'footer.description': { en: 'Transform your life with the ancient wisdom of Vastu Shastra. Create harmonious spaces for prosperity and happiness.', hi: 'वास्तु शास्त्र के प्राचीन ज्ञान से अपना जीवन बदलें। समृद्धि और खुशी के लिए सामंजस्यपूर्ण स्थान बनाएं।' },
      
      // Chat
      'chat.title': { en: 'Need Help?', hi: 'मदद चाहिए?' },
      'chat.placeholder': { en: 'Type your message...', hi: 'अपना संदेश टाइप करें...' },
      'chat.send': { en: 'Send', hi: 'भेजें' }
    };

    return translations[key]?.[language] || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isHindi: language === 'hi'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

