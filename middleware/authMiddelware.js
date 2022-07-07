const asyncHandler = require("express-async-handler");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      res.status(400);
      console.error("error authorization");
      throw new Error("no authorization");
    }
  }

  if (!token) {
    res.status(400);

    throw new Error("no authorization,no token");
  }
});

module.exports = { protect };
