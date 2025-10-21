import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiUsers, 
  FiAward, 
  FiClock,
  FiHome,
  FiBriefcase,
  FiHeart,
  FiDollarSign,
  FiBookOpen,
  FiStar,
  FiMessageCircle
} from 'react-icons/fi';
import ReviewModal from '../components/ReviewModal';
import SEO from "../components/SEO"

const Home = () => {
  const { t, isHindi } = useLanguage();

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Top reviews data (showing 6 for preview)
  const topReviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      comment: isHindi 
        ? 'वास्तु शक्ति ने मेरे घर में अद्भुत बदलाव लाए हैं। अब मेरा परिवार अधिक खुश और समृद्ध है।'
        : 'Vastu Shakti brought amazing changes to my home. My family is now happier and more prosperous.',
      service: isHindi ? 'घर वास्तु' : 'Home Vastu'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      comment: isHindi 
        ? 'मेरे कार्यालय का वास्तु सुधार के बाद व्यापार में 40% वृद्धि हुई है। बहुत आभारी हूं।'
        : 'After Vastu correction of my office, business increased by 40%. Very grateful for the guidance.',
      service: isHindi ? 'कार्यालय वास्तु' : 'Office Vastu'
    },
    {
      id: 3,
      name: 'Sunita Patel',
      location: 'Ahmedabad',
      rating: 5,
      comment: isHindi 
        ? 'मुफ्त परामर्श से शुरुआत की और अब मेरे जीवन में इतने सकारात्मक बदलाव आए हैं।'
        : 'Started with free consultation and now there are so many positive changes in my life.',
      service: isHindi ? 'जीवन वास्तु' : 'Life Vastu'
    },
    {
      id: 4,
      name: 'Amit Singh',
      location: 'Bangalore',
      rating: 5,
      comment: isHindi 
        ? 'विशेषज्ञों का ज्ञान और मार्गदर्शन अद्वितीय है। हर सवाल का विस्तृत जवाब मिलता है।'
        : 'The expertise and guidance of specialists is unique. Every question gets detailed answers.',
      service: isHindi ? 'परामर्श' : 'Consultation'
    },
    {
      id: 5,
      name: 'Meera Joshi',
      location: 'Pune',
      rating: 5,
      comment: isHindi 
        ? 'वास्तु शक्ति के समाधानों ने मेरे स्वास्थ्य और रिश्तों में सुधार लाया है।'
        : 'Vastu Shakti solutions improved my health and relationships significantly.',
      service: isHindi ? 'स्वास्थ्य वास्तु' : 'Health Vastu'
    },
    {
      id: 6,
      name: 'Vikram Gupta',
      location: 'Chennai',
      rating: 5,
      comment: isHindi 
        ? 'धन वास्तु के लिए परामर्श लिया था। अब व्यापार में स्थिरता आई है और आय में वृद्धि हुई है।'
        : 'Took consultation for wealth Vastu. Now business has stability and income has increased.',
      service: isHindi ? 'धन वास्तु' : 'Wealth Vastu'
    }
  ];

  const features = [
    {
      icon: FiHome,
      title: isHindi ? 'घर के लिए वास्तु' : 'Vastu for House',
      description: isHindi 
        ? 'अपने घर को सामंजस्यपूर्ण और समृद्ध बनाएं' 
        : 'Create harmonious and prosperous living spaces'
    },
    {
      icon: FiBriefcase,
      title: isHindi ? 'कार्यालय के लिए वास्तु' : 'Vastu for Office',
      description: isHindi 
        ? 'व्यापार सफलता के लिए कार्यालय स्थान को अनुकूलित करें' 
        : 'Optimize office spaces for business success'
    },
    {
      icon: FiHeart,
      title: isHindi ? 'स्वास्थ्य के लिए वास्तु' : 'Vastu for Health',
      description: isHindi 
        ? 'बेहतर स्वास्थ्य और कल्याण के लिए वास्तु सिद्धांतों का उपयोग करें' 
        : 'Use Vastu principles for better health and wellness'
    },
    {
      icon: FiDollarSign,
      title: isHindi ? 'धन के लिए वास्तु' : 'Vastu for Wealth',
      description: isHindi 
        ? 'समृद्धि और वित्तीय सफलता के लिए वास्तु लागू करें' 
        : 'Apply Vastu for prosperity and financial success'
    },
    {
      icon: FiBookOpen,
      title: isHindi ? 'शिक्षा के लिए वास्तु' : 'Vastu for Education',
      description: isHindi 
        ? 'बेहतर सीखने और शैक्षणिक सफलता के लिए वास्तु' 
        : 'Vastu for better learning and academic success'
    },
    {
      icon: FiUsers,
      title: isHindi ? 'रिश्तों के लिए वास्तु' : 'Vastu for Relationships',
      description: isHindi 
        ? 'पारिवारिक सद्भाव और बेहतर रिश्तों के लिए वास्तु' 
        : 'Vastu for family harmony and better relationships'
    }
  ];

  const benefits = [
    {
      icon: FiCheckCircle,
      title: isHindi ? 'कोई संरचनात्मक परिवर्तन नहीं' : 'No Structural Changes',
      description: isHindi 
        ? 'वास्तु दोष को ठीक करने के लिए कोई संरचनात्मक परिवर्तन की आवश्यकता नहीं' 
        : 'No need for structural changes to fix Vastu dosh'
    },
    {
      icon: FiClock,
      title: isHindi ? '9-180 दिनों में परिणाम' : 'Results in 9-180 Days',
      description: isHindi 
        ? 'सकारात्मक परिणाम 9 से 180 दिनों के भीतर दिखाई देते हैं' 
        : 'Positive results visible within 9 to 180 days'
    },
    {
      icon: FiAward,
      title: isHindi ? 'प्रमाणित वास्तु विशेषज्ञ' : 'Certified Vastu Specialist',
      description: isHindi 
        ? 'अकादमी ऑफ वैदिक विद्या से प्रमाणित वास्तु विशेषज्ञ' 
        : 'Certified Vastu Specialist from Academy of Vedic Vidya'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO title={"Vastu shakti by Sumedha chandra Home page"} description={"Transform your life with Vastu Shakti - Ancient Vastu Shastra wisdom for modern living. Book free consultation and create harmonious spaces for prosperity and happiness."} keywords={"Vastu Shakti Gurgaon, Vastu consultant in Gurgaon, Vastu expert Gurgaon, Sumedha Chandra Gurgaon, best Vastu in Gurgaon, Vastu consultant, Vastu astrologer, Vastu expert, Vastu Shakti, Delhi, Gurgaon, Noida, Faridabad, Greater Noida, Delhi NCR, Vastu for home, Vastu for office, Vastu for business, Vastu consultant near me, Vastu Shakti by Sumedha Chandra"}/>
      <style>{`
        @keyframes breathGlow {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.08); opacity: 0.72; }
        }
        .circleGlow { position: absolute; inset: -6px; border-radius: 50%; pointer-events: none; }
        .circleGlow--outer { 
          background: radial-gradient(circle at 50% 50%, rgba(255,60,0,.22) 55%, rgba(255,60,0,.10) 76%, rgba(255,60,0,0) 92%);
          mix-blend-mode: screen; filter: blur(12px); animation: breathGlow 6s ease-in-out infinite;
        }
        .circleGlow--inner { 
          inset: 0; 
          background: radial-gradient(circle at 50% 50%, rgba(255,80,0,.36) 60%, rgba(255,60,0,.20) 78%, rgba(255,60,0,0) 92%);
          mix-blend-mode: multiply; filter: blur(7px);
        }
      `}</style>
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20 relative overflow-hidden min-h-[500px]">
        {/* 3D Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-600 to-orange-400 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-transparent to-red-500/20"></div>
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-bounce" style={{animationDuration: '3s', animationDelay: '0s'}}></div>
          <div className="absolute top-20 right-1/4 w-4 h-4 bg-orange-400 rounded-full opacity-60 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-red-400 rounded-full opacity-50 animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-1/3 w-3 h-3 bg-yellow-200 rounded-full opacity-80 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-orange-300 rounded-full opacity-60 animate-bounce" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}></div>
          <div className="absolute top-2/3 right-1/6 w-3 h-3 bg-red-300 rounded-full opacity-70 animate-bounce" style={{animationDuration: '3.8s', animationDelay: '2.5s'}}></div>
        </div>

        {/* Left Side Symbol Container - Fixed positioning */}
        <div className="absolute left-0 top-0 bottom-0 w-[300px] md:w-[400px] flex items-center justify-start z-10 pointer-events-none">
          <div className="relative w-full aspect-square max-h-[400px] md:max-h-[500px] opacity-95"
               style={{
                 marginLeft: '-20%',
                 transform: 'perspective(1000px) rotateY(-8deg)',
                 borderRadius: '50%',
                 overflow: 'hidden',
                 background: 'transparent',
                 WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 92%, transparent 100%)',
                 maskImage: 'radial-gradient(circle at 50% 50%, black 92%, transparent 100%)',
                 boxShadow: '0 14px 28px rgba(0,0,0,0.12), 0 0 36px rgba(255,170,0,0.25)'
               }}>
            <img
              src="/vastu-symbol-right.webp"
              alt="Vastu Symbol"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.08) contrast(1.04) drop-shadow(0 0 22px rgba(255,165,0,0.28))',
                backgroundColor: 'transparent',
                objectPosition: 'center',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 77%)',
                maskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 77%)',
                transform: 'scale(1.14)',
                zIndex: 1,
                position: 'relative'
              }}
            />
            <div className="circleGlow circleGlow--inner" style={{ zIndex: 2 }} />
            <div className="circleGlow circleGlow--outer" style={{ zIndex: 1 }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                boxShadow:
                  'inset 0 10px 18px rgba(0,0,0,0.12), inset 0 -10px 18px rgba(0,0,0,0.08)',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        {/* Right Side Symbol Container - Fixed positioning */}
        <div className="absolute right-0 top-0 bottom-0 w-[300px] md:w-[400px] flex items-center justify-end z-10 pointer-events-none">
          <div className="relative w-full aspect-square max-h-[400px] md:max-h-[500px] opacity-95"
               style={{
                 marginRight: '-20%',
                 transform: 'perspective(1000px) rotateY(8deg)',
                 borderRadius: '50%',
                 overflow: 'hidden',
                 background: 'transparent',
                 WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 92%, transparent 100%)',
                 maskImage: 'radial-gradient(circle at 50% 50%, black 92%, transparent 100%)',
                 boxShadow: '0 14px 28px rgba(0,0,0,0.12), 0 0 36px rgba(255,170,0,0.25)'
               }}>
            <img
              src="/Gemini_Generated_Image_qidalwqidalwqida.webp"
              alt="Vastu Symbol"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.08) contrast(1.04) drop-shadow(0 0 22px rgba(255,140,0,0.28))',
                backgroundColor: 'transparent',
                objectPosition: 'center',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 77%)',
                maskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 77%)',
                transform: 'scale(1.14)',
                zIndex: 1,
                position: 'relative'
              }}
            />
            <div className="circleGlow circleGlow--inner" style={{ zIndex: 2 }} />
            <div className="circleGlow circleGlow--outer" style={{ zIndex: 1 }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                boxShadow:
                  'inset 0 10px 18px rgba(0,0,0,0.12), inset 0 -10px 18px rgba(0,0,0,0.08)',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center px-4 md:px-20 lg:px-32">
            <h1 className="text-2xl md:text-6xl font-bold mb-6 animate-fadeInUp">
              {isHindi ? (
                <>
                  <span className="inline-block bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)] animate-pulse">
                    सुमेधा चंद्रा
                  </span>
                  {' और वास्तु शक्ति से अपना जीवन बदलें'}
                </>
              ) : (
                <>
                  {'Transform Your Life with '}
                  <span className="inline-block bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)] animate-pulse" style={{animationDuration: '3s'}}>
                    Sumedha Chandra
                  </span>
                  {' and Vastu Shakti'}
                </>
              )}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fadeInUp">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp">
              <Link
                to="/book-consultation"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                {t('common.bookConsultation')}
                <FiArrowRight className="inline ml-2" />
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors duration-200"
              >
                {t('common.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {isHindi 
                ? 'वास्तु शक्ति के साथ अपने जीवन के हर पहलू को बेहतर बनाएं' 
                : 'Transform every aspect of your life with Vastu Shakti'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isHindi ? 'वास्तु शक्ति के लाभ' : 'Benefits of Vastu Shakti'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {isHindi 
                ? 'हमारे अनूठे वास्तु समाधान के साथ अपने जीवन को बदलें' 
                : 'Transform your life with our unique Vastu solutions'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 gradient-bg text-white relative overflow-hidden min-h-[500px]">
        {/* Left Side Symbol Container - Fixed positioning */}
        <div className="absolute left-0 top-0 bottom-0 w-[300px] md:w-[400px] flex items-center justify-start z-10 pointer-events-none">
          <div className="relative w-full aspect-square max-h-[400px] md:max-h-[500px] opacity-95"
               style={{
                 marginLeft: '-20%',
                 transform: 'perspective(1000px) rotateY(-8deg)',
                 borderRadius: '50%',
                 overflow: 'hidden',
                 background: 'transparent',
                 WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 92%, transparent 100%)',
                 maskImage: 'radial-gradient(circle at 50% 50%, black 92%, transparent 100%)',
                 boxShadow: '0 14px 28px rgba(0,0,0,0.12), 0 0 36px rgba(255,170,0,0.25)'
               }}>
            <img
              src="/Gemini_Generated_Image_rp4nrrrp4nrrrp4n.webp"
              alt="Vastu Symbol"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.08) contrast(1.04) drop-shadow(0 0 22px rgba(255,165,0,0.28))',
                backgroundColor: 'transparent',
                objectPosition: 'center',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 77%)',
                maskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 77%)',
                transform: 'scale(1.14)',
                zIndex: 1,
                position: 'relative'
              }}
            />
            <div className="circleGlow circleGlow--inner" style={{ zIndex: 2 }} />
            <div className="circleGlow circleGlow--outer" style={{ zIndex: 1 }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                boxShadow:
                  'inset 0 10px 18px rgba(0,0,0,0.12), inset 0 -10px 18px rgba(0,0,0,0.08)',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        {/* Right Side Symbol Container - Fixed positioning */}
        <div className="absolute right-0 top-0 bottom-0 w-[300px] md:w-[400px] flex items-center justify-end z-10 pointer-events-none">
          <div className="relative w-full aspect-square max-h-[400px] md:max-h-[500px] opacity-95"
               style={{
                 marginRight: '-20%',
                 transform: 'perspective(1000px) rotateY(8deg)',
                 borderRadius: '50%',
                 overflow: 'hidden',
                 background: 'transparent',
                 WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 92%, transparent 100%)',
                 maskImage: 'radial-gradient(circle at 50% 50%, black 92%, transparent 100%)',
                 boxShadow: '0 14px 28px rgba(0,0,0,0.12), 0 0 36px rgba(255,170,0,0.25)'
               }}>
            <img
              src="/Gemini_Generated_Image_rp4nrrrp4nrrrp4n.webp"
              alt="Vastu Symbol"
              className="w-full h-full object-cover"
              style={{
                filter: 'brightness(1.08) contrast(1.04) drop-shadow(0 0 22px rgba(255,140,0,0.28))',
                backgroundColor: 'transparent',
                objectPosition: 'center',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 77%)',
                maskImage: 'radial-gradient(circle at 50% 50%, black 75%, transparent 77%)',
                transform: 'scale(1.14)',
                zIndex: 1,
                position: 'relative'
              }}
            />
            <div className="circleGlow circleGlow--inner" style={{ zIndex: 2 }} />
            <div className="circleGlow circleGlow--outer" style={{ zIndex: 1 }} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                boxShadow:
                  'inset 0 10px 18px rgba(0,0,0,0.12), inset 0 -10px 18px rgba(0,0,0,0.08)',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight px-4 md:px-20 lg:px-32">
              {isHindi 
                ? 'सिर्फ जीवन नहीं, वास्तु शक्ति के साथ समृद्धि पाएं' 
                : "Don't Just Live, Prosper with Vastu Shakti"
              }
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl opacity-90 max-w-5xl mx-auto leading-relaxed">
              {isHindi 
                ? 'प्राचीन वास्तु शास्त्र के ज्ञान से अपने जीवन को सामंजस्यपूर्ण और समृद्ध बनाएं' 
                : 'Transform your life with the ancient wisdom of Vastu Shastra and create harmony and prosperity'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {isHindi ? 'ग्राहक समीक्षाएं' : 'Customer Reviews'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isHindi 
                ? 'हमारे संतुष्ट ग्राहकों की आवाज़ सुनें' 
                : 'Hear from our satisfied customers'
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {topReviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.location}
                      </p>
                    </div>
                    <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full">
                      {review.service}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Review Submission Button */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center mx-auto"
            >
              <FiMessageCircle className="w-6 h-6 mr-2" />
              {isHindi ? 'समीक्षा लिखें या पढ़ें' : 'Write or Read Reviews'}
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
              {isHindi 
                ? 'अपनी समीक्षा साझा करें या अन्य ग्राहकों की समीक्षाएं पढ़ें' 
                : 'Share your review or read other customer reviews'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            {isHindi ? 'अपना मुफ्त वास्तु परामर्श बुक करें' : 'Book Your Free Vastu Consultation'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {isHindi 
              ? 'हमारे विशेषज्ञों से मुफ्त परामर्श प्राप्त करें और अपने जीवन में सकारात्मक बदलाव लाएं' 
              : 'Get free consultation from our experts and bring positive changes to your life'
            }
          </p>
          <Link
            to="/book-consultation"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {t('common.bookConsultation')}
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Review Modal */}
      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </div>
  );
};

export default Home;
