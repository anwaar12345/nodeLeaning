import express  from "express";
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // For x-www-form-urlencoded

export default app;