/*import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';  // Import userRoutes
import practicalRoutes from './routes/practicalRoutes.js';  // Import practicalRoutes

dotenv.config();

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api', userRoutes);  // User Routes
app.use('/api', practicalRoutes);  // Practical Routes

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/


//////////////////////////



import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import practicalRoutes from './routes/practicalRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/practicals', practicalRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Practical Management System API!');
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export app for Vercel
export default app;

