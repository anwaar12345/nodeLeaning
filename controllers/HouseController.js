import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import ApiResponse from "../utils/ResponseHelper.js";

const apiResponse = new ApiResponse();

let HousesCollection;


export const setHousesCollection = (collection) => {
  HousesCollection = collection;
};

// Create user
export const createHouse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(apiResponse.error(errors.array(), "Validation Error", 422));
  }

  try {
    const result = await HousesCollection.insertOne(req.body);
    res.status(201).json(apiResponse.success(result, "User created", null, 201));
  } catch (err) {
    res.status(500).json(apiResponse.error(err.message, "Database Error", 500));
  }
};

// Get all users
export const getHouses = async (req, res) => {
  try {
    const users = await HousesCollection.find().toArray();
    res.json(apiResponse.success(users));
  } catch (err) {
    res.status(500).json(apiResponse.error(err.message, "Database Error", 500));
  }
};

// Get single user
export const getHouseById = async (req, res) => {
  try {
    const user = await HousesCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json(apiResponse.error(null, "User not found", 404));
    res.json(apiResponse.success(user));
  } catch (err) {
    res.status(400).json(apiResponse.error(err.message));
  }
};

// Update user
export const updateHouse = async (req, res) => {
  try {
    const result = await HousesCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(apiResponse.success(result, "User updated"));
  } catch (err) {
    res.status(400).json(apiResponse.error(err.message));
  }
};

// Delete user
export const deleteHouse = async (req, res) => {
  try {
    const result = await HousesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(apiResponse.success(result, "User deleted"));
  } catch (err) {
    res.status(400).json(apiResponse.error(err.message));
  }
};


export const createHouses = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(apiResponse.error(errors.array(), "Validation Error", 422));
  }

  try {
    const result = await HousesCollection.insertMany(req.body);
    res.status(201).json(apiResponse.success(result, "Users created", null, 201));
  } catch (err) {
    res.status(500).json(apiResponse.error(err.message, "Database Error", 500));
  }
}
