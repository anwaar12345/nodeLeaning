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

   body("password")
  .exists().withMessage("Password is required")
  .bail()
  .isLength({ min: 8, max: 12 })
  .withMessage("Password must be between 8 and 12 characters long")
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/)
  .withMessage("Password must contain letters, numbers, and at least one special character")
  

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