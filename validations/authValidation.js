import { body } from "express-validator";

export const loginValidation = [
   
  body("email")
    .exists().withMessage("Email is required")
    .isEmail().withMessage("Valid email is required"),

  body("password")
  .exists().withMessage("Password is required")

];
