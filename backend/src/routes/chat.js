const express = require('express');
const router = express.Router();

const replies = {
  greeting: {
    en: "Hello! How can I help you today? You can ask about booking, pricing, or contact.",
    hi: "नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं? आप बुकिंग, शुल्क या संपर्क के बारे में पूछ सकते हैं।"
  },
  appointment: {
    en: "To book a free consultation, click Book Consultation and submit your details. We’ll contact you to confirm.",
    hi: "मुफ्त परामर्श बुक करने के लिए 'Book Consultation' पर क्लिक करें और विवरण सबमिट करें। हम पुष्टि के लिए आपसे संपर्क करेंगे।"
  },
  pricing: {
    en: "Initial consultation is free. For detailed analysis, email vastu.shakti1@gmail.com or call +91 84487 50725.",
    hi: "प्रारंभिक परामर्श मुफ्त है। विस्तृत विश्लेषण के लिए vastu.shakti1@gmail.com पर ईमेल करें या +91 84487 50725 पर कॉल करें।"
  },
  contact: {
    en: "Call +91 84487 50725 or email vastu.shakti1@gmail.com (Mon–Sat, 9 AM–8 PM).",
    hi: "सोम–शनि, 9 AM–8 PM: +91 84487 50725 पर कॉल करें या vastu.shakti1@gmail.com पर ईमेल करें।"
  },
  general: {
    en: "I can help with booking, pricing, Vastu services, and contact details. What would you like to know?",
    hi: "मैं बुकिंग, शुल्क, वास्तु सेवाओं और संपर्क विवरण में मदद कर सकता हूं। आप क्या जानना चाहेंगे?"
  }
};

function detectIntent(msg = "") {
  const m = msg.toLowerCase();
  if (m.includes('hello') || m.includes('hi') || m.includes('namaste')) return 'greeting';
  if (m.includes('book') || m.includes('appointment') || m.includes('consult')) return 'appointment';
  if (m.includes('price') || m.includes('fee') || m.includes('charge')) return 'pricing';
  if (m.includes('contact') || m.includes('phone') || m.includes('email')) return 'contact';
  if (m.includes('vastu')) return 'appointment';
  return 'general';
}

router.post('/message', (req, res) => {
  try {
    const { message, language = 'en' } = req.body || {};
    const intent = detectIntent(message);
    const lang = language === 'hi' ? 'hi' : 'en';
    const response = (replies[intent] && replies[intent][lang]) || replies.general[lang];
    res.json({ response, intent });
  } catch (e) {
    console.error('Chat error:', e);
    res.json({ response: 'Sorry, something went wrong. Please try again.', intent: 'general' });
  }
});

module.exports = router;