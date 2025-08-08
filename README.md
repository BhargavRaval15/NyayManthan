# NyayManthan - AI-Powered Constitutional Learning Platform

A comprehensive MERN stack application that simplifies the Indian Constitution (Parts III, IV, and IV-A) for citizens using advanced AI technology.

## 🎯 Project Overview

NyayManthan bridges the gap between complex constitutional law and common citizens by providing AI-powered simplifications, making legal knowledge accessible to everyone.

## ✨ Features

### Phase 1 (MVP) - ✅ COMPLETED

- 📚 **Article Browsing**: Navigate through constitutional articles
- 🤖 **AI Simplification**: ChatGPT-powered article explanations
- 🔍 **Smart Search**: Full-text search across articles
- 📑 **Part Organization**: Structured by Parts III, IV, IV-A
- 📱 **Responsive Design**: Mobile-friendly interface
- 🔒 **Security**: Rate limiting and input validation

### Future Phases

- 🏛️ **Case Law Integration** (Phase 2)
- 👥 **User System** (Phase 3)
- 🎯 **Advanced Features** (Phase 4)
- 📱 **Mobile App** (Phase 5)

## 🛠️ Tech Stack

### Frontend

- **React 18.2.0** - Modern UI library
- **TailwindCSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend

- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **OpenAI API** - AI integration
- **JWT** - Authentication (future)

### Security & Performance

- **Helmet** - Security headers
- **CORS** - Cross-origin requests
- **Rate Limiting** - API protection
- **Text Indexing** - Fast search

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

```bash
# Clone repository
git clone <repository-url>
cd NyayManthan

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

1. **Backend Environment** (`backend/.env`):

```env
MONGODB_URI=mongodb://localhost:27017/nyaymanthan
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

2. **Frontend Environment** (`frontend/.env`):

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Database Setup

```bash
cd backend
node config/seeder.js
```

### Start Development Servers

```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm start
```

**🌐 Access the application at:** http://localhost:3000

## 📁 Project Structure

```
NyayManthan/
├── backend/
│   ├── server.js              # Express server
│   ├── models/               # MongoDB schemas
│   │   ├── Article.js
│   │   └── SimplificationLog.js
│   ├── routes/               # API endpoints
│   │   ├── articles.js
│   │   └── ai.js
│   ├── utils/                # Utilities
│   │   └── aiService.js
│   ├── config/               # Configuration
│   │   └── seeder.js
│   └── .env                  # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   └── common/
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── App.js           # Main app
│   └── public/              # Static assets
└── README.md                # This file
```

## 🔌 API Endpoints

### Articles

- `GET /api/articles` - List all articles
- `GET /api/articles/:id` - Get specific article
- `GET /api/articles/search?q=query` - Search articles
- `GET /api/articles/part/:part` - Filter by part

### AI Services

- `POST /api/ai/simplify` - Simplify article content
- `GET /api/ai/health` - Service health check

## 🎨 UI Components

### Pages

- **HomePage** - Project overview and navigation
- **LegalAtlas** - Article browsing interface
- **ArticlePage** - Individual article with AI features
- **PartPage** - Part-specific article listing
- **SearchPage** - Search results display
- **AboutPage** - Project information

### Components

- **Navbar** - Navigation with search functionality
- **Footer** - Project links and information

## 🔐 Security Features

- **Rate Limiting** - API and AI endpoint protection
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Secure data handling
- **Error Handling** - Graceful error responses
- **Security Headers** - Helmet.js protection

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📊 Sample Data

The seeder includes 14 sample articles from:

- **Part III**: Fundamental Rights (Articles 14-18)
- **Part IV**: Directive Principles (Articles 36-40)
- **Part IV-A**: Fundamental Duties (Articles 51A)

## 🚀 Deployment

### Backend (Heroku)

```bash
heroku create nyaymanthan-backend
git push heroku main
```

### Frontend (Vercel)

```bash
vercel --prod
```

### Database (MongoDB Atlas)

Update `MONGODB_URI` in production environment.

## 🔧 Development Commands

### Backend

```bash
npm run dev      # Development server
npm start        # Production server
npm run seed     # Seed database
npm test         # Run tests
```

### Frontend

```bash
npm start        # Development server
npm run build    # Production build
npm test         # Run tests
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection**: Ensure MongoDB is running
2. **OpenAI API**: Verify API key validity
3. **Port Conflicts**: Check if ports 3000/5000 are available
4. **Dependencies**: Clear `node_modules` and reinstall if needed

### Environment Variables

All required variables are documented in `.env` files.

## 🛣️ Roadmap

### Phase 2: Enhanced AI Features

- Case law integration
- Legal precedent analysis
- Constitutional amendment history

### Phase 3: User System

- User registration/authentication
- Personalized learning paths
- Progress tracking

### Phase 4: Advanced Features

- Interactive quizzes
- Discussion forums
- Expert Q&A system

### Phase 5: Mobile & PWA

- React Native mobile app
- Progressive Web App features
- Offline functionality
- Reading materials
- UI/UX improvements

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create `.env` files in both backend and frontend directories:

### Backend (.env)

```
MONGODB_URI=mongodb://localhost:27017/nyaymanthan
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Tech Stack

- **Frontend**: React, TailwindCSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI**: OpenAI ChatGPT API
- **Authentication**: JWT (future phases)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for ChatGPT API
- MongoDB for database services
- Indian Constitution for the source material
- Open source community for tools and libraries

---

**NyayManthan** - Empowering citizens with accessible constitutional knowledge through AI technology.
