const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  titleHindi: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  contentHindi: {
    type: String
  },
  excerpt: {
    type: String,
    required: true
  },
  excerptHindi: {
    type: String
  },
  featuredImage: {
    type: String
  },
  category: {
    type: String,
    enum: ['tips', 'house', 'office', 'career', 'wealth', 'health', 'marriage', 'education', 'general'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  metaDescription: {
    type: String
  },
  metaKeywords: [{
    type: String
  }]
}, {
  timestamps: true
});

// Generate slug from title before saving
blogSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);

