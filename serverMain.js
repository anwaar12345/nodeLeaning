import express from 'express';
import { connectDB } from './db/connectDb.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to database before starting server
const startServer = async () => {
  try {
    await connectDB();
    
    // Routes
    app.use('/users', userRoutes);
    
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
      console.log('Database connected');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();