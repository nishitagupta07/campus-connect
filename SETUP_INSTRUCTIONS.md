# Campus Diaries - Setup Instructions

## ⚠️ Important: Environment Setup

A **`.env`** file is required but was blocked by `.gitignore`. You need to create it manually.

### Create .env file:
1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and set your `JWT_SECRET`:
   ```
   JWT_SECRET=your_secure_random_string_here
   ```

## 🚀 How to Run the Application

### Prerequisites:
1. **Node.js** (v16+ recommended)
2. **MongoDB** running locally on port 27017
3. **npm** package manager

### Backend Setup:
```bash
# Install dependencies
npm install

# Create .env file (see above)
copy .env.example .env

# Start backend server (port 8080)
npm start
```

### Frontend Setup:
```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Start development server (port 5173)
npm run dev
```

### MongoDB:
- Ensure MongoDB is running at `mongodb://127.0.0.1:27017/campus_diaries`
 - If you have MongoDB installed, start it with `mongod`

## 🔧 Errors Fixed

1. ✅ **api/app.js**: Added missing `connectDB` import
2. ✅ **api/app.js**: Fixed testAuth.js import path (`./routes/` instead of `../routes/`)
3. ✅ **api/config/db.js**: Removed deprecated mongoose options
4. ✅ **Created .env.example**: Template for environment variables
5. ℹ️ **uploads/** directory will be created automatically by the upload middleware

## 📝 Next Steps

1. Create the `.env` file from `.env.example`
2. Start MongoDB
3. Run `npm install` in root directory
4. Run `npm install` in client directory
5. Start both servers (backend with `npm start`, frontend with `cd client && npm run dev`)
