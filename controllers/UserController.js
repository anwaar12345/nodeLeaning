import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import ApiResponse from "../utils/ResponseHelper.js";
const apiResponse = new ApiResponse();
import { setUserCollection } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config as conf} from "dotenv";
conf();

// Create user
export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(apiResponse.error(errors.array(), "Validation Error", 422));
  }

  try {
    const usersCollection = setUserCollection(); // ✅ now we get collection here
    let {name,email,age,password} = req.body;
    password = await bcrypt.hash(password, 12);
    let user  = await usersCollection.findOne({email: email});
    if(user){
      res.status(400).json(
        apiResponse.success(user, "User already exists", null, 400)
      );
    }
    const result = await usersCollection.insertOne({
      name,
      email,
      age,
      password
    });
    const token = jwt.sign({ sub: result.insertedId.toString()}, process.env.JWT_SEC, { expiresIn: '1h' });
    res.status(201).json(apiResponse.success(token, "User created", null, 201));

  } catch (err) {
    res.status(500).json(apiResponse.error(err.message, "Database Error", 500));
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {

    const usersCollection = setUserCollection(); 
    const users = await usersCollection.find().toArray();
    res.json(apiResponse.success(users));
  } catch (err) {
    res.status(500).json(apiResponse.error(err.message, "Database Error", 500));
  }
};

// Get single user
export const getUserById = async (req, res) => {
  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json(apiResponse.error(null, "User not found", 404));
    res.json(apiResponse.success(user));
  } catch (err) {
    res.status(400).json(apiResponse.error(err.message));
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(apiResponse.success(result, "User updated"));
  } catch (err) {
    res.status(400).json(apiResponse.error(err.message));
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const result = await usersCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(apiResponse.success(result, "User deleted"));
  } catch (err) {
    res.status(400).json(apiResponse.error(err.message));
  }
};


export const createUsers = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(apiResponse.error(errors.array(), "Validation Error", 422));
  }

  try {
    const result = await usersCollection.insertMany(req.body);
    res.status(201).json(apiResponse.success(result, "Users created", null, 201));
  } catch (err) {
    res.status(500).json(apiResponse.error(err.message, "Database Error", 500));
  }
}
