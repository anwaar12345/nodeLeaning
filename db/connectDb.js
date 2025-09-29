import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const dbName = "mydb";

let db;

export async function connectDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("✅ MongoDB Connected");
    db = client.db(dbName);
  } catch (err) {
    console.error("❌ DB Connection Failed", err);
    process.exit(1);
  }
}

export function getDB() {
  if (!db) throw new Error("DB not initialized. Call connectDB first.");
  return db;
}
