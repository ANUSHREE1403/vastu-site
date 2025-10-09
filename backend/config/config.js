module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/vastu-platform',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'vastu.shakti1@gmail.com',
  CONTACT_PHONE: process.env.CONTACT_PHONE || '+91 84487 50725',
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads/',
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 5242880, // 5MB
};
