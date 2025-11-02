import { getDB } from "../db/connectDb.js";

export function setUserCollection() {
  const db = getDB();
  return db.collection("users");
}
