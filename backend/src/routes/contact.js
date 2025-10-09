const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validateRequest');
const config = require('../../config/config');

const router = express.Router();

// In-memory store for MVP
const enquiries = [];
const feedbacks = [];

router.post('/enquiry', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('mobile').matches(/^\+?91[-\s]?\d{5}[-\s]?\d{5}$|^\d{10}$/).withMessage('Valid mobile required'),
  body('subject').trim().isLength({ min: 3 }).withMessage('Subject is required'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message should be at least 10 characters'),
  validateRequest
], async (req, res) => {
  try {
    const entry = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
    enquiries.push(entry);
    res.status(201).json({ message: 'Enquiry submitted successfully', enquiryId: entry.id });
  } catch (error) {
    console.error('Enquiry submit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/feedback', [
  body('name').optional().trim(),
  body('email').optional().isEmail().withMessage('Email must be valid if provided'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating 1-5'),
  body('message').trim().isLength({ min: 5 }).withMessage('Message should be at least 5 characters'),
  validateRequest
], async (req, res) => {
  try {
    const entry = { id: Date.now().toString(), ...req.body, createdAt: new Date() };
    feedbacks.push(entry);
    res.status(201).json({ message: 'Feedback submitted successfully', feedbackId: entry.id });
  } catch (error) {
    console.error('Feedback submit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;



