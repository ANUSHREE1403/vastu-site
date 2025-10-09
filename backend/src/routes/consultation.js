const express = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Mock consultations storage
let mockConsultations = [];

// Mock users storage
let mockUsers = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    mobile: '9876543210',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8.5.5.5',
    state: 'Maharashtra',
    occupation: 'Software Engineer',
    language: 'en',
    role: 'user',
    isActive: true,
    lastLogin: null,
    createdAt: new Date()
  }
];

// Simple auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = mockUsers.find(u => u.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// @route   POST /api/consultations/book
// @desc    Book a consultation
// @access  Public
router.post('/book', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  // Accept Indian numbers with or without +91, spaces or dashes
  body('mobile').matches(/^\+?91[-\s]?\d{5}[-\s]?\d{5}$|^\d{10}$/).withMessage('Please provide a valid mobile number'),
  body('state').trim().notEmpty().withMessage('State is required'),
  body('occupation').trim().notEmpty().withMessage('Occupation is required'),
  body('preferredDate').isISO8601().withMessage('Please provide a valid date'),
  body('preferredTime').trim().notEmpty().withMessage('Preferred time is required'),
  body('consultationType').isIn(['house', 'office', 'career', 'wealth', 'health', 'marriage', 'education', 'relationship']).withMessage('Invalid consultation type'),
  validateRequest
], async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      state,
      occupation,
      preferredDate,
      preferredTime,
      message,
      consultationType
    } = req.body;

    // Create consultation
    const consultation = {
      id: (mockConsultations.length + 1).toString(),
      name,
      email,
      mobile,
      state,
      occupation,
      preferredDate: new Date(preferredDate),
      preferredTime,
      consultationType,
      message: message || '',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockConsultations.push(consultation);

    res.status(201).json({
      message: 'Consultation booked successfully',
      consultation: {
        id: consultation.id,
        name: consultation.name,
        email: consultation.email,
        mobile: consultation.mobile,
        state: consultation.state,
        occupation: consultation.occupation,
        preferredDate: consultation.preferredDate,
        preferredTime: consultation.preferredTime,
        consultationType: consultation.consultationType,
        message: consultation.message,
        status: consultation.status,
        createdAt: consultation.createdAt
      }
    });
  } catch (error) {
    console.error('Book consultation error:', error);
    res.status(500).json({ message: 'Server error during consultation booking' });
  }
});

// @route   GET /api/consultations/my-consultations
// @desc    Get user's consultations
// @access  Private
router.get('/my-consultations', auth, async (req, res) => {
  try {
    const userConsultations = mockConsultations.filter(
      consultation => consultation.email === req.user.email
    );

    res.json({
      consultations: userConsultations.map(consultation => ({
        id: consultation.id,
        name: consultation.name,
        email: consultation.email,
        mobile: consultation.mobile,
        state: consultation.state,
        occupation: consultation.occupation,
        preferredDate: consultation.preferredDate,
        preferredTime: consultation.preferredTime,
        consultationType: consultation.consultationType,
        message: consultation.message,
        status: consultation.status,
        createdAt: consultation.createdAt
      }))
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/consultations/:id
// @desc    Get consultation by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const consultation = mockConsultations.find(c => c.id === req.params.id);
    
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    // Check if user owns this consultation
    if (consultation.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({
      consultation: {
        id: consultation.id,
        name: consultation.name,
        email: consultation.email,
        mobile: consultation.mobile,
        state: consultation.state,
        occupation: consultation.occupation,
        preferredDate: consultation.preferredDate,
        preferredTime: consultation.preferredTime,
        consultationType: consultation.consultationType,
        message: consultation.message,
        status: consultation.status,
        createdAt: consultation.createdAt,
        updatedAt: consultation.updatedAt
      }
    });
  } catch (error) {
    console.error('Get consultation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;