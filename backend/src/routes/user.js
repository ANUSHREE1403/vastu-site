const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const router = express.Router();

// Mock users storage (same as in auth.js)
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

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        mobile: req.user.mobile,
        state: req.user.state,
        occupation: req.user.occupation,
        language: req.user.language,
        role: req.user.role,
        lastLogin: req.user.lastLogin,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
