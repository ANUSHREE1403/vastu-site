const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../models/User');
const Consultation = require('../models/Consultation');
const Contact = require('../models/Contact');
const Feedback = require('../models/Feedback');

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

// Admin auth middleware
const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin)
router.get('/dashboard', [auth, adminAuth], async (req, res) => {
  try {
    const totalConsultations = await Consultation.countDocuments();
    const pendingConsultations = await Consultation.countDocuments({ status: 'pending' });
    const completedConsultations = await Consultation.countDocuments({ status: 'completed' });
    const confirmedConsultations = await Consultation.countDocuments({ status: 'confirmed' });
    const totalUsers = await User.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const totalFeedback = await Feedback.countDocuments();
    const avgRating = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    res.json({
      success: true,
      stats: {
        consultations: {
          total: totalConsultations,
          pending: pendingConsultations,
          confirmed: confirmedConsultations,
          completed: completedConsultations
        },
        contacts: {
          total: totalContacts,
          new: newContacts
        },
        feedback: {
          total: totalFeedback,
          avgRating: avgRating.length > 0 ? avgRating[0].avgRating.toFixed(1) : 0
        },
        users: {
          total: totalUsers
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/consultations
// @desc    Get all consultations
// @access  Private (Admin)
router.get('/consultations', [auth, adminAuth], async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const consultations = await Consultation.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');
    
    const total = await Consultation.countDocuments(query);

    res.json({
      success: true,
      consultations,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get consultations error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/contacts
// @desc    Get all contact enquiries
// @access  Private (Admin)
router.get('/contacts', [auth, adminAuth], async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');
    
    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      contacts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/admin/feedback
// @desc    Get all feedback
// @access  Private (Admin)
router.get('/feedback', [auth, adminAuth], async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');
    
    const total = await Feedback.countDocuments();

    res.json({
      success: true,
      feedbacks,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get feedbacks error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/admin/consultations/:id/status
// @desc    Update consultation status
// @access  Private (Admin)
router.put('/consultations/:id/status', [auth, adminAuth], async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status, notes, updatedAt: Date.now() },
      { new: true }
    ).select('-__v');
    
    if (!consultation) {
      return res.status(404).json({ success: false, message: 'Consultation not found' });
    }

    res.json({
      success: true,
      message: 'Consultation status updated successfully',
      consultation
    });
  } catch (error) {
    console.error('Update consultation status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/admin/contacts/:id/status
// @desc    Update contact status
// @access  Private (Admin)
router.put('/contacts/:id/status', [auth, adminAuth], async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes, updatedAt: Date.now() },
      { new: true }
    ).select('-__v');
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      contact
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/admin/feedback/:id/publish
// @desc    Publish/unpublish feedback
// @access  Private (Admin)
router.put('/feedback/:id/publish', [auth, adminAuth], async (req, res) => {
  try {
    const { isPublished, isVerified } = req.body;
    
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { isPublished, isVerified, updatedAt: Date.now() },
      { new: true }
    ).select('-__v');
    
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    res.json({
      success: true,
      message: 'Feedback updated successfully',
      feedback
    });
  } catch (error) {
    console.error('Update feedback error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
