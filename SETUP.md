# NyayManthan - Setup Instructions

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (v5 or higher)
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd NyayManthan
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Add your OpenAI API key and MongoDB connection string
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Install TailwindCSS
npm install -D tailwindcss autoprefixer postcss

# Create environment file
cp src/.env.example .env

# Edit .env file if needed
```

### 4. Database Setup

```bash
# Start MongoDB service
# On Windows: Start MongoDB service from Services
# On macOS/Linux: sudo systemctl start mongod

# Seed the database with sample articles
cd backend
node config/seeder.js
```

## Running the Application

### Development Mode

Open two terminal windows:

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production mode
cd ../backend
npm start
```

## Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nyaymanthan
FRONTEND_URL=http://localhost:3000

# OpenAI API configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo

# JWT configuration (for future phases)
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=NyayManthan
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

## Testing the Application

### 1. Basic Functionality Test

1. Open http://localhost:3000
2. Navigate to "Legal Atlas"
3. Click on any constitutional part (III, IV, or IV-A)
4. Click on any article
5. Click "AI Simplify" to test AI integration

### 2. Search Functionality Test

1. Use the search bar in the navbar
2. Try searching for terms like "freedom", "equality", "rights"
3. Verify search results are displayed correctly

### 3. API Testing

You can test the API endpoints using tools like Postman or curl:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test articles endpoint
curl http://localhost:5000/api/articles

# Test AI simplification (requires OpenAI API key)
curl -X POST http://localhost:5000/api/ai/simplify \
  -H "Content-Type: application/json" \
  -d '{"articleNumber": "14", "originalText": "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India."}'
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check the connection string in .env file
   - Verify MongoDB service is accessible

2. **OpenAI API Error**

   - Verify your OpenAI API key is correct
   - Check if you have sufficient credits
   - Ensure the API key has access to GPT models

3. **Port Already in Use**

   - Change PORT in backend .env file
   - Update REACT_APP_API_URL in frontend .env file accordingly

4. **TailwindCSS Styles Not Loading**

   - Ensure TailwindCSS is properly installed
   - Check if postcss.config.js and tailwind.config.js are present
   - Restart the development server

5. **CORS Issues**
   - Ensure frontend URL is added to CORS configuration in backend
   - Check if both frontend and backend are running on correct ports

### Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **Database**: Use MongoDB Compass for GUI database management
3. **Debugging**: Use browser developer tools and check console logs
4. **API Testing**: Use the built-in health check endpoints to verify services

## Next Steps

After successful setup:

1. **Phase 1 Complete**: Basic article browsing and AI simplification
2. **Phase 2 Planning**: AI-powered navigation and semantic search
3. **Phase 3 Planning**: Gamification features (optional)
4. **Phase 4 Planning**: Legal advice and updates integration
5. **Phase 5 Planning**: Materials and final polish

## Support

For setup issues or questions:

1. Check the troubleshooting section above
2. Review the error logs in console
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed

The application is built with modern web technologies and follows best practices for scalability and maintainability.
