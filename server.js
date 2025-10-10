import express from "express";
import userRoutes from "./routes/userRoutes.js";
import housesRoutes from "./routes/housesRoutes.js";
import { connectDB,getDB } from "./db/connectDb.js"; 
import { setUserCollection } from "./controllers/UserController.js";
import { setHousesCollection } from "./controllers/HouseController.js"; 
import longPolling from './longPolling.js';
import path from 'path';
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

const uri = "mongodb://127.0.0.1:27017";
const dbName = "mydb";


  await connectDB();

  // ab getDB() use karke collection lo
  const db = getDB();
  setUserCollection(db.collection("houses"));

  setHousesCollection(db.collection("houses"));
  // Routes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


  app.use('/long-polling', longPolling);
  app.use("/users", userRoutes);
  app.use("/houses", housesRoutes);
  app.get("/", (req, res) => {
    res.send("Hello from Node.js + Express + Core MongoDB");
  });

  // Serve 404.html for unknown routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

  // Start server
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
