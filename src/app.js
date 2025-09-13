const express = require('express');
const mongoose = require('mongoose');
const aiRoutes = require('./routes/ai.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/code-review-app';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Code Review API is running!',
        endpoints: {
            auth: '/api/auth',
            ai: '/api/ai'
        }
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

module.exports = app;