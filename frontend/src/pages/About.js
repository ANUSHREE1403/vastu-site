import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const About = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            {isHindi ? "वास्तु शक्ति के बारे में" : "About Vastu Shakti"}
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {isHindi
              ? "समयातीत वास्तु शास्त्र की शक्ति से जीवन को सशक्त बनाना"
              : "Empowering lives through the timeless wisdom of Vastu Shastra"}
          </p>
        </motion.div>

        <div className="space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <h2 className="text-2xl text-center md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {isHindi ? "हमारी कहानी" : "Our Story"}
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                {isHindi
                  ? "वास्तु शक्ति प्राचीन भारतीय ज्ञान के प्रति गहरे सम्मान और आधुनिक जीवन में इसे सुलभ बनाने की प्रतिबद्धता से जन्मा। हमारा मानना है कि जिन स्थानों में हम रहते हैं, वे हमारे स्वास्थ्य, सफलता और खुशी को गहराई से प्रभावित करते हैं।"
                  : "Vastu Shakti was born from a deep reverence for ancient Indian wisdom and a commitment to making it accessible to modern lives. Our journey began with a simple yet profound realization: the spaces we inhabit profoundly impact our well-being, success, and happiness."}
              </p>
              <p>
                {isHindi
                  ? "वास्तु शास्त्र के पवित्र विज्ञान से प्रेरित होकर, हम लोगों को उनके घरों और कार्यस्थलों की छिपी संभावनाओं को खोलने में मदद करते हैं—बिना तोड़-फोड़ या बड़े बदलाव के।"
                  : "Drawing from the sacred science of Vastu Shastra, we help individuals and families unlock the hidden potential of their living and working spaces—without demolition or major alterations."}
              </p>
              <p>
                {isHindi
                  ? "हमारे प्रमाणित विशेषज्ञ परंपरा और व्यावहारिकता का संतुलन रखते हैं, जिससे हर समाधान व्यक्तिगत, व्यवहारिक और प्रभावी होता है।"
                  : "Our certified experts balance tradition with practicality—every consultation is personalized, every solution is practical, and every recommendation is designed for tangible, positive change."}
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="card"
          >
            <h2 className="text-2xl text-center md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {isHindi ? "हमारा दृष्टिकोण" : "Our Vision"}
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                {isHindi
                  ? "हम ऐसी दुनिया की कल्पना करते हैं जहाँ हर व्यक्ति सामंजस्यपूर्ण जीवन-स्थानों की शक्ति का अनुभव करे—जहाँ स्वास्थ्य, समृद्धि और संबंध स्वाभाविक रूप से प्रफुल्लित हों।"
                  : "We envision a world where every individual experiences the transformative power of harmonious living spaces—homes that radiate positivity and offices that foster success and creativity."}
              </p>
              <p>
                {isHindi
                  ? "हमारा लक्ष्य प्राचीन ज्ञान और आधुनिक आकांक्षाओं के बीच पुल बनना है, ताकि आप केवल जीवित न रहें, बल्कि सचमुच समृद्धि पाएं।"
                  : "At Vastu Shakti, we aspire to be the bridge between ancient wisdom and modern aspirations—so you don't just live, but truly prosper."}
              </p>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
          >
            <h2 className="text-2xl text-center md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {isHindi ? "हमारा मिशन" : "Our Mission"}
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
              <li>
                •{" "}
                {isHindi
                  ? "बिना किसी संरचनात्मक बदलाव के व्यक्तिगत समाधान"
                  : "Personalized Vastu solutions with no structural changes"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "9 से 180 दिनों में मापनीय परिणाम"
                  : "Measurable results within 9 to 180 days"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "शिक्षा और जागरूकता"
                  : "Educating people about the impact of their spaces"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "प्रमाणित विशेषज्ञों द्वारा मार्गदर्शन"
                  : "Guidance by certified Vastu specialists"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "स्वास्थ्य, धन, संबंध और समग्र कल्याण में सुधार"
                  : "Lasting improvements in health, wealth, relationships, and well-being"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "प्रामाणिक ज्ञान को आधुनिक ज़रूरतों के अनुकूल बनाना"
                  : "Preserving authentic wisdom while adapting to modern needs"}
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="card"
          >
            <h2 className="text-2xl text-center md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {isHindi ? "हम क्यों?" : "Why Trust Vastu Shakti?"}
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                •{" "}
                {isHindi
                  ? "अकादमी ऑफ वैदिक विद्या से प्रमाणित विशेषज्ञ"
                  : "Certified by the Academy of Vedic Vidya"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "सैकड़ों संतुष्ट ग्राहकों का भरोसा"
                  : "Proven track record with hundreds of satisfied clients"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "व्यावहारिक और किफायती समाधान"
                  : "Practical, affordable, and non-disruptive solutions"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "समग्र दृष्टिकोण"
                  : "Holistic approach that creates comprehensive harmony"}
              </li>
              <li>
                •{" "}
                {isHindi
                  ? "करुणामय और गोपनीय मार्गदर्शन"
                  : "Compassionate guidance with confidentiality"}
              </li>
            </ul>
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="card mt-8"
          >
            <h2 className="text-3xl text-center underline md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {isHindi ? "सुमेधा चंद्र के बारे में" : "About Our Specialist Sumedha Chandra"}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {isHindi
                ? "सुमेधा चंद्र एक योग्य वास्तु सलाहकार और विशेषज्ञ हैं, जिनकी पृष्ठभूमि B.Tech इंजीनियरिंग में है। उनका वास्तु शास्त्र में सफर कुछ वर्षों पहले शुरू हुआ, जो प्राचीन विज्ञान में गहरी रुचि से प्रेरित था।"
                : "Sumedha Chandra is a qualified Vastu Consultant and Specialist with a background in B.Tech Engineering. Her journey into the world of Vastu Shastra began a few years ago, inspired by a deep fascination with the ancient science of spatial harmony and energy balance."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {isHindi
                ? "प्रारंभ में वास्तु विद्या से उत्साहित, सुमेधा ने इसके गहरे आयामों और संबंधित विषयों जैसे फेंग शुई (सेंसु) और ऊर्जा संरेखण प्रथाओं का अध्ययन किया। इस खोज में, उन्होंने वास्तु शास्त्र के दर्शन और विज्ञान के साथ एक गहरा संबंध पाया।"
                : "Initially intrigued by Vastu Vidya, Sumedha’s curiosity led her to explore its deeper dimensions, as well as related disciplines such as Feng Shui (Sensu) and other energy alignment practices. Through this exploration, she discovered a profound connection with the philosophy and science behind Vastu Shastra one that blended seamlessly with her analytical and technical mindset."}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {isHindi
                ? "आज, सुमेधा अपने इंजीनियरिंग सटीकता को सहज समझ के साथ मिलाकर ऐसे स्थान बनाती हैं जो सकारात्मकता, शांति और समृद्धि को बढ़ावा देते हैं। उनका कार्य प्रामाणिकता, वैज्ञानिक तर्क और लोगों की भलाई में वास्तविक रुचि से प्रेरित है।"
                : "Today, Sumedha combines her engineering precision with intuitive understanding to create spaces that foster positivity, peace, and prosperity. Her work is guided by authenticity, scientific reasoning, and a genuine passion for helping people live and work in environments that support their overall well-being."}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {isHindi
                ? "चाहे वह घर हो, कार्यस्थल या वाणिज्यिक स्थान, सुमेधा चंद्र का मिशन यह है कि आधुनिक जीवन में समयहीन वास्तु सिद्धांत लाया जाए—जहां ऊर्जा आसानी से बहती है और जीवन स्वाभाविक रूप से संतुलित महसूस होता है।"
                : "Whether designing harmonious homes, balanced workplaces, or energizing commercial spaces, Sumedha Chandra’s mission is to bring the timeless principles of Vastu into modern living creating surroundings where energy flows effortlessly, and life feels naturally aligned."}
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default About;
