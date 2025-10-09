const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const config = require('../../config/config');
const Contact = require('../models/Contact');
const Feedback = require('../models/Feedback');
const { sendEnquiryNotification, sendFeedbackNotification } = require('../utils/emailService');

const router = express.Router();

router.post('/enquiry', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('mobile').matches(/^\+?91[-\s]?\d{5}[-\s]?\d{5}$|^\d{10}$/).withMessage('Valid mobile required'),
  body('subject').trim().isLength({ min: 3 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message should be at least 10 characters'),
  validateRequest
], async (req, res) => {
  try {
    // Create contact entry in database
    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      subject: req.body.subject,
      message: req.body.message
    });
    
    await contact.save();
    
    // Send email notifications (async, don't wait)
    sendEnquiryNotification(contact).catch(err => console.error('Email error:', err));
    
    res.status(201).json({ 
      success: true,
      message: 'Enquiry submitted successfully', 
      enquiryId: contact._id 
    });
  } catch (error) {
    console.error('Enquiry submit error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/feedback', [
  body('name').optional().trim(),
  body('email').optional().isEmail().withMessage('Email must be valid if provided'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating 1-5'),
  body('comments').trim().isLength({ min: 5 }).withMessage('Comments should be at least 5 characters'),
  body('service').optional().trim(),
  validateRequest
], async (req, res) => {
  try {
    // Create feedback entry in database
    const feedback = new Feedback({
      name: req.body.name,
      email: req.body.email,
      rating: req.body.rating,
      comments: req.body.comments,
      service: req.body.service
    });
    
    await feedback.save();
    
    // Send email notification (async, don't wait)
    sendFeedbackNotification(feedback).catch(err => console.error('Email error:', err));
    
    res.status(201).json({ 
      success: true,
      message: 'Feedback submitted successfully', 
      feedbackId: feedback._id 
    });
  } catch (error) {
    console.error('Feedback submit error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all feedbacks (public - only published)
router.get('/feedback', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-__v');
    
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.error('Get feedbacks error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;



