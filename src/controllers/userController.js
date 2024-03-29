const asyncHandler = require("express-async-handler");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
/*  **************************generate jwt *******************************  */
const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
/*  *****************************************************  */
// @desc: user registration
// @route: POST /api/users/signup
// @access: public
const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  // sheck if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  // hashPassword
  const salt = await bycrypt.genSalt(10);
  const hashPassword = await bycrypt.hash(password, salt);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  /* create user */
  
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      score: user.score,
      token: generateJwt(user.id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
/*  *********************************************************  */
// @desc: user registration
// @route: GET /api/users/login
// @access: public
const userLogin = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("please fill all fields");
  }
  // sheck if user already exists
  const userExists = await User.findOne({ email });
  if (userExists && (await bycrypt.compare(password, userExists.password))) {
    
    res.status(201).json({
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      score: userExists.score,
      token: generateJwt(userExists.id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});
/***************************************************************/
// @desc: user registration
// @route: GET /api/users/me
// @access: public
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res
    .json({
      id: _id,
      name,
      email,
    })
    .status(200);
});
const getRanking = asyncHandler(async (req, res) => {
  
  const users = await User.find()
    .select(["-password", "-createdAt", "-updatedAt"])
    .sort({ score: -1 });

  res.json(users).status(200);
});
const updateScore = asyncHandler(async (req, res) => {
  const { idUser, score } = req.body;
  

  const user = await User.findOneAndUpdate(
    { _id: idUser },
    { score: score },
    {
      new: true,
    }
  );
  res.status(202).send({ message: "user's score successfully updated" });
});
/*  *********************************************************  */
module.exports = {
  registerUser,
  userLogin,
  getUser,
  updateScore,
  getRanking,
};
