const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const router = express.Router();

// Mock data
let mockConsultations = [];
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
    res.json({
      stats: {
        totalConsultations: mockConsultations.length,
        pendingConsultations: mockConsultations.filter(c => c.status === 'pending').length,
        completedConsultations: mockConsultations.filter(c => c.status === 'completed').length,
        totalUsers: mockUsers.length
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/consultations
// @desc    Get all consultations
// @access  Private (Admin)
router.get('/consultations', [auth, adminAuth], async (req, res) => {
  try {
    res.json({
      consultations: mockConsultations.map(consultation => ({
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

// @route   PUT /api/admin/consultations/:id/status
// @desc    Update consultation status
// @access  Private (Admin)
router.put('/consultations/:id/status', [auth, adminAuth], async (req, res) => {
  try {
    const { status } = req.body;
    const consultation = mockConsultations.find(c => c.id === req.params.id);
    
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    consultation.status = status;
    consultation.updatedAt = new Date();

    res.json({
      message: 'Consultation status updated successfully',
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
    console.error('Update consultation status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;