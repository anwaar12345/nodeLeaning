import express  from "express";
import multer from "multer";
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // For x-www-form-urlencoded

export default app;