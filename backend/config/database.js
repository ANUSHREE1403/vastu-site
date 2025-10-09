const mongoose = require('mongoose');
const config = require('./config');

module.exports = async function connectDB() {
  try {
    await mongoose.connect(config.MONGODB_URI, { dbName: 'vastushakti' });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};