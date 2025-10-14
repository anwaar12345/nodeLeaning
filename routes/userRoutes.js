import express from "express";
import { createUserValidation,createUsersValidation } from "../validations/userValidation.js";
import { createUser, getUsers, getUserById, updateUser, deleteUser,createUsers } from "../controllers/userController.js";
import validate from "../middlewares/validationMiddleware.js";
import multer from "multer";

const router = express.Router();

const upload = multer();


router.post("/", upload.none(), createUserValidation, validate, createUser);
router.post("/bulk-insert", createUsersValidation, validate, createUsers);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
