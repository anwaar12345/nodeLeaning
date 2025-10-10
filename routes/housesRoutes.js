import express from "express";
import { createHouseValidation,createHousesValidation } from "../validations/HouseValidation.js";
import { createHouse, getHouses, getHouseById, updateHouse, deleteHouse,createHouses} from "../controllers/HouseController.js";
import validate from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/", createHouseValidation, validate, createHouse);
router.post("/bulk-insert", createHousesValidation, validate, createHouses);
router.get("/", getHouses);
router.get("/:id", getHouseById);
router.put("/:id", updateHouse);
router.delete("/:id", deleteHouse);
export default router;
