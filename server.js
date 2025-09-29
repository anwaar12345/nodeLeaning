import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { connectDB,getDB } from "./db/connectDb.js";
import { setUserCollection } from "./controllers/userController.js"; // 👈 YE LINE ADD KARO

const app = express();
app.use(express.json());

const uri = "mongodb://127.0.0.1:27017";
const dbName = "mydb";


  await connectDB();

  // ab getDB() use karke collection lo
  const db = getDB();
  setUserCollection(db.collection("users"));
  // Routes
  app.use("/users", userRoutes);

  app.get("/", (req, res) => {
    res.send("Hello from Node.js + Express + Core MongoDB 🚀");
  });

  // Start server
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
