const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  preferredDate: {
    type: Date,
    required: true
  },
  preferredTime: {
    type: String,
    required: true
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
    required: true
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

