const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  isBot: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  intent: {
    type: String,
    enum: ['greeting', 'appointment', 'vastu_info', 'pricing', 'contact', 'general', 'unknown']
  },
  confidence: {
    type: Number,
    min: 0,
    max: 1
  }
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);

