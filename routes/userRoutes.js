const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
  updateScore,
  getUser,
  getRanking,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddelware");
router.route("/signup").post(registerUser);
router.route("/login").post(userLogin);
router.post("/score", protect, updateScore);
router.get("/ranking", getRanking);

module.exports = router;
