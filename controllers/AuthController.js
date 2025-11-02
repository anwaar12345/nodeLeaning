import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import ApiResponse from "../utils/ResponseHelper.js";
const apiResponse = new ApiResponse();
import { setUserCollection } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config as conf} from "dotenv";
conf();

// login
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(apiResponse.error(errors.array(), "Validation Error", 422));
  }

  try {
    const usersCollection = setUserCollection(); // ✅ now we get collection here
    let {email,password} = req.body;
    let user  = await usersCollection.findOne({email: email});
    if(!user){
      res.status(422).json(
        apiResponse.success(user, "Email is invalid", null, 422)
      );
    }

     const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json(
           apiResponse.success(user, "Invalid credentials", null, 422)
        );
      }
      
    const token = jwt.sign({ sub: user?._id.toString()}, process.env.JWT_SEC, { expiresIn: '1h' });
    res.status(201).json(apiResponse.success(token, "User Loggedin successfully", null, 201));

  } catch (err) {
    res.status(500).json(apiResponse.error(err.message, "Database Error", 500));
  }
};

