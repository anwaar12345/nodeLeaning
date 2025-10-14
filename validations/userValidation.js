import { body } from "express-validator";

export const createUserValidation = [
    body("name")
    .exists().withMessage("Name is required")
    .bail()
    .isString().withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("email")
    .exists().withMessage("Email is required")
    .bail()
    .isEmail().withMessage("Valid email is required"),

  body("age")
    .exists().withMessage("Age is required")
    .bail()
    .isInt({ min: 18, max: 80 }).withMessage("Age must be between 18 and 80"),

];

export const updateUserValidation = [
  body("name")
    .optional()
    .isString().withMessage("Name must be a string")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("email")
    .optional()
    .isEmail().withMessage("Valid email is required"),

  body("age")
    .optional()
    .isInt({ min: 18, max: 80 }).withMessage("Age must be between 18 and 80"),
];

export const createUsersValidation = [
  body().isArray({ min: 1 }).withMessage("Request body must be a non-empty array"),
  body("*.name")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
  body("*.email")
    .isEmail().withMessage("Valid email is required"),
  body("*.age")
    .isInt({ min: 18, max: 80 }).withMessage("Age must be between 18 and 80"),
];