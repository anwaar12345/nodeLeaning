import app from './src/main.js'
import { config } from './config/config.js';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
const port = config.port;

// Define route BEFORE listen
app.use('/users', userRoutes)

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log("aaya");
  res.status(statusCode).json({
    message: err.message,
    errorStack: config.env === "development" ? err.stack : ""
  });
});

// Start server and connect DB
app.listen(port, () => {
  mongoose.connect(config.dbURl);
  mongoose.connection.on('connected', () => console.log('db connected'));
  console.log(`Server is running on port ${port}`);
});
