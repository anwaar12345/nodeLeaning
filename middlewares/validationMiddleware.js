// middlewares/validate.js
import { validationResult } from "express-validator";
import ResponseHandler from "../utils/ResponseHelper.js";

const response = new ResponseHandler();

export default function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response.validationError(
      res,
      errors.array().map(err => ({ field: err.param, message: err.msg }))
    );
  }
  next();
}
