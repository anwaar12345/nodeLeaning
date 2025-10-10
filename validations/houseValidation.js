import { body } from "express-validator";

export const createHouseValidation = [
  body("name")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("address")
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long"),

];

export const updateHouseValidation = [
  body("name")
    .optional()
    .isString().withMessage("Name must be a string")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("address")
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long")
];

export const createHousesValidation = [
  body().isArray({ min: 1 }).withMessage("Request body must be a non-empty array"),
  body("*.name")
    .isString().withMessage("Name must be a string")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

  body("*.address") 
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters long"),
];