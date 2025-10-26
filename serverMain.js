import express from 'express';
import { connectDB } from './db/connectDb.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const startServer = async () => {
  try {
    await connectDB();
    

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