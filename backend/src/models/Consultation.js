const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: false,
    lowercase: true,
    trim: true,
    default: ''
  },
  mobile: {
    type: String,
    required: false,
    default: ''
  },
  state: {
    type: String,
    required: false,
    default: ''
  },
  occupation: {
    type: String,
    required: false,
    default: ''
  },
  preferredDate: {
    type: Date,
    required: false
  },
  preferredTime: {
    type: String,
    required: false,
    default: ''
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  consultationType: {
    type: String,
    enum: ['house', 'office', 'career', 'wealth', 'health', 'marriage', 'education', 'relationship'],
    required: false,
    default: 'house'
  },
  assignedExpert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String
  },
  followUpDate: {
    type: Date
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paymentAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Consultation', consultationSchema);

