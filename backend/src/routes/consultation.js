const express = require('express');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const validateRequest = require('../middleware/validateRequest');
const Consultation = require('../models/Consultation');
const User = require('../models/User');
const { sendConsultationNotification } = require('../utils/emailService');

const router = express.Router();

// Simple auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
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
  body('name').optional().trim(),
  body('email').optional().trim(),
  body('mobile').optional().trim(),
  body('state').optional().trim(),
  body('occupation').optional().trim(),
  body('preferredDate').optional().trim(),
  body('preferredTime').optional().trim(),
  body('consultationType').optional().trim(),
  body('message').optional().trim()
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

    // Find or create user (simplified - just use email as reference)
    let user = await User.findOne({ email });
    
    // Create consultation in database
    const consultation = new Consultation({
      user: user ? user._id : null,
      name,
      email,
      mobile,
      state,
      occupation,
      preferredDate: new Date(preferredDate),
      preferredTime,
      consultationType,
      message: message || '',
      status: 'pending'
    });

    await consultation.save();
    
    // Send email notifications (async, don't wait)
    sendConsultationNotification(consultation).catch(err => console.error('Email error:', err));

    res.status(201).json({
      success: true,
      message: 'Consultation booked successfully',
      consultation: {
        id: consultation._id,
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
    res.status(500).json({ success: false, message: 'Server error during consultation booking' });
  }
});

// @route   GET /api/consultations/my-consultations
// @desc    Get user's consultations
// @access  Private
router.get('/my-consultations', auth, async (req, res) => {
  try {
    const userConsultations = await Consultation.find({ 
      email: req.user.email 
    })
    .sort({ createdAt: -1 })
    .select('-__v');

    res.json({
      success: true,
      consultations: userConsultations
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/consultations/:id
// @desc    Get consultation by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id).select('-__v');
    
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }

    // Check if user owns this consultation
    if (consultation.email !== req.user.email && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({
      success: true,
      consultation
    });
  } catch (error) {
    console.error('Get consultation error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;