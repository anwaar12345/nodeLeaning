import { body } from "express-validator";

import { getDB } from "../config/db.js";

export function getUserCollection() {
  const db = getDB();
  return db.collection("users");
}


export const userValidationRules = () => {
  return [
    body("name")
      .notEmpty().withMessage("Name is required")
      .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    
    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Invalid email format"),
    
    body("age")
      .optional()
      .isInt({ min: 1 }).withMessage("Age must be a positive number"),
  ];
};
