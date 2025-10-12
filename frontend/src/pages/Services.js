import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiMessageCircle, FiHeart, FiStar } from 'react-icons/fi';
import SEO from '../components/SEO';

const Services = () => {
  const { t, isHindi } = useLanguage();

  // Three-step process
  const processSteps = [
    {
      step: 1,
      title: isHindi ? 'मुफ्त परामर्श प्राप्त करें' : 'Get Free Consultation',
      description: isHindi 
        ? 'हमारे प्रमाणित वास्तु विशेषज्ञों से मुफ्त प्रारंभिक परामर्श प्राप्त करें और अपनी समस्याओं की पहचान करें।'
        : 'Get a free initial consultation from our certified Vastu experts and identify your specific challenges.',
      icon: FiCheckCircle,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      step: 2,
      title: isHindi ? 'अपने संदेह और प्रश्न पूछें' : 'Ask Your Doubts & Queries',
      description: isHindi 
        ? 'वास्तु शास्त्र के बारे में अपने सभी संदेह और प्रश्न पूछें। हमारे विशेषज्ञ आपको विस्तृत उत्तर देंगे।'
        : 'Ask all your doubts and questions about Vastu Shastra. Our experts will provide detailed answers.',
      icon: FiMessageCircle,
      color: 'text-blue-500 dark:text-blue-300'
    },
    {
      step: 3,
      title: isHindi ? 'समाधान प्राप्त करें' : 'Get Remedies',
      description: isHindi 
        ? 'अपनी समस्याओं के लिए व्यक्तिगत वास्तु समाधान और उपचार प्राप्त करें जो आपके जीवन में सकारात्मक बदलाव लाएंगे।'
        : 'Receive personalized Vastu solutions and remedies for your problems that will bring positive changes to your life.',
      icon: FiHeart,
      color: 'text-orange-500 dark:text-orange-300'
    }
  ];

  // Top reviews data
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
    }
  ];

  const services = [
    {
      title: isHindi ? 'घर के लिए वास्तु' : 'Vastu for House',
      description: isHindi 
        ? 'अपने घर को सामंजस्यपूर्ण और समृद्ध बनाएं' 
        : 'Create harmonious and prosperous living spaces',
      features: [
        isHindi ? 'मुख्य द्वार वास्तु' : 'Main Door Vastu',
        isHindi ? 'रसोई वास्तु' : 'Kitchen Vastu',
        isHindi ? 'बेडरूम वास्तु' : 'Bedroom Vastu',
        isHindi ? 'पूजा कक्ष वास्तु' : 'Pooja Room Vastu'
      ]
    },
    {
      title: isHindi ? 'कार्यालय के लिए वास्तु' : 'Vastu for Office',
      description: isHindi 
        ? 'व्यापार सफलता के लिए कार्यालय स्थान को अनुकूलित करें' 
        : 'Optimize office spaces for business success',
      features: [
        isHindi ? 'व्यापार वास्तु' : 'Business Vastu',
        isHindi ? 'कॉर्पोरेट वास्तु' : 'Corporate Vastu',
        isHindi ? 'कार्यक्षेत्र वास्तु' : 'Workplace Vastu'
      ]
    },
    {
      title: isHindi ? 'जीवन के लिए वास्तु' : 'Vastu for Life',
      description: isHindi 
        ? 'जीवन के हर पहलू को बेहतर बनाएं' 
        : 'Transform every aspect of your life',
      features: [
        isHindi ? 'करियर वास्तु' : 'Career Vastu',
        isHindi ? 'धन वास्तु' : 'Wealth Vastu',
        isHindi ? 'स्वास्थ्य वास्तु' : 'Health Vastu',
        isHindi ? 'विवाह वास्तु' : 'Marriage Vastu',
        isHindi ? 'शिक्षा वास्तु' : 'Education Vastu',
        isHindi ? 'रिश्ते वास्तु' : 'Relationship Vastu'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <SEO title={"Vastu shakti by Sumedha chandra Services page"} description={"Transform your life with Vastu Shakti - Ancient Vastu Shastra wisdom for modern living. Book free consultation and create harmonious spaces for prosperity and happiness."} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {isHindi ? 'हमारी सेवाएं' : 'Our Services'}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {isHindi 
              ? 'वास्तु शक्ति के साथ अपने जीवन के हर पहलू को बेहतर बनाएं' 
              : 'Transform every aspect of your life with Vastu Shakti'
            }
          </p>
        </div>

        {/* Three-Step Process */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {isHindi ? 'हमारी प्रक्रिया' : 'Our Process'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isHindi 
                ? 'सिर्फ 3 आसान चरणों में अपने जीवन को बदलें' 
                : 'Transform your life in just 3 easy steps'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="card text-center p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-6`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <div className="text-2xl font-bold text-orange-500 dark:text-orange-300 mb-2">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Services Grid */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {isHindi ? 'वास्तु सेवाएं' : 'Vastu Services'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isHindi 
                ? 'हमारी विशेषज्ञता के क्षेत्र' 
                : 'Areas of our expertise'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-400">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Top Reviews Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {isHindi ? 'ग्राहक समीक्षाएं' : 'Customer Reviews'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {isHindi 
                ? 'हमारे संतुष्ट ग्राहकों की आवाज़ सुनें' 
                : 'Hear from our satisfied customers'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </motion.section>
      </div>
    </div>
  );
};

export default Services;

