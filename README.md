# Vastu Shakti Platform

A comprehensive Vastu Shastra consultation platform with appointment booking, vastu analysis tools, and multi-language support.

**© 2024 Vastu Shakti. All rights reserved.**

## Project Structure

```
vastu-site/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation middleware
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   ├── config/             # Database, environment config
│   └── package.json
├── frontend/               # React + TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Helper functions
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
├── shared/                 # Shared types and utilities
└── docs/                   # Documentation
```

## Features

- 🔮 **Vastu Consultation Booking** - Schedule appointments with vastu experts
- 🌙 **Dark/Light Mode** - Theme toggle with system preference detection
- 💬 **Chat Help System** - Basic chatbot with predefined FAQ responses
- 🌐 **Bilingual Support** - English and Hindi language support
- 📞 **Contact Integration** - Direct contact via email and phone
- 📊 **Admin Dashboard** - Manage consultations and content
- 📝 **Blog System** - Vastu tips and educational content
- 🔐 **User Authentication** - Secure user management
- 📅 **Calendar Integration** - Appointment scheduling

## Tech Stack

### Backend
- Node.js + Express
- MongoDB/PostgreSQL
- JWT Authentication
- Nodemailer
- Contact Integration

### Frontend
- React + TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hook Form

## Getting Started

1. Clone the repository
2. Install dependencies for both backend and frontend
3. Set up environment variables
4. Run the development servers

## Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start
```

## Production Deployment

The application is designed to be production-ready with:
- Environment-based configuration
- Error handling and logging
- Security best practices
- Performance optimization
- Scalable architecture

---

## 👩‍💻 Developer

**Complete website developed by Anushree**

© 2025 Vastu Shakti Platform. All rights reserved.
