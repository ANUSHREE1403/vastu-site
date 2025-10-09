const express = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRequest = require('../middleware/validateRequest');
const config = require('../../config/config');
const User = require('../models/User');

const router = express.Router();

const signToken = (id) => jwt.sign({ id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE });

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('mobile').trim().isLength({ min: 7 }).withMessage('Please provide a valid mobile number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('state').optional().trim(),
    body('occupation').optional().trim(),
    validateRequest,
  ],
  async (req, res) => {
    try {
      const { name, email, mobile, password, state, occupation, language } = req.body;

      const exists = await User.findOne({ $or: [{ email }, { mobile }] });
      if (exists) {
        return res.status(400).json({
          message: exists.email === email ? 'Email already registered' : 'Mobile number already registered',
        });
      }

      const user = await User.create({
        name,
        email,
        mobile,
        password, // will be hashed by User model pre-save hook
        state: state || '',
        occupation: occupation || '',
        language: language || 'en',
        role: 'user',
        isActive: true,
      });

      const token = signToken(user._id);
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          state: user.state,
          occupation: user.occupation,
          language: user.language,
          role: user.role,
        },
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Server error during registration' });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    validateRequest,
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      if (!user.isActive) return res.status(401).json({ message: 'Account is deactivated' });

      const token = signToken(user._id);
      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          state: user.state,
          occupation: user.occupation,
          language: user.language,
          role: user.role,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error during login' });
    }
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private (Bearer token)
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Token is not valid' });
    if (!user.isActive) return res.status(401).json({ message: 'Account is deactivated' });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        state: user.state,
        occupation: user.occupation,
        language: user.language,
        role: user.role,
        lastLogin: user.updatedAt,
      },
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
