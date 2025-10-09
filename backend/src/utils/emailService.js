const nodemailer = require('nodemailer');
const config = require('../../config/config');

// Create transporter
const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: config.EMAIL_PORT,
  secure: false,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

// Send consultation booking notification
const sendConsultationNotification = async (consultation) => {
  try {
    // Email to admin
    const adminMailOptions = {
      from: `"Vastu Shakti" <${config.EMAIL_USER}>`,
      to: config.CONTACT_EMAIL,
      subject: `New Consultation Booking - ${consultation.consultationType}`,
      html: `
        <h2>New Consultation Booking</h2>
        <p><strong>Name:</strong> ${consultation.name}</p>
        <p><strong>Email:</strong> ${consultation.email}</p>
        <p><strong>Mobile:</strong> ${consultation.mobile}</p>
        <p><strong>State:</strong> ${consultation.state}</p>
        <p><strong>Occupation:</strong> ${consultation.occupation}</p>
        <p><strong>Consultation Type:</strong> ${consultation.consultationType}</p>
        <p><strong>Preferred Date:</strong> ${new Date(consultation.preferredDate).toLocaleDateString()}</p>
        <p><strong>Preferred Time:</strong> ${consultation.preferredTime}</p>
        <p><strong>Message:</strong> ${consultation.message || 'N/A'}</p>
        <p><strong>Booked At:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    // Email to user
    const userMailOptions = {
      from: `"Vastu Shakti" <${config.EMAIL_USER}>`,
      to: consultation.email,
      subject: 'Consultation Booking Confirmation - Vastu Shakti',
      html: `
        <h2>Thank You for Booking a Consultation!</h2>
        <p>Dear ${consultation.name},</p>
        <p>Your consultation has been successfully booked. Our team will contact you shortly to confirm the appointment.</p>
        
        <h3>Booking Details:</h3>
        <p><strong>Consultation Type:</strong> ${consultation.consultationType}</p>
        <p><strong>Preferred Date:</strong> ${new Date(consultation.preferredDate).toLocaleDateString()}</p>
        <p><strong>Preferred Time:</strong> ${consultation.preferredTime}</p>
        
        <p>If you have any questions, please contact us at:</p>
        <p><strong>Phone:</strong> ${config.CONTACT_PHONE}</p>
        <p><strong>Email:</strong> ${config.CONTACT_EMAIL}</p>
        
        <p>Best regards,<br>Vastu Shakti Team</p>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    
    console.log('Consultation notification emails sent');
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

// Send enquiry notification
const sendEnquiryNotification = async (enquiry) => {
  try {
    // Email to admin
    const adminMailOptions = {
      from: `"Vastu Shakti" <${config.EMAIL_USER}>`,
      to: config.CONTACT_EMAIL,
      subject: `New Enquiry - ${enquiry.subject}`,
      html: `
        <h2>New Contact Enquiry</h2>
        <p><strong>Name:</strong> ${enquiry.name}</p>
        <p><strong>Email:</strong> ${enquiry.email}</p>
        <p><strong>Mobile:</strong> ${enquiry.mobile}</p>
        <p><strong>Subject:</strong> ${enquiry.subject}</p>
        <p><strong>Message:</strong> ${enquiry.message}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    // Email to user
    const userMailOptions = {
      from: `"Vastu Shakti" <${config.EMAIL_USER}>`,
      to: enquiry.email,
      subject: 'We received your enquiry - Vastu Shakti',
      html: `
        <h2>Thank You for Contacting Us!</h2>
        <p>Dear ${enquiry.name},</p>
        <p>We have received your enquiry and our team will get back to you within 24 hours.</p>
        
        <p><strong>Your Message:</strong><br>${enquiry.message}</p>
        
        <p>If you need immediate assistance, please call us at ${config.CONTACT_PHONE}</p>
        
        <p>Best regards,<br>Vastu Shakti Team</p>
      `
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);
    
    console.log('Enquiry notification emails sent');
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

// Send feedback notification
const sendFeedbackNotification = async (feedback) => {
  try {
    const mailOptions = {
      from: `"Vastu Shakti" <${config.EMAIL_USER}>`,
      to: config.CONTACT_EMAIL,
      subject: `New Feedback - ${feedback.rating} Stars`,
      html: `
        <h2>New Customer Feedback</h2>
        <p><strong>Name:</strong> ${feedback.name || 'Anonymous'}</p>
        <p><strong>Email:</strong> ${feedback.email || 'N/A'}</p>
        <p><strong>Rating:</strong> ${'⭐'.repeat(feedback.rating)} (${feedback.rating}/5)</p>
        <p><strong>Service:</strong> ${feedback.service || 'General'}</p>
        <p><strong>Comments:</strong> ${feedback.comments}</p>
        <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Feedback notification email sent');
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

module.exports = {
  sendConsultationNotification,
  sendEnquiryNotification,
  sendFeedbackNotification
};

