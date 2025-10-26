import express from "express";
import { login } from "../controllers/AuthController.js";
import { loginValidation } from "../validations/authValidation.js";
import validate from "../middlewares/validationMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer();


router.post("/login", upload.none(), loginValidation, validate, login);
export default router;
