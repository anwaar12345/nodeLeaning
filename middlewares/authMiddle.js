import jwt from "jsonwebtoken";
import {config as conf} from "dotenv";
conf();
import ApiResponse from "../utils/ResponseHelper.js";
const apiResponse = new ApiResponse();


const authenticateToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res
      .status(401)
      .json(apiResponse.error([], "Unauthorized", 401)); // Unauthorized
  }

  // Verify the token with the secret key
  jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
    // If verification fails (e.g., token is expired or invalid), return a 403 Forbidden error
    if (err) {
        return res
      .status(403)
      .json(apiResponse.error([], "Forbidden", 403))
    }

    // If verification is successful, the `decoded` object contains the payload
    // You can attach the decoded payload to the request object for use in subsequent handlers
    req.user = decoded;
    
    // Call next() to pass control to the next middleware or route handler
    next();
  });
};
export default authenticateToken;
